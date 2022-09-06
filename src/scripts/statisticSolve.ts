import Api from "./api";
const api = new Api();
import UserWords from "./userWords";
const userWords = new UserWords();

export class Statistic {
  async CreateStatistic(
    month: string,
    day: string,
    neWords: unknown[],
    percentOfTruth: Array<string>,
    lengthOfTruth: string,
    nameOfGame: string
  ) {
    const userUid = localStorage.getItem("userId");
    function createResult(
      learnedWords: number,
      month: string,
      day: string,
      per: unknown[] | undefined,
      per1: unknown[] | undefined,
      sprintNeWords: unknown[],
      sprintPercentOfTruth: Array<string>,
      sprintLengthOfTruth: string,
      audiocallNeWords: unknown[],
      audiocallPercentOfTruth: Array<string>,
      audiocallLengthOfTruth: string
    ) {
      const datas = {
        learnedWords: learnedWords,
        optional: {
          month: month,
          day: day,
          sprint: {
            neWords: sprintNeWords,
            percentOfTruth: sprintPercentOfTruth,
            lengthOfTruth: sprintLengthOfTruth,
            per: per,
            per1: per1,
          },

          audiocall: {
            neWords: audiocallNeWords,
            percentOfTruth: audiocallPercentOfTruth,
            lengthOfTruth: audiocallLengthOfTruth,
          },
        },
      };
      console.log(datas.optional.sprint.per);
      return datas;
    }
    let getStatistic;
    const learnedArray = await userWords.getUserWordsLikeArray();
    const learnedWord = learnedArray.filter(
      (item) => item.date == `${day}.${month}`
    );
    const learnedWord1 = learnedWord.filter((item) => item.isLearned == true);

    const learnedWords = learnedWord1.length;

    try {
      await api.refreshToken(userUid);
      getStatistic = await api.takeStatistic(userUid);
    } catch (e) {
      const datas =
        nameOfGame == "audiocall"
          ? createResult(
              learnedWords,
              month,
              day,
              [],
              [],
              [],
              [],
              "",
              neWords,
              percentOfTruth,
              lengthOfTruth
            )
          : createResult(
              learnedWords,
              month,
              day,
              [],
              [],
              neWords,
              percentOfTruth,
              lengthOfTruth,
              [],
              [],
              ""
            );
      console.log(1);
      await api.transferData(userUid, datas);
      console.log("hi");
    }
    if (
      month != getStatistic?.optional.month ||
      day != getStatistic.optional.day
    ) {
      let count = getStatistic?.optional.sprint.per;
      if (count) {
        count?.push([neWords]);
      } else {
        count = [];
        count.push([neWords]);
      }
      let count1 = getStatistic?.optional.sprint.per1;
      if (count1) {
        count1?.push(learnedWords);
      } else {
        count1 = [];
        count1.push(learnedWords);
      }

      try {
        const datas =
          nameOfGame == "audiocall"
            ? createResult(
                learnedWords,
                month,
                day,
                count,
                count1,
                [],
                [],
                "",
                neWords,
                percentOfTruth,
                lengthOfTruth
              )
            : createResult(
                learnedWords,
                month,
                day,
                count,
                count1,
                neWords,
                percentOfTruth,
                lengthOfTruth,
                [],
                [],
                ""
              );

        await api.transferData(userUid, datas);
      } catch (e) {
        await api.refreshToken(userUid);
        const datas =
          nameOfGame == "audiocall"
            ? createResult(
                learnedWords,
                month,
                day,
                count,
                count1,
                [],
                [],
                "",
                neWords,
                percentOfTruth,
                lengthOfTruth
              )
            : createResult(
                learnedWords,
                month,
                day,
                count,
                count1,
                neWords,
                percentOfTruth,
                lengthOfTruth,
                [],
                [],
                ""
              );
        console.log(3);
        await api.transferData(userUid, datas);
      }
    } else {
      const dataInside =
        nameOfGame == "audiocall"
          ? getStatistic.optional.audiocall.neWords
          : getStatistic.optional.sprint.neWords;
      const count = getStatistic.optional.sprint.per;
      const count1 = getStatistic.optional.sprint.per1;

      let charlie = neWords.concat(count);
      if (count1) {
        count1[count1?.length - 1] = learnedWords;
      }

      charlie = Array.from(charlie);

      const delta = [charlie];

      count?.pop();

      count?.push(delta);

      console.log(`привеЖ${count}`);
      const fullArray = neWords.concat(dataInside);
      const SetNumberOfNew = new Set();
      fullArray.forEach((item) => SetNumberOfNew.add(item));
      const exitFullArrayLengthNewWords = Array.from(SetNumberOfNew);
      const percentTruthInside =
        nameOfGame == "audiocall"
          ? getStatistic.optional.audiocall.percentOfTruth
          : getStatistic.optional.sprint.percentOfTruth;
      const percentArray = percentOfTruth.concat(percentTruthInside);
      const lengthTruthInside =
        nameOfGame == "audiocall"
          ? getStatistic.optional.audiocall.lengthOfTruth
          : getStatistic.optional.sprint.lengthOfTruth;
      const maxLengthTruthInside =
        Number(lengthTruthInside) > Number(lengthOfTruth)
          ? lengthTruthInside
          : lengthOfTruth;
      try {
        console.log(4);
        const datas =
          nameOfGame == "audiocall"
            ? createResult(
                learnedWords,
                month,
                day,
                count,
                count1,
                getStatistic.optional.sprint.neWords,
                getStatistic.optional.sprint.percentOfTruth,
                getStatistic.optional.sprint.lengthOfTruth,
                exitFullArrayLengthNewWords,
                percentArray,
                maxLengthTruthInside
              )
            : createResult(
                learnedWords,
                month,
                day,
                count,
                count1,
                exitFullArrayLengthNewWords,
                percentArray,
                maxLengthTruthInside,
                getStatistic.optional.audiocall.neWords,
                getStatistic.optional.audiocall.percentOfTruth,
                getStatistic.optional.audiocall.lengthOfTruth
              );

        await api.transferData(userUid, datas);
      } catch (e) {
        console.log(5);
        await api.refreshToken(userUid);
        const datas =
          nameOfGame == "audiocall"
            ? createResult(
                learnedWords,
                month,
                day,
                count,
                count1,
                getStatistic.optional.sprint.neWords,
                getStatistic.optional.sprint.percentOfTruth,
                getStatistic.optional.sprint.lengthOfTruth,
                exitFullArrayLengthNewWords,
                percentArray,
                maxLengthTruthInside
              )
            : createResult(
                learnedWords,
                month,
                day,
                count,
                count1,
                exitFullArrayLengthNewWords,
                percentArray,
                maxLengthTruthInside,
                getStatistic.optional.audiocall.neWords,
                getStatistic.optional.audiocall.percentOfTruth,
                getStatistic.optional.audiocall.lengthOfTruth
              );

        await api.transferData(userUid, datas);
      }

      // const dataInside = getStatistic.optional.neWords;
    }
    console.log(await api.takeStatistic(userUid));
    console.log(await userWords.getUserWordsLikeArray());
  }

