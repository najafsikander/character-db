
import GridLoader from "@/components/GridLoader";
import Characters from "@/components/Characters";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { fetchCharacters } from "@/services/rickMorty";
import { showFilterFields } from "@/types";

export const Route = createFileRoute("/rick-morty/")({
  component: RickMortyPage,
});

function RickMortyPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const displayFilterField: showFilterFields = {
    name: true,
    status: true,
    specie: true,
    gender: true
  }
  return (
    <Suspense fallback={<GridLoader/>}>
      <Characters title="Rick & Morty Characters" currentPage={currentPage} setCurrentPage={setCurrentPage} fetchCharacters={fetchCharacters} displayFilterField={displayFilterField} />
    </Suspense>
  );
}
