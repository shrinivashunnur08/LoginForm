import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import InputField from "./components/InputField";

// -------------------- LOGIN PAGE --------------------
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      navigate("/signup");
      return;
    }

    if (storedUser.username !== username.toLowerCase()) {
      setError("User not found. Please sign up first.");
      return;
    }

    if (storedUser.password !== password) {
      setError("Incorrect password, Try again.");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="login-container">
      {/* Logo instead of header */}
      <img
        src="/login.png"
        alt="Login"
        style={{ display: "block", margin: "0 auto 1.5rem", width: "100px" }}
      />

      <form className="login-form" onSubmit={handleLogin}>
        <InputField
          type="text"
          placeholder="Username"
          icon="person"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: "#c00", marginTop: "0.25rem" }}>{error}</p>
        )}

        <Link to="/forgot-password" className="forgot-password-link">
          Forgot password?
        </Link>

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <p className="signup-prompt">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

// -------------------- SIGNUP PAGE --------------------
const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !confirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const generatedUsername =
      firstName.trim().toLowerCase() + "_" + lastName.trim().toLowerCase();

    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName,
        lastName,
        username: generatedUsername,
        email,
        password,
      })
    );

    alert(
      `Account created successfully! Your username is: ${generatedUsername}`
    );
    navigate("/");
  };

  return (
    <div className="login-container">
      {/* Logo instead of header */}
      <img
        src="/signup.png"
        alt="Sign Up"
        style={{ display: "block", margin: "0 auto 1.5rem", width: "75px" }}
      />

      <form className="login-form" onSubmit={handleSignup}>
        <InputField
          type="text"
          placeholder="First Name"
          icon="person"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Last Name"
          icon="person"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email address"
          icon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          icon="lock"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && (
          <p style={{ color: "#c00", marginTop: "0.25rem" }}>{error}</p>
        )}

        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>

      <p className="signup-prompt">
        Already have an account?{" "}
        <Link to="/" className="signup-link">
          Log in
        </Link>
      </p>
    </div>
  );
};

// -------------------- FORGOT PASSWORD --------------------
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleFindAccount = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      (storedUser.email === identifier ||
        storedUser.username === identifier.toLowerCase())
    ) {
      setStep(2);
    } else {
      setError("No account found. Please check the input or sign up first.");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setError("No account exists. Please sign up first.");
      return;
    }

    if (
      storedUser.email !== identifier &&
      storedUser.username !== identifier.toLowerCase()
    ) {
      setError("Account mismatch. Go back and verify identifier.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ ...storedUser, password: newPassword })
    );

    alert("Password reset successfully. Please log in.");
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Forgot Password</h2>

      {step === 1 && (
        <form className="login-form" onSubmit={handleFindAccount}>
          <InputField
            type="text"
            placeholder="Email address or Username"
            icon="person"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          {error && (
            <p style={{ color: "#c00", marginTop: "0.25rem" }}>{error}</p>
          )}

          <button type="submit" className="login-button">
            Continue
          </button>

          <p className="signup-prompt" style={{ marginTop: "1rem" }}>
            Remembered it?{" "}
            <Link to="/" className="signup-link">
              Back to Login
            </Link>
          </p>
        </form>
      )}

      {step === 2 && (
        <form className="login-form" onSubmit={handleReset}>
          <InputField
            type="password"
            placeholder="New password (min 6 chars)"
            icon="lock"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Confirm new password"
            icon="lock"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && (
            <p style={{ color: "#c00", marginTop: "0.25rem" }}>{error}</p>
          )}

          <button type="submit" className="login-button">
            Reset Password
          </button>

          <p className="signup-prompt" style={{ marginTop: "1rem" }}>
            Entered wrong account?{" "}
            <Link to="/" className="signup-link">
              Start over
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

// -------------------- HOME PAGE --------------------
const Home = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate("/");
  };

  return (
    <div className="login-container" style={{ textAlign: "center" }}>
      <h2 className="form-title">
        Welcome,{" "}
        <span style={{ color: "#5F41E4" }}>
          {storedUser?.firstName} {storedUser?.lastName}
        </span>{" "}
        🎉
      </h2>
      <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "500" }}>
        You are successfully logged in!
      </p>
      {/* <p style={{ marginTop: "10px", fontSize: "16px" }}>
        Your username:{" "}
        <strong style={{ color: "#5F41E4" }}>{storedUser?.username}</strong>
      </p> */}
      <button
        onClick={handleLogout}
        className="login-button"
        style={{ marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  );
};

// -------------------- MAIN APP --------------------
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
