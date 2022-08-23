const keyStudi = localStorage.getItem("studi");

interface Key {
  key: string[];
}

const studiKeys: Key[] = keyStudi === null ? [] : JSON.parse(keyStudi);

class ChechActivStudi {
  check(
    card: HTMLElement,
    cardStudiBtn: HTMLElement,
    cardID: string | null,
    pageNumber: number
  ) {
    // console.log(pageNumber);
    cardStudiBtn.classList.toggle("activ");
    if (cardStudiBtn.classList.contains("activ")) {
      card.style.backgroundColor = "green";
      if (!cardID) return;
      if (studiKeys[pageNumber]) {
        studiKeys[pageNumber]["key"].push(cardID);
      } else {
        studiKeys[pageNumber] = { key: [cardID] };
      }
      console.log(studiKeys);
      localStorage.setItem(`studi`, `${JSON.stringify(studiKeys)}`);
    } else {
      card.style.backgroundColor = "";
      if (!cardID) return;
      if (studiKeys[pageNumber]["key"].indexOf(cardID) !== -1) {
        const id = studiKeys[pageNumber]["key"].indexOf(cardID);
        studiKeys[pageNumber]["key"].splice(id, 1);
        localStorage.setItem(`studi`, `${JSON.stringify(studiKeys)}`);
      }
    }
  }
}

export default ChechActivStudi;
