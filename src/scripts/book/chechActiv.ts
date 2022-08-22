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
    if (cardStudiBtn) {
      cardStudiBtn.closest(".item-page__studi") as HTMLElement;
    }

    const cardDifficult = eventEl.target as HTMLElement;
    if (cardDifficult) {
      cardDifficult.closest(".item-page__difficult") as HTMLElement;
    }

    if (!cardStudiBtn && !cardDifficult) {
      return;
    } else if (cardStudiBtn.classList.contains("item-page__studi")) {
      chechActivStudi.check(card, cardStudiBtn, cardID);
    } else if (cardDifficult.classList.contains("item-page__difficult")) {
      chechActivDifficult.add(cardDifficult, cardID);
    }
  }
}

export default ChechActiv;
