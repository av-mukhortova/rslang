const keyStudi = localStorage.getItem("studi");

interface Key {
  key: string[];
}

const studiKeys: [Key[]] = keyStudi === null ? [] : JSON.parse(keyStudi);

class LocalKeySaveDel {
  save(groupId: number, pageNumber: number, cardID: string | null) {
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
  }
  remove(groupId: number, pageNumber: number, cardID: string | null) {
    if (!cardID) return;
    if (studiKeys[groupId][pageNumber]["key"].indexOf(cardID) !== -1) {
      const id = studiKeys[groupId][pageNumber]["key"].indexOf(cardID);
      studiKeys[groupId][pageNumber]["key"].splice(id, 1);
      localStorage.setItem(`studi`, `${JSON.stringify(studiKeys)}`);
    }
  }
}

export default LocalKeySaveDel;
