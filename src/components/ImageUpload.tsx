"use client";

import { useState, useRef } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch {
      alert("Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        {value && (
          <div className="w-16 h-16 rounded-sm overflow-hidden border border-gold/10 shrink-0">
            <img src={value} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-[12px] uppercase tracking-wider px-4 py-2 border border-gold/20 hover:border-gold/40 text-gold transition-colors disabled:opacity-50"
          >
            {uploading ? "Загрузка..." : value ? "Заменить" : "Загрузить фото"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="ml-2 text-[11px] text-ash hover:text-red-400 transition-colors"
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
