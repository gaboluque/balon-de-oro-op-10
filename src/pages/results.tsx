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
import juanPabloCastro from '../resources/img/juanPabloCastro.jpeg';
import nathanVillegas from '../resources/img/nathanVillegas.jpeg';

const nomineesGB = [
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

const nomineesGG = [
  {
    name: "Juan Pablo Castro",
    img: juanPabloCastro,
  },
  {
    name: "Nathan Villegas",
    img: nathanVillegas,
  }
]

const Home: NextPage = () => {
  const [resultsGB, setResultsGB] = useState<any>(nomineesGB.reduce((res, {name}) => ({...res, [name]: 0}), {}));
  const [resultsGG, setResultsGG] = useState<any>(nomineesGG.reduce((res, {name}) => ({...res, [name]: 0}), {}));

  const getResults = () => {
    axios.get(`/api/results?timestamp=${new Date().getTime()}`, {}).then((data: AxiosResponse) => {
      if (data.status === 200){
        setResultsGB(data.data.results.gb);
        setResultsGG(data.data.results.gg);
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
        <title>Bal??n de oro OP10</title>
        <meta name="description" content="Votaci??n para el Bal??n de oro OP10"/>
      </Head>
      <main className={styles.main}>
        <h1>Resultados <span>BALLON D&apos;OR</span> 2021</h1>
        <div className={styles.grid}>
          {Object.entries(resultsGB).map(([name, result]: [string, unknown]) => {
            const nominee = nomineesGB.find((n) => n.name === name);

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
        <h1>Resultados <span>Guante de Oro</span> 2021</h1>
        <div className={styles.grid}>
          {Object.entries(resultsGG).map(([name, result]: [string, unknown]) => {
            const nominee = nomineesGG.find((n) => n.name === name);

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
