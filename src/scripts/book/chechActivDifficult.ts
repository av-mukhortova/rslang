import LocalKeySaveDel from "./localKeySaveDel";

const localKeySaveDel = new LocalKeySaveDel("cardDifficults");
class ChechActivDifficult {
  add(
    card: HTMLElement,
    cardDifficult: HTMLElement,
    cardID: string | null,
    pageNumber: number,
    group: string
  ) {
    const groupId = Number(group);
    const blockAuthor = cardDifficult.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficultDel = blockAuthor.childNodes[5] as HTMLElement;
    cardDifficultDel.style.display = "block";
    cardDifficult.style.display = "none";
    card.style.border = "5px solid red";
    localKeySaveDel.save(groupId, pageNumber, cardID);
  }
  dell(
    card: HTMLElement,
    cardDifficultDell: HTMLElement,
    cardID: string | null,
    pageNumber: number,
    group: string
  ) {
    const groupId = Number(group);
    const blockAuthor = cardDifficultDell.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficult = blockAuthor.childNodes[3] as HTMLElement;
    cardDifficult.style.display = "block";
    cardDifficultDell.style.display = "none";
    card.style.border = "";
    localKeySaveDel.remove(groupId, pageNumber, cardID);
  }
}

export default ChechActivDifficult;
