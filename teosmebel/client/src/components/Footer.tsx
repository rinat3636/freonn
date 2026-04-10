import { Link } from "wouter";
import { Phone, MapPin, Mail, Instagram, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663534325660/WGqC3G9Gb5Uzbq5ctCnL25/teosmebel_logo_cb50659e.png";

export default function Footer() {
  const { data: settings } = trpc.settings.get.useQuery();
  const phone = settings?.phone ?? "+998 90 000 00 00";
  const address = settings?.address ?? "г. Ташкент, ул. Примерная, 1";
  const email = settings?.email ?? "info@teosmebel.uz";
  const instagram = settings?.instagram ?? "";
  const telegram = settings?.telegram ?? "";

  return (
    <footer className="bg-brand-dark text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={LOGO_URL} alt="Teos Mebel" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Качественная мебель для вашего дома и офиса. Современный дизайн, надёжное качество.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Главная" },
                { href: "/catalog", label: "Каталог" },
                { href: "/about", label: "О нас" },
                { href: "/contact", label: "Контакты" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Мы в соцсетях</h3>
            <div className="flex gap-3">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 text-gray-400 hover:border-gold hover:text-gold transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {telegram && (
                <a
                  href={telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 text-gray-400 hover:border-gold hover:text-gold transition-colors"
                >
                  <Send className="w-5 h-5" />
                </a>
              )}
              {!instagram && !telegram && (
                <p className="text-sm text-gray-500">Скоро появятся</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Teos Mebel. Все права защищены.
          </p>
          <Link
            href="/admin"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Администратор
          </Link>
        </div>
      </div>
    </footer>
  );
}
