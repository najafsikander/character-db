
import { useSuspenseQuery } from "@tanstack/react-query";

import { useState } from "react";
import { apiResult,filters, showFilterFields } from "@/types";
// import { fetchCharacters } from "@/services/rickMorty";
import CharacterForm from "./pages/rickMorty/Form";
import DataGrid from "./pages/rickMorty/DataGrid";

type Props = {
  title: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchCharacters: (page: number, filters: filters) => Promise<any>;
  displayFilterField: showFilterFields;
};

const Characters: React.FC<Props> = ({ title, currentPage, setCurrentPage, fetchCharacters, displayFilterField }) => {
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
      <h1 className="mt-10 mb-3">{title}</h1>
      {/* Form Area */}
      <section className="w-full flex flex-row justify-center mx-10 px-10 py-2 mt-5 mb-5">
        <CharacterForm setCurrentPage={setCurrentPage} setFilters={setFilters} displayFilterField={displayFilterField} />
      </section>

      <DataGrid data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Characters;
