import { FilterSchema } from "@/schemas";
import { useForm } from "@tanstack/react-form";
import FieldInfo from "../../../components/FieldInfo";
import { FC } from "react";
import { filters, showFilterFields } from "@/types";

type Props = {
  setCurrentPage: (page: number) => void;
  setFilters: (filters: any) => void;
  displayFilterField: showFilterFields;
};

const CharacterForm: FC<Props> = ({
  setCurrentPage,
  setFilters,
  displayFilterField,
}) => {
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
      for (let [key, value] of Object.entries(values.value)) {
        setFilters((filters: filters) => ({
          ...filters,
          [key]: value.trim() || null,
        }));
      }
    },
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    filterForm.handleSubmit();
  };

  const onReset = () => {
    setFilters({});
    setCurrentPage(1);
    filterForm.reset();
  };
  return (
    <>
      <form
        onSubmit={submitForm}
        className="w-full border border-white rounded px-5 py-5"
      >
        {/* Search Character By Name */}
        {displayFilterField.name && (
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
        )}
        {/* Search Character By Status */}
        {displayFilterField.status && (
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
        )}
        {/* Search Character By Specie */}
        {displayFilterField.specie && (
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
        )}
        {/* Search Character By Gender */}
        {displayFilterField.gender && (
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
        )}
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
    </>
  );
};

export default CharacterForm;
