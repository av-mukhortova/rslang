import Sprint from "../sprint";
import Chapter from "../book/chapter";
import MenuLinks from "./menuLinks";
import { process } from "../audiocall";
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
  constructor() {
    this.sprint = new Sprint();
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
      this.toLink(event);
      menuSection.style.display = "none";
    });
  }

  toLink(event: MouseEvent) {
    const chapter = new Chapter();
    const target: HTMLElement = event.target as HTMLElement;
    const parent: HTMLElement = target.parentNode as HTMLElement;
    const book = document.querySelector(".bookPage") as HTMLElement;
    const sprintPage = document.querySelector(".sprint") as HTMLElement;
    const levelPage = document.querySelector(".level") as HTMLElement;
    const wordsPage = document.querySelector(".wordsPage") as HTMLElement;
    const audocallPage = document.querySelector(".audocallPage") as HTMLElement;
    const sprintResultsPage = document.querySelector(
      ".sprint_results"
    ) as HTMLElement;
    const id = target.id ? target.id : parent.id;
    if (id) {
      const mainDiv = document.querySelector(".mainPage") as HTMLElement;
      mainDiv.classList.add("hidden");
      switch (id) {
        case "main": {
          mainDiv.classList.remove("hidden");
          if (book?.classList.contains("hidden") === false) {
            book?.classList.add("hidden");
          }
          break;
        }
        case "sprint":
        case "studi_game-sprint": {
          this.sprint.start();
          break;
        }
        case "audiocall":
        case "studi_game-audio": {
          process();
          StatProcess();
          break;
        }
        case "book":
        case "studi_book": {
          chapter.create();
          if (sprintPage?.classList.contains("hidden") === false) {
            sprintPage?.classList.add("hidden");
          }
          if (levelPage?.classList.contains("hidden") === false) {
            levelPage?.classList.add("hidden");
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
