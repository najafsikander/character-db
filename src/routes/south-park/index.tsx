import GridLoader from '@/components/GridLoader'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useState } from 'react'

export const Route = createFileRoute('/south-park/')({
  component: SouthPark,
})

function SouthPark() {
  const [currentPage,setCurrentPage] = useState<number>(1)
  return (
    <Suspense fallback={<GridLoader/>}>
      <div>
        <h2>South Park Characters</h2>
      </div>
    </Suspense>
  )
}
