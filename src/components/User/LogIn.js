import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../store/authSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(logIn({ email: form.email, password: form.password }));
  };

  if (user && !error) {
    navigate(`/account`, { state: { email: user.email, surname: user.surname } });
  }

  return (
    <div className="flex items-center justify-center mt-44">
      <div className="bg-white p-6 rounded-lg shadow-lg sm-phone:w-5/6 lg:w-1/3">
        <h1 className="text-2xl text-slate-700 mb-8 text-center">Welcome Back – Let’s Get You Logged In!</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Log In
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LogIn;
