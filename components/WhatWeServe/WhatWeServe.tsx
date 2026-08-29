import Link from "next/link";

import { getServices } from "@/services/api";

import styles from "./WhatWeServe.module.css";

export default async function WhatWeServe() {
  const services = await getServices();

  const activeServices = services
    .filter((service) => service.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (activeServices.length === 0) {
    return null;
  }

  return (
    <section id="what-we-serve" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>What We Serve</p>

          <h2 className={styles.title}>
            Something for every craving.
          </h2>

          <p className={styles.intro}>
            From indulgent shakes to satisfying bites, there is
            something waiting for everyone at Plattino Hub.
          </p>
        </header>

        <div className={styles.grid}>
          {activeServices.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className={styles.card}
            >
              <span className={styles.cardNumber}>
                {String(service.displayOrder).padStart(2, "0")}
              </span>

              <div className={styles.cardContent}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}