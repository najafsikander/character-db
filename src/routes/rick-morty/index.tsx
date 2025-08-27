
import GridLoader from "@/components/GridLoader";
import Characters from "@/components/pages/rickMorty/Characters";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/rick-morty/")({
  component: RickMortyPage,
});

function RickMortyPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <Suspense fallback={<GridLoader/>}>
      <Characters currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Suspense>
  );
}
