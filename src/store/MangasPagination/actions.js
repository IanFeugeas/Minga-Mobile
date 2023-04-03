import { createAction } from "@reduxjs/toolkit";

let mangasPagination = createAction(
    'mangasPagination',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const mangasClickActions = {mangasPagination}
export default mangasClickActions