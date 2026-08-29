import { getStores } from "@/services/api";

import styles from "./StoreLocator.module.css";

export default async function StoreLocator() {
  const stores = await getStores();

  const activeStores = stores
    .filter((store) => store.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (activeStores.length === 0) {
    return null;
  }

  return (
    <section id="stores" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Store Locator</p>

          <h2 className={styles.title}>
            Find your nearest Plattino.
          </h2>

          <p className={styles.intro}>
            Visit us for your favourite shakes, desserts, snacks
            and more.
          </p>

          <div className={styles.storeList}>
            {activeStores.map((store) => (
              <article key={store.id} className={styles.storeCard}>
                <div>
                  <h3>{store.name}</h3>

                  <p>{store.address}</p>

                  <p>
                    {store.city}, {store.state}{" "}
                    {store.postalCode}
                  </p>
                </div>

                <div className={styles.storeMeta}>
                  <span>
                    {store.openingTime} – {store.closingTime}
                  </span>

                  <span
                    className={
                      store.isOpen
                        ? styles.open
                        : styles.closed
                    }
                  >
                    {store.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.mapPlaceholder}>
          <div className={styles.mapContent}>
            <span className={styles.mapPin}>●</span>

            <p>Map</p>

            <span>
              Store locations will appear here.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}