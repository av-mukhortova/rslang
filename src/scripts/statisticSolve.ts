import Api from "./api";
const api = new Api();

async function CreateStatistic(
  learnedWords = 0,
  month: string,
  day: string,
  neWords: Array<string>,
  percentOfTruth: string,
  lengthOfTruth: string
) {
  const userUid = localStorage.getItem("userId");
  const datas = {
    learnedWords: learnedWords,
    optional: {
      month: month,
      day: day,
      neWords: neWords,
      percentOfTruth: percentOfTruth,
      lengthOfTruth: lengthOfTruth,
    },
  };
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
      await api.transferData(userUid, datas);
    } catch (e) {
      await api.refreshToken(userUid);
      await api.transferData(userUid, datas);
    }
  } else {
    // const dataInside = getStatistic.optional.neWords;
  }
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
  CreateStatistic(1, "1", "1", ["1"], "1", "1");
}
