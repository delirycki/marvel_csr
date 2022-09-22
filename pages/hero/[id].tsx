/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  const [hero, setHero] = useState<any>(null);

  useEffect(() => {
    async function getHero() {
      const resp = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=911d546bd79d3f82f8c8b80f8db09803&hash=8a2bc7b571c1c73e1df78efce097299714bab191`

      );
        const data = await resp.json()
      setHero(data.data.results[0]);
    }
    if (id) {
      getHero();
    }
  }, [id]);

  if (!hero) {
    return null;
  }
  console.log(hero)

  return (
    <div>
      <Head>
        <title>{hero.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={hero.thumbnail.path + `/portrait_incredible.`+ hero.thumbnail.extension}
            alt={hero.name}
          />
        </div>
        <div>
          <div className={styles.name}>{hero.name}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name of stories</th>
              </tr>
            </thead>
            <tbody>
              {hero.stories.items.map(({ name}:{name:string}) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
