"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { slugify } from "@/lib/slugify";
import { ImageUpload } from "@/components/ImageUpload";

type SetItemForm = { productId: string; customName: string; quantity: string };
type ProductSet = { id: number; name: string; slug: string; description: string; price: number; image: string; inStock: boolean; items: { id: number; productId: number | null; customName: string | null; quantity: number; product: { name: string } | null }[] };
type Product = { id: number; name: string };

export default function AdminSetsPage() {
  const [sets, setSets] = useState<ProductSet[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "", price: "", image: "" });
  const [items, setItems] = useState<SetItemForm[]>([{ productId: "", customName: "", quantity: "1" }]);

  const load = async () => {
    const [s, p] = await Promise.all([fetch("/api/sets").then((r) => r.json()), fetch("/api/products").then((r) => r.json())]);
    setSets(s); setProducts(p);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validItems = items.filter((i) => i.productId || i.customName);
    if (validItems.length === 0) {
      alert("Добавьте хотя бы одну позицию в набор");
      return;
    }

    const res = await fetch("/api/sets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug || slugify(form.name),
        description: form.description,
        price: form.price,
        image: form.image,
        items: validItems.map((i) => ({
          productId: i.productId ? parseInt(i.productId) : null,
          customName: i.customName || null,
          quantity: parseInt(i.quantity) || 1,
        })),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert("Ошибка создания: " + (err.error || res.statusText));
      return;
    }

    setForm({ name: "", slug: "", description: "", price: "", image: "" });
    setItems([{ productId: "", customName: "", quantity: "1" }]);
    setShowForm(false);
    load();
  };

  const updateItem = (idx: number, field: string, value: string) => {
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-ivory">Сеты</h1>
          <div className="w-10 h-px bg-gold/30 mt-3" />
        </div>
        <button onClick={() => setShowForm(!showForm)} className="text-[12px] uppercase tracking-wider px-5 py-2 bg-gold hover:bg-gold-light text-noir transition-colors">
          {showForm ? "Отмена" : "Добавить"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card-lux rounded-sm p-6 mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Название</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))} className="input-dark w-full px-3 py-2 text-sm rounded-sm" />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Цена</label>
              <input required type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="input-dark w-full px-3 py-2 text-sm rounded-sm" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Slug</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="input-dark w-full px-3 py-2 text-sm rounded-sm" placeholder="auto-generated" />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Описание</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="input-dark w-full px-3 py-2 text-sm rounded-sm" rows={2} />
          </div>

          {/* Image */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-2">Фото</label>
            <ImageUpload value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
          </div>

          {/* Items */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-3">Состав набора</label>
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <select value={item.productId} onChange={(e) => updateItem(idx, "productId", e.target.value)} className="input-dark flex-1 px-3 py-2 text-sm rounded-sm">
                  <option value="">Свой текст</option>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input value={item.customName} onChange={(e) => updateItem(idx, "customName", e.target.value)} placeholder="Или название" className="input-dark flex-1 px-3 py-2 text-sm rounded-sm" />
                <input type="number" value={item.quantity} onChange={(e) => updateItem(idx, "quantity", e.target.value)} className="input-dark w-16 px-3 py-2 text-sm text-center rounded-sm" min={1} />
                {items.length > 1 && (
                  <button type="button" onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))} className="text-ash hover:text-red-400 px-2">x</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setItems((prev) => [...prev, { productId: "", customName: "", quantity: "1" }])} className="text-gold text-[12px] hover:text-gold-light mt-1">
              + Добавить позицию
            </button>
          </div>

          <button type="submit" className="text-[12px] uppercase tracking-wider px-6 py-2 bg-gold hover:bg-gold-light text-noir transition-colors">
            Создать сет
          </button>
        </form>
      )}

      <div className="space-y-4">
        {sets.map((set) => (
          <div key={set.id} className="card-lux rounded-sm p-5">
            <div className="flex gap-4">
              {set.image && (
                <div className="w-20 h-20 rounded-sm overflow-hidden shrink-0 border border-gold/[0.06]">
                  <img src={set.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-display text-xl text-ivory font-light">{set.name}</h3>
                    <p className="text-sm text-ash mt-1">{set.description}</p>
                  </div>
                  <span className="font-display text-xl text-gold">{formatPrice(set.price)}</span>
                </div>
                <ul className="text-sm text-ivory-muted/70 space-y-1">
                  {set.items.map((item) => (
                    <li key={item.id}>
                      <span className="text-gold/30 mr-2">&bull;</span>
                      {item.product?.name || item.customName}
                      {item.quantity > 1 && ` x${item.quantity}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
