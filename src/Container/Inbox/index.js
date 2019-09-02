import React, { Component } from 'react';
import { View, Text, FlatList, Image, StatusBar, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import Tools from '@common/Tools';
class Inbox extends Component {
	static propTypes = {
	  inbox: PropTypes.array,
	  fetchInboxPayload:PropTypes.func
	}

	_keyExtractor = (item, index) => index.toString();


	_renderItem = ({ item, index }) => {
		return (
			<ListItem
				title={item.title}
				imageProps={{resizeMode:'cover'}}
				subtitle={
				<View style={styles.subtitleView}>
					<Text style={styles.textBody}>{item.body}</Text>
					<Text style={styles.textDate}>{Tools.date(item.timestamp)}</Text>
				</View>
				}
				bottomDivider={true}
				titleStyle={{ fontWeight: 'bold' }}
				subtitleStyle={{ color: '#666' }}
				containerStyle={[{ backgroundColor: '#fff' }, item.read === 0 && { backgroundColor: '#eee' }]}
				rightIcon={
					<Icon type="material-community" name="chevron-right" size={25} color="#ccc" />
				}
				onPress={() => this.props.navigation.navigate('InboxDetail', { data: { message: item, index: index } })}
			/>
		)
	}

	render() {
		const { inbox } = this.props;
		return (
			<View style={styles.body}>
			  <StatusBar
          backgroundColor="#4a416e"
          barStyle="light-content"
        />
				<ScrollView>
					<FlatList
						data={inbox}
						keyExtractor={this._keyExtractor}
						renderItem={this._renderItem}
						scrollEnabled={true}
					/>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ app_reduce }, ownProps) => {
	return {
		inbox: app_reduce.inbox
	}
}

export default connect(mapStateToProps, null)(Inbox);