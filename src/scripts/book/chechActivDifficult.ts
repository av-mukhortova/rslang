// const keyCardDifficults = localStorage.getItem("cardDifficults")?.split(",");
// const cardDifficults: string[] =
//   keyCardDifficults === undefined ? [] : keyCardDifficults;

const keyCardDifficults = localStorage.getItem("cardDifficults");

interface Key {
  key: string[];
}

const cardDifficults: Key[] =
  keyCardDifficults === null ? [] : JSON.parse(keyCardDifficults);

class ChechActivDifficult {
  add(
    card: HTMLElement,
    cardDifficult: HTMLElement,
    cardID: string | null,
    pageNumber: number
  ) {
    const blockAuthor = cardDifficult.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficultDel = blockAuthor.childNodes[5] as HTMLElement;
    cardDifficultDel.style.display = "block";
    cardDifficult.style.display = "none";
    card.style.border = "5px solid red";
    if (!cardID) return;
    if (cardDifficults[pageNumber]) {
      cardDifficults[pageNumber]["key"].push(cardID);
    } else {
      cardDifficults[pageNumber] = { key: [cardID] };
    }
    localStorage.setItem("cardDifficults", `${JSON.stringify(cardDifficults)}`);
  }
  dell(
    card: HTMLElement,
    cardDifficultDell: HTMLElement,
    cardID: string | null,
    pageNumber: number
  ) {
    const blockAuthor = cardDifficultDell.closest(
      ".item-page__authorized"
    ) as HTMLElement;
    const cardDifficult = blockAuthor.childNodes[3] as HTMLElement;
    cardDifficult.style.display = "block";
    cardDifficultDell.style.display = "none";
    card.style.border = "";
    if (!cardID) return;
    if (cardDifficults[pageNumber]["key"].indexOf(cardID) !== -1) {
      const id = cardDifficults[pageNumber]["key"].indexOf(cardID);
      cardDifficults[pageNumber]["key"].splice(id, 1);
      localStorage.setItem(
        `cardDifficults`,
        `${JSON.stringify(cardDifficults)}`
      );
    }
  }
}

export default ChechActivDifficult;
