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
  }
}

export default Authorization;
