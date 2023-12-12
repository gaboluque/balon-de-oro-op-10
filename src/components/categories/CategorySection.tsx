import React from "react";
import styles from "../../styles/Home.module.css";

type CategorySectionProps = {
  title: string,
  nomenees: {
    name: string,
    img: any
  }[],
  selectedNominee: string | undefined,
  handleVoting: (name: string) => void
}

export const CategorySection: React.FC<CategorySectionProps> = ({
                                                                  title,
                                                                  nomenees,
                                                                  selectedNominee,
                                                                  handleVoting
                                                                }) => {

  return (
    <>
      <h2>{title}</h2>
      <div className={styles.grid}>
        {nomenees.map(({ name, img }) => (
          <button key={name}
                  className={`${styles.nomineeCard} ${selectedNominee === name ? styles.nomineeCardActive : undefined}`}
                  onClick={() => handleVoting(name)}>
            <img alt={name} className={"img"} width={250} height={300} src={img}/>
            <h2>{name}</h2>
          </button>
        ))}
      </div>
    </>
  )
}