import LoginInput from "../components/LoginInput";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import React from "react";

function LoginPage({ loginSuccess }) {
  const navigate = useNavigate();
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className='login-page'>
      <h2>Silahkan masuk untuk melanjutkan ....</h2>
      <LoginInput login={onLogin} />
      <p>
        Belum punya akun? <Link to='/register'>Daftar di sini</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