  async StatProcess() {
    this.drawStat();
    const statPage = document.querySelector(".statPage") as HTMLElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
    const canvas3 = document.getElementById("canvas3") as HTMLCanvasElement;
    const canvas4 = document.getElementById("canvas4") as HTMLCanvasElement;
    const canvas5 = document.getElementById("canvas5") as HTMLCanvasElement;
    const userUid = localStorage.getItem("userId");
    const statistic = await api.takeStatistic(userUid);
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D | null;
    const ctx2 = canvas2?.getContext("2d") as CanvasRenderingContext2D | null;
    const ctx3 = canvas3?.getContext("2d") as CanvasRenderingContext2D | null;
    const ctx4 = canvas4?.getContext("2d") as CanvasRenderingContext2D | null;
    const ctx5 = canvas5?.getContext("2d") as CanvasRenderingContext2D | null;
    const infoInside = document.querySelector(".info_inside") as HTMLElement;
    const infoInside2 = document.querySelector(".info_inside2") as HTMLElement;
    const infoInside3 = document.querySelector(".info_inside3") as HTMLElement;
    let fullAnswer = 0;
    statPage.classList.remove("hidden");

    if (statistic) {
      const color = ["red", "green", "yellow"];
      let trueAnswers = statistic.optional.audiocall.percentOfTruth.reduce(
        (a, b) => Number(a) + Number(b),
        Number("0")
      );
      if (Number(statistic.optional.audiocall.percentOfTruth.length) > 0) {
        trueAnswers =
          trueAnswers /
          Number(statistic.optional.audiocall.percentOfTruth.length);
      }

      fullAnswer = trueAnswers;

      const data = [
        Number(statistic.optional.audiocall.neWords.length),
        Number(trueAnswers) * 10,
        Number(statistic.optional.audiocall.lengthOfTruth) * 10,
      ];
      for (let i = 0; i < data.length; i++) {
        if (ctx) {
          ctx.fillStyle = color[i];
        }
        const dp = data[i];
        ctx?.fillRect(40 + i * 100, 460 - dp * 5, 50, dp * 5);
      }
      const labels = [
        `${statistic.optional.audiocall.neWords.length}`,
        `${Number(trueAnswers)}`,
        `${Number(statistic.optional.audiocall.lengthOfTruth)}`,
      ];

      infoInside.innerHTML = `<div class="inside_color_first">количество новых слов за день:${labels[0]}</div>
    <div class="inside_color_second">процент правильных ответов:${labels[1]}</div>
    <div class="inside_color_third">самая длинная серия правильных ответов:${labels[2]}</div>`;
    }
    if (statistic) {
      const color = ["red", "green", "yellow"];
      let trueAnswers = statistic.optional.sprint.percentOfTruth.reduce(
        (a, b) => Number(a) + Number(b),
        Number("0")
      );
      if (Number(statistic.optional.sprint.percentOfTruth.length) > 0) {
        trueAnswers =
          trueAnswers / Number(statistic.optional.sprint.percentOfTruth.length);
      }
      if (fullAnswer != undefined) {
        fullAnswer = (fullAnswer + trueAnswers) / 2;
      }

      const data = [
        Number(statistic.optional.sprint.neWords.length),
        Number(trueAnswers) * 10,
        Number(statistic.optional.sprint.lengthOfTruth) * 10,
      ];
      for (let i = 0; i < data.length; i++) {
        if (ctx2) {
          ctx2.fillStyle = color[i];
        }
        const dp = data[i];
        ctx2?.fillRect(40 + i * 100, 460 - dp * 5, 50, dp * 5);
      }
      const labels = [
        `${statistic.optional.sprint.neWords.length}`,
        `${Number(trueAnswers)}`,
        `${Number(statistic.optional.sprint.lengthOfTruth)}`,
      ];

      infoInside2.innerHTML = `<div class="inside_color_first">количество новых слов за день:${labels[0]}</div>
    <div class="inside_color_second">процент правильных ответов:${labels[1]}</div>
    <div class="inside_color_third">самая длинная серия правильных ответов:${labels[2]}</div>`;
    }
    if (statistic) {
      const kraken = new Set();
      const firstKraken = statistic.optional.sprint.neWords;
      const secondKraken = statistic.optional.audiocall.neWords;
      firstKraken.forEach((item) => kraken.add(item));
      secondKraken.forEach((item) => kraken.add(item));
      const color = ["red", "green", "yellow"];
      let trueAnswers = 0;
      if (
        statistic.optional.sprint.neWords.length > 0 &&
        statistic.optional.audiocall.neWords.length > 0
      ) {
        trueAnswers = fullAnswer;
      }
      if (
        statistic.optional.sprint.neWords.length > 0 &&
        statistic.optional.audiocall.neWords.length == 0
      ) {
        const truth = statistic.optional.sprint.percentOfTruth.reduce(
          (a, b) => Number(a) + Number(b),
          Number("0")
        );

        trueAnswers =
          truth / Number(statistic.optional.sprint.percentOfTruth.length);
      }
      if (
        statistic.optional.sprint.neWords.length == 0 &&
        statistic.optional.audiocall.neWords.length > 0
      ) {
        const truth = statistic.optional.audiocall.percentOfTruth.reduce(
          (a, b) => Number(a) + Number(b),
          Number("0")
        );
        trueAnswers =
          truth / Number(statistic.optional.audiocall.percentOfTruth.length);
      }

      const data = [
        Number(kraken.size),
        Number(trueAnswers) * 10,
        Number(statistic.learnedWords) * 10,
      ];
      for (let i = 0; i < data.length; i++) {
        if (ctx3) {
          ctx3.fillStyle = color[i];
        }
        const dp = data[i];
        ctx3?.fillRect(40 + i * 100, 460 - dp * 5, 50, dp * 5);
      }
      const labels = [
        `${Number(kraken.size)}`,
        `${Number(trueAnswers)}`,
        `${Number(statistic.learnedWords)}`,
      ];

      infoInside3.innerHTML = `<div class="inside_color_first">количество новых слов за день:${labels[0]}</div>
    <div class="inside_color_second">процент правильных ответов:${labels[1]}</div>
    <div class="inside_color_third">количество изученных слов за день:${labels[2]}</div>`;
    }
    if (statistic) {
      const color = "green";
      const datok: unknown[] | undefined = statistic.optional.sprint.per;
      const data = [];
      if (datok) {
        for (let i = 0; i < datok?.length; i++) {
          const qwerty = datok[i];
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const bravo = qwerty.flat(Infinity);
          const charlee = new Set();
          for (let j = 0; j < bravo.length; j++) {
            charlee.add(bravo[j]);
          }
          data.push(charlee.size);
        }
      }

      for (let i = 0; i < data.length; i++) {
        ctx4?.fillText(String(data[i]), 50 + i * 100, 475);
      }
      for (let i = 0; i < data.length; i++) {
        if (ctx4) {
          ctx4.fillStyle = color;
        }
        const dp = data[i];
        ctx4?.fillRect(1 + (i + 1) * 8, 460 - dp * 5, 10, dp * 10);
      }

      // eslint-disable-next-line no-inner-declarations, @typescript-eslint/no-explicit-any
      function addToElem(elem: string, data: any[]) {
        const elemInDom = document.querySelector(elem);
        if (!elemInDom) return;
        data.forEach((item: string, index) => {
          const div = document.createElement("div");
          div.innerHTML = `День ${index + 1}:${item}`;
          elemInDom.append(div);
        });
      }

      addToElem(".info_inside4", data);
    }
    if (statistic) {
      const color = "red";

      const data: unknown[] | undefined = statistic.optional.sprint.per1;

      if (data) {
        for (let i = 0; i < data.length; i++) {
          ctx5?.fillText(String(data[i]), 50 + i * 100, 475);
        }
        for (let i = 0; i < data.length; i++) {
          if (ctx5) {
            ctx5.fillStyle = color;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const dp = Number(data[i] > 7)
            ? (Number(data[i]) + 1) * 5
            : (Number(data[i]) + 1) * 10;
          console.log(dp);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ctx5?.fillRect(1 + (i + 1) * 8, 460 - (dp + 1) * 5, 10, dp * 300);
        }
      }

      // eslint-disable-next-line no-inner-declarations, @typescript-eslint/no-explicit-any
      function addToElem(elem: string, data: unknown[] | undefined) {
        const elemInDom = document.querySelector(elem);
        if (!elemInDom) return;
        data?.forEach((item, index: number) => {
          const div = document.createElement("div");
          div.innerHTML = `День ${index + 1}:${item}`;
          elemInDom.append(div);
        });
      }

      addToElem(".info_inside5", data);
    }
  }

  drawStat() {
    const can_text: HTMLDivElement | null = document.querySelector(".can_text");
    if (can_text) can_text.innerHTML = "Краткосрочная статистика(Мини-Игры)";

    const can_text_Add: HTMLDivElement | null =
      document.querySelector(".can_text_Add");
    if (can_text_Add)
      can_text_Add.innerHTML = "Долгосрочная статистика статистика(Мини-Игры)";

    const stat_audiocall: HTMLDivElement | null =
      document.querySelector(".stat_audiocall");
    if (stat_audiocall) stat_audiocall.innerHTML = "Аудиовызов";

    const stat_sprint: HTMLDivElement | null =
      document.querySelector(".stat_sprint");
    if (stat_sprint) stat_sprint.innerHTML = "Спринт";

    const stat_words: HTMLDivElement | null =
      document.querySelector(".stat_words");
    if (stat_words) stat_words.innerHTML = "По словам";

    const stat_new: HTMLDivElement | null = document.querySelector(".stat_new");
    if (stat_new) stat_new.innerHTML = "Новые слова";

    const stat_learned: HTMLDivElement | null =
      document.querySelector(".stat_learned");
    if (stat_learned) stat_learned.innerHTML = "Изученные слова";
  }
}
