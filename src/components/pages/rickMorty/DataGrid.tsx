import { FC } from "react";
import { character } from "@/types";
import { Link } from "@tanstack/react-router";

type Props = {
    detailUrl:string;
    data: any;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const DataGrid:FC<Props> = ({data,currentPage,setCurrentPage,detailUrl}) => {

  const maleAvatar:string = "https://cdn5.vectorstock.com/i/1000x1000/98/49/avatar-men-icon-on-a-white-background-vector-31979849.jpg";
  const femaleAvatar:string = "https://www.kindpng.com/picc/m/378-3783625_avatar-woman-blank-avatar-icon-female-hd-png.png";
  const items = data.data || data.results;
  const links = data.links || data.info;
  const finalDetailUrl = `/${detailUrl}/$id`;

    console.log("Data in DataGrid: ", data, items);
    return(
        <>
        {/* Grid Area To Show Characters */}
      <section className="grid grid-cols-4 gap-x-5 gap-y-10 mt-5 mx-10">
        {items.map((character: character) => (
          <div
            key={character.id}
            className=" rounded overflow-hidden shadow-2xl"
          >
            <img
              src={character.image ? character.image : (character.gender === "Male" ? maleAvatar : femaleAvatar)}
              alt="Character Image"
              className="rounded-t-md w-full"
            />
            <Link to={finalDetailUrl} params={{ id: character.id.toString() }}><h3 className="px-6 pt-2 pb-2 cursor-pointer">{character.name}</h3></Link>
          </div>
        ))}
      </section>
      <div className="w-screen flex flex-row justify-around px-10 py-2 mt-5 mb-5">
        <button
          className={`w-[10rem] border border-white rounded py-1 px-4 ${!links.prev ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!links.prev}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className={`w-[10rem] border border-white rounded py-1 px-4 ${!links.next ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!links.next}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
        </>
    );
}

export default DataGrid;