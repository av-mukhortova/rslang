const studiKeys: string[] = [];

class ChechActivStudi {
  check(card: HTMLElement, cardStudiBtn: HTMLElement, cardID: string | null) {
    cardStudiBtn.classList.toggle("activ");
    if (cardStudiBtn.classList.contains("activ")) {
      card.style.backgroundColor = "green";
      if (!cardID) return;
      studiKeys.push(cardID);
      localStorage.setItem(`studi`, `${studiKeys}`);
    } else {
      card.style.backgroundColor = "";
      if (!cardID) return;
      if (studiKeys.indexOf(cardID) !== -1) {
        const idCard = studiKeys.indexOf(cardID);
        studiKeys.splice(idCard, 1);
        localStorage.setItem(`studi`, `${studiKeys}`);
        console.log(studiKeys);
      }
    }
  }
}

export default ChechActivStudi;
