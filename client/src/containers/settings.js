import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Page from '../components/page'


class Settings extends Component{

	render(){
		return (
			<Page pageTitle="Settings"/>
		)
	}
}

const mapStateToProps = (state) => ({
	analysis: state.inventory
})

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Settings)