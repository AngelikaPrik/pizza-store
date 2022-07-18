import React from "react";

const CartEmpty = () => {
  return (
    <div class="container container--cart">
      <div class="cart cart--empty">
        <h2>Корзина пустая</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src="/img/empty-cart.png" alt="Empty cart" />
        <a href="/" class="button button--black">
          <span>Вернуться назад</span>
        </a>
      </div>
    </div>
  );
};

export default CartEmpty;
