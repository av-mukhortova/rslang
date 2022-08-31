import Sprint from "../sprint";
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
    text: "Книга",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/book.png",
    alt: "book.png",
    key: "book",
  },
  {
    id: 3,
    text: "Изученные слова",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/book.png",
    alt: "book.png",
    key: "words",
  },
  {
    id: 4,
    text: "Мини-игра «Аудиовызов»",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/game.png",
    alt: "game.png",
    key: "audiocall",
  },
  {
    id: 5,
    text: "Мини-игра «Спринт»",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/game.png",
    alt: "game.png",
    key: "sprint",
  },
  {
    id: 6,
    text: "Статистика",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/statistics.png",
    alt: "statistics.png",
    key: "stat",
  },
];

class Menu {
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

    const sprint = new Sprint();
    menu.addEventListener("click", (event: MouseEvent) => {
      const target: HTMLElement = event.target as HTMLElement;
      const parent: HTMLElement = target.parentNode as HTMLElement;
      const id = target.id ? target.id : parent.id;
      if (id) {
        const mainDiv = document.querySelector(".mainPage") as HTMLElement;
        mainDiv.classList.add("hidden");
        switch (id) {
          case "main": {
            mainDiv.classList.remove("hidden");

            break;
          }
          case "sprint": {
            sprint.start();
            break;
          }
          case "audiocall": {
            process();
            StatProcess();
            break;
          }
        }
        menuSection.style.display = "none";
      }
    });
  }
}

export default Menu;
