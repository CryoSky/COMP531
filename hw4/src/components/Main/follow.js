import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {unfollow} from '../../actions'

export const Follower = ({name, avatar,id, headline,cancelfollow}) => (
	<div className="row text-center">
		<br/>
		<img src = {avatar} className="img-circle" style = {{width:"100px", height:"100px"}}/>
		<br/>
		<p>{name}</p>
		<p>{headline}</p>
        <button type="button" className="btn btn-danger" onClick={()=>cancelfollow(id)}>Unfollow</button>
	</div>
)

export default connect()(Follower)  