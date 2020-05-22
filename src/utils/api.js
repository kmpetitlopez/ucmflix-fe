import axios from 'axios'

export default {

  getContents (params) {
    return axios.get('/contents', {params})
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContent (id) {
    return axios.get('/contents/' + id)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentCategories (id) {
    return axios.get('/contents/' + id + '/categories')
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentEpisodes (id, params) {
    return axios.get('/contents/' + id + '/episodes', {params})
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentSeasons (id) {
    return axios.get('/contents/' + id + '/seasons')
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getCategories (params) {
    return axios.get('/categories', {params})
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getCategory (id) {
    return axios.get('/categories/' + id)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getCategoryContents (id, params) {
    return axios.get('/categories/' + id + '/contents', {params})
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentImage (id) {
    return axios.get('/contents/' + id + '/image')
      .then(response => {
        return response.data  && response.data.response
      })
  },

  login (username, password) {
    return axios.post('/auth/login', {
        username,
        password
      })
  },

  logout () {
    return axios.get('/auth/logout')
  },

  singUp (body) {
    return axios.post('/auth/sign-up', body)
  },

  recoverPassword (body) {
    return axios.post('/auth/request-password-recovery', body)
  },

  sendPassword (body) {
    return axios.post('/auth/confirm-password', body)
  }
}
