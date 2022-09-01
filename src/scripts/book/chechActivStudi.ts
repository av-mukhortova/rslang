import UserWords from "../userWords";
import LocalKeySaveDel from "./localKeySaveDel";

class ChechActivStudi {
  userWords: UserWords;
  constructor() {
    this.userWords = new UserWords();
  }
  check(
    card: HTMLElement,
    cardStudiBtn: HTMLElement,
    cardID: string | null,
    pageNumber: number,
    group: string,
    wordsNode: HTMLElement,
    pagination: HTMLElement
  ) {
    const localKeySaveDel = new LocalKeySaveDel("studi");

    cardStudiBtn.classList.toggle("activ");
    const groupId = Number(group);
    if (cardStudiBtn.classList.contains("activ")) {
      card.style.border = "6px solid #43DE1C";
      this.userWords.addLearnedWord(cardID);
      localKeySaveDel.save(groupId, pageNumber, cardID, wordsNode, pagination);
    } else {
      card.style.border = "";
      localKeySaveDel.remove(
        groupId,
        pageNumber,
        cardID,
        wordsNode,
        pagination
      );
    }
  }
}

export default ChechActivStudi;
