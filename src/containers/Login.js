import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, login } from "../features/userAuthSlice";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/UnauthNavBar";
import Loading from "../components/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userAuth);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    dispatch(
      signup({
        email: signupEmail,
        username: signupUsername,
        password: signupPassword,
      })
    )
      .then((response) => {
        if (response.error) {
          setSignupError(response.error.message);
        } else {
          setSignupEmail("");
          setSignupUsername("");
          setSignupPassword("");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    dispatch(login({ username: loginUsername, password: loginPassword }))
      .then((response) => {
        if (response.error) {
          setLoginError(response.error.message);
        } else {
          setLoginUsername("");
          setLoginPassword("");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/homepage");
    } else {
      navigate("/");
    }
  }, [navigate, user.isLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="login">
      <NavBar />
      <div className="container text-center ">
        <div className="row  mt-0">
          <div className="col-6 text-center d-flex flex-column align-items-center mt-5">
            <h4 className="title-color">
              <strong>Find Your Perfect Pint</strong>
            </h4>
            <p className="text-center">
              Discover and explore the world of beer with Pint Pursuit. Whether
              you're a beer enthusiast or simply looking for a new place to
              enjoy quality brews, Pint Pursuit helps you find breweries near
              you. Embark on a beer-tasting adventure and connect with fellow
              beer lovers. Cheers to a world of great beer, all at your
              fingertips.
            </p>
          </div>
          <div className="col-6">
            <div className="card shadow mt-5">
              <form onSubmit={handleLoginSubmit}>
                <div className="row">
                  <div className="form-group col ms-3 me-3 mt-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Username"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col m-3">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                {user.loginError && (
                  <div className="row">
                    <div className="col">
                      <p className="text-danger">
                        Invalid username or password
                      </p>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col ms-3 me-3">
                    <button type="submit" className="btn btn-primary col-12">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <br />
              <hr className="ms-3 me-3 mb-0 mt-0" />
              <br />
              <div className="row">
                <div className="col">
                  <h6 className="mb-3">Not a member?</h6>
                  <button
                    className="btn btn-danger mb-3"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#signup-modal"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="signup-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modal-title">
                Sign Up
              </h5>
              <button
                type="submit"
                className="close btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <form onSubmit={handleSignupSubmit}>
                <div className="row">
                  <div className="form-group col ms-3 me-3 mt-3">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col ms-3 me-3 mt-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Username"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col m-3">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                {signupEmail && signupPassword ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Sign Up
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                )}
              </form>
              {user.signupError && (
                <div className="row">
                  <div className="col">
                    <p className="text-danger mt-2">
                      Email or username already in use
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
