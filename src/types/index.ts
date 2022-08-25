export interface iWord {
  id: number;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}
export interface iPair {
  word: string;
  translate: string;
  isCorrect: boolean;
  transcription: string;
  audio: string;
  wordTranslate: string;

}

export interface iArray {
  AudioM: HTMLAudioElement;
  imgMessage: string;
  Arr: string[];
  Word: string;
  wordTrans: string;
}
