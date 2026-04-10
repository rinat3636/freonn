import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Search, Star, Package } from "lucide-react";
import { trpc } from "@/lib/trpc";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";

interface ProductForm {
  name: string;
  categoryId: string;
  description: string;
  price: string;
  oldPrice: string;
  imageUrl: string;
  material: string;
  dimensions: string;
  color: string;
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  sortOrder: number;
}

const defaultForm: ProductForm = {
  name: "", categoryId: "", description: "", price: "", oldPrice: "",
  imageUrl: "", material: "", dimensions: "", color: "",
  inStock: true, isFeatured: false, isNew: false, sortOrder: 0,
};

export default function AdminProducts() {
  const utils = trpc.useUtils();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(defaultForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const { data: productsData, isLoading } = trpc.products.listAll.useQuery();
  const { data: categories } = trpc.categories.listAll.useQuery();

  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => { utils.products.listAll.invalidate(); toast.success("Товар создан"); resetForm(); },
    onError: () => toast.error("Ошибка при создании"),
  });
  const updateMutation = trpc.products.update.useMutation({
    onSuccess: () => { utils.products.listAll.invalidate(); toast.success("Товар обновлён"); resetForm(); },
    onError: () => toast.error("Ошибка при обновлении"),
  });
  const deleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => { utils.products.listAll.invalidate(); toast.success("Товар удалён"); setDeleteId(null); },
    onError: () => toast.error("Ошибка при удалении"),
  });

  const resetForm = () => { setForm(defaultForm); setEditId(null); setShowForm(false); };

  const handleEdit = (product: any) => {
    setForm({
      name: product.name,
      categoryId: product.categoryId?.toString() || "",
      description: product.description || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      imageUrl: product.imageUrl || "",
      material: product.material || "",
      dimensions: product.dimensions || "",
      color: product.color || "",
      inStock: product.inStock,
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      sortOrder: product.sortOrder,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      categoryId: form.categoryId ? parseInt(form.categoryId) : undefined,
      sortOrder: form.sortOrder,
    };
    if (editId) {
      updateMutation.mutate({ id: editId, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const products = productsData?.items ?? [];
  const filtered = search
    ? products.filter(({ product }) => product.name.toLowerCase().includes(search.toLowerCase()))
    : products;

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Товары</h2>
          <p className="text-sm text-gray-500">{products.length} товаров</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
        >
          <Plus className="w-4 h-4" />
          Добавить товар
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">{editId ? "Редактировать товар" : "Новый товар"}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Название *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Диван угловой Milano"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Категория</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white"
                >
                  <option value="">Без категории</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Порядок</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Цена (сум)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="2500000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Старая цена (сум)</label>
                <input
                  type="number"
                  value={form.oldPrice}
                  onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                  placeholder="3000000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Материал</label>
                <input
                  type="text"
                  value={form.material}
                  onChange={(e) => setForm({ ...form, material: e.target.value })}
                  placeholder="Велюр, дерево"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Размеры</label>
                <input
                  type="text"
                  value={form.dimensions}
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                  placeholder="250×90×80 см"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Цвет</label>
                <input
                  type="text"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  placeholder="Серый, бежевый"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Описание</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Подробное описание товара..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
              />
            </div>

            <ImageUpload
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              label="Главное фото товара"
            />

            {/* Toggles */}
            <div className="flex flex-wrap gap-4">
              {[
                { key: "inStock", label: "В наличии" },
                { key: "isFeatured", label: "Популярный" },
                { key: "isNew", label: "Новинка" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, [key]: !(form as any)[key] })}
                    className={`w-10 h-5 rounded-full transition-colors relative ${(form as any)[key] ? "bg-primary" : "bg-gray-200"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${(form as any)[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
              >
                {isSubmitting ? <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <Check className="w-4 h-4" />}
                {editId ? "Сохранить" : "Создать"}
              </button>
              <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        />
      </div>

      {/* Products list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">{search ? "Ничего не найдено" : "Товаров пока нет. Добавьте первый!"}</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map(({ product, category }) => (
              <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">🛋️</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                    {product.isFeatured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />}
                    {product.isNew && <span className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full">Новинка</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    {category && <span className="text-xs text-gray-400">{category.name}</span>}
                    {product.price && (
                      <span className="text-xs font-medium text-primary">
                        {parseFloat(product.price).toLocaleString("ru-RU")} сум
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {product.inStock ? "В наличии" : "Нет"}
                  </span>
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(product.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Удалить товар?</h3>
            <p className="text-sm text-gray-500 mb-5">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteMutation.mutate({ id: deleteId })}
                disabled={deleteMutation.isPending}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                Удалить
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
