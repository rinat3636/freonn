/*
 * FREONN CITY PAGE — /:city (istra, odintsovo, khimki, etc.)
 * SEO-optimized city pages for local search
 */
import PageLayout from "@/components/PageLayout";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, MapPin, Clock, Phone, Wind, Thermometer, Flame, Snowflake, ShieldAlert, Droplets, Zap, Hammer } from "lucide-react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW";

// City name mapping for proper display
const cityNames: Record<string, string> = {
  "istra": "Истра",
  "odintsovo": "Одинцово",
  "khimki": "Химки",
  "mytishchi": "Мытищи",
  "podolsk": "Подольск",
  "balashikha": "Балашиха",
  "korolev": "Королёв",
  "lyubertsy": "Люберцы",
  "serpukhov": "Серпухов",
  "klin": "Клин",
  "solnechnogorsk": "Солнечногорск",
  "volokolamsk": "Волоколамск",
  "ruza": "Руза",
  "mozhaisk": "Можайск",
  "naro-fominsk": "Нарофоминск",
  "chekhov": "Чехов",
  "domodedovo": "Домодедово",
  "ramenskoe": "Раменское",
  "elektrostal": "Электросталь",
  "noginsk": "Ногинск",
  "shchelkovo": "Щёлково",
  "fryazevo": "Фрязево",
  "pushkino": "Пушкино",
  "sergiev-posad": "Сергиев Посад",
  "dmitrov": "Дмитров",
  "dubna": "Дубна",
  "taldom": "Талдом",
  "orekhovo-zuevo": "Орехово-Зуево",
  "voskresensk": "Воскресенск",
  "kolomna": "Коломна",
  "kashira": "Кашира",
  "stupino": "Ступино",
  "protvino": "Протвино",
  "zhukovsky": "Жуковский",
  "lobnya": "Лобня",
  "dolgoprudny": "Долгопрудный",
  "krasnogorsk": "Красногорск",
  "krasnoznamensk": "Краснознаменск",
  "zelenograd": "Зеленоград",
  "troitsk": "Троицк",
  "shcherbinka": "Щербинка",
};

const services = [
  { icon: Wind, name: "Вентиляция", href: "/ventilyaciya", desc: "Приточно-вытяжные системы для промышленных и коммерческих объектов" },
  { icon: Thermometer, name: "Кондиционирование", href: "/kondicionirovanie", desc: "Сплит-системы, VRF/VRV, чиллеры и фанкойлы" },
  { icon: ShieldAlert, name: "Дымоудаление", href: "/dymoudalenie", desc: "Системы противодымной защиты по нормам МЧС" },
  { icon: Flame, name: "Отопление", href: "/otoplenie", desc: "Воздушное, водяное и электрическое отопление" },
  { icon: Snowflake, name: "Холодоснабжение", href: "/holodosnabzhenie", desc: "Промышленные холодильные системы и чиллеры" },
  { icon: Droplets, name: "Водоснабжение", href: "/vodosnabzhenie", desc: "Системы водоснабжения и канализации" },
  { icon: Zap, name: "Электроснабжение", href: "/elektrosnabzhenie", desc: "Электромонтажные работы и освещение" },
  { icon: Hammer, name: "Пескоструй", href: "/peskostrujnaya-obrabotka", desc: "Пескоструйная обработка металлоконструкций" },
];

const advantages = [
  "Выезд инженера в течение 1 дня",
  "Бесплатный расчёт стоимости",
  "Работаем с объектами от 500 м²",
  "Гарантия 1 год на монтажные работы",
  "Полный пакет исполнительной документации",
  "Сервисное обслуживание после сдачи",
];

interface CityPageProps {
  city: string;
}

