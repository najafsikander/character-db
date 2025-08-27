import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rick-morty/$id/')({
  loader: async ({ params:{id} }) => {
    return { id };
  },
  component: SingleCharacter
})

function SingleCharacter() {
  const {id} = Route.useLoaderData();
  return <div>Hello "/rick-morty/{id}/"!</div>
}
