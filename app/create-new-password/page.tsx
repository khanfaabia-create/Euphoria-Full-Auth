"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

function Content() {
  const router = useRouter();
  const p = useSearchParams();

  const email = p.get("email") || "";

  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMsg("");

    if (password !== confirm) {
      setMsg("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setMsg("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const r = await fetch("/api/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const d = await r.json();

      setMsg(d.message || "Password updated successfully.");

      if (r.ok) {
        setTimeout(() => {
          router.push("/login");
        }, 900);
      }
    } catch {
      setMsg("Unable to update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="site">
      <header className="header">
        <div className="logo">
          Euphoria
          <small>FEEL THE STYLE</small>
        </div>

        <form className="search" onSubmit={handleSearch}>
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search"
          />
        </form>

        <div className="header-actions">
          <select
            className="language"
            defaultValue="English (United States)"
            aria-label="Language"
          >
            <option>English (United States)</option>
            <option>English (United Kingdom)</option>
          </select>

          <button
            type="button"
            className="login-button"
            onClick={() => router.push("/login")}
          >
            Login
          </button>

          <button
            type="button"
            className="signup-button"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>
        </div>
      </header>

      <section className="login-page">
        <div className="visual">
          <Image
            src="/images/auth/bert-b-rhNff6hB41s-unsplash 6.png"
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

        <section className="form-panel">
          <div className="form-inner">
            <h1>Create New Password</h1>

            <p className="intro">
              Create a new password for{" "}
              <strong>{email}</strong>.
            </p>

            <form onSubmit={submit}>
              <label className="label" htmlFor="new-password">
                New password
              </label>

              <div className="pass-wrap">
                <input
                  id="new-password"
                  className="field"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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

              <p className="hint">
                Must be at least 8 characters.
              </p>

              <label className="label" htmlFor="confirm-password">
                Confirm password
              </label>

              <input
                id="confirm-password"
                className="field"
                type={show ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                required
              />

              {msg && (
                <div
                  className={
                    msg.toLowerCase().includes("success") ||
                    msg.toLowerCase().includes("updated")
                      ? "success"
                      : "error"
                  }
                >
                  {msg}
                </div>
              )}

              <button
                className="signin"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Create New Password"}
              </button>
            </form>
          </div>
        </section>
      </section>

      <style jsx>{`
        .site {
          min-height: 100vh;
          background: #fff;
          color: #111;
        }

        .header {
          min-height: 78px;
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 0 42px;
          border-bottom: 1px solid #e8e8e8;
          background: #fff;
        }

        .logo {
          min-width: 145px;
          font-size: 27px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .logo small {
          display: block;
          margin-top: 1px;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 2.2px;
        }

        .search {
          flex: 1;
          max-width: 470px;
          height: 42px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 14px;
          border: 1px solid #dcdcdc;
          border-radius: 3px;
          background: #fafafa;
        }

        .search-icon {
          font-size: 24px;
          line-height: 1;
          color: #777;
        }

        .search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font-size: 14px;
          color: #111;
        }

        .search input::placeholder {
          color: #888;
        }

        .header-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .language {
          height: 40px;
          border: 1px solid #ddd;
          background: #fff;
          padding: 0 10px;
          border-radius: 3px;
          font-size: 13px;
          color: #333;
          cursor: pointer;
        }

        .login-button,
        .signup-button {
          height: 40px;
          padding: 0 17px;
          border-radius: 3px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .login-button {
          border: 1px solid #111;
          background: #fff;
          color: #111;
        }

        .signup-button {
          border: 1px solid #111;
          background: #111;
          color: #fff;
        }

        .login-page {
          min-height: calc(100vh - 78px);
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .visual {
          position: relative;
          min-height: calc(100vh - 78px);
          overflow: hidden;
          background: #f5f5f5;
        }

        .fashion-image {
          object-fit: cover;
        }

        .form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 50px;
          background: #fff;
        }

        .form-inner {
          width: 100%;
          max-width: 430px;
        }

        h1 {
          margin: 0 0 16px;
          font-size: 38px;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .intro {
          margin: 0 0 30px;
          color: #666;
          font-size: 14px;
          line-height: 1.7;
        }

        .intro strong {
          color: #111;
          font-weight: 600;
          word-break: break-word;
        }

        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .pass-wrap {
          position: relative;
        }

        .field {
          width: 100%;
          height: 48px;
          box-sizing: border-box;
          padding: 0 72px 0 14px;
          border: 1px solid #d8d8d8;
          border-radius: 3px;
          outline: none;
          font-size: 15px;
          background: #fff;
        }

        .field:focus {
          border-color: #111;
        }

        .show {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: #111;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .hint {
          margin: 7px 0 22px;
          color: #777;
          font-size: 12px;
        }

        .error,
        .success {
          margin-top: 14px;
          padding: 10px 12px;
          border-radius: 3px;
          font-size: 13px;
        }

        .error {
          background: #fff0f0;
          color: #b00020;
        }

        .success {
          background: #effaf1;
          color: #176b2c;
        }

        .signin {
          width: 100%;
          height: 50px;
          margin-top: 22px;
          border: 0;
          border-radius: 3px;
          background: #111;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .signin:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 1100px) {
          .header {
            padding: 0 24px;
            gap: 18px;
          }

          .header-actions {
            gap: 7px;
          }

          .language {
            max-width: 150px;
          }
        }

        @media (max-width: 900px) {
          .header {
            min-height: 78px;
            flex-wrap: wrap;
            padding: 16px 20px;
          }

          .logo {
            flex: 1;
          }

          .header-actions {
            margin-left: 0;
          }

          .search {
            order: 3;
            flex-basis: 100%;
            max-width: none;
          }

          .login-page {
            grid-template-columns: 1fr;
          }

          .visual {
            min-height: 430px;
            height: 430px;
          }

          .form-panel {
            padding: 50px 24px 70px;
          }
        }

        @media (max-width: 560px) {
          .header {
            padding: 15px;
          }

          .logo {
            font-size: 24px;
          }

          .language {
            display: none;
          }

          .login-button,
          .signup-button {
            padding: 0 12px;
          }

          .visual {
            min-height: 330px;
            height: 330px;
          }

          .form-panel {
            padding: 40px 20px 60px;
          }

          h1 {
            font-size: 32px;
          }
        }
      `}</style>
    </main>
  );
}

function AuthShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default function CreateNewPassword() {
  return (
    <Suspense fallback={<div />}>
      <Content />
    </Suspense>
  );
}