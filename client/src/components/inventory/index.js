import React,{Component} from 'react'

import Page from '../page'

export default class Inventory extends Component{

	render(){
		const content = (
			<div style={styles.container}>
				<span>What's in the box?</span>
			</div>
		)
		return (
			<Page pageTitle="Inventory"
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