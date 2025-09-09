import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/south-park/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/south-park/$id/"!</div>
}
