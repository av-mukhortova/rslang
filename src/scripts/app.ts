import Sprint from "./sprint";

export default class App {
  public start(): void {
    const sprint = new Sprint();
    const sprintBtn: HTMLButtonElement | null =
      document.querySelector("#btn_sprint");
    sprintBtn?.addEventListener("click", (): void => {
      sprint.start();
    });
  }
}
