export interface Question {
  id: number;
  type: string;
  text: string;
  hint?: string;
  keywords: string[];
}