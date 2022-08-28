import DivImage from "./divImage";

class Header {
  start(): HTMLElement {
    const divImage = new DivImage();
    const header = document.createElement("header") as HTMLElement;
    const headerDiv = document.createElement("div") as HTMLElement;
    const headerLogo = document.createElement("div") as HTMLElement;
    const headerLogoLink = document.createElement("a") as HTMLAnchorElement;

    headerDiv.setAttribute("class", "container header");
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
    headerDiv.innerHTML += divImage.create(
      "https://www.imagehousing.com/images/2022/08/27/avatar.png",
      "header__authorization",
      "avatar.png"
    );
    header.append(headerDiv);
    return header;
  }
}

export default Header;
