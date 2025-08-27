import Characters from "@/routes/rick-morty/Components/Characters";
import GridLoader from "@/components/GridLoader";
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
