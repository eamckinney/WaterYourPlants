import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, 
    Modal, Button, StyleSheet, Alert } from 'react-native';
import { Card, ListItem, Icon, Rating, Input, Tile } from 'react-native-elements';


class RouteFilter extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            geography: "",
			filters: [],
			filteredRoutes: [],
			type: "Sport",
			sort: "name",
			customFilters: ""
        };
    }


    static navigationOptions = {
        title: 'BetaForBeta'
    }
    
    render() {
        return(
            <Card title="This is where the magic happens.">
                <Text> Ha! Nothing here yet. Come back later!
                </Text>
            </Card>
        );
    }
}

export default RouteFilter;