import { FC } from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import SingleEpisode from "./SingleEpisode";
import { character } from "@/types";

type Props = {
  character: character;
};
const CharacterDetails: FC<Props> = ({ character }) => {
  const maleAvatar: string =
    "https://cdn5.vectorstock.com/i/1000x1000/98/49/avatar-men-icon-on-a-white-background-vector-31979849.jpg";
  const femaleAvatar: string =
    "https://www.kindpng.com/picc/m/378-3783625_avatar-woman-blank-avatar-icon-female-hd-png.png";

  const aliveIcon = (
    <span className="text-[20px] drop-shadow-lg drop-shadow-green-300">🟢</span>
  );
  const deadIcon = (
    <span className="text-[20px] drop-shadow-lg drop-shadow-red-300">🔴</span>
  );

  const episodes: string[] = character.episode || character.episodes || [];

  const getImageUrl = (character: character): string => {
    if (character.image) return character.image;
    if (character.portrait_path)
      return `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`;
    console.log("character: ", character.gender,character.sex);
    if (character.gender === "Male" || character.sex === "Male") return maleAvatar;
    return femaleAvatar;
  };

  const getEpisodesCount = (character: character) => {
    if (character.episode) return character.episode.length;
    if (character.episodes) return character.episodes.length;
    return 0;
  };

  console.log("character details: ", character);
  return (
    <>
      <section className="w-[60%] border border-white rounded mx-auto my-10 flex shadow-2xl">
        <div className="flex-1">
          <img
            src={getImageUrl(character)}
            alt={character.name}
            className="rounded-tl-md rounded-bl-md w-full h-full"
          />
        </div>
        <div className="flex-2">
          <section className="flex justify-start items-center h-full px-5 py-5">
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-3">
              {/* Name, Gender & Status */}
              <div className="text-3xl font-bold flex gap-3 text-balance items-end">
                <span className="underline">{character.name}</span>{" "}
                {character?.gender === "Male" || character?.sex === "Male" ? (
                  <BsGenderMale />
                ) : (
                  <BsGenderFemale />
                )}
                {character.status &&
                  (character.status === "Alive" ? aliveIcon : deadIcon)}
              </div>
              {/* Birthdate */}
              {character.birthdate && (
                <h3>Birthdate: {new Date(character.birthdate).toLocaleDateString()}</h3>
              )}
              {/* Age */}
              {character.age && <h3>Age: {character.age}</h3>}
              {/* Species */}
              {character.species && <h3>Species: {character.species}</h3>}
              {/* Origin */}
              {character.origin && (
                <h3>Origin: {character.origin?.name.toString() || ""}</h3>
              )}
              {/* Location */}
              {character.location && (
                <h3>Location: {character.location?.name.toString() || ""}</h3>
              )}
              {/* Hair Color */}
              {character.hair_color && (
                <h3>Hair Color: {character.hair_color}</h3>
              )}
              {/* Religion */}
              {character.religion && <h3>Religion: {character.religion}</h3>}
              {/* Occupation */}
              {character.occupation && (
                <h3>Occupation: {character.occupation}</h3>
              )}
              {/* Episodes Count */}
              {
                character.episode || character.episodes &&
                <h3>Episodes: {getEpisodesCount(character)}</h3>
              }
              {/* Created At */}
              {character.created && character.created_at && (
                <h3>
                  Created At:{" "}
                  {new Date(
                    character.created || character.created_at
                  ).toLocaleDateString()}
                </h3>
              )}
            </div>
          </section>
        </div>
      </section>

      {/* Display Episodes */}
      {
        episodes.length > 0 &&
        <section className="w-[60%] rounded mx-auto my-10 flex flex-col shadow-2xl">
        <h1>Episodes list</h1>
        <section className="flex flex-col gap-3 p-5">
          {episodes.map((ep, index) => (
            <div key={index}>
              <SingleEpisode url={ep} />
            </div>
          ))}
        </section>
      </section>
      }
    </>
  );
};

export default CharacterDetails;
