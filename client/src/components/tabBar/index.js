import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import cx from 'classnames'

import './style.css'


class TabBar extends Component{
	constructor(props){
		super(props)

		const path = props.history.location.pathname.slice(1)
		let activeLink
		switch (path){
			case '':
				activeLink = 'home'
				break
			default:
				activeLink = path
		}
		this.setState({activeLink})
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

export default withRouter(TabBar)