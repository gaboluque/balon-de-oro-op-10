import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { nomineesGB, nomineesGG } from "./index";


const Home: NextPage = () => {
  const [resultsGB, setResultsGB] = useState<[string, number][]>([]);
  const [resultsGG, setResultsGG] = useState<[string, number][]>([]);

  const getResults = () => {
    axios.get(`/api/results?timestamp=${new Date().getTime()}`, {}).then((data: AxiosResponse) => {
      if (data.status === 200) {
        setResultsGB(data.data.results.resultsGB);
        setResultsGG(data.data.results.resultsGG);
      }
    }).catch((e) => {
      console.log(e);
    })
  }

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Balón de oro OP10</title>
        <meta name="description" content="Votación para el Balón de oro OP10"/>
      </Head>
      <main className={styles.main}>
        <h1>Resultados <span>BALLON D&apos;OR</span> 2021</h1>
        <div className={styles.grid}>
          {resultsGB.map(([name, result]) => {
            const nominee = nomineesGB.find((n) => n.name === name);
            return (
              <button key={name} className={styles.nomineeCard}>
                <Image alt={name} className={"img"} width={250} height={300} src={nominee!.img}/>
                <h2>{name}</h2>
                <p>{Number(result)}</p>
              </button>
            )
          })}
        </div>
        <h1>Resultados <span>Guante de Oro</span> 2021</h1>
        <div className={styles.grid}>
          {resultsGG.map(([name, result]) => {
            const nominee = nomineesGG.find((n) => n.name === name);
            console.log({ nominee, nomenees: nomineesGG, name });
            return (
              <button key={name} className={styles.nomineeCard}>
                <Image alt={name} className={"img"} width={250} height={300} src={nominee!.img}/>
                <h2>{name}</h2>
                <p>{Number(result)}</p>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home
