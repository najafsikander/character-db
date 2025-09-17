import CharacterDetails from "@/components/CharacterDetails";
import { fetchCharacterById } from "@/services/simpsons";
import { simpsonsCharacter } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/simpsons/$id/")({
  loader: async ({ params: { id } }) => {
    const character: simpsonsCharacter = await fetchCharacterById(id);
    return { id, character };
  },
  component: SingleCharacter,
});

function SingleCharacter() {
    const { character } = Route.useLoaderData();
        console.log('simpsons: ',character);
  return (
    <CharacterDetails character={character}/>
  );
}
