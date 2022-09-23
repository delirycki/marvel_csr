/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [heroes, setHeroes] = useState<any>([]);

  useEffect(() => {
    async function getHeroes() {
      const resp = await fetch(
        "https://gateway.marvel.com:443/v1/public/characters?limit=40&apikey=911d546bd79d3f82f8c8b80f8db09803&hash=8a2bc7b571c1c73e1df78efce097299714bab191"
      );
      setHeroes( await resp.json());
    }
    getHeroes();
  }, []);
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Marver Heroes List</title>
      </Head>
      <h2>Marver Heroes List</h2>
      <div className={styles.grid}>
        {heroes.data?.results?.map((hero:any) => (
          <div className={styles.card} key={hero.id}>
            <Link href={`/hero/${hero.id}`}>
              <a>
                <img
                  src={hero.thumbnail.path + `/portrait_incredible.`+ hero.thumbnail.extension}
                  alt={hero.name}
                />
                <h3>{hero.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
      
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75448.22842567014!2d20.465698800000002!3d53.7760107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e2792d071419c7%3A0x106a8126cf54c20f!2sOlsztyn!5e0!3m2!1sen!2spl!4v1663914613074!5m2!1sen!2spl" width="600" height="450" loading="lazy"/>
    </div>
  )
}

export default Home
