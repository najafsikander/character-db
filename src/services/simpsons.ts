import { apiResult, character, filters } from "@/types";

export const fetchCharacters = async (
    page = 1,
    filters: filters
): Promise<apiResult> => {
    try {
        const { name } = filters;
        console.log(
            "Fetching characters for page:",
            page,
            "with name:",
            name
        );
        const response = await fetch(
            `https://thesimpsonsapi.com/api/characters?page=${page}${name ? `&search=${name.toLowerCase()}` : ""
            }`
        );
        const result: apiResult = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching characters:", err);
        throw err;
    }
};


export const fetchCharacterById = async (id: string):Promise<character> => {
    try {
        console.log("Fetching character by ID:", id);
        const response = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);
        const result:any = await response.json();
        console.log("Fetched character data:", result);
        const character:character = result;
        return character;
    } catch (err) {
        console.error("Error fetching character by ID:", err);
        throw err;
    }
};