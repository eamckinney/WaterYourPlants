import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, 
    Modal, Button, StyleSheet, Picker, Switch, Alert } from 'react-native';
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
            <ScrollView>
                <Card title="First, choose where you want to climb.">
                    <View style={styles.formRow}>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.geography}
                            onValueChange={itemValue => this.setState({geography: itemValue})}>
                            <Picker.Item 
                                label='Minnesota, Twin Cities & Central Region'
                                value='Minnesota, Twin Cities & Central Region' />
                            <Picker.Item 
                                label='Colombia, Andes Region'
                                value='Colombia, Andes Region' />
                            <Picker.Item 
                                label='Wisconsin, Central Region'
                                value='Wisconsin, Central Region' />
                        </Picker>
                    </View>
                </Card>
                <Card title="Now, which type of climbing are you looking for?">
                    <View style={styles.formRow}>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.type}
                            onValueChange={itemValue => this.setState({type: itemValue})}>
                            <Picker.Item 
                                label='Sport'
                                value='Sport' />
                            <Picker.Item 
                                label='Trad'
                                value='Trad' />
                            <Picker.Item 
                                label='Bouldering'
                                value='Bouldering' />
                        </Picker>
                    </View>
                </Card>
            </ScrollView>
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

export default RouteFilter;