import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD2ZGbrxQiolJiJBI_z68kLbRjrm817gZc',
  authDomain: 'books-directory-69e1c.firebaseapp.com',
  projectId: 'books-directory-69e1c',
  storageBucket: 'books-directory-69e1c.appspot.com',
  messagingSenderId: '17908352654',
  appId: '1:17908352654:web:400961a831d3abf18febdf',
}

initializeApp(firebaseConfig)
export const db = getFirestore()
