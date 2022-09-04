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
  const userUid = localStorage.getItem("userId");
  const statistic = await api.takeStatistic(userUid);
  const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D | null;
  statPage.addEventListener("click", () => {
    statPage.classList.remove("hidden");
  });
  if (statistic) {
    const color = ["#B8EDFF", "green", "yellow"];
    const trueAnswers = statistic.optional.audiocall.percentOfTruth.reduce(
      (a, b) => a + b,
      "0"
    );
    const data = [
      Number(statistic.optional.audiocall.neWords.length),
      Number(trueAnswers),
    ];
    for (let i = 0; i < data.length; i++) {
      if (ctx) {
        ctx.fillStyle = color[i];
      }
      const labels = [
        `Новые слова ${statistic.optional.audiocall.neWords.length}`,
        `Правильные ответы${Number(trueAnswers) * 10}`,
        "Линия ответов",
      ];

      if (ctx) {
        ctx.fillStyle = "black";
      }
      for (let i = 0; i < labels.length; i++) {
        ctx?.fillText(labels[i], 25 + i * 100, 475);
      }
    }
  }
}
