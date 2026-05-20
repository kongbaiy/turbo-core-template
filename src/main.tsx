import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RepoErrorBoundary from '@repo/react-components/error-boundary'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RepoErrorBoundary>
            <App />
        </RepoErrorBoundary>
    </React.StrictMode>,
)
