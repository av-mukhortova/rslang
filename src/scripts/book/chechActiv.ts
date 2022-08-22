import ChechActivStudi from "./chechActivStudi";

class ChechActiv {
  check(eventEl: Event) {
    const chechActivStudi = new ChechActivStudi();

    const card = (eventEl.target as HTMLElement).closest(
      ".item-page"
    ) as HTMLElement;
    if (!card?.getAttribute("id")) return;
    const cardID = card?.getAttribute("id");
    const cardStudiBtn = (eventEl.target as HTMLElement).closest(
      ".item-page__studi"
    ) as HTMLElement;

    if (!cardStudiBtn) {
      return;
    } else {
      chechActivStudi.check(card, cardStudiBtn, cardID);
    }
  }
}

export default ChechActiv;
