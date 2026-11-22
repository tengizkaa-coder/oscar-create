"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/slugify";

type Category = { id: number; name: string; slug: string; sortOrder: number };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const load = async () => { setCategories(await fetch("/api/categories").then((r) => r.json())); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, sortOrder: categories.length }),
    });
    setName(""); setSlug(""); load();
  };

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-light text-ivory">Категории</h1>
        <div className="w-8 sm:w-10 h-px bg-gold/30 mt-2 sm:mt-3" />
      </div>

      <form onSubmit={handleSubmit} className="card-lux rounded-sm p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end">
        <div className="flex-1">
          <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Название</label>
          <input required value={name} onChange={(e) => { setName(e.target.value); setSlug(slugify(e.target.value)); }} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]" placeholder="Вино" />
        </div>
        <div className="flex-1">
          <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Slug</label>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]" />
        </div>
        <button type="submit" className="text-[11px] sm:text-[12px] uppercase tracking-wider px-5 sm:px-6 py-2.5 bg-gold hover:bg-gold-light text-noir transition-colors whitespace-nowrap min-h-[44px]">
          Добавить
        </button>
      </form>

      {/* Desktop table */}
      <div className="hidden sm:block card-lux rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/[0.06]">
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-gold-muted font-normal">Название</th>
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-gold-muted font-normal">Slug</th>
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-gold-muted font-normal">Порядок</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/[0.04]">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-noir-surface transition-colors">
                <td className="px-4 py-3 text-ivory font-light">{c.name}</td>
                <td className="px-4 py-3 text-ash font-mono text-[12px]">{c.slug}</td>
                <td className="px-4 py-3 text-ash">{c.sortOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2">
        {categories.map((c) => (
          <div key={c.id} className="card-lux rounded-sm p-4 flex items-center justify-between">
            <div>
              <p className="text-ivory font-light text-sm">{c.name}</p>
              <p className="text-ash font-mono text-[11px] mt-0.5">{c.slug}</p>
            </div>
            <span className="text-ash text-[11px]">#{c.sortOrder}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
