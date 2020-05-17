import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, 
    Modal, StyleSheet, Alert } from 'react-native';
import { Card, ListItem, Icon, Rating, Input, Tile, CheckBox, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';



class CreateNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: [
                {
                    name: "monday",
                    checked: false
                },
                {
                    name: "tuesday",
                    checked: false
                },
                {
                    name: "wednesday",
                    checked: false
                },
                {
                    name: "thursday",
                    checked: false
                },
                {
                    name: "friday",
                    checked: false
                },
                {
                    name: "saturday",
                    checked: false
                },
                {
                    name: "sunday",
                    checked: false
                }
            ],
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
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
            this.setState({
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
            });
 
        } else if (plant.soilMoisture === "dry") {
            this.setState({
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: true,
                sunday: false,
            });
            
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
        const plant = this.props.navigation.state.params.plant;
        const lowerCaseName = plant.name.toLowerCase();
        const permission = await this.obtainNotificationPermission();
        const waterNotification = {
            title: `Your ${lowerCaseName} is thirsty!`,
            body: `That's right, it's time to water your ${lowerCaseName}! Do it now, or you'll forget!`
        };

        console.log("new Date(): " + (new Date()));
        console.log("new Date('May 17, 2020'): " + (new Date('May 17, 2020')));
        console.log("(new Date()).setHours(0,0,0,0): " + (new Date()).setHours(0,0,0,0));
        console.log("this.state.timeValue: " + this.state.timeValue);

        let notifcationDay = [];
        
       



        if (permission.status === 'granted') {
            Notifications.presentLocalNotificationAsync({
                title: 'Your notifications have been set up!',
                body: `You will be notified when it's time to water your ${lowerCaseName}.`
            });
            Notifications.scheduleLocalNotificationAsync(waterNotification, {
                time: (new Date()).getTime() + 5000
            });
        }
    }

    onChange = (event, selectedDate) => {
        //const currentDate = selectedDate || this.state.timeValue;
        if (selectedDate) {
            this.setState({timeValue: selectedDate});
            this.setState({timeText: `${selectedDate.getHours()}:${selectedDate.getMinutes()}`});
        }
        console.log("selectedDate: " + selectedDate);
        //console.log("currentDate: " + currentDate);
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
        

        return(
            <Card title={`Create a notification for ${plant.name}`}>
                <Text style={{marginBottom: 20}}>{waterMsg}</Text>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Time: </Text>
                    <Text style={styles.formItem} 
                        onPress={() => {
                            this.setState({
                                //timeValue: new Date(),
                                showTime: true
                            });
                            }}>
                        {this.state.timeText}
                    </Text>
                    {this.state.showTime && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.timeValue}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={ (event, value) => {
                                this.setState({
                                    timeValue: value,
                                    showTime: false
                                });
                                if (value.getMinutes() < 10) {
                                    this.setState({timeText: `${value.getHours()}:0${value.getMinutes()}`})
                                } else if (value.getMinutes() >= 10) {
                                    this.setState({timeText: `${value.getHours()}:${value.getMinutes()}`})
                                }
                                
                            }}
                            />
                    )}
                    
                </View>
                <CheckBox
                    title='Saturday'
                    checked={this.state.saturday}
                    onPress={() => this.setState({saturday: !this.state.saturday})}
                />
                <CheckBox
                    title='Sunday'
                    checked={this.state.sunday}
                    onPress={() => this.setState({sunday: !this.state.sunday})}
                />
                <CheckBox
                    title='Monday'
                    checked={this.state.monday}
                    onPress={() => this.setState({monday: !this.state.monday})}
                />
                <CheckBox
                    title='Tuesday'
                    checked={this.state.tuesday}
                    onPress={() => this.setState({tuesday: !this.state.tuesday})}
                />
                <CheckBox
                    title='Wednesday'
                    checked={this.state.wednesday}
                    onPress={() => this.setState({wednesday: !this.state.wednesday})}
                />
                <CheckBox
                    title='Thursday'
                    checked={this.state.thursday}
                    onPress={() => this.setState({thursday: !this.state.thursday})}
                />
                <CheckBox
                    title='Friday'
                    checked={this.state.friday}
                    onPress={() => this.setState({friday: !this.state.friday})}
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
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        //flex: 2,
        fontWeight: "bold",
        
    },
    formItem: {
        //flex: 1
    }
});

export default CreateNotification;