/*
 * FREONN — Preloader Screen
 * Инженерный чертёж: схема вентиляции рисуется SVG stroke-dashoffset
 * Белый фон + чертёжная сетка, логотип, прогресс-бар, плавное исчезновение
 */
import { useEffect, useRef, useState } from "react";

interface Props {
  onDone: () => void;
}

export default function PreloaderScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 2200; // ms total

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Начинаем fade-out
        setFadeOut(true);
        setTimeout(onDone, 600);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onDone]);

  // SVG paths длины (для stroke-dashoffset)
  // Все пути нарисованы в viewBox="0 0 400 260"
  // Схема вентиляции: центральный вентилятор + воздуховоды + диффузоры

  const drawProgress = progress / 100; // 0..1

  // Каждый элемент начинает рисоваться в свой момент
  const getStroke = (start: number, end: number, totalLen: number) => {
    // start/end — доля от 0..1 когда начинается/заканчивается рисование
    const p = Math.max(0, Math.min(1, (drawProgress - start) / (end - start)));
    const drawn = p * totalLen;
    return {
      strokeDasharray: totalLen,
      strokeDashoffset: totalLen - drawn,
    };
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Чертёжная сетка */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
          </pattern>
          <pattern id="grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.035)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-small)" />
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Центральный блок */}
      <div style={{ position: "relative", width: "min(480px, 92vw)" }}>

        {/* Заголовок чертежа */}
        <div style={{
          textAlign: "center",
          marginBottom: "12px",
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: "clamp(9px, 2vw, 11px)",
          letterSpacing: "0.25em",
          color: "#B91C1C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          opacity: drawProgress > 0.1 ? 1 : 0,
          transition: "opacity 0.4s",
        }}>
          <span style={{ display: "block", width: "24px", height: "1px", background: "#B91C1C" }} />
          ИНЖЕНЕРНЫЕ СИСТЕМЫ · МОНТАЖ ПОД КЛЮЧ
          <span style={{ display: "block", width: "24px", height: "1px", background: "#B91C1C" }} />
        </div>

        {/* Рамка чертежа */}
        <div style={{
          border: "1px solid rgba(0,0,0,0.12)",
          padding: "28px 24px 24px",
          background: "rgba(255,255,255,0.9)",
          position: "relative",
        }}>

          {/* Угловые метки чертежа */}
          {[
            { top: 0, left: 0, borderTop: "2px solid #0F1340", borderLeft: "2px solid #0F1340" },
            { top: 0, right: 0, borderTop: "2px solid #0F1340", borderRight: "2px solid #0F1340" },
            { bottom: 0, left: 0, borderBottom: "2px solid #0F1340", borderLeft: "2px solid #0F1340" },
            { bottom: 0, right: 0, borderBottom: "2px solid #0F1340", borderRight: "2px solid #0F1340" },
          ].map((s, i) => (
            <div key={i} style={{
              position: "absolute",
              width: "14px",
              height: "14px",
              ...s,
            }} />
          ))}

          {/* SVG — схема вентиляции */}
          <svg
            viewBox="0 0 400 200"
            style={{ width: "100%", display: "block", marginBottom: "20px" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ── Центральный вентилятор (окружность) ── */}
            <circle
              cx="200" cy="100" r="32"
              fill="none"
              stroke="#0F1340"
              strokeWidth="1.5"
              style={{
                strokeDasharray: 201,
                strokeDashoffset: 201 - (Math.max(0, Math.min(1, (drawProgress - 0) / 0.2)) * 201),
              }}
            />
            {/* Внутренний круг вентилятора */}
            <circle
              cx="200" cy="100" r="18"
              fill="none"
              stroke="#0F1340"
              strokeWidth="1"
              style={{
                strokeDasharray: 113,
                strokeDashoffset: 113 - (Math.max(0, Math.min(1, (drawProgress - 0.05) / 0.18)) * 113),
              }}
            />
            {/* Лопасти вентилятора (4 линии) */}
            {[0, 45, 90, 135].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 200 + 8 * Math.cos(rad);
              const y1 = 100 + 8 * Math.sin(rad);
              const x2 = 200 + 17 * Math.cos(rad);
              const y2 = 100 + 17 * Math.sin(rad);
              const x3 = 200 - 17 * Math.cos(rad);
              const y3 = 100 - 17 * Math.sin(rad);
              const p = Math.max(0, Math.min(1, (drawProgress - 0.1 - i * 0.02) / 0.12));
              return (
                <line key={i} x1={x1} y1={y1} x2={x3} y2={y3}
                  stroke="#B91C1C" strokeWidth="1.2"
                  strokeDasharray="34"
                  strokeDashoffset={34 - p * 34}
                />
              );
            })}

            {/* ── Главный горизонтальный воздуховод ── */}
            {/* Левый */}
            <line x1="168" y1="100" x2="40" y2="100"
              stroke="#0F1340" strokeWidth="2"
              style={getStroke(0.15, 0.45, 128)}
            />
            {/* Правый */}
            <line x1="232" y1="100" x2="360" y2="100"
              stroke="#0F1340" strokeWidth="2"
              style={getStroke(0.15, 0.45, 128)}
            />

            {/* ── Верхние ответвления (вертикальные) ── */}
            {/* Лев-верх */}
            <line x1="80" y1="100" x2="80" y2="40"
              stroke="#0F1340" strokeWidth="1.5"
              style={getStroke(0.3, 0.5, 60)}
            />
            {/* Прав-верх */}
            <line x1="320" y1="100" x2="320" y2="40"
              stroke="#0F1340" strokeWidth="1.5"
              style={getStroke(0.3, 0.5, 60)}
            />
            {/* Центр-верх */}
            <line x1="200" y1="68" x2="200" y2="40"
              stroke="#0F1340" strokeWidth="1.5"
              style={getStroke(0.35, 0.52, 28)}
            />

            {/* ── Нижние ответвления ── */}
            <line x1="80" y1="100" x2="80" y2="160"
              stroke="#0F1340" strokeWidth="1.5"
              style={getStroke(0.35, 0.55, 60)}
            />
            <line x1="320" y1="100" x2="320" y2="160"
              stroke="#0F1340" strokeWidth="1.5"
              style={getStroke(0.35, 0.55, 60)}
            />
            <line x1="200" y1="132" x2="200" y2="160"
              stroke="#0F1340" strokeWidth="1.5"
              style={getStroke(0.4, 0.57, 28)}
            />

            {/* ── Диффузоры (прямоугольники на концах) ── */}
            {/* Верхние */}
            {[[68, 30, 24, 10], [308, 30, 24, 10], [188, 30, 24, 10]].map(([x, y, w, h], i) => {
              const p = Math.max(0, Math.min(1, (drawProgress - 0.5 - i * 0.03) / 0.15));
              const perim = 2 * (w + h);
              return (
                <rect key={`dt${i}`} x={x} y={y} width={w} height={h}
                  fill="none" stroke="#B91C1C" strokeWidth="1.2"
                  strokeDasharray={perim}
                  strokeDashoffset={perim - p * perim}
                />
              );
            })}
            {/* Нижние */}
            {[[68, 160, 24, 10], [308, 160, 24, 10], [188, 160, 24, 10]].map(([x, y, w, h], i) => {
              const p = Math.max(0, Math.min(1, (drawProgress - 0.53 - i * 0.03) / 0.15));
              const perim = 2 * (w + h);
              return (
                <rect key={`db${i}`} x={x} y={y} width={w} height={h}
                  fill="none" stroke="#B91C1C" strokeWidth="1.2"
                  strokeDasharray={perim}
                  strokeDashoffset={perim - p * perim}
                />
              );
            })}

            {/* ── Стрелки потока воздуха ── */}
            {/* Стрелки влево на левом воздуховоде */}
            {[110, 130, 150].map((x, i) => {
              const p = Math.max(0, Math.min(1, (drawProgress - 0.55 - i * 0.02) / 0.12));
              return (
                <g key={`al${i}`} opacity={p}>
                  <line x1={x} y1="95" x2={x - 8} y2="100" stroke="#B91C1C" strokeWidth="1" />
                  <line x1={x} y1="105" x2={x - 8} y2="100" stroke="#B91C1C" strokeWidth="1" />
                </g>
              );
            })}
            {/* Стрелки вправо на правом воздуховоде */}
            {[250, 270, 290].map((x, i) => {
              const p = Math.max(0, Math.min(1, (drawProgress - 0.55 - i * 0.02) / 0.12));
              return (
                <g key={`ar${i}`} opacity={p}>
                  <line x1={x} y1="95" x2={x + 8} y2="100" stroke="#B91C1C" strokeWidth="1" />
                  <line x1={x} y1="105" x2={x + 8} y2="100" stroke="#B91C1C" strokeWidth="1" />
                </g>
              );
            })}

            {/* ── Размерные линии (технический стиль) ── */}
            <g opacity={Math.max(0, Math.min(1, (drawProgress - 0.65) / 0.15))}>
              {/* Горизонтальная размерная линия */}
              <line x1="40" y1="185" x2="360" y2="185" stroke="rgba(15,19,64,0.3)" strokeWidth="0.8" strokeDasharray="4 3" />
              <line x1="40" y1="181" x2="40" y2="189" stroke="rgba(15,19,64,0.3)" strokeWidth="0.8" />
              <line x1="360" y1="181" x2="360" y2="189" stroke="rgba(15,19,64,0.3)" strokeWidth="0.8" />
              <text x="200" y="183" textAnchor="middle" fontSize="7" fill="rgba(15,19,64,0.4)"
                fontFamily="'IBM Plex Mono', monospace" letterSpacing="1">
                СИСТЕМА ВЕНТИЛЯЦИИ
              </text>
            </g>

            {/* ── Метки узлов ── */}
            {[
              { x: 200, y: 100, label: "ВУ-1" },
              { x: 80, y: 100, label: "Т-1" },
              { x: 320, y: 100, label: "Т-2" },
            ].map(({ x, y, label }, i) => {
              const p = Math.max(0, Math.min(1, (drawProgress - 0.7 - i * 0.03) / 0.12));
              return (
                <g key={label} opacity={p}>
                  <circle cx={x} cy={y} r="3" fill="#B91C1C" />
                  <text x={x + 6} y={y - 5} fontSize="7" fill="#B91C1C"
                    fontFamily="'IBM Plex Mono', monospace" letterSpacing="1">
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Логотип */}
          <div style={{
            textAlign: "center",
            marginBottom: "16px",
            opacity: drawProgress > 0.6 ? 1 : 0,
            transform: `translateY(${drawProgress > 0.6 ? 0 : 8}px)`,
            transition: "opacity 0.5s, transform 0.5s",
          }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663524928365/d5oRPUYjSRzESZKpUgG9pW/freonn-logo_62401a1b.png"
              alt="FREONN"
              style={{ height: "40px", display: "inline-block" }}
            />
          </div>

          {/* Прогресс-бар */}
          <div style={{ position: "relative", height: "2px", background: "rgba(0,0,0,0.08)", marginBottom: "10px" }}>
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${progress}%`,
              background: "#B91C1C",
              transition: "width 0.05s linear",
            }} />
          </div>

          {/* Текст загрузки */}
          <div style={{
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(15,19,64,0.4)",
          }}>
            {progress < 100 ? `ЗАГРУЗКА... ${progress}%` : "ГОТОВО"}
          </div>
        </div>

        {/* Штамп чертежа (нижний правый угол) */}
        <div style={{
          position: "absolute",
          bottom: "4px",
          right: "0",
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: "8px",
          letterSpacing: "0.15em",
          color: "rgba(0,0,0,0.2)",
          opacity: drawProgress > 0.8 ? 1 : 0,
          transition: "opacity 0.4s",
        }}>
          ООО «ЭКС» · ИНН 3604084591
        </div>
      </div>
    </div>
  );
}
