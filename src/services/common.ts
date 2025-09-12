import { episode } from "@/types";

export const fetchEpisodeByUrl = async (url: string):Promise<episode> => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        
        if(result.data) return result.data; // south park api response
        return result; // rick and morty api response
    } catch(err) {
        console.error("Error fetching episode by URL:", err);
        throw err;
    }
}