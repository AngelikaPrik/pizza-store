import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import axios from "axios";

import Categories from "../Components/Categories";
import PizzaBlock from "../Components/PizzaBlock";
import Sort from "../Components/Sort";
import Pagination from "../Components/Pagination";

const Main = () => {
  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(true);
  
  const { searchValue } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const categoryBy = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue ? `&search=${searchValue}` : "";
      const orderVal = order ? "asc" : "desc";

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
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, order, searchValue, currentPage]);

  const pizzas = (isLoading ? [...new Array(12)] : items).map((obj, i) => (
    <PizzaBlock key={isLoading ? i : obj.id} isLoading={isLoading} {...obj} />
  ));

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }
  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          changeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort changeOrder={(val) => setOrder(val)} />
      </div>
      <h2 className="content__title">{categoryId <= 0 ? "Все пиццы" : ""}</h2>
      <div className="content__items">{pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Main;