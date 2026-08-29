
import { getHeroBanners } from "@/services/api";

import HeroCarousel from "./HeroCarousel";

import styles from "./Hero.module.css";

export default async function Hero() {
  const banners = await getHeroBanners();

  const activeBanners = banners
    .filter((banner) => banner.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className={styles.hero}>

      <HeroCarousel banners={activeBanners} />
    </section>
  );
}