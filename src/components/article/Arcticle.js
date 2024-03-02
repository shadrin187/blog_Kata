import styles from "./Article.module.css";
import like from "../images/heart_1.svg";
import { format } from "date-fns";
import Tag from "./tag/tag";

function Article({ data }) {
let createdTime = format(Date.parse(data.createdAt), 'PPP')

  return (
    <li className={styles.article}>
      <div className={styles.article__info}>
        <div className={styles.article__header}>
          <h5 className={styles.article__title}>{data.title}</h5>
          <label className={styles.article__likes}>
            <img
              className={styles.article__likes_image}
              alt="likes"
              src={like}
            />
            <span className={styles.article__likes_counter}>
              {data.favoritesCount}
            </span>
          </label>
        </div>
        <ul className={styles.article__tags}>{data.tagList.map((el, i) => {
          return <Tag tag={el} key={i} />
        })}</ul>
        <p className={styles.article__description}>{data.description}</p>
      </div>
      <div className={styles.article__user}>
        <div className={styles.article__user_info}>
          <span className={styles.article__user_name}>
            {data.author.username}
          </span>
          <span className={styles.article__created_at}>
            {createdTime}
          </span>
        </div>
        <img
          className={styles.article__user_image}
          alt="userImage"
          src={data.author.image}
        />
      </div>
    </li>
  );
}

export default Article;
