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
    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        state.items = state.items.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              isCompleted: !item.isCompleted,
            }
          }
          return item
        })
      }
    },
  },
})

export const { addItem, setItems, toggleItem } = itemsSlice.actions
export const selectItems = (state: RootState) => state.itemsReducer.items
export const selectDisplayedItems = (state: RootState) => {
  const items = state.itemsReducer.items
  const undoneItems = items.filter((item) => !item.isCompleted)
  return utils.resortItems(undoneItems)
}
export default itemsSlice.reducer
