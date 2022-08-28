import Sprint from "./sprint";
import Chapter from "./book/chapter";
import Main from "./mainPage/main";
import { process } from "./audiocall";

export default class App {
  public start(): void {
    const main = new Main();
    main.start();
    const sprint = new Sprint();
    const sprintBtn: HTMLButtonElement | null =
      document.querySelector("#btn_sprint");
    sprintBtn?.addEventListener("click", (): void => {
      sprint.start();
    });
    const textbookBtn: HTMLButtonElement | null =
      document.querySelector("#btn_textbook");
    textbookBtn?.addEventListener("click", (): void => {
      const chapter = new Chapter();
      chapter.create();
    });
    const AudioBtn: HTMLButtonElement | null =
      document.querySelector("#btn_audiocall");
    AudioBtn?.addEventListener("click", (): void => {
      process();
    });
    const signBtn: HTMLButtonElement | null =
      document.querySelector("#signup_button");
    signBtn?.addEventListener("click", (): void => {
      alert("Рег");
    });
    const loginBtn: HTMLButtonElement | null =
      document.querySelector("#login_button");
    loginBtn?.addEventListener("click", (): void => {
      alert("Войти");
    });
  }
}
