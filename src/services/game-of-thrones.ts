import { character, apiResult } from "@/types";

export const fetchCharacters = async (
): Promise<apiResult> => {
    try {
        const response = await fetch(`https://thronesapi.com/api/v2/Characters`);
        const result:apiResult = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching characters:", err);
        throw err;
    }
};

export const fetchCharacterById = async (id: string):Promise<character> => {
    try {
        const response = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`);
        const result:character = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching character by ID:", err);
        throw err;
    }
};