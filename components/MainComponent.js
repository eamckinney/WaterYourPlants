import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Plants from './PlantsComponent';
import CreateNotification from './CreateNotificationComponent';
import Notifications from './NotificationsComponent';
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

const PlantsNavigator = createStackNavigator(
    {
        Plants: { 
            screen: Plants,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='leaf'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />,
                headerStyle: {
                    backgroundColor: '#3D405B'
                }
            })
        },
        CreateNotification: { 
            screen: CreateNotification,
            navigationOptions: ({navigation}) => ({
                headerStyle: {
                    backgroundColor: '#FBBD06'
                }
            })
        }
    },
    {
        initialRouteName: 'Plants',
        navigationOptions: ({navigation}) => ({
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        })
    }
);

const NotificationsNavigator = createStackNavigator(
    {
        Notifications: { screen: Notifications }
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
                name='bell-o'
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
        Plants: {
            screen: PlantsNavigator,
            navigationOptions: {
                drawerLabel: 'Find Your Plant',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='leaf'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Notifications: {
            screen: NotificationsNavigator,
            navigationOptions: {
                drawerLabel: 'Your Plant Notifications',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='bell-o'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                ),
                
            },
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