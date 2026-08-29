"use client";

import { FormEvent, useState } from "react";

import { submitContactMessage } from "@/services/api";

import styles from "./Contact.module.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await submitContactMessage(form);

      if (!response.success) {
        throw new Error(
          response.message || "Something went wrong.",
        );
      }

      setStatus({
        type: "success",
        message:
          response.message ||
          "Your message has been sent successfully.",
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "We couldn't send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={styles.field}>
        <label htmlFor="contact-name">Name</label>

        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email">Email</label>

        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message</label>

        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          rows={6}
          required
        />
      </div>

      <button
        type="submit"
        className={styles.submit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {status && (
        <p
          className={
            status.type === "success"
              ? styles.success
              : styles.error
          }
          role="status"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}