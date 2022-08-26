import Api from "./api";
import { iArray } from "../types/index";
const api = new Api();

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

  return {
    AudioM: AudioM,
    imgMessage: imgMessage,
    Arr: Arr,
    Word: word,
    wordTrans: wordTrans,
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
const pictureParametres = document.querySelector(
  ".picture_parametres"
) as HTMLImageElement;
function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}
export async function process() {
  const groupList = 0;
  const randWord = getRandom(11);
  const randPage = getRandom(31);
  const pageList = randPage;
  let wordChange = randWord;
  let trueAnswersArr: Array<iArray> = [];
  let falseAnswersArr: Array<iArray> = [];

  let fullDatas = await search(String(groupList), String(pageList), wordChange);
  document.querySelector("#btn_audiocall")?.addEventListener("click", () => {
    audiocallPage.classList.remove("hidden");
    element1.innerHTML = fullDatas.Arr[0];
    element2.innerHTML = fullDatas.Arr[1];
    element3.innerHTML = fullDatas.Arr[2];
    element4.innerHTML = fullDatas.Arr[3];
    element5.innerHTML = fullDatas.Arr[4];
    wordMain.innerHTML = fullDatas.Word;
    pictureParametres.src = fullDatas.imgMessage;
  });
  document.querySelector(".press_element")?.addEventListener("click", () => {
    fullDatas.AudioM.play();
  });

  [element1, element2, element3, element4, element5].forEach((item) => {
    item.addEventListener("click", async () => {
      [element1, element2, element3, element4, element5].forEach((item) => {
        item.setAttribute("disabled", "disabled");
      });
      if (item.innerHTML == fullDatas.wordTrans) {
        trueAnswersArr.push(fullDatas);
      } else {
        falseAnswersArr.push(fullDatas);
      }
      const array3 = trueAnswersArr.concat(falseAnswersArr);
      console.log(array3.length);
      if (array3.length < 10) {
        wordChange++;
      } else {
        const Charlee = document.createElement("div");
        winElement.appendChild(Charlee);
        Charlee.innerHTML = `Количество ${trueAnswersArr.length}`;
        finishElement.classList.remove("hidden");
        trueAnswersArr.forEach((item) => {
          const Eco = document.createElement("div");
          const Bravo = document.createElement("span");
          const Delta = document.createElement("img");
          winElement.appendChild(Eco);
          Eco.appendChild(Bravo);
          Eco.appendChild(Delta);
          Delta.src = "https://i.ibb.co/j55JQNJ/73675.png";
          Delta.classList.add("small_img_size");
          Delta.setAttribute("word_ident", `${item.Word}`);
          winElement.appendChild(Bravo);
          Bravo.classList.add("win_show");
          Bravo.innerHTML = `${item.Word}-${item.wordTrans}`;
        });
        const Charlee1 = document.createElement("div");
        winWrong.appendChild(Charlee1);
        Charlee1.innerHTML = `Количество ${falseAnswersArr.length}`;
        falseAnswersArr.forEach((item) => {
          const Eco = document.createElement("div");
          const Bravo = document.createElement("span");
          const Delta = document.createElement("img");

          winWrong.appendChild(Eco);
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
            for (let i = 0; i < trueAnswersArr.length; i++) {
              if (item.getAttribute("word_ident") == trueAnswersArr[i].Word) {
                trueAnswersArr[i].AudioM.play();
              }
            }
            for (let i = 0; i < falseAnswersArr.length; i++) {
              if (item.getAttribute("word_ident") == falseAnswersArr[i].Word) {
                falseAnswersArr[i].AudioM.play();
              }
            }
          });
        });
      }
      pressElementNext.classList.remove("hidden");
      pressElementAlternate.classList.add("hidden");
      wordMain.classList.remove("hidden");
      pictureElement.classList.remove("hidden");
    });
  });
  pressElementNext?.addEventListener("click", async () => {
    fullDatas = await search(String(groupList), String(pageList), wordChange);
    wordMain.classList.add("hidden");
    pressElementNext.classList.add("hidden");
    pressElementAlternate.classList.remove("hidden");
    pictureElement.classList.add("hidden");
    element1.innerHTML = fullDatas.Arr[0];
    element2.innerHTML = fullDatas.Arr[1];
    element3.innerHTML = fullDatas.Arr[2];
    element4.innerHTML = fullDatas.Arr[3];
    element5.innerHTML = fullDatas.Arr[4];
    wordMain.innerHTML = fullDatas.Word;
    pictureParametres.src = fullDatas.imgMessage;

    [element1, element2, element3, element4, element5].forEach((item) => {
      item.removeAttribute("disabled");
    });
  });
  pressElementAlternate?.addEventListener("click", () => {
    wordMain.classList.remove("hidden");
    pressElementNext.classList.remove("hidden");
    pressElementAlternate.classList.add("hidden");
    pictureElement.classList.remove("hidden");
    [element1, element2, element3, element4, element5].forEach((item) => {
      item.setAttribute("disabled", "disabled");
    });
    falseAnswersArr.push(fullDatas);

    const array3 = trueAnswersArr.concat(falseAnswersArr);

    if (array3.length < 10) {
      wordChange++;
    } else {
      const Charlee = document.createElement("div");
      winElement.appendChild(Charlee);
      Charlee.innerHTML = `Количество ${trueAnswersArr.length}`;
      finishElement.classList.remove("hidden");
      trueAnswersArr.forEach((item) => {
        const Eco = document.createElement("div");
        const Bravo = document.createElement("span");
        const Delta = document.createElement("img");
        winElement.appendChild(Eco);
        Eco.appendChild(Bravo);
        Eco.appendChild(Delta);
        Delta.src = "https://i.ibb.co/j55JQNJ/73675.png";
        Delta.classList.add("small_img_size");
        Delta.setAttribute("word_ident", `${item.Word}`);
        winElement.appendChild(Bravo);
        Bravo.classList.add("win_show");
        Bravo.innerHTML = `${item.Word}-${item.wordTrans}`;
      });
      const Charlee1 = document.createElement("div");
      winWrong.appendChild(Charlee1);
      Charlee1.innerHTML = `Количество ${falseAnswersArr.length}`;
      falseAnswersArr.forEach((item) => {
        const Eco = document.createElement("div");
        const Bravo = document.createElement("span");
        const Delta = document.createElement("img");

        winWrong.appendChild(Eco);
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
          for (let i = 0; i < trueAnswersArr.length; i++) {
            if (item.getAttribute("word_ident") == trueAnswersArr[i].Word) {
              trueAnswersArr[i].AudioM.play();
            }
          }
          for (let i = 0; i < falseAnswersArr.length; i++) {
            if (item.getAttribute("word_ident") == falseAnswersArr[i].Word) {
              falseAnswersArr[i].AudioM.play();
            }
          }
        });
      });
    }
  });
  exit.addEventListener("click", async () => {
    window.location.reload();
  });
  again.addEventListener("click", async () => {
    fullDatas = await search(String(groupList), String(pageList), wordChange);
    trueAnswersArr = [];
    falseAnswersArr = [];
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
    [element1, element2, element3, element4, element5].forEach((item) => {
      item.removeAttribute("disabled");
    });
  });
}
