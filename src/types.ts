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
  origin: {
    name:string;
    url:string;
  };
  location: {
    name:string;
    url:string;
  };
  image: string;
  episode: string[];
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

export type episode = {
  id: number;
  name: string;
  air_date: string;
  season: string;
  episode: string;
  characters: string[];
  url: string;
  wiki_url: string;
  created: string;
  created_at: string;
  description: string;
  thumbnail_url: string;
}

export type got_characters = {
  id:number;
  firstName:string;
  lastName:string;
  fullName:string;
  title:string;
  family:string;
  image:string;
  imageUrl:string;
}

export type continent = {
  id: number;
  name: string;
}

export type got_apiResult = {
  data: got_characters[];
}

export type showFilterFields = {
  name: boolean;
  status: boolean;
  specie: boolean;
  gender: boolean;
}

export type southParkCharacter = {
  id: number;
  name: string;
  sex: string;
  age: number;
  hair_color: string;
  occupation: string;
  first_appearance: string;
  image: string;
}

export type links = {
  first: string;
  last: string;
  next: string;
  prev: string | null;
};

export type meta = {
  current_page: number;
  from: number;
  last_page: number;
}

export type southPark_apiResult = {
  links: links;
  meta: meta;
  results: southParkCharacter[];
};