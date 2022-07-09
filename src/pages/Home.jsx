import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { SearchContext } from '../App';
import { setCategoryId, setCurentPage, setFilter } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const navigation = useNavigate();

  const isRequest = React.useRef(false);
  const isMounted = React.useRef(false); //без змін у редаксі щоб не добавлялась ссилка у браузері

  const [ithems, setIthems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = ithems.map((elem) => <PizzaBlock key={elem.id + elem.name} {...elem} />);

  // const pizzas = ithems //статичний пошук
  //   .filter((el) => (el.name.toLowerCase().includes(searchValue.toLowerCase()) ? true : false))
  //   .map((elem) => <PizzaBlock key={elem.id + elem.name} {...elem} />);

  const activeCategorie = useSelector((state) => state.filterSlice.categoryId);
  const sortList = useSelector((state) => state.filterSlice.sort);

  const dispatch = useDispatch();
  const onCangeCategorie = (id) => dispatch(setCategoryId(id));

  const curentPage = useSelector((state) => state.filterSlice.curentPage);
  const onChangePage = (page) => dispatch(setCurentPage(page));

  const fetchRequest = async () => {
    const category = activeCategorie > 0 ? `category=${activeCategorie}` : '';
    const sortBy = sortList.sortValue;
    const searchBy = searchValue && `&search=${searchValue}`;
    setIsLoading(true);
    // fetch(
    //   `https://62a070c8a9866630f80f15dd.mockapi.io/ithems?&limit=4&page=${curentPage}&${category}&sortBy=${sortBy}${searchBy}`,
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setIthems(json);
    //     setIsLoading(false);
    //   });

    // axios
    //   .get(
    //     `https://62a070c8a9866630f80f15dd.mockapi.io/ithems?&limit=4&page=${curentPage}&${category}&sortBy=${sortBy}${searchBy}`,
    //   )
    //   .then((reaponse) => {
    //     setIthems(reaponse.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });

    //синхронний запрос
    try {
      const responce = await axios.get(
        `https://62a070c8a9866630f80f15dd.mockapi.io/ithems?&limit=4&page=${curentPage}&${category}&sortBy=${sortBy}${searchBy}`,
      );
      setIthems(responce.data);
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
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
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      <Pagination curentPage={curentPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
