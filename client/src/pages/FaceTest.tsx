/*
 * FaceTest — 臉部老化測驗頁 (v2: 可複選)
 * /face-test route
 * - Multi-select per question (toggle on/off)
 * - [下一題] button with validation
 * - Selected state: brand green bg, white text, ✓ icon, scale(1.02)
 * - Mobile-first design
 */
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  QUIZ_QUESTIONS,
  calculateMultiSelectResult,
  type AgingType,
  type QuestionAnswers,
} from "@/lib/faceTestData";
import { BRAND } from "@/lib/constants";
import { trackStartTest, trackCompleteTest, trackSelectAnswer, trackNextQuestion } from "@/lib/tracking";

export default function FaceTest() {
  const [currentQ, setCurrentQ] = useState(0);
  const [allAnswers, setAllAnswers] = useState<QuestionAnswers>(() =>
    QUIZ_QUESTIONS.map(() => [])
  );
  const [direction, setDirection] = useState(1);
  const [showError, setShowError] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    trackStartTest();
  }, []);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentQ];
  const progress = ((currentQ) / totalQuestions) * 100;
  const currentSelections = allAnswers[currentQ] || [];

  // Toggle an option selection
  const handleToggle = useCallback(
    (type: AgingType) => {
      setShowError(false);
      setAllAnswers((prev) => {
        const updated = [...prev];
        const current = [...(updated[currentQ] || [])];
        const idx = current.indexOf(type);
        if (idx >= 0) {
          current.splice(idx, 1); // deselect
        } else {
          current.push(type); // select
        }
        updated[currentQ] = current;
        return updated;
      });
      trackSelectAnswer(currentQ + 1, type);
    },
    [currentQ]
  );

  // Next question handler
  const handleNext = useCallback(() => {
    if (currentSelections.length === 0) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setDirection(1);

    if (currentQ < totalQuestions - 1) {
      trackNextQuestion(currentQ + 1);
      setCurrentQ((prev) => prev + 1);
    } else {
      // Quiz complete
      const result = calculateMultiSelectResult(allAnswers);
      trackCompleteTest(result.primaryType);
      const params = new URLSearchParams();
      params.set("primary", result.primaryType);
      if (result.isMixed && result.secondaryType) {
        params.set("secondary", result.secondaryType);
        params.set("mixed", "1");
      }
      setLocation(`/face-result?${params.toString()}`);
    }
  }, [currentSelections, currentQ, totalQuestions, allAnswers, setLocation]);

  const handleBack = useCallback(() => {
    if (currentQ > 0) {
      setDirection(-1);
      setShowError(false);
      setCurrentQ((prev) => prev - 1);
    }
  }, [currentQ]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur-xl border-b border-botanical/8">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            {currentQ > 0 ? (
              <button
                onClick={handleBack}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-botanical/5 text-ink/50 hover:text-ink hover:bg-botanical/10 transition-colors"
                aria-label="上一題"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <Link
                href="/"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-botanical/5 text-ink/50 hover:text-ink hover:bg-botanical/10 transition-colors"
              >
                <ArrowLeft size={18} />
              </Link>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm">🍏</span>
              <span className="text-[0.8rem] font-heading font-semibold text-ink">{BRAND.name}</span>
            </div>
          </div>
          <span className="text-[0.9rem] font-body font-medium text-ink/40">
            {currentQ + 1} / {totalQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-sage-pale">
          <motion.div
            className="h-full bg-gradient-to-r from-botanical to-botanical-light rounded-r-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </header>

      {/* ─── Question Area ─── */}
      <main className="flex-1 flex flex-col container py-8 md:py-12 max-w-xl mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            {/* Question number badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[0.65rem] font-body font-semibold tracking-[0.15em] text-botanical bg-botanical/8 rounded-full">
                Q{question.id}
              </span>
            </div>

            {/* Question text */}
            <h2 className="text-[clamp(1.3rem,4.5vw,1.8rem)] heading-editorial text-ink leading-snug mb-4 md:mb-5">
              {question.question}
            </h2>

            {/* Multi-select hint */}
            <p className="text-[0.9rem] font-body text-ink/40 mb-6">
              <span className="hidden md:inline">可複選｜選出最像你的感覺</span>
              <span className="md:hidden">可複選，選完請按下一題</span>
            </p>

            {/* Options — Multi-select toggle cards */}
            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = currentSelections.includes(option.type);
                return (
                  <button
                    key={idx}
                    onClick={() => handleToggle(option.type)}
                    className={`group w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-botanical/30 ${
                      isSelected
                        ? "border-forest-deep bg-forest-deep text-white scale-[1.02] shadow-md"
                        : "border-botanical/10 bg-white/60 backdrop-blur-sm hover:border-botanical/30 hover:bg-botanical/5"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Checkbox indicator */}
                      <div
                        className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "border-white/60 bg-white/20"
                            : "border-botanical/20 group-hover:border-botanical/40"
                        }`}
                      >
                        {isSelected && <Check size={13} className="text-white" strokeWidth={3} />}
                      </div>
                      {/* Option text */}
                      <span
                        className={`text-[1rem] md:text-[0.95rem] font-body leading-relaxed transition-colors flex-1 ${
                          isSelected ? "text-white font-medium" : "text-ink/70 group-hover:text-ink"
                        }`}
                      >
                        {option.text}
                      </span>
                      {/* Checkmark on right */}
                      {isSelected && (
                        <Check size={18} className="text-white/80 shrink-0" strokeWidth={2.5} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Error message */}
            <AnimatePresence>
              {showError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mt-4 text-[0.8rem] font-body text-red-500 text-center"
                >
                  請至少選擇一個最接近你的狀態
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* ─── Next / Submit Button ─── */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleNext}
            className={`w-full flex items-center justify-center gap-2 py-4 text-[0.95rem] font-body font-bold rounded-2xl transition-all duration-300 shadow-lg ${
              currentSelections.length > 0
                ? "bg-botanical text-cream hover:bg-botanical-light shadow-botanical/20"
                : "bg-botanical/20 text-ink/30 cursor-default"
            }`}
          >
            {currentQ < totalQuestions - 1 ? (
              <>
                下一題
                <ChevronRight size={18} />
              </>
            ) : (
              <>
                查看我的結果
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
