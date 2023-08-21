import Category from "./Category";

function ListCategories({ categories, setGenreID, genreId }) {
  return (
    <div
      id="listCategories"
      className="flex flex-wrap justify-center bg-[#10141e] px-24 pt-12"
    >
      {categories?.map((category) => {
        return (
          <Category
            key={category.id}
            category={category}
            onCreateCategory={setGenreID}
            genreId={genreId}
          />
        );
      })}
    </div>
  );
}

export default ListCategories;
