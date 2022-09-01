import Api from "./api";
const api = new Api();

export async function CreateStatistic(
  learnedWords = 0,
  month: string,
  day: string,
  neWords: unknown[],
  percentOfTruth: Array<string>,
  lengthOfTruth: string,
  nameOfGame: string
) {
  console.log(learnedWords);
  console.log(month);
  console.log(day);
  console.log(neWords);
  console.log(percentOfTruth);
  console.log(lengthOfTruth);
  console.log(nameOfGame);

  const userUid = localStorage.getItem("userId");
  function createResult(
    learnedWords: number,
    month: string,
    day: string,
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
        },

        audiocall: {
          neWords: audiocallNeWords,
          percentOfTruth: audiocallPercentOfTruth,
          lengthOfTruth: audiocallLengthOfTruth,
        },
      },
    };
    return datas;
  }
  let getStatistic;
  try {
    getStatistic = await api.takeStatistic(userUid);
  } catch (e) {
    await api.refreshToken(userUid);
    getStatistic = await api.takeStatistic(userUid);
  }
  if (
    !getStatistic ||
    month != getStatistic.optional.month ||
    day != getStatistic.optional.day
  ) {
    try {
      const datas =
        nameOfGame == "audiocall"
          ? createResult(
              learnedWords,
              month,
              day,
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
              neWords,
              percentOfTruth,
              lengthOfTruth,
              [],
              [],
              ""
            );

      await api.transferData(userUid, datas);
      console.log(await api.takeStatistic(userUid));
    }
  } else {
    const dataInside =
      nameOfGame == "audiocall"
        ? getStatistic.optional.audiocall.neWords
        : getStatistic.optional.sprint.neWords;
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
      lengthTruthInside > lengthOfTruth ? lengthTruthInside : lengthOfTruth;
    try {
      const datas =
        nameOfGame == "audiocall"
          ? createResult(
              learnedWords,
              month,
              day,
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
}

export function StatProcess() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D | null;
  const data = [10, 53];
  const color = ["#B8EDFF", "green"];

  for (let i = 0; i < data.length; i++) {
    if (ctx) {
      ctx.fillStyle = color[i];
    }
    const dp = data[i];
    ctx?.fillRect(40 + i * 100, 460 - dp * 5, 50, dp * 5);
  }
  const labels = ["Новые слова", "Правильные ответы"];

  if (ctx) {
    ctx.fillStyle = "black";
  }
  for (let i = 0; i < labels.length; i++) {
    ctx?.fillText(labels[i], 25 + i * 100, 475);
  }
  CreateStatistic(1, "2", "1", ["7"], ["4"], "1", "audiocall");
}
