"use client";

import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";

import styles from "./ResetPasswordForm.module.css";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phone = searchParams.get("phone") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phone) {
      router.replace("/forgot-password");
    }
  }, [phone, router]);

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
     
      await new Promise((resolve) =>
        setTimeout(resolve, 500),
      );

      router.push("/login?reset=success");
    } catch {
      setError(
        "Unable to reset your password. Please try again.",
      );
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
          <h1>Create new password</h1>

          <p>
            Choose a new password for your Plattino
            account.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="password">
              New password
            </label>

            <div className={styles.passwordInput}>
              <input
                id="password"
                name="password"
                type={
                  showPassword ? "text" : "password"
                }
                autoComplete="new-password"
                placeholder="Enter new password"
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
                onClick={() =>
                  setShowPassword(
                    (value) => !value,
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <span className={styles.hint}>
              Use at least 8 characters.
            </span>
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm-password">
              Confirm new password
            </label>

            <div className={styles.passwordInput}>
              <input
                id="confirm-password"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                disabled={loading}
                required
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() =>
                  setShowConfirmPassword(
                    (value) => !value,
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p
              className={styles.error}
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update password"}
          </button>
        </form>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push("/login")}
        >
          Back to sign in
        </button>
      </section>
    </main>
  );
}