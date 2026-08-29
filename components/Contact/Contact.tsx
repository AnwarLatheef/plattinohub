import ContactForm from "./ContactForm";

import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Contact Us</p>

          <h2 className={styles.title}>
            We&apos;d love to hear from you.
          </h2>

          <p className={styles.description}>
            Have a question, suggestion, or just want to say hello?
            Send us a message and our team will get back to you.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}