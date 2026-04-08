import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ContactsPage from "./pages/Contacts";
import AboutCompanyPage from "./pages/AboutCompany";
import BlogPage from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticle";
import FAQPage from "./pages/FAQ";
import ServicesPage from "./pages/Services";
import ObjectsPage from "./pages/Objects";
import PricingPage from "./pages/Pricing";
import ServicePageComponent from "./pages/ServicePage";
import ComingSoon from "./pages/ComingSoon";

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path={"/"} component={Home} />
      <Route path={"/contacts"} component={ContactsPage} />
      <Route path={"/o-kompanii"} component={AboutCompanyPage} />
      <Route path={"/blog"} component={BlogPage} />
      <Route path={"/blog/:slug"} component={BlogArticlePage} />
      <Route path={"/faq"} component={FAQPage} />
      <Route path={"/uslugi"} component={ServicesPage} />
      <Route path={"/obekty"} component={ObjectsPage} />
      <Route path={"/ceny"} component={PricingPage} />

      {/* Service pages */}
      <Route path={"/ventilyaciya"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/kondicionirovanie"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/dymoudalenie"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/otoplenie"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/holodosnabzhenie"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/vodosnabzhenie"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/peskostrujnaya-obrabotka"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/elektrosnabzhenie"}>{() => <ServicePageComponent />}</Route>

      {/* Footer service aliases */}
      <Route path={"/ustanovka-ventilyacii"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/ustanovka-kondicionirovaniya"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/ustanovka-dymoudaleniya"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/vozdushnoe-otoplenie"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/vodosnabzhenie-i-kanalizaciya"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/elektrosnabzhenie-i-osveshchenie"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/proektirovanie-ovik"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/montazh-ovik"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/puskonaladochnye-raboty"}>{() => <ServicePageComponent />}</Route>
      <Route path={"/servisnoe-obsluzhivanie"}>{() => <ServicePageComponent />}</Route>

      {/* Pricing sub-pages */}
      <Route path={"/ceny/:slug"}>
        {(params) => (
          <ComingSoon
            title={`Цены — ${params.slug?.replace(/-/g, " ")}`}
            breadcrumb={[{ label: "Цены", href: "/ceny" }, { label: params.slug || "" }]}
          />
        )}
      </Route>

      {/* Object category pages */}
      <Route path={"/promyshlennye-obekty"}>
        {() => (
          <ComingSoon
            title="Промышленные объекты"
            breadcrumb={[{ label: "Объекты", href: "/obekty" }, { label: "Промышленные" }]}
          />
        )}
      </Route>
      <Route path={"/kommercheskie-obekty"}>
        {() => (
          <ComingSoon
            title="Коммерческие объекты"
            breadcrumb={[{ label: "Объекты", href: "/obekty" }, { label: "Коммерческие" }]}
          />
        )}
      </Route>
      <Route path={"/premium-obekty"}>
        {() => (
          <ComingSoon
            title="Премиум объекты"
            breadcrumb={[{ label: "Объекты", href: "/obekty" }, { label: "Премиум" }]}
          />
        )}
      </Route>

      {/* Company sub-pages */}
      <Route path={"/licenzii-i-sertifikaty"}>
        {() => (
          <ComingSoon
            title="Лицензии и сертификаты"
            breadcrumb={[{ label: "О компании", href: "/o-kompanii" }, { label: "Лицензии" }]}
          />
        )}
      </Route>
      <Route path={"/sertifikaty"}>
        {() => (
          <ComingSoon
            title="Сертификаты"
            breadcrumb={[{ label: "О компании", href: "/o-kompanii" }, { label: "Сертификаты" }]}
          />
        )}
      </Route>
      <Route path={"/rekvizity"}>
        {() => (
          <ComingSoon
            title="Реквизиты компании"
            breadcrumb={[{ label: "О компании", href: "/o-kompanii" }, { label: "Реквизиты" }]}
          />
        )}
      </Route>
      <Route path={"/garantii"}>
        {() => (
          <ComingSoon
            title="Гарантии"
            breadcrumb={[{ label: "О компании", href: "/o-kompanii" }, { label: "Гарантии" }]}
          />
        )}
      </Route>
      <Route path={"/oplata-i-dostavka"}>
        {() => (
          <ComingSoon
            title="Оплата и доставка"
            breadcrumb={[{ label: "О компании", href: "/o-kompanii" }, { label: "Оплата" }]}
          />
        )}
      </Route>
      <Route path={"/akcii"}>
        {() => (
          <ComingSoon
            title="Акции и спецпредложения"
            breadcrumb={[{ label: "Акции" }]}
          />
        )}
      </Route>
      <Route path={"/novosti"}>
        {() => (
          <ComingSoon
            title="Новости компании"
            breadcrumb={[{ label: "Новости" }]}
          />
        )}
      </Route>
      <Route path={"/vakansii"}>
        {() => (
          <ComingSoon
            title="Вакансии"
            breadcrumb={[{ label: "Вакансии" }]}
          />
        )}
      </Route>
      <Route path={"/dokumenty"}>
        {() => (
          <ComingSoon
            title="Документы"
            breadcrumb={[{ label: "Документы" }]}
          />
        )}
      </Route>
      <Route path={"/sotrudniki"}>
        {() => (
          <ComingSoon
            title="Сотрудники"
            breadcrumb={[{ label: "Сотрудники" }]}
          />
        )}
      </Route>
      <Route path={"/video-kejsy"}>
        {() => (
          <ComingSoon
            title="Видео кейсы"
            breadcrumb={[{ label: "Видео кейсы" }]}
          />
        )}
      </Route>
      <Route path={"/poleznye-materialy"}>
        {() => (
          <ComingSoon
            title="Полезные материалы"
            breadcrumb={[{ label: "Полезные материалы" }]}
          />
        )}
      </Route>
      <Route path={"/partneram"}>
        {() => (
          <ComingSoon
            title="Партнёрам"
            breadcrumb={[{ label: "Партнёрам" }]}
          />
        )}
      </Route>

      {/* Pricing pages from footer */}
      <Route path={"/ceny-na-montazh-ventilyacii"}>
        {() => (
          <ComingSoon
            title="Цены на монтаж вентиляции"
            breadcrumb={[{ label: "Цены", href: "/ceny" }, { label: "Вентиляция" }]}
          />
        )}
      </Route>
      <Route path={"/ceny-na-montazh-kondicionirovaniya"}>
        {() => (
          <ComingSoon
            title="Цены на монтаж кондиционирования"
            breadcrumb={[{ label: "Цены", href: "/ceny" }, { label: "Кондиционирование" }]}
          />
        )}
      </Route>
      <Route path={"/ceny-na-montazh-dymoudaleniya"}>
        {() => (
          <ComingSoon
            title="Цены на монтаж дымоудаления"
            breadcrumb={[{ label: "Цены", href: "/ceny" }, { label: "Дымоудаление" }]}
          />
        )}
      </Route>
      <Route path={"/ceny-na-montazh-inzhenernyh-sistem"}>
        {() => (
          <ComingSoon
            title="Цены на монтаж инженерных систем"
            breadcrumb={[{ label: "Цены", href: "/ceny" }, { label: "Инженерные системы" }]}
          />
        )}
      </Route>
      <Route path={"/ceny-na-peskostruj"}>
        {() => (
          <ComingSoon
            title="Цены на пескоструйную обработку"
            breadcrumb={[{ label: "Цены", href: "/ceny" }, { label: "Пескоструй" }]}
          />
        )}
      </Route>

      {/* City pages */}
      <Route path={"/:city"}>
        {(params) => (
          <ComingSoon
            title={`Инженерные системы — ${params.city?.replace(/-/g, " ")}`}
            breadcrumb={[{ label: params.city || "" }]}
          />
        )}
      </Route>

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
