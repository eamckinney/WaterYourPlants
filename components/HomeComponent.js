import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, 
    Modal, Button, StyleSheet, Alert } from 'react-native';
import { Card, ListItem, Icon, Rating, Input, Tile } from 'react-native-elements';


class Home extends Component {
    
    static navigationOptions = {
        title: 'Home'
    }
    
    render() {
        return(
            <Card title="Water Your Plants!">
                <Text>To begin, click the icon in the upper left hand corner to see the menu. Then, click "Find Your Plant!"
                </Text>
            </Card>
        );
    }
}

export default Home;