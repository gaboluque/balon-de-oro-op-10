import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import redCard from '../resources/img/red-card.png';
import goal from '../resources/img/goal.png';
import { CategorySection } from "../components/categories/CategorySection";


export const nomineesGB = [
  {
    name: "Diego Fernández Curi (Pulguitas Sede Chía)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Mathias Alejandro Castillo Nuñez (Pulguitas Sede Bosa)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Ronaldo Alberto Saldarriaga Luna (Pelusas)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Lauren Sofia Calvete Molina (2012-2013)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Daniel Santiago Castillo Nuñez (2011-2014 Sede Bosa)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Anthony Hinestroza Moreno (2010-2011)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Isabella Ruiz Jimenez (Femenino)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Mateo Montes Chibuque (2009)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Angel Samuel Martínez Zarate (2008)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Joel Santiago Caamaño Castro (2006-2010 Sede Bosa)",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Nicolás Herrera Doblado (2004-2006 Sede Chía)",
    img: "https://placebeard.it/g/640/480",
  }
]

export const nomineesGG = [
  {
    name: "Nicolás Escobar Tamayo",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Emmanuel Sánchez Pacanchique",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Luciano Castellanos Rivera",
    img: "https://placebeard.it/g/640/480",
  },
  {
    name: "Juan Andrés Tobón Pinilla",
    img: "https://placebeard.it/g/640/480",
  }
]

export const categories = [
  {
    id: 0,
    title: "Nominados al Balón de Oro",
    nominees: nomineesGB,
  },
  {
    id: 1,
    title: "Nominados al Guante de Oro",
    nominees: nomineesGG,
  }
]

const getInitialSelectedNominees = () => {
  const initialSelectedNominees: (string | undefined)[] = [];
  categories.forEach(({ id }) => {
    initialSelectedNominees[id] = undefined;
  });
  return initialSelectedNominees;
}

const Home: NextPage = () => {
  const [alert, setAlert] = useState<{ type: string, message: string } | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [votingStatus, setVotingStatus] = useState(getInitialSelectedNominees());

  const handleVoting = (categoryId: number, name: string) => {
    const newVotingResult = [...votingStatus];
    newVotingResult[categoryId] = name;

    setVotingStatus(newVotingResult);
  }


  const vote = () => {
    if (votingStatus.some((cat) => !cat)) {
      setAlert({ type: "error", message: "Debes votar por todas las categoría!" });
    } else {
      setLoading(true);
      axios.post("/api/vote", { vote: votingStatus }).then((data: AxiosResponse) => {
        if (data.status === 200) {
          setAlert({ type: "success", message: data.data.message });
        }
      }).catch((e) => {
        setAlert({ type: "error", message: e.response.data.message });
      }).finally(() => {
        setLoading(false);
        setVotingStatus(getInitialSelectedNominees());
      })
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Balón de oro OP10</title>
        <meta name="description" content="Votación para el Balón de oro OP10"/>
      </Head>
      <main className={styles.main}>
        <h1>OP10 <span>BALLON D&apos;OR</span> 2023</h1>
        {
          categories.map(({ id, title, nominees }) => (
            <CategorySection key={id} title={title}
                             nomenees={nominees}
                             handleVoting={(name: string) => handleVoting(id, name)}
                             selectedNominee={votingStatus[id]}
            />
          ))
        }
        {alert && (
          <div className={styles.alertContainer}>
            <div className={styles.alertMessage}>
              <Image width={100} height={100} src={alert.type === "error" ? redCard : goal} alt="alertImg"/>
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
