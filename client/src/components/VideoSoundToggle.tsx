/*
 * VideoSoundToggle — Shared sound toggle button for all video elements.
 *
 * Features:
 * - Floating button at bottom-right of the video container
 * - Initial state: muted → shows "🔊 開啟聲音"
 * - Toggled: unmuted → shows "🔇 關閉聲音"
 * - Mutual exclusion: when one video is unmuted, all others are forced muted
 *
 * Usage: Wrap a <video> element in a relative container, then place
 * <VideoSoundToggle videoRef={ref} /> alongside it.
 */
import { useState, useEffect, useCallback } from "react";

// Global registry of all video elements + their mute callbacks
type MuteEntry = { video: HTMLVideoElement; setMuted: (m: boolean) => void };
const videoRegistry: MuteEntry[] = [];

function registerVideo(entry: MuteEntry) {
  videoRegistry.push(entry);
  return () => {
    const idx = videoRegistry.indexOf(entry);
    if (idx !== -1) videoRegistry.splice(idx, 1);
  };
}

function muteAllExcept(currentVideo: HTMLVideoElement) {
  videoRegistry.forEach((entry) => {
    if (entry.video !== currentVideo) {
      entry.video.muted = true;
      entry.setMuted(true);
    }
  });
}

interface VideoSoundToggleProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** Position the button at bottom-left or bottom-right (default: right) */
  position?: "left" | "right";
}

export default function VideoSoundToggle({ videoRef, position = "right" }: VideoSoundToggleProps) {
  const [isMuted, setIsMuted] = useState(true);

  // Register this video in the global registry
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const entry: MuteEntry = { video, setMuted: setIsMuted };
    const unregister = registerVideo(entry);
    return unregister;
  }, [videoRef]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      // Unmute this video → mute all others
      muteAllExcept(video);
      video.muted = false;
      setIsMuted(false);
    } else {
      // Mute this video
      video.muted = true;
      setIsMuted(true);
    }
  }, [videoRef]);

  return (
    <button
      onClick={toggleMute}
      className={`absolute bottom-4 ${position === "left" ? "left-4" : "right-4"} z-20 inline-flex items-center gap-1.5 px-3.5 py-2 text-[0.9rem] font-body font-medium rounded-full bg-black/50 text-white/90 backdrop-blur-md hover:bg-black/65 transition-all duration-200 shadow-lg cursor-pointer select-none`}
      aria-label={isMuted ? "開啟聲音" : "關閉聲音"}
    >
      <span className="text-sm leading-none">{isMuted ? "🔊" : "🔇"}</span>
      <span>{isMuted ? "開啟聲音" : "關閉聲音"}</span>
    </button>
  );
}
