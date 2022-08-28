import MenuLinks from "./menuLinks";

const links = [
  {
    id: 1,
    text: "Главная страница",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/home.png",
    alt: "home.png",
  },
  {
    id: 2,
    text: "Книги",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/book.png",
    alt: "book.png",
  },
  {
    id: 3,
    text: "Изученные слова",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/book.png",
    alt: "book.png",
  },
  {
    id: 4,
    text: "Мини игры",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/game.png",
    alt: "game.png",
  },
  {
    id: 5,
    text: "Статистика",
    linkPage: "#",
    linkimg: "https://www.imagehousing.com/images/2022/08/27/statistics.png",
    alt: "statistics.png",
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
        el.text
      );
    });
    menuSection.append(menu);
    document.body.append(menuSection);
    menu.addEventListener("click", () => {
      menuSection.style.display = "none";
    });
  }
}

export default Menu;
