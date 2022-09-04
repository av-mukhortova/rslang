import "../../../assets/styles/mainPage/authorization.css";
import { iAuthResp, iUser } from "../../../types/index";
import Api from "../../api";
import App from "../../app";

class Authorization {
  api: Api;

  constructor() {
    this.api = new Api();
  }
  create(main: App) {
    let authorization = document.querySelector(".authorization") as HTMLElement;
    if (authorization) {
      authorization.replaceChildren();
      authorization.style.display = "flex";
    } else {
      authorization = document.createElement("section") as HTMLElement;
    }
    authorization.setAttribute("class", "authorization");
    const forma = document.createElement("div") as HTMLDivElement;
    forma.className = "auth_form";
    const title = document.createElement("p") as HTMLElement;
    title.innerHTML = "Войти";
    this.addCloseBtn(authorization);
    authorization.append(title);
    forma.innerHTML = `
      <input id="auth_email" type="email" placeholder="Введите Ваш Email" required>
      <input id="auth_pass" type="password" placeholder="Введите пароль" required>
      <span id="auth_msg"></span>
      <button class="login_button" type="submit" name="form_auth_submit">Войти</button>
      <button class="signup_button" type="submit" name="form_auth_submit">Зарегистрироваться</button>
    `;
    authorization.append(forma);
    const signupButton = document.querySelector(
      ".signup_button"
    ) as HTMLButtonElement;
    signupButton.addEventListener("click", () => {
      alert("надали");
      this.signup(authorization, forma, title, main);
    });
    const logBtn = document.querySelector(".login_button") as HTMLButtonElement;
    logBtn.addEventListener("click", () => {
      const user = this.readData();
      this.signIn(user, authorization, main);
    });

    const closeButton = document.querySelector(".close-forma");
    closeButton?.addEventListener("click", () => {
      authorization.style.display = "none";
    });
  }
  signup(
    authorization: HTMLElement,
    forma: HTMLDivElement,
    title: HTMLElement,
    main: App
  ) {
    authorization.innerHTML = "";
    this.addCloseBtn(authorization);
    title.innerHTML = "Зарегистрироваться";
    forma.innerHTML = `
      <input id="auth_name" type="text" placeholder="Введите имя" required>
      <input id="auth_email" type="email" placeholder="Введите Ваш Email" required>
      <input id="auth_pass" type="password" placeholder="Введите пароль" min-size="8" required>
      <span id="auth_msg"></span>
      <button class="signup_button" type="submit" name="form_auth_submit">Зарегистрироваться</button>
    `;
    authorization.append(title);
    authorization.append(forma);
    const signupButton = document.querySelector(
      ".signup_button"
    ) as HTMLButtonElement;
    signupButton.addEventListener("click", () => {
      const user = this.readData();
      this.createUser(user, authorization, main);
    });

    const closeButton = document.querySelector(".close-forma");
    closeButton?.addEventListener("click", () => {
      authorization.style.display = "none";
    });
  }
  private readData(): iUser {
    const name: HTMLInputElement | null = document.querySelector("#auth_name");
    const email: HTMLInputElement | null =
      document.querySelector("#auth_email");
    const pass: HTMLInputElement | null = document.querySelector("#auth_pass");
    const userName = name?.value ? name.value : "";
    const userEmail = email?.value ? email.value : "";
    const userPass = pass?.value ? pass.value : "";
    const user: iUser = {
      id: "",
      name: userName,
      email: userEmail,
      password: userPass,
    };
    return user;
  }
  public async createUser(
    user: iUser,
    authorization: HTMLElement,
    main: App
  ): Promise<void> {
    await this.api.createUser(user).then((resp: string) => {
      if (resp === "Успешно!") {
        authorization.style.display = "none";
        this.signIn(user, authorization, main);
      } else {
        const msg: HTMLSpanElement | null = document.querySelector("#auth_msg");
        if (msg) msg.innerHTML = resp;
      }
    });
  }
  public signIn(user: iUser, authorization: HTMLElement, main: App): void {
    this.api.signIn(user).then((res: iAuthResp) => {
      if (res.message === "Authenticated") {
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("password", user.password);
        localStorage.setItem("token", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
        authorization.style.display = "none";
        main.auth();
      } else {
        const msg: HTMLSpanElement | null = document.querySelector("#auth_msg");
        if (msg) msg.innerHTML = res.message;
      }
    });
  }
  addCloseBtn(authorization: HTMLElement) {
    const close = document.createElement("button") as HTMLButtonElement;
    close.className = "close-forma";
    close.innerHTML = `<img src="https://i.ibb.co/28QgS5c/delete.png" alt="delete">`;
    authorization.append(close);
  }
}

export default Authorization;
