import Sprint from "./sprint";

export default class App {
  public start(): void {
    const sprintBtn: HTMLButtonElement | null =
      document.querySelector("#btn_sprint");
    sprintBtn?.addEventListener("click", (): void => {
      const sprint = new Sprint();
      sprint.start();
    });
  }
}
