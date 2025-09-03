import { fetchCharacterById } from "@/services/game-of-thrones";
import { got_characters } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game-of-thrones/$id/")({
  loader: async ({ params: { id } }) => {
    const character: got_characters = await fetchCharacterById(id);
    return { id, character };
  },
  component: SingleCharacter,
});

function SingleCharacter() {
  const { character } = Route.useLoaderData();

  return (
    <>
      <section className="w-[60%] border border-white rounded mx-auto my-10 flex shadow-2xl">
        <div className="flex-1">
          <img
            src={character.imageUrl}
            alt={character.fullName}
            className="rounded-tl-md rounded-bl-md w-full h-full"
          />
        </div>
        <div className="flex-2">
          <section className="flex justify-start items-center h-full px-5 py-5">
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-3">
              {/* Name, Gender & Status */}
              <div className="text-3xl font-bold flex gap-3 text-balance items-end">
                <span className="underline">{character.fullName}</span>{" "}
              </div>
              {/* First Name */}
              <h3>FirstName: {character.firstName}</h3>
              {/* Last Name */}
              <h3>Origin: {character.lastName}</h3>
              {/* Title */}
              <h3>Title: {character.title}</h3>
              {/* Family */}
              <h3>Family: {character.family}</h3>
              {/* Episodes Count */}
              {/* <h3>Episodes Count: {character.episode.length}</h3> */}
              {/* Created At */}
              {/* <h3>
                Created At: {new Date(character.created).toLocaleDateString()}
              </h3> */}
            </div>
          </section>
        </div>
      </section>

      {/* Display Episodes */}
      {/* {character && character.episode && character.episode.length > 0 && (
        <section className="w-[60%] rounded mx-auto my-10 flex flex-col shadow-2xl">
          <h1>Episodes list</h1>
          <section className="flex flex-col gap-3 p-5">
            {character.episode.map((ep, index) => (
              <div key={index}>
                <SingleEpisode url={ep} />
              </div>
            ))}
          </section>
        </section>
      )} */}
    </>
  );
}
