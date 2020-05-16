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
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            time: '',
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

    showTimePicker = () => {
        this.setState({showTime: !this.showTime});
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
                {/*<View style={styles.formRow}>
                    <Text style={styles.formLabel}>Time: </Text>
                    {this.showTime && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={(new Date()).getTime()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={() => this.setState({time: date})}
                            />
                    )}
                    <Text style={styles.formItem}>{this.time}</Text>
                    </View>*/}
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
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default CreateNotification;