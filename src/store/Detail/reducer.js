import { createReducer } from "@reduxjs/toolkit"
import actions from './actions'


const { captureChapter, captureManga, read_chapters } = actions

const initialstate = {
   manga:[],
   chapter:[],
   chapters: []
}

const reducer = createReducer(
    initialstate,
    (builder) => builder
   .addCase(
            captureManga.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    manga: action.payload.manga
                }
                return newState
            }
        )
        .addCase(
            read_chapters.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    chapters: action.payload.chapters
                }
                return newState
            }
        )
      .addCase(
            captureChapter.fulfilled,
            (state,action)=>{
                let newState = {
                    ...state,
                    chapter: action.payload.chapter
                }
                return newState
            }
        ) 
)
export default reducer  