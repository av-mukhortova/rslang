import { iWord } from "../../types/index";
import Api from "../api";
import ItemPage from "./itemPage";
import PaginationItem from "./paginationItem";
import ChechActiv from "./chechActiv";
import CheckWordsOnload from "./checkWordsOnload";
import GameLink from "./gameLink";
import "../../assets/styles/bookStyle/pages.css";

const gameLinkarr = ["qqqqq", "wwwww"];
const gameNamearr = ["Аудиовызов", "Спринт"];
const authorizedCheck = false;

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

  create(chapters: HTMLElement, data: iWord[], group: string): void {
    const paginationItem = new PaginationItem(group, this.page);
    const chechActiv = new ChechActiv();
    const checkWordsOnload = new CheckWordsOnload();
    const gameLink = new GameLink();

    chapters.innerHTML = "";
    const containerWords = document.createElement("div") as HTMLDivElement;
    const prevBtn = document.createElement("button") as HTMLButtonElement;
    const nextBtn = document.createElement("button") as HTMLButtonElement;
    const words = document.createElement("div") as HTMLDivElement;
    const pageNumber = document.createElement("div") as HTMLDivElement;
    const pagination = document.createElement("div") as HTMLDivElement;

    containerWords.setAttribute("class", `container-words`);
    pagination.setAttribute("class", `pagination`);
    words.setAttribute("class", `words group__${group}`);
    pageNumber.setAttribute("class", "pageNumber");
    prevBtn.setAttribute("id", "prev-btn");
    nextBtn.setAttribute("id", "next-btn");

    pageNumber.textContent = `${this.page + 1}`;
    const itemPage = new ItemPage();
    data.forEach((el): void => {
      words.innerHTML += itemPage.create(el);
    });

    for (let i = 0; i <= 29; i++) {
      pagination.innerHTML += paginationItem.create(i + 1);
    }

    const gameBlock = document.createElement("div");
    if (authorizedCheck) {
      gameBlock.setAttribute("class", "game-block");
      gameLinkarr.forEach((el: string, id: number) => {
        gameBlock.innerHTML += gameLink.creat(
          el,
          gameNamearr[id],
          +group,
          this.page
        );
      });
    }

    prevBtn.innerHTML = "<";
    nextBtn.innerHTML = ">";

    containerWords.append(prevBtn);
    containerWords.append(nextBtn);
    containerWords.append(words);
    containerWords.append(pageNumber);
    containerWords.append(pagination);
    containerWords.append(gameBlock);
    chapters.append(containerWords);

    const wordsNode = document.querySelector(".words") as HTMLElement;
    checkWordsOnload.check(wordsNode, pagination, this.page, group);

    prevBtn.addEventListener("click", (): void => {
      if (this.page > 0) {
        this.page -= 1;
        this.getWordData(chapters, group);
      }
    });
    nextBtn.addEventListener("click", (): void => {
      if (this.page < 29) {
        this.page += 1;
        this.getWordData(chapters, group);
      }
    });

    pagination.addEventListener("click", (e: Event): void => {
      const idButton = (e.target as HTMLElement).closest(
        "button"
      ) as HTMLElement;
      if (!idButton?.getAttribute("id")) return;
      const page = idButton?.getAttribute("id")?.split("-")[1];
      if (!page) return;
      this.page = +page - 1;
      this.getWordData(chapters, group);
    });

    const containerWordsClass = document.querySelector(
      ".container-words"
    ) as HTMLElement;
    containerWordsClass.addEventListener("click", (e: Event): void => {
      chechActiv.check(e, this.page, group, wordsNode, pagination);
    });

    this.check();
  }

  check(): void {
    // const authorizedCheck = true;
    const authorizedBlock: NodeListOf<HTMLElement> = document.querySelectorAll(
      ".item-page__authorized"
    );
    if (authorizedCheck) {
      authorizedBlock.forEach((el): void => {
        el.style.display = "block";
      });
    } else {
      authorizedBlock.forEach((el): void => {
        el.style.display = "none";
      });
    }
  }
}

export default Pages;
