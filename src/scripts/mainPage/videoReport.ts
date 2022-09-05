import "../../assets/styles/mainPage/vidoBlock.scss";

class VideoReport {
  create(): HTMLElement {
    const shadow = document.createElement("div") as HTMLElement;
    const container = document.createElement("div") as HTMLElement;
    const title = document.createElement("h2") as HTMLElement;

    shadow.setAttribute("class", "main__video-shadow");
    container.setAttribute("class", "container");

    title.textContent = "О предложении";
    container.append(title);
    container.innerHTML += `
    <iframe class="video" width="860" height="515" src="https://www.youtube.com/embed/weVihUfo7iA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
    shadow.append(container);
    return shadow;
  }
}

export default VideoReport;
