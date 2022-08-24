import constants from "../../constants";

class Voses {
  start(paths: HTMLElement) {
    const pathVoces = paths.getAttribute("id")?.split("-");
    let count = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let play = setTimeout(function playToo() {
      if (count === 3) {
        clearTimeout(play);
      }
      const audio = new Audio();
      if (!pathVoces) return;
      audio.src = `${constants.URL}/${pathVoces[count]}`;
      count++;
      audio.autoplay = true;
      audio.addEventListener("ended", function () {
        play = setTimeout(playToo, 1000);
      });
    }, 1000);
  }
}
export default Voses;
