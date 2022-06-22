import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [ithems, setIthems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://62a070c8a9866630f80f15dd.mockapi.io/ithems')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setIthems(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : ithems.map((elem) => <PizzaBlock key={elem.id + elem.name} {...elem} />)}
      </div>
    </>
  );
}

export default Home;
