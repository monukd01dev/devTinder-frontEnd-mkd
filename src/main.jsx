import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './store/appStore.js'
import { BrowserRouter } from 'react-router'
import { ErrorBoundary } from 'react-error-boundary' // 🚨 Naya import
import ErrorPage from './pages/ErrorPage.jsx' // 🚨 Tera naya Error Page

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={appStore}>
      <BrowserRouter basename='/app'>
        
        {/* 🚨 THE SUPREME SHIELD */}
        <ErrorBoundary 
          FallbackComponent={ErrorPage}
          onReset={() => {
            // Jab user 'Try Again' dabayega, hum chahein toh koi state clear kar sakte hain
            console.log("Resetting app state...");
          }}
        >
          <App />
        </ErrorBoundary>

      </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
)
