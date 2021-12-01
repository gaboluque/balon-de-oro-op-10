import {docList} from "../../resources/docList";

const initialResults = {
  "Joel Merino (Pulguitas)": 0,
  "Jacobo Velasco (2014-2015)": 0,
  "Pedro Huertas (2009-2010)": 0,
  "Lauren Calvete (2011-2013)": 0,
  "Samuel Quijano (2008)": 0,
  "Juan Pablo Suesca (2006-2007)": 0
}

export class Votes {
  private votes: Record<string, string> = {};

  private results: Record<string, number> = initialResults;

  private static _instance: Votes;

  public static get instance() {
    if(!Votes._instance) Votes._instance = new Votes();

    return Votes._instance;
  }

  public addVote(document: string, nominee: string) {
    let status =  200;
    let message = "Gracias por votar! Disfruta el evento, ya puedes cerrar esta página";

    if(docList.includes(document) && !this.votes[document]) {
      this.votes[document] = nominee;
      this.results[nominee] += 1;
    } else {
      status = 400;
      message = "Sólo puede votar una vez cada jugador!"
    }

    return {status, message}
  }

  public getResults() {
    return this.results;
  }

  public resetResults() {
    this.votes = {};
    this.results = initialResults;
    return true
  }
}