import {docList} from "../../resources/docList";

const initialResultsGB = {
  "Joel Merino (Pulguitas)": 0,
  "Jacobo Velasco (2014-2015)": 0,
  "Pedro Huertas (2009-2010)": 0,
  "Lauren Calvete (2011-2013)": 0,
  "Samuel Quijano (2008)": 0,
  "Juan Pablo Suesca (2006-2007)": 0
}

const initialResultsGG = {
  "Juan Pablo Castro": 0,
  "Nathan Villegas": 0
}

export class Votes {
  private votes: Record<string, string> = {};

  private resultsGB: Record<string, number> = { ...initialResultsGB };
  private resultsGG: Record<string, number> = { ...initialResultsGG };

  private static _instance: Votes;

  public static get instance() {
    if(!Votes._instance) Votes._instance = new Votes();

    return Votes._instance;
  }

  public addVote(document: string, nominees: {gg: string, gb: string}) {
    let status =  200;
    let message = "Gracias por votar! Disfruta el evento, ya puedes cerrar esta página";

    if(docList.includes(document) && !this.votes[document]) {
      this.votes[document] = `${nominees.gb} + ${nominees.gg}`;
      this.resultsGB[nominees.gb] += 1;
      this.resultsGG[nominees.gg] += 1;
    } else {
      status = 400;
      message = "Sólo puede votar una vez cada jugador!"
    }

    return {status, message}
  }

  public getResults() {
    return { gb: this.resultsGB, gg: this.resultsGG };
  }

  public resetResults() {
    this.votes = {};
    this.resultsGB = { ...initialResultsGB };
    this.resultsGG = { ...initialResultsGG };
    return true;
  }
}