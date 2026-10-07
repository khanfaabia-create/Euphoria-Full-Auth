"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("English (United States)");

  // -----------------------------
  // SEARCH
  // -----------------------------
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    window.location.href = `/?search=${encodeURIComponent(query)}`;
  }

  // -----------------------------
  // LOGIN
  // -----------------------------
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const r = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (r?.error) {
        setError("Email or password is incorrect.");
      } else {
        window.location.href = r?.url || "/";
      }
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // LANGUAGE
  // -----------------------------
  function handleLanguageChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const selectedLanguage = e.target.value;

    setLanguage(selectedLanguage);
  }

  return (
    <main className="site">
      {/* ================= HEADER ================= */}

      <header className="header">
        {/* LOGO */}
        <div
          className="logo"
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          Euphoria
          <small>FEEL THE STYLE</small>
        </div>

        {/* SEARCH */}
        <form
          className="search"
          onSubmit={handleSearch}
        >
          <span className="search-icon">⌕</span>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search"
            aria-label="Search"
          />

          <button
            type="submit"
            aria-label="Search"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
            }}
          >
            ↵
          </button>
        </form>

        {/* HEADER RIGHT */}
        <nav className="header-right">
          {/* LANGUAGE */}
          <select
            className="lang"
            value={language}
            onChange={handleLanguageChange}
            aria-label="Language"
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <option value="English (United States)">
              English (United States)
            </option>

            <option value="English (United Kingdom)">
              English (United Kingdom)
            </option>

            <option value="English (Australia)">
              English (Australia)
            </option>
          </select>

          {/* LOGIN */}
          <button
            className="header-btn active"
            type="button"
          >
            Login
          </button>

          {/* SIGN UP */}
          <button
            className="header-btn"
            type="button"
            onClick={() =>
              (window.location.href = "/signup")
            }
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* ================= LOGIN PAGE ================= */}

      <section className="login-page">

        {/* ================= IMAGE ================= */}

        <div className="visual">
          <Image
            src="/images/auth/bert-b-rhNB41s-unsplash 1.png"
            alt="Euphoria fashion"
            fill
            priority
            sizes="50vw"
            style={{
              objectFit: "contain",
              objectPosition: "center center",
            }}
          />
        </div>

        {/* ================= FORM PANEL ================= */}

        <section className="form-panel">
          <div className="form-inner">

            <h1>Sign In Page</h1>

            {/* ================= GOOGLE LOGIN ================= */}

            <button
              className="social google"
              type="button"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
            >
              ⓖ &nbsp; Continue With Google
            </button>

            {/* DIVIDER */}

            <div className="divider">
              <span>OR</span>
            </div>

            {/* ERROR */}

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            {/* ================= LOGIN FORM ================= */}

            <form onSubmit={submit}>

              {/* EMAIL */}

              <label
                className="label"
                htmlFor="email"
              >
                User name or email address
              </label>

              <input
                id="email"
                className="field"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                placeholder="Enter your email"
              />

              {/* PASSWORD */}

              <label
                className="label"
                htmlFor="password"
              >
                Password
              </label>

              <div className="pass-wrap">
                <input
                  id="password"
                  className="field"
                  type={
                    show
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />

                <button
                  className="show"
                  type="button"
                  onClick={() =>
                    setShow(!show)
                  }
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>

              {/* FORGOT PASSWORD */}

              <button
                className="forgot"
                type="button"
                onClick={() =>
                  (window.location.href =
                    `/reset-password?email=${encodeURIComponent(
                      email
                    )}`)
                }
              >
                Forget your password
              </button>

              {/* SIGN IN */}

              <button
                className="signin"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Signing in…"
                  : "Sign In"}
              </button>

            </form>

            {/* SIGN UP LINK */}

            <div className="bottom">
              Don't have an account?{" "}
              <a href="/signup">
                Sign up
              </a>
            </div>

          </div>
        </section>
      </section>
    </main>
  );
}
