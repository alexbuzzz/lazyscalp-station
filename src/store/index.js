import { createStore } from 'vuex'

import tickers from './modules/tickers'
import settings from './modules/settings'

const store = createStore({
  modules: { tickers, settings },
})

export default store
