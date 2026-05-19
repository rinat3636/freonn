import { useEffect, useState } from "react";
import { Link } from "wouter";
import { exchangeHandoff } from "@/lib/freonn-group/auth";
import { isFreonnApiConfigured } from "@/lib/freonn-group/config";
import { useFreonnAuth } from "@/contexts/FreonnAuthContext";

export default function AppCallback() {
  const { refresh } = useFreonnAuth();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const handoff = params.get("handoff");
    if (!isFreonnApiConfigured()) {
      setError("API Freonn Group не настроен (VITE_FREONN_API_BASE_URL)");
      return;
    }
    if (!handoff) {
      setError("Не передан токен входа");
      return;
    }
    void exchangeHandoff(handoff)
      .then(() => refresh())
      .then(() => setDone(true))
      .catch((e) => setError(e instanceof Error ? e.message : "Ошибка входа"));
  }, [refresh]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center gap-4 py-16 bg-[#0F1340]">
      {done ? (
        <>
          <h1 className="text-xl font-bold text-white">Вход выполнен</h1>
          <p className="text-white/70 text-sm max-w-md">
            Заявки с freonn.ru отобразятся в приложении Freonn Group.
          </p>
          <Link href="/" className="text-[#B91C1C] font-semibold underline">
            На главную
          </Link>
        </>
      ) : error ? (
        <>
          <h1 className="text-xl font-bold text-red-400">Не удалось войти</h1>
          <p className="text-white/70 text-sm">{error}</p>
          <Link href="/" className="underline text-white/80">
            На главную
          </Link>
        </>
      ) : (
        <p className="text-white/70">Вход в единый аккаунт…</p>
      )}
    </div>
  );
}
