import React, { Component } from 'react';
import { View, Text, FlatList, StatusBar, ScrollView } from 'react-native';
import { ListItem, CheckBox, Button, Overlay, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import Tools from '@common/Tools';
import { fetchInboxPayload, toggleCheckedInbox,deleteInboxFromList  } from '@redux/actions'



class InboxListDeleted extends Component {
    constructor(props){
        super(props)
        this.state={
            checked:false,
            actionShow:false,
            checkboxContainer:[]
        }
    }
   
	static propTypes = {
        inbox: PropTypes.array,
        fetchInboxPayload:PropTypes.func,
        toggleCheckedInbox:PropTypes.func,
        deleteInboxFromList:PropTypes.func
      }

      componentDidMount(){
        this._inboxFetchData();
        
        
    }
    
    componentWillReceiveProps(){
        const { deleteVisibility } = this.props;
        const { actionShow } = this.state;
        
        if(deleteVisibility){
            this.setState({
                actionShow:false
            })
        }else{
            this.setState({
                actionShow:true
            })
        }
    
    }

    _deleteActionAll = () => {
        const { checkboxContainer } = this.state
        const { deleteInboxFromList } = this.props

        checkboxContainer.map(r => {
           deleteInboxFromList(r)
        }) 

        this.setState({
            actionShow:false
        })

        
    }

	_inboxFetchData = ()=>{
        const { fetchInboxPayload } = this.props;
    
        
        fetchInboxPayload();
        
        
    }
    
    _checkBoxAction = (index,checked) => {
         const { checkboxContainer } = this.state
         this.setState({checked:true})

         if(checked){
             checkboxContainer.push(index)

         }else{
             checkboxContainer.splice(index,1)
         }

         this.setState({
             ...this.state,
             checkboxContainer:checkboxContainer
         })
        
    }

    _keyExtractor = (item, index) => index.toString();
    
	_renderItem = ({ item, index }) => {
        const { toggleCheckedInbox } = this.props;
        return (
            <ListItem
                title={item.title}
                key={index}
                subtitle={
                <View style={styles.containerList}>
                    <View style={styles.containerView}>
                        <Text style={styles.textBody}>{item.body}</Text>
                        <Text style={styles.textDate}>{Tools.date(item.timestamp)}</Text>
                    </View>
                </View>
                }
                rightIcon={
                    <CheckBox
                    containerStyle={[{borderColor:'red'}]}
                    checked={item.checked}
                    onPress={()=>{toggleCheckedInbox(index); this._checkBoxAction(index,item.checked)}}
                    />}
                bottomDivider={true}
                titleStyle={{ fontWeight: 'bold' }}
                subtitleStyle={{ color: '#666' }}
                containerStyle={[{ backgroundColor: '#fff' }, item.read === 0 && { backgroundColor: '#eee' }]}
            />
        )
            
    }

    _closePopUpDelete = () => {
        this.setState({
            actionShow:false
        })
    }

    _renderDeleteScreen = () => {
        const { actionShow } = this.state
        return(
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
                        onPress={this._closePopUpDelete}
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
                        onPress={this._deleteActionAll}
                    />
                </View>
            </View>
        </Overlay>
        )
    }


	render() {
        const { inbox, deleteVisibility } = this.props;
        const { actionShow } = this.state;
        
		return (
			<View style={styles.body}>
			  <StatusBar
                backgroundColor="#4a416e"
                barStyle="light-content"
                />
                <ScrollView>
                    <FlatList
                        data={inbox}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        scrollEnabled={true}
                    />
                </ScrollView>
                {actionShow && this._renderDeleteScreen()}
			</View>
		);
	}
}

const mapStateToProps = ({ app_reduce }, ownProps) => {
	return {
		inbox: app_reduce.inbox
	}
}

export default connect(mapStateToProps, {fetchInboxPayload, toggleCheckedInbox, deleteInboxFromList })(InboxListDeleted);