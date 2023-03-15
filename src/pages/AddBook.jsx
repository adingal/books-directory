import React, { useContext, useEffect } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Context
import UserContext from '../context/UserContext'

// Firebase
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

const StyledErrorLabel = styled.span`
  display: block;
  position: absolute;
  bottom: -15px;
  left: 0;
  font-size: 0.75em;
  color: #dc3545;
`

function AddBook() {
  const { user, dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      addedBy: user?.uid,
      isbn: '',
      title: '',
      author: '',
      datePublished: Number(new Date().getFullYear()),
    },
    validationSchema: Yup.object({
      isbn: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .max(10, 'Must be 10 characters or less')
        .required('Required'),
      title: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      author: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      datePublished: Yup.number()
        .min(1500, 'Must be 1500 characters or more')
        .max(3000, 'Must be 3000 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => onFormSubmit(values),
  })

  // Redirect if user logs out
  useEffect(() => {
    if (!user) navigate('/')
  }, [user])

  const onFormSubmit = async (formData) => {
    console.log(formData)
    dispatch({ type: 'SET_LOADING' })
    try {
      // Create a form data copy
      const formDataCopy = { ...formData }
      // Add default timestamp values
      formDataCopy.dateAdded = serverTimestamp()
      formDataCopy.dateUpdated = serverTimestamp()
      // Add new data into a collection
      await addDoc(collection(db, 'books'), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    } finally {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }

  return (
    <Row>
      <Col xs={12} md={8} lg={6} xl={5} className="mx-auto">
        <h1>Add Book</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  className={
                    formik.touched.title && formik.errors.title && 'is-invalid'
                  }
                />
                <Label for="title">Title</Label>
                {formik.touched.title && formik.errors.title && (
                  <StyledErrorLabel>{formik.errors.title}</StyledErrorLabel>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="author"
                  name="author"
                  placeholder="Author"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                  className={
                    formik.touched.author &&
                    formik.errors.author &&
                    'is-invalid'
                  }
                />
                <Label for="author">Author</Label>
                {formik.touched.author && formik.errors.author && (
                  <StyledErrorLabel>{formik.errors.author}</StyledErrorLabel>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="isbn"
                  name="isbn"
                  placeholder="ISBN"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.isbn}
                  className={
                    formik.touched.isbn && formik.errors.isbn && 'is-invalid'
                  }
                />
                <Label for="isbn">ISBN</Label>
                {formik.touched.isbn && formik.errors.isbn && (
                  <StyledErrorLabel>{formik.errors.isbn}</StyledErrorLabel>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="datePublished"
                  name="datePublished"
                  placeholder="Date Published"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.datePublished}
                  className={
                    formik.touched.datePublished &&
                    formik.errors.datePublished &&
                    'is-invalid'
                  }
                />
                <Label for="datePublished">Date Published</Label>
                {formik.touched.datePublished &&
                  formik.errors.datePublished && (
                    <StyledErrorLabel>
                      {formik.errors.datePublished}
                    </StyledErrorLabel>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Button size="lg" color="dark" type="submit" block>
            Add Book
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default AddBook
