import React from 'react'
import { useParams } from 'react-router-dom'

function EditBook() {
  const params = useParams()

  return <div>Book ID: {params.id}</div>
}

export default EditBook
