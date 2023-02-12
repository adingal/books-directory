import React from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'

function Login() {
  return (
    <Row>
      <Col xs={12} md={8} lg={6} xl={4} className="mx-auto">
        <Form>
          <FormGroup floating>
            <Input id="email" name="email" placeholder="Email" type="email" />
            <Label for="email">Email</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
            <Label for="password">Password</Label>
          </FormGroup>
          <Button size="lg" color="dark" block>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
