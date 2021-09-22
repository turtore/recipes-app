import React from 'react';
import { Form, Button, FloatingLabel, Container } from 'react-bootstrap';
import './pages-css/LoginPage.css';

function LoginPage() {
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
            data-testid="email-input"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            data-testid="password-input"
          />
        </FloatingLabel>
        <div className="d-grid gap-2 mt-2">
          <Button
            variant="success"
            type="button"
            size="lg"
            data-testid="login-submit-btn"
          >
            Entrar
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default LoginPage;
