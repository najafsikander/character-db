import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rick-morty')({
  component: RickMortyPage,
})

function RickMortyPage() {
  return <div>Rick & Morty Page</div>
}
