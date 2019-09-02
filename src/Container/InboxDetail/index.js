import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Overlay, Button,Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import { markInboxRead, deleteInboxFromList } from '@redux/actions'
import { connect } from 'react-redux';
import styles from './styles';
import InboxCard, { InboxCardPlaceholder } from '@components/InboxCard';
class InboxDetail extends PureComponent {
	constructor(props){
		super(props)
		this.state = {
			actionShow:false
		}
	}

	static propTypes = {
	  message: PropTypes.object,
	  markInboxRead: PropTypes.func,
	  deleteInboxFromList: PropTypes.func
	}

	componentDidMount() {
		const { data } = this.props;

		this._markAsRead(data.index);
	}

	_markAsRead = (index) => {
		const { markInboxRead } = this.props;

		markInboxRead(index);
	}

	_deleteInbox = () => {
		const { actionShow } = this.state;
		
			this.setState({actionShow:true})
	
	}

	_actionDeleteInbox = (index) => {
		const { deleteInboxFromList } = this.props;
		

		const time = new Date().getTime();
		const delta = time - this.lastPress;

		const DOUBLE_PRESS_DELAY = 400;
		if (delta < DOUBLE_PRESS_DELAY) {
			deleteInboxFromList(index);
		}
		this.lastPress = time;

		this.setState({actionShow:false})
	}

	_closePopUp = ()=>{
		this.setState({actionShow:false})
	}	

	render() {
		const { data } = this.props;
		const { actionShow } = this.state;
		return (
			<View style={styles.body}>
				<InboxCard
					{...data.message}
					deleteInbox={this._deleteInbox.bind(this)}
				/>
				{actionShow && (
				<Overlay
					isVisible={actionShow}
					windowBackgroundColor="rgba(255, 255, 255, .5)"
					overlayBackgroundColor="white"
					width="auto"
					height="auto"
					>
					<View style={{flexDirection:'column', paddingTop:10, justifyContent:'center', alignContent:'center'}}>
						<Text style={{color:'red'}}>Do You Want To Delete This Message?</Text>
						<View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:10}}>
								
							<Button
								buttonStyle={{margin:10}}
								icon={
									<Icon
									style={{paddingLeft:5}}
									name='remove'
            						type='font-awesome'
									size={15}
									color="red"
									/>
								}
								style={{color:'red'}}
								iconRight
								title="NO"
								type="outline"
								onPress={this._closePopUp}
							/>
							<Button
							buttonStyle={{margin:10}}
								icon={
									<Icon
									style={{paddingLeft:5}}
									name='check-circle-o'
									type='font-awesome'
									size={15}
									color="green"
									/>
								}
								iconRight
								style={{color:'green'}}
								title="YES"
								type="outline"
							/>
						</View>
					</View>
				</Overlay>
				)}
			</View>
		);
	}
}

const mapStateToProps = ({ app_reduce }, ownProps) => {
	return {}
}

export default connect(mapStateToProps, { markInboxRead,deleteInboxFromList })(InboxDetail)