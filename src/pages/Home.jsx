import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home({ searchValue, setSearchValue }) {
  const [ithems, setIthems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  // const pizzas = ithems.map((elem) => <PizzaBlock key={elem.id + elem.name} {...elem} />);
  const pizzas = ithems
    .filter((el) => (el.name.toLowerCase().includes(searchValue.toLowerCase()) ? true : false))
    .map((elem) => <PizzaBlock key={elem.id + elem.name} {...elem} />);

  const [activeCategorie, setActiveCategorie] = React.useState(0);
  const [sortList, setSortList] = React.useState({ name: 'популярности', sortValue: 'rating' });

  React.useEffect(() => {
    const category = activeCategorie > 0 ? `category=${activeCategorie}` : '';
    const sortBy = sortList.sortValue;

    setIsLoading(true);

    fetch(`https://62a070c8a9866630f80f15dd.mockapi.io/ithems?${category}&sortBy=${sortBy}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setIthems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategorie, sortList]);

  return (
    <>
      <div className="content__top">
        <Categories
          activeCategorie={activeCategorie}
          setActiveCategorie={(i) => setActiveCategorie(i)}
        />
        <Sort sortList={sortList} setSortList={(obj) => setSortList(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
    </>
  );
}

export default Home;
