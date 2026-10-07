
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const r = await fetch("/api/password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const d = await r.json();

      if (d.devCode) {
        setMessage(`Verification code: ${d.devCode}`);

        setTimeout(() => {
          location.href = `/check-email?email=${encodeURIComponent(
            email
          )}&code=${encodeURIComponent(d.devCode)}`;
        }, 700);
      } else {
        setMessage(d.message || "Please check your email.");
      }
    } catch {
      setMessage("Unable to prepare reset.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Reset Password">
      <p className="intro">
        Enter your account email and we’ll start the password recovery process.
      </p>

      <form onSubmit={submit}>
        <label className="label">Email address</label>

        <input
          className="field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        {message && <div className="success">{message}</div>}

        <button className="signin" type="submit" disabled={loading}>
          {loading ? "Sending…" : "Continue"}
        </button>
      </form>

      <div className="bottom">
        <a href="/login">Back to Sign In</a>
      </div>
    </AuthShell>
  );
}

function AuthShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="site">
      <header className="header">
        <div className="logo">
          Euphoria
          <small>FEEL THE STYLE</small>
        </div>

        <div className="search">
          ⌕ <span>Search</span>
        </div>

        <nav className="header-right">
          <button
            type="button"
            className="header-btn"
            onClick={() => (location.href = "/login")}
          >
            Login
          </button>

          <button
            type="button"
            className="header-btn"
            onClick={() => (location.href = "/signup")}
          >
            Sign Up
          </button>
        </nav>
      </header>

      <section className="login-page">
        <div
          className="visual"
          style={{
            position: "relative",
            width: "50%",
            minHeight: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/auth/bert-b-rhNff6hB41s-unsplash 3.png"
            alt="Euphoria fashion"
            fill
            priority
            sizes="60vw"
            style={{
              objectFit: "contain",
              objectPosition: "center center",
            }}
            />
        </div>

        <section className="form-panel">
          <div className="form-inner">
            <h1>{title}</h1>
            {children}
          </div>
        </section>
      </section>
    </main>
  );
}

