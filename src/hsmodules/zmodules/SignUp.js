import React, {useState} from "react";
import client from "../feathers";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export default function SignUp() {
  const {register, handleSubmit, watch, errors} = useForm();
  const [error, setError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const userServ = client.service("/users");
  const navigate = useNavigate();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setErrorMessage("");
    setError(false);
    if (data.password !== data.password2) {
      setErrorMessage("Passwords not identical");
      setError(true);
      return;
    }
    delete data.password2;
    console.log(data);
    userServ
      .create(data)
      .then(res => {
        console.log(JSON.stringify(res));
        alert("User Created Successfully");
        e.target.reset();
        navigate("/");
      })
      .catch(err => {
        setErrorMessage(
          "Error with creating User, probable network issues " + err
        );
        setError(true);
      });
  };

  return (
    <section className="section">
      <div className="container signupcenter">
        <div className="columns">
          <div className="column is-4 is-offset-4">
            <div className="card ">
              <header className="card-header">
                <p className="card-header-title">HealthStack: Sign Up</p>
              </header>
              <div className="card-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="field is-small">
                    <label className="label is-small">
                      First Name
                      <div className="control ">
                        <input
                          className="input is-small"
                          {...register("x", {required: true})}
                          type="text"
                          placeholder="Enter Full Name"
                          name="firstname"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field is-small">
                    <label className="label is-small">
                      Last Name
                      <div className="control ">
                        <input
                          className="input is-small"
                          {...register("x", {required: true})}
                          type="text"
                          placeholder="Enter Full Name"
                          name="lastname"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field is-small">
                    <label className="label is-small  ">
                      Phone Number
                      <div className="control ">
                        <input
                          className="input is-small"
                          {...register("x", {required: true})}
                          type="text"
                          placeholder="Enter Phone Number"
                          name="phone"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field is-small">
                    <label className="label is-small  ">
                      Email
                      <div className="control ">
                        <input
                          className="input is-small"
                          {...register("x", {required: true})}
                          type="text"
                          placeholder="Enter email"
                          name="email"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="field is-small">
                    <label className="label is-small  ">
                      Password
                      <div className="control ">
                        <input
                          className="input is-small"
                          {...register("x", {required: true})}
                          type="password"
                          placeholder="Password"
                          name="password"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field is-small">
                    <label className="label is-small  ">
                      Repeat Password
                      <div className="control ">
                        <input
                          className="input is-small"
                          {...register("x", {required: true})}
                          type="password"
                          placeholder="Password"
                          name="password2"
                        />
                      </div>
                    </label>
                  </div>

                  {/* <div className="field">
                            <label className="label is-small">Username
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-success  is-small" type="text" placeholder="Text input" value={"bulma"} />
                                <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </div>
                            </label>
                            <p className="help is-success">This username is available</p>
                        </div>

                        <div className="field">
                            <label className="label is-small">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-danger is-small" type="email" placeholder="Email input" value="hello@" />
                                <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-exclamation-triangle"></i>
                                </span>
                            </div>
                            <p className="help is-danger">This email is invalid</p>
                        </div>

                        <div className="field">
                        <label className="label is-small">Subject</label>
                        <div className="control is-small">
                            <div className="select">
                            <select>
                                <option>Select dropdown</option>
                                <option>With options</option>
                            </select>
                            </div>
                        </div>
                        </div> */}

                  {/*  <div className="field">
                            <label className="label">Message</label>
                            <div className="control">
                                <textarea className="textarea is-small" placeholder="Textarea"></textarea>
                            </div>
                        </div> */}

                  {/*  <div className="field">
                            <div className="control is-small">
                                <label className="checkbox">
                                <input type="checkbox"/>
                                I agree to the <a href="./terms">terms and conditions</a>
                                </label>
                            </div>
                        </div> */}

                  {/*  <div className="field">
                            <div className="control">
                                <label className="radio is-small">
                                <input type="radio" name="question"/>
                                Yes
                                </label>
                                <label className="radio is-small">
                                <input type="radio" name="question" />
                                No
                                </label>
                            </div>
                        </div> */}

                  <div className="field is-grouped">
                    <div className="control">
                      <button type="submit" className="button is-link is-small">
                        Submit
                      </button>
                    </div>
                    {/*  <div className="control">
                                <button className="button is-link is-light is-small" >Cancel</button>
                            </div> */}
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
