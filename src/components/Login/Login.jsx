import React, {useState, useEffect} from 'react'
import './Login.scss'
import { useNavigate } from "react-router-dom";


const Login = () => {
  let navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "", 
  });

  const initialState = {
    email: "",
    password: "",
  };

  const clearState = () => {
    setData({ ...initialState });
  };

  useEffect(() => {
    if (data.email == "") {
      setMessage("It has to be a valid e-mail, please 👎.");
      setBtnDisabled(true);
    } else if (data.password.length < 8) {
      setMessage("password must be at least 8 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
  }, [data]);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(data));
    clearState();
    setTimeout(() => {
      navigate("/products");
    }, 3000);
    setVisible(false);
  };

  return (
    <>
    
      <div><span>Login here</span> 🧑🏼‍💻</div>
      <form onSubmit={handleSubmit}>
      <fieldset >
        <input
          type="email"
          placeholder="insert your E-mail"
          value={data.email}
          onChange={handleInputChange}
          name="email"
        />
        <input
          type="text"
          placeholder="insert your password"
          value={data.password}
          onChange={handleInputChange}
          name="password"
        />
        <button type="submit" disabled={btnDisabled}>
          Log in with your user
        </button>
        </fieldset>
       
      </form>
      {<p>{visible ? message : "Redirecting you to products..."}</p>}
    </>
  );
  
};


export default Login