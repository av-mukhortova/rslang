const studi = !localStorage.getItem("studi")
  ? []
  : localStorage.getItem("studi")?.split(",");
const cardDifficults = !localStorage.getItem("cardDifficults")
  ? []
  : localStorage.getItem("cardDifficults")?.split(",");

class CheckWordsOnload {
  studiCount: number;

  constructor() {
    this.studiCount = 0;
  }

  check(wordsNode: HTMLElement) {
    for (let i = 0; i < wordsNode.childNodes.length; i++) {
      const child = wordsNode.childNodes[i] as HTMLElement;
      if (child.nodeName !== "#text") {
        const id = child.getAttribute("id");
        if (!id) return;
        if (studi?.length !== 0) {
          studi?.forEach((el: string): void => {
            if (el?.indexOf(id) !== -1) {
              (
                child.childNodes[5].childNodes[1] as HTMLElement
              ).classList.toggle("activ");
              child.style.backgroundColor = "green";
              this.studiCount++;
            }
          });
        }
        if (cardDifficults?.length !== 0) {
          cardDifficults?.forEach((el: string): void => {
            if (el?.indexOf(id) !== -1) {
              (child.childNodes[5].childNodes[3] as HTMLElement).style.display =
                "none";
              (child.childNodes[5].childNodes[5] as HTMLElement).style.display =
                "block";
              child.style.border = "5px solid red";
            }
          });
        }
      }
    }
  }
}

export default CheckWordsOnload;
