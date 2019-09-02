import React, { PureComponent } from 'react';
import { InboxDetail } from '@container';

export default class InboxDetailScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Message',
      headerStyle: { marginTop: 24 },
		}
	}

	render() {
		return (
			<InboxDetail
				navigation={this.props.navigation}
				data={this.props.navigation.getParam('data')}
			/>
		);
	}
}