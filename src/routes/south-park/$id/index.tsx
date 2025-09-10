import CharacterDetails from '@/components/CharacterDetails';
import { fetchCharacterById } from '@/services/south-park';
import { southParkCharacter } from '@/types';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/south-park/$id/')({
  loader: async ({params: {id}}) => {
    const character:southParkCharacter = await fetchCharacterById(id);
    return { id, character };
  },
  component: SingleCharacter,
})

function SingleCharacter() {
    const { character } = Route.useLoaderData();
    console.log('southpark: ',character);
  return (
    <>
    <CharacterDetails character={character}/>
    </>
  );
}
