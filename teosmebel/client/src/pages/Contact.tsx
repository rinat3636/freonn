import { useState } from "react";
import { Phone, MapPin, Mail, Clock, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const { data: settings } = trpc.settings.get.useQuery();
  const phone = settings?.phone ?? "+998 90 000 00 00";
  const address = settings?.address ?? "г. Ташкент, ул. Примерная, 1";
  const email = settings?.email ?? "info@teosmebel.uz";
  const workHours = settings?.workHours ?? "Пн–Сб: 9:00–18:00";

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, send via API
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gray-900 text-white pt-24 pb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold">Контакты</h1>
          <p className="text-gray-400 mt-2">Мы всегда рады ответить на ваши вопросы</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
            <div className="space-y-5">
              {[
                { icon: <Phone className="w-5 h-5" />, label: "Телефон", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: email, href: `mailto:${email}` },
                { icon: <MapPin className="w-5 h-5" />, label: "Адрес", value: address, href: undefined },
                { icon: <Clock className="w-5 h-5" />, label: "Режим работы", value: workHours, href: undefined },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.72 0.12 75 / 0.15)", color: "oklch(0.72 0.12 75)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-gray-900 hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-6 rounded-xl overflow-hidden border border-gray-100 bg-gray-200 h-48 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Карта</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Написать нам</h2>
            <p className="text-gray-500 text-sm mb-6">Оставьте заявку, и мы свяжемся с вами в течение часа</p>

            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "oklch(0.72 0.12 75 / 0.15)" }}>
                  <Send className="w-7 h-7" style={{ color: "oklch(0.72 0.12 75)" }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Заявка отправлена!</h3>
                <p className="text-gray-500 text-sm">Мы свяжемся с вами в ближайшее время.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+998 90 000 00 00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Сообщение</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Опишите, что вас интересует..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
                >
                  Отправить заявку
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
