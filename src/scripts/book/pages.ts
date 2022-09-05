import { iUserWord, iWord } from "../../types/index";
import Api from "../api";
import ItemPage from "./itemPage";
import PaginationItem from "./paginationItem";
import ChechActiv from "./chechActiv";
import CheckWordsOnload from "./checkWordsOnload";
import "../../assets/styles/bookStyle/pages.css";
import Sprint from "../sprint";
import DificaltBook from "./dificaltBook";
import { AudioCall } from "../audiocall";

class Pages {
  page: number;
  dificaltBook: DificaltBook;
  sprint: Sprint;
  api: Api;
  audiocall: AudioCall;

  constructor() {
    this.page = localStorage.getItem("pageBook")
      ? Number(localStorage.getItem("pageBook"))
      : 0;
    this.dificaltBook = new DificaltBook();
    this.sprint = new Sprint();
    this.api = new Api();
    this.audiocall = new AudioCall();
  }

  getWordData(chapters: HTMLElement, group: string) {
    const api = new Api();
    const words = api.getWords(group, `${this.page}`);
    words.then((data: iWord[]) => this.create(chapters, data, group));
  }
  create(chapters: HTMLElement, data: iWord[], group: string) {
    localStorage.setItem("groupBook", group);
    localStorage.setItem("pageBook", `${this.page}`);

    const paginationItem = new PaginationItem(group, this.page);
    const chechActiv = new ChechActiv();
    const checkWordsOnload = new CheckWordsOnload();
    // const gameLink = new GameLink();

    console.log("+++++=====+++++", paginationItem.getWordData());
    paginationItem.getWordData();

    chapters.innerHTML = "";
    const heightBook = window.innerHeight;
    const containerWords = document.createElement("div") as HTMLDivElement;
    const prevBtn = document.createElement("button") as HTMLButtonElement;
    const nextBtn = document.createElement("button") as HTMLButtonElement;
    const words = document.createElement("div") as HTMLDivElement;
    const pageNumber = document.createElement("div") as HTMLDivElement;
    const pagination = document.querySelector(".pagination") as HTMLDivElement;
    pagination.classList.remove("hidden");

    containerWords.setAttribute("class", `container-words`);
    words.setAttribute("class", `words group__${group}`);
    pageNumber.setAttribute("class", "pageNumber");
    prevBtn.setAttribute("id", "prev-btn");
    nextBtn.setAttribute("id", "next-btn");

    if (group === "6") {
      this.dificaltBook.create(chapters, containerWords, words, group);
    } else {
      prevBtn.style.height = `${heightBook}px`;
      nextBtn.style.height = `${heightBook}px`;

      pageNumber.textContent = `${this.page + 1}`;
      const itemPage = new ItemPage();
      data.forEach((el: iWord): void => {
        if (localStorage.getItem("userId")) {
          this.api
            .getUserWordById(localStorage.getItem("userId"), el.id)
            .then((res: iUserWord | null) => {
              if (res) {
                el.progress = res.optional.inProgress
                  ? `${res.optional.inProgress} из 3`
                  : "0 из 3";
                el.errors = !res.optional.errors
                  ? "0"
                  : res.optional.errors.toString();
              } else {
                el.progress = "0 из 3";
                el.errors = "0";
              }
              words.innerHTML += itemPage.create(el, group);
            });
        } else {
          words.innerHTML += itemPage.create(el, group);
        }
      });

      prevBtn.innerHTML = "<";
      nextBtn.innerHTML = ">";

      containerWords.append(prevBtn);
      containerWords.append(nextBtn);
      containerWords.append(words);
      containerWords.append(pageNumber);
      chapters.append(containerWords);

      const wordsNode = document.querySelector(".words") as HTMLElement;
      checkWordsOnload.check(wordsNode, pagination, this.page, group);

      prevBtn.addEventListener("click", (): void => {
        if (this.page > 0) {
          this.page -= 1;
          this.getWordData(chapters, group);
        }
      });
      nextBtn.addEventListener("click", (): void => {
        if (this.page < 29) {
          this.page += 1;
          this.getWordData(chapters, group);
        }
      });
    }
    document.addEventListener("keydown", (event) => {
      if (this.sprint.isKeyUp && this.sprint.isPlaying) {
        if (event.code === "ArrowRight") this.sprint.checkAnswer(true);
        if (event.code === "ArrowLeft") this.sprint.checkAnswer(false);
        this.sprint.isKeyUp = false;
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
        this.sprint.isKeyUp = true;
      }
    });

    pagination.addEventListener("click", (e: Event): void => {
      const idButton = (e.target as HTMLElement).closest(
        "button"
      ) as HTMLElement;
      if (!idButton?.getAttribute("id")) return;
      const page = idButton?.getAttribute("id")?.split("-")[1];
      if (!page) return;
      this.page = +page;
      this.getWordData(chapters, group);
    });
    document.querySelectorAll(".btn_audiocall_book")?.forEach((item) => {
      item.addEventListener("click", async () => {
        const btnAudiocallBook = document.querySelector(".btn_audiocall_book");
        const groupList = Number(btnAudiocallBook?.getAttribute("group_audio"));
        const pageList = Number(btnAudiocallBook?.getAttribute("page_audio"));
        this.audiocall.startFromBook(groupList, pageList);
      });
    });

    const containerWordsClass = document.querySelector(
      ".container-words"
    ) as HTMLElement;
    containerWordsClass?.addEventListener("click", (e: Event): void => {
      // const wordsNode = document.querySelector(".words") as HTMLElement;
      chechActiv.check(e); //, this.page, group, wordsNode, pagination);
    });

    this.check();
  }
  check(): void {
    // const authorizedCheck = true;
    const authorizedBlock: NodeListOf<HTMLElement> | null =
      document.querySelectorAll(".item-page__authorized");
    if (localStorage.getItem("userId")) {
      authorizedBlock.forEach((el) => {
        el?.classList.remove("hidden");
      });
    } else {
      authorizedBlock.forEach((el) => {
        el?.classList.add("hidden");
      });
    }
  }
}

export default Pages;
