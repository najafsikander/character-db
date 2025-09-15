import { simpsons_apiResult, filters } from "@/types";

export const fetchCharacters = async (
    page = 1,
    filters: filters
): Promise<simpsons_apiResult> => {
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
        const result: simpsons_apiResult = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching characters:", err);
        throw err;
    }
};