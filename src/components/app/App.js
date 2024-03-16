import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from '../header/Header'
import ArticlesPage from '../articles-page/ArticlesPage'
import ArticlePage from '../article-page/ArticlePage'
import SignUp from '../sign-up/SignUp'
import { setUserAction } from '../../redux/actions'
import SignIn from '../sign-in/SignIn'
import EditProfile from '../edit-profile/EditProfile'
import NewArticle from '../new-article/NewArticle'
import EditArticle from '../edit-article/EditArticle'

import styles from './App.module.css'

function App() {
  const dispatch = useDispatch()
  const userData = localStorage.getItem('user')
  if (userData !== null) {
    dispatch(setUserAction(JSON.parse(userData)))
  }
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <div className={styles.main}>
          <Route path="/" component={ArticlesPage} exact />
          <Route path="/articles" component={ArticlesPage} exact />
          <Route
            path={'/articles/:slug'}
            render={({ match }) => {
              const { slug } = match.params
              return <ArticlePage slug={slug} />
            }}
            exact
          />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/profile" component={EditProfile} />
          <Route path="/new-article" component={NewArticle} />
          <Route
            path={'/articles/:slug/edit'}
            render={({ match }) => {
              const { slug } = match.params
              return <EditArticle slug={slug} />
            }}
          />
        </div>
      </div>
    </Router>
  )
}

export default App
