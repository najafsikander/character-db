import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useState } from 'react';

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

const fetchCharacters = async (page=1) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
  const result:apiResult = await response.json();
  return result;
}

// const loadCharacters = createServerFn({
//   method: 'GET'
// }).handler(async (page: number = 1) => await fetchCharacters(page));

export const Route = createFileRoute('/rick-morty')({
  component: RickMortyPage,
  // loader: async () => loadCharacters(1)
});

function RickMortyPage() {
  // const data:apiResult = Route.useLoaderData();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {data}:{data:apiResult} = useSuspenseQuery({
    queryKey:['characters',currentPage],
    queryFn: () => fetchCharacters(currentPage)
  })
  console.log('DATA: ',data);
  return(
    <section>
      <Suspense fallback={<div>Loading characters....</div>}>
        {data.results.map((character:character) => (
        <div key={character.id}>
          <h1>{character.name}</h1>
        </div>
      ))}
      {data.info.prev && <span onClick={() => setCurrentPage(currentPage - 1)}>Previous</span>}
      {data.info.next && <span onClick={() => setCurrentPage(currentPage + 1)}>Next</span>}
      </Suspense>
    </section>
  );
}
