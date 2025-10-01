export type game = {
  id: number;
  title: string;
  slug?: string;
  thumbnail: string;
  description?: string;
  date?: string;
  letter?: string;
  categories?: string[];
  popular?: boolean;
  lang?: string[];
  gamePath?: string;

};
