import Api from "./api";

export default class Sprint {
  api: Api;

  constructor() {
    this.api = new Api();
  }
  public start(): void {
    this.getWords("0", "0");
  }
  private getWords(group: string, page: string): void {
    this.api.getWords(group, page).then((res) => console.log(res));
  }
}
