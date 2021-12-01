import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import joelMerino from '../resources/img/joelMerino.jpeg';
import jacoboVelasco from '../resources/img/jacoboVelasco.jpeg';
import pedroHuertas from '../resources/img/pedroHuertas.jpeg';
import laurenCalvete from '../resources/img/laurenCalvete.jpeg';
import juanPabloSuesca from '../resources/img/juanPabloSuesca.jpeg';
import samuelQuijano from '../resources/img/samuelQuijano.jpeg';

const nominees = [
  {
    name: "Joel Merino (Pulguitas)",
    img: joelMerino,
  },
  {
    name: "Jacobo Velasco (2014-2015)",
    img: jacoboVelasco,
  },
  {
    name: "Pedro Huertas (2009-2010)",
    img: pedroHuertas,
  },
  {
    name: "Lauren Calvete (2011-2013)",
    img: laurenCalvete,
  },
  {
    name: "Samuel Quijano (2008)",
    img: samuelQuijano,
  },
  {
    name: "Juan Pablo Suesca (2006-2007)",
    img: juanPabloSuesca,
  }
]

const Home: NextPage = () => {
  const [results, setResults] = useState<any>(nominees.reduce((res, {name}) => ({...res, [name]: 0}), {}));

  const getResults = () => {
    axios.get(`/api/results?timestamp=${new Date().getTime()}`, {}).then((data: AxiosResponse) => {
      if (data.status === 200) setResults(data.data.results)
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
          {Object.entries(results).map(([name, result]: [string, unknown]) => {
            const nominee = nominees.find((n) => n.name === name);

            if(nominee) {
              return (
                  <button key={name} className={styles.nomineeCard}>
                    <Image alt={name} className={"img"} width={250} height={300} src={nominee.img}/>
                    <h2>{name}</h2>
                    <p>{Number(result)}</p>
                  </button>
              )
            }
          })}
        </div>
      </main>
    </div>
  )
}

export default Home
