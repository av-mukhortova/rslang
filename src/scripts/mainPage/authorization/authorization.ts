import "../../../assets/styles/mainPage/authorization.css";
import { iAuthResp, iUser } from "../../../types/index";
import Api from "../../api";
import Main from "../main";

class Authorization {
  api: Api;

  constructor() {
    this.api = new Api();
  }
  create(main: Main) {
    const authorization = document.createElement("section") as HTMLElement;
    authorization.setAttribute("class", "authorization");
    const forma = document.createElement("div") as HTMLDivElement;
    forma.className = "auth_form";
    const title = document.createElement("p") as HTMLElement;
    title.innerHTML = "Войти";
    authorization.append(title);
    forma.innerHTML = `
      <input id="auth_email" type="email" placeholder="Введите Ваш Email" required>
      <input id="auth_pass" type="password" placeholder="Введите пароль" required>
      <span id="auth_msg"></span>
      <button class="login_button" type="submit" name="form_auth_submit">Войти</button>
      <button class="signup_button" type="submit" name="form_auth_submit">Зарегистрироваться</button>
    `;
    authorization.append(forma);
    document.body.append(authorization);
    const signupButton = document.querySelector(
      ".signup_button"
    ) as HTMLButtonElement;
    signupButton.addEventListener("click", () => {
      this.signup(authorization, forma, title, main);
    });
    const logBtn = document.querySelector(".login_button") as HTMLButtonElement;
    logBtn.addEventListener("click", () => {
      const user = this.readData();
      this.signIn(user, authorization, main);
    });
  }
  signup(
    authorization: HTMLElement,
    forma: HTMLDivElement,
    title: HTMLElement,
    main: Main
  ) {
    authorization.innerHTML = "";
    title.innerHTML = "Зарегистрироваться";
    forma.innerHTML = `
      <input id="auth_email" type="email" placeholder="Введите Ваш Email" required>
      <input id="auth_name" type="name" placeholder="Введите имя" required>
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
  public createUser(user: iUser, authorization: HTMLElement, main: Main): void {
    this.api.createUser(user).then((resp: string) => {
      if (resp === "Успешно") {
        this.signIn(user, authorization, main);
      } else {
        const msg: HTMLSpanElement | null = document.querySelector("#auth_msg");
        if (msg) msg.innerHTML = resp;
      }
    });
  }
  public signIn(user: iUser, authorization: HTMLElement, main: Main): void {
    this.api.signIn(user).then((res: iAuthResp) => {
      if (res.message === "Authenticated") {
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("token", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
        authorization.style.display = "none";
        main.auth(res.name);
      } else {
        const msg: HTMLSpanElement | null = document.querySelector("#auth_msg");
        if (msg) msg.innerHTML = res.message;
      }
    });
  }
}

export default Authorization;
