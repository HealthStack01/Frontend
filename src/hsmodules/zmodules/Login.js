import React, {useState, useContext} from "react";
import client from "../feathers";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context";
import {toast} from "bulma-toast";

export default function Login() {
  const {register, handleSubmit, watch, errors} = useForm();
  const [error, setError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const userServ=client.service('/users')
  const navigate = useNavigate();
  const {/* user, */ setUser} = useContext(UserContext);

  const onSubmit = (data, e) => {
    e.preventDefault();
    /* setErrorMessage("")
        setError(false) */
    const email = data.email;
    const password = data.password;

    client
      .authenticate({
        strategy: "local",
        email,
        password,
      })
      .then(async res => {
        // console.log(JSON.stringify(res.user))
        e.target.reset();
        await setUser(res.user);
        //console.log(user)
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/app");
      })
      .catch(err => {
        //setErrorMessage("Error loggin in User, probable network issues "+ err )
        toast({
          message: "Error loggin in User, probable network issues " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-4 ">
            <div className="card v-centered">
              <div className="card-header">
                <p className="card-header-title">Health Stack</p>
              </div>
              <div className="card-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input
                        className="input"
                        {...register("x", {required: true})}
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input"
                        {...register("x", {required: true})}
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button className="button is-success is-small">
                        Login
                      </button>
                    </p>
                  </div>
                  {error && <div className="message"> {errorMessage}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
