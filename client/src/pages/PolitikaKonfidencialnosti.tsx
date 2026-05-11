/*
 * Политика конфиденциальности — /politika-konfidencialnosti
 */
import { useSEO } from "@/hooks/useSEO";
import PageLayout from "@/components/PageLayout";

export default function PolitikaKonfidencialnostiPage() {
  useSEO({
    title: "Политика конфиденциальности — Freonn",
    description:
      "Как ООО «ЭКС» (Freonn) обрабатывает персональные данные посетителей сайта freonn.ru: цели, сроки, cookies и аналитика.",
    canonical: "/politika-konfidencialnosti",
    breadcrumbs: [{ name: "Политика конфиденциальности", url: "/politika-konfidencialnosti" }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://freonn.ru/politika-konfidencialnosti#webpage",
      name: "Политика конфиденциальности — Freonn",
      description: "Обработка персональных данных на сайте freonn.ru.",
      url: "https://freonn.ru/politika-konfidencialnosti",
      isPartOf: { "@id": "https://freonn.ru/#website" },
      publisher: { "@id": "https://freonn.ru/#organization" },
    },
  });

  return (
    <PageLayout title="Политика конфиденциальности" breadcrumb={[{ label: "Политика конфиденциальности" }]}>
      <article className="py-16 bg-white">
        <div className="container max-w-3xl font-body text-gray-700 leading-relaxed space-y-6">
          <p className="text-sm text-gray-500">
            Редакция от 11 мая 2026 г. Оператор персональных данных: ООО «ЭКС» (торговая марка Freonn), ИНН 3604084591,
            юр. адрес: Воронежская обл., г. Калач, ул. Красина, д. 3, оф. 3; e-mail:{" "}
            <a href="mailto:freonn@internet.ru" className="text-[#B91C1C] hover:underline">
              freonn@internet.ru
            </a>
            .
          </p>
          <section>
            <h2 className="font-heading font-bold text-[#0F1340] text-xl mb-3">1. Общие положения</h2>
            <p>
              Настоящая политика описывает порядок обработки персональных данных при использовании сайта{" "}
              <a href="https://freonn.ru" className="text-[#B91C1C] hover:underline">
                freonn.ru
              </a>{" "}
              и связанных форм обратной связи. Используя сайт, вы соглашаетесь с условиями обработки данных в объёме,
              необходимом для ответа на обращения и улучшения работы сервиса.
            </p>
          </section>
          <section>
            <h2 className="font-heading font-bold text-[#0F1340] text-xl mb-3">2. Какие данные мы можем получить</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Имя, телефон, адрес электронной почты и иные сведения, которые вы указали в форме заявки.</li>
              <li>Технические данные: IP-адрес, тип браузера, время визита, реферер — через стандартные журналы сервера и средства веб-аналитики.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-heading font-bold text-[#0F1340] text-xl mb-3">3. Цели обработки</h2>
            <p>
              Обработка осуществляется для связи с вами по заявке, подготовки коммерческого предложения, исполнения
              договора, а также для обеспечения безопасности и статистики посещений (в т.ч. Яндекс.Метрика, Google
              Analytics при их включении на сайте).
            </p>
          </section>
          <section>
            <h2 className="font-heading font-bold text-[#0F1340] text-xl mb-3">4. Cookies</h2>
            <p>
              Сайт может использовать файлы cookie для сохранения настроек и работы аналитики. Вы можете отключить
              cookie в настройках браузера; часть функций при этом может стать недоступна.
            </p>
          </section>
          <section>
            <h2 className="font-heading font-bold text-[#0F1340] text-xl mb-3">5. Передача третьим лицам</h2>
            <p>
              Мы не передаём персональные данные третьим лицам для их маркетинга. Передача возможна поставщикам хостинга,
              сервисам связи и аналитики — в объёме, необходимом для работы сайта и обработки заявок, с учётом требований
              законодательства РФ.
            </p>
          </section>
          <section>
            <h2 className="font-heading font-bold text-[#0F1340] text-xl mb-3">6. Срок хранения</h2>
            <p>
              Данные из заявок хранятся в течение срока, необходимого для обработки обращения и ведения деловой
              переписки, если иное не предусмотрено договором или законом.
            </p>
          </section>
          <section>
            <h2 className="font-heading font-bold text-[#0F1340] text-xl mb-3">7. Ваши права</h2>
            <p>
              Вы вправе запросить уточнение, блокирование или удаление ваших персональных данных (если это не
              противоречит закону), направив запрос на указанный выше e-mail.
            </p>
          </section>
          <section>
            <h2 className="font-heading font-bold text-[#0F1340] text-xl mb-3">8. Изменения</h2>
            <p>Оператор вправе обновлять политику; актуальная версия всегда доступна по данному адресу.</p>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}
