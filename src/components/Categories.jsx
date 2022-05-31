import React from 'react';

function Categories() {
  const [activeIndex, setactiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategories = (index) => {
    setactiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            onClick={(index) => onClickCategories(index)}
            className={activeIndex === index ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
