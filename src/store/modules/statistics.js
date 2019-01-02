import { getGenderStatistics } from '@/api/statistics'

const statistics = {
  state: {
    registerCount: 0, // 注册人数
    checkCount: 0, // 资质申请人数
    articleCount: 0, // 文章数量
    templateCount: 0, // 模板数量
    genderStatistics: null, // 性别统计
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_GENDER_STATISTICS: (state, data) => {
      state.genderStatistics = data
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    getStatistic({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getGenderStatistics().then(response => {
          const data = response.data
          console.log('store存储信息' + JSON.stringify(data))
          commit('SET_GENDER_STATISTICS', data.genderStatistics)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
    //
    // // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error')
    //       }
    //       const data = response.data.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    //
    // // 第三方验证登录
    // // LoginByThirdparty({ commit, state }, code) {
    // //   return new Promise((resolve, reject) => {
    // //     commit('SET_CODE', code)
    // //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    // //       commit('SET_TOKEN', response.data.token)
    // //       setToken(response.data.token)
    // //       resolve()
    // //     }).catch(error => {
    // //       reject(error)
    // //     })
    // //   })
    // // },
    //
    // // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    //
    // // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // },
    //
    // // 动态修改权限
    // ChangeRoles({ commit, dispatch, state }, role) {
    //   return new Promise(resolve => {
    //     // commit('SET_TOKEN', role)
    //     // setToken(role)
    //     getUserInfo(state.token).then(response => {
    //       const data = response.data.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
    //       resolve()
    //     })
    //   })
    // },
    // // 获取所有用户
    // getUsers({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getAllUser(state.token).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('获取用户信息失败!')
    //       }
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // // 获取所有角色
    // getAllRole({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getAllRoles(state.token).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('获取角色信息失败!')
    //       }
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // updateRole({ commit }, submitData) {
    //   return new Promise((resolve, reject) => {
    //     console.log(JSON.stringify(submitData))
    //     updateRoles(submitData.selectUser, submitData.roleIds).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('更新角色信息失败!')
    //       }
    //       resolve(response)
    //     })
    //   })
    // }
  }
}

export default statistics