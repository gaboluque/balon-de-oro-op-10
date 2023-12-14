import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { nomineesGB, nomineesGG } from "./index";


const winnerGB: [string, number][] = [["Lauren Sofia Calvete Molina (2012-2013)", 121]]
const resultsGB: [string, number][] = [
  [
    "Diego Fernández Curi (Pulguitas Sede Chía)",
    0
  ],
  [
    "Mathias Alejandro Castillo Nuñez (Pulguitas Sede Bosa)",
    0
  ],
  [
    "Ronaldo Alberto Saldarriaga Luna (Pelusas)",
    100
  ],
  [
    "Lauren Sofia Calvete Molina (2012-2013)",
    125
  ],
  [
    "Daniel Santiago Castillo Nuñez (2011-2014 Sede Bosa)",
    8
  ],
  [
    "Anthony Hinestroza Moreno (2010-2011)",
    17
  ],
  [
    "Isabella Ruiz Jimenez (Femenino)",
    0
  ],
  [
    "Mateo Montes Chibuque (2009)",
    0
  ],
  [
    "Angel Samuel Martínez Zarate (2008)",
    17
  ],
  [
    "Joel Santiago Caamaño Castro (2006-2010 Sede Bosa)",
    33
  ],
  [
    "Nicolás Herrera Doblado (2004-2006 Sede Chía)",
    0
  ]
]

const winnerGG: [string, number][] = [["Nicolás Escobar Tamayo", 102]]
const resultsGG: [string, number][] = [
  [
    "Nicolás Escobar Tamayo",
    158
  ],
  [
    "Emmanuel Sánchez Pacanchique",
    63
  ],
  [
    "Luciano Castellanos Rivera",
    47
  ],
  [
    "Juan Andrés Tobón Pinilla",
    16
  ],
  [
    "Matías Saldarriaga Rodriguez",
    16
  ]
]


const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Balón de oro OP10</title>
        <meta name="description" content="Votación para el Balón de oro OP10"/>
      </Head>
      <main className={styles.main}>
        <h1>Resultados <span>BALLON D&apos;OR</span> 2021</h1>
        <div className={styles.grid}>
          {winnerGB.map(([name, result]) => {
            const nominee = nomineesGB[0]
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
          {winnerGG.map(([name, result]) => {
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
