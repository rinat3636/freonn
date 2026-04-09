/*
 * FREONN PAGE LAYOUT — Shared wrapper for all inner pages
 * Includes Header, Footer, FloatingButtons
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function PageLayout({ children, title, breadcrumb }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Page hero / breadcrumb */}
      {(title || breadcrumb) && (
        <div className="bg-[#0F1340] text-white pt-24 pb-10" data-theme="dark">
          <div className="container">
            {breadcrumb && (
              <nav className="flex items-center gap-2 text-xs text-white/50 font-body mb-3">
                <a href="/" className="hover:text-white transition-colors">Главная</a>
                {breadcrumb.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span>/</span>
                    {crumb.href ? (
                      <a href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</a>
                    ) : (
                      <span className="text-white/80">{crumb.label}</span>
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
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
