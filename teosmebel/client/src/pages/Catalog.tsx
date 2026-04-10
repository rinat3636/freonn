import { useState } from "react";
import { useSearch } from "wouter";
import { SlidersHorizontal, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export default function Catalog() {
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const initialCategory = params.get("category") ? parseInt(params.get("category")!) : undefined;

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  const { data: categoriesData } = trpc.categories.list.useQuery();
  const { data: productsData, isLoading } = trpc.products.list.useQuery({
    categoryId: selectedCategory,
    limit: 50,
  });

  const categories = categoriesData ?? [];
  const products = productsData?.items ?? [];

  const selectedCategoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-gray-900 text-white pt-24 pb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            {selectedCategoryName ? selectedCategoryName : "Каталог мебели"}
          </h1>
          <p className="text-gray-400 mt-2">
            {products.length > 0 ? `${products.length} товаров` : "Загрузка..."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="flex gap-8">
          {/* Sidebar filters - desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-5 border border-gray-100 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Категории</h2>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setSelectedCategory(undefined)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Все товары
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4 flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Фильтры
              </button>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm"
                >
                  {selectedCategoryName}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Mobile filters dropdown */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-xl p-4 border border-gray-100 mb-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setSelectedCategory(undefined); setShowFilters(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      !selectedCategory ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Все
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setShowFilters(false); }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedCategory === cat.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Products grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🛋️</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Товары не найдены</h3>
                <p className="text-gray-500 mb-6">В этой категории пока нет товаров</p>
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                  style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
                >
                  Смотреть все
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(({ product }) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
