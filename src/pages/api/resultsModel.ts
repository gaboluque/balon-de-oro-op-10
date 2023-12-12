import { getResults, resetResults, setResults } from "../../../helpers/results-repo";

export class Votes {
  private resultsGB: Record<string, number> = {};
  private resultsGG: Record<string, number> = {};

  private static _instance: Votes;

  public static get instance() {
    if (!Votes._instance) Votes._instance = new Votes();

    return Votes._instance;
  }

  public addVote(vote: string[]) {
    this.downloadResults();

    const gbVote = vote[0];
    const ggVote = vote[1];

    this.resultsGB[gbVote] = this.resultsGB[gbVote] ? this.resultsGB[gbVote] + 1 : 1;
    this.resultsGG[ggVote] = this.resultsGG[ggVote] ? this.resultsGG[ggVote] + 1 : 1;


    this.uploadResults();

    return { status: 200, message: "Gracias por votar! Disfruta el evento" };
  }

  public getResults() {
    this.downloadResults();

    const sortedGb = Object.entries(this.resultsGB).sort((a, b) => b[1] - a[1]);
    const sortedGg = Object.entries(this.resultsGG).sort((a, b) => b[1] - a[1]);

    return {
      resultsGB: sortedGb,
      resultsGG: sortedGg
    };
  }

  public resetResults() {
    resetResults();
  }

  private downloadResults() {
    const results = getResults();
    const { gb, gg } = results;

    this.resultsGB = gb;
    this.resultsGG = gg;
  }

  private uploadResults() {
    setResults({
      gb: this.resultsGB,
      gg: this.resultsGG
    });
  }
}