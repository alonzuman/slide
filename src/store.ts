import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import stream from './slices/stream'
import streamLayout from './slices/streamLayout'
import { StreamLayoutState, StreamState } from "./types";

const store = configureStore({
  reducer: {
    stream,
    streamLayout
  }
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;

type RootState = {
  stream: StreamState,
  streamLayout: StreamLayoutState
}