export default function CityPage({ city }: CityPageProps) {
  const cityName = cityNames[city] || city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, " ");
  const title = `Инженерные системы в ${cityName}е`;
  const titleGenitive = cityNames[city] ? `${cityName}` : cityName;

  return (
    <PageLayout
      title={`Инженерные системы — ${cityName}`}
      breadcrumb={[{ label: cityName }]}
    >
      {/* Intro */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-[#ED1C24]" />
                <span className="text-[#ED1C24] font-heading font-semibold text-sm uppercase tracking-wider">
                  {cityName} и {cityName === "Истра" ? "Истринский" : "прилегающий"} район
                </span>
              </div>
              <h2 className="font-heading font-bold text-[#0F1340] text-2xl lg:text-3xl mb-4">
                Монтаж инженерных систем в {titleGenitive}
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Компания Freonn выполняет полный комплекс работ по проектированию, монтажу и обслуживанию инженерных систем в {cityName}е и {cityName === "Истра" ? "Истринском" : "прилегающем"} районе. Работаем с промышленными предприятиями, коммерческой недвижимостью и жилыми объектами.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-[#2D3092]" />
                    <span className="text-gray-700 font-body text-sm">{adv}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/contacts" className="btn-primary inline-flex items-center gap-2 justify-center">
                  Вызвать инженера <ArrowRight size={16} />
                </a>
                <a href="tel:88001012009" className="btn-outline border-[#0F1340] text-[#0F1340] inline-flex items-center gap-2 justify-center">
                  <Phone size={16} /> 8(800)101-2009
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={`${CDN}/freonn-ventilation-unit-5ebe3bmzqsCGdGpvbDz2zo.webp`}
                  alt={`Монтаж инженерных систем в ${cityName}е`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#ED1C24] text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <div>
                    <p className="font-heading font-bold text-sm">Выезд сегодня</p>
                    <p className="text-white/80 text-xs font-body">Пн–Сб 9:00–19:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 bg-[#F7F8FF]">
        <div className="container">
          <h2 className="font-heading font-bold text-[#0F1340] text-2xl mb-2">
            Наши услуги в {cityName}е
          </h2>
          <p className="text-gray-500 font-body mb-8">Полный комплекс инженерных работ под ключ</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.a
                  key={i}
                  href={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group bg-white rounded-xl p-5 hover:shadow-md transition-all border border-gray-100 hover:border-[#2D3092]/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2D3092]/10 flex items-center justify-center mb-3 group-hover:bg-[#2D3092] transition-colors">
                    <Icon size={18} className="text-[#2D3092] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-[#0F1340] text-sm mb-1.5">{service.name}</h3>
                  <p className="text-gray-500 font-body text-xs leading-relaxed">{service.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-[#ED1C24] text-xs font-heading font-semibold">
                    Подробнее <ArrowRight size={12} />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 bg-white">
        <div className="container">
          <h2 className="font-heading font-bold text-[#0F1340] text-2xl mb-8">Как мы работаем</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Заявка", desc: "Оставьте заявку на сайте или позвоните нам. Ответим в течение 30 минут." },
              { step: "02", title: "Выезд инженера", desc: "Инженер приедет на объект, проведёт обследование и составит техническое задание." },
              { step: "03", title: "Проект и смета", desc: "Разработаем проект и смету. Согласуем с вами все детали и стоимость." },
              { step: "04", title: "Монтаж и сдача", desc: "Выполним монтаж в срок, сдадим объект с полным пакетом документов." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-heading font-black text-[#2D3092]/10 mb-2">{item.step}</div>
                <h3 className="font-heading font-bold text-[#0F1340] text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#0F1340] text-white">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl mb-3">
            Нужны инженерные системы в {cityName}е?
          </h2>
          <p className="text-white/70 font-body mb-6">
            Оставьте заявку — наш инженер свяжется с вами в течение 30 минут и рассчитает стоимость бесплатно.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contacts" className="btn-primary inline-flex items-center gap-2 justify-center">
              Получить расчёт <ArrowRight size={16} />
            </a>
            <a href="tel:88001012009" className="btn-outline border-white/30 text-white hover:bg-white/10 inline-flex items-center gap-2 justify-center">
              8(800)101-2009
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
    </PageLayout>
  );
}
