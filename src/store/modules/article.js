import { getAllArticle, add } from '@/api/article'
import { getToken } from '@/utils/auth'

const article = {
  state: {
    token: getToken()
  },

  mutations: {
  },

  actions: {
    // 获取所有文章
    getArticles({ commit, state }) {
      return new Promise((resolve, reject) => {
        getAllArticle(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('获取文章信息失败!')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addArticle({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        alert(JSON.stringify(data))
        add(JSON.stringify(data)).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('获取文章信息失败!')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default article
