"use client";

import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";

import {
  requestPhoneOtp,
  verifyPhoneOtp,
} from "@/services/auth";

import styles from "./ForgotPasswordVerification.module.css";

export default function ForgotPasswordVerification() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const phone = searchParams.get("phone") ?? "";

useEffect(() => {
  if (!searchParams.get("phone")) {
    router.replace("/forgot-password");
  }
}, [router, searchParams]);



  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyPhoneOtp(
        phone,
        otp,
      );

      if (!response.success) {
        setError(response.message);
        return;
      }

    
      router.push(
        `/forgot-password/reset?phone=${phone}`,
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!phone || resending) {
      return;
    }

    setError("");
    setResending(true);

    try {
      const response = await requestPhoneOtp(phone);

      if (!response.success) {
        setError(response.message);
      }
    } catch {
      setError("Unable to resend the code. Please try again.");
    } finally {
      setResending(false);
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
          <h1>Verify your number</h1>

          <p>
            Enter the 6-digit code sent to
          </p>

          <strong>
            +91 {phone}
          </strong>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="otp">
              Verification code
            </label>

            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(event) =>
                setOtp(
                  event.target.value.replace(/\D/g, ""),
                )
              }
              disabled={loading}
              required
            />
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
            {loading ? "Verifying..." : "Verify number"}
          </button>
        </form>

        <div className={styles.resend}>
          <span>Didn&apos;t receive the code?</span>

          <button
            type="button"
            className={styles.linkButton}
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        </div>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push("/forgot-password")}
        >
          Change phone number
        </button>
      </section>
    </main>
  );
}