import { useSuspenseQuery } from "@tanstack/react-query";

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

type info = {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
};

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
};

type apiResult = {
  info: info;
  results: character[];
};

const fetchCharacters = async (page = 1) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const result: apiResult = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
  return result;
};

const Characters: React.FC<Props> = ({ currentPage, setCurrentPage }) => {
  const { data }: { data: apiResult } = useSuspenseQuery({
    queryKey: ["characters", currentPage],
    queryFn: () => fetchCharacters(currentPage),
  });
  console.log("DATA: ", data);

  return (
    <section>
        {data.results.map((character: character) => (
          <div key={character.id}>
            <h1>{character.name}</h1>
          </div>
        ))}
        {data.info.prev && (
          <span onClick={() => setCurrentPage(currentPage - 1)}>Previous</span>
        )}
        {data.info.next && (
          <span onClick={() => setCurrentPage(currentPage + 1)}>Next</span>
        )}
      </section>
  );
};

export default Characters;
