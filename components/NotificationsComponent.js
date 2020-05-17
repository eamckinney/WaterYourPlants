import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteNotification } from '../redux/ActionCreators';
import plantsData from '../shared/plants.json';



const mapStateToProps = state => {
    return {
        notifications: state.notifications
    };
};

const mapDispatchToProps = {    
    deleteNotification: plantId => (deleteNotification(plantId))
};

class Notifications extends Component {

    static navigationOptions = {
        title: 'My Plants'
    }

    render() {
        //const { navigate } = this.props.navigation;
        console.log(this.props.notifications);
        console.log(this.props.notifications.length);

        const renderPlantNotification = ({item}) => {
            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Plant?',
                            'Are you sure you wish to delete your notification for ' + item.plant.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.plant.name + ' Not Deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteNotification(item.plant.id)
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                }
            ];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        title={item.plant.name}
                        subtitle={
                            item.notificationDatesAndTimes.map(date => {
                                //const dayName = days[date.getDay()];
                                //const hours = date.getHours();
                                //const minutes = date.getMinutes();
                                //return `${dayName}, at ${hours}:${minutes}`;
                                console.log(typeof(date));
                                return date;
                            }).join('\n')
                        }
                    />
                </Swipeout>
            );
        };

        
        
        return (
            <FlatList
                data={this.props.notifications}
                renderItem={renderPlantNotification}
                keyExtractor={item => item.plant.id.toString()}
            />
        );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);