import UserWords from "../userWords";
// import DificaltBook from "./dificaltBook";
// import LocalKeySaveDel from "./localKeySaveDel";
import CheckUserWord from "../checkUserWord/checkUserWord";
// import LocalKeySaveDel from "./localKeySaveDel";
class ChechActivStudi {
  userWords: UserWords;
  // dificaltBook: DificaltBook;
  constructor() {
    this.userWords = new UserWords();
    // this.dificaltBook = new DificaltBook();
  }
  check(
    card: HTMLElement,
    cardStudiBtn: HTMLElement
    /* cardID: string | null,
    pageNumber: number,
    group: string,
    wordsNode: HTMLElement,
    pagination: HTMLElement */
  ) {
    // const localKeySaveDel = new LocalKeySaveDel("studi");

    cardStudiBtn.classList.toggle("activ");
    // const groupId = Number(group);
    if (cardStudiBtn.classList.contains("activ")) {
      card.style.border = "6px solid #43DE1C";
      this.userWords.addLearnedWord(card.id);
      // localKeySaveDel.save(groupId, pageNumber, cardID, wordsNode, pagination);
    } else {
      const checkUserWord = new CheckUserWord();
      checkUserWord.checkStudi(card.id);
      card.style.border = "";
      /* localKeySaveDel.remove(
        groupId,
        pageNumber,
        cardID,
        wordsNode,
        pagination
      ); */
      this.userWords.addNewWord(card.id);
    }
  }
}

export default ChechActivStudi;
