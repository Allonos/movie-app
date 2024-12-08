import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    surname: '',
  });

  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    if (!form.email.includes('@')) {
      setValidationError("Please enter a valid email.");
      return;
    }

    if (form.password.length < 5) {
      setValidationError("Password should be at least 5 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    dispatch(signUp(form));
  };

  const { user, error: signUpError } = useSelector(state => state.auth);

  if (user && !signUpError) {
    navigate(`/account`);
  }

  const handleLogInNavigation = () => {
    navigate('/log-in');
  }

  return (
    <div className="flex items-center justify-center mt-44">
      <div className="bg-white p-6 rounded-lg shadow-lg sm-phone:w-5/6 lg:w-1/3">
        <h1 className="sm:text-base md:text-2xl text-slate-700 mb-8 text-center">Sign Up and Unlock New Features</h1>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          className="input"
          onChange={handleChange}
        />
        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Sign Up
        </button>
        {validationError && <p className="text-red-500 mt-4">{validationError}</p>}
        {signUpError && <p className="text-red-500 mt-4">{signUpError}</p>}
        <p className="cursor-pointer mt-3 text-center text-slate-700 sm-phone:text-xs sm:text-base">
          If you already have an account click <span onClick={handleLogInNavigation} className="text-blue-600">log in</span>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
