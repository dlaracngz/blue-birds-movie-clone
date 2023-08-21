import Film from "./Film";

function ListFilms({ films }) {
  return (
    <div
      id="listFilms"
      className="grid grid-cols-5 gap-10 px-24 bg-[#10141e] h-full"
    >
      {films.results?.map((film) => {
        return <Film key={film.id} film={film} />;
      })}
    </div>
  );
}

export default ListFilms;
