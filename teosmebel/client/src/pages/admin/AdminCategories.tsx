import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, GripVertical } from "lucide-react";
import { trpc } from "@/lib/trpc";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";

interface CategoryForm {
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
}

const defaultForm: CategoryForm = { name: "", description: "", imageUrl: "", sortOrder: 0 };

export default function AdminCategories() {
  const utils = trpc.useUtils();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<CategoryForm>(defaultForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: categories, isLoading } = trpc.categories.listAll.useQuery();
  const createMutation = trpc.categories.create.useMutation({
    onSuccess: () => { utils.categories.listAll.invalidate(); toast.success("Категория создана"); resetForm(); },
    onError: () => toast.error("Ошибка при создании"),
  });
  const updateMutation = trpc.categories.update.useMutation({
    onSuccess: () => { utils.categories.listAll.invalidate(); toast.success("Категория обновлена"); resetForm(); },
    onError: () => toast.error("Ошибка при обновлении"),
  });
  const deleteMutation = trpc.categories.delete.useMutation({
    onSuccess: () => { utils.categories.listAll.invalidate(); toast.success("Категория удалена"); setDeleteId(null); },
    onError: () => toast.error("Ошибка при удалении"),
  });

  const resetForm = () => { setForm(defaultForm); setEditId(null); setShowForm(false); };

  const handleEdit = (cat: any) => {
    setForm({ name: cat.name, description: cat.description || "", imageUrl: cat.imageUrl || "", sortOrder: cat.sortOrder });
    setEditId(cat.id);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Категории</h2>
          <p className="text-sm text-gray-500">{categories?.length ?? 0} категорий</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
        >
          <Plus className="w-4 h-4" />
          Добавить
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">{editId ? "Редактировать категорию" : "Новая категория"}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Название *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Например: Диваны"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Порядок сортировки</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Описание</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Краткое описание категории"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
              />
            </div>
            <ImageUpload
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              label="Изображение категории"
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

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : !categories || categories.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-4xl mb-3">📁</p>
            <p className="text-gray-500 text-sm">Категорий пока нет. Добавьте первую!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {cat.imageUrl ? (
                    <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">📁</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{cat.name}</p>
                  {cat.description && <p className="text-xs text-gray-400 truncate">{cat.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {cat.isActive ? "Активна" : "Скрыта"}
                  </span>
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(cat.id)}
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
            <h3 className="font-semibold text-gray-900 mb-2">Удалить категорию?</h3>
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
