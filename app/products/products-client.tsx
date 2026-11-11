"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Product = { id:number; name:string; category:string; style:string; price:number; image:string; tag:string; brand:string; color:string; sizes:string[] };

const products: Product[] = [
  {id:1,name:"Essential Oversized Tee",category:"Men",style:"Casual",price:1899,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",tag:"BESTSELLER",brand:"Euphoria",color:"White",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:2,name:"Everyday Linen Shirt",category:"Men",style:"Casual",price:2899,image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",tag:"NEW",brand:"Euphoria",color:"Beige",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:3,name:"Classic Street Joggers",category:"Joggers",style:"Casual",price:2299,image:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85",tag:"POPULAR",brand:"Euphoria",color:"Black",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:4,name:"Relaxed Fit Denim",category:"Men",style:"Casual",price:3499,image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",tag:"NEW",brand:"Studio",color:"Blue",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:5,name:"Women's Daily Wear",category:"Women",style:"Casual",price:2599,image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",tag:"BESTSELLER",brand:"Euphoria",color:"Pink",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:6,name:"Soft Knit Co-ord Set",category:"Combos",style:"Western",price:4299,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",tag:"NEW",brand:"Studio",color:"Beige",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:7,name:"Casual Summer Look",category:"Women",style:"Western",price:3199,image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",tag:"TRENDING",brand:"Euphoria",color:"Black",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:8,name:"Comfort Jogger Set",category:"Combos",style:"Casual",price:3899,image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85",tag:"POPULAR",brand:"Studio",color:"Grey",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:9,name:"Minimal White T-Shirt",category:"Men",style:"Casual",price:1599,image:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",tag:"NEW",brand:"Euphoria",color:"White",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:10,name:"Urban Black Hoodie",category:"Men",style:"Casual",price:3299,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",tag:"TRENDING",brand:"Studio",color:"Black",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:11,name:"Classic Blue Jeans",category:"Men",style:"Casual",price:3199,image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",tag:"POPULAR",brand:"Euphoria",color:"Blue",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:12,name:"Smart Casual Outfit",category:"Men",style:"Formal",price:4599,image:"https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85",tag:"NEW",brand:"Studio",color:"Brown",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:13,name:"Women's Chic Outfit",category:"Women",style:"Party Wear",price:3799,image:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",tag:"BESTSELLER",brand:"Euphoria",color:"Pink",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:14,name:"Elegant Beige Look",category:"Women",style:"Traditional",price:4199,image:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85",tag:"NEW",brand:"Studio",color:"Beige",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:15,name:"Weekend Co-ord",category:"Combos",style:"Western",price:4499,image:"https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=900&q=85",tag:"TRENDING",brand:"Euphoria",color:"Green",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:16,name:"Relaxed Lounge Set",category:"Combos",style:"Casual",price:3999,image:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85",tag:"POPULAR",brand:"Studio",color:"Grey",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
  {id:17,name:"Everyday Grey Joggers",category:"Joggers",style:"Casual",price:2199,image:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85",tag:"NEW",brand:"Euphoria",color:"Grey",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:18,name:"Sporty Streetwear Set",category:"Joggers",style:"Casual",price:3599,image:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85",tag:"BESTSELLER",brand:"Studio",color:"Black",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44"]},
  {id:19,name:"Modern Layered Style",category:"Women",style:"Party Wear",price:3399,image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",tag:"TRENDING",brand:"Euphoria",color:"Brown",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","6","8","10","12","14","16","18","20","22","24"]},
  {id:20,name:"Premium Casual Shirt",category:"Men",style:"Formal",price:2799,image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",tag:"NEW",brand:"Studio",color:"Navy",sizes:["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL"]},
];

const colors=["Black","White","Grey","Beige","Blue","Pink","Brown","Green","Navy"];
const sizes=["XXS","XS","S","M","L","XL","XXL","3XL","4XL","5XL","26","28","30","32","34","36","38","40","42","44","6","8","10","12","14","16","18","20","22","24"];
const dressStyles=["Casual","Formal","Party Wear","Western","Traditional"];
const money=(n:number)=>"Rs. "+n.toLocaleString("en-PK");

export default function ProductsClient(){
  const [search,setSearch]=useState("");
  const [maxPrice,setMaxPrice]=useState(5000);
  const [color,setColor]=useState("");
  const [size,setSize]=useState("");
  const [dressStyle,setDressStyle]=useState("");
  const [sort,setSort]=useState("featured");
  const [bag,setBag]=useState<number[]>([]);
  const [mobileFilters,setMobileFilters]=useState(false);

  const visible=useMemo(()=>{
    const list=products.filter(p=>
      p.price<=maxPrice &&
      (!color||p.color===color) &&
      (!size||p.sizes.includes(size)) &&
      (!dressStyle||p.style===dressStyle) &&
      (p.name+" "+p.category+" "+p.brand).toLowerCase().includes(search.toLowerCase())
    );
    if(sort==="low") list.sort((a,b)=>a.price-b.price);
    if(sort==="high") list.sort((a,b)=>b.price-a.price);
    if(sort==="name") list.sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  },[maxPrice,color,size,dressStyle,search,sort]);

  const reset=()=>{setMaxPrice(5000);setColor("");setSize("");setDressStyle("");setSearch("");setSort("featured");};
  const filters=<>
    <div className="pl-filter-head"><h2>FILTER</h2><button onClick={reset}>CLEAR ALL</button></div>
    <section className="pl-filter-group"><div className="pl-filter-title"><h3>Price</h3><span>Up to {money(maxPrice)}</span></div><input className="pl-range" aria-label="Maximum price" type="range" min="1000" max="5000" step="100" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/><div className="pl-range-labels"><span>Rs. 1,000</span><span>Rs. 5,000</span></div></section>
    <section className="pl-filter-group"><h3>Colors</h3><div className="pl-colors">{colors.map(c=><button key={c} title={c} aria-label={c} aria-pressed={color===c} className={"pl-color "+(color===c?"selected":"")} style={{backgroundColor:({Black:"#171717",White:"#fff",Grey:"#9b9b9b",Beige:"#d7c3a4",Blue:"#315a91",Pink:"#e7a7b8",Brown:"#79543b",Green:"#55745b",Navy:"#1d2e4c"} as Record<string,string>)[c]}} onClick={()=>setColor(color===c?"":c)}/>)}</div><p className="pl-selected">{color||"All colors"}</p></section>
    <section className="pl-filter-group"><h3>Size</h3><div className="pl-sizes">{sizes.map(s=><button key={s} aria-pressed={size===s} className={size===s?"chosen":""} onClick={()=>setSize(size===s?"":s)}>{s}</button>)}</div></section>
    <section className="pl-filter-group"><h3>Dress Style</h3>{dressStyles.map(style=><label className="pl-check" key={style}><input type="radio" name="dress-style" checked={dressStyle===style} onChange={()=>setDressStyle(dressStyle===style?"":style)}/>{style}</label>)}</section>
  </>;

  return <main className="pl-page">
    <div className="pl-promo">COMPLIMENTARY SHIPPING ON SELECTED ORDERS&nbsp; · &nbsp;DISCOVER YOUR EVERYDAY STYLE</div>
    <header className="pl-header">
      <Link href="/" className="pl-logo">EUPHORIA<span>FEEL THE STYLE</span></Link>
      <nav><Link href="/">HOME</Link><a href="/#collections">COLLECTIONS</a><Link href="/products" aria-current="page">SHOP ALL</Link></nav>
      <div className="pl-head-actions"><label className="pl-search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products"/></label><Link href="/#featured" className="pl-bag">BAG ({bag.length})</Link></div>
    </header>
    <div className="pl-breadcrumb"><Link href="/">Home</Link><span>/</span><strong>Shop all</strong></div>
    <section className="pl-title"><div><p>THE EUPHORIA COLLECTION</p><h1>Products</h1><span>Everyday pieces. Effortless style. Find your new favourites.</span></div><div className="pl-title-count">A CURATED EDIT<br/><b>01 — 20</b></div></section>
    <div className="pl-toolbar"><button className="pl-mobile-filter" onClick={()=>setMobileFilters(!mobileFilters)}>☷ FILTER & SORT</button><span>{visible.length} PRODUCTS</span><label>SORT BY <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name: A to Z</option></select></label></div>
    <div className="pl-layout"><aside className={"pl-sidebar "+(mobileFilters?"open":"")}>{filters}</aside>
      <section className="pl-results"><div className="pl-grid">{visible.map(p=><article className="pl-card" key={p.id}><Link href={"/#featured"} className="pl-image"><img src={p.image} alt={p.name} loading="lazy"/><span>{p.tag}</span></Link><div className="pl-meta">{p.category.toUpperCase()} <span>{p.brand.toUpperCase()}</span></div><h2>{p.name}</h2><p className="pl-price">{money(p.price)}</p><button className="pl-add" onClick={()=>setBag(old=>[...old,p.id])}>{bag.includes(p.id)?"ADD ANOTHER +":"ADD TO BAG +"}</button></article>)}</div>{visible.length===0&&<div className="pl-empty"><h2>No products found</h2><p>Try changing your filters to see more styles.</p><button onClick={reset}>CLEAR FILTERS</button></div>}</section>
    </div>
    <section className="pl-seo-copy">
      <h2>Clothing for Women Online in India</h2>
      <p>Explore effortless everyday fashion with Euphoria. Discover women’s clothing, versatile tops, comfortable co-ord sets and statement styles for every occasion. Browse the collection, compare your favourites and find pieces that make getting dressed feel easy.</p>
      <h2>Buy Women’s Clothing at Best Prices</h2>
      <p>Refresh your wardrobe with stylish options at considered prices. From relaxed everyday outfits to elevated looks for weekends and special plans, shop women’s fashion in a range of colours, fits and sizes. Use the filters above to find the style that suits you.</p>
    </section>
    <section className="pl-editorial"><p>MADE FOR EVERY VERSION OF YOU</p><h2>Find your everyday favourite.</h2><Link href="/">DISCOVER EUPHORIA ↗</Link></section>
    <footer className="pl-footer"><Link href="/" className="pl-logo">EUPHORIA<span>FEEL THE STYLE</span></Link><p>© {new Date().getFullYear()} Euphoria. All style, all yours.</p><Link href="/">BACK TO HOME ↑</Link></footer>
  </main>;
}
