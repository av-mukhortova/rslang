import Pages from "./pages";
import "../../assets/styles/bookStyle/chapter.css";

interface Key {
  key: string[];
}
class Chapter {
  studiKeys: string | null;
  dificaltKeys: string | null;
  countStudi: number;
  countDifficalt: number;

  constructor() {
    this.studiKeys = localStorage.getItem("studi");
    this.dificaltKeys = localStorage.getItem("cardDifficults");
    this.countStudi = 0;
    this.countDifficalt = 0;
  }

  public create() {
    const book: HTMLDivElement | null = document.querySelector(".book");
    book?.classList.remove("hidden");
    const main: HTMLDivElement | null = document.querySelector(".main");
    main?.classList.add("hidden");

    const chap = document.querySelector(".chapters") as HTMLElement;
    const body = document.querySelector("body") as HTMLElement;
    if (chap) {
      const bod = chap?.parentNode;
      bod?.removeChild(chap);
    }
    const chapters = document.createElement("section");
    chapters.setAttribute("class", "chapters");
    for (let i = 0; i < 7; i += 1) {
      this.countStudi = 0;
      this.countDifficalt = 0;
      this.count(i);
      const chapter = document.createElement("div");
      chapter.setAttribute("id", `chapter-${i}`);

      if (this.countStudi === 30 && this.countDifficalt === 30) {
        chapter.setAttribute("class", `chapter `);
        chapter.style.backgroundColor = "green";
        chapter.style.border = "2px solid red";
      } else if (this.countStudi === 30) {
        chapter.setAttribute("class", `chapter`);
        chapter.style.backgroundColor = "green";
        chapter.style.border = "";
      } else if (this.countDifficalt === 30) {
        chapter.setAttribute("class", `chapter`);
        chapter.style.backgroundColor = "";
        chapter.style.border = "2px solid red";
      } else {
        chapter.setAttribute("class", `chapter`);
      }

      const number = document.createElement("p");
      number.textContent = `chapter ${i + 1}`;
      chapter.append(number);
      chapters.append(chapter);
    }

    book?.append(chapters);
    chapters.addEventListener("click", (e: Event): void => {
      const idChapter = (e.target as HTMLElement).closest("div") as HTMLElement;
      if (!idChapter?.getAttribute("id")) return;
      const group = idChapter?.getAttribute("id")?.split("-")[1];
      book?.setAttribute("class", `chapter-${group}`);
      const pages = new Pages();
      if (!group) return;
      pages.getWordData(chapters, group);
    });
  }

  count(shapterNum: number) {
    if (this.studiKeys) {
      const studiKeys = JSON.parse(this.studiKeys);
      if (studiKeys[shapterNum]) {
        if (studiKeys[shapterNum].length === 30) {
          studiKeys[shapterNum].forEach((el: Key) => {
            if (el) {
              this.countStudi += el.key.length === 20 ? 1 : 0;
            }
          });
        }
      }
    }

    if (this.dificaltKeys) {
      const dificaltKeys = JSON.parse(this.dificaltKeys);
      if (dificaltKeys[shapterNum]) {
        if (dificaltKeys[shapterNum].length === 30) {
          dificaltKeys[shapterNum].forEach((el: Key) => {
            if (el) {
              this.countDifficalt += el.key.length === 20 ? 1 : 0;
            }
          });
        }
      }
    }
  }
}

export default Chapter;
