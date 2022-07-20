import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice.js";

import Categories from "../Components/Categories";
import PizzaBlock from "../Components/PizzaBlock";
import Sort, { sortList } from "../Components/Sort";
import Pagination from "../Components/Pagination";

import qs from "qs";
import ErrorBlock from "../Components/ErrorBlock/ErrorBlock";

const Main = () => {
  const { categoryId, sort, currentPage, order } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();

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

  const getPizzas = async () => {
    const categoryBy = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        currentPage,
        categoryBy,
        sort,
        search,
        orderVal,
      })
    );

    window.scrollTo(0, 0);
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
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage, order]);

  const pizzas = (status === "loading" ? [...new Array(12)] : items).map(
    (obj, i) => (
      <PizzaBlock
        key={status === "loading" ? i : obj.id}
        status={status}
        {...obj}
      />
    )
  );

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} changeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{categoryId <= 0 && status !== 'error' ? "Все пиццы" : ""}</h2>
      {status === "error" ? <ErrorBlock/> : <div className="content__items">{pizzas}</div>}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Main;
