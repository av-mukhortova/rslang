const keyStudi = localStorage.getItem("studi");

interface Key {
  key: string[];
}

const studiKeys: [Key[]] = keyStudi === null ? [] : JSON.parse(keyStudi);

class ChechActivStudi {
  check(
    card: HTMLElement,
    cardStudiBtn: HTMLElement,
    cardID: string | null,
    pageNumber: number,
    group: string
  ) {
    cardStudiBtn.classList.toggle("activ");
    if (cardStudiBtn.classList.contains("activ")) {
      card.style.backgroundColor = "green";
      const groupId = Number(group);
      if (!cardID) return;
      if (studiKeys[groupId]) {
        if (studiKeys[groupId][pageNumber]) {
          studiKeys[groupId][pageNumber]["key"].push(cardID);
        } else {
          studiKeys[groupId][pageNumber] = { key: [cardID] };
        }
      } else {
        studiKeys[groupId] = [];
        studiKeys[groupId][pageNumber] = { key: [cardID] };
      }
      localStorage.setItem(`studi`, `${JSON.stringify(studiKeys)}`);
    } else {
      card.style.backgroundColor = "";
      if (!cardID) return;
      // if (studiKeys[pageNumber]["key"].indexOf(cardID) !== -1) {
      //   const id = studiKeys[pageNumber]["key"].indexOf(cardID);
      //   studiKeys[pageNumber]["key"].splice(id, 1);
      //   localStorage.setItem(`studi`, `${JSON.stringify(studiKeys)}`);
      // }
    }
  }
}

export default ChechActivStudi;
