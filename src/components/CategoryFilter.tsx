import 'src/styles/CategoryFilter.scss';

export default function CategoryFilter({
  categories,
  selectedCategories,
  clickHandler,
}: {
  categories: string[];
  selectedCategories: string[];
  clickHandler: (cat: string) => void;
}) {
  const classes = (cat: string) => {
    let classes = 'category';

    if (selectedCategories.includes(cat)) {
      classes += ' selected';
    }

    return classes;
  };

  return (
    <>
      <div className="category-filter">
        <p>Filter By Category:</p>
        <div className="category-container">
          {categories.map((cat, i) => {
            return (
              <button
                key={i}
                onClick={() => clickHandler(cat)}
                className={classes(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
