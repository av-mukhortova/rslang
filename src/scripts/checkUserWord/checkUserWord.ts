import DificaltBook from "../book/dificaltBook";
import Api from "../api";

class CheckUserWord {
  api: Api;
  dificaltBook: DificaltBook;

  constructor() {
    this.api = new Api();
    this.dificaltBook = new DificaltBook();
  }

  checkDiff(cardID: string | null) {
    const word = this.api.getUserWordsDifSt(localStorage.getItem("userId"));
    console.log(word);

    word.then((el) => {
      console.log("CheckUserWord", cardID, el);
      el.forEach((iem) => {
        const elem = JSON.parse(JSON.stringify(iem));
        if (elem.wordId === cardID) {
          if (elem.difficulty === "hard") {
            console.log("CheckUserWord", cardID);
            this.dificaltBook.delete(cardID);
          }
        }
      });
    });
  }
  checkStudi(cardID: string | null) {
    const word = this.api.getUserWordsDifSt(localStorage.getItem("userId"));
    console.log(word);

    word.then((el) => {
      el.forEach((iem) => {
        const elem = JSON.parse(JSON.stringify(iem));
        console.log("CheckUserWord", cardID, el);
        if (elem.wordId === cardID) {
          if (elem.difficulty === "easy") {
            console.log("CheckUserWord", cardID);
            this.dificaltBook.delete(cardID);
          }
        }
      });
    });
  }
}

export default CheckUserWord;
