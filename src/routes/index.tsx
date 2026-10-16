import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, MapPin, Phone, Mail, Clock, Plus, Minus, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import hero from "@/assets/hero-collage.jpg.asset.json";
import familia from "@/assets/familia.jpg.asset.json";
import manos from "@/assets/manos.jpg.asset.json";
import recetas from "@/assets/recetas.jpg.asset.json";
import pizza from "@/assets/pizza.jpg.asset.json";
import { CATS, PRODUCTS, eur, function Index() {
  const [cat, setCat] = useState<Cat>("carnes");
  const [bag, setBag] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const items = PRODUCTS.filter((p) => bag[p.id]);
  const count = items.reduce((s, p) => s + (bag[p.id] ?? 0), 0);
  const total = items.reduce((s, p) => s + p.price * (bag[p.id] ?? 0), 0);
  const change = (id: string, d: number) =>
    setBag((b) => {
      const n = Math.max(0, (b[id] ?? 0) + d);
      const c = { ...b };
      if (n) c[id] = n;
      else delete c[id];
      return c;
    });
  const bagText = items.map((p) => `${bag[p.id]} x ${p.name}`).join("\n");

  function selectCategory(value: unknown) {
    const selected = CATS.find((entry) => entry.id === value);
    if (!selected) throw new Error("Categoría no válida.");
    setCat(selected.id);
  }
  const visible = PRODUCTS.filter((product) => product.cat === cat);
  useWebMCP({
    name: "list_visible_products",
    description: "Consultar los productos y precios de la categoría que aparece en pantalla.",
    annotations: { readOnlyHint: true },
    execute: () => runWebMCPTool("list_visible_products", () => visible.map((p) => `${p.id}: ${p.name} — ${eur(p.price)}${p.unit ? ` / ${p.unit}` : ""}`).join("\n")),
  });
  useWebMCP({
    name: "filter_products",
    description: "Cambiar la categoría visible de productos.",
    inputSchema: { type: "object", properties: { category: { type: "string", enum: CATS.map((c) => c.id), description: "Categoría de productos." } }, required: ["category"] },
    execute: ({ category }: { category: string }) => runWebMCPTool("filter_products", () => { selectCategory(category); return `Categoría: ${category}.`; }),
  });
  useWebMCP({
    name: "open_bag",
    description: "Abrir la bolsa del usuario en pantalla, sin enviar ningún pedido.",
    execute: () => runWebMCPTool("open_bag", () => { setOpen(true); return "Bolsa abierta."; }),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
          <a href="#inicio" className="flex items-center">
            <img src={logo.url} alt="Los de Ajuera" className="h-14 w-auto mix-blend-multiply md:h-16" />
          </a>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#productos" className="hover:text-primary">Productos</a>
            <a href="#nosotros" className="hover:text-primary">Nosotros</a>
            <a href="#pedido" className="hover:text-primary">Pedidos</a>
            <a href="#visitanos" className="hover:text-primary">Visítanos</a>
          </nav>
          <button onClick={() => setOpen(true)} className="relative inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground">
            <ShoppingBag className="h-4 w-4" /> <span className="hidden sm:inline">Mi bolsa</span>
            {count > 0 && <span className="rounded-full bg-primary px-2 text-xs text-primary-foreground">{count}</span>}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 pt-8 md:grid-cols-2 md:gap-12 md:pt-16">
        <div className="order-2 md:order-1">
          <img src={logo.url} alt="Los de Ajuera" className="h-24 w-auto mix-blend-multiply sm:h-28 lg:h-32" />
          <p className="eyebrow mt-6">Hecho en casa · hecho con amor</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Comida argentina <em className="font-medium text-primary">lista para cocinar</em>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Sabores que te llevan a casa. Honramos la nostalgia de los sabores de siempre, con ingredientes honestos, para que en casa sea fácil, rico y auténtico.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#productos" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-card transition hover:brightness-110">Elegir algo rico</a>
            <a href="#pedido" className="rounded-full border border-ink px-6 py-3 font-semibold transition hover:bg-ink hover:text-ink-foreground">Hacer un pedido</a>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img src={hero.url} alt="Empanadas, milanesas y cocina casera argentina" className="aspect-[4/3] w-full object-cover object-[30%_center] md:aspect-[10/9]" />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="productos" className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow">Para llenar el freezer</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Nuestros <em className="font-medium text-primary">productos</em></h2>
          <p className="mt-3 max-w-lg text-muted-foreground">Elegí tus favoritos, combiná y recibí el sabor de una cocina tranquila.</p>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {CATS.map((c) => (
              <button key={c.id} onClick={() => selectCategory(c.id)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${cat === c.id ? "bg-ink text-ink-foreground" : "border border-border bg-card hover:border-ink"}`}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-card">
                <div className="relative">
                  <img src={p.img} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">{p.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">{eur(p.price)}{p.unit && <span className="text-sm font-normal text-muted-foreground"> / {p.unit}</span>}</span>
                    {bag[p.id] ? (
                      <div className="flex items-center gap-2">
                        <button aria-label="Quitar" onClick={() => change(p.id, -1)} className="rounded-full border border-border p-1.5"><Minus className="h-4 w-4" /></button>
                        <span className="w-5 text-center font-semibold">{bag[p.id]}</span>
                        <button aria-label="Añadir" onClick={() => change(p.id, 1)} className="rounded-full bg-primary p-1.5 text-primary-foreground"><Plus className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <button onClick={() => change(p.id, 1)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Sumar</button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Chef */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <img src={raviolones.url} alt="Raviolones de la casa" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
        <div>
          <p className="eyebrow">Plato del chef</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Raviolones de la casa</h2>
          <p className="mt-4 text-lg text-muted-foreground">Espinaca, ricotta y pasta fresca. Una receta honesta, lista para llevar el sabor de casa a tu mesa.</p>
          <blockquote className="mt-8 border-l-4 border-gold pl-5 font-display text-2xl italic">“No hace falta esperar al domingo para comer como en casa.”</blockquote>
        </div>
      </section>

      {/* Gallery */}
      <section id="nosotros" className="bg-ink py-16 text-ink-foreground md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow text-gold">Postales de la casa</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Un poco de <em className="font-medium text-gold">nuestro mundo</em></h2>
          <p className="mt-3 opacity-80">Harina en la mesa, vino abierto y el horno haciendo su parte.</p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[manos, familia, recetas, pizza].map((g, i) => (
              <img key={i} src={g.url} alt="" loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
            ))}
          </div>
        </div>
      </section>

      {/* Order */}
      <section id="pedido" className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Tu cocina, más fácil</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Armá tu pedido y nosotros hacemos el resto.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Contanos qué te gustaría llevarte. Te escribimos para confirmar disponibilidad, forma de pago y entrega en Valencia.</p>
          <button onClick={() => setOpen(true)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 font-semibold hover:bg-ink hover:text-ink-foreground">
            <ShoppingBag className="h-4 w-4" /> Ver mi bolsa ({count})
          </button>
          <figure className="mt-10 rounded-2xl bg-secondary p-6">
            <p className="font-display text-xl italic">“Las empanadas tienen ese sabor de domingo que no sabía que estaba buscando. Ya son parada obligada después del mercado.”</p>
            <figcaption className="mt-4 text-sm"><strong>Marina G.</strong> · Cliente de Ruzafa</figcaption>
          </figure>
        </div>
        <form
          className="rounded-3xl bg-card p-6 shadow-card md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const body = `Nombre: ${f.get("n")}\nTeléfono: ${f.get("t")}\nEmail: ${f.get("e")}\n\nPedido:\n${bagText}\n${f.get("m")}`;
            window.location.href = `mailto:hola@lafusta.es?subject=${encodeURIComponent("Pedido web")}&body=${encodeURIComponent(body)}`;
            setSent(true);
          }}
        >
          <h3 className="text-2xl font-bold">Dejanos tus datos</h3>
          <p className="mt-1 text-sm text-muted-foreground">Respondemos de lunes a sábado, de 10 a 19 h.</p>
          {[["n", "Nombre completo", "text"], ["t", "Teléfono", "tel"], ["e", "Email", "email"]].map(([n, l, t]) => (
            <label key={n} className="mt-4 block text-sm font-medium">{l}
              <input required name={n} type={t} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
            </label>
          ))}
          <label className="mt-4 block text-sm font-medium">¿Qué te gustaría pedir?
            <textarea name="m" rows={3} defaultValue="" placeholder={bagText || "Ej: 12 empanadas de carne y 1 kg de vacío"} className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
          </label>
          <button className="mt-6 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">Enviar pedido</button>
          {sent && <p className="mt-3 text-center text-sm text-accent">¡Gracias! Te escribimos pronto.</p>}
        </form>
      </section>

      {/* Visit */}
      <section id="visitanos" className="bg-secondary py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div>
            <p className="eyebrow">Pasá a saludar</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">La puerta está <em className="font-medium text-primary">abierta</em>.</h2>
            <p className="mt-4 text-lg text-muted-foreground">Estamos en el barrio de El Carmen, a dos pasos de todo lo que importa. Vení a mirar, preguntar o simplemente a llevarte algo rico.</p>
          </div>
          <ul className="space-y-4 rounded-3xl bg-card p-6 shadow-card md:p-8">
            <li><a className="flex gap-3 hover:text-primary" href="https://maps.google.com/?q=Almudena+211+Valencia" target="_blank" rel="noreferrer"><MapPin className="h-5 w-5 shrink-0 text-primary" />Almudena 211, 46003 Valencia</a></li>
            <li><a className="flex gap-3 hover:text-primary" href="tel:+34600111222"><Phone className="h-5 w-5 shrink-0 text-primary" />+34 600 111 222</a></li>
            <li><a className="flex gap-3 hover:text-primary" href="mailto:hola@lafusta.es"><Mail className="h-5 w-5 shrink-0 text-primary" />hola@lafusta.es</a></li>
            <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-primary" /><span>Lunes a sábado · 10:00 — 19:00<br /><span className="text-muted-foreground">Domingos · Cerrado</span></span></li>
          </ul>
        </div>
      </section>

      <footer className="bg-ink py-10 text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center md:flex-row md:justify-between md:text-left">
          <div className="rounded-2xl bg-background px-4 py-2"><img src={logo.url} alt="Los de Ajuera" className="h-14 w-auto mix-blend-multiply" /></div>
          <p className="text-sm opacity-75">© {new Date().getFullYear()} Los de Ajuera · Comida argentina hecha con amor en Valencia</p>
        </div>
      </footer>

      {/* Bag drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/50" onClick={() => setOpen(false)}>
          <aside className="flex h-full w-full max-w-sm flex-col bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Mi bolsa</h3>
              <button aria-label="Cerrar" onClick={() => setOpen(false)}><X className="h-6 w-6" /></button>
            </div>
            <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
              {items.length === 0 && <p className="text-muted-foreground">Tu bolsa está vacía. ¡Sumá algo rico!</p>}
              {items.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <img src={p.img} alt="" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1"><p className="font-semibold leading-tight">{p.name}</p><p className="text-sm text-muted-foreground">{eur(p.price)}</p></div>
                  <button aria-label="Quitar" onClick={() => change(p.id, -1)} className="rounded-full border border-border p-1"><Minus className="h-4 w-4" /></button>
                  <span className="w-4 text-center">{bag[p.id]}</span>
                  <button aria-label="Añadir" onClick={() => change(p.id, 1)} className="rounded-full border border-border p-1"><Plus className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{eur(total)}</span></div>
              <a href="#pedido" onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground">Continuar pedido</a>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
