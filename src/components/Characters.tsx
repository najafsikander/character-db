import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import FieldInfo from "./FieldInfo";
import { useState } from "react";

//TODO:REFACTOR & CLEAN THE FILE
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

const fetchCharacters = async (
  page = 1,
  characterName?: string | null,
  status?: string | null,
  specie?: string | null,
  gender?: string | null
) => {
  console.log(
    "Fetching characters for page:",
    page,
    "with name:",
    characterName
  );
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}${
      characterName ? `&name=${characterName.toLowerCase()}` : ""
    }${status ? `&status=${status.toLowerCase()}` : ""}${
      specie ? `&species=${specie.toLowerCase()}` : ""
    }${gender ? `&gender=${gender.toLowerCase()}` : ""}`
  );
  const result: apiResult = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
  return result;
};

const FilterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  status: z.string(),
  specie: z.string(),
  gender: z.string(),
});

const Characters: React.FC<Props> = ({ currentPage, setCurrentPage }) => {
  const [characterName, setCharacterName] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [specie, setSpecie] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const species: string[] = [
    "Alien",
    "Human",
    "Robot",
    "Mythological Creature",
    "Animal",
    "Cronenberg",
    "Disease",
    "Humanoid",
    "Poopybutthole",
    "unknown",
  ];
  const statuses: string[] = ["Alive", "Dead", "unknown"];
  const genders: string[] = ["Male", "Female", "Genderless", "unknown"];

  //Form Declaration
  const filterForm = useForm({
    defaultValues: {
      name: "",
      status: "",
      specie: "",
      gender: "",
    },
    validators: {
      onChange: FilterSchema,
    },
    onSubmit: async (values) => {
      console.log("Submitted values: ", values);
      setCharacterName(values.value.name.trim() || null);
      setStatus(values.value.status.trim() || null);
      setSpecie(values.value.specie.trim() || null);
      setGender(values.value.gender.trim() || null);
    },
  });

  //Fetching Data Here
  const { data }: { data: apiResult } = useSuspenseQuery({
    queryKey: [
      "characters",
      currentPage,
      characterName,
      status,
      specie,
      gender,
    ],
    queryFn: () =>
      fetchCharacters(currentPage, characterName, status, specie, gender),
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    filterForm.handleSubmit();
  };

  const onReset = () => {
    setCharacterName(null);
    setStatus(null);
    setSpecie(null);
    setGender(null);
    setCurrentPage(1);
    filterForm.reset();
  };

  return (
    <>
      <h1 className="mt-10 mb-3">Rick & Morty Characters</h1>
      {/* Form Area */}
      <section className="w-full flex flex-row justify-center px-10 py-2 mt-5 mb-5 border border-white rounded">
        <form onSubmit={submitForm} className="w-full">
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
          {/* Search Character By Status */}
          <div className="mt-3">
            <filterForm.Field
              name="status"
              children={(field) => {
                return (
                  <>
                    <div className="w-full flex flex-col gap-1 text-left text-lg">
                      <label htmlFor={field.name}>Status:</label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="">Select Status</option>
                        {statuses.map((stat) => (
                          <option key={stat} value={stat}>
                            {stat}
                          </option>
                        ))}
                      </select>
                      <FieldInfo field={field} />
                    </div>
                  </>
                );
              }}
            />
          </div>
          {/* Search Character By Specie */}
          <div className="mt-3">
            <filterForm.Field
              name="specie"
              children={(field) => {
                return (
                  <>
                    <div className="w-full flex flex-col gap-1 text-left text-lg">
                      <label htmlFor={field.name}>Specie:</label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="">Select Specie</option>
                        {species.map((specie) => (
                          <option key={specie} value={specie}>
                            {specie}
                          </option>
                        ))}
                      </select>
                      <FieldInfo field={field} />
                    </div>
                  </>
                );
              }}
            />
          </div>
          {/* Search Character By Gender */}
          <div className="mt-3">
            <filterForm.Field
              name="gender"
              children={(field) => {
                return (
                  <>
                    <div className="w-full flex flex-col gap-1 text-left text-lg">
                      <label htmlFor={field.name}>Gender:</label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="">Select Gender</option>
                        {genders.map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
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
              <div className="w-full flex flex-row justify-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="mt-3 border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer hover:bg-white hover:text-black"
                >
                  {isSubmitting ? "..." : "Submit"}
                </button>
                <button
                  type="reset"
                  onClick={onReset}
                  className="mt-3 border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer hover:bg-white hover:text-black"
                >
                  Reset
                </button>
              </div>
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
