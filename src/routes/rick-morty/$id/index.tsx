import SingleEpisode from "@/components/pages/rickMorty/Details/SingleEpisode";
import { fetchCharacterById } from "@/services/rickMorty";
import { character } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

export const Route = createFileRoute("/rick-morty/$id/")({
  loader: async ({ params: { id } }) => {
    const character: character = await fetchCharacterById(id);
    return { id, character };
  },
  component: SingleCharacter,
});
function SingleCharacter() {
  const { character } = Route.useLoaderData();

  const aliveIcon = (
    <span className="text-[20px] drop-shadow-lg drop-shadow-green-300">🟢</span>
  );
  const deadIcon = (
    <span className="text-[20px] drop-shadow-lg drop-shadow-red-300">🔴</span>
  );
  return (
    <>
      <section className="w-[60%] border border-white rounded mx-auto my-10 flex shadow-2xl">
        <div className="flex-1">
          <img
            src={character.image}
            alt={character.name}
            className="rounded-tl-md rounded-bl-md w-full h-full"
          />
        </div>
        <div className="flex-2">
          <section className="flex justify-start items-center h-full px-5 py-5">
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-3">
              {/* Name, Gender & Status */}
              <div className="text-3xl font-bold flex gap-3 text-balance items-end">
                <span className="underline">{character.name}</span>{" "}
                {character.gender === "Male" ? (
                  <BsGenderMale />
                ) : (
                  <BsGenderFemale />
                )}
                {character.status === "Alive" ? aliveIcon : deadIcon}
              </div>
              {/* Species */}
              <h3>Species: {character.species}</h3>
              {/* Origin */}
              <h3>Origin: {character.origin.name.toString()}</h3>
              {/* Location */}
              <h3>Location: {character.location.name.toString()}</h3>
              {/* Episodes Count */}
              <h3>Episodes Count: {character.episode.length}</h3>
              {/* Created At */}
              <h3>
                Created At: {new Date(character.created).toLocaleDateString()}
              </h3>
            </div>
          </section>
        </div>
      </section>

      {/* Display Episodes */}
      {character && character.episode && character.episode.length > 0 && (
        <section className="w-[60%] rounded mx-auto my-10 flex flex-col shadow-2xl">
          <h1>Episodes list</h1>
          <section className="flex flex-col gap-3 p-5">
            {character.episode.map((ep, index) => (
              <div key={index}>
                <SingleEpisode url={ep}/>
              </div>
            ))}
          </section>
        </section>
      )}
    </>
  );
}
