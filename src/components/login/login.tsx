import { useState } from "react";
import { useAuth } from "../../contexts/authContext";

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    login(credentials);
  };

  return (
    <div className="login-form">
      <img src="/fulllogo.png" alt="Logo" className="logo-image" />
      <input
        type="text"
        name="email"
        placeholder="Username"
        value={credentials.email}
        onChange={onChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={onChange}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
