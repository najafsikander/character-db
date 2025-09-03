import { got_apiResult, got_characters } from "@/types";

export const fetchCharacters = async (
): Promise<got_apiResult> => {
    try {
        const response = await fetch(`https://thronesapi.com/api/v2/Characters`);
        const result:got_apiResult = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching characters:", err);
        throw err;
    }
};

export const fetchCharacterById = async (id: string):Promise<got_characters> => {
    try {
        const response = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`);
        const result:got_characters = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching character by ID:", err);
        throw err;
    }
};