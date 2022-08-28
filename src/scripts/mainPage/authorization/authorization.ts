import "../../../assets/styles/mainPage/authorization.css";

class Authorization {
  create() {
    const authorization = document.createElement("section") as HTMLElement;
    authorization.setAttribute("class", "authorization");
    const forma = document.createElement("form") as HTMLFormElement;
    const title = document.createElement("p") as HTMLElement;
    title.innerHTML = "Войти";
    authorization.append(title);
    forma.innerHTML = `
      <input type="email" name="auth_email" placeholder="Введите Ваш Email" required>
      <input type="password" name="auth_pass" placeholder="Введите пароль" required>
      <button class="login_button" type="submit" name="form_auth_submit">Войти</button>
      <button class="signup_button" type="submit" name="form_auth_submit">Зарегистрироваться</button>
    `;
    authorization.append(forma);
    document.body.append(authorization);
    const signupButton = document.querySelector(
      ".signup_button"
    ) as HTMLButtonElement;
    signupButton.addEventListener("click", () => {
      console.log(signupButton);
      this.signup(authorization, forma, title);
    });
  }
  signup(
    authorization: HTMLElement,
    forma: HTMLFormElement,
    title: HTMLElement
  ) {
    authorization.innerHTML = "";
    title.innerHTML = "Зарегистрироваться";
    forma.innerHTML = `
      <input type="email" name="auth_email" placeholder="Введите Ваш Email" required>
      <input type="name" name="auth_name" placeholder="Введите имя" required>
      <input type="password" name="auth_pass" placeholder="Введите пароль" required>
      <button class="signup_button" type="submit" name="form_auth_submit">Зарегистрироваться</button>
    `;
    authorization.append(title);
    authorization.append(forma);
    const signupButton = document.querySelector(
      ".signup_button"
    ) as HTMLButtonElement;
    signupButton.addEventListener("click", () => {
      console.log(signupButton);
      authorization.style.display = "none";
    });
  }
}

export default Authorization;
