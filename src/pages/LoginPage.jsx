import React, { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel, Container } from 'react-bootstrap';
import './pages-css/LoginPage.css';

const LoginPage = () => {
  /* ------SETANDO ESTADOS--------- */
  const [inputsState, setInputsState] = useState({
    email: '',
    password: '',
  });
  const [btnDisabledStatus, setBtnDisabledStatus] = useState(true);

  /* ------FUNÇÃO QUE LIDA COM CADA MUDANÇA QUE HOUVER NOS INPUTS (EMAIL E SENHA)------*/
  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    });
  };

  /* useEffect utilizado para que toda vez que o inputsState for alterado, seja verificado se o
    e-mail e password são validos ou não. Se forem validos, o botão é habilitado. */
  useEffect(() => {
    const emailVerification = /\S+@\S+\.\S+/;
    const isValidEmail = emailVerification.test(inputsState.email);
    const MAX_LENGTH = 6;
    const isValidPassword = inputsState.password.length > MAX_LENGTH;

    if (isValidEmail && isValidPassword) {
      setBtnDisabledStatus(false);
    } else {
      setBtnDisabledStatus(true);
    }
  }, [inputsState]);

  return (
    <Container className="login-container">
      <h1 className="mb-4">Login</h1>
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Email"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            onChange={ handleChange }
            value={ inputsState.email }
            data-testid="email-input"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={ handleChange }
            value={ inputsState.password }
            data-testid="password-input"
          />
        </FloatingLabel>
        <div className="d-grid gap-2 mt-2">
          <Button
            variant="success"
            type="button"
            size="lg"
            disabled={ btnDisabledStatus }
            data-testid="login-submit-btn"
          >
            Entrar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
