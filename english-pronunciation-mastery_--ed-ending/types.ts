
export type Category = '/t/' | '/d/' | '/ɪd/';

export interface ExceptionWord {
  word: string;
  ipa: string;
  meaning: string;
  note: string;
}

export interface MCQQuestion {
  id: number;
  options: string[];
  correctIndex: number;
  level: 'Basic' | 'Advanced';
}

export interface ClassificationWord {
  id: number;
  word: string;
  category: Category;
}

export enum AppTab {
  Theory = 'theory',
  MCQ = 'mcq',
  Classification = 'classification'
}
