import classNames from "classnames";

function Category({ category, onCreateCategory, genreId }) {
  const id = category.id;
  const CategoryBtnClassName = classNames("category-button", {
    activeButton: id === genreId,
  });
  const handleClickButton = (event) => {
    event.preventDefault();
    onCreateCategory(category.id);
  };
  return (
    <div className="category">
      <button
        onClick={handleClickButton}
        id={category.id}
        className={CategoryBtnClassName}
      >
        {category.name}
      </button>
    </div>
  );
}

export default Category;
