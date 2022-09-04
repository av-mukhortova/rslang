import Api from "./api";
import { iArray } from "../types/index";
const api = new Api();
import { CreateStatistic } from "./statisticSolve";
import UserWords from "./userWords";

export class AudioCall {
  groupList: number;
  pageList: number;
  wordChange: number;
  isPlayed: boolean;
  trueAnswersArr: Array<iArray>;
  falseAnswersArr: Array<iArray>;
  userWords: UserWords;
  constructor() {
    this.groupList = 0;
    this.pageList = 0;
    this.wordChange = 0;
    this.isPlayed = false;
    this.trueAnswersArr = [];
    this.falseAnswersArr = [];
    this.userWords = new UserWords();
  }
  async start() {
    this.groupList = 9;
    this.pageList = getRandom(31);
    this.wordChange = getRandom(11);

    const starterPack = document.querySelector(".starter_pack") as HTMLElement;
    starterPack.classList.remove("hidden");
    const btnStartLevel = document.querySelectorAll(
      ".btn_start_level"
    ) as NodeListOf<Element>;
    btnStartLevel.forEach((item) => {
      item.addEventListener("click", async () => {
        if (!this.isPlayed) {
          this.isPlayed = true;
          this.groupList = Number(item.getAttribute("level"));
          starterPack.classList.add("hidden");
          audiocallPage.classList.remove("hidden");

          const fullDatas: iArray = await search(
            String(this.groupList),
            String(this.pageList),
            this.wordChange
          );
          fullDatas.AudioM.play();
          element1.innerHTML = `1.${fullDatas.Arr[0]}`;
          element2.innerHTML = `2.${fullDatas.Arr[1]}`;
          element3.innerHTML = `3.${fullDatas.Arr[2]}`;
          element4.innerHTML = `4.${fullDatas.Arr[3]}`;
          element5.innerHTML = `5.${fullDatas.Arr[4]}`;
          wordMain.innerHTML = fullDatas.Word;
          pictureParametres.src = fullDatas.imgMessage;
          this.wordChange++;
          this.continue(fullDatas);
        }
      });
    });
  }
  async startFromBook(groupSet: number, randPage: number) {
    this.groupList = groupSet;
    this.pageList = randPage;
    console.log(randPage);
    const book = document.querySelector(".bookPage") as HTMLElement;
    book.classList.add("hidden");
    const audiocallPage = document.querySelector(
      ".audocallPage"
    ) as HTMLElement;
    audiocallPage.classList.remove("hidden");
    const fullDatas: iArray = await search(
      String(this.groupList),
      String(this.pageList),
      this.wordChange
    );
    fullDatas.AudioM.play();
    audiocallPage.classList.remove("hidden");
    element1.innerHTML = fullDatas.Arr[0];
    element2.innerHTML = fullDatas.Arr[1];
    element3.innerHTML = fullDatas.Arr[2];
    element4.innerHTML = fullDatas.Arr[3];
    element5.innerHTML = fullDatas.Arr[4];
    wordMain.innerHTML = fullDatas.Word;
    pictureParametres.src = fullDatas.imgMessage;
    this.wordChange++;
    this.continue(fullDatas);
  }
  continue(fullDatas: iArray) {
    this.trueAnswersArr = [];
    this.falseAnswersArr = [];
    const seriesArray: Array<number> = [];
    let seriesNumber = 0;
    document.querySelector(".press_element")?.addEventListener("click", () => {
      fullDatas.AudioM.play();
    });
    [
      element1,
      element2,
      element3,
      element4,
      element5,
      pressElementAlternate,
    ].forEach((item) => {
      item.addEventListener("click", async () => {
        [element1, element2, element3, element4, element5].forEach((item) => {
          item.setAttribute("disabled", "disabled");
        });
        if (item.innerHTML.split(".")[1] == fullDatas.wordTrans) {
          this.trueAnswersArr.push(fullDatas);
          wordCharacter.style.backgroundColor = "green";
          seriesNumber++;
          this.userWords.addProgress(fullDatas.wordId, true, "audiocall");
        } else {
          this.falseAnswersArr.push(fullDatas);
          seriesArray.push(seriesNumber);
          seriesNumber = 0;
          wordCharacter.style.backgroundColor = "red";
          this.userWords.addProgress(fullDatas.wordId, false, "audiocall");
        }
        pressElementNext.classList.remove("hidden");
        pressElementAlternate.classList.add("hidden");
        wordMain.classList.remove("hidden");
        pictureElement.classList.remove("hidden");
      });
    });
    document.addEventListener("keydown", async (event) => {
      if (event.code == "Digit1") {
        event.preventDefault();
        if (element1.innerHTML.split(".")[1] == fullDatas.wordTrans) {
          this.trueAnswersArr.push(fullDatas);
          seriesNumber++;
          wordCharacter.style.backgroundColor = "green";
          this.userWords.addProgress(fullDatas.wordId, true, "audiocall");
        } else {
          wordCharacter.style.backgroundColor = "red";
          this.falseAnswersArr.push(fullDatas);
          seriesArray.push(seriesNumber);
          seriesNumber = 0;
          this.userWords.addProgress(fullDatas.wordId, false, "audiocall");
        }
        pressElementNext.classList.remove("hidden");
        pressElementAlternate.classList.add("hidden");
        wordMain.classList.remove("hidden");
        pictureElement.classList.remove("hidden");
        [element1, element2, element3, element4, element5].forEach((item) => {
          item.setAttribute("disabled", "disabled");
        });
      }
      if (event.code == "Digit2") {
        event.preventDefault();
        if (element2.innerHTML.split(".")[1] == fullDatas.wordTrans) {
          this.trueAnswersArr.push(fullDatas);
          seriesNumber++;
          wordCharacter.style.backgroundColor = "green";
          this.userWords.addProgress(fullDatas.wordId, true, "audiocall");
        } else {
          wordCharacter.style.backgroundColor = "red";
          this.falseAnswersArr.push(fullDatas);
          seriesArray.push(seriesNumber);
          seriesNumber = 0;
          this.userWords.addProgress(fullDatas.wordId, false, "audiocall");
        }
        pressElementNext.classList.remove("hidden");
        pressElementAlternate.classList.add("hidden");
        wordMain.classList.remove("hidden");
        pictureElement.classList.remove("hidden");
        [element1, element2, element3, element4, element5].forEach((item) => {
          item.setAttribute("disabled", "disabled");
        });
      }
      if (event.code == "Digit3") {
        event.preventDefault();
        if (element3.innerHTML.split(".")[1] == fullDatas.wordTrans) {
          this.trueAnswersArr.push(fullDatas);
          seriesNumber++;
          wordCharacter.style.backgroundColor = "green";
          this.userWords.addProgress(fullDatas.wordId, true, "audiocall");
        } else {
          wordCharacter.style.backgroundColor = "red";
          this.falseAnswersArr.push(fullDatas);
          seriesArray.push(seriesNumber);
          seriesNumber = 0;
          this.userWords.addProgress(fullDatas.wordId, false, "audiocall");
        }
        pressElementNext.classList.remove("hidden");
        pressElementAlternate.classList.add("hidden");
        wordMain.classList.remove("hidden");
        pictureElement.classList.remove("hidden");
        [element1, element2, element3, element4, element5].forEach((item) => {
          item.setAttribute("disabled", "disabled");
        });
      }
      if (event.code == "Digit4") {
        event.preventDefault();
        if (element4.innerHTML.split(".")[1] == fullDatas.wordTrans) {
          this.trueAnswersArr.push(fullDatas);
          seriesNumber++;
          wordCharacter.style.backgroundColor = "green";
          this.userWords.addProgress(fullDatas.wordId, true, "audiocall");
        } else {
          wordCharacter.style.backgroundColor = "red";
          this.falseAnswersArr.push(fullDatas);
          seriesArray.push(seriesNumber);
          seriesNumber = 0;
          this.userWords.addProgress(fullDatas.wordId, false, "audiocall");
        }
        pressElementNext.classList.remove("hidden");
        pressElementAlternate.classList.add("hidden");
        wordMain.classList.remove("hidden");
        pictureElement.classList.remove("hidden");
        [element1, element2, element3, element4, element5].forEach((item) => {
          item.setAttribute("disabled", "disabled");
        });
      }
      if (event.code == "Digit5") {
        event.preventDefault();
        if (element5.innerHTML.split(".")[1] == fullDatas.wordTrans) {
          this.trueAnswersArr.push(fullDatas);
          seriesNumber++;
          wordCharacter.style.backgroundColor = "green";
          this.userWords.addProgress(fullDatas.wordId, true, "audiocall");
        } else {
          wordCharacter.style.backgroundColor = "red";
          this.falseAnswersArr.push(fullDatas);
          seriesArray.push(seriesNumber);
          seriesNumber = 0;
          this.userWords.addProgress(fullDatas.wordId, false, "audiocall");
        }
        pressElementNext.classList.remove("hidden");
        pressElementAlternate.classList.add("hidden");
        wordMain.classList.remove("hidden");
        pictureElement.classList.remove("hidden");
        [element1, element2, element3, element4, element5].forEach((item) => {
          item.setAttribute("disabled", "disabled");
        });
      }
      if (event.code == "Space") {
        event.preventDefault();
        if (pressElementNext.classList.contains("hidden")) {
          wordCharacter.style.backgroundColor = "red";
          this.userWords.addProgress(fullDatas.wordId, false, "audiocall");
          pressElementAlternate.innerHTML.split(".")[1] == fullDatas.wordTrans
            ? this.trueAnswersArr.push(fullDatas)
            : this.falseAnswersArr.push(fullDatas);
          seriesArray.push(seriesNumber);
          seriesNumber = 0;
          pressElementNext.classList.remove("hidden");
          pressElementAlternate.classList.add("hidden");
          wordMain.classList.remove("hidden");
          pictureElement.classList.remove("hidden");
          [element1, element2, element3, element4, element5].forEach((item) => {
            item.setAttribute("disabled", "disabled");
          });
        } else {
          fullDatas = await search(
            String(this.groupList),
            String(this.pageList),
            this.wordChange
          );
          wordCharacter.style.backgroundColor = "transparent";
          wordMain.classList.add("hidden");
          pressElementNext.classList.add("hidden");
          pressElementAlternate.classList.remove("hidden");
          pictureElement.classList.add("hidden");
          element1.innerHTML = `1.${fullDatas.Arr[0]}`;
          element2.innerHTML = `2.${fullDatas.Arr[1]}`;
          element3.innerHTML = `3.${fullDatas.Arr[2]}`;
          element4.innerHTML = `4.${fullDatas.Arr[3]}`;
          element5.innerHTML = `5.${fullDatas.Arr[4]}`;
          wordMain.innerHTML = fullDatas.Word;
          pictureParametres.src = fullDatas.imgMessage;

          [element1, element2, element3, element4, element5].forEach((item) => {
            item.removeAttribute("disabled");
          });
          const array3 = this.trueAnswersArr.concat(this.falseAnswersArr);
          console.log(array3.length);
          if (array3.length < 10) {
            fullDatas.AudioM.play();
            this.wordChange++;
          } else {
            seriesArray.push(seriesNumber);
            const newWordArray = [];
            for (let i = 0; i < array3.length; i++) {
              newWordArray.push(array3[i].Word);
            }

            seriesNumber = 0;
            const date = new Date();
            const percArray = [String(this.trueAnswersArr.length)];
            const maxSize = Math.max.apply(null, seriesArray);
            const day = String(date.getDate());
            const month = String(date.getMonth());

            CreateStatistic(
              month,
              day,
              newWordArray,
              percArray,
              String(maxSize),
              "audiocall"
            );

            const Charlee = document.createElement("div");
            const foxtrot = document.createElement("div");
            foxtrot.classList.add("remove_item");
            winElement.appendChild(foxtrot);
            foxtrot.appendChild(Charlee);

            Charlee.innerHTML = `Количество ${
              this.trueAnswersArr.length * 10
            }%`;
            finishElement.classList.remove("hidden");
            this.trueAnswersArr.forEach((item) => {
              const Eco = document.createElement("div");
              const Bravo = document.createElement("span");
              const Delta = document.createElement("img");
              foxtrot.appendChild(Eco);
              Eco.appendChild(Bravo);
              Eco.appendChild(Delta);
              Delta.src = "https://i.ibb.co/j55JQNJ/73675.png";
              Delta.classList.add("small_img_size");
              Delta.setAttribute("word_ident", `${item.Word}`);

              Bravo.classList.add("win_show");
              Bravo.innerHTML = `${item.Word}-${item.wordTrans}`;
            });
            const Charlee1 = document.createElement("div");
            const foxtrot1 = document.createElement("div");
            foxtrot1.classList.add("remove_item");
            winWrong.appendChild(foxtrot1);
            foxtrot1.appendChild(Charlee1);

            Charlee1.innerHTML = `Количество ${
              this.falseAnswersArr.length * 10
            }%`;
            this.falseAnswersArr.forEach((item) => {
              const Eco = document.createElement("div");
              const Bravo = document.createElement("span");
              const Delta = document.createElement("img");

              foxtrot1.appendChild(Eco);
              Eco.classList.add("win_show");
              Eco.appendChild(Bravo);
              Eco.appendChild(Delta);
              Delta.src = "https://i.ibb.co/j55JQNJ/73675.png";
              Delta.classList.add("small_img_size");
              Delta.setAttribute("word_ident", `${item.Word}`);
              Bravo.innerHTML = `${item.Word}-${item.wordTrans}`;
            });
            const smallImgSize = document.querySelectorAll(
              ".small_img_size"
            ) as NodeListOf<Element>;
            smallImgSize.forEach((item) => {
              item.addEventListener("click", () => {
                for (let i = 0; i < this.trueAnswersArr.length; i++) {
                  if (
                    item.getAttribute("word_ident") ==
                    this.trueAnswersArr[i].Word
                  ) {
                    this.trueAnswersArr[i].AudioM.play();
                  }
                }
                for (let i = 0; i < this.falseAnswersArr.length; i++) {
                  if (
                    item.getAttribute("word_ident") ==
                    this.falseAnswersArr[i].Word
                  ) {
                    this.falseAnswersArr[i].AudioM.play();
                  }
                }
              });
            });
          }
        }
      }
    });
    pressElementNext?.addEventListener("click", async () => {
      fullDatas = await search(
        String(this.groupList),
        String(this.pageList),
        this.wordChange
      );
      fullDatas.AudioM.play();
      wordCharacter.style.backgroundColor = "transparent";
      wordMain.classList.add("hidden");
      pressElementNext.classList.add("hidden");
      pressElementAlternate.classList.remove("hidden");
      pictureElement.classList.add("hidden");
      element1.innerHTML = `1.${fullDatas.Arr[0]}`;
      element2.innerHTML = `2.${fullDatas.Arr[1]}`;
      element3.innerHTML = `3.${fullDatas.Arr[2]}`;
      element4.innerHTML = `4.${fullDatas.Arr[3]}`;
      element5.innerHTML = `5.${fullDatas.Arr[4]}`;
      wordMain.innerHTML = fullDatas.Word;
      pictureParametres.src = fullDatas.imgMessage;

      [element1, element2, element3, element4, element5].forEach((item) => {
        item.removeAttribute("disabled");
      });
      const array3 = this.trueAnswersArr.concat(this.falseAnswersArr);
      console.log(array3.length);
      if (array3.length < 10) {
        this.wordChange++;
      } else {
        seriesArray.push(seriesNumber);
        const newWordArray = [];
        for (let i = 0; i < array3.length; i++) {
          newWordArray.push(array3[i].Word);
        }

        seriesNumber = 0;
        const date = new Date();
        const percArray = [String(this.trueAnswersArr.length)];
        const maxSize = Math.max.apply(null, seriesArray);
        const day = String(date.getDate());
        const month = String(date.getMonth());

        CreateStatistic(
          month,
          day,
          newWordArray,
          percArray,
          String(maxSize),
          "audiocall"
        );

        const Charlee = document.createElement("div");
        const foxtrot = document.createElement("div");
        foxtrot.classList.add("remove_item");
        winElement.appendChild(foxtrot);
        foxtrot.appendChild(Charlee);

        Charlee.innerHTML = `Количество ${this.trueAnswersArr.length * 10}%`;
        finishElement.classList.remove("hidden");
        this.trueAnswersArr.forEach((item) => {
          const Eco = document.createElement("div");
          const Bravo = document.createElement("span");
          const Delta = document.createElement("img");
          foxtrot.appendChild(Eco);
          Eco.appendChild(Bravo);
          Eco.appendChild(Delta);
          Delta.src = "https://i.ibb.co/j55JQNJ/73675.png";
          Delta.classList.add("small_img_size");
          Delta.setAttribute("word_ident", `${item.Word}`);

          Bravo.classList.add("win_show");
          Bravo.innerHTML = `${item.Word}-${item.wordTrans}`;
        });
        const Charlee1 = document.createElement("div");
        const foxtrot1 = document.createElement("div");
        foxtrot1.classList.add("remove_item");
        winWrong.appendChild(foxtrot1);
        foxtrot1.appendChild(Charlee1);

        Charlee1.innerHTML = `Количество ${this.falseAnswersArr.length * 10}%`;
        this.falseAnswersArr.forEach((item) => {
          const Eco = document.createElement("div");
          const Bravo = document.createElement("span");
          const Delta = document.createElement("img");

          foxtrot1.appendChild(Eco);
          Eco.classList.add("win_show");
          Eco.appendChild(Bravo);
          Eco.appendChild(Delta);
          Delta.src = "https://i.ibb.co/j55JQNJ/73675.png";
          Delta.classList.add("small_img_size");
          Delta.setAttribute("word_ident", `${item.Word}`);
          Bravo.innerHTML = `${item.Word}-${item.wordTrans}`;
        });
        const smallImgSize = document.querySelectorAll(
          ".small_img_size"
        ) as NodeListOf<Element>;
        smallImgSize.forEach((item) => {
          item.addEventListener("click", () => {
            for (let i = 0; i < this.trueAnswersArr.length; i++) {
              if (
                item.getAttribute("word_ident") == this.trueAnswersArr[i].Word
              ) {
                this.trueAnswersArr[i].AudioM.play();
              }
            }
            for (let i = 0; i < this.falseAnswersArr.length; i++) {
              if (
                item.getAttribute("word_ident") == this.falseAnswersArr[i].Word
              ) {
                this.falseAnswersArr[i].AudioM.play();
              }
            }
          });
        });
      }
    });

    exit.addEventListener("click", async () => {
      window.location.reload();
    });
    again?.addEventListener("click", async () => {
      const randWord = getRandom(11);
      const randPage = getRandom(31);
      this.pageList = randPage;
      this.wordChange = randWord;
      fullDatas = await search(
        String(this.groupList),
        String(this.pageList),
        this.wordChange
      );
      this.trueAnswersArr = [];
      this.falseAnswersArr = [];
      element1.innerHTML = fullDatas.Arr[0];
      element2.innerHTML = fullDatas.Arr[1];
      element3.innerHTML = fullDatas.Arr[2];
      element4.innerHTML = fullDatas.Arr[3];
      element5.innerHTML = fullDatas.Arr[4];
      wordMain.innerHTML = fullDatas.Word;
      pictureParametres.src = fullDatas.imgMessage;
      pressElementNext.classList.add("hidden");
      pressElementAlternate.classList.remove("hidden");
      wordMain.classList.add("hidden");
      pictureElement.classList.add("hidden");
      finishElement.classList.add("hidden");
      const Eco = document.querySelectorAll(
        ".remove_item"
      ) as NodeListOf<Element>;

      Eco.forEach((item) => (item.outerHTML = "<div></div>"));
      this.wordChange++;
      [element1, element2, element3, element4, element5].forEach((item) => {
        item.removeAttribute("disabled");
      });
    });
  }
}
async function search(group: string, page: string, wordChange: number) {
  const resultArr = await api.getWords(group, page);
  console.log(resultArr);
  const AudioMessage = resultArr[wordChange]["audio"];
  const AudioM: HTMLAudioElement = new Audio(
    `https://react-learnwords-example.herokuapp.com/${AudioMessage}`
  );
  const imgMessage = `https://react-learnwords-example.herokuapp.com/${resultArr[wordChange]["image"]}`;

  const Arr: string[] = [];
  while (Arr.length < 5) {
    const rand = Math.floor(Math.random() * resultArr.length);
    const rValue = resultArr[rand]["wordTranslate"];
    if (
      rValue != resultArr[wordChange]["wordTranslate"] &&
      !Arr.includes(rValue)
    ) {
      Arr.push(rValue);
    }
  }
  const wordTrans = resultArr[wordChange]["wordTranslate"];
  const randTrue = Math.floor(Math.random() * Arr.length);
  Arr[randTrue] = resultArr[wordChange]["wordTranslate"];
  const word = resultArr[wordChange]["word"];
  const wordId = resultArr[wordChange].id;

  return {
    AudioM: AudioM,
    imgMessage: imgMessage,
    Arr: Arr,
    Word: word,
    wordTrans: wordTrans,
    wordId: wordId,
  };
}
const element1 = document.getElementById("element1") as HTMLElement;
const element2 = document.getElementById("element2") as HTMLElement;
const element3 = document.getElementById("element3") as HTMLElement;
const element4 = document.getElementById("element4") as HTMLElement;
const element5 = document.getElementById("element5") as HTMLElement;
const exit = document.getElementById("Exit") as HTMLElement;
const again = document.getElementById("Again") as HTMLElement;
const pressElementAlternate = document.querySelector(
  ".press_element_alternate"
) as HTMLElement;
const pressElementNext = document.querySelector(
  ".press_element_next"
) as HTMLElement;
const audiocallPage = document.querySelector(".audiocall") as HTMLElement;
const pictureElement = document.querySelector(
  ".picture_element"
) as HTMLElement;
const wordMain = document.querySelector(".word_main") as HTMLElement;
const winElement = document.querySelector(".win_element") as HTMLElement;
const winWrong = document.querySelector(".win_wrong") as HTMLElement;
const finishElement = document.querySelector(".finish_element") as HTMLElement;
const wordCharacter = document.querySelector(".word_character") as HTMLElement;
const pictureParametres = document.querySelector(
  ".picture_parametres"
) as HTMLImageElement;
function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}
