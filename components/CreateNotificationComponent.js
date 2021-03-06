import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, 
    Modal, StyleSheet, Alert } from 'react-native';
import { Card, ListItem, Icon, Rating, Input, Tile, CheckBox, Button, withTheme } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { postNotification } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        notifications: state.notifications
    };
};

const mapDispatchToProps = {
    postNotification: (plant, notificationDatesAndTimes) => (postNotification(plant, notificationDatesAndTimes))
};


class CreateNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: [
                {
                    id: 0,
                    name: "Sunday",
                    checked: false
                },
                {
                    id: 1,
                    name: "Monday",
                    checked: false
                },
                {
                    id: 2,
                    name: "Tuesday",
                    checked: false
                },
                {
                    id: 3,
                    name: "Wednesday",
                    checked: false
                },
                {
                    id: 4,
                    name: "Thursday",
                    checked: false
                },
                {
                    id: 5,
                    name: "Friday",
                    checked: false
                },
                {
                    id: 6,
                    name: "Saturday",
                    checked: false
                }
            ],
            timeText: 'Select a time...',
            timeValue: new Date(),
            showTime: false
        };
    }

    static navigationOptions = {
        title: 'Create a Notification'
    }

    componentDidMount() {
        const plant = this.props.navigation.state.params.plant;
        
        if (plant.soilMoisture === "moist") {
            updatedDays = this.state.days.map(day => {
                day.checked = true;
                return day;
            });
            this.setState({days: updatedDays});
 
        } else if (plant.soilMoisture === "dry") {
            updatedDays = this.state.days.map(day => {
                if (day.name === "Saturday") { day.checked = true; }
                return day;
            })
            this.setState({days: updatedDays});
        }
    }

    async obtainNotificationPermission() {
        const permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            const permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
            return permission;
        }
        return permission;
    }

    async presentLocalNotification() {

        const { navigate } = this.props.navigation;
        const plant = this.props.navigation.state.params.plant;
        const lowerCaseName = plant.name.toLowerCase();
        const permission = await this.obtainNotificationPermission();
        
        console.log("this.state.timeValue: " + this.state.timeValue);

        const notificationDays = this.state.days.filter(obj => obj.checked === true);
        const notificationDatesAndTimes = notificationDays.map(obj => {
            let d = new Date();
            d.setDate(d.getDate() + (obj.id + 7 - d.getDay()) % 7);
            d.setHours(this.state.timeValue.getHours(),this.state.timeValue.getMinutes(),0,0);
            return d.valueOf();
        });
        


        //send to redux store
        this.props.postNotification(plant, notificationDatesAndTimes);

        const waterNotification = {
            title: `Your ${lowerCaseName} is thirsty!`,
            body: `That's right, it's time to water your ${lowerCaseName}! Do it now, or you'll forget!`
        };

        if (permission.status === 'granted') {
            Notifications.presentLocalNotificationAsync({
                title: 'Your notifications have been set up!',
                body: `You will be notified when it's time to water your ${lowerCaseName}.`
            });
            Notifications.scheduleLocalNotificationAsync(waterNotification, {
                time: (new Date()).getTime() + 5000
            });
        }

        Alert.alert(
            'Notification scheduled!',
            'Congratulations! You have scheduled your notification.',
            [
                {
                    text: 'See My Notifications',
                    onPress: () => {
                        navigate('Notifications');
                    }
                },
                {
                    text: 'Return',
                    style: 'cancel',
                }
            ],
            { cancelable: false }
        );
    }
    
    render() {
        const plant = this.props.navigation.state.params.plant;

        const lowerCaseName = plant.name.toLowerCase();
        let waterMsg = ''
        if (plant.soilMoisture === "moist") {
            waterMsg = `Because ${lowerCaseName} is a water-loving plant, we recommend watering it at least once a day. Adjust your notification preferences below if this doesn't work with your schedule!`;
 
        } else if (plant.soilMoisture === "dry") {
            waterMsg = `Because ${lowerCaseName} is drought-loving, we recommend watering it at least once a week. Adjust your notification preferences below if this doesn't work with your schedule!`
            
        }

        const renderCheckbox = ({item}) => {
            return (
                <CheckBox
                    title={item.name}
                    checked={item.checked}
                    size={16}
                    onPress={() => {
                        const updatedDays = this.state.days;
                        updatedDays[item.id].checked = !updatedDays[item.id].checked;
                        this.setState({days: updatedDays});
                    }}
                />
            );
        };
        

        return(
            <Card title={`Create a notification for ${plant.name}`}>
                <Text style={{marginBottom: 20}}>{waterMsg}</Text>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Time: </Text>
                    <Button 
                        title={this.state.timeText}
                        type='outline'
                        titleStyle={{
                            color: '#43484d',
                            fontSize: 12,
                        }}
                        buttonStyle={{
                            backgroundColor: '#fafafa',
                            borderColor: '#ededed',
                            borderWidth: 1,
                            height: 30,
                            alignSelf: 'flex-start',
                        }}
                        onPress={() => {
                            this.setState({
                                showTime: true
                            });
                    }} />
                    {this.state.showTime && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.timeValue}
                            mode="time"
                            is24Hour={false}
                            display="default"
                            onChange={ (event, value) => {
                                
                                const hours = ((value.getHours() >= 13) ? `${value.getHours() - 12}` 
                                    : ((value.getHours() === 0) ? `12` : `${value.getHours()}`));
                                const minutes = (value.getMinutes() < 10) ? `0${value.getMinutes()}` : `${value.getMinutes()}` ;
                                const ampm = (value.getHours() >= 12) ? `pm` : `am`;
                                
                                this.setState({
                                    timeValue: value,
                                    timeText: `${hours}:${minutes} ${ampm}`,
                                    showTime: false
                                });
                                
                                
                            }}
                            />
                    )}
                </View>
                <FlatList
                    data={this.state.days}
                    renderItem={renderCheckbox}
                    keyExtractor={item => item.id.toString()}
                />
                

                <Button
                    onPress={() => this.presentLocalNotification()}
                    title='Schedule Notification'
                    icon={
                        <Icon
                            name='bell-o'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    buttonStyle={{
                        backgroundColor: '#FBBD06',
                        marginTop: 20
                    }}
                />
            </Card>
        );
    }
}




const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        //flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        //flex: 2,
        fontWeight: "bold",
        marginRight: 5
    },
    formItem: {
        //flex: 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotification);