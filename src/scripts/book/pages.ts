import { iWord } from "../../types/index";
import Api from "../api";
import ItemPage from "./itemPage";

class Pages {
  page: number;

  constructor() {
    this.page = 0;
  }

  getWordData(chapters: HTMLElement, group: string) {
    const api = new Api();
    const words = api.getWords(group, `${this.page}`);
    this.create(chapters, words);
  }

  create(chapters: HTMLElement, words: Promise<iWord[]>) {
    chapters.innerHTML = "";
    const prevBtn = document.createElement("button") as HTMLButtonElement;
    const nextBtn = document.createElement("button") as HTMLButtonElement;
    const word = document.createElement("div") as HTMLDivElement;
    const pageNumber = document.createElement("div") as HTMLDivElement;
    word.setAttribute("class", "words");
    pageNumber.setAttribute("class", "pageNumber");
    prevBtn.setAttribute("id", "prevBtn");
    nextBtn.setAttribute("id", "nextBtn");
    const itemPage = new ItemPage();
    itemPage.create(words);
  }
}

export default Pages;
