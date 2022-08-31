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
export interface iUser {
  id: string;
  name: string;
  email: string;
  password: string;
}
export interface iAuthResp {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
export interface iStatistics {
  learnedWords: number;
  optional: {
    month: string;
    day: string;
    sprint: {
      neWords: unknown[];
      percentOfTruth: Array<string>;
      lengthOfTruth: string;
    };
    audiocall: {
      neWords: unknown[];
      percentOfTruth: Array<string>;
      lengthOfTruth: string;
    };
  };
}
export interface iUserWord {
  id: string;
  difficulty: string;
  optional: {
    isLearned: boolean;
    isNew: boolean;
  };
  isLearned?: boolean;
  isNew?: boolean;
}
export type justObject = {
  [key: string]: string;
};
