import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let captureManga = createAsyncThunk(
    'captureManga',
    async ({ manga_id }) => {
        try {
            let response = await axios.get(`https://minga-grupoblanco.onrender.com/api/manga/` + manga_id)
            return {
                manga: response.data.manga
                
            }
        } catch (error) {
            console.log(error)
            return {
                manga: []
            }
        }
    }
)
const captureChapter = createAsyncThunk(
    'captureChapter',
    async ({ manga_id, page, headers }) => {
        try {

            let response = await axios.get("https://minga-grupoblanco.onrender.com/api/chapters?manga_id=" + manga_id + "&page=" + page + headers)
            console.log(response )  
            return { chapters: response.data.chapter }
        } catch (error) {
            return { chapters: [] }
        }
    }
)
const read_chapters = createAsyncThunk(
    'read_chapters',
    async ({ manga_id, page, headers }) => {
        try {
            let response = await axios.get("https://minga-grupoblanco.onrender.com/api/chapters/?manga_id=" + manga_id + "&page=" + page, headers)
            return { chapters: response.data.chapter }
        } catch (error) {
            return { chapters: [] }
        }
    }
)

const actions = { captureChapter, captureManga, read_chapters}

export default actions  