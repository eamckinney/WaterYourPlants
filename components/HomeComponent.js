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
            <Card title="Welcome!">
                <Text> Testing, testing, 1 2 3.
                </Text>
            </Card>
        );
    }
}

export default Home;