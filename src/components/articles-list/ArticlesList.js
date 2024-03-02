import { fetchArticles } from "../../redux/thunks";
import styles from "./ArticlesList.module.css";
import { useSelector, useDispatch } from "react-redux";
import Article from "../article/Arcticle";

function ArticlesList() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  
  if (articles.length === 0) {
    dispatch(fetchArticles());
  }
  console.log(articles)

  return (
    <ul className={styles.article_list}>
      {articles.map((el, i) => {
        return <Article key={i} data={el} />;
      })}
    </ul>
  );
}

export default ArticlesList;
