import React from 'react';
import { BlankState, Container, Glyph } from 'keystone/admin/client/App/elemental';

const NoAuth = React.createClass({
	displayName: 'NoAuth',
	propTypes: {
		listName: React.PropTypes.string
	},
	render () {
		return (
			<Container>
				<BlankState style={{ marginTop: 20, marginBottom: 20 }}>
					<Glyph
						name="circle-slash"
						size="medium"
						style={{ marginBottom: 20 }}
					/>
					<h2 style={{ color: 'inherit' }}>
						Unauthorized access to "{this.props.listName}"
					</h2>
				</BlankState>
			</Container>
	)
	}
});

module.exports = NoAuth;
