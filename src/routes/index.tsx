import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <h1 className='text-5xl'>Welcome to CharacterDB</h1>
        <p>Here you can search about certain character from various media content.</p>
        {/* Images Area */}
        <section className='flex w-[30%] justify-evenly mt-5'>
          <img src='/images/rickMorty.jpg' alt='rick and morty avatar' className='w-30 rounded-[60%]'/>
          <img src='/images/rickMorty.jpg' alt='rick and morty avatar' className='w-30 rounded-[60%]'/>
          <img src='/images/rickMorty.jpg' alt='rick and morty avatar' className='w-30 rounded-[60%]'/>
          <img src='/images/rickMorty.jpg' alt='rick and morty avatar' className='w-30 rounded-[60%]'/>
        </section>
      </section>
    </div>
  )
}
