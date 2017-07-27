import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import cx from 'classnames'

import './style.css'


export default class TabBar extends Component{
	constructor(props){
		super(props)

		this.state = {
			activeLink: 'home'
		}
	}

	getTabItems(){
		return tabItems.map((item, i) => {
			const cn = cx('tab-bar__link', {
				'tab-bar__link--active': this.state.activeLink === item.name
			})
			return (
				<Link onClick={() => this.setState({activeLink: item.name})}
					key={i} className={cn} to={item.path}>
					<span className={"icon icon-" + item.icon} />
				</Link>
			)
		})
	}
	render(){
		const {style} = this.props
		
		return (
			<div className="tab-bar" style={style}>
				{this.getTabItems()}
			</div>
		)
	}
}


const tabItems = [
	{
		name: 'home',
		path: '/',
		icon: 'cart'
	},
	{
		name: 'inventory',
		path: '/inventory',
		icon: 'edit'
	},
	{
		name: 'analysis',
		path: '/analysis',
		icon: 'rating'
	},
	{
		name: 'settings',
		path: '/settings',
		icon: 'settings'
	}
]