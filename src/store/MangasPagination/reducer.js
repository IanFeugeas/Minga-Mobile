import { createReducer } from "@reduxjs/toolkit";
import mangasClickActions from './actions'

const { mangasPagination } = mangasClickActions

const initialState = {
    state: false,
}

const mangasClickReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            mangasPagination,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default mangasClickReducer