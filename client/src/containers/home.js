import React,{Component} from 'react'

import Page from '../components/page'

export default class Home extends Component{

	render(){
		const content = (
			<div style={styles.container}>
				<span>There isn't really much here</span>
			</div>
		)
		return (
			<Page pageTitle="Home"
				pageIcon="fa-angle-left"
				content={content}
			/>
		)
	}
}

const styles = {
	container:{

	}
}