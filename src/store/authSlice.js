import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeLocalStorage, setToLocalStorage } from '../utils/storageUtils';

const FIREBASE_URL = 'https://movie-app-c919a-default-rtdb.firebaseio.com/';

const initialState = {
  user: null,
  loading: true,
  error: null,
}

export const signUp = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password, confirmPassword, surname }, { rejectWithValue }) => {
    if (password !== confirmPassword) {
      return rejectWithValue('Passwords do not match.');
    }

    try {
      const response = await fetch(`${FIREBASE_URL}/users.json`);
      const users = await response.json();

      for (let key in users) {
        if (users[key].email === email) {
          return rejectWithValue('Email already exists.');
        }
      }

      const newUser = { email, password, surname };
      const saveResponse = await fetch(`${FIREBASE_URL}/users.json`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save user data.");
      }

      const result = await saveResponse.json();
      setToLocalStorage('userId', result.name);
      return { userId: result.name, email, surname };

    } catch (error) {
      return rejectWithValue(error.message || 'Failed to sign up.');
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/logInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${FIREBASE_URL}/users.json`);
      const users = await response.json();

      for (let key in users) {
        if (users[key].email === email && users[key].password === password) {
          setToLocalStorage('userId', key);
          return { userId: key, email: users[key].email, surname: users[key].surname };
        }
      }

      return rejectWithValue('Invalid email or password.');
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to log in.');
    }
  },
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${FIREBASE_URL}/users/${userId}.json`)
      const user = await response.json();
      return {...user, userId};
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user.');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      removeLocalStorage('userId');
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
