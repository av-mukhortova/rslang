import LocalKeySaveDel from "./localKeySaveDel";

class ChechActivStudi {
  check(
    card: HTMLElement,
    cardStudiBtn: HTMLElement,
    cardID: string | null,
    pageNumber: number,
    group: string
  ) {
    const localKeySaveDel = new LocalKeySaveDel("activ");

    cardStudiBtn.classList.toggle("activ");
    const groupId = Number(group);
    if (cardStudiBtn.classList.contains("activ")) {
      card.style.backgroundColor = "green";
      localKeySaveDel.save(groupId, pageNumber, cardID);
    } else {
      card.style.backgroundColor = "";
      localKeySaveDel.remove(groupId, pageNumber, cardID);
    }
  }
}

export default ChechActivStudi;
