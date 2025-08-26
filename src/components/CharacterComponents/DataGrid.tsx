import { FC } from "react";
import { character } from "@/types";

type Props = {
    data: any;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const DataGrid:FC<Props> = ({data,currentPage,setCurrentPage}) => {
    return(
        <>
        {/* Grid Area To Show Characters */}
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
        <button
          className={`w-[10rem] border border-white rounded py-1 px-4 ${!data.info.prev ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!data.info.prev}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className={`w-[10rem] border border-white rounded py-1 px-4 ${!data.info.next ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!data.info.next}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
        </>
    );
}

export default DataGrid;