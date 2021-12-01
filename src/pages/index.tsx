import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
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
  const [document, setDocument] = useState<string>("");
  const [alert, setAlert] = useState<{ type: string, message: string } | undefined>(undefined);
  const [nominees, setNominees] = useState<Record<string, string | undefined>>({ gb: undefined, gg: undefined });
  const [loading, setLoading] = useState<boolean>(false);

  const vote = () => {
    if (!nominees.gg || !nominees.gb) {
      setAlert({ type: "error", message: "Debes votar tanto para Balón de oro como para Guante de oro!" });
    } else {
      setLoading(true);
      axios.post("/api/vote", { document, nominees }).then((data: AxiosResponse) => {
        if (data.status === 200) {
          setAlert({ type: "success", message: data.data.message });
        }
      }).catch((e) => {
        setAlert({ type: "error", message: e.response.data.message });
      }).finally(() => {
        setLoading(false);
      })
    }
  };

  const setGBNominee = (nominee: string) => () => {
    setNominees({ ...nominees, gb: nominee });
  };

  const setGGNominee = (nominee: string) => () => {
    setNominees({ ...nominees, gg: nominee });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Balón de oro OP10</title>
        <meta name="description" content="Votación para el Balón de oro OP10" />
      </Head>
      <main className={styles.main}>
        <h1>OP10 <span>BALLON D&apos;OR</span> 2021</h1>
        <div className={styles.inputContainer}>
          <p className={styles.instructions}>Para votar, ingresa tu documento y toca la foto de los nominados</p>
          <input placeholder="No. de documento"
            id="documentNumber"
            value={document}
            type={"text"}
            onChange={({ target: { value } }) => setDocument(value)}
            className={styles.input}
          />
        </div>
        <h2>Nominados al Balón de Oro</h2>
        <div className={styles.grid}>
          {nomineesGB.map(({ name, img }) => (
            <button key={name} className={`${styles.nomineeCard} ${nominees.gb === name ? styles.nomineeCardActive : undefined}`} onClick={setGBNominee(name)}>
              <Image alt={name} className={"img"} width={250} height={300} src={img} />
              <h2>{name}</h2>
            </button>
          ))}
        </div>
        <h2>Nominados al Guante de Oro</h2>
        <div className={styles.grid}>
          {nomineesGG.map(({ name, img }) => (
            <button key={name} className={`${styles.nomineeCard} ${nominees.gg === name ? styles.nomineeCardActive : undefined}`} onClick={setGGNominee(name)}>
              <Image alt={name} className={"img"} width={250} height={300} src={img} />
              <h2>{name}</h2>
            </button>
          ))}
        </div>
        {alert && (
          <div className={styles.alertContainer}>
            <div className={styles.alertMessage}>
              <p className={styles.message}>{alert.message}</p>
              <button className={styles.closeBtn} onClick={() => setAlert(undefined)}>X</button>
            </div>
          </div>
        )}
        <button className={styles.primaryButton} onClick={vote}>{loading ? "Votando..." : "Votar"}</button>
      </main>
    </div>
  )
}

export default Home
