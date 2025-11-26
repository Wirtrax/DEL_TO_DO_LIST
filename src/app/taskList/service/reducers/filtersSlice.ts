import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortingState {
  searchTerm: string;
  sortBy: 'isCompleted' | 'isImport' | '';
}
const initialState: SortingState = {
  searchTerm: '',
  sortBy: '',
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'isCompleted' | 'isImport' | ''>) => {
      state.sortBy = action.payload;
    },
    resetSorting: (state) => {
      state.searchTerm = '';
      state.sortBy = '';
    },
  },
});
export const { setSearchTerm, setSortBy, resetSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
