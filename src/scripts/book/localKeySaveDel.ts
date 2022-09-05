import CheckWordsOnload from "./checkWordsOnload";
import UserWords from "../userWords";

interface Key {
  key: string[];
}

class LocalKeySaveDel {
  localKey: string | null;
  keysArr: [Key[]];
  key: string;
  userWords: UserWords;

  constructor(key: string) {
    this.key = key;
    this.localKey = localStorage.getItem(`${this.key}`);
    this.keysArr = this.localKey === null ? [] : JSON.parse(this.localKey);
    this.userWords = new UserWords();
  }
  save(
    groupId: number,
    pageNumber: number,
    cardID: string | null,
    wordsNode: HTMLElement,
    pagination: HTMLElement
  ) {
    const checkWordsOnload = new CheckWordsOnload();
    if (!cardID) return;
    if (this.keysArr[groupId]) {
      if (this.keysArr[groupId][pageNumber]) {
        this.keysArr[groupId][pageNumber]["key"].push(cardID);
        if (this.keysArr[groupId][pageNumber]["key"].length === 20) {
          checkWordsOnload.addPageStyle(
            wordsNode,
            pagination,
            this.key,
            pageNumber
          );
        }
      } else {
        this.keysArr[groupId][pageNumber] = { key: [cardID] };
      }
    } else {
      this.keysArr[groupId] = [];
      this.keysArr[groupId][pageNumber] = { key: [cardID] };
    }
    localStorage.setItem(`${this.key}`, `${JSON.stringify(this.keysArr)}`);
  }
  remove(
    groupId: number,
    pageNumber: number,
    cardID: string | null,
    wordsNode: HTMLElement,
    pagination: HTMLElement
  ) {
    if (!cardID) return;
    if (this.keysArr[groupId][pageNumber]["key"].indexOf(cardID) !== -1) {
      if (this.keysArr[groupId][pageNumber]["key"].length === 20) {
        const checkWordsOnload = new CheckWordsOnload();
        checkWordsOnload.removePageStyle(
          wordsNode,
          pagination,
          this.key,
          pageNumber
        );
      }
      const id = this.keysArr[groupId][pageNumber]["key"].indexOf(cardID);
      this.keysArr[groupId][pageNumber]["key"].splice(id, 1);
      localStorage.setItem(`${this.key}`, `${JSON.stringify(this.keysArr)}`);
    }
  }
}

export default LocalKeySaveDel;
