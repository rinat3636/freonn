/*
 * FREONN CONTACT — Bold Technical Expressionism
 * Dark navy section with contact form + company details
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

// Format digits into +7 (XXX) XXX-XX-XX mask
function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  let result = "";
  if (d.length > 0) result += "(" + d.slice(0, 3);
  if (d.length >= 3) result += ") " + d.slice(3, 6);
  if (d.length >= 6) result += "-" + d.slice(6, 8);
  if (d.length >= 8) result += "-" + d.slice(8, 10);
  return result;
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", type: "Монтаж" });
  const [phoneDigits, setPhoneDigits] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.type,
          message: form.message,
        }),
      });
      if (res.ok) {
        toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        setForm({ name: "", phone: "", email: "", message: "", type: "Монтаж" });
        setPhoneDigits("");
      } else {
        toast.error("Ошибка при отправке. Позвоните нам: 8(800)101-2009");
      }
    } catch {
      toast.error("Ошибка соединения. Позвоните нам: 8(800)101-2009");
    } finally {
      setSending(false);
    }
  };

  return (
    <section data-theme="dark" id="contacts" className="py-20 bg-gradient-to-br from-[#0F1340] to-[#2D3092] text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-[#B91C1C]" />
            <span className="text-[#B91C1C] font-heading font-semibold uppercase text-sm tracking-widest">
              Контакты
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl">
            Свяжитесь с нами
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading font-semibold text-xl mb-6">Оставить заявку</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-body mb-1.5">Ваше имя *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-[#B91C1C] transition-colors rounded-xl"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-body mb-1.5">Телефон *</label>
                  <div className="flex items-center bg-white/10 border border-white/20 focus-within:border-[#B91C1C] transition-colors rounded-xl overflow-hidden">
                    <span className="pl-4 pr-1 py-2.5 text-sm font-body text-white select-none whitespace-nowrap">+7</span>
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      value={formatPhone(phoneDigits)}
                      onChange={e => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setPhoneDigits(raw);
                        setForm({ ...form, phone: "+7" + raw });
                      }}
                      className="flex-1 bg-transparent text-white placeholder-white/40 pr-4 py-2.5 text-sm font-body focus:outline-none"
                      placeholder="(___) ___-__-__"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-white/70 text-sm font-body mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-[#B91C1C] transition-colors rounded-xl"
                  placeholder="email@company.ru"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm font-body mb-1.5">Тип услуги</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-2.5 text-sm font-body focus:outline-none focus:border-[#B91C1C] transition-colors rounded-xl"
                >
                  {["Монтаж вентиляции", "Монтаж кондиционирования", "Монтаж дымоудаления", "Монтаж отопления", "Холодоснабжение", "Водоснабжение и канализация", "Электроснабжение", "Пескоструйная обработка", "Проектирование ОВиК", "Комплексный проект", "Пусконаладочные работы", "Сервисное обслуживание", "Консультация"].map(opt => (
                    <option key={opt} value={opt} className="bg-[#0F1340]">{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/70 text-sm font-body mb-1.5">Описание задачи</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-[#B91C1C] transition-colors resize-none rounded-xl"
                  placeholder="Опишите ваш объект и задачу..."
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {sending ? "Отправляем..." : (
                  <>
                    <Send size={16} />
                    Отправить заявку
                  </>
                )}
              </button>
              <p className="text-white/40 text-xs font-body">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          </motion.div>

          {/* Company details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading font-semibold text-xl mb-6">Контактная информация</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#B91C1C]/20 flex items-center justify-center flex-shrink-0 rounded-full">
                    <Phone size={18} className="text-[#B91C1C]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs font-body mb-0.5">Телефон</div>
                    <a href="tel:88001012009" className="text-white font-heading font-semibold text-lg hover:text-[#B91C1C] transition-colors">
                      8(800)101-2009
                    </a>
                    <div className="text-white/50 text-xs font-body">Бесплатно по России</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#B91C1C]/20 flex items-center justify-center flex-shrink-0 rounded-full">
                    <Mail size={18} className="text-[#B91C1C]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs font-body mb-0.5">Email</div>
                    <a href="mailto:info@freonn.ru" className="text-white font-body hover:text-[#B91C1C] transition-colors">
                      info@freonn.ru
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#B91C1C]/20 flex items-center justify-center flex-shrink-0 rounded-full">
                    <MapPin size={18} className="text-[#B91C1C]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs font-body mb-0.5">Адрес офиса</div>
                    <div className="text-white font-body">Московская обл., г. Дзержинский, ул. Ленина 2Б</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#B91C1C]/20 flex items-center justify-center flex-shrink-0 rounded-full">
                    <Clock size={18} className="text-[#B91C1C]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs font-body mb-0.5">Режим работы</div>
                    <div className="text-white font-body">Пн–Сб: 9:00 – 19:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Реквизиты */}
            <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
              <h4 className="font-heading font-semibold text-white text-base mb-4 uppercase tracking-wide">
                Реквизиты компании
              </h4>
              <div className="space-y-2 text-sm font-body">
                {[
                  ["Наименование", "ООО «ЭКС»"],
                  ["ИНН", "3604084591"],
                  ["КПП", "360401001"],
                  ["ОГРН", "1243600003569"],
                  ["Юридический адрес", "Воронежская обл., г. Калач, ул. Красина, д. 3, оф. 3"],
                  ["Фактический адрес", "Московская обл., г. Дзержинский, ул. Ленина, д. 2Б"],
                ].map(([key, val]) => (
                  <div key={key} className="flex gap-3">
                    <span className="text-white/50 flex-shrink-0 w-36">{key}:</span>
                    <span className="text-white/90">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Способы оплаты — коммерческий фактор Яндекса */}
            <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
              <h4 className="font-heading font-semibold text-white text-base mb-4 uppercase tracking-wide">
                Способы оплаты
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🏦", label: "Безналичный расчёт", desc: "Счёт для юрлиц и ИП" },
                  { icon: "💳", label: "Картой онлайн", desc: "Виза, Мастеркард, МИР" },
                  { icon: "💵", label: "Наличными", desc: "Для физических лиц" },
                  { icon: "📊", label: "Лизинг/рассрочка", desc: "До 12 месяцев" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-white text-xs font-heading font-semibold">{item.label}</div>
                      <div className="text-white/50 text-xs font-body">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карта Яндекс — важный коммерческий фактор */}
            <div className="rounded-2xl overflow-hidden border border-white/20">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructor&ll=37.8488%2C55.6316&z=14&l=map&pt=37.8488%2C55.6316%2Cpm2rdm~"
                width="100%"
                height="200"
                frameBorder="0"
                title="Офис Freonn на карте"
                aria-label="Офис Freonn на Яндекс.Картах"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
