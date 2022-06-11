import React from 'react';
import './App.css';

import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';

//https://62a070c8a9866630f80f15dd.mockapi.io/ithems

function App() {
  const [ithems, setIthems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://62a070c8a9866630f80f15dd.mockapi.io/ithems')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setTimeout(() => {
          setIthems(json);
          setIsLoading(false);
        }, 5000);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
        </div>
      </div>
    </div>
  );
}

export default App;
