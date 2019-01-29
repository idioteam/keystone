import React from 'react';
import evalDependsOn from '../../../../../../fields/utils/evalDependsOn';

module.exports = React.createClass({
	displayName: 'FormHeading',
	propTypes: {
		options: React.PropTypes.object,
	},
	getInitialState () {
		return {
			id: `Header-${++counter}`,
		}
	},
	hide () {
		jQuery('#' + this.state.id).toggleClass('hide-children').nextUntil('h3').toggleClass('hide-child');
	},
	render () {
		if (!evalDependsOn(this.props.options.dependsOn, this.props.options.values)) {
			return null;
		}
		return (<h3 id={this.state.id} className="form-heading" onClick={this.hide}>
			<i className='octicon octicon-chevron-down'></i>
			{this.props.content}
		</h3>);
	},
});
