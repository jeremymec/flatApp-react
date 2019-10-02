import React, { Component } from 'react';
import {StyleSheet, View} from "react-native";
import {Container, Content, H1, Button, Text, Header, Body, Title, List, ListItem} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid'
import firebase from "../utils/firebase";
import rest from "../services/rest";
import weather from "../services/weather"
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";


export class HomePage extends Component {

    state = {flatName: null, flatInvite: '', weather_description: '', weather_temperature: ''};

    handleLogout = () => {
        firebase.auth().signOut().then(r => console.log("Signed Out"));
    };

    handleLeave = () => {
        rest.leaveUsersFlat(firebase.auth().currentUser.uid).then((response) => this.setState({flatName: null}))
    };

    handleJoin = () => {
        this.props.navigation.navigate('Join');
    };

    handleCreate = () => {
        this.props.navigation.navigate('Create');
    };

    handleTodo = () => {
        this.props.navigation.navigate('Todo');
    };

    handleNewsFeed = () => {
        this.props.navigation.navigate('NewsFeed')
    };

    getFlatData = () => {
        let userUid = firebase.auth().currentUser.uid;
        let getRequest = rest.getUsersFlat(userUid);
        getRequest.then((response ) => {
            response.json().then((responseJson => {
                if (responseJson != null) {
                    this.setState({flatName: responseJson.name, flatInvite: responseJson.invite})
                }
            }));
        });
    };

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            await Location.getCurrentPositionAsync().then(
                (response) => {
                    console.log(response);
                    const lat = response.coords.latitude;
                    const long = response.coords.longitude;
                    weather.getWeatherFromCoords(lat, long).then((r) => {
                        r.json().then(
                            (responseJson) => {
                                this.setState({weather_description: responseJson.weather[0].description
                                    , weather_temperature: responseJson.main.temp})
                            });
                    });
                });
        }
    };

    componentWillMount() {
        this.getLocationAsync();
    }

    componentDidMount() {
        this.getFlatData();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Flat Home</Title>
                    </Body>
                </Header>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Grid style={{alignItems: 'center'}}>
                    {this.state.flatName &&
                        <View>
                        <Row size={10}>
                            <Text>It is currently {this.state.weather_description} with a temperature of {Math.round(this.state.weather_temperature - 273.15)}°</Text>
                        </Row>
                        <Row size={10}
                             style = {{justifyContent: 'center'}}
                        >
                            <Text style={styles.flatPreText}>You are currently a member of</Text>
                        </Row>
                        <Row size={10}
                            style = {{justifyContent: 'center'}}
                        >
                            <Text style={styles.flatText}>{this.state.flatName}</Text>
                        </Row>
                        <Row size={20}
                             style = {{justifyContent: 'center'}}
                        >
                            <Text>Invite Code: {this.state.flatInvite}</Text>
                        </Row>
                        <Row size = {30}
                        style = {{justifyContent: 'center'}}>
                            <List>
                                <ListItem style = {{justifyContent: 'center'}}>
                                    <Button primary
                                            onPress={this.handleTodo}>
                                        <Text> Todo List </Text></Button>
                                </ListItem>
                                <ListItem style = {{justifyContent: 'center'}}>
                                    <Button primary
                                            onPress={this.handleNewsFeed}>
                                        <Text> News Feed </Text></Button>
                                </ListItem>
                            </List>
                        </Row>
                        <Row size = {10}
                             style = {{justifyContent: 'center'}}>

                        </Row>
                        <Row size={20}
                        style = {{justifyContent: 'space-between'}}
                        >
                            <Button danger
                                    onPress={this.handleLeave}
                            ><Text> Leave Flat </Text></Button>
                            <Button danger
                                    onPress={this.handleLogout}
                            ><Text> Logout </Text></Button>
                        </Row>
                        </View>
                        }
                        {!this.state.flatName &&
                        <View style = {{justifyContent: 'center'}}>
                            <Row size={10}></Row>
                            <Row size={10} style = {{justifyContent: 'center'}}>
                                <Text style={styles.flatPreText}>You are currently not in a flat.</Text>
                            </Row>
                            <Row size={20} style = {{justifyContent: 'space-between'}}>
                                <Button primary onPress={this.handleJoin}><Text>Join Flat</Text></Button>
                                <Button success onPress={this.handleCreate}><Text>Create Flat</Text></Button>
                            </Row>
                            <Row size={20} style = {{justifyContent: 'center'}}>
                                <Button danger onPress={this.handleLogout}><Text>Logout</Text></Button>
                            </Row>
                        </View>}
                </Grid>
                </View>
                    </Container>
                        )
                    }
                    }

                    const styles = StyleSheet.create({
                    flatText: {
                    fontSize: 34,
                },
                    flatPreText: {
                    fontSize: 24,
                },
                });
