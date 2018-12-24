import { getAllArticle } from '@/api/article'

const user = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取所有用户
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
    }
  }
}

export default article
