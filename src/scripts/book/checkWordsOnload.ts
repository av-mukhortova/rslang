const studi: string | null = localStorage.getItem("studi");
const cardDifficults: string | null = localStorage.getItem("cardDifficults");

class CheckWordsOnload {
  studiCount: number;
  difficultiCount: number;

  constructor() {
    this.studiCount = 0;
    this.difficultiCount = 0;
  }

  check(
    wordsNode: HTMLElement,
    pagination: HTMLElement,
    pageNumber: number,
    group: string
  ) {
    let studis: [] = [];
    if (studi) {
      studis = JSON.parse(studi);
    }
    let difficults: [] = [];
    if (cardDifficults) {
      difficults = JSON.parse(cardDifficults);
    }
    const gropStudes = studis[+group];
    const gropDifficults = difficults[+group];

    if (gropDifficults) {
      if (!gropDifficults[pageNumber]) return;
      const pageDifficults: [string] = gropDifficults[pageNumber]["key"];

      if (pageDifficults.length >= 20) {
        wordsNode.style.border = "5px solid red";
        wordsNode.style.padding = "10px 0";

        this.addPaginationStyle(pagination, pageNumber, "pageDifficults");
      }

      if (gropDifficults[pageNumber]["key"]) {
        this.addCardStyle(wordsNode, pageDifficults, "pageDifficults");
      }
    }

    if (gropStudes) {
      if (!gropStudes[pageNumber]) return;
      if (gropStudes[pageNumber]["key"]) {
        const pageStudes: [string] = gropStudes[pageNumber]["key"];
        if (pageStudes.length >= 20) {
          wordsNode.style.backgroundColor = "rgba(144, 230, 151, 0.85)";
          wordsNode.style.padding = "10px 0";
          this.addPaginationStyle(pagination, pageNumber, "pageStudes");
        }

        this.addCardStyle(wordsNode, pageStudes, "pageStudes");
      }
    }
  }

  addPaginationStyle(
    pagination: HTMLElement,
    pageNumber: number,
    namePage: string
  ) {
    for (let i = 0; i < pagination.childNodes.length; i++) {
      const pagin_el = pagination.childNodes[i] as HTMLElement;
      if (pagin_el.nodeName !== "#text") {
        const pagin_elNum = pagin_el.getAttribute("id")?.split("-")[1];
        if (pagin_elNum === String(pageNumber + 1)) {
          if (namePage === "pageDifficults") {
            pagin_el.style.border = "2px solid red";
          }
          if (namePage === "pageStudes") {
            pagin_el.style.backgroundColor = "green";
          }
        }
      }
    }
  }

  addCardStyle(wordsNode: HTMLElement, array: [string], namePage: string) {
    for (let i = 0; i < wordsNode.childNodes.length; i++) {
      const child = wordsNode.childNodes[i] as HTMLElement;
      if (child.nodeName !== "#text") {
        const id = child.getAttribute("id");
        if (!id) return;
        if (namePage === "pageDifficults") {
          if (array?.indexOf(id) !== -1) {
            (child.childNodes[5].childNodes[3] as HTMLElement).style.display =
              "none";
            (child.childNodes[5].childNodes[5] as HTMLElement).style.display =
              "block";
            child.style.border = "5px solid red";
          }
        }
        if (namePage === "pageStudes") {
          if (array?.indexOf(id) !== -1) {
            (child.childNodes[5].childNodes[1] as HTMLElement).classList.toggle(
              "activ"
            );
            child.style.backgroundColor = "green";
          }
        }
      }
    }
  }
}

export default CheckWordsOnload;
