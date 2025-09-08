import { southPark_apiResult, filters} from "@/types";

export const fetchCharacters = async (
    page = 1,
    filters: filters
): Promise<southPark_apiResult> => {
    try {
        const { name, status, specie, gender } = filters;
        console.log(
            "Fetching characters for page:",
            page,
            "with name:",
            name
        );
        const response = await fetch(
            `https://spapi.dev/api/characters?page=${page}${name ? `&name=${name.toLowerCase()}` : ""
            }${status ? `&status=${status.toLowerCase()}` : ""}${specie ? `&species=${specie.toLowerCase()}` : ""
            }${gender ? `&gender=${gender.toLowerCase()}` : ""}`
        );
        const result: southPark_apiResult = await response.json();
        return result;
    } catch (err) {
        console.error("Error fetching characters:", err);
        throw err;
    }
};