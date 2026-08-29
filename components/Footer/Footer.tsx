import Image from "next/image";
import Link from "next/link";

import { getFooter } from "@/services/api";

import styles from "./Footer.module.css";

export default async function Footer() {
  const footer = await getFooter();

  if (!footer.isActive) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/images/logo/plattino-hub-logo.svg"
                alt="Plattino Hub"
                width={160}
                height={135}
                loading="eager"
                priority
              />
            </Link>

            <p>{footer.brandDescription}</p>
          </div>

          <nav className={styles.navigation} aria-label="Footer navigation">
            {footer.navigation.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.social}>
            {footer.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.copyright}</p>

          <div className={styles.legal}>
            {footer.legalLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}