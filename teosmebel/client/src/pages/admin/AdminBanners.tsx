import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";

interface SlideForm {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  sortOrder: number;
}

const defaultForm: SlideForm = {
  title: "", subtitle: "", buttonText: "Смотреть каталог", buttonLink: "/catalog",
  imageUrl: "", sortOrder: 0,
};

export default function AdminBanners() {
  const utils = trpc.useUtils();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<SlideForm>(defaultForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: slides, isLoading } = trpc.heroSlides.listAll.useQuery();
  const createMutation = trpc.heroSlides.create.useMutation({
    onSuccess: () => { utils.heroSlides.listAll.invalidate(); toast.success("Баннер создан"); resetForm(); },
    onError: () => toast.error("Ошибка при создании"),
  });
  const updateMutation = trpc.heroSlides.update.useMutation({
    onSuccess: () => { utils.heroSlides.listAll.invalidate(); toast.success("Баннер обновлён"); resetForm(); },
    onError: () => toast.error("Ошибка при обновлении"),
  });
  const deleteMutation = trpc.heroSlides.delete.useMutation({
    onSuccess: () => { utils.heroSlides.listAll.invalidate(); toast.success("Баннер удалён"); setDeleteId(null); },
    onError: () => toast.error("Ошибка при удалении"),
  });

  const resetForm = () => { setForm(defaultForm); setEditId(null); setShowForm(false); };

  const handleEdit = (slide: any) => {
    setForm({
      title: slide.title,
      subtitle: slide.subtitle || "",
      buttonText: slide.buttonText || "",
      buttonLink: slide.buttonLink || "",
      imageUrl: slide.imageUrl || "",
      sortOrder: slide.sortOrder,
    });
    setEditId(slide.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Баннеры главной страницы</h2>
          <p className="text-sm text-gray-500">{slides?.length ?? 0} баннеров</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
        >
          <Plus className="w-4 h-4" />
          Добавить баннер
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">{editId ? "Редактировать баннер" : "Новый баннер"}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Заголовок *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Мебель для вашего дома"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Подзаголовок</label>
              <textarea
                rows={2}
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Описание баннера..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Текст кнопки</label>
                <input
                  type="text"
                  value={form.buttonText}
                  onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                  placeholder="Смотреть каталог"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ссылка кнопки</label>
                <input
                  type="text"
                  value={form.buttonLink}
                  onChange={(e) => setForm({ ...form, buttonLink: e.target.value })}
                  placeholder="/catalog"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
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
            </div>
            <ImageUpload
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              label="Фоновое изображение баннера"
            />
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

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : !slides || slides.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-4xl mb-3">🖼️</p>
            <p className="text-gray-500 text-sm">Баннеров пока нет. Добавьте первый!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {slides.map((slide) => (
              <div key={slide.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className="w-20 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {slide.imageUrl ? (
                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">🖼️</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{slide.title}</p>
                  {slide.subtitle && <p className="text-xs text-gray-400 truncate">{slide.subtitle}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${slide.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {slide.isActive ? "Активен" : "Скрыт"}
                  </span>
                  <button onClick={() => handleEdit(slide)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteId(slide.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Удалить баннер?</h3>
            <p className="text-sm text-gray-500 mb-5">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button onClick={() => deleteMutation.mutate({ id: deleteId })} disabled={deleteMutation.isPending}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50">
                Удалить
              </button>
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
