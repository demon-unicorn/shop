export const state = {
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
}

export const mutations = {
  changeUser(state, arr) {
    state.user = arr
    if (arr) {
      sessionStorage.setItem('user', JSON.stringify(arr))
    } else {
      sessionStorage.removeItem('user')
    }
  }
}

export const getters = {
  user(state) {
    return state.user
  }
}
