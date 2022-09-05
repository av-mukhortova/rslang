import { justObject } from "../../types/index";
import Api from "../api";
import UserWords from "../userWords";
import GameLink from "./gameLink";
import { AudioCall } from "../audiocall";
import Sprint from "../sprint";

const games = [
  {
    link: "qqqqqqq",
    name: "Аудиовызов",
    img: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    id: "book-audiocall-btn",
  },
  {
    link: "wwwww",
    name: "Спринт",
    img: "https://images.unsplash.com/photo-1608496601160-f86d19a44f9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1561&q=80",
    id: "book-sprint-btn",
  },
];

class CheckWordsOnload {
  api: Api;
  learnedWords: justObject;
  difficultWords: justObject;
  userWords: UserWords;
  countLearned: number;
  countDifficult: number;
  game: boolean;
  sprint: Sprint;
  audiocall: AudioCall;

  constructor() {
    this.api = new Api();
    this.learnedWords = {};
    this.userWords = new UserWords();
    this.countDifficult = 0;
    this.countLearned = 0;
    this.difficultWords = {};
    this.game = true;
    this.sprint = new Sprint();
    this.audiocall = new AudioCall();
  }
  async check(
    wordsNode: HTMLElement,
    pagination: HTMLElement,
    pageNumber: number,
    group: string
  ) {
    console.log("++++++", pagination);
    console.log(pageNumber);
    console.log(group);

    const gameLink = new GameLink();

    const isAuth = localStorage.getItem("userId");
    if (isAuth) {
      this.learnedWords = await this.userWords.getUserWords();
      this.difficultWords = await this.userWords.getDifficultWords();
    }
    for (let i = 0; i < wordsNode.childNodes.length; i++) {
      const child = wordsNode.childNodes[i] as HTMLElement;
      if (child.nodeName !== "#text") {
        const id = child.getAttribute("id");
        if (!id) return;
        if (this.learnedWords[id] === "isLearned") {
          this.countLearned += 1; // считаем количество изученных слов на странице
          // добавила стиль на карточку
          this.addCardStyle(child, "learned");
        }
        if (this.difficultWords[id] === "isDifficult") {
          this.countDifficult += 1; // считаем количество сложных слов на странице
          //добавила стиль на карточку
          this.addCardStyle(child, "difficult");
        }
      }
    }
    if (this.countDifficult >= 20) {
      // все слова на странице сложные
      this.addPageStyle(wordsNode, pagination, "pageDifficults", pageNumber);
    }
    if (this.countLearned >= 20) {
      // все слова на странице изучены
      this.game = false;
      this.addPageStyle(wordsNode, pagination, "pageStudes", pageNumber);
    }
    const gameBlock = document.createElement("div") as HTMLElement;
    gameBlock.setAttribute("class", "game-block");
    gameBlock.innerHTML = "";
    games.forEach((el) => {
      gameBlock.innerHTML += gameLink.creat(this.game, el.name, el.img, el.id);
    });
    wordsNode.append(gameBlock);

    const sprintBtn = document.querySelector("#book-sprint-btn");
    if (sprintBtn) {
      sprintBtn.addEventListener("click", (): void => {
        location.hash = "booksprint";
        this.sprint.startFromBook(group, pageNumber);
      });
    }

    const audiocallBtn = document.querySelector("#book-audiocall-btn");
    audiocallBtn?.addEventListener("click", (): void => {
      this.audiocall.startFromBook(Number(group), pageNumber);
    });
  }

  addPageStyle(
    wordsNode: HTMLElement,
    pagination: HTMLElement,
    namePage: string,
    pageNumber: number
  ) {
    if (namePage === "pageStudes" || namePage === "studi") {
      wordsNode.style.border = "6px solid #43DE1C";
      wordsNode.style.padding = "100px 0";
      this.addPaginationStyle(pagination, pageNumber, namePage);
    }

    if (namePage === "pageDifficults" || namePage === "cardDifficults") {
      wordsNode.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
      wordsNode.style.padding = "100px 0";
      this.addPaginationStyle(pagination, pageNumber, namePage);
    }
  }

  removePageStyle(
    wordsNode: HTMLElement,
    pagination: HTMLElement,
    namePage: string,
    pageNumber: number
  ) {
    if (namePage === "pageStudes" || namePage === "studi") {
      wordsNode.style.border = "";
      this.removePaginationStyle(pagination, pageNumber, namePage);
    }

    if (namePage === "pageDifficults" || namePage === "cardDifficults") {
      wordsNode.style.boxShadow = "";
      this.removePaginationStyle(pagination, pageNumber, namePage);
    }
  }

  removePaginationStyle(
    pagination: HTMLElement,
    pageNumber: number,
    namePage: string
  ) {
    for (let i = 0; i < pagination.childNodes.length; i++) {
      const pagin_el = pagination.childNodes[i] as HTMLElement;
      if (pagin_el.nodeName !== "#text") {
        const pagin_elNum = pagin_el.getAttribute("id")?.split("-")[1];
        if (pagin_elNum === String(pageNumber)) {
          if (namePage === "pageDifficults" || namePage === "cardDifficults") {
            pagin_el.style.boxShadow = "";
          }
          if (namePage === "pageStudes" || namePage === "studi") {
            pagin_el.style.border = "";
          }
        }
      }
    }
  }

  addPaginationStyle(
    pagination: HTMLElement,
    pageNumber: number,
    namePage: string
  ) {
    for (let i = 0; i < pagination.childNodes.length; i++) {
      const pagin_el = pagination.childNodes[i] as HTMLElement;
      if (pagin_el.nodeName !== "#text") {
        const pagin_elNum = pagin_el.getAttribute("id")?.split("-")[1];
        if (pagin_elNum === String(pageNumber)) {
          if (namePage === "pageDifficults" || namePage === "cardDifficults") {
            pagin_el.style.boxShadow = "inset 0px 0px 3px 3px #F06C5D";
          }
          if (namePage === "pageStudes" || namePage === "studi") {
            pagin_el.style.border = "3px solid #43DE1C";
          }
        }
      }
    }
  }
  addCardStyle(child: HTMLElement, namePage: string) {
    if (namePage === "difficult") {
      (child.childNodes[5].childNodes[3] as HTMLElement).style.display = "none";
      (child.childNodes[5].childNodes[5] as HTMLElement).style.display =
        "block";
      child.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
    }
    if (namePage === "learned") {
      (child.childNodes[5].childNodes[1] as HTMLElement).classList.toggle(
        "activ"
      );
      child.style.border = "6px solid #43DE1C";
    }
  }
}

export default CheckWordsOnload;
