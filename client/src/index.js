import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/root'
import registerServiceWorker from './registerServiceWorker'

import './assets/css/index.css'
import './assets/css/font-awesome.min.css'
import './assets/css/helium.css'

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
