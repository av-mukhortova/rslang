import ChechActivStudi from "./chechActivStudi";
import ChechActivDifficult from "./chechActivDifficult";

class ChechActiv {
  check(eventEl: Event) {
    const chechActivStudi = new ChechActivStudi();
    const chechActivDifficult = new ChechActivDifficult();

    const card = (eventEl.target as HTMLElement).closest(
      ".item-page"
    ) as HTMLElement;
    if (!card?.getAttribute("id")) return;
    const cardID = card?.getAttribute("id");
    const cardStudiBtn = eventEl.target as HTMLElement;
    const cardDifficult = eventEl.target as HTMLElement;
    const cardDifficultDell = eventEl.target as HTMLElement;

    if (!cardStudiBtn && !cardDifficult && !cardDifficultDell) {
      return;
    } else if (cardStudiBtn.classList.contains("item-page__studi")) {
      chechActivStudi.check(card, cardStudiBtn, cardID);
    } else if (cardDifficult.classList.contains("item-page__difficult")) {
      chechActivDifficult.add(cardDifficult, cardID);
    } else if (
      cardDifficultDell.classList.contains("item-page__difficult-delete")
    ) {
      chechActivDifficult.dell(cardDifficultDell, cardID);
    }
  }
}

export default ChechActiv;
