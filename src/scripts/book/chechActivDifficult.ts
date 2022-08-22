const keyCardDifficults = localStorage.getItem("cardDifficults")?.split(",");
const cardDifficults: string[] =
  keyCardDifficults === undefined ? [] : keyCardDifficults;

class ChechActivDifficult {
  add(cardDifficult: HTMLElement, cardID: string | null) {
    const card = cardDifficult.closest(".item-page__authorized") as HTMLElement;
    const cardDifficultDel = card.childNodes[5] as HTMLElement;
    cardDifficultDel.style.display = "block";
    cardDifficult.style.display = "none";
    if (!cardID) return;
    cardDifficults.push(cardID);
    localStorage.setItem("cardDifficults", `${cardDifficults}`);
  }
  dell(cardDifficultDell: HTMLElement, cardID: string | null) {
    const card = cardDifficultDell.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    console.log(cardDifficultDell, card, cardID);
    const cardDifficult = card.childNodes[3] as HTMLElement;
    console.log(cardDifficult);
    cardDifficult.style.display = "block";
    cardDifficultDell.style.display = "none";
    if (!cardID) return;
    if (cardDifficults.indexOf(cardID) !== -1) {
      const idCard = cardDifficults.indexOf(cardID);
      cardDifficults.splice(idCard, 1);
      localStorage.setItem(`cardDifficults`, `${cardDifficults}`);
    }
  }
}

export default ChechActivDifficult;
