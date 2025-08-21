import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import FieldInfo from "./FieldInfo";
import { useState } from "react";

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

type info = {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
};

type character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  episodes: string[];
  url: string;
  created: string;
};

type apiResult = {
  info: info;
  results: character[];
};

const fetchCharacters = async (page = 1, characterName?: string | null) => {
  console.log("Fetching characters for page:", page, "with name:", characterName);
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}${
      characterName ? `&name=${characterName.toLowerCase()}` : ""
    }`
  );
  const result: apiResult = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
  return result;
};

const FilterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long")
});

const Characters: React.FC<Props> = ({ currentPage, setCurrentPage }) => {

  const [characterName,setCharacterName] = useState<string | null>(null);
  //Form Declaration
  const filterForm = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onChange: FilterSchema,
    },
    onSubmit: async (values) => {
      console.log("Submitted values: ", values);
      setCharacterName(values.value.name.trim() || null);
      // filterForm.reset();
    },
  });

  //Fetching Data Here
  const { data }: { data: apiResult } = useSuspenseQuery({
    queryKey: ["characters", currentPage,characterName],
    queryFn: () => fetchCharacters(currentPage,characterName),
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    filterForm.handleSubmit();
  }

  const onReset = () => {
    setCharacterName(null);
    setCurrentPage(1);
    filterForm.reset();
  }

  return (
    <>
      <h1 className="mt-10 mb-3">Rick & Morty Characters</h1>
      {/* Form Area */}
      <section>
        <form onSubmit={submitForm}>
          {/* Search Character By Name */}
          <div>
            <filterForm.Field
              name="name"
              children={(field) => {
                return (
                  <>
                    <div className="w-full flex flex-col gap-1 text-left text-lg">
                      <label htmlFor={field.name}>Name:</label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </>
                );
              }}
            />
          </div>
          {/* Submission Area */}
          <filterForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
              <button type="submit" disabled={!canSubmit} className="mt-3 border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer hover:bg-white hover:text-black">
                {isSubmitting ? "..." : "Submit"}
              </button>
              <button type="reset" onClick={onReset} className="mt-3 border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer hover:bg-white hover:text-black">
                Reset
              </button>
              </>
            )}
          />
        </form>
      </section>

      {/* Grid Area To Show Characters */}
      <section className="grid grid-cols-4 gap-x-5 gap-y-10 mt-5">
        {data.results.map((character: character) => (
          <div
            key={character.id}
            className=" rounded overflow-hidden shadow-2xl"
          >
            <img
              src={character.image}
              alt="Character Image"
              className="rounded-t-md w-full"
            />
            <h3 className="px-6 pt-2 pb-2 cursor-pointer">{character.name}</h3>
          </div>
        ))}
      </section>
      <div className="w-screen flex flex-row justify-around px-10 py-2 mt-5 mb-5">
        <button
          className={`w-[10rem] border border-white rounded py-1 px-4 ${!data.info.prev ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!data.info.prev}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className={`w-[10rem] border border-white rounded py-1 px-4 ${!data.info.next ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!data.info.next}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Characters;
