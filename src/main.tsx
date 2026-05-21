import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'uno.css'
import './index.css'

import { RepoErrorBoundary as Error } from '@repo/react-components'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Error>
            <App />
        </Error>
    </React.StrictMode>,
)
