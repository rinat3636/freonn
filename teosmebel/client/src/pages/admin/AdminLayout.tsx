import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Package, Tag, Image, Settings, LogOut,
  Menu, X, ChevronRight, AlertCircle
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminBanners from "./AdminBanners";
import AdminSettings from "./AdminSettings";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663534325660/WGqC3G9Gb5Uzbq5ctCnL25/teosmebel_logo_cb50659e.png";

const navItems = [
  { id: "dashboard", label: "Дашборд", icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: "products", label: "Товары", icon: <Package className="w-5 h-5" /> },
  { id: "categories", label: "Категории", icon: <Tag className="w-5 h-5" /> },
  { id: "banners", label: "Баннеры", icon: <Image className="w-5 h-5" /> },
  { id: "settings", label: "Настройки", icon: <Settings className="w-5 h-5" /> },
];

export default function AdminLayout() {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine active section from URL
  const pathParts = location.split("/");
  const sectionFromUrl = pathParts[2] || "dashboard";
  const [activeSection, setActiveSection] = useState(sectionFromUrl);

  useEffect(() => {
    setActiveSection(sectionFromUrl);
  }, [sectionFromUrl]);

  const { data: user, isLoading } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => { window.location.href = "/"; },
  });

  const handleNav = (id: string) => {
    setActiveSection(id);
    navigate(id === "dashboard" ? "/admin" : `/admin/${id}`);
    setSidebarOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md w-full text-center shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Требуется авторизация</h1>
          <p className="text-gray-500 text-sm mb-6">Войдите в систему для доступа к панели администратора</p>
          <a
            href={`${import.meta.env.VITE_OAUTH_PORTAL_URL || "https://api.manus.im/oauth"}/login?redirect=${encodeURIComponent(window.location.href)}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
          >
            Войти
          </a>
          <div className="mt-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← На главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md w-full text-center shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Доступ запрещён</h1>
          <p className="text-gray-500 text-sm mb-6">У вас нет прав администратора</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-all"
          >
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "products": return <AdminProducts />;
      case "categories": return <AdminCategories />;
      case "banners": return <AdminBanners />;
      case "settings": return <AdminSettings />;
      default: return <AdminDashboard onNavigate={handleNav} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "oklch(0.13 0.01 60)" }}
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <img src={LOGO_URL} alt="Teos Mebel" className="h-9 w-auto brightness-0 invert" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-xs text-gray-500">Администратор</p>
          <p className="text-sm text-white font-medium truncate">{user.name || user.email || "Admin"}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              style={activeSection === item.id ? { background: "oklch(0.72 0.12 75 / 0.2)", color: "oklch(0.72 0.12 75)" } : {}}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span>На сайт</span>
          </Link>
          <button
            onClick={() => logoutMutation.mutate()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-gray-900">
            {navItems.find((n) => n.id === activeSection)?.label ?? "Панель управления"}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
