import persist from "../utils/persist"
import get from 'lodash.get'
import store from "../store"
import { setItems } from "../slices/itemsSlice"

const initListFromStorage = async () => {
  const storedState = await persist.getStoredState()
  const list = get(storedState, 'itemsReducer.items') || []
  store.dispatch(setItems(list))
}

export default {
  initListFromStorage
}