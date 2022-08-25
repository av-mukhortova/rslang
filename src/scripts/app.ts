import Sprint from "./sprint";
import Chapter from "./book/chapter";
import { process } from "./audiocall";

export default class App {
  public start(): void {
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
  }
}
