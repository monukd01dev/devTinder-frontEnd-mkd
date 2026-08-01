import { Routes, Route, useLocation } from 'react-router'
import { Toaster } from 'react-hot-toast'
// components
import Main from './components/Main'
import PageWrapper from './components/PageWrapper'
// Guards
import GuestRoute from './guards/GuestRoute'
import ProtectedRoute from './guards/ProtectedRoute'
// pages
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Feed from './pages/Feed'
import Connections from './pages/Connections'
import Profile from './pages/Profile'
import Requests from './pages/Requests'
import NotFound from './pages/NotFound'
import Account from './pages/Account'
//hooks
import usePersistenLogin from './hooks/usePersistenLogin'
import useScrollToTop from './hooks/useScrollToTop' // 👈 Jo hook humne banaya tha
//Animation 
import { AnimatePresence } from 'framer-motion'
import SplashScreen from './components/SplashScreen'

function App() {
  useScrollToTop(); // Scroll top hook

  const { loading } = usePersistenLogin();
  const location = useLocation()
  const isHomePage = location.pathname === '/';

  if (loading && !isHomePage) {
    return <SplashScreen />
  }

  return (
    <div className='w-full min-h-screen overflow-x-clip bg-base-100 text-base-content'>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>

          <Route path='/' element={<Main />} >
            <Route index element={<HomePage />} />

            <Route path='user'>
              <Route path='login' element={<GuestRoute><Login /></GuestRoute>} />
              <Route path='signup' element={<GuestRoute><Signup /></GuestRoute>} />
              <Route path='feed' element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Feed />
                  </PageWrapper>
                </ProtectedRoute>
              } />
              <Route path='connections' element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Connections />
                  </PageWrapper>
                </ProtectedRoute>
              } />
              <Route path='profile' element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Profile />
                  </PageWrapper>
                </ProtectedRoute>
              } />
              <Route path='account' element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Account />
                  </PageWrapper>
                </ProtectedRoute>
              } />
              <Route path='requests/recieved' element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Requests />
                  </PageWrapper>
                </ProtectedRoute>
              } />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Route>

        </Routes>
      </AnimatePresence>
      <Toaster />
    </div>
  )
}

export default App