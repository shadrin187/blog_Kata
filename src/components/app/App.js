import styles from "./App.module.css";
import Header from "../header/Header";
import { Pagination } from "antd";
import ArticlesList from "../articles-list/ArticlesList";
import { useSelector, useDispatch } from "react-redux";
import { changePageAction } from "../../redux/actions";
import { fetchArticles } from "../../redux/thunks";

function App() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const totalArticles = useSelector((state) => state.totalCount);
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <ArticlesList />
        <Pagination
          className={styles.pagination}
          current={page}
          total={totalArticles}
          onChange={(p) => {
            dispatch(changePageAction(p));
            dispatch(fetchArticles(p));
          }}
          pageSize={5}
          showSizeChanger={false}
          showPrevNextJumpers={false}
        />
      </div>
    </div>
  );
}

export default App;
