import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import qs from 'qs';

import {
  setCategoryId,
  setCurentPage,
  setFilter,
  selectSort,
  selectFilter,
  selectCatId,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const isRequest = React.useRef(false);
  const isMounted = React.useRef(false); //без змін у редаксі щоб не добавлялась ссилка у браузері

  const { ithems, status } = useSelector(selectPizza);

  const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = ithems.map((elem: any) => (
    <Link key={elem.id + elem.name} to={'pizza/' + elem.id}>
      <PizzaBlock {...elem} />
    </Link>
  ));

  const activeCategorie = useSelector(selectCatId);
  const sortList = useSelector(selectSort);

  const onCangeCategorie = (id: number) => dispatch(setCategoryId(id));

  const { curentPage, searchValue } = useSelector(selectFilter);

  const onChangePage = (page: number) => dispatch(setCurentPage(page));

  const fetchRequest = async () => {
    const category = activeCategorie > 0 ? `category=${activeCategorie}` : '';
    const sortBy = sortList.sortValue;
    const searchBy = searchValue && `&search=${searchValue}`;

    //асинхронний екшен
    dispatch(
      //@ts-ignore
      fetchPizzas({ category, sortBy, searchBy, curentPage }),
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortValue === params.sortList);

      dispatch(
        setFilter({
          ...params,
          sort,
        }),
      );
      isRequest.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const curentUrl = qs.stringify({
        activeCategorie,
        sortList: sortList.sortValue,
        curentPage,
      });
      navigation(`?${curentUrl}`);
    }
    isMounted.current = true;
  }, [activeCategorie, sortList, curentPage]);

  React.useEffect(() => {
    if (!isRequest.current) {
      fetchRequest();
    }
    isRequest.current = false;
    window.scrollTo(0, 0);
  }, [activeCategorie, sortList, searchValue, curentPage]);

  return (
    <>
      <div className="content__top">
        <Categories activeCategorie={activeCategorie} onCangeCategorie={onCangeCategorie} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <h2>Pizzas not found 😕</h2>
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
      )}

      <Pagination curentPage={curentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
