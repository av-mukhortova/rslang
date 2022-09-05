import Pages from "./pages";
import Api from "../api";
import { justObject } from "../../types/index";
import UserWords from "../userWords";
import "../../assets/styles/bookStyle/chapter.css";

// interface Key {
//   key: string[];
// }
const stylesChapter = localStorage.getItem("thisStylesChap");
let stylesChap: number[] = [];
if (stylesChapter) {
  stylesChap = JSON.parse(stylesChapter);
}

class Chapter {
  learnedWords: justObject;
  difficultWords: justObject;
  countStudi: number;
  countDifficalt: number;
  authorization: boolean;
  api: Api;
  userWords: UserWords;
  stylesChap: number[];
  countChspters: number;

  constructor() {
    this.learnedWords = {};
    this.difficultWords = {};
    this.countStudi = 0;
    this.countDifficalt = 0;
    this.authorization = localStorage.getItem("userId") ? true : false;
    this.api = new Api();
    this.userWords = new UserWords();
    this.stylesChap = [];
    this.countChspters = 0;
  }

  async getDataHardLearn() {
    const isAuth = localStorage.getItem("userId");
    if (isAuth) {
      this.learnedWords = await this.userWords.getUserWords();
      this.difficultWords = await this.userWords.getDifficultWords();
      localStorage.setItem("learnedWords", JSON.stringify(this.learnedWords));
      localStorage.setItem(
        "difficultWords",
        JSON.stringify(this.difficultWords)
      );
      // console.log(this.learnedWords, this.difficultWords);
      this.count(this.countChspters);
    }
  }

  public create() {
    this.draw();
  }
  public draw() {
    // console.log("///////////////////");
    const book: HTMLDivElement | null = document.querySelector(".bookPage");
    book?.classList.remove("hidden");
    const main: HTMLDivElement | null = document.querySelector(".mainPage");
    main?.classList.add("hidden");

    const chap = document.querySelector(".chapters") as HTMLElement;
    if (chap) {
      const bod = chap?.parentNode;
      bod?.removeChild(chap);
    }
    const chapters = document.createElement("section");
    chapters.setAttribute("class", "chapters");
    for (let i = 0; i < stylesChap.length + 1; i += 1) {
      const chapter = document.createElement("div");
      chapter.setAttribute("id", `chapter-${i}`);
      const heightBook = window.innerHeight;

      if (stylesChap[i] === 12) {
        chapter.setAttribute("class", `chapter `);
        chapter.style.height = `${heightBook}px`;
        chapter.style.border = "6px solid #43DE1C";
        chapter.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
      } else if (stylesChap[i] === 1) {
        // console.log(typeof stylesChap[i], stylesChap[i]);
        chapter.setAttribute("class", `chapter`);
        chapter.style.border = "6px solid #43DE1C";
        chapter.style.height = `${heightBook}px`;
        chapter.style.boxShadow = "";
      } else if (stylesChap[i] === 2) {
        chapter.setAttribute("class", `chapter`);
        chapter.style.height = `${heightBook}px`;
        chapter.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
        chapter.style.border = "";
      } else {
        chapter.setAttribute("class", `chapter`);
        chapter.style.height = `${heightBook}px`;
        chapter.style.border = "";
        chapter.style.boxShadow = "";
      }

      const number = document.createElement("p");
      if (i === 6) {
        if (!this.authorization) {
          chapter.style.display = "none";
        }
        number.textContent = `Difficult`;
      } else {
        number.textContent = `chapter ${i + 1}`;
      }
      chapter.append(number);
      chapters.append(chapter);
    }

    book?.append(chapters);
    chapters.addEventListener("click", (e: Event): void => {
      const target = e.target as HTMLElement;
      if (
        target.id !== "book-audiocall-btn" &&
        target.id !== "book-sprint-btn"
      ) {
        const idChapter = (e.target as HTMLElement).closest(
          "div"
        ) as HTMLElement;
        if (!idChapter?.getAttribute("id")) return;
        const group = idChapter?.getAttribute("id")?.split("-")[1];
        book?.setAttribute("class", `bookPage`);
        const pages = new Pages();
        if (!group) return;
        pages.getWordData(chapters, group);
      }
    });
  }

  async count(shapterNum: number) {
    if (this.countChspters <= 5) {
      await this.api.getWordsGroup(`${shapterNum}`).then((words600) => {
        words600.forEach((block, id) => {
          for (const key in this.learnedWords) {
            if (block.id === key) {
              if (this.learnedWords[key] === "isLearned") {
                this.countStudi += 1;
              }
            }
          }
          for (const key in this.difficultWords) {
            if (block.id === key) {
              this.countDifficalt += 1;
            }
          }
          if (id === 599) {
            if (this.countDifficalt == 600 && this.countStudi == 600) {
              this.countStudi = 0;
              this.countDifficalt = 0;
              this.stylesChap.push(12);
              // console.log("=================================", this.stylesChap);
            } else if (this.countDifficalt == 600) {
              this.countStudi = 0;
              this.countDifficalt = 0;
              this.stylesChap.push(2);
              // console.log("======countDifficalt=========", this.stylesChap);
            } else if (this.countStudi == 600) {
              this.countStudi = 0;
              this.countDifficalt = 0;
              this.stylesChap.push(1);
              // console.log("======countStudi=========", this.stylesChap);
            } else {
              this.countStudi = 0;
              this.countDifficalt = 0;
              this.stylesChap.push(0);
              // console.log("======else=========", this.stylesChap);
            }
          }
          if (this.stylesChap.length === 6) {
            // console.log("this.stylesChap");
            localStorage.setItem(
              "thisStylesChap",
              JSON.stringify(this.stylesChap)
            );
          }
        });
      });
      this.countChspters += 1;
      this.count(this.countChspters);
    }
  }
}

export default Chapter;
