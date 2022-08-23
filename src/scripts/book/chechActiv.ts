import ChechActivStudi from "./chechActivStudi";
import ChechActivDifficult from "./chechActivDifficult";
import Voses from "./voses";

class ChechActiv {
  check(eventEl: Event, pageNumber: number, group: string) {
    const chechActivStudi = new ChechActivStudi();
    const chechActivDifficult = new ChechActivDifficult();
    const voses = new Voses();

    const card = (eventEl.target as HTMLElement).closest(
      ".item-page"
    ) as HTMLElement;
    if (!card?.getAttribute("id")) return;
    const cardID = card?.getAttribute("id");
    const cardStudiBtn = eventEl.target as HTMLElement;
    const cardDifficult = eventEl.target as HTMLElement;
    const cardDifficultDell = eventEl.target as HTMLElement;
    const textsVoce = eventEl.target as HTMLElement;

    if (!cardStudiBtn && !cardDifficult && !cardDifficultDell && !textsVoce) {
      return;
    } else if (textsVoce.classList.contains("item-page__voce")) {
      voses.start(textsVoce);
    } else if (cardStudiBtn.classList.contains("item-page__studi")) {
      chechActivStudi.check(card, cardStudiBtn, cardID, pageNumber, group);
    } else if (cardDifficult.classList.contains("item-page__difficult")) {
      chechActivDifficult.add(card, cardDifficult, cardID, pageNumber);
    } else if (
      cardDifficultDell.classList.contains("item-page__difficult-delete")
    ) {
      chechActivDifficult.dell(card, cardDifficultDell, cardID, pageNumber);
    }
  }
}

export default ChechActiv;
