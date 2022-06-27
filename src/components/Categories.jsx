import React from 'react';

function Categories({ activeCategorie, onCangeCategorie }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((el, index) => (
            <li
              key={el + index}
              onClick={() => onCangeCategorie(index)}
              className={activeCategorie === index ? 'active' : ''}>
              {el}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
