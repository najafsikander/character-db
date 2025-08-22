type loaderObjType = {
    name: string;
    image: string;
}
const GridLoader = () => {
    const loaderObj: loaderObjType = {
        name: "Loading...",
        image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
    };
    return(<div className="w-screen flex justify-center px-40 py-2 mt-5 mb-5">
        <section className="grid grid-cols-4 grid-rows-3 gap-x-5 gap-y-10 mt-5">
        {Array.from({length:8}, () => loaderObj).map((character:loaderObjType, index:number) => (
          <div
            key={index}
            className=" rounded overflow-hidden shadow-2xl"
          >
            <img
              src={character.image}
              alt="Character Image"
              className="rounded-t-md w-full"
            />
            <h3 className="px-6 pt-2 pb-2 cursor-pointer">{character.name}</h3>
          </div>
        ))}
      </section>
    </div>);
}

export default GridLoader;