
import { useSuspenseQuery } from "@tanstack/react-query";

import { FC } from "react";
import { apiResult } from "@/types";
import { fetchCharacters } from "@/services/game-of-thrones";
import DataGrid from "./DataGrid";



const Characters: FC = () => {

  //Fetching Data Here
  const { data }: { data: apiResult } = useSuspenseQuery({
    queryKey: [
      "charactersGot"
    ],
    queryFn: () => fetchCharacters(),
  });

  

  return (
    <>
      <h1 className="mt-10 mb-3">Game of Thrones Characters</h1>

      <DataGrid data={data}/>
    </>
  );
};

export default Characters;
