export type info = {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
};

export type character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  episodes: string[];
  url: string;
  created: string;
};

export type apiResult = {
  info: info;
  results: character[];
};

export type filters = {
    name?: string | null,
    status?: string | null,
    specie?: string | null,
    gender?: string | null
}