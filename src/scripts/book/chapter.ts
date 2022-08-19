import Pages from "./pages";

class Chapter {
  public create() {
    const body = document.querySelector("body");
    const chap = document.querySelector(".chapters") as HTMLElement;
    if (chap) {
      const bod = chap?.parentNode;
      bod?.removeChild(chap);
    }
    const chapters = document.createElement("section");
    chapters.setAttribute("class", "chapters");
    for (let i = 0; i < 6; i += 1) {
      const chapter = document.createElement("div");
      chapter.setAttribute("id", `chapter-${i}`);
      const number = document.createElement("p");
      number.textContent = `chapter ${i + 1}`;
      chapter.append(number);
      chapters.append(chapter);
    }
    body?.append(chapters);
    chapters.addEventListener("click", (e: Event) => {
      const idChapter = (e.target as HTMLElement).closest("div") as HTMLElement;
      if (!idChapter?.getAttribute("id")) return;
      const group = idChapter?.getAttribute("id")?.split("-")[1];
      const pages = new Pages();
      if (!group) return;
      pages.getWordData(chapters, group);
    });
  }
}

export default Chapter;
