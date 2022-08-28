import Header from "./header";

class Main {
  start() {
    const header = new Header();
    const body = document.querySelector("body") as HTMLElement;
    body.prepend(header.start());
  }
}

export default Main;
