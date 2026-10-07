"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Search
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Language
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English (United States)");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const r = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const d = await r.json();

      setMessage(d.message);

      if (r.ok) {
        setTimeout(() => {
          location.href = "/login";
        }, 700);
      }
    } catch {
      setMessage("Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      setSearchOpen(false);
      return;
    }

    // Home page ko search query ke saath open karega
    window.location.href = `/?search=${encodeURIComponent(query)}`;
  }

  function selectLanguage(lang: string) {
    setLanguage(lang);
    setLangOpen(false);
  }

  return (
    <main className="site">
      <header className="header">
        {/* Logo */}
        <div className="logo">
          Euphoria
          <small>FEEL THE STYLE</small>
        </div>

        {/* Working Search */}
        <div className="search">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="search-form">
              <span>⌕</span>

              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />

              <button
                type="button"
                className="search-close"
                onClick={() => {
                  setSearch("");
                  setSearchOpen(false);
                }}
              >
                ×
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="search-button"
              onClick={() => setSearchOpen(true)}
            >
              ⌕ <span>Search</span>
            </button>
          )}
        </div>

        <nav className="header-right">
          {/* Working English Dropdown */}
          <div className="language-wrapper">
            <button
              type="button"
              className="lang"
              onClick={() => setLangOpen(!langOpen)}
            >
              {language}⌄
            </button>

            {langOpen && (
              <div className="language-menu">
                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("English (United States)")
                  }
                >
                  English (United States)
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("English (United Kingdom)")
                  }
                >
                  English (United Kingdom)
                </button>
              </div>
            )}
          </div>

          {/* Login */}
          <button
            type="button"
            className="header-btn"
            onClick={() => (location.href = "/login")}
          >
            Login
          </button>

          {/* Sign Up */}
          <button type="button" className="header-btn active">
            Sign Up
          </button>
        </nav>
      </header>

      
        {/* Sign Up Image */}
  <section className="login-page">
  {/* Sign Up Image */}
  <div className="visual">
    <Image
      src="/images/auth/bert-b-rhNf6hB41s-unsplash 2.png"
      alt="Euphoria fashion"
      fill
      priority
      sizes="50vw"
      objectFit="contain"
    />
  </div>


        {/* Sign Up Form */}
        <section className="form-panel">
          <div className="form-inner">
            <h1>Sign Up</h1>

            {/* Google Sign Up */}
            <button
              type="button"
              className="social google"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
            >
              ⓖ &nbsp; Continue With Google
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <form onSubmit={submit}>
              {/* Full Name */}
              <label className="label">Full name</label>

              <input
                className="field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />

              {/* Email */}
              <label className="label">Email address</label>

              <input
                className="field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />

              {/* Password */}
              <label className="label">Password</label>

              <div className="pass-wrap">
                <input
                  className="field"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />

                <button
                  className="show"
                  type="button"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={
                    message.includes("successfully")
                      ? "success"
                      : "error"
                  }
                >
                  {message}
                </div>
              )}

              {/* Create Account */}
              <button
                className="signin"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating…" : "Create Account"}
              </button>
            </form>

            <div className="bottom">
              Already have an account?{" "}
              <a href="/login">Sign in</a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
