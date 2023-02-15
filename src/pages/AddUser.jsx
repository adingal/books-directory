import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

// Firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

const StyledErrorLabel = styled.span`
  display: block;
  position: absolute;
  bottom: -15px;
  left: 0;
  font-size: 0.75em;
  color: #dc3545;
`

function AddUser() {
  const navigate = useNavigate()
  const userTypes = [
    { label: 'User Type', value: '0' }, // Default disabled
    { label: 'user', value: '1' },
    { label: 'admin', value: '2' },
  ]
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 0,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 20 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(30, 'Must be 20 characters or less')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      userType: Yup.string()
        .oneOf(['1', '2'], 'User type is requried')
        .required('Required'),
    }),
    onSubmit: (values) => onFormSubmit(values),
  })

  const onFormSubmit = async (formData) => {
    const { firstName, lastName, email, password, userType } = formData
    try {
      // Initialize firebase authentication
      const auth = getAuth()
      // Create a user on firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      // Get created user
      const user = userCredential.user
      // Update display name
      updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      })
      // Create a form data copy
      const formDataCopy = { ...formData }
      // Delete user password from form data copy
      delete formDataCopy.password
      delete formDataCopy.confirmPassword
      // Add dateAdded and userType
      formDataCopy.dateAdded = serverTimestamp()
      formDataCopy.userType = userType === '1' ? 'user' : 'admin'
      // Add new data into a collection - if collection(users) does not exist, it will be created
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      console.log('Something went wrong with registration', error)
    }
  }

  const renderUserTypeOptions = (types) =>
    types.map((type) => {
      if (type.value === '0') {
        return (
          <option value={type.value} disabled key={type.value}>
            {type.label}
          </option>
        )
      }
      return (
        <option value={type.value} key={type.value}>
          {type.label}
        </option>
      )
    })

  return (
    <Row>
      <Col xs={12} md={8} lg={6} xl={5} className="mx-auto">
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  className={
                    formik.touched.firstName &&
                    formik.errors.firstName &&
                    'is-invalid'
                  }
                />
                <Label for="firstName">First Name</Label>
                {formik.touched.firstName && formik.errors.firstName && (
                  <StyledErrorLabel>{formik.errors.firstName}</StyledErrorLabel>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  className={
                    formik.touched.lastName &&
                    formik.errors.lastName &&
                    'is-invalid'
                  }
                />
                <Label for="lastName">Last Name</Label>
                {formik.touched.lastName && formik.errors.lastName && (
                  <StyledErrorLabel>{formik.errors.lastName}</StyledErrorLabel>
                )}
              </FormGroup>
            </Col>
          </Row>
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
          <Row>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword &&
                    'is-invalid'
                  }
                />
                <Label for="confirmPassword">Confirm Password</Label>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <StyledErrorLabel>
                      {formik.errors.confirmPassword}
                    </StyledErrorLabel>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Input
              id="userType"
              name="userType"
              type="select"
              className={`py-3 ${
                formik.touched.userType &&
                formik.errors.userType &&
                'is-invalid'
              }`}
              value={formik.values.userType}
              onChange={formik.handleChange}
            >
              {renderUserTypeOptions(userTypes)}
            </Input>
          </FormGroup>
          <Button size="lg" color="dark" type="submit" block>
            Add User
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default AddUser
