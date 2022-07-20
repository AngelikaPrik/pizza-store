import React from "react";

import styles from "./ErrorBlock.module.scss"

const ErrorBlock = () => {
  return (
    <div className={styles.main}>
      <img width={200} alt="sad_pizza" src={process.env.PUBLIC_URL + "/img/notFoundImage.jpg"} />
      <h1>Ошибка при запросе данных</h1>
		<h3>Попробуйте повторить позднее</h3>
    </div>
  );
};

export default ErrorBlock;