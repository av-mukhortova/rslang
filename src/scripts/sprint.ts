import constants from "../constants";
import { iPair, iWord } from "../types/index";
import Api from "./api";
import Chapter from "./book/chapter";

export default class Sprint {
  api: Api;
  pairs: Array<iPair>;
  currentPair: number;
  points: number;
  rightInRow: number;
  koef: number;
  results: Array<iPair>;
  timerId: number;
  isPlaying: boolean;
  isKeyUp: boolean;
  isBook: boolean;
  bookGroup: string;
  bookPage: number;

  constructor() {
    this.api = new Api();
    this.currentPair = 0;
    this.pairs = [];
    this.points = 0;
    this.rightInRow = 0;
    this.koef = 1;
    this.results = [];
    this.timerId = 0;
    this.isPlaying = false;
    this.isKeyUp = true;
    this.isBook = false;
    this.bookGroup = "";
    this.bookPage = 0;
  }

  public start(): void {
    this.resetAll();
    this.askLevel();
  }
  private resetAll() {
    this.currentPair = 0;
    this.pairs = [];
    this.points = 0;
    this.rightInRow = 0;
    this.koef = 1;
    this.results = [];
    this.timerId = 0;
    this.isKeyUp = true;
    this.bookGroup = "";
    this.bookPage = 0;
  }
  private async getAllWordsOfLevel(group: number): Promise<iWord[]> {
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
  private askLevel(): void {
    const mainDiv: HTMLDivElement | null = document.querySelector(".main");
    const levelDiv: HTMLDivElement | null = document.querySelector(".level");
    levelDiv?.classList.remove("hidden");
    mainDiv?.classList.add("hidden");

    const levelDlg: HTMLDivElement | null =
      document.querySelector(".level_dlg");
    levelDlg?.addEventListener("click", (event: MouseEvent): void => {
      const target: HTMLElement = event.target as HTMLElement;
      if (target.tagName.toLowerCase() === "button" && !this.isPlaying) {
        this.isPlaying = true;
        const level = target.dataset.level ? +target.dataset.level : 0;
        this.getAllWordsOfLevel(level).then((words: Array<iWord>) => {
          this.setPairs(words);
          this.shuffle();
          this.drawPlay();
          this.play();
        });
      }
    });
  }
  private setPairs(words: Array<iWord>): void {
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
        transcription: words[i].transcription,
        audio: words[i].audio,
        wordTranslate: words[i].wordTranslate,
      };
      this.pairs.push(pair);
    }
  }
  private getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  private shuffle(): void {
    for (let i = this.pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.pairs[i], this.pairs[j]] = [this.pairs[j], this.pairs[i]];
    }
  }
  private drawPlay(): void {
    const levelDiv: HTMLDivElement | null = document.querySelector(".level");
    levelDiv?.classList.add("hidden");
    const chapterDiv: HTMLDivElement | null = document.querySelector(".book");
    chapterDiv?.classList.add("hidden");

    const sprintDiv: HTMLDivElement | null = document.querySelector(".sprint");
    sprintDiv?.classList.remove("hidden");

    sprintDiv?.replaceChildren();

    const close_btn: HTMLButtonElement | null =
      document.createElement("button");
    close_btn.innerHTML = "Close";
    close_btn.id = "sprint_close";

    const sprint_dlg: HTMLDivElement = document.createElement("div");
    sprint_dlg.className = "sprint_dlg";
    sprintDiv?.append(close_btn, sprint_dlg);

    const header_sprint: HTMLDivElement = document.createElement("div");
    header_sprint.className = "header_sprint";
    const words_sprint: HTMLDivElement = document.createElement("div");
    words_sprint.className = "words_sprint";
    const buttons_sprint: HTMLDivElement = document.createElement("div");
    buttons_sprint.className = "buttons_sprint";

    sprint_dlg.append(header_sprint, words_sprint, buttons_sprint);

    const sprintTimer: HTMLSpanElement = document.createElement("span");
    sprintTimer.innerHTML = constants.timerValue.toString();
    sprintTimer.id = "sprint_timer";

    const rightAnswers: HTMLDivElement = document.createElement("div");

    const sprintPoints: HTMLSpanElement = document.createElement("span");
    sprintPoints.innerHTML = "0";
    sprintPoints.id = "sprint_points";

    header_sprint.append(sprintTimer, rightAnswers, sprintPoints);

    const answer1: HTMLInputElement = document.createElement("input");
    answer1.type = "checkbox";
    answer1.id = "sprint_answer1";
    const answer2: HTMLInputElement = document.createElement("input");
    answer2.type = "checkbox";
    answer2.id = "sprint_answer2";
    const answer3: HTMLInputElement = document.createElement("input");
    answer3.type = "checkbox";
    answer3.id = "sprint_answer3";
    rightAnswers.append(answer1, answer2, answer3);

    const sprintWord: HTMLSpanElement = document.createElement("span");
    sprintWord.id = "sprint_word";

    const sprintTranslate: HTMLSpanElement = document.createElement("span");
    sprintTranslate.id = "sprint_translate";

    words_sprint.append(sprintWord, sprintTranslate);

    const sprintFalseBtn: HTMLButtonElement = document.createElement("button");
    sprintFalseBtn.id = "sprint_false";
    sprintFalseBtn.innerHTML = "◄ Неверно";

    const sprintTrueBtn: HTMLButtonElement = document.createElement("button");
    sprintTrueBtn.id = "sprint_true";
    sprintTrueBtn.innerHTML = "Верно ►";

    buttons_sprint.append(sprintFalseBtn, sprintTrueBtn);
  }
  private play(): void {
    this.currentPair = 0;
    this.changeWord();

    const timer: HTMLSpanElement | null =
      document.querySelector("#sprint_timer");
    if (timer) {
      let timePassed = 0;
      this.timerId = +setInterval(() => {
        timePassed = timePassed += 1;
        if (constants.timerValue - timePassed === 0) {
          clearInterval(this.timerId);
          this.showResults();
        }
        timer.innerHTML = (constants.timerValue - timePassed).toString();
      }, 1000);
    }

    const true_btn: HTMLButtonElement | null =
      document.querySelector("#sprint_true");
    const false_btn: HTMLButtonElement | null =
      document.querySelector("#sprint_false");
    const close_btn: HTMLButtonElement | null =
      document.querySelector("#sprint_close");

    true_btn?.addEventListener("click", (): void => {
      this.checkAnswer(true);
    });
    false_btn?.addEventListener("click", (): void => {
      this.checkAnswer(false);
    });
    close_btn?.addEventListener("click", (): void => {
      this.closeGame();
    });
    document.addEventListener("keydown", (event) => {
      if (this.isPlaying && this.isKeyUp) {
        if (event.code === "ArrowRight") this.checkAnswer(true);
        if (event.code === "ArrowLeft") this.checkAnswer(false);
        this.isKeyUp = false;
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
        this.isKeyUp = true;
      }
    });
  }
  private changeWord() {
    const word: HTMLSpanElement | null = document.querySelector("#sprint_word");
    const translate: HTMLSpanElement | null =
      document.querySelector("#sprint_translate");
    if (word && translate) {
      word.innerHTML = this.pairs[this.currentPair].word;
      translate.innerHTML = this.pairs[this.currentPair].translate;
    }
  }
  public checkAnswer(answer: boolean): void {
    if (answer === this.pairs[this.currentPair].isCorrect) {
      const res: iPair = {
        word: this.pairs[this.currentPair].word,
        translate: this.pairs[this.currentPair].translate,
        isCorrect: true,
        transcription: this.pairs[this.currentPair].transcription,
        audio: this.pairs[this.currentPair].audio,
        wordTranslate: this.pairs[this.currentPair].wordTranslate,
      };
      this.results.push(res);
      this.addPoints();
    } else {
      const res: iPair = {
        word: this.pairs[this.currentPair].word,
        translate: this.pairs[this.currentPair].translate,
        isCorrect: false,
        transcription: this.pairs[this.currentPair].transcription,
        audio: this.pairs[this.currentPair].audio,
        wordTranslate: this.pairs[this.currentPair].wordTranslate,
      };
      this.results.push(res);
      this.rightInRow = 0;
      this.koef = 1;
      this.removeChecks();
    }
    this.currentPair += 1;
    if (this.currentPair === this.pairs.length) {
      clearInterval(this.timerId);
      this.showResults();
    } else {
      this.changeWord();
    }
  }
  private addPoints(): void {
    if (this.rightInRow === 3) {
      this.rightInRow = 0;
      this.koef += 1;
      this.removeChecks();
    }
    this.points += constants.points * this.koef;
    this.rightInRow += 1;
    const pointsSpan: HTMLSpanElement | null =
      document.querySelector("#sprint_points");
    if (pointsSpan) {
      pointsSpan.innerHTML = this.points.toString();
    }
    if (this.rightInRow === 1) {
      const answer1: HTMLInputElement | null =
        document.querySelector("#sprint_answer1");
      if (answer1) answer1.checked = true;
    }
    if (this.rightInRow === 2) {
      const answer2: HTMLInputElement | null =
        document.querySelector("#sprint_answer2");
      if (answer2) answer2.checked = true;
    }
    if (this.rightInRow === 3) {
      const answer3: HTMLInputElement | null =
        document.querySelector("#sprint_answer3");
      if (answer3) answer3.checked = true;
    }
  }
  private showResults() {
    this.isPlaying = false;
    const sprintDiv: HTMLDivElement | null = document.querySelector(".sprint");
    const sprintRes: HTMLDivElement | null =
      document.querySelector(".sprint_results");
    sprintDiv?.classList.add("hidden");
    sprintRes?.classList.remove("hidden");

    sprintRes?.replaceChildren();

    const res_btns: HTMLDivElement = document.createElement("div");
    res_btns.className = "res_btns";
    const close_btn: HTMLButtonElement | null =
      document.createElement("button");
    close_btn.innerHTML = "Close";
    close_btn.id = "result_close";
    const book_btn: HTMLButtonElement | null = document.createElement("button");
    book_btn.innerHTML = "Book";
    book_btn.id = "result_book";
    const try_btn: HTMLButtonElement | null = document.createElement("button");
    try_btn.innerHTML = "Play again";
    try_btn.id = "result_try";
    res_btns.append(close_btn, book_btn, try_btn);

    const table: HTMLTableElement = document.createElement("table");
    sprintRes?.append(table, res_btns);
    const thead: HTMLTableCaptionElement = document.createElement("thead");
    thead.innerHTML = "Результаты";
    const tbody: HTMLElement = document.createElement("tbody");
    table.append(thead, tbody);

    for (let i = 0; i < this.results.length; i += 1) {
      const tr: HTMLTableRowElement | null = document.createElement("tr");
      tbody.appendChild(tr);
      const tdSound: HTMLTableCellElement | null = document.createElement("td");
      const soundBtn: HTMLButtonElement | null =
        document.createElement("button");
      soundBtn.id = this.results[i].word;
      soundBtn.className = "hidden";
      soundBtn.dataset.sound = this.results[i].audio;
      const soundLabel: HTMLLabelElement | null =
        document.createElement("label");
      soundLabel.htmlFor = this.results[i].word;
      const soundImg: HTMLImageElement | null = document.createElement("img");
      soundImg.src = "./assets/img/volume.png";
      soundImg.alt = "sound";
      tdSound.append(soundBtn, soundLabel);
      soundLabel.append(soundImg);
      const tdWord: HTMLTableCellElement | null = document.createElement("td");
      tdWord.appendChild(document.createTextNode(this.results[i].word));
      const tdTrans: HTMLTableCellElement | null = document.createElement("td");
      tdTrans.appendChild(
        document.createTextNode(this.results[i].transcription)
      );
      const tdTransl: HTMLTableCellElement | null =
        document.createElement("td");
      tdTransl.appendChild(
        document.createTextNode(this.results[i].wordTranslate)
      );
      const tdCorrect: HTMLTableCellElement | null =
        document.createElement("td");
      tdCorrect.appendChild(
        document.createTextNode(this.results[i].isCorrect ? "Верно" : "Неверно")
      );
      tr.append(tdSound, tdWord, tdTrans, tdTransl, tdCorrect);
    }

    const sprint_table: HTMLTableElement | null = document.querySelector(
      ".sprint_results table"
    );
    sprint_table?.addEventListener("click", (event: MouseEvent): void => {
      const target: HTMLElement = event.target as HTMLElement;
      const sound: string = target.dataset.sound as string;
      if (sound) {
        const audio = new Audio();
        audio.src = `${constants.URL}/${sound}`;
        audio.autoplay = true;
      }
    });
    const close_res: HTMLButtonElement | null =
      document.querySelector("#result_close");
    close_res?.addEventListener("click", (): void => {
      this.closeResults();
    });
    const restart_res: HTMLButtonElement | null =
      document.querySelector("#result_try");
    restart_res?.addEventListener("click", (): void => {
      const res: HTMLDivElement | null =
        document.querySelector(".sprint_results");
      res?.classList.add("hidden");
      if (this.isBook) {
        this.startFromBook(this.bookGroup, this.bookPage);
      } else {
        this.start();
      }
    });
    const book_res: HTMLButtonElement | null =
      document.querySelector("#result_book");
    book_res?.addEventListener("click", (): void => {
      const book: HTMLDivElement | null = document.querySelector(".book");
      book?.classList.remove("hidden");
      const main: HTMLDivElement | null =
        document.querySelector(".sprint_results");
      main?.classList.add("hidden");
      if (!this.isBook) {
        const chapter = new Chapter();
        chapter.create();
      }
    });
  }
  private removeChecks() {
    const answer1: HTMLInputElement | null =
      document.querySelector("#sprint_answer1");
    if (answer1) answer1.checked = false;
    const answer2: HTMLInputElement | null =
      document.querySelector("#sprint_answer2");
    if (answer2) answer2.checked = false;
    const answer3: HTMLInputElement | null =
      document.querySelector("#sprint_answer3");
    if (answer3) answer3.checked = false;
  }
  private closeGame() {
    clearInterval(this.timerId);
    this.isPlaying = false;
    const sprintDiv: HTMLDivElement | null = document.querySelector(".sprint");
    const main: HTMLDivElement | null = document.querySelector(".main");
    sprintDiv?.classList.add("hidden");
    main?.classList.remove("hidden");
  }
  private closeResults() {
    const resDiv: HTMLDivElement | null =
      document.querySelector(".sprint_results");
    const main: HTMLDivElement | null = document.querySelector(".main");
    resDiv?.classList.add("hidden");
    main?.classList.remove("hidden");
  }
  public startFromBook(group: string, page: number) {
    this.resetAll();
    this.isBook = true;
    this.bookGroup = group;
    this.bookPage = page;
    this.isPlaying = true;
    this.getWordsOfPage(+group, page).then((words: Array<iWord>) => {
      this.setPairs(words);
      if (page > 0) {
        this.getWordsOfPreviousPages(+group, page - 1).then(
          (words: Array<iWord>) => {
            this.setPairs(words);
            this.drawPlay();
            this.play();
          }
        );
      } else {
        this.drawPlay();
        this.play();
      }
    });
  }
  private async getWordsOfPage(group: number, page: number): Promise<iWord[]> {
    const res: Array<iWord> = [];
    const answer: Array<iWord> = await this.api.getWords(
      group.toString(),
      page.toString()
    );
    answer.forEach((item) => res.push(item));
    return res;
  }
  private async getWordsOfPreviousPages(
    group: number,
    page: number
  ): Promise<iWord[]> {
    let currentPage = page;
    const res: Array<iWord> = [];
    while (currentPage >= 0) {
      const answer: Array<iWord> = await this.api.getWords(
        group.toString(),
        currentPage.toString()
      );
      answer.forEach((item) => res.push(item));
      currentPage -= 1;
    }
    return res;
  }
}
