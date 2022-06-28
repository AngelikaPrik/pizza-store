import React from "react";

import styles from "./NotFoundBlock.module.scss"
const NotFoundBlock = () => {
  return (
    <div className={styles.main}>
      <img width={200} alt="sad_pizza" src={process.env.PUBLIC_URL + "/img/notFoundImage.jpg"} />
      <h1>Страница не найдена</h1>
		<h3>Неверный адрес страницы или такой страницы не существует</h3>
    </div>
  );
};

export default NotFoundBlock;
