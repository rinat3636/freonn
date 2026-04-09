/*
 * FREONN PAGE LAYOUT — Shared wrapper for all inner pages
 * Includes Header, Footer, FloatingButtons
 * BreadcrumbList schema.org разметка встроена в HTML (микроданные)
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumb?: BreadcrumbItem[];
}

const SITE_URL = "https://freonn.ru";

export default function PageLayout({ children, title, breadcrumb }: PageLayoutProps) {
  const fullCrumbs: BreadcrumbItem[] = [
    { label: "Главная", href: "/" },
    ...(breadcrumb || []),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {(title || breadcrumb) && (
        <div className="bg-[#0F1340] text-white pt-24 pb-10" data-theme="dark">
          <div className="container">
            {breadcrumb && (
              <nav
                aria-label="Хлебные крошки"
                className="flex items-center flex-wrap gap-1 text-xs text-white/50 font-body mb-4"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                {fullCrumbs.map((crumb, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    {i > 0 && (
                      <ChevronRight size={12} className="text-white/30 flex-shrink-0" />
                    )}
                    {i === 0 && (
                      <Home size={11} className="text-white/40 flex-shrink-0 mr-0.5" />
                    )}
                    {crumb.href && i < fullCrumbs.length - 1 ? (
                      <a
                        href={crumb.href}
                        className="hover:text-white transition-colors"
                        itemProp="item"
                      >
                        <span itemProp="name">{crumb.label}</span>
                      </a>
                    ) : (
                      <span
                        className={i === fullCrumbs.length - 1 ? "text-white/80" : ""}
                        itemProp="name"
                      >
                        {crumb.label}
                      </span>
                    )}
                    <meta itemProp="position" content={String(i + 1)} />
                    {crumb.href && (
                      <meta itemProp="id" content={`${SITE_URL}${crumb.href}`} />
                    )}
                  </span>
                ))}
              </nav>
            )}

            {title && (
              <h1 className="font-heading font-bold text-2xl lg:text-4xl text-white">{title}</h1>
            )}
          </div>
        </div>
      )}

      <main className="flex-1" data-theme="light">
        {children}
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
