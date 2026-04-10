import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Phone, Check, Package, Ruler, Palette } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PLACEHOLDER = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop";

interface ProductDetailProps {
  slug: string;
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const [activeImg, setActiveImg] = useState(0);
  const { data, isLoading } = trpc.products.getBySlug.useQuery({ slug });
  const { data: settings } = trpc.settings.get.useQuery();
  const phone = settings?.phone ?? "+998 90 000 00 00";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 max-w-7xl pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 max-w-7xl pt-28 pb-16 text-center">
          <p className="text-5xl mb-4">🛋️</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Товар не найден</h1>
          <Link href="/catalog" className="text-primary hover:underline">← Вернуться в каталог</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { product, category } = data;

  // Parse images
  let images: string[] = [];
  try {
    if (product.images) images = JSON.parse(product.images);
  } catch {}
  if (product.imageUrl && !images.includes(product.imageUrl)) {
    images = [product.imageUrl, ...images];
  }
  if (images.length === 0) images = [PLACEHOLDER];

  const hasDiscount = product.oldPrice && product.price &&
    parseFloat(product.oldPrice) > parseFloat(product.price);
  const discountPercent = hasDiscount
    ? Math.round((1 - parseFloat(product.price!) / parseFloat(product.oldPrice!)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 max-w-7xl pt-24 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/catalog?category=${category.id}`} className="hover:text-primary transition-colors">
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 mb-4">
              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImg === idx ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {category && (
              <Link
                href={`/catalog?category=${category.id}`}
                className="text-sm text-primary font-medium hover:underline"
              >
                {category.name}
              </Link>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.price ? (
                <>
                  <span className="text-3xl font-bold text-primary">
                    {parseFloat(product.price).toLocaleString("ru-RU")} сум
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        {parseFloat(product.oldPrice!).toLocaleString("ru-RU")} сум
                      </span>
                      <span className="px-2 py-0.5 text-sm font-semibold rounded-full bg-red-100 text-red-600">
                        -{discountPercent}%
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-xl text-gray-500">Цена по запросу</span>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                  <Check className="w-4 h-4" /> В наличии
                </span>
              ) : (
                <span className="text-sm text-red-500 font-medium">Нет в наличии</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            )}

            {/* Specs */}
            {(product.material || product.dimensions || product.color) && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
                {product.material && (
                  <div className="flex items-center gap-3 text-sm">
                    <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-500">Материал:</span>
                    <span className="font-medium text-gray-900">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-center gap-3 text-sm">
                    <Ruler className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-500">Размеры:</span>
                    <span className="font-medium text-gray-900">{product.dimensions}</span>
                  </div>
                )}
                {product.color && (
                  <div className="flex items-center gap-3 text-sm">
                    <Palette className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-500">Цвет:</span>
                    <span className="font-medium text-gray-900">{product.color}</span>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
              >
                <Phone className="w-4 h-4" />
                Заказать по телефону
              </a>
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-all"
              >
                Написать нам
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
