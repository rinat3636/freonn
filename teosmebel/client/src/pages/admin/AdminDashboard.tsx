import { Package, Tag, Image, Settings, ArrowRight, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Props {
  onNavigate: (section: string) => void;
}

export default function AdminDashboard({ onNavigate }: Props) {
  const { data: productsData } = trpc.products.listAll.useQuery();
  const { data: categoriesData } = trpc.categories.listAll.useQuery();
  const { data: slidesData } = trpc.heroSlides.listAll.useQuery();

  const totalProducts = productsData?.items.length ?? 0;
  const totalCategories = categoriesData?.length ?? 0;
  const totalSlides = slidesData?.length ?? 0;

  const stats = [
    { label: "Товаров", value: totalProducts, icon: <Package className="w-6 h-6" />, section: "products", color: "oklch(0.72 0.12 75)" },
    { label: "Категорий", value: totalCategories, icon: <Tag className="w-6 h-6" />, section: "categories", color: "oklch(0.6 0.15 200)" },
    { label: "Баннеров", value: totalSlides, icon: <Image className="w-6 h-6" />, section: "banners", color: "oklch(0.6 0.15 150)" },
  ];

  const quickActions = [
    { label: "Добавить товар", section: "products", icon: <Package className="w-5 h-5" /> },
    { label: "Добавить категорию", section: "categories", icon: <Tag className="w-5 h-5" /> },
    { label: "Управление баннерами", section: "banners", icon: <Image className="w-5 h-5" /> },
    { label: "Настройки сайта", section: "settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-gray-900">Добро пожаловать в панель управления</h2>
        </div>
        <p className="text-sm text-gray-500">Управляйте товарами, категориями, баннерами и настройками сайта.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <button
            key={stat.section}
            onClick={() => onNavigate(stat.section)}
            className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color} / 0.15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.section}
              onClick={() => onNavigate(action.section)}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-50 group-hover:bg-primary/10 transition-colors"
                style={{ color: "oklch(0.72 0.12 75)" }}>
                {action.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary ml-auto transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
