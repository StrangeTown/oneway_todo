import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TodoItem } from "../types"
import { RootState } from "../store"
import utils from "../utils"

interface itemsState {
  items: TodoItem[]
}

const initialState: itemsState = {
  items: [
    {
      name: "1",
      id: "asdf",
      isCompleted: false,
    },
    {
      name: "1123",
      id: "asdf123123",
      isCompleted: false,
    },
  ],
}

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TodoItem>) => {
      state.items.unshift(action.payload)
    },
    setItems: (state, action: PayloadAction<TodoItem[]>) => {
      state.items = action.payload
    },
  },
})

export const { addItem, setItems } = itemsSlice.actions
export const selectItems = (state: RootState) => state.itemsReducer.items
export const selectSortedItems = (state: RootState) => {
  const items = state.itemsReducer.items
  return utils.resortItems(items)
}
export default itemsSlice.reducer
