
import { useSuspenseQuery } from "@tanstack/react-query";

import { useState } from "react";
import { apiResult,filters } from "@/types";
import { fetchCharacters } from "@/services/rickMorty";
import CharacterForm from "./Form";
import DataGrid from "./DataGrid";

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Characters: React.FC<Props> = ({ currentPage, setCurrentPage }) => {
  const [filters, setFilters] = useState<filters>({});

  

  //Fetching Data Here
  const { data }: { data: apiResult } = useSuspenseQuery({
    queryKey: [
      "characters",
      currentPage,
      filters
    ],
    queryFn: () =>
      fetchCharacters(currentPage, filters),
  });

  

  return (
    <>
      <h1 className="mt-10 mb-3">Rick & Morty Characters</h1>
      {/* Form Area */}
      <section className="w-full flex flex-row justify-center mx-10 px-10 py-2 mt-5 mb-5">
        <CharacterForm setCurrentPage={setCurrentPage} setFilters={setFilters}/>
      </section>

      <DataGrid data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Characters;
