import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';

type info = {
  count:number;
  pages:number;
  next: string;
  prev: string|null;
}

type character = {
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
}

type apiResult = {
  info: info,
  results: character[]
};

const fetchCharacters = async (page=2) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
  const result:apiResult = await response.json();
  return result;
}

const loadCharacters = createServerFn({
  method:'GET'
}).handler(async () => await fetchCharacters());

export const Route = createFileRoute('/rick-morty')({
  component: RickMortyPage,
  loader: async () => loadCharacters()
});

function RickMortyPage() {
  const data:apiResult = Route.useLoaderData();
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log('DATA: ',data);
  return(
    <section>
      {data.results.map((character:character) => (
        <div key={character.id}>
          <h1>{character.name}</h1>
        </div>
      ))}
      {data.info.prev && <span>Previous</span>}
      {data.info.next && <span>Next</span>}
    </section>
  );
}
