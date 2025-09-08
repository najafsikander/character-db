import Characters from '@/components/Characters'
import GridLoader from '@/components/GridLoader'
import { fetchCharacters } from '@/services/south-park'
import { showFilterFields } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useState } from 'react'

export const Route = createFileRoute('/south-park/')({
  component: SouthPark,
})

function SouthPark() {
  const [currentPage,setCurrentPage] = useState<number>(1)
  const displayFilterField: showFilterFields = {
      name: true,
      status: false,
      specie: false,
      gender: true
    }
  return (
    <Suspense fallback={<GridLoader/>}>
      <Characters title='South Park Characters' currentPage={currentPage} setCurrentPage={setCurrentPage} fetchCharacters={fetchCharacters} displayFilterField={displayFilterField} />
    </Suspense>
  )
}
