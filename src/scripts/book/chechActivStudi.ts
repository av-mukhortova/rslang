import UserWords from "../userWords";
import DificaltBook from "./dificaltBook";
// import LocalKeySaveDel from "./localKeySaveDel";
import CheckUserWord from "../checkUserWord/checkUserWord";

class ChechActivStudi {
  userWords: UserWords;
  dificaltBook: DificaltBook;
  constructor() {
    this.userWords = new UserWords();
    this.dificaltBook = new DificaltBook();
  }
  check(
    card: HTMLElement,
    cardStudiBtn: HTMLElement,
    cardID: string | null
    // pageNumber: number,
    // group: string,
    // wordsNode: HTMLElement,
    // pagination: HTMLElement
  ) {
    // const localKeySaveDel = new LocalKeySaveDel("studi");

    cardStudiBtn.classList.toggle("activ");
    // const groupId = Number(group);
    if (cardStudiBtn.classList.contains("activ")) {
      card.style.border = "6px solid #43DE1C";
      this.userWords.addLearnedWord(cardID);
      // localKeySaveDel.save(groupId, pageNumber, cardID, wordsNode, pagination);
    } else {
      card.style.border = "";
      const checkUserWord = new CheckUserWord();
      checkUserWord.checkStudi(cardID);
      // this.dificaltBook.delete(cardID);
      // localKeySaveDel.remove(
      //   groupId,
      //   pageNumber,
      //   cardID,
      //   wordsNode,
      //   pagination
      // );
    }
  }
}

export default ChechActivStudi;
