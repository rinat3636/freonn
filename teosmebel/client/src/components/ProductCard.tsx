import { Link } from "wouter";
import { ShoppingBag, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price?: string | null;
  oldPrice?: string | null;
  imageUrl?: string | null;
  isFeatured?: boolean;
  isNew?: boolean;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop";

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.oldPrice && product.price && parseFloat(product.oldPrice) > parseFloat(product.price);
  const discountPercent = hasDiscount
    ? Math.round((1 - parseFloat(product.price!) / parseFloat(product.oldPrice!)) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
          <img
            src={product.imageUrl || PLACEHOLDER}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER;
            }}
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary text-white">
                Новинка
              </span>
            )}
            {hasDiscount && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500 text-white">
                -{discountPercent}%
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                Хит
              </span>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1.5 rounded-full">
                Нет в наличии
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors text-sm md:text-base">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              {product.price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-primary">
                    {parseFloat(product.price).toLocaleString("ru-RU")} сум
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                      {parseFloat(product.oldPrice!).toLocaleString("ru-RU")}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-sm text-gray-500">Цена по запросу</span>
              )}
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 group-hover:border-primary group-hover:bg-primary/5 transition-colors">
              <ShoppingBag className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
