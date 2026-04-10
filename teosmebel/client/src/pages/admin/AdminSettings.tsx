import { useState, useEffect } from "react";
import { Save, Phone, MapPin, Mail, Clock, Instagram, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface SettingsForm {
  phone: string;
  address: string;
  email: string;
  workHours: string;
  instagram: string;
  telegram: string;
}

const defaultForm: SettingsForm = {
  phone: "+998 90 000 00 00",
  address: "г. Ташкент",
  email: "info@teosmebel.uz",
  workHours: "Пн–Сб: 9:00–18:00",
  instagram: "",
  telegram: "",
};

export default function AdminSettings() {
  const utils = trpc.useUtils();
  const [form, setForm] = useState<SettingsForm>(defaultForm);

  const { data: settings, isLoading } = trpc.settings.get.useQuery();
  const updateMutation = trpc.settings.update.useMutation({
    onSuccess: () => { utils.settings.get.invalidate(); toast.success("Настройки сохранены"); },
    onError: () => toast.error("Ошибка при сохранении"),
  });

  useEffect(() => {
    if (settings) {
      setForm({
        phone: settings.phone || defaultForm.phone,
        address: settings.address || defaultForm.address,
        email: settings.email || defaultForm.email,
        workHours: settings.workHours || defaultForm.workHours,
        instagram: settings.instagram || "",
        telegram: settings.telegram || "",
      });
    }
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(form as unknown as Record<string, string>);
  };

  const fields = [
    { key: "phone", label: "Телефон", icon: <Phone className="w-4 h-4" />, placeholder: "+998 90 000 00 00", type: "tel" },
    { key: "email", label: "Email", icon: <Mail className="w-4 h-4" />, placeholder: "info@teosmebel.uz", type: "email" },
    { key: "address", label: "Адрес", icon: <MapPin className="w-4 h-4" />, placeholder: "г. Ташкент, ул. Примерная, 1", type: "text" },
    { key: "workHours", label: "Режим работы", icon: <Clock className="w-4 h-4" />, placeholder: "Пн–Сб: 9:00–18:00", type: "text" },
    { key: "instagram", label: "Instagram (ссылка)", icon: <Instagram className="w-4 h-4" />, placeholder: "https://instagram.com/teosmebel", type: "url" },
    { key: "telegram", label: "Telegram (ссылка)", icon: <Send className="w-4 h-4" />, placeholder: "https://t.me/teosmebel", type: "url" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Настройки сайта</h2>
        <p className="text-sm text-gray-500">Контактная информация, отображаемая на сайте</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {fields.map(({ key, label, icon, placeholder, type }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
              <input
                type={type}
                value={(form as any)[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.12 0.01 60)" }}
          >
            {updateMutation.isPending ? (
              <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Сохранить настройки
          </button>
        </div>
      </form>
    </div>
  );
}
