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

  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="w-full mx-auto my-auto flex flex-col shadow-2xl">
      <h1>{data?.name}</h1>
        <div className="flex flex-col gap-3 p-5">
            <h3>Air Date: {data?.air_date}</h3>
            <h3>Episode Code: {data?.episode}</h3>
            <h3>Created At: {new Date(data?.created || "").toLocaleDateString()}</h3>
        </div>
    </section>
  );
};

export default SingleEpisode;
