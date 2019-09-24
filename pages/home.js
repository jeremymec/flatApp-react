import React, { Component } from 'react';
import {StyleSheet, View} from "react-native";
import {Container, Content, H1, Button, Text, Header, Body, Title} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid'
import firebase from "../utils/firebase";
import rest from "../services/rest";

export class HomePage extends Component {

    state = {flatName: null};

    handleLogout = () => {
        firebase.auth().signOut().then(r => console.log("Signed Out"));
    };

    handleLeave = () => {
        rest.leaveUsersFlat(firebase.auth().currentUser.uid).then((response) => console.log("Done"))
    };

    getFlatData = () => {
        let userUid = firebase.auth().currentUser.uid;
        let response = rest.getUsersFlat(userUid);
        response.then((responseJson ) => {
            if (responseJson != null) {
                this.setState({flatName: responseJson.name})
            }
        });
    };

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
                        </View>}
                    {!this.state.flatName &&
                    <View>
                        <Row size={10}>
                            <Text style={styles.flatPreText}>You are not currently in a flat.</Text>
                        </Row>
                        <Row size={20}>
                            <Button primary><Text>Join Flat</Text></Button>
                        </Row>
                    </View>}
                    <Row size={50}>
                        <Button primary
                                onPress={this.handleLeave}
                        ><Text> Leave Flat </Text></Button>
                    </Row>
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
