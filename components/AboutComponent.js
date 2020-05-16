import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, 
    Modal, Button, StyleSheet, Alert } from 'react-native';
import { Card, ListItem, Icon, Rating, Input, Tile } from 'react-native-elements';


class About extends Component {
    
    static navigationOptions = {
        title: 'About the App'
    }

    render() {
        return(
            <Card title="About the App">
                <Text>This app was written by Emily McKinney in React Native as a portfolio project for the Nucamp Full-Stack Bootcamp.
                </Text>
            </Card>
        );
    }
}

export default About;