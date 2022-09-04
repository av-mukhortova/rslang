import UserWords from "../userWords";
import DificaltBook from "./dificaltBook";
import CheckUserWord from "../checkUserWord/checkUserWord";

class ChechActivDifficult {
  userWords: UserWords;
  dificaltBook: DificaltBook;
  constructor() {
    this.userWords = new UserWords();
    this.dificaltBook = new DificaltBook();
  }
  add(card: HTMLElement, cardDifficult: HTMLElement) {
    const blockAuthor = cardDifficult.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficultDel = blockAuthor.childNodes[5] as HTMLElement;
    cardDifficultDel.style.display = "block";
    cardDifficult.style.display = "none";
    card.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
    this.userWords.addDifficultWord(card.id);
  }
  dell(
    card: HTMLElement,
    cardDifficultDell: HTMLElement,
    cardID: string | null
  ) {
    const blockAuthor = cardDifficultDell.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficult = blockAuthor.childNodes[3] as HTMLElement;
    cardDifficult.style.display = "block";
    cardDifficultDell.style.display = "none";
    card.style.boxShadow = "";

    const checkUserWord = new CheckUserWord();
    checkUserWord.checkDiff(cardID);
  }
}

export default ChechActivDifficult;
