import styles from "./About.module.css";
import Image from "next/image";
import { getAbout } from "@/services/api";

export default async function About() {
    const about = await getAbout();

    if (!about.isActive){
        return null;
    }
    return (

        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.content}>
                <p className={styles.eyebrow}>
                    {about.eyebrow}
                </p>

                <h2 className={styles.title}>
                    {about.title}

                </h2>
                <div className={styles.description}>
                    {about.description.map((paragraph) => (
                        <p key={paragraph}>
                            {paragraph}
                        </p>
                    ))}
                </div>
                </div>

                <div className={styles.visuals}>
                    <Image
                    src={about.image}
                    alt="Plattino Owl"
                    width={1536}
                    height={1536}
                    className={styles.owl}
                    />
                </div>
            </div>
        </section>

    )
}