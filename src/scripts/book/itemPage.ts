import { iWord } from "../../types/index";
import constants from "../../constants";
import "../../assets/styles/bookStyle/itemPage.scss";

class ItemPage {
  create(data: iWord, group: string) {
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
            <p>${data.textMeaningTranslate}</p>
            <p>${data.textExampleTranslate}</p>
          </div>
          <button class="item-page__voce" id="${data.audio}-${data.audioExample}-${data.audioMeaning}">Озвучить <img src="https://www.imagehousing.com/images/2022/08/31/volium.png"/></button>
        </div>
        <div class="item-page__authorized">
          <button class="item-page__studi">Изученно</button>
          <button class="item-page__difficult">Сложные слова <img src="https://www.imagehousing.com/images/2022/08/31/checked.png"/></button>
          <button class="item-page__difficult-delete" style="display: none;">Сложные слова -</button>
          <button page_audio=${data.page} group_audio=${data.group} class="btn_audiocall_book">Аудиовызов</button>        
        </div>
      </div>
    `;
  }
}

export default ItemPage;
