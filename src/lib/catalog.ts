import milanesa from "@/assets/milanesa-product.jpg.asset.json";
import empanadas from "@/assets/empanadas-product.jpg.asset.json";
import raviolones from "@/assets/raviolones-product.jpg.asset.json";
import asado from "@/assets/asado-cut.jpg.asset.json";
import vacio from "@/assets/vacio-cut.jpg.asset.json";
import entrana from "@/assets/entrana-cut.jpg.asset.json";
import bife from "@/assets/bife-chorizo-cut.jpg.asset.json";
import peceto from "@/assets/peceto-cut.jpg.asset.json";


export type Cat = "carnes" | "empanadas" | "pastas" | "vinos";
export type Product = { id: string; cat: Cat; name: string; desc: string; price: number; unit?: string; tag: string; img: string };

export const PRODUCTS: Product[] = [
  { id: "mil-pollo", cat: "carnes", name: "Milanesas de pollo", desc: "Empanadas y listas para cocinar. Pack de 720 g.", price: 10.8, tag: "Listas para cocinar", img: milanesa.url },
  { id: "mil-ternera", cat: "carnes", name: "Milanesas de ternera", desc: "Rebozado casero, finito y dorado. Para horno o sartén.", price: 12.5, tag: "Hechas en casa", img: "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "tira", cat: "carnes", name: "Asado de tira", desc: "El corte que reúne a todos. Porción de 700 g.", price: 15.9, tag: "Parrilla", img: asado.url },
  { id: "asado", cat: "carnes", name: "Asado", desc: "Corte argentino para una parrilla con tiempo y buena compañía.", price: 11.99, unit: "1 kg", tag: "Parrilla", img: asado.url },
  { id: "vacio", cat: "carnes", name: "Vacío", desc: "Jugoso, sabroso y perfecto para cocinar lentamente.", price: 13.99, unit: "1 kg", tag: "Parrilla", img: vacio.url },
  { id: "entrana", cat: "carnes", name: "Entraña", desc: "Un corte tierno e intenso para disfrutar vuelta y vuelta.", price: 13.99, unit: "1 kg", tag: "Parrilla", img: entrana.url },
  { id: "bife", cat: "carnes", name: "Bife de chorizo", desc: "El clásico grueso y jugoso que pide una buena brasa.", price: 20.9, unit: "1 kg", tag: "Premium", img: bife.url },
  { id: "peceto", cat: "carnes", name: "Peceto", desc: "Corte magro y versátil para horno, vitel toné o milanesas.", price: 16.45, unit: "1 kg", tag: "Premium", img: peceto.url },
  { id: "emp-art", cat: "empanadas", name: "Empanadas artesanales", desc: "Hechas en casa, con ingredientes seleccionados.", price: 8.9, tag: "Hechas con amor", img: empanadas.url },
  { id: "emp-carne", cat: "empanadas", name: "Empanada de carne", desc: "Carne cortada a cuchillo, cebolla, pimentón y comino.", price: 2.4, unit: "unidad", tag: "La clásica", img: "https://images.pexels.com/photos/5848712/pexels-photo-5848712.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "raviolones", cat: "pastas", name: "Raviolones de espinaca y ricotta", desc: "Pasta fresca congelada. Una receta suave para compartir.", price: 9.5, tag: "Pasta fresca", img: raviolones.url },
  { id: "malbec", cat: "vinos", name: "Malbec de la casa", desc: "Mendoza, 750 ml. Fruta madura y un final suave.", price: 9.7, tag: "Mendoza", img: "https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

export const CATS: { id: Cat; label: string }[] = [
  { id: "carnes", label: "Carnes" },
  { id: "empanadas", label: "Empanadas" },
  { id: "pastas", label: "Pastas" },
  { id: "vinos", label: "Vinos" },
];

export const eur = (n: number) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

