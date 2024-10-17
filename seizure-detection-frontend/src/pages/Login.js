import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
