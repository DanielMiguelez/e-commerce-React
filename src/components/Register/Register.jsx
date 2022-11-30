import React, {useState, useEffect} from 'react'
import './Register.scss'
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState({
    name: "",
    surname: "", 
    city:"",
    email: "",
    password: "", 
  });

  const initialState = {
    name: "",
    surname: "", 
    city:"",
    email: "",
    password: "", 
  };

  const clearState = () => {
    setData({ ...initialState });
  };

  useEffect(() => {
    if (data.name === "") {
      setMessage("Fill your name, please.");
      setBtnDisabled(true);
    }else if (data.surname.length === "") {
      setMessage("write your surname, please");
      setBtnDisabled(true);
    } else if (data.password.length < 8) {
      setMessage("password must be at least 8 characters");
      setBtnDisabled(true);
    }else if (data.city.length === "") {
      setMessage("Fill the city field, please");
      setBtnDisabled(true);
     } else if (data.email === "") {
      setMessage("Fill your email, please");
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
      <div><span>Register here</span> 🧑🏼‍💻</div>
      <form onSubmit={handleSubmit}>
      <fieldset className='registerfieldset' >
        <input
          type="text"
          placeholder="insert your name"
          value={data.name}
          onChange={handleInputChange}
          name="name"
        />
          <input
          type="text"
          placeholder="insert your surname"
          value={data.surname}
          onChange={handleInputChange}
          name="surname"
        />
          <input
          type="text"
          placeholder="insert your city"
          value={data.city}
          onChange={handleInputChange}
          name="city"
        />
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
      {<p>{visible ? message : "Heading to products"}</p>}
    </>
  );
  
};


export default Register