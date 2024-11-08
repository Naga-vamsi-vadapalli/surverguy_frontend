import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch search results based on query and page
export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async ({ query, page }) => {
    const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`);
    return response.data;
  }
);

// Fetch most popular posts (front page) if no query is present
export const fetchPopularPosts = createAsyncThunk(
  'search/fetchPopularPosts',
  async () => {
    const response = await axios.get('https://hn.algolia.com/api/v1/search?tags=front_page');
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    query: '',
    page: 0,
    loading: false,
    searchHistory: [],
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading state for search results
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.hits;
        state.searchHistory.push({ query: state.query, time: new Date().toLocaleString() });
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false;
      })

      // Handle loading state for popular posts
      .addCase(fetchPopularPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.hits;
      })
      .addCase(fetchPopularPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setQuery, setPage } = searchSlice.actions;
export default searchSlice.reducer;
