import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Search from './components/Header/Search';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import SignUp from './components/User/SignUp';
import Account from './components/User/Account';
import LogIn from './components/User/LogIn';
import { getLocalStorageItem } from './utils/storageUtils';
import { useDispatch } from 'react-redux';
import { getUser, setLoading } from './store/authSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { getFavoriteItemsByUser, getWatchlistItemsByUser } from './store/productionSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = getLocalStorageItem('userId');
    if (userId) {
      dispatch(getUser({ userId }));
      dispatch(getFavoriteItemsByUser({ userId }));
      dispatch(getWatchlistItemsByUser({ userId }));
    } else {
      dispatch(setLoading(false));
    }

  }, [dispatch])
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/search"
          element={<Search />}
        />
        <Route path="/movie/:id" element={<Details type="movie" />} />
        <Route path="/tv/:id" element={<Details type="tv" />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/log-in' element={<LogIn />} />
        <Route
          path="/account"
          element={
              <ProtectedRoute>
                  <Account />
              </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;