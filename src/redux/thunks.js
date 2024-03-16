import {
  getDataAction,
  getArticleDataAction,
  signUpAction,
  signInAction,
  editProfileAction,
  newArticleAction,
  deleteArticleAction,
  addLikeAction,
  editArticleAction,
  setErrorAction,
} from './actions'

const url = 'https://blog.kata.academy/api'

export const fetchArticles = (page, token) => {
  const offset = (page - 1) * 5
  if (token) {
    return (dispatch) => {
      fetch(`${url}/articles?limit=5&offset=${offset}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => dispatch(getDataAction(res)))
        .catch((error) => {
          throw new Error(error)
        })
    }
  } else {
    return (dispatch) => {
      fetch(`${url}/articles?limit=5&offset=${offset}`)
        .then((res) => res.json())
        .then((res) => dispatch(getDataAction(res)))
        .catch((error) => {
          throw new Error(error)
        })
    }
  }
}

export const fetchArticle = (slug, token) => {
  if (token) {
    return (dispatch) => {
      fetch(`${url}/articles/${slug}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => dispatch(getArticleDataAction(res)))
        .catch((error) => {
          throw new Error(error)
        })
    }
  } else {
    return (dispatch) => {
      fetch(`${url}/articles/${slug}`)
        .then((res) => res.json())
        .then((res) => dispatch(getArticleDataAction(res)))
        .catch((error) => {
          throw new Error(error)
        })
    }
  }
}

export const fetchSignUp = (data) => {
  const user = {
    username: data.username,
    email: data.email,
    password: data.password,
  }
  return (dispatch) => {
    fetch(`${url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: user }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          dispatch(setErrorAction())
        }
      })
      .then((res) => {
        dispatch(signUpAction(res))
        localStorage.setItem('user', JSON.stringify(res))
      })
      .catch((err) => console.log(err))
  }
}

export const fetchSignIn = (data) => {
  const user = {
    email: data.email,
    password: data.password,
  }
  return (dispatch) => {
    fetch(`${url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: user }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          dispatch(setErrorAction())
        }
      })
      .then((res) => {
        dispatch(signInAction(res))
        localStorage.setItem('user', JSON.stringify(res))
      })
      .catch((err) => console.log(err))
  }
}

export const fetchEditProfile = (token, data) => {
  const user = {
    username: data.username,
    email: data.email,
    password: data.password,
    image: data.image,
    bio: '',
  }
  return (dispatch) => {
    fetch(`${url}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: user }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          dispatch(setErrorAction())
        }
      })
      .then((res) => {
        dispatch(editProfileAction(res))
        localStorage.setItem('user', JSON.stringify(res))
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}

export const fetchNewArticle = (token, data) => {
  const article = {
    title: data.title,
    description: data.description,
    body: data.body,
    tagList: data.tags,
  }
  return (dispatch) => {
    fetch(`${url}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: article }),
    })
      .then((res) => res.json())
      .then((res) => dispatch(newArticleAction(res)))
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const fetchDeleteArticle = (token, slug) => {
  return (dispatch) => {
    fetch(`${url}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        dispatch(deleteArticleAction(slug))
      }
    })
  }
}

export const fetchAddLike = (token, slug) => {
  return (dispatch) => {
    fetch(`${url}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => dispatch(addLikeAction(res.article)))
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const fetchRemoveLike = (token, slug) => {
  return (dispatch) => {
    fetch(`${url}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => dispatch(addLikeAction(res.article)))
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export const fetchEditArticle = (token, slug, data) => {
  const article = {
    title: data.title,
    description: data.description,
    body: data.body,
    tagList: data.tags,
  }
  return (dispatch) => {
    fetch(`${url}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: article }),
    })
      .then((res) => res.json())
      .then((res) => dispatch(editArticleAction({ data: res, slug: slug })))
  }
}
