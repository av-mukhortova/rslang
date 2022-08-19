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
    words.then((data: iWord[]) => this.create(chapters, data));
  }

  create(chapters: HTMLElement, data: iWord[]) {
    chapters.innerHTML = "";
    const prevBtn = document.createElement("button") as HTMLButtonElement;
    const nextBtn = document.createElement("button") as HTMLButtonElement;
    const words = document.createElement("div") as HTMLDivElement;
    const pageNumber = document.createElement("div") as HTMLDivElement;
    words.setAttribute("class", "words");
    pageNumber.setAttribute("class", "pageNumber");
    prevBtn.setAttribute("id", "prev-btn");
    nextBtn.setAttribute("id", "next-btn");
    const itemPage = new ItemPage();
    data.forEach((el) => {
      words.innerHTML += itemPage.create(el);
    });
    chapters.append(prevBtn);
    chapters.append(nextBtn);
    chapters.append(words);
    chapters.append(pageNumber);
  }
}

export default Pages;
