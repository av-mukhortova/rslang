import DivImage from "./divImage";

class Header {
  start(): HTMLElement {
    const divImage = new DivImage();
    const header: HTMLElement | null = document.querySelector(".header");
    const headerDiv = document.createElement("div") as HTMLElement;
    const headerLogo = document.createElement("div") as HTMLElement;
    const headerLogoLink = document.createElement("a") as HTMLAnchorElement;

    headerDiv.setAttribute("class", "header_container container");
    headerLogo.setAttribute("class", "header__Logo");
    headerLogoLink.setAttribute("href", "#");
    headerLogo.append(headerLogoLink);

    headerLogoLink.innerHTML = "RS-LANG";
    headerDiv.innerHTML += divImage.create(
      "https://www.imagehousing.com/images/2022/08/27/menu_burger.png",
      "header__burger",
      "menu_burger.png"
    );
    headerDiv.append(headerLogo);
    let className = "header__authorization";
    let imgSrc = "https://www.imagehousing.com/images/2022/08/27/avatar.png";
    if (localStorage.getItem("userId")) {
      imgSrc = "./assets/img/logout.png";
      className += " isAuth";
    }
    headerDiv.innerHTML += divImage.create(imgSrc, className, "avatar.png");
    header?.append(headerDiv);
    return header as HTMLElement;
  }
}

export default Header;
