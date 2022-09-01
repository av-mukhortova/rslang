import Api from "../api";

class CheckWordsOnload {
  api: Api;
  studi: string | null;
  cardDifficults: string | null;

  constructor() {
    this.api = new Api();
    this.studi = localStorage.getItem("studi");
    this.cardDifficults = localStorage.getItem("cardDifficults");
  }
  check(
    wordsNode: HTMLElement,
    pagination: HTMLElement,
    pageNumber: number,
    group: string
  ) {
    let studis: [] = [];
    if (this.studi) {
      studis = JSON.parse(this.studi);
    }
    let difficults: [] = [];
    if (this.cardDifficults) {
      difficults = JSON.parse(this.cardDifficults);
    }
    const gropStudes = studis[+group];
    const gropDifficults = difficults[+group];

    if (gropDifficults) {
      if (gropDifficults[pageNumber]) {
        const pageDifficults: [string] = gropDifficults[pageNumber]["key"];

        if (pageDifficults.length >= 20) {
          this.addPageStyle(
            wordsNode,
            pagination,
            "pageDifficults",
            pageNumber
          );
        }

        if (gropDifficults[pageNumber]["key"]) {
          this.addCardStyle(wordsNode, pageDifficults, "pageDifficults");
        }
      }
    }

    if (gropStudes) {
      if (!gropStudes[pageNumber]) return;
      const pageStudes: [string] = gropStudes[pageNumber]["key"];
      if (pageStudes.length >= 20) {
        this.addPageStyle(wordsNode, pagination, "pageStudes", pageNumber);
      }
      if (gropStudes[pageNumber]["key"]) {
        this.addCardStyle(wordsNode, pageStudes, "pageStudes");
      }
    }
  }

  addPageStyle(
    wordsNode: HTMLElement,
    pagination: HTMLElement,
    namePage: string,
    pageNumber: number
  ) {
    if (namePage === "pageStudes" || namePage === "studi") {
      wordsNode.style.border = "6px solid #43DE1C";
      wordsNode.style.padding = "100px 0";
      this.addPaginationStyle(pagination, pageNumber, namePage);
    }

    if (namePage === "pageDifficults" || namePage === "cardDifficults") {
      wordsNode.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
      wordsNode.style.padding = "100px 0";
      this.addPaginationStyle(pagination, pageNumber, namePage);
    }
  }

  removePageStyle(
    wordsNode: HTMLElement,
    pagination: HTMLElement,
    namePage: string,
    pageNumber: number
  ) {
    if (namePage === "pageStudes" || namePage === "studi") {
      wordsNode.style.border = "";
      this.removePaginationStyle(pagination, pageNumber, namePage);
    }

    if (namePage === "pageDifficults" || namePage === "cardDifficults") {
      wordsNode.style.boxShadow = "";
      this.removePaginationStyle(pagination, pageNumber, namePage);
    }
  }

  removePaginationStyle(
    pagination: HTMLElement,
    pageNumber: number,
    namePage: string
  ) {
    for (let i = 0; i < pagination.childNodes.length; i++) {
      const pagin_el = pagination.childNodes[i] as HTMLElement;
      if (pagin_el.nodeName !== "#text") {
        const pagin_elNum = pagin_el.getAttribute("id")?.split("-")[1];
        if (pagin_elNum === String(pageNumber + 1)) {
          if (namePage === "pageDifficults" || namePage === "cardDifficults") {
            pagin_el.style.boxShadow = "";
          }
          if (namePage === "pageStudes" || namePage === "studi") {
            pagin_el.style.border = "";
          }
        }
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
          if (namePage === "pageDifficults" || namePage === "cardDifficults") {
            pagin_el.style.boxShadow = "inset 0px 0px 3px 3px #F06C5D";
          }
          if (namePage === "pageStudes" || namePage === "studi") {
            pagin_el.style.border = "3px solid #43DE1C";
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
            child.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
          }
        }
        if (namePage === "pageStudes") {
          if (array?.indexOf(id) !== -1) {
            (child.childNodes[5].childNodes[1] as HTMLElement).classList.toggle(
              "activ"
            );
            child.style.border = "6px solid #43DE1C";
          }
        }
      }
    }
  }
}

export default CheckWordsOnload;
