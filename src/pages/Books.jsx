import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'reactstrap'
import { toast } from 'react-toastify'
import styled from 'styled-components'

// Context
import UserContext from '../context/UserContext'

// Firebase
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore'
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
  const [books, setBooks] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
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
        toast.error('Could not fetch listings')
      } finally {
        dispatch({ type: 'CLEAR_LOADING' })
      }
    }
    fetchListings()
  }, [])

  useEffect(() => {}, [books])

  const onButtonClick = (e) => {
    console.log(e)
  }

  if (isLoading) return null

  return (
    <>
      {books === null ? (
        <p>Failed to load books.</p>
      ) : (
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
                <td>
                  {toDateTime(book.datePublished.seconds).toLocaleDateString()}
                </td>
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
                      onClick={() => onButtonClick(book.id)}
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
      )}
    </>
  )
}

export default Books
