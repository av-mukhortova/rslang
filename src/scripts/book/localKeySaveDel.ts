interface Key {
  key: string[];
}

class LocalKeySaveDel {
  localKey: string | null;
  keysArr: [Key[]];
  key: string;

  constructor(key: string) {
    this.key = key;
    this.localKey = localStorage.getItem(`${this.key}`);
    this.keysArr = this.localKey === null ? [] : JSON.parse(this.localKey);
  }
  save(groupId: number, pageNumber: number, cardID: string | null) {
    if (!cardID) return;
    if (this.keysArr[groupId]) {
      if (this.keysArr[groupId][pageNumber]) {
        this.keysArr[groupId][pageNumber]["key"].push(cardID);
      } else {
        this.keysArr[groupId][pageNumber] = { key: [cardID] };
      }
    } else {
      this.keysArr[groupId] = [];
      this.keysArr[groupId][pageNumber] = { key: [cardID] };
    }
    localStorage.setItem(`${this.key}`, `${JSON.stringify(this.keysArr)}`);
  }
  remove(groupId: number, pageNumber: number, cardID: string | null) {
    if (!cardID) return;
    if (this.keysArr[groupId][pageNumber]["key"].indexOf(cardID) !== -1) {
      const id = this.keysArr[groupId][pageNumber]["key"].indexOf(cardID);
      this.keysArr[groupId][pageNumber]["key"].splice(id, 1);
      localStorage.setItem(`${this.key}`, `${JSON.stringify(this.keysArr)}`);
    }
  }
}

export default LocalKeySaveDel;
