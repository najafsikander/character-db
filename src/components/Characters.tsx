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
    <>
      <h1 className="mt-10 mb-3">Rick & Morty Characters</h1>
      <section className="grid grid-cols-4 gap-x-5 gap-y-10 mt-5">
        {data.results.map((character: character) => (
          <div
            key={character.id}
            className=" rounded overflow-hidden shadow-2xl"
          >
            <img
              src={character.image}
              alt="Character Image"
              className="rounded-t-md w-full"
            />
            <h3 className="px-6 pt-2 pb-2 cursor-pointer">{character.name}</h3>
          </div>
        ))}
      </section>
      <div className="w-screen flex flex-row justify-around px-10 py-2 mt-5 mb-5">
        <button className={`w-[10rem] border border-white rounded py-1 px-4 ${!data.info.prev ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} disabled={!data.info.prev} onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
        </button>
          <button className="w-[10rem] cursor-pointer border border-white rounded py-1 px-4" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
    </>
  );
};

export default Characters;
