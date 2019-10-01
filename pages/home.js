import React, { Component } from 'react';
import {StyleSheet, View} from "react-native";
import {Container, Content, H1, Button, Text, Header, Body, Title, Left, Icon, Right} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid'
import firebase from "../utils/firebase";
import rest from "../services/rest";

export class HomePage extends Component {

    state = {flatName: null};

    handleLogout = () => {
        firebase.auth().signOut().then(r => console.log("Signed Out"));
    };

    handleLeave = () => {
        rest.leaveUsersFlat(firebase.auth().currentUser.uid).then((response) => this.setState({flatName: null}))
    };

    handleJoin = () => {
        this.props.navigation.navigate('Join');
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
                    this.setState({flatName: responseJson.name})
                }
            }));
        });
    };

    componentDidMount() {
        console.log("Mount Called");
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
                <Grid style={{alignItems: 'center'}}>
                    <Row size={30}>

                    </Row>
                    {this.state.flatName &&
                        <View>
                        <Row size={10}>
                            <Text style={styles.flatPreText}>You are currently a member of</Text>
                        </Row>
                        <Row size={20}>
                            <Text style={styles.flatText}>{this.state.flatName}</Text>
                        </Row>
                        <Row size={20}>
                            <Button primary
                                    onPress={this.handleLeave}
                            ><Text> Leave Flat </Text></Button>
                        </Row>
                        <Row size = {40}>
                            <Button primary
                                    onPress={this.handleTodo}>
                            <Text> Todo List </Text></Button>
                            <Button primary
                                    onPress={this.handleNewsFeed}>
                                <Text> News Feed </Text></Button>
                        </Row>
                        </View>}
                    {!this.state.flatName &&
                    <View>
                        <Row size={10}>
                            <Text style={styles.flatPreText}>You are not currently in a flat.</Text>
                        </Row>
                        <Row size={20}>
                            <Button primary onPress={this.handleJoin}><Text>Join Flat</Text></Button>
                        </Row>
                    </View>}
                </Grid>
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
