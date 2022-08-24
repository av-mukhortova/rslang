import constants from "../constants";
import { iPair, iWord } from "../types/index";
import Api from "./api";

export default class Sprint {
  api: Api;

  constructor() {
    this.api = new Api();
  }
  public async start(): Promise<void> {
    const level: number = this.askLevel();
    const words: Array<iWord> = await this.getAllWordsOfLevel(level);
    const pairs: Array<iPair> = this.setPairs(words);
    this.drawPlay();
  }
  async getAllWordsOfLevel(group: number): Promise<iWord[]> {
    const res: Array<iWord> = [];
    let page = 0;
    while (page < constants.amountOfLevels - 1) {
      const answer: Array<iWord> = await this.api.getWords(
        group.toString(),
        page.toString()
      );
      answer.forEach((item) => res.push(item));
      page += 1;
    }
    return res;
  }
  private askLevel(): number {
    return 0;
  }
  private setPairs(words: Array<iWord>): Array<iPair> {
    const arr: Array<iPair> = [];
    for (let i = 0; i < words.length; i += 1) {
      const isCorrect: number = this.getRandomNumber(0, 1);
      const wrongIndex: number = this.getRandomNumber(0, words.length - 1);
      const translate: string =
        isCorrect === 1
          ? words[i].wordTranslate
          : words[wrongIndex].wordTranslate;
      const pair: iPair = {
        word: words[i].word,
        translate: translate,
        isCorrect: translate === words[i].wordTranslate,
      };
      arr.push(pair);
    }
    return arr;
  }
  private getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  private drawPlay(): void {
    const mainDiv: HTMLDivElement | null = document.querySelector(".main");
    const sprintDiv: HTMLDivElement | null = document.querySelector(".sprint");
    sprintDiv?.classList.remove("hidden");
    mainDiv?.classList.add("hidden");

    const sprintTimer: HTMLSpanElement = document.createElement("span");
    sprintTimer.innerHTML = constants.timerValue.toString();

    const sprintWord: HTMLSpanElement = document.createElement("span");

    const sprintTranslate: HTMLSpanElement = document.createElement("span");

    const sprintFalseBtn: HTMLButtonElement = document.createElement("button");
    sprintFalseBtn.innerHTML = "Неверно";

    const sprintTrueBtn: HTMLButtonElement = document.createElement("button");
    sprintTrueBtn.innerHTML = "Верно";

    sprintDiv?.append(
      sprintTimer,
      sprintWord,
      sprintTranslate,
      sprintFalseBtn,
      sprintTrueBtn
    );
  }
}
