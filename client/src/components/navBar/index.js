import React,{Component} from 'react'
import {
	Link
} from 'react-router-dom'

export default class NavBar extends Component{
	render(){
		return (
			<div style={styles.container}>
				<Link style={styles.link} to="/">Home</Link>
				<Link style={styles.link}to="/inventory">Inventory</Link>
			</div>
		)
	}
}

const styles = {
	container:{

	},
	link: {
		padding: 5
	}
}