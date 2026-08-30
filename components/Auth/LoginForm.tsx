"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { login } from "@/services/auth";

import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const cleanedPhone = phone.replace(/\D/g, "");

    if (cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        phone: cleanedPhone,
        password,
      });

      if (!response.success) {
        setError(response.message);
        return;
      }

      // Temporary mock behavior.
      // Later this will establish the real customer session.
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.brand}>
          <Image
            src="/images/logo/plattino-hub-logo.svg"
            alt="Plattino Hub"
            width={120}
            height={101}
            loading="eager"
          />
        </div>

        <div className={styles.header}>
          <h1>Welcome back</h1>
          <p>Sign in to your Plattino account.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="phone">
              Phone number
            </label>

            <div className={styles.phoneInput}>
              <span>+91</span>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.passwordLabel}>
              <label htmlFor="password">
                Password
              </label>

              <button
                type="button"
                className={styles.forgotButton}
                onClick={() => router.push("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            <div className={styles.passwordInput}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                disabled={loading}
                required
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((value) => !value)}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button
          type="button"
          className={styles.guestButton}
          onClick={() => router.push("/order")}
        >
          Continue as Guest
        </button>

        <p className={styles.registerText}>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </p>
      </section>
    </main>
  );
}