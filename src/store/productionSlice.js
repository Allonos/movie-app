import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const FIREBASE_URL = 'https://movie-app-c919a-default-rtdb.firebaseio.com/';

const initialState = {
  watchlist: {
    movies: [],
    tvShows: [],
  },
  favorites: {
    movies: [],
    tvShows: [],
  },
  isLoading: true,
}

export const getFavoriteItemsByUser = createAsyncThunk(
  "production/getFavoriteItemsByUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${FIREBASE_URL}/favorites/${userId}.json`)
      const favorites = await response.json();
      return { movies: favorites?.movies || [], tvShows: favorites?.tvShows || [] };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get favorites items.');
    }
  },
);
export const getWatchlistItemsByUser = createAsyncThunk(
  "production/getWatchlistItemsByUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${FIREBASE_URL}/watchlist/${userId}.json`)
      const watchlist = await response.json();
      return { movies: watchlist?.movies || [], tvShows: watchlist?.tvShows || [] };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get watchlist items.');
    }
  },
);

export const updateFavoriteItems = createAsyncThunk(
  "production/updateFavoriteItems",
  async ({ userId, movies, tvShows }, { rejectWithValue }) => {
    try {
      const updatedProduction = {
        movies,
        tvShows
      };
  
      const response = await fetch(`${FIREBASE_URL}/favorites/${userId}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduction),
      })

      const data = await response.json();

      return { movies: data.movies || [], tvShows: data.tvShows || [] }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get production items.');
    }
  },
);

export const updateWatchlistItems = createAsyncThunk(
  "production/updateWatchlistItems",
  async ({ userId, movies, tvShows }, { rejectWithValue }) => {
    try {
      const updatedProduction = {
        movies,
        tvShows
      };
  
      const response = await fetch(`${FIREBASE_URL}/watchlist/${userId}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduction),
      })

      const data = await response.json();
      return { movies: data.movies || [], tvShows: data.tvShows || [] }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get production items.');
    }
  },
);

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteItemsByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFavoriteItemsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(getFavoriteItemsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getWatchlistItemsByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWatchlistItemsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = action.payload;
      })
      .addCase(getWatchlistItemsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateFavoriteItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFavoriteItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(updateFavoriteItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateWatchlistItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWatchlistItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = action.payload;
      })
      .addCase(updateWatchlistItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export default productionSlice.reducer;
