import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, 
    Modal, Button, StyleSheet, Alert } from 'react-native';
import { Card, ListItem, Icon, Rating, Input, Tile } from 'react-native-elements';
import { useFonts, ChelseaMarket_400Regular } from "@expo-google-fonts/chelsea-market";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


class Home extends Component {
    
    /*static navigationOptions = {
        title: 'Home'
    }*/
    
    /*async loadFonts() {
        await loadAsync({
            // Load a font `Chelsea Market` from a static resource
            ChelseaMarketRegular: require('../assets/fonts/ChelseaMarket-Regular.ttf'),
          
          });
    }*/
    

    render() {
        
        //this.loadFonts();

        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name='bars'
                        type='font-awesome'
                        iconStyle={{
                            color: '#fff',
                            marginLeft: 10,
                            marginTop: 10,
                            fontSize: 32,
                        }}
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>
                        Water Your Plants!
                    </Text>
                    <Text style={styles.body}>
                        To begin, click the icon in the upper left hand corner to see the menu. Then, click "Find Your Plant!"
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'stretch',
        marginBottom: 200
    },
    title: {
        color: '#fff',
        //fontWeight: bold,
        //fontFamily: 'ChelseaMarketRegular',
        fontSize: 40,
        margin: 10,
        textAlign: 'center',
        
    },
    body: {
        color: '#fff',
        fontSize: 16,
        margin: 10,
    }
});

export default Home;