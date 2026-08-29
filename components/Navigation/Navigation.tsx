"use client"

import {useState} from 'react';

import Link from "next/link";

import styles from "./Navigation.module.css";

import Image from "next/image"


const navigationLinks = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "About",
        href: "#about"
    },
    {
        label: "What We Serve",
        href: "#what-we-serve",
    },
    {
        label: "Stores",
        href: "#stores",
    },
    {
        label: "Contact",
        href: "#contact",
    },
];

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function closeMenu() {
        setIsMenuOpen(false);
    }

    function toggleMenu() {
        setIsMenuOpen((currentState) => !currentState);
    }

    return(
        <header className={styles.navigation}>
            <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Plattino Hub home" onClick={closeMenu}>
          {/* PLATTINO HUB */}
          <Image
            src="/images/logo/plattino-hub-logo.svg"
            alt="Plattino Hub"
            width={110}
            height={93}
            priority
        />
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.desktopLinks} aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}

          <Link href="/order" className={styles.shopButton}>
            Shop Now
          </Link>
        </nav>

         {/* Mobile menu button */}
        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={styles.menuIcon}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

       {/* Mobile navigation */}
      <nav
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-label="Mobile navigation"
      >
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/order"
          className={styles.mobileShopButton}
          onClick={closeMenu}
        >
          Shop Now
        </Link>
      </nav>
        </header>
    )
}