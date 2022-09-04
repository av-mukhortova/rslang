// import LocalKeySaveDel from "./localKeySaveDel";
import UserWords from "../userWords";
import DificaltBook from "./dificaltBook";
import CheckUserWord from "../checkUserWord/checkUserWord";

// const localKeySaveDel = new LocalKeySaveDel("cardDifficults");
class ChechActivDifficult {
  userWords: UserWords;
  dificaltBook: DificaltBook;
  constructor() {
    this.userWords = new UserWords();
    this.dificaltBook = new DificaltBook();
  }
  add(
    card: HTMLElement,
    cardDifficult: HTMLElement
    // cardID: string | null
    // pageNumber: number,
    // group: string,
    // wordsNode: HTMLElement,
    // pagination: HTMLElement
  ) {
    // const groupId = Number(group);
    const blockAuthor = cardDifficult.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficultDel = blockAuthor.childNodes[5] as HTMLElement;
    cardDifficultDel.style.display = "block";
    cardDifficult.style.display = "none";
    card.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
    this.userWords.addDifficultWord(card.id);
    // localKeySaveDel.save(groupId, pageNumber, cardID, wordsNode, pagination);
  }
  dell(
    card: HTMLElement,
    cardDifficultDell: HTMLElement,
    cardID: string | null
    // pageNumber: number,
    // group: string
    // wordsNode: HTMLElement,
    // pagination: HTMLElement
  ) {
    // const groupId = Number(group);
    const blockAuthor = cardDifficultDell.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficult = blockAuthor.childNodes[3] as HTMLElement;
    cardDifficult.style.display = "block";
    cardDifficultDell.style.display = "none";
    card.style.boxShadow = "";

    const checkUserWord = new CheckUserWord();
    checkUserWord.checkDiff(cardID);

    // this.dificaltBook.delete(cardID);
    // localKeySaveDel.remove(groupId, pageNumber, cardID, wordsNode, pagination);
  }
}

export default ChechActivDifficult;
