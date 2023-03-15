import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import StyledErrorLabel from '../components/StyledErrorLabel'

// Context
import UserContext from '../context/UserContext'

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

function Login() {
  const navigate = useNavigate()
  const { dispatch } = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => onFormSubmit(values),
  })

  const onFormSubmit = async (formData) => {
    const { email, password } = formData
    dispatch({ type: 'SET_LOADING' })
    try {
      // Initialize firebase authentication
      const auth = getAuth()
      // Sign in with firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      // If successfully signed in
      if (userCredential.user) {
        const docRef = doc(db, 'users', userCredential.user.uid)
        const docSnap = await getDoc(docRef)
        dispatch({
          type: 'LOGIN',
          payload: { ...userCredential.user, userData: docSnap.data() },
        })
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad user credentials')
    } finally {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }

  return (
    <Row>
      <Col xs={12} md={8} lg={6} xl={4} className="mx-auto">
        <h1>Login</h1>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup floating>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email && 'is-invalid'
              }
            />
            <Label for="email">Email</Label>
            {formik.touched.email && formik.errors.email && (
              <StyledErrorLabel>{formik.errors.email}</StyledErrorLabel>
            )}
          </FormGroup>
          <FormGroup floating>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={
                formik.touched.password &&
                formik.errors.password &&
                'is-invalid'
              }
            />
            <Label for="password">Password</Label>
            {formik.touched.password && formik.errors.password && (
              <StyledErrorLabel>{formik.errors.password}</StyledErrorLabel>
            )}
          </FormGroup>
          <Button size="lg" color="dark" type="submit" block>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
