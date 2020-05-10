import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import RouteFilter from './RouteFilterComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator,
    DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';


const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#3D405B'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const RouteFilterNavigator = createStackNavigator(
    {
        RouteFilter: { screen: RouteFilter }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#3D405B'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='fire'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#3D405B'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        RouteFilter: {
            screen: RouteFilterNavigator,
            navigationOptions: {
                drawerLabel: 'BetaForBeta',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='fire'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About the App',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        } 
    },
    {
        drawerBackgroundColor: '#FBBD06',
    }
);

class Main extends Component {
    render() {
        return (
            <View style={{
                flex: 1, 
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight 
                }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default Main;