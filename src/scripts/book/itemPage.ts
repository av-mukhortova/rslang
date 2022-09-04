import { iWord } from "../../types/index";
import constants from "../../constants";
import "../../assets/styles/bookStyle/itemPage.scss";

class ItemPage {
  create(data: iWord, group: string) {
    if (group === "6") {
      return `
      <div class="item-page page-${group}" id="${data.id}">
        <div class="item-page__images">
          <img src="${constants.URL}/${data.image}" alt="foto">
        </div>
        <div class="item-page__texts">
          <div class="item-page__en">
            <h4>"${data.word}"</h4>
            <p>Transcription: <b>"${data.transcription}"</b></p>
            <p>${data.textExample}</p>
            <p>${data.textMeaning}</p>
          </div>
          <div class="item-page__ru">
            <p>Перевод: <b>${data.wordTranslate}</b></p>
            <p>${data.textExampleTranslate}</p>
            <p>${data.textMeaningTranslate}</p>
          </div>
          <button class="item-page__voce" id="${data.audio}-${data.audioExample}-${data.audioMeaning}">Озвучить <img src="https://www.imagehousing.com/images/2022/08/31/volium.png"/></button>
        </div>
      </div>
    `;
    } else {
      return `
        <div class="item-page page-${group}" id="${data.id}">
          <div class="item-page__images">
            <img src="${constants.URL}/${data.image}" alt="foto">
          </div>
          <div class="item-page__texts">
            <div class="item-page__en">
              <h4>"${data.word}"</h4>
              <p>Transcription: <b>"${data.transcription}"</b></p>
              <p>${data.textExample}</p>
              <p>${data.textMeaning}</p>
            </div>
            <div class="item-page__ru">
              <p>Перевод: <b>${data.wordTranslate}</b></p>
              <p>${data.textExampleTranslate}</p>
              <p>${data.textMeaningTranslate}</p>
            </div>
            <button class="item-page__voce" id="${data.audio}-${data.audioExample}-${data.audioMeaning}">Озвучить <img src="https://www.imagehousing.com/images/2022/08/31/volium.png"/></button>
          </div>
          <div class="item-page__authorized">
            <button class="item-page__studi">Изученно</button>
            <button class="item-page__difficult">Сложные <img src="https://www.imagehousing.com/images/2022/08/31/checked.png"/></button>
            <button class="item-page__difficult-delete" style="display: none;">Сложные <img src="https://i.ibb.co/28QgS5c/delete.png" alt="delete"></button>
            <div class="item-page__progress_marks">
              <p class="item-page__progress"><img src="./assets/img/check.png" width="20" height="20" alt="correct">${data.progress}</p>
              <p class="item-page__errors"><img src="./assets/img/close.png" width="20" height="20" alt="errors">${data.errors}</p>
            </div>
          </div>
        </div>
      `;
    }
  }
}

export default ItemPage;
