const tickers = {
  state() {
    return {
      currentTicker: JSON.parse(localStorage.getItem('currentTicker')) || '',
    }
  },
  mutations: {
    setTicker(state, val) {
      state.currentTicker = val
      localStorage.setItem('currentTicker', JSON.stringify(val))
    },
  },
  getters: {
    getCurrentTicker(state) {
      return state.currentTicker
    },
  },
}

export default tickers
