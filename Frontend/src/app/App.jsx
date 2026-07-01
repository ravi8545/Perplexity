import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { useAuthinit } from '../features/auth/hook/useAuthinit'


const App = () => {
  useAuthinit();

  return (
   
    <RouterProvider router={router} />
  )
}

export default App