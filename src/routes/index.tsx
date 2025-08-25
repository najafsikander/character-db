import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

//TODO:RESTRUCTURE PROJECT ACCORDING TO TANSTACK PRODUCTION STANDARDS.
//TODO:START WORKING ON NEXT DETAILS PAGE.
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
          alt="rick and morty avatar"
          className="w-30 rounded-[60%]"
        />
        <img
          src="/images/rickMorty.jpg"
          alt="rick and morty avatar"
          className="w-30 rounded-[60%]"
        />
        <img
          src="/images/rickMorty.jpg"
          alt="rick and morty avatar"
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
