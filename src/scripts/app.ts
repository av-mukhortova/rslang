import { iAuthResp, iUser } from "../types/index";
import Api from "./api";
import Authorization from "./mainPage/authorization/authorization";
import Main from "./mainPage/main";
import Menu from "./mainPage/menu";
import Pages from "./book/pages";
import Header from "../scripts/mainPage/header";
import FooterBlock from "../scripts/mainPage/footerBlock";

export default class App {
  menu: Menu;
  authorization: Authorization;
  api: Api;
  constructor() {
    this.menu = new Menu();
    this.authorization = new Authorization();
    this.api = new Api();
  }
  public start(): void {
    const id = localStorage.getItem("userId");
    if (id) {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      const user: iUser = {
        id: id,
        name: name ? name : "",
        email: email ? email : "",
        password: password ? password : "",
      };
      this.api.signIn(user).then((res: iAuthResp) => {
        if (res.message === "Authenticated") {
          localStorage.setItem("token", res.token);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
      });
    }

    if (localStorage.getItem("groupBook")) {
      const pages = new Pages();
      const header = new Header();
      const footerBlock = new FooterBlock();

      const footer = document.querySelector("footer") as HTMLElement;

      header.start();
      footer.append(footerBlock.create());

      const book: HTMLDivElement | null = document.querySelector(".bookPage");
      book?.classList.remove("hidden");
      const group = localStorage.getItem("groupBook");
      const chapters = document.createElement("section");
      chapters.setAttribute("class", "chapters");
      book?.append(chapters);
      if (group) pages.getWordData(chapters, group);
    } else {
      const main = new Main();
      main.start();
    }

    const menuBurger = document.querySelector(".header__burger");
    menuBurger?.addEventListener("click", () => {
      const menuSection = document.querySelector(".menu") as HTMLElement;
      if (menuSection) {
        menuSection.style.display = "block";
      } else {
        this.menu.create();
      }
    });
    const headerauthorization = document.querySelector(
      ".header__authorization"
    ) as HTMLElement;
    headerauthorization?.addEventListener("click", () => {
      if (!headerauthorization.classList.contains("isAuth")) {
        this.authorization.create(this);
        const signupButton = document.querySelector(
          ".signup_button"
        ) as HTMLButtonElement;
        if (signupButton) {
          signupButton.style.display = "block";
        } else {
          this.authorization.create(this);
        }
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("groupBook");
        localStorage.removeItem("pageBook");
        const auth: HTMLDivElement | null = document.querySelector(
          ".header__authorization"
        );
        if (auth) {
          const img: HTMLImageElement | null = document.querySelector(
            ".header__authorization img"
          );
          auth.classList.remove("isAuth");
          if (img) {
            img.src =
              "https://www.imagehousing.com/images/2022/08/27/avatar.png";
          }
        }
        window.location.reload();
      }
    });
    /* document.addEventListener("DOMContentLoaded", () => {
      const page = location.hash.replace("#", "");
      const attr = page.split("/");
      this.menu.toLink(attr[0]);
    });
    window.onhashchange = () => {
      const page = location.hash.replace("#", "");
      console.log(page);
      const attr = page.split("/");
      this.menu.toLink(attr[0]);
    }; */
  }
  public auth() {
    const auth: HTMLDivElement | null = document.querySelector(
      ".header__authorization"
    );
    if (auth) {
      const img: HTMLImageElement | null = document.querySelector(
        ".header__authorization img"
      );
      auth.classList.add("isAuth");
      if (img) {
        img.src = "./assets/img/logout.png";
      }
      location.reload();
    }
  }
}
