import { fetchEpisodeByUrl } from "@/services/rickMorty";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

type Props = {
  url: string;
};
const SingleEpisode: FC<Props> = ({ url }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["episode", url],
    queryFn: () => fetchEpisodeByUrl(url),
  });

  const dateString = data?.created || data?.created_at?.toString() || "";

  if (isLoading) return <div>Loading...</div>;

  console.log("Episode data:", data);

  const getImageUrl = (url: string): string => {
    if (url.includes("png")) return url.split("png")[0] + "png";
    if (url.includes("jpg")) return url.split("jpg")[0] + "jpg";
    if (url.includes("jpeg")) return url.split("jpeg")[0] + "jpeg";
    return "";
  };
  return (
    <section className="w-full mx-auto my-auto flex flex-col shadow-2xl">
      {data?.thumbnail_url && (
        <img src={getImageUrl(data!.thumbnail_url)} alt={data?.id.toString()} />
      )}
      <h1>{data?.name}</h1>
      <div className="flex flex-col gap-3 p-5">
        <p>{data?.description}</p>
        <h3>Air Date: {data?.air_date}</h3>
        <h3>Season: {data?.season}</h3>
        <h3>Episode Code: {data?.episode}</h3>
        <h3>Created At: {new Date(dateString).toLocaleDateString()}</h3>
        <h3>Wiki Url: <a href={data?.wiki_url} target="_blank" rel="noopener noreferrer">Click Here</a></h3>
      </div>
    </section>
  );
};

export default SingleEpisode;
