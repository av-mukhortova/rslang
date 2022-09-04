import { iWord } from "../../types/index";
import Api from "../api";
import ItemPage from "./itemPage";
import Voses from "./voses";

class DificaltBook {
  api: Api;
  itemPage: ItemPage;
  voses: Voses;

  constructor() {
    this.api = new Api();
    this.itemPage = new ItemPage();
    this.voses = new Voses();
  }

  create(
    chapters: HTMLElement,
    containerWords: HTMLElement,
    wordsHtml: HTMLElement,
    group: string
  ) {
    const word = this.api.getUserWordsDifSt(localStorage.getItem("userId"));
    console.log(word);

    word
      .then((el) => {
        const keyDificults: string[] = [];
        // const keyDificultsStades: string[] = [];
        el.forEach((iem) => {
          const elem = JSON.parse(JSON.stringify(iem));
          if (elem.difficulty === "hard") {
            keyDificults.push(elem.wordId);
            // keyDificultsStades.push(elem.wordId);
          } else {
            // keyDificultsStades.push(elem.wordId);
          }
        });
        return keyDificults;
      })
      .then((keyDificults) => {
        keyDificults.forEach((id: string) => {
          const card = this.api.getWordId(id);
          card.then((el: iWord) => {
            wordsHtml.innerHTML += this.itemPage.create(el, group);
          });
        });
        containerWords.append(wordsHtml);
        chapters.append(containerWords);
        const containerWordsClick = document.querySelector(
          ".container-words"
        ) as HTMLElement;
        containerWordsClick.addEventListener("click", (e: Event): void => {
          const path = e.target as HTMLElement;
          this.voses.start(path);
        });
        return keyDificults;
      });
    // .then((keyDificults) => {
    //   //  УДАЛИТЬ все
    //   console.log("keyDificults_+_+", keyDificults);
    //   localStorage.removeItem("cardDifficults");
    //   localStorage.removeItem("studi");
    //   keyDificults.forEach((id: string) => {
    //     console.log(keyDificults.length);
    //     console.log("removeUserWordById==", id);
    //     this.api.removeUserWordById(localStorage.getItem("userId"), id);
    //   });
    // });
  }
  delete(id: string | null) {
    this.api.removeUserWordById(localStorage.getItem("userId"), id);
  }
}

export default DificaltBook;
