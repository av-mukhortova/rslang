const keyCardDifficults = localStorage.getItem("cardDifficults")?.split(",");
const cardDifficults: string[] =
  keyCardDifficults === undefined ? [] : keyCardDifficults;

class ChechActivDifficult {
  add(card: HTMLElement, cardDifficult: HTMLElement, cardID: string | null) {
    const blockAuthor = cardDifficult.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficultDel = blockAuthor.childNodes[5] as HTMLElement;
    cardDifficultDel.style.display = "block";
    cardDifficult.style.display = "none";
    card.style.border = "5px solid red";
    if (!cardID) return;
    cardDifficults.push(cardID);
    localStorage.setItem("cardDifficults", `${cardDifficults}`);
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
    card.style.border = "";
    if (!cardID) return;
    if (cardDifficults.indexOf(cardID) !== -1) {
      const idCard = cardDifficults.indexOf(cardID);
      cardDifficults.splice(idCard, 1);
      localStorage.setItem(`cardDifficults`, `${cardDifficults}`);
    }
  }
}

export default ChechActivDifficult;
