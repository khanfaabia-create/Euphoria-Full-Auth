"use client";

import { useMemo, useState } from "react";
import { signOut } from "next-auth/react";

const products = [
  { name: "Everyday Essential Set", category: "Combos", price: "Rs. 3,499", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85" },
  { name: "Classic Street Joggers", category: "Joggers", price: "Rs. 2,299", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85" },
  { name: "Modern Men's Fit", category: "Men", price: "Rs. 2,799", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85" },
  { name: "Women's Daily Wear", category: "Women", price: "Rs. 2,599", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85" },
];

const categories = [
  { name: "Men", note: "Everyday essentials", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85" },
  { name: "Women", note: "Style your way", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85" },
  { name: "Combos", note: "More style, one set", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85" },
  { name: "Joggers", note: "Comfort in motion", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=85" },
];

export default function HomeClient({ name }: { name: string }) {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useMemo(() => products.filter((item) => (item.name + " " + item.category).toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <main className="euphoria-home">
      <div className="euphoria-topline">FREE SHIPPING ON SELECTED ORDERS · YOUR STYLE, YOUR STORY</div>
      <header className="euphoria-header">
        <a className="euphoria-brand" href="/">EUPHORIA<span>FEEL THE STYLE</span></a>
        <button className="euphoria-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
        <nav className={menuOpen ? "euphoria-nav is-open" : "euphoria-nav"} aria-label="Main navigation">
          <a href="#collections">Shop</a><a href="#men">Men</a><a href="#women">Women</a><a href="#combos">Combos</a><a href="#joggers">Joggers</a>
        </nav>
        <div className="euphoria-actions">
          <label className="euphoria-search"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products" /></label>
          <button className="euphoria-account" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
        </div>
      </header>

      <section className="euphoria-hero">
        <div className="euphoria-hero-copy">
          <p className="euphoria-kicker">THE NEW SEASON EDIT</p>
          <h1>Wear your<br/><em>own story.</em></h1>
          <p className="euphoria-hero-desc">Fresh fits. Everyday comfort. A little more you in every look.</p>
          <a className="euphoria-cta" href="#collections">SHOP THE COLLECTION <span>↗</span></a>
          <p className="euphoria-welcome">Welcome back, {name}.</p>
        </div>
        <div className="euphoria-hero-image" role="img" aria-label="Fashion collection editorial" />
        <div className="euphoria-hero-index">01 / EUPHORIA EDIT</div>
      </section>

      <section className="euphoria-section" id="collections">
        <div className="euphoria-section-heading"><div><p className="euphoria-kicker">FIND YOUR FIT</p><h2>Shop by category</h2></div><p>Pieces made to move with you.</p></div>
        <div className="euphoria-category-grid">
          {categories.map((item) => <a className="euphoria-category" id={item.name.toLowerCase()} href="#featured" key={item.name} style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(0,0,0,.65)), url(${item.image})` }}><span>{item.note}</span><strong>{item.name}</strong><i>EXPLORE ↗</i></a>)}
        </div>
      </section>

      <section className="euphoria-featured" id="featured">
        <div className="euphoria-section-heading"><div><p className="euphoria-kicker">CURATED FOR YOU</p><h2>Trending right now</h2></div><span className="euphoria-result-count">{filtered.length} ITEMS</span></div>
        <div className="euphoria-product-grid">
          {filtered.map((item) => <article className="euphoria-product" key={item.name}><div className="euphoria-product-image"><img src={item.image} alt={item.name}/><span>NEW ARRIVAL</span></div><p>{item.category}</p><h3>{item.name}</h3><strong>{item.price}</strong></article>)}
          {filtered.length === 0 && <p className="euphoria-no-results">No products found. Try another search.</p>}
        </div>
      </section>

      <section className="euphoria-note"><p className="euphoria-kicker">MADE FOR EVERY VERSION OF YOU</p><h2>Comfort looks good on you.</h2><a href="#collections">DISCOVER EUPHORIA ↗</a></section>
      <footer className="euphoria-footer"><a className="euphoria-brand" href="/">EUPHORIA<span>FEEL THE STYLE</span></a><p>© {new Date().getFullYear()} Euphoria. All style, all yours.</p><a href="#collections">BACK TO TOP ↑</a></footer>
    </main>
  );
}
