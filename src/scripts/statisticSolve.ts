import Api from "./api";
const api = new Api();
import UserWords from "./userWords";
const userWords = new UserWords();

export async function CreateStatistic(
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
            neWords,
            percentOfTruth,
            lengthOfTruth,
            [],
            [],
            ""
          );

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
    } else count = [[neWords]];

    try {
      const datas =
        nameOfGame == "audiocall"
          ? createResult(
              learnedWords,
              month,
              day,
              count,
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
              neWords,
              percentOfTruth,
              lengthOfTruth,
              [],
              [],
              ""
            );

      await api.transferData(userUid, datas);
    }
  } else {
    const dataInside =
      nameOfGame == "audiocall"
        ? getStatistic.optional.audiocall.neWords
        : getStatistic.optional.sprint.neWords;
    const count = getStatistic.optional.sprint.per;

    const charlie = neWords.concat(count);
    const delta = [];
    delta.push(charlie);
    console.log(delta);
    count?.pop();
    count?.push(delta);
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
      const datas =
        nameOfGame == "audiocall"
          ? createResult(
              learnedWords,
              month,
              day,
              delta,
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
              delta,
              exitFullArrayLengthNewWords,
              percentArray,
              maxLengthTruthInside,
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
              [],
              [],
              "",
              exitFullArrayLengthNewWords,
              percentArray,
              maxLengthTruthInside
            )
          : createResult(
              learnedWords,
              month,
              day,
              count,
              exitFullArrayLengthNewWords,
              percentArray,
              maxLengthTruthInside,
              [],
              [],
              ""
            );

      await api.transferData(userUid, datas);
    }

    // const dataInside = getStatistic.optional.neWords;
  }
  console.log(await api.takeStatistic(userUid));
  console.log(await userWords.getUserWordsLikeArray());
}

export async function StatProcess() {
  const statPage = document.querySelector(".statPage") as HTMLElement;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
  const canvas3 = document.getElementById("canvas3") as HTMLCanvasElement;
  const userUid = localStorage.getItem("userId");
  const statistic = await api.takeStatistic(userUid);
  const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D | null;
  const ctx2 = canvas2?.getContext("2d") as CanvasRenderingContext2D | null;
  const ctx3 = canvas3?.getContext("2d") as CanvasRenderingContext2D | null;
  const infoInside = document.querySelector(".info_inside") as HTMLElement;
  const infoInside2 = document.querySelector(".info_inside2") as HTMLElement;
  const infoInside3 = document.querySelector(".info_inside3") as HTMLElement;
  let fullAnswer: number | undefined;
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
    console.log(fullAnswer);
    const data = [
      Number(statistic.optional.audiocall.neWords.length),
      Number(trueAnswers),
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
      Number(trueAnswers) * 3,
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
    const color = ["red", "green", "yellow"];
    const trueAnswers = fullAnswer;
    const data = [
      Number(statistic.optional.sprint.neWords.length) +
        Number(statistic.optional.audiocall.neWords.length),
      Number(trueAnswers) * 3,
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
      `${statistic.optional.sprint.neWords.length}`,
      `${Number(trueAnswers)}`,
      `${Number(statistic.learnedWords)}`,
    ];

    infoInside3.innerHTML = `<div class="inside_color_first">количество новых слов за день:${labels[0]}</div>
    <div class="inside_color_second">процент правильных ответов:${labels[1]}</div>
    <div class="inside_color_third">количество изученных слов за день:${labels[2]}</div>`;
  }
}
