/*
 * ContactSection — Liquid Glass Design
 * Refined contact form + multi-location Google Maps
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Phone, MapPin, Clock, MessageCircle, Send, Building2 } from "lucide-react";
import { LINE_BY_APPLE, LOCATIONS } from "@/lib/constants";
import { MapView } from "@/components/Map";
import { toast } from "sonner";

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [form, setForm] = useState({ name: "", phone: "", branch: "", service: "", message: "" });
  const [activeLocation, setActiveLocation] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("請填寫姓名與聯絡電話");
      return;
    }
    toast.success("預約表單已送出，我們將盡快與您聯繫！");
    setForm({ name: "", phone: "", branch: "", service: "", message: "" });
  };

  const loc = LOCATIONS[activeLocation];
  const line = activeLocation === 0 ? LINE_BY_APPLE.nanjing : LINE_BY_APPLE.beida;

  return (
    <section id="contact" className="py-28 lg:py-40 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-mist/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-champagne/5 rounded-full blur-[100px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="label-refined text-champagne inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            Contact Us
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>
          <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.8rem] mb-4">
            預約
            <span className="text-gradient-forest"> 免費諮詢</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-lg mx-auto leading-[1.9]">
            填寫以下表單或透過電話、LINE 與我們聯繫，專業團隊將為您安排諮詢。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-strong rounded-[1.5rem] p-8 lg:p-10">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[0.9rem] font-body font-medium text-ink/50 mb-2">姓名 *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="請輸入您的姓名"
                    className="w-full px-4 py-3 text-[0.85rem] font-body bg-white/60 border border-botanical/10 rounded-xl focus:outline-none focus:border-botanical/30 focus:ring-2 focus:ring-botanical/10 transition-all duration-300 placeholder:text-ink/25"
                  />
                </div>
                <div>
                  <label className="block text-[0.9rem] font-body font-medium text-ink/50 mb-2">聯絡電話 *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="請輸入您的電話"
                    className="w-full px-4 py-3 text-[0.85rem] font-body bg-white/60 border border-botanical/10 rounded-xl focus:outline-none focus:border-botanical/30 focus:ring-2 focus:ring-botanical/10 transition-all duration-300 placeholder:text-ink/25"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[0.9rem] font-body font-medium text-ink/50 mb-2">選擇院所</label>
                  <select
                    value={form.branch}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                    className="w-full px-4 py-3 text-[0.85rem] font-body bg-white/60 border border-botanical/10 rounded-xl focus:outline-none focus:border-botanical/30 focus:ring-2 focus:ring-botanical/10 transition-all duration-300 text-ink/70"
                  >
                    <option value="">請選擇院所</option>
                    {LOCATIONS.map((l) => (
                      <option key={l.name} value={l.name}>{l.name} — {l.type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[0.9rem] font-body font-medium text-ink/50 mb-2">感興趣的療程</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 text-[0.85rem] font-body bg-white/60 border border-botanical/10 rounded-xl focus:outline-none focus:border-botanical/30 focus:ring-2 focus:ring-botanical/10 transition-all duration-300 text-ink/70"
                  >
                    <option value="">請選擇療程（可不選）</option>
                    <option value="picosure">Picosure 755 皮秒蜂巢雷射</option>
                    <option value="hifu">海芙電波</option>
                    <option value="ultrasound">Z音波拉提</option>
                    <option value="vivabella">VIVABELLA 薇貝拉魔法針</option>
                    <option value="hydra">水飛梭＋水光療程</option>
                    <option value="led">多光譜 LED 光療</option>
                    <option value="other">其他 / 綜合諮詢</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[0.9rem] font-body font-medium text-ink/50 mb-2">備註訊息</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder="請描述您的需求或想了解的內容..."
                  className="w-full px-4 py-3 text-[0.85rem] font-body bg-white/60 border border-botanical/10 rounded-xl focus:outline-none focus:border-botanical/30 focus:ring-2 focus:ring-botanical/10 transition-all duration-300 placeholder:text-ink/25 resize-none"
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 text-[0.85rem] font-body font-medium text-cream bg-botanical rounded-xl hover:bg-botanical-light transition-all duration-400 shadow-sm"
              >
                <Send size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                送出預約
              </button>
            </form>
          </motion.div>

          {/* Right — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Location tabs */}
            <div className="glass rounded-xl p-2 flex gap-1">
              {LOCATIONS.map((l, i) => (
                <button
                  key={l.name}
                  onClick={() => setActiveLocation(i)}
                  className={`flex-1 px-3 py-2.5 text-[0.7rem] font-body font-medium rounded-lg transition-all duration-300 ${
                    activeLocation === i
                      ? "bg-botanical text-cream shadow-sm"
                      : "text-ink/50 hover:text-ink/70 hover:bg-white/50"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>

            {/* Active location info */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <Building2 size={16} className="text-botanical mt-0.5" />
                <div>
                  <div className="text-[0.85rem] font-body font-semibold text-ink">{loc.name}</div>
                  <div className="text-[0.65rem] font-body text-botanical/60">{loc.type}</div>
                </div>
              </div>
              <div className="space-y-2 ml-7">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-ink/30" />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.8rem] font-body text-ink/60 hover:text-botanical transition-colors"
                  >
                    {loc.address}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-ink/30" />
                  <a href={loc.phoneLink} className="text-[0.8rem] font-body text-ink/60 hover:text-botanical transition-colors">
                    {loc.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-botanical mt-0.5" />
                <div>
                  <div className="text-[0.7rem] font-body font-medium text-ink/35 mb-1">營業時間</div>
                  <div className="text-[0.8rem] font-body text-ink/60 whitespace-pre-line leading-relaxed">
                    {loc.hours}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="flex items-start gap-3">
                <MessageCircle size={16} className="text-botanical mt-0.5" />
                <div>
                  <div className="text-[0.7rem] font-body font-medium text-ink/35 mb-1">LINE 諮詢</div>
                  <a
                    href={line.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.8rem] font-body text-ink/60 hover:text-botanical transition-colors"
                  >
                    {line.lineId}
                  </a>
                </div>
              </div>
            </div>

            {/* LINE CTA */}
            <a
              href={line.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 text-[0.85rem] font-body font-medium text-white bg-[#06C755] rounded-xl hover:bg-[#05b34d] transition-all duration-300"
            >
              <MessageCircle size={16} />
              LINE 線上諮詢
            </a>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 rounded-[1.5rem] overflow-hidden shadow-lg shadow-botanical/5 h-[350px]"
        >
          <MapView
            key={activeLocation}
            onMapReady={(map) => {
              map.setCenter(loc.coords);
              map.setZoom(16);
              new google.maps.Marker({
                position: loc.coords,
                map,
                title: loc.name,
              });
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
