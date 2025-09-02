import GridLoader from '@/components/GridLoader'
import Characters from '@/components/pages/game-of-thrones/Characters'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/game-of-thrones/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Suspense fallback={<GridLoader/>}>
      <Characters/>
    </Suspense>
  )
}
