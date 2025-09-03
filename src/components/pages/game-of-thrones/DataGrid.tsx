import { FC } from "react";
import {  got_characters } from "@/types";
import { Link } from "@tanstack/react-router";

type Props = {
    data: any;
};

const DataGrid:FC<Props> = ({data}) => {
    return(
        <>
        {/* Grid Area To Show Characters */}
      <section className="grid grid-cols-4 gap-x-5 gap-y-10 mt-5 mx-10">
        {data.map((character: got_characters) => (
          <div
            key={character.id}
            className=" rounded overflow-hidden shadow-2xl"
          >
            <img
              src={character.imageUrl}
              alt="Character Image"
              className="rounded-t-md w-full h-[30vh] object-center"
            />
            <Link to="/game-of-thrones/$id" params={{ id: character.id.toString() }}><h3 className="px-6 pt-2 pb-2 cursor-pointer">{character.fullName}</h3></Link>
          </div>
        ))}
      </section>
        </>
    );
}

export default DataGrid;