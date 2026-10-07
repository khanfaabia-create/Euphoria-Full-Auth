"use client";
import { signOut } from "next-auth/react";
export default function HomeClient({ name }: { name: string }) {
  return <main className="home"><header className="header"><div className="logo">Euphoria<small>FEEL THE STYLE</small></div><div className="search">⌕ <span>Search</span></div><button className="header-btn active" onClick={()=>signOut({callbackUrl:"/login"})}>Logout</button></header><section className="home-hero"><div><p className="eyebrow">WELCOME TO EUPHORIA</p><h1>Feel the style.<br/>Own the moment.</h1><p>Welcome back, {name}. Your Euphoria shopping journey starts here.</p><button className="signin">Shop Collection</button></div><div className="home-photo" /></section></main>;
}
