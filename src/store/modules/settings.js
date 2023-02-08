const settings = {
  state() {
    return {
      isDark: JSON.parse(localStorage.getItem('is-dark')) || '',
    }
  },
  mutations: {},
  getters: {
    isDarkMode(state) {
      return state.isDark
    },
  },
}

export default settings
