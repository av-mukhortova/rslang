export interface iWord {
  id: string;
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
  progress?: string;
  errors?: string;
}
export interface iPair {
  wordId: string;
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
  wordId: string;
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
      per: unknown[] | undefined;
      per1: unknown[] | undefined;
    };
    audiocall: {
      neWords: unknown[];
      percentOfTruth: Array<string>;
      lengthOfTruth: string;
    };
  };
}
export interface iUserWord {
  wordId: string;
  difficulty: string;
  optional: {
    isLearned: boolean;
    isNew: boolean;
    date: string;
    playName: string;
    inProgress: number;
    errors: number;
  };
  isLearned?: boolean;
  isNew?: boolean;
  date?: string;
  playName?: string;
  inProgress?: number;
}
export type justObject = {
  [key: string]: string;
};
