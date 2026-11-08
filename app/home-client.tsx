"use client";

import { useMemo, useState } from "react";
import { signOut } from "next-auth/react";

const products = [
  { id: 1, name: "Essential Oversized Tee", category: "Men", price: 1899, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", tag: "BESTSELLER" },
  { id: 2, name: "Everyday Linen Shirt", category: "Men", price: 2899, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85", tag: "NEW" },
  { id: 3, name: "Classic Street Joggers", category: "Joggers", price: 2299, image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85", tag: "POPULAR" },
  { id: 4, name: "Relaxed Fit Denim", category: "Men", price: 3499, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85", tag: "NEW" },
  { id: 5, name: "Women's Daily Wear", category: "Women", price: 2599, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85", tag: "BESTSELLER" },
  { id: 6, name: "Soft Knit Co-ord Set", category: "Combos", price: 4299, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85", tag: "NEW" },
  { id: 7, name: "Casual Summer Look", category: "Women", price: 3199, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85", tag: "TRENDING" },
  { id: 8, name: "Comfort Jogger Set", category: "Combos", price: 3899, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85", tag: "POPULAR" },
];

const categories = [
  { name: "Men", note: "Everyday essentials", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85" },
  { name: "Women", note: "Style your way", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85" },
  { name: "Combos", note: "More style, one set", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85" },
  { name: "Joggers", note: "Comfort in motion", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=85" },
];

const money = (amount: number) => "Rs. " + amount.toLocaleString("en-PK");

export default function HomeClient({ name }: { name: string }) {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [addedProduct, setAddedProduct] = useState("");

  const filtered = useMemo(() => products.filter((item) => {
    const matchesSearch = (item.name + " " + item.category).toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  }), [search, activeCategory]);

  return (
    <main className="euphoria-home">
      <div className="euphoria-topline">FREE SHIPPING ON SELECTED ORDERS · YOUR STYLE, YOUR STORY</div>
      <header className="euphoria-header">
        <a className="euphoria-brand" href="/">EUPHORIA<span>FEEL THE STYLE</span></a>
        <button className="euphoria-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
        <nav className={menuOpen ? "euphoria-nav is-open" : "euphoria-nav"} aria-label="Main navigation">
          <a href="#collections">Shop</a><a href="#men" onClick={() => setActiveCategory("Men")}>Men</a><a href="#women" onClick={() => setActiveCategory("Women")}>Women</a><a href="#combos" onClick={() => setActiveCategory("Combos")}>Combos</a><a href="#joggers" onClick={() => setActiveCategory("Joggers")}>Joggers</a>
        </nav>
        <div className="euphoria-actions">
          <label className="euphoria-search"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products" /></label>
          <button className="euphoria-cart" onClick={() => setAddedProduct(cartCount ? `You have ${cartCount} item(s) in your demo bag.` : "Your bag is empty.")}>BAG ({cartCount})</button>
          <button className="euphoria-account" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
        </div>
      </header>

      <section className="euphoria-hero">
        <div className="euphoria-hero-copy">
          <p className="euphoria-kicker">THE NEW SEASON EDIT</p>
          <h1>Wear your<br/><em>own story.</em></h1>
          <p className="euphoria-hero-desc">Fresh fits. Everyday comfort. A little more you in every look.</p>
          <a className="euphoria-cta" href="#featured">SHOP THE COLLECTION <span>↗</span></a>
          <p className="euphoria-welcome">Welcome back, {name}.</p>
        </div>
        <div className="euphoria-hero-image" role="img" aria-label="Fashion collection editorial" />
        <div className="euphoria-hero-index">01 / EUPHORIA EDIT</div>
      </section>

      <section className="euphoria-section" id="collections">
        <div className="euphoria-section-heading"><div><p className="euphoria-kicker">FIND YOUR FIT</p><h2>Shop by category</h2></div><p>Pieces made to move with you.</p></div>
        <div className="euphoria-category-grid">
          {categories.map((item) => <a className="euphoria-category" id={item.name.toLowerCase()} href="#featured" key={item.name} onClick={() => setActiveCategory(item.name)} style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(0,0,0,.65)), url(${item.image})` }}><span>{item.note}</span><strong>{item.name}</strong><i>EXPLORE ↗</i></a>)}
        </div>
      </section>

      <section className="euphoria-featured" id="featured">
        <div className="euphoria-section-heading"><div><p className="euphoria-kicker">CURATED FOR YOU</p><h2>Shop our products</h2></div><span className="euphoria-result-count">{filtered.length} ITEMS</span></div>
        <div className="euphoria-filter-row">
          {["All", "Men", "Women", "Combos", "Joggers"].map((category) => <button key={category} className={activeCategory === category ? "euphoria-filter active" : "euphoria-filter"} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <div className="euphoria-product-grid">
          {filtered.map((item) => <article className="euphoria-product" key={item.id}>
            <div className="euphoria-product-image"><img src={item.image} alt={item.name}/><span>{item.tag}</span></div>
            <p>{item.category}</p><h3>{item.name}</h3>
            <strong>{money(item.price)}</strong>
            <button className="euphoria-add-button" onClick={() => { setCartCount((count) => count + 1); setAddedProduct(item.name + " added to your demo bag."); }}>ADD TO BAG +</button>
          </article>)}
          {filtered.length === 0 && <p className="euphoria-no-results">No products found. Try another search.</p>}
        </div>
        {addedProduct && <p className="euphoria-cart-message" role="status">{addedProduct}</p>}
      </section>

      <section className="euphoria-note"><p className="euphoria-kicker">MADE FOR EVERY VERSION OF YOU</p><h2>Comfort looks good on you.</h2><a href="#collections">DISCOVER EUPHORIA ↗</a></section>
      <footer className="euphoria-footer"><a className="euphoria-brand" href="/">EUPHORIA<span>FEEL THE STYLE</span></a><p>© {new Date().getFullYear()} Euphoria. All style, all yours.</p><a href="#collections">BACK TO TOP ↑</a></footer>
    </main>
  );
}
