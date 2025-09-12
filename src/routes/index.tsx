import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

//TODO:ABSTRACT CHARACTERS, DATA GRID & FORM COMPONENTS SO THEY CAN BE USED IN MULTIPLE MEDIA SOURCES.
function App() {
  return (
    <>
      <h1 className="text-5xl">Welcome to CharacterDB</h1>
      <p>
        Here you can search about certain character from various media content.
      </p>
      {/* Images Area */}
      <section className="flex w-[30%] justify-evenly mt-5">
        <img
          src="/images/rickMorty.jpg"
          alt="Rick and morty avatar"
          className="w-30 rounded-[60%]"
        />
        <img
          src="/images/got.jpg"
          alt="Game of thrones avatar"
          className="w-30 rounded-[60%]"
        />
        <img
          src="/images/southpark.jpg"
          alt="South park avatar"
          className="w-30 rounded-[60%]"
        />
        <img
          src="/images/rickMorty.jpg"
          alt="rick and morty avatar"
          className="w-30 rounded-[60%]"
        />
      </section>
    </>
  );
}
