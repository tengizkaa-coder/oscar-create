"use client";

import { useEffect, useState } from "react";

const FIELDS = [
  { key: "site_name", label: "Название сайта", placeholder: "Пьяная Москва" },
  { key: "phone", label: "Телефон", placeholder: "+7 (495) 095-95-99" },
  { key: "address", label: "Город / Зона доставки", placeholder: "Москва. За МКАД — по предоплате" },
  { key: "work_hours", label: "Время работы", placeholder: "24/7" },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then(setSettings); }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (key: string, value: string) =>
    setSettings((s) => ({ ...s, [key]: value }));

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-light text-ivory">Настройки</h1>
        <div className="w-8 sm:w-10 h-px bg-gold/30 mt-2 sm:mt-3" />
      </div>

      <div className="card-lux rounded-sm p-4 sm:p-6 space-y-5 sm:space-y-6 max-w-2xl">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">{f.label}</label>
            <input
              value={settings[f.key] || ""}
              onChange={(e) => updateField(f.key, e.target.value)}
              className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]"
              placeholder={f.placeholder}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saving}
          className={`text-[11px] sm:text-[12px] uppercase tracking-wider px-5 sm:px-6 py-2.5 transition-all duration-300 min-h-[44px] ${
            saved ? "bg-green-700 text-green-100" : "bg-gold hover:bg-gold-light text-noir"
          }`}
        >
          {saved ? "Сохранено" : saving ? "Сохраняем..." : "Сохранить"}
        </button>
      </div>
    </div>
  );
}
