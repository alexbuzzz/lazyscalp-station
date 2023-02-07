import { createStore } from 'vuex'

import tickers from './modules/tickers'

const store = createStore({
  modules: { tickers },
})

export default store
