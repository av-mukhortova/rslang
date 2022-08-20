import { iWord } from "../../types/index";
import Api from "../api";
import ItemPage from "./itemPage";
import "../../assets/styles/bookStyle/pages.css";

class Pages {
  page: number;

  constructor() {
    this.page = 0;
  }

  getWordData(chapters: HTMLElement, group: string) {
    const api = new Api();
    const words = api.getWords(group, `${this.page}`);
    words.then((data: iWord[]) => this.create(chapters, data, group));
  }

  create(chapters: HTMLElement, data: iWord[], group: string) {
    chapters.innerHTML = "";
    const containerWords = document.createElement("div") as HTMLDivElement;
    const prevBtn = document.createElement("button") as HTMLButtonElement;
    const nextBtn = document.createElement("button") as HTMLButtonElement;
    const words = document.createElement("div") as HTMLDivElement;
    const pageNumber = document.createElement("div") as HTMLDivElement;
    containerWords.setAttribute("class", `container-words`);
    words.setAttribute("class", `words group__${group}`);
    pageNumber.setAttribute("class", "pageNumber");
    prevBtn.setAttribute("id", "prev-btn");
    nextBtn.setAttribute("id", "next-btn");
    pageNumber.textContent = `${this.page + 1}`;
    const itemPage = new ItemPage();
    data.forEach((el) => {
      words.innerHTML += itemPage.create(el);
    });
    prevBtn.innerHTML = "<";
    nextBtn.innerHTML = ">";
    containerWords.append(prevBtn);
    containerWords.append(nextBtn);
    containerWords.append(words);
    containerWords.append(pageNumber);
    chapters.append(containerWords);

    prevBtn.addEventListener("click", () => {
      if (this.page > 0) {
        this.page -= 1;
        this.getWordData(chapters, group);
      }
    });
    nextBtn.addEventListener("click", () => {
      if (this.page < 29) {
        this.page += 1;
        this.getWordData(chapters, group);
      }
    });
  }
}

export default Pages;
