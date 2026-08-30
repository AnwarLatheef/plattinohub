"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { requestPhoneOtp } from "@/services/auth";

import styles from "./ForgotPasswordForm.module.css";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const cleanedPhone = phone.replace(/\D/g, "");

    if (cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await requestPhoneOtp(cleanedPhone);

      if (!response.success) {
        setError(response.message);
        return;
      }

      router.push(
        `/forgot-password/verify?phone=${cleanedPhone}`,
      );
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
          <h1>Forgot your password?</h1>

          <p>
            Enter your registered phone number and
            we&apos;ll send you a verification code.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
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
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                disabled={loading}
                required
              />
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
            {loading ? "Sending OTP..." : "Continue"}
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