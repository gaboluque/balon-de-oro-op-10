import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios, {AxiosResponse} from "axios";
import {useState} from "react";
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
  const [document, setDocument] = useState<string>("");
  const [alert, setAlert] = useState<{ type: string, message: string } | undefined>(undefined);

  const vote = (nominee: string) => () => {
    axios.post("/api/vote", {document, nominee}).then((data: AxiosResponse) => {
      console.log(data);
      if (data.status === 201) {
        setAlert({type: "success", message: data.data.message});
      }
    }).catch((e) => {
      setAlert({type: "error", message: e.response.data.message});
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Balón de oro OP10</title>
        <meta name="description" content="Votación para el Balón de oro OP10"/>
      </Head>
      <main className={styles.main}>
        <h1>OP10 <span>BALLON D&apos;OR</span> 2021</h1>
        <p className={styles.instructions}>Para votar, ingresa tu documento y toca la foto del nominado</p>
        <input placeholder="No. de documento"
               id="documentNumber"
               value={document}
               type={"text"}
               onChange={({target: {value}}) => setDocument(value)}
               className={styles.input}
        />
        <div className={styles.grid}>
          {nominees.map(({name, img}) => (
            <button key={name} className={styles.nomineeCard} onClick={vote(name)}>
              <Image alt={name} className={"img"} width={250} height={300} src={img}/>
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
      </main>
    </div>
  )
}

export default Home
