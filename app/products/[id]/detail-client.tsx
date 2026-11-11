"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  category: string;
  style: string;
  price: number;
  image: string;
  tag: string;
  brand: string;
  color: string;
  sizes: string[];
};

const products: Product[] = [
  {id:1,name:"Essential Oversized Tee",category:"Men",style:"Casual",price:1899,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90",tag:"BESTSELLER",brand:"Euphoria",color:"White",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:2,name:"Everyday Linen Shirt",category:"Men",style:"Casual",price:2899,image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=90",tag:"NEW",brand:"Euphoria",color:"Beige",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:3,name:"Classic Street Joggers",category:"Joggers",style:"Casual",price:2299,image:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=90",tag:"POPULAR",brand:"Euphoria",color:"Black",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:4,name:"Relaxed Fit Denim",category:"Men",style:"Casual",price:3499,image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=90",tag:"NEW",brand:"Studio",color:"Blue",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:5,name:"Women's Daily Wear",category:"Women",style:"Casual",price:2599,image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90",tag:"BESTSELLER",brand:"Euphoria",color:"Pink",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:6,name:"Soft Knit Co-ord Set",category:"Combos",style:"Western",price:4299,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90",tag:"NEW",brand:"Studio",color:"Beige",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:7,name:"Casual Summer Look",category:"Women",style:"Western",price:3199,image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90",tag:"TRENDING",brand:"Euphoria",color:"Black",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:8,name:"Comfort Jogger Set",category:"Combos",style:"Casual",price:3899,image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=90",tag:"POPULAR",brand:"Studio",color:"Grey",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:9,name:"Minimal White T-Shirt",category:"Men",style:"Casual",price:1599,image:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=90",tag:"NEW",brand:"Euphoria",color:"White",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:10,name:"Urban Black Hoodie",category:"Men",style:"Casual",price:3299,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=90",tag:"TRENDING",brand:"Studio",color:"Black",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:11,name:"Classic Blue Jeans",category:"Men",style:"Casual",price:3199,image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=90",tag:"POPULAR",brand:"Euphoria",color:"Blue",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:12,name:"Smart Casual Outfit",category:"Men",style:"Formal",price:4599,image:"https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=90",tag:"NEW",brand:"Studio",color:"Brown",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:13,name:"Women's Chic Outfit",category:"Women",style:"Party Wear",price:3799,image:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=90",tag:"BESTSELLER",brand:"Euphoria",color:"Pink",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:14,name:"Elegant Beige Look",category:"Women",style:"Traditional",price:4199,image:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=90",tag:"NEW",brand:"Studio",color:"Beige",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:15,name:"Weekend Co-ord",category:"Combos",style:"Western",price:4499,image:"https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=1200&q=90",tag:"TRENDING",brand:"Euphoria",color:"Green",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:16,name:"Relaxed Lounge Set",category:"Combos",style:"Casual",price:3999,image:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=90",tag:"POPULAR",brand:"Studio",color:"Grey",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:17,name:"Everyday Grey Joggers",category:"Joggers",style:"Casual",price:2199,image:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=90",tag:"NEW",brand:"Euphoria",color:"Grey",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:18,name:"Sporty Streetwear Set",category:"Joggers",style:"Casual",price:3599,image:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=90",tag:"BESTSELLER",brand:"Studio",color:"Black",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:19,name:"Modern Layered Style",category:"Women",style:"Party Wear",price:3399,image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",tag:"TRENDING",brand:"Euphoria",color:"Brown",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:20,name:"Premium Casual Shirt",category:"Men",style:"Formal",price:2799,image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=90",tag:"NEW",brand:"Studio",color:"Navy",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]}
];

const money = (amount: number) => "Rs. " + amount.toLocaleString("en-PK");

export default function ProductDetailClient({ productId }: { productId: number }) {
  const product = products.find((item) => item.id === productId)!;
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return (
    <main className="pd-page">
      <div className="pl-promo">COMPLIMENTARY SHIPPING ON SELECTED ORDERS&nbsp; · &nbsp;DISCOVER YOUR EVERYDAY STYLE</div>
      <header className="pl-header">
        <Link href="/" className="pl-logo">EUPHORIA<span>FEEL THE STYLE</span></Link>
        <nav><Link href="/">HOME</Link><Link href="/products">SHOP ALL</Link></nav>
        <div className="pl-head-actions"><Link href="/products" className="pl-bag">BACK TO PRODUCTS</Link></div>
      </header>

      <div className="pd-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Shop all</Link><span>/</span><strong>{product.name}</strong></div>

      <section className="pd-main">
        <div className="pd-image-wrap">
          <img className="pd-main-image" src={product.image} alt={product.name} />
          <span className="pd-tag">{product.tag}</span>
        </div>
        <div className="pd-info">
          <p className="pd-eyebrow">{product.category.toUpperCase()} / {product.brand.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p className="pd-price">{money(product.price)}</p>
          <p className="pd-tax-note">Inclusive of listed price</p>
          <div className="pd-rule" />
          <div className="pd-option-heading"><strong>Color</strong><span>{product.color}</span></div>
          <div className="pd-color-choice" aria-label={`Selected color: ${product.color}`}>
            <span className={`pd-swatch pd-swatch-${product.color.toLowerCase()}`} />
            <span>{product.color}</span>
          </div>
          <div className="pd-option-heading pd-size-heading"><strong>Select size</strong><span>Size guide</span></div>
          <div className="pd-size-grid">
            {product.sizes.map((size) => <button type="button" key={size} className={selectedSize === size ? "selected" : ""} aria-pressed={selectedSize === size} onClick={() => { setSelectedSize(size); setAdded(false); }}>{size}</button>)}
          </div>
          <div className="pd-option-heading pd-quantity-heading"><strong>Quantity</strong></div>
          <div className="pd-quantity">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
            <span>{quantity}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(10, value + 1))}>+</button>
          </div>
          <button type="button" className="pd-add" onClick={() => setAdded(true)}>ADD TO BAG · {money(product.price * quantity)}</button>
          {added && <p className="pd-added" role="status">{quantity} × {product.name} (Size {selectedSize}) added to your bag preview.</p>}
          <p className="pd-description">A versatile {product.category.toLowerCase()} piece selected for the Euphoria collection. Easy to style, easy to make your own, and ready for everyday wear.</p>
          <div className="pd-details"><div><strong>Product</strong><span>{product.name}</span></div><div><strong>Category</strong><span>{product.category}</span></div><div><strong>Style</strong><span>{product.style}</span></div><div><strong>Brand</strong><span>{product.brand}</span></div></div>
        </div>
      </section>

      {related.length > 0 && <section className="pd-related">
        <div className="pd-related-heading"><p>COMPLETE YOUR LOOK</p><h2>You may also like</h2></div>
        <div className="pd-related-grid">{related.map((item) => <Link href={`/products/${item.id}`} className="pd-related-card" key={item.id}><img src={item.image} alt={item.name}/><span>{item.category}</span><strong>{item.name}</strong><small>{money(item.price)}</small></Link>)}</div>
      </section>}

      <footer className="pl-footer"><Link href="/" className="pl-logo">EUPHORIA<span>FEEL THE STYLE</span></Link><p>© {new Date().getFullYear()} Euphoria. All style, all yours.</p><Link href="/products">BACK TO SHOP ↑</Link></footer>
    </main>
  );
}
