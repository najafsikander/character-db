import Characters from '@/components/Characters'
import GridLoader from '@/components/GridLoader'
import { fetchCharacters } from '@/services/simpsons'
import { showFilterFields } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useState } from 'react'

export const Route = createFileRoute('/simpsons/')({
  component: SimpsonsPage,
})

function SimpsonsPage() {
  const [currentPage,setCurrentPage] = useState<number>(1)
    const displayFilterField: showFilterFields = {
        name: true,
        status: false,
        specie: false,
        gender: false
      }
  return (
    <Suspense fallback={<GridLoader/>}>
      <Characters title='Simpsons Characters' detailUrl='simpsons' currentPage={currentPage} setCurrentPage={setCurrentPage} fetchCharacters={fetchCharacters} displayFilterField={displayFilterField} />
    </Suspense>
  )
}
