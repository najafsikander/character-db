import { apiResult, filters, character } from "@/types";

export const fetchCharacters = async (
    page = 1,
    filters: filters
) => {
    try {
        const { name, status, specie, gender } = filters;
        console.log(
            "Fetching characters for page:",
            page,
            "with name:",
            name
        );
        const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${page}${name ? `&name=${name.toLowerCase()}` : ""
            }${status ? `&status=${status.toLowerCase()}` : ""}${specie ? `&species=${specie.toLowerCase()}` : ""
            }${gender ? `&gender=${gender.toLowerCase()}` : ""}`
        );
        const result: apiResult = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching characters:", err);
        throw err;
    }
};

export const fetchCharacterById = async (id: string) => {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const result:character = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching character by ID:", err);
        throw err;
    }
};


