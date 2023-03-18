import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledErrorLabel from '../components/StyledErrorLabel'
import _ from 'lodash'

// Context
import UserContext from '../context/UserContext'

// Firebase
import { getDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

function EditBook() {
  const params = useParams()
  const navigate = useNavigate()
  const { user, dispatch } = useContext(UserContext)
  const [bookData, setBookData] = useState(null)

  const formik = useFormik({
    initialValues: {
      addedBy: '',
      isbn: '',
      title: '',
      author: '',
      datePublished: '',
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

  // Fetch current doc on initial load
  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, 'books', params.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setBookData({ ...docSnap.data() })
        formik.setValues(docSnap.data())
      }
    }
    fetchBook()
  }, [])

  // Redirect if user logs out
  useEffect(() => {
    if (!user) navigate('/')
  }, [user])

  const onFormSubmit = async (formData) => {
    dispatch({ type: 'SET_LOADING' })
    if (_.isEqual(formData, bookData)) {
      dispatch({ type: 'CLEAR_LOADING' })
      toast.error('No data was change')
    } else {
      try {
        // Create a form data copy
        const formDataCopy = { ...formData }
        // Add default timestamp values
        formDataCopy.dateUpdated = serverTimestamp()
        // Add new data into a collection
        await updateDoc(doc(db, 'books', params.id), formDataCopy)

        navigate('/')
      } catch (error) {
        toast.error('Something went wrong with update')
      } finally {
        dispatch({ type: 'CLEAR_LOADING' })
      }
    }
  }

  return (
    <Row>
      <Col xs={12} md={8} lg={6} xl={5} className="mx-auto">
        <h1>Edit Book</h1>
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
            Update Book
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default EditBook
