"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { slugify } from "@/lib/slugify";
import { ImageUpload } from "@/components/ImageUpload";

type Category = { id: number; name: string; slug: string };
type Product = { id: number; name: string; slug: string; description: string; price: number; image: string; volume: string; abv: string; inStock: boolean; categoryId: number; category: Category };

const empty = { name: "", slug: "", description: "", price: "", volume: "", abv: "", categoryId: "", image: "", inStock: true };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const [p, c] = await Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ]);
    setProducts(p); setCategories(c);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId ? `/api/products/${editId}` : "/api/products";
    await fetch(url, { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm(empty); setEditId(null); setShowForm(false); load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить товар?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" }); load();
  };

  const startEdit = (p: Product) => {
    setForm({ name: p.name, slug: p.slug, description: p.description, price: String(p.price), volume: p.volume, abv: p.abv, categoryId: String(p.categoryId), image: p.image, inStock: p.inStock });
    setEditId(p.id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value, ...(field === "name" && !editId ? { slug: slugify(value as string) } : {}) }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-ivory">Товары</h1>
          <div className="w-8 sm:w-10 h-px bg-gold/30 mt-2 sm:mt-3" />
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm(empty); }}
          className="text-[11px] sm:text-[12px] uppercase tracking-wider px-4 sm:px-5 py-2 bg-gold hover:bg-gold-light text-noir transition-colors min-h-[40px]"
        >
          {showForm ? "Отмена" : "Добавить"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card-lux rounded-sm p-4 sm:p-6 mb-6 sm:mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Название</label>
              <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Slug</label>
              <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Описание</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm" rows={2} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Цена</label>
              <input required type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Объем</label>
              <input value={form.volume} onChange={(e) => update("volume", e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]" placeholder="0.75 л" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Крепость</label>
              <input value={form.abv} onChange={(e) => update("abv", e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]" placeholder="13%" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Категория</label>
              <select required value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm rounded-sm min-h-[44px]">
                <option value="">Выбрать</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Фото</label>
            <ImageUpload value={form.image} onChange={(url) => update("image", url)} />
          </div>

          <div className="flex items-center gap-4 sm:gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm text-ivory-muted min-h-[44px]">
              <input type="checkbox" checked={form.inStock as boolean} onChange={(e) => update("inStock", e.target.checked)} className="accent-gold w-4 h-4" />
              В наличии
            </label>
            <button type="submit" className="text-[11px] sm:text-[12px] uppercase tracking-wider px-5 sm:px-6 py-2.5 bg-gold hover:bg-gold-light text-noir transition-colors min-h-[44px]">
              {editId ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
      )}

      {/* Desktop table */}
      <div className="hidden md:block card-lux rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/[0.06]">
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-gold-muted font-normal">Фото</th>
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-gold-muted font-normal">Товар</th>
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-gold-muted font-normal">Категория</th>
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-gold-muted font-normal">Цена</th>
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-gold-muted font-normal">Статус</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/[0.04]">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-noir-surface transition-colors">
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-sm overflow-hidden bg-noir-surface border border-gold/[0.06]">
                    {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-ash text-[10px]">—</div>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-ivory font-light">{p.name}</div>
                  <div className="text-[11px] text-ash">{p.volume} {p.abv && `· ${p.abv}`}</div>
                </td>
                <td className="px-4 py-3 text-ash">{p.category.name}</td>
                <td className="px-4 py-3 font-display text-gold">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] px-2 py-0.5 rounded-sm ${p.inStock ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}>
                    {p.inStock ? "В наличии" : "Нет"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => startEdit(p)} className="text-[11px] text-gold hover:text-gold-light">Изменить</button>
                    <button onClick={() => handleDelete(p.id)} className="text-[11px] text-ash hover:text-red-400">Удалить</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {products.map((p) => (
          <div key={p.id} className="card-lux rounded-sm p-4">
            <div className="flex gap-3 mb-3">
              <div className="w-14 h-14 rounded-sm overflow-hidden bg-noir-surface border border-gold/[0.06] shrink-0">
                {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-ash text-xs">—</div>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-ivory font-light text-sm leading-tight">{p.name}</h3>
                <p className="text-[11px] text-ash mt-0.5">{p.category.name} · {p.volume} {p.abv && `· ${p.abv}`}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg text-gold">{formatPrice(p.price)}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-sm ${p.inStock ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}>
                  {p.inStock ? "В наличии" : "Нет"}
                </span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => startEdit(p)} className="text-[12px] text-gold min-h-[44px] flex items-center">Изменить</button>
                <button onClick={() => handleDelete(p.id)} className="text-[12px] text-ash hover:text-red-400 min-h-[44px] flex items-center">Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
