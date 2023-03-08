import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import DeleteModal from '../components/DeleteModal'

// Context
import UserContext from '../context/UserContext'

// Firebase
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  limit,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase.config'

const StyledButton = styled(Button)`
  min-width: 72px;
  margin: 0 4px;
`

function toDateTime(secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}

function Books() {
  const { user, isLoading, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const [books, setBooks] = useState(null)
  const [deleteBook, setDeleteBook] = useState(false)
  const [modalState, setModalState] = useState(false)
  const [currentBook, setCurrentBook] = useState(null)

  // Fetch books on initial render
  useEffect(() => {
    fetchListings()
  }, [])

  // Re-render books state after fetching
  useEffect(() => {}, [books])

  useEffect(() => {
    // Delete book
    if (currentBook !== null && deleteBook) {
      const deleteBookOnDB = async (bookId) => {
        dispatch({ type: 'SET_LOADING' })
        try {
          const docRef = doc(db, 'books', bookId)
          await deleteDoc(docRef)
          fetchListings()
        } catch (error) {
          toast.error('Could not delete book')
        } finally {
          dispatch({ type: 'CLEAR_LOADING' })
          setDeleteBook(false)
        }
      }
      deleteBookOnDB(currentBook.id)
    }
  }, [currentBook, deleteBook])

  const fetchListings = async () => {
    dispatch({ type: 'SET_LOADING' })
    try {
      // Get collection reference
      const listingsRef = collection(db, 'books')

      // Create query
      const q = query(listingsRef, orderBy('dateAdded', 'desc'), limit(10))

      // Execute query
      const querySnap = await getDocs(q)

      let booksDb = []

      querySnap.forEach((doc) => {
        return booksDb.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      setBooks(booksDb)
    } catch (error) {
      toast.error('Could not fetch books')
    } finally {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }

  const onDeleteClick = (book) => {
    setModalState(true)
    setCurrentBook(book)
  }

  if (isLoading) return null

  return (
    <>
      {books === null ? (
        <p>Failed to load books.</p>
      ) : (
        <>
          <Row className="py-3">
            <Col xs={12} className="text-end">
              <StyledButton
                onClick={() => navigate('/books/add')}
                color="success"
                type="button"
              >
                Add
              </StyledButton>
            </Col>
          </Row>
          <Table>
            <thead className="bg-dark text-light">
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
                <th>Last Update</th>
                {user?.uid && <th>Update</th>}
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <th scope="row">{book.isbn}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.datePublished}</td>
                  <td>
                    {toDateTime(book.dateUpdated.seconds).toLocaleDateString()}
                  </td>
                  {user?.uid && (
                    <td className="d-flex">
                      <StyledButton
                        onClick={() => navigate(`/books/edit/${book.id}`)}
                        type="button"
                        color="primary"
                      >
                        Edit
                      </StyledButton>
                      <StyledButton
                        onClick={() => onDeleteClick(book)}
                        type="button"
                        color="danger"
                      >
                        Delete
                      </StyledButton>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {modalState !== null && (
        <DeleteModal
          currentBook={currentBook}
          modalState={modalState}
          setModalState={setModalState}
          setDeleteBook={setDeleteBook}
        />
      )}
    </>
  )
}

export default Books
