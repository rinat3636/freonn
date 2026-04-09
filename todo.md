# Freonn Website TODO

## Completed
- [x] Basic homepage layout with all sections
- [x] Navigation header with adaptive color on scroll
- [x] Hero section with background image
- [x] Services section (8 services)
- [x] About section with stats
- [x] Objects/portfolio section
- [x] Process steps section
- [x] Pricing section
- [x] Blog section with 18 articles
- [x] FAQ section
- [x] Contact form with company details
- [x] Footer with full navigation
- [x] All internal pages: /contacts, /o-kompanii, /blog, /uslugi, /obekty, /ceny, /faq
- [x] 8 service pages (ventilyaciya, kondicionirovanie, dymoudalenie, otoplenie, holodosnabzhenie, vodosnabzhenie, peskostruj, elektrosnabzhenie)
- [x] Object category pages (promyshlennye, kommercheskie, premium)
- [x] City SEO pages (istra, odintsovo, krasnogorsk, khimki, etc.)
- [x] Pricing service pages
- [x] Additional pages: akcii, partnery, dokumenty, rekvizity, garantii, novosti, vakansii
- [x] Freonn logo integrated
- [x] All "Информация об объекте" buttons → MAX channel link
- [x] Header color fix: transparent on dark sections, #0F1340 on scroll
- [x] Railway deployment fix (import.meta.dirname issue)
- [x] SEO meta tags for static pages (useSEO hook created)
- [x] SEO meta tags for dynamic pages: ServicePage, CityPage, BlogArticle, ObjectCategory, PricingServicePage
- [x] robots.txt created
- [x] sitemap.xml created with all URLs

## Pending
- [x] Form submission notification to MAX channel (MAX bot + notifyOwner backup)
- [ ] Replace stock photos with real project photos
- [ ] Custom domain setup (freonn.ru)
- [ ] Google/Yandex Search Console submission

## Session April 9, 2026 (update 2)
- [x] Replace ООО «Фреонн» / ООО «ФРЕОНН» with ООО «ЭКС» across all files (Footer, ContactSection, Requisites, Documents, index.html)

## Session April 9, 2026
- [x] ServicePage fix: added useRoute hooks for all 10 alias routes (ustanovka-ventilyacii, etc.)
- [x] Form notifications: notifyOwner (Manus) added as backup alongside MAX bot
- [x] All pages verified — no empty/placeholder content found (4 ComingSoon pages are intentional)

## SEO Максимальная проработка (Апрель 2025)
- [x] useSEO хук расширен: JSON-LD, BreadcrumbList, ogType article, noIndex, publishedTime
- [x] JSON-LD LocalBusiness на главной (рейтинг, часы работы, geo, hasOfferCatalog)
- [x] JSON-LD Service на страницах услуг и городских страницах
- [x] JSON-LD FAQPage на странице FAQ (8 вопросов)
- [x] JSON-LD Article на страницах блога
- [x] JSON-LD ContactPage на странице контактов
- [x] JSON-LD CollectionPage на странице блога
- [x] JSON-LD Organization на каждой странице (через useSEO)
- [x] JSON-LD BreadcrumbList на всех страницах с breadcrumbs
- [x] JSON-LD WebSite + SearchAction в index.html
- [x] index.html: geo meta, yandex-region, og:locale ru_RU, preconnect, верификационные плейсхолдеры
- [x] sitemap.xml расширен: lastmod, priority, image sitemap, 80+ URL
- [x] HeroSection: ключевые слова в подзаголовке, внутренние ссылки на страницы услуг
- [x] ServicesSection: H2 с ключевой фразой "монтаж инженерных систем под ключ"
- [x] robots.txt обновлён

## SEO Максимальная оптимизация (April 9, 2026)
- [ ] Аудит текущего SEO — index.html, useSEO хук, sitemap, robots.txt
- [ ] index.html: полные мета-теги, OG, Twitter Card, canonical, preconnect, favicon
- [ ] useSEO хук: og:image, og:locale, geo.*, article:published_time, hreflang
- [ ] JSON-LD: Organization + LocalBusiness на главной, Service на страницах услуг, FAQ, BreadcrumbList
- [ ] sitemap.xml: правильный домен freonn.ru, все URL, приоритеты, changefreq
- [ ] robots.txt: Sitemap ссылка, запрет служебных путей
- [ ] Семантика: H1 только один на странице, H2/H3 с ключевыми словами
- [ ] Alt-теги: все изображения с описательным alt
- [ ] Внутренняя перелинковка: связанные услуги, хлебные крошки

## Исправление восприятия домена как интернет-магазина (April 9, 2026)
- [ ] Убрать все e-commerce сигналы (Product/Offer schema, корзина, товарные цены)
- [ ] Усилить LocalBusiness/ProfessionalService JSON-LD сигналы
- [ ] Обновить robots.txt для ускорения переиндексации
- [ ] Создать инструкцию по регистрации в Яндекс.Вебмастере

## Яндекс.Метрика — Цели и трекинг (April 9, 2026)
- [x] Добавить цель "Отправка формы заявки" (JS-событие: form_submit, ID: 545368654)
- [x] Добавить цель "Клик по телефону" (все номера, ID: 545368823)
- [x] Добавить цель "Переход в мессенджер" (все мессенджеры, ID: 545369005)
- [x] Подтвердить сайт в Яндекс.Вебмастере (уже активен)
- [x] Настроить регион "Москва" в Яндекс.Вебмастере (заявка принята, 7 дней)
- [x] Создать утилиту ymGoal (client/src/lib/ym.ts)
- [x] Добавить трекинг form_submit в ContactSection
- [x] Добавить трекинг phone_click в Header, HeroSection, ContactSection, FloatingButtons, Footer
- [x] Добавить трекинг messenger_click в FloatingButtons, Footer, ObjectCategory
- [x] Добавить трекинг phone_click в страницы: NotFound, BlogArticle, ServicePage, CityPage, Requisites, Guarantee, PricingServicePage

## Загрузка файла в форму заявки (April 9, 2026)
- [x] Добавить поле загрузки файла в ContactSection
- [x] tRPC endpoint для загрузки файла на S3
- [x] Передача URL файла вместе с заявкой (емайл/уведомление)й в уведомление
