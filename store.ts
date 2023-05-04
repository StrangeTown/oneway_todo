import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './slices/itemsSlice'
import persist from "./utils/persist";

const store = configureStore({
  reducer: {
    itemsReducer
  }
})

// persist store to local storage
store.subscribe(() => {
  persist.saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
