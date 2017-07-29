import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Page from '../components/page'

class Purchase extends Component{

	render(){
		const content = (
			<div style={styles.container}>
				<span>There isn't really much here</span>
			</div>
		)
		return (
			<Page pageTitle="Purchase"
				content={content}
			/>
		)
	}
}

const styles = {
	container:{

	}
}

const mapStateToProps = (state) => ({
	purchase: state.inventory
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Purchase)