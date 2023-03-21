import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table, Row, Col } from 'reactstrap'
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

function Users() {
  const { user, isLoading, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState(null)

  // Fetch users on initial render
  useEffect(() => {
    fetchUsers()
  }, [])

  // Re-render users state after fetching
  useEffect(() => {}, [users])

  const fetchUsers = async () => {
    dispatch({ type: 'SET_LOADING' })
    try {
      // Get collection reference
      const usersRef = collection(db, 'users')

      // Create query
      const q = query(usersRef, orderBy('lastName', 'desc'), limit(10))

      // Execute query
      const querySnap = await getDocs(q)

      let usersDb = []

      querySnap.forEach((doc) => {
        return usersDb.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      setUsers(usersDb)
    } catch (error) {
      toast.error('Could not fetch users')
    } finally {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }

  if (isLoading) return null

  return (
    <>
      {users === null ? (
        <p>Failed to load users.</p>
      ) : (
        <>
          {user?.uid && (
            <Row className="py-3">
              <Col xs={12} className="text-end">
                <StyledButton
                  onClick={() => navigate('/users/add')}
                  color="success"
                  type="button"
                >
                  Add User
                </StyledButton>
              </Col>
            </Row>
          )}
          <Table>
            <thead className="bg-dark text-light">
              <tr>
                <th>User Type</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {users.map((currentUser) => (
                <tr key={currentUser.id}>
                  <th scope="row">{currentUser.userType}</th>
                  <td>{currentUser.firstName}</td>
                  <td>{currentUser.lastName}</td>
                  <td>{currentUser.email}</td>
                  <td>
                    {toDateTime(
                      currentUser.dateAdded.seconds
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default Users
