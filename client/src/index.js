import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import registerServiceWorker from './registerServiceWorker'

import './css/index.css'
import './css/font-awesome.min.css'


ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
