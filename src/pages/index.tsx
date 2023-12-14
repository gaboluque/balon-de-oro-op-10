import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import redCard from '../resources/img/red-card.png';
import goal from '../resources/img/goal.png';
import { CategorySection } from "../components/categories/CategorySection";
import diego_fernandez_curri from '../resources/img/diego_fernandez_curi.jpg';
import mathias_alejandro_castillo_nunez from '../resources/img/mathias_alejandro_castillo_nunez.png';
import ronaldo_alberto_saldarriaga_luna from '../resources/img/ronaldo_alberto_saldarriaga_luna.jpg';
import lauren_sofia_calvete_molina from '../resources/img/lauren_sofia_calvete_molina.jpg';
import daniel_santiago_castillo_nunez from '../resources/img/daniel_santiago_castillo_nunez.jpg';
import anthony_hinestroza_moreno from '../resources/img/anthony_hinestroza_moreno.jpg';
import isabella_ruiz_jimenez from '../resources/img/isabella_ruiz_jimenez.jpg';
import mateo_montes_chibuque from '../resources/img/mateo_montes_chibuque.jpg';
import angel_samuel_martinez_zarate from '../resources/img/angel_samuel_martinez_zarate.jpg';
import joel_santiago_caamano_castro from '../resources/img/joel_santiago_caamano_castro.jpg';
import nicolas_herrera_doblado from '../resources/img/nicolas_herrera_doblado.jpg';
import nicolas_escobar_tamayo from '../resources/img/nicolas_escobar_tamayo.jpg';
import emmanuel_sanchez_pacanchique from '../resources/img/emmanuel_sanchez_pacanchique.jpg';
import luciano_castellanos_rivera from '../resources/img/luciano_castellanos_rivera.jpg';
import juan_andres_tobon_pinilla from '../resources/img/juan_andres_tobon_pinilla.jpg';
import matias_saldarriaga_rodriguez from '../resources/img/matias_saldarriaga_rodriguez.jpg';

export const nomineesGB = [
  {
    name: "Diego Fernández Curi (Pulguitas Sede Chía)",
    img: diego_fernandez_curri,
  },
  {
    name: "Mathias Alejandro Castillo Nuñez (Pulguitas Sede Bosa)",
    img: mathias_alejandro_castillo_nunez,
  },
  {
    name: "Ronaldo Alberto Saldarriaga Luna (Pelusas)",
    img: ronaldo_alberto_saldarriaga_luna,
  },
  {
    name: "Lauren Sofia Calvete Molina (2012-2013)",
    img: lauren_sofia_calvete_molina,
  },
  {
    name: "Daniel Santiago Castillo Nuñez (2011-2014 Sede Bosa)",
    img: daniel_santiago_castillo_nunez,
  },
  {
    name: "Anthony Hinestroza Moreno (2010-2011)",
    img: anthony_hinestroza_moreno,
  },
  {
    name: "Isabella Ruiz Jimenez (Femenino)",
    img: isabella_ruiz_jimenez,
  },
  {
    name: "Mateo Montes Chibuque (2009)",
    img: mateo_montes_chibuque,
  },
  {
    name: "Angel Samuel Martínez Zarate (2008)",
    img: angel_samuel_martinez_zarate,
  },
  {
    name: "Joel Santiago Caamaño Castro (2006-2010 Sede Bosa)",
    img: joel_santiago_caamano_castro,
  },
  {
    name: "Nicolás Herrera Doblado (2004-2006 Sede Chía)",
    img: nicolas_herrera_doblado,
  }
]

export const nomineesGG = [
  {
    name: "Nicolás Escobar Tamayo",
    img: nicolas_escobar_tamayo,
  },
  {
    name: "Emmanuel Sánchez Pacanchique",
    img: emmanuel_sanchez_pacanchique,
  },
  {
    name: "Luciano Castellanos Rivera",
    img: luciano_castellanos_rivera,
  },
  {
    name: "Juan Andrés Tobón Pinilla",
    img: juan_andres_tobon_pinilla,
  },
  {
    name: "Matías Saldarriaga Rodriguez",
    img: matias_saldarriaga_rodriguez,
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
          // setAlert({ type: "success", message: data.data.message });
        }
      }).catch((e) => {
        // setAlert({ type: "error", message: e.response.data.message });
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
