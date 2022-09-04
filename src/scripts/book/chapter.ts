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
  authorization: boolean;

  constructor() {
    this.studiKeys = localStorage.getItem("studi");
    this.dificaltKeys = localStorage.getItem("cardDifficults");
    this.countStudi = 0;
    this.countDifficalt = 0;
    this.authorization = localStorage.getItem("userId") ? true : false;
  }

  public create() {
    this.draw();
  }
  public draw() {
    const book: HTMLDivElement | null = document.querySelector(".bookPage");
    book?.classList.remove("hidden");
    const main: HTMLDivElement | null = document.querySelector(".mainPage");
    main?.classList.add("hidden");

    const chap = document.querySelector(".chapters") as HTMLElement;
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
      const heightBook = window.innerHeight;

      if (this.countStudi === 30 && this.countDifficalt === 30) {
        chapter.setAttribute("class", `chapter `);
        chapter.style.height = `${heightBook}px`;
        chapter.style.border = "6px solid #43DE1C";
        chapter.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
      } else if (this.countStudi === 30) {
        chapter.setAttribute("class", `chapter`);
        chapter.style.border = "6px solid #43DE1C";
        chapter.style.height = `${heightBook}px`;
        chapter.style.border = "";
      } else if (this.countDifficalt === 30) {
        chapter.setAttribute("class", `chapter`);
        chapter.style.backgroundColor = "";
        chapter.style.height = `${heightBook}px`;
        chapter.style.boxShadow = "inset 0px 0px 18px 18px #F06C5D";
      } else {
        chapter.setAttribute("class", `chapter`);
        chapter.style.height = `${heightBook}px`;
      }

      const number = document.createElement("p");
      if (i === 6) {
        if (!this.authorization) {
          chapter.style.display = "none";
        }
        number.textContent = `Difficult`;
      } else {
        number.textContent = `chapter ${i + 1}`;
      }
      chapter.append(number);
      chapters.append(chapter);
    }

    book?.append(chapters);
    chapters.addEventListener("click", (e: Event): void => {
      const target = e.target as HTMLElement;
      if (
        target.id !== "book-audiocall-btn" &&
        target.id !== "book-sprint-btn"
      ) {
        const idChapter = (e.target as HTMLElement).closest(
          "div"
        ) as HTMLElement;
        if (!idChapter?.getAttribute("id")) return;
        const group = idChapter?.getAttribute("id")?.split("-")[1];
        //  book?.setAttribute("class", `bookPage chapter-${group}`);
        book?.setAttribute("class", `bookPage`);
        const pages = new Pages();
        if (!group) return;
        pages.getWordData(chapters, group);
      }
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
