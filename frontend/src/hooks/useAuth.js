import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(""); 

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setSuccess("Login realizado com sucesso!");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    handleLogin,
  };
};

export default useAuth;
