import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { useAuth } from '../features/auth/hook/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


const App = () => {
  const { handleGetMe } = useAuth();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);

  useEffect(() => {
    console.log('App mounted, checking user session...');
    handleGetMe();
  }, [])

  return (
   
    <RouterProvider router={router} />
  )
}

export default App