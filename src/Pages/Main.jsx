import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";

import Categories from "../Components/Categories";
import PizzaBlock from "../Components/PizzaBlock";
import Sort, { sortList } from "../Components/Sort";
import Pagination from "../Components/Pagination";

const Main = () => {
  const { categoryId, sort, currentPage, order } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(AppContext);

  const navigate = useNavigate();

  const orderVal = order ? "asc" : "desc";
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const onChangeCategory = useCallback((idx) => {
    dispatch(setCategoryId(idx));
  }, []);

  const fetchPizzas = () => {
    async function fetchData() {
      setIsLoading(true);
      const categoryBy = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue ? `&search=${searchValue}` : "";

      try {
        const { data } = await axios.get(
          `https://62af4ff3b0a980a2ef3e45c3.mockapi.io/items?page=${currentPage}&limit=8${categoryBy}&sortBy=${sort.sortProperty}&order=${orderVal}${search}`
        );

        setItems(data);
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе данных");
        console.error(error.message);
      }
    }
    fetchData();
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
        orderVal,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, order]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage, order]);

  const pizzas = (isLoading ? [...new Array(12)] : items).map((obj, i) => (
    <PizzaBlock key={isLoading ? i : obj.id} isLoading={isLoading} {...obj} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} changeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{categoryId <= 0 ? "Все пиццы" : ""}</h2>
      <div className="content__items">{pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Main;
