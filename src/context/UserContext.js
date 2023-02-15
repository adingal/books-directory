import { createContext, useReducer } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'CLEAR_LOADING':
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const initialState = {
    user: null,
    isLoading: false,
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
