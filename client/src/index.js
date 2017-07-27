import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/root'
import registerServiceWorker from './registerServiceWorker'

import './css/index.css'
import './css/font-awesome.min.css'
import './css/helium.css'

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
