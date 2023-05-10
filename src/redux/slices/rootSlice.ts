import { createSlice } from '@reduxjs/toolkit';

export interface HeroState {
    name: string,
    description: string,
    comic_in: number,
    super_power: String

}

const initialState: HeroState = {
    name: 'Batman',
    description: '',
    comic_in: 0,
    super_power: ''

}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseComic: (state, action) => { state.comic_in = action.payload },
        chooseSuper: (state, action) => { state.super_power = action.payload }
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
    chooseName,
    chooseDescription,
    chooseComic,
    chooseSuper
} = rootSlice.actions;