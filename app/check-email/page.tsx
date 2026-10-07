
"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function CheckEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const initialCode = searchParams.get("code") || "";

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [verificationCode, setVerificationCode] = useState(initialCode);

  async function resendEmail() {
    if (!email) {
      setMessage("Please go back and enter your email address first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to resend. Please try again.");
        return;
      }

      if (data.devCode) {
        const newCode = String(data.devCode);

        setVerificationCode(newCode);
        setMessage(`Verification code: ${newCode}`);

        router.replace(
          `/check-email?email=${encodeURIComponent(
            email
          )}&code=${encodeURIComponent(newCode)}`
        );
      } else {
        setMessage("Reset instructions have been sent again.");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    router.push(`/?search=${encodeURIComponent(query)}`);
  }

  function goToVerification() {
    const cleanCode = verificationCode.replace(/\D/g, "");

    if (!email) {
      setMessage("Email address is missing.");
      return;
    }

    if (cleanCode.length !== 6) {
      setMessage("Please enter the 6-digit verification code.");
      return;
    }

    router.push(
      `/verification?email=${encodeURIComponent(
        email
      )}&code=${encodeURIComponent(cleanCode)}`
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#222",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          height: "92px",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          padding: "0 6%",
          gap: "30px",
          boxSizing: "border-box",
        }}
      >
        {/* LOGO */}
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            minWidth: "145px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "24px",
              fontStyle: "italic",
              color: "#222",
              lineHeight: 1,
            }}
          >
            Euphoria
          </div>

          <div
            style={{
              fontSize: "8px",
              letterSpacing: "2px",
              marginTop: "5px",
              color: "#777",
            }}
          >
            FEEL THE STYLE
          </div>
        </button>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "40px",
              background: "#f6f6f6",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                color: "#777",
                marginRight: "8px",
                lineHeight: 1,
              }}
            >
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              aria-label="Search"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
                height: "100%",
                fontSize: "13px",
                color: "#222",
              }}
            />
          </div>
        </form>

        {/* LANGUAGE */}
        <button
          type="button"
          onClick={() =>
            setMessage("Language selection is coming soon.")
          }
          style={{
            border: "none",
            background: "transparent",
            fontSize: "12px",
            color: "#444",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          English (United States) ▾
        </button>

        {/* LOGIN */}
        <button
          type="button"
          onClick={() => router.push("/login")}
          style={{
            width: "72px",
            height: "34px",
            border: "1px solid #999",
            borderRadius: "5px",
            background: "#fff",
            color: "#222",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Login
        </button>

        {/* SIGN UP */}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          style={{
            width: "82px",
            height: "34px",
            border: "1px solid #999",
            borderRadius: "5px",
            background: "#fff",
            color: "#222",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Sign Up
        </button>
      </header>

      {/* MAIN */}
      <section
        style={{
          display: "flex",
          width: "100%",
          minHeight: "calc(100vh - 92px)",
        }}
      >
        {/* LEFT IMAGE */}
        <div
          style={{
            position: "relative",
            width: "50%",
            minHeight: "590px",
            overflow: "hidden",
            background: "#f8f8f8",
          }}
        >
          <Image
            src="/images/auth/bert-b-rhNff6hB41s-unsplash 4.png"
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

        {/* RIGHT CONTENT */}
        <div
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            padding: "60px 7%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "34px",
                fontWeight: 600,
                margin: "0 0 20px",
                color: "#222",
              }}
            >
              Check Email
            </h1>

            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                color: "#777",
                margin: "0 0 8px",
              }}
            >
              Please check your email inbox and click on the provided
              link to reset your password.
            </p>

            {email && (
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "#777",
                  margin: "0 0 8px",
                }}
              >
                We sent the reset instructions to{" "}
                <strong style={{ color: "#333" }}>
                  {email}
                </strong>
                .
              </p>
            )}

            {/* VERIFICATION CODE */}
            <div
              style={{
                marginTop: "22px",
              }}
            >
              <label
                htmlFor="verification-code"
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#555",
                  marginBottom: "8px",
                }}
              >
                Verification code
              </label>

              <input
                id="verification-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="000000"
                style={{
                  width: "100%",
                  height: "46px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "0 14px",
                  boxSizing: "border-box",
                  outline: "none",
                  fontSize: "16px",
                  letterSpacing: "4px",
                  color: "#222",
                }}
              />

              {/* VERIFY CODE */}
              <button
                type="button"
                onClick={goToVerification}
                style={{
                  width: "100%",
                  height: "46px",
                  marginTop: "14px",
                  border: "none",
                  borderRadius: "5px",
                  background: "#222",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Verify Code
              </button>
            </div>

            {/* RESEND */}
            <button
              type="button"
              onClick={resendEmail}
              disabled={loading}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                marginTop: "18px",
                color: "#9b5de5",
                fontSize: "13px",
                cursor: loading ? "not-allowed" : "pointer",
                textDecoration: "underline",
              }}
            >
              {loading ? "Sending..." : "Click here to resend"}
            </button>

            {/* MESSAGE */}
            {message && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "12px 14px",
                  background: "#f7f3fb",
                  borderRadius: "5px",
                  color: "#555",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                {message}
              </div>
            )}

            {/* BACK TO LOGIN */}
            <div
              style={{
                marginTop: "28px",
              }}
            >
              <button
                type="button"
                onClick={() => router.push("/login")}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  color: "#555",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                ← Back to Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIVE */}
      <style jsx>{`
        @media (max-width: 768px) {
          header {
            height: auto !important;
            min-height: 92px !important;
            flex-wrap: wrap !important;
            padding: 18px 5% !important;
            gap: 14px !important;
          }

          header form {
            order: 3;
            flex-basis: 100%;
          }

          header form > div {
            width: 100% !important;
          }

          section {
            flex-direction: column !important;
          }

          section > div {
            width: 100% !important;
          }

          section > div:first-child {
            min-height: 420px !important;
          }

          section > div:last-child {
            padding: 45px 7% !important;
          }
        }
      `}</style>
    </main>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          Loading...
        </main>
      }
    >
      <CheckEmailContent />
    </Suspense>
  );
}

