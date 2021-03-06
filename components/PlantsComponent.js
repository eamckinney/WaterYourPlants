import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, 
    Modal, StyleSheet, Alert } from 'react-native';
import { Card, ListItem, Icon, Rating, Input, Tile, Button } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import plantsData from '../shared/plants.json';
import CreateNotification from './CreateNotificationComponent';


class PlantSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            plantIsHidden: true
        }
    }
    
    static navigationOptions = {
        title: 'Find Your Plant!'
    }

    toggleHidden = () => {
        this.setState({
          plantIsHidden: false
        });
    }
    
    render() {
        const items = plantsData;
        const { navigate } = this.props.navigation;

        return(
            <View>
                <Card title="What kind of plant do you have?">
                    <SearchableDropdown
                        onItemSelect={(item) => {
                            //const items = this.state.selectedItems;
                            //items.push(item)
                            this.setState({ selectedItems: item });
                            this.toggleHidden();
                        }}
                        containerStyle={{ padding: 5 }}
                        onRemoveItem={(item, index) => {
                            const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                            this.setState({ selectedItems: items });
                        }}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#3D405B',
                            borderColor: '#fff',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                        itemTextStyle={{ color: '#fff' }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={items}
                        //defaultIndex={2}
                        resetValue={false}
                        textInputProps={
                            {
                                placeholder: "Pick a plant...",
                                underlineColorAndroid: "transparent",
                                style: {
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5,
                                },
                                //onTextChange: text => alert(text)
                            }
                        }
                        listProps={
                            {
                                nestedScrollEnabled: true,
                            }
                        }
                    />
                </Card>
                {!this.state.plantIsHidden && <Plant plant={this.state.selectedItems} navigate={navigate} />}
            </View>
        );
    }
}


const Plant = (props) => {

    
    let lowerCaseName = props.plant.name.toLowerCase();
    
    let sunlightMsg = "";
    let sunIcon = [];
    if (props.plant.sunlight.includes("full") && props.plant.sunlight.includes("part")) {
        sunlightMsg = `${props.plant.name} is a flexible plant. It does ok with either full or partial sunlight. As long as it gets at least 4 hours, you're good to go!`;
        sunIcon = ["wb-sunny","wb-cloudy"];
    } else if (props.plant.sunlight.includes("full")) {
        sunlightMsg = `${props.plant.name} really loves the sun. Find a sunny windowsill (preferably south-facing), and leave 'em there all day long! That's right; make sure your ${lowerCaseName} gets more than 6 hours of sun every day.`;
        sunIcon = ["wb-sunny","wb-sunny"];
    } else if (props.plant.sunlight.includes("part")) { 
        sunlightMsg = `${props.plant.name} only needs 4-6 hours of partial sunlight per day. No south-facing window? No problem!`;
        sunIcon = ["wb-sunny","wb-cloudy"];
    }

    let waterMsg = "";
    let waterIcon = [];
    if (props.plant.soilMoisture === "moist") {
        waterMsg = `${props.plant.name} thrives with a moisture-rich soil. In other words, it looooves water. Water your ${lowerCaseName} once or twice a day, preferably in the early morning or in the evening so that they don't lose water by evaporation.`;
        waterIcon = ["tint", "tint", "tint", "tint", "tint"];
    } else if (props.plant.soilMoisture === "dry") { 
        waterMsg = `${props.plant.name} is a drought-loving plant. You don't need to follow a strict schedule with these plants, but don't forget about them entirely! They need water once every few days or once a week.`
        waterIcon = ["tint", "tint"];
    }

    const handleNotification = () => {
        Alert.alert(
            `Create a notification for ${lowerCaseName}?`,
            `You can remove this notification at any time (and in the meantime, you'll have a really healthy ${lowerCaseName} plant).`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        console.log('Notification cancelled.');
                    }
                },
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('Notification accepted.');
                        props.navigate('CreateNotification', { 
                            plant: props.plant
                        })
                    }

                    
                }
            ],
            { cancelable: false }
        );

    }
    
    return(
        <Card title={`What to do about ${lowerCaseName}...`}>
            <View>
                <View style={styles.row}>
                    <Text style={{fontWeight: "bold"}}>Sunlight: </Text>
                    {sunIcon.map(icon => {
                        return(
                            <Icon 
                                name={icon}
                                type='font-awesome-5'
                                color='#FBBD06'
                                iconStyle={{marginRight: 5}}
                            />
                        );
                    })}
                </View>
            </View>
            <Text style={{marginBottom: 20}}>{sunlightMsg}</Text>
            <View>
                <View style={styles.row}>
                    <Text style={{fontWeight: "bold"}}>Watering: </Text>
                    {waterIcon.map(icon => {
                        return(
                            <Icon 
                                name={icon}
                                type='font-awesome'
                                color='#3D405B'
                                iconStyle={{marginRight: 5}}
                            />
                        );
                    })}
                </View>
            </View>
            <Text style={{marginBottom: 20}}>{waterMsg}</Text>
            <Button
                onPress={() => handleNotification()}
                title='Create Watering Notification'
                icon={
                    <Icon
                        name='bell-o'
                        type='font-awesome'
                        color='#fff'
                        iconStyle={{marginRight: 10}}
                    />
                }
                buttonStyle={{backgroundColor: '#FBBD06'}}
            />
        </Card>
    );
}


const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        //justifyContent: 'center',
        //flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    rowLabel: {
        flex: 2,
        fontWeight: "bold",
        
    },
    rowItem: {
        marginLeft: 10
    }
});


export default PlantSelector;