const cardDifficults: string[] = [];

class ChechActivDifficult {
  add(cardDifficult: HTMLElement, cardID: string | null) {
    const cardq = cardDifficult.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    // console.log(card, cardq, cardID);
    const cardDifficultDel = cardq.childNodes[5] as HTMLElement;
    // console.log(cardDifficultDel);
    cardDifficultDel.style.display = "block";
    cardDifficult.style.display = "none";
    if (!cardID) return;
    cardDifficults.push(cardID);
    localStorage.setItem("cardDifficults", `${cardDifficults}`);
  }
}

export default ChechActivDifficult;
