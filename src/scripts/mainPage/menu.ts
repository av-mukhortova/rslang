import Sprint from "../sprint";
import Chapter from "../book/chapter";
import MenuLinks from "./menuLinks";
import { AudioCall } from "../audiocall";
import { StatProcess } from "../statisticSolve";

const links = [
  {
    id: 1,
    text: "Главная страница",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/home.png",
    alt: "home.png",
    key: "main",
  },
  {
    id: 2,
    text: "Учебник",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/book.png",
    alt: "book.png",
    key: "book",
  },
  {
    id: 3,
    text: "Мини-игра «Аудиовызов»",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/game.png",
    alt: "game.png",
    key: "audiocall",
  },
  {
    id: 4,
    text: "Мини-игра «Спринт»",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/game.png",
    alt: "game.png",
    key: "sprint",
  },
  {
    id: 5,
    text: "Статистика",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/statistics.png",
    alt: "statistics.png",
    key: "stat",
  },
];

class Menu {
  sprint: Sprint;
  audiocall: AudioCall;
  constructor() {
    this.sprint = new Sprint();
    this.audiocall = new AudioCall();
  }
  create() {
    const menuLinks = new MenuLinks();
    const menu = document.createElement("div") as HTMLElement;
    const menuSection = document.createElement("section") as HTMLElement;
    menuSection.setAttribute("class", "menu");
    menu.setAttribute("class", "links-menu");
    links.forEach((el) => {
      menu.innerHTML += menuLinks.create(
        el.linkPage,
        el.linkimg,
        el.alt,
        el.text,
        el.key
      );
    });
    menuSection.append(menu);
    const main = document.querySelector(".popup") as HTMLElement;
    main?.append(menuSection);

    menu.addEventListener("click", (event: MouseEvent) => {
      const target: HTMLElement = event.target as HTMLElement;
      const parent: HTMLElement = target.parentNode as HTMLElement;
      const id = target.id ? target.id : parent.id;
      location.hash = "#" + id;
      this.toLink(id);
      menuSection.style.display = "none";
    });
  }

  toLink(id: string) {
    const chapter = new Chapter();
    const book = document.querySelector(".bookPage") as HTMLElement;
    const sprintPage = document.querySelector(".sprint") as HTMLElement;
    const wordsPage = document.querySelector(".wordsPage") as HTMLElement;
    const audocallPage = document.querySelector(".audocallPage") as HTMLElement;
    const starter_pack = document.querySelector(".starter_pack") as HTMLElement;
    const statPage = document.querySelector(".statPage") as HTMLElement;
    const sprintResultsPage = document.querySelector(
      ".sprint_results"
    ) as HTMLElement;
    if (id) {
      const mainDiv = document.querySelector(".mainPage") as HTMLElement;
      mainDiv.classList.add("hidden");
      switch (id) {
        case "main": {
          starter_pack.classList.add("hidden");
          audocallPage.classList.add("hidden");
          statPage.classList.add("hidden");
          this.sprint.isPlaying = false;
          this.audiocall.isPlayed = false;
          mainDiv.classList.remove("hidden");
          if (book?.classList.contains("hidden") === false) {
            book?.classList.add("hidden");
          }
          break;
        }
        case "sprint":
        case "studi_game-sprint": {
          starter_pack.classList.add("hidden");
          audocallPage.classList.add("hidden");
          statPage.classList.add("hidden");
          this.audiocall.isPlayed = false;
          const footer: HTMLElement | null = document.querySelector("footer");
          footer?.classList.add("hidden");
          this.sprint.start();
          if (book?.classList.contains("hidden") === false) {
            book?.classList.add("hidden");
          }
          if (sprintResultsPage?.classList.contains("hidden") === false) {
            sprintResultsPage?.classList.add("hidden");
          }
          if (audocallPage?.classList.contains("hidden") === false) {
            audocallPage?.classList.add("hidden");
          }
          if (wordsPage?.classList.contains("hidden") === false) {
            wordsPage?.classList.add("hidden");
          }
          break;
        }
        case "audiocall":
        case "studi_game-audio": {
          this.sprint.isPlaying = false;
          statPage.classList.add("hidden");
          const footer: HTMLElement | null = document.querySelector("footer");
          footer?.classList.add("hidden");
          book.classList.add("hidden");
          const sprintPage: HTMLElement | null =
            document.querySelector(".sprintPage");
          sprintPage?.classList.add("hidden");
          const level: HTMLElement | null = document.querySelector(".level");
          level?.classList.add("hidden");
          this.audiocall.start();

          break;
        }
        case "stat": {
          starter_pack.classList.add("hidden");
          audocallPage.classList.add("hidden");
          this.audiocall.isPlayed = false;
          this.sprint.isPlaying = false;
          const sprintPage: HTMLElement | null =
            document.querySelector(".sprintPage");
          sprintPage?.classList.add("hidden");
          if (sprintResultsPage?.classList.contains("hidden") === false) {
            sprintResultsPage?.classList.add("hidden");
          }
          if (wordsPage?.classList.contains("hidden") === false) {
            wordsPage?.classList.add("hidden");
          }
          const level: HTMLElement | null = document.querySelector(".level");
          level?.classList.add("hidden");
          StatProcess();
          break;
        }
        case "book":
        case "studi_book": {
          starter_pack.classList.add("hidden");
          audocallPage.classList.add("hidden");
          statPage.classList.add("hidden");
          this.audiocall.isPlayed = false;
          this.sprint.isPlaying = false;
          chapter.create();
          if (sprintPage?.classList.contains("hidden") === false) {
            sprintPage?.classList.add("hidden");
          }
          if (sprintResultsPage?.classList.contains("hidden") === false) {
            sprintResultsPage?.classList.add("hidden");
          }
          if (audocallPage?.classList.contains("hidden") === false) {
            audocallPage?.classList.add("hidden");
          }
          if (wordsPage?.classList.contains("hidden") === false) {
            wordsPage?.classList.add("hidden");
          }
          break;
        }
      }
    }
  }
}

export default Menu;
