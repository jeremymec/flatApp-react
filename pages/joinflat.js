import React, { Component } from 'react';
import {Container, Header, Text, Form, Item, Input, Body, Title, Content, Button} from 'native-base';
import firebase from "../utils/firebase";
import rest from "../services/rest";
import {StyleSheet, View} from "react-native";

export class JoinPage extends Component {

    state = {inviteCode: '', errorMessage: null};

    onBackPressed = () => {
        this.props.navigation.navigate('Home');
    };

    handleJoin = () => {
        rest.getFlatByInviteCode(this.state.inviteCode).then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json().then((responseJson => {
                    console.log(responseJson);
                    if (responseJson !== null){
                        console.log("Response JSON is" + JSON.stringify(responseJson));
                        let patchRequest = rest.joinFlatById(responseJson['id'],
                                                            firebase.auth().currentUser.uid)
                            .then((result) => {
                                if (result.status === 200) {
                                    this.props.navigation.navigate('Home');
                                } else {
                                    this.setState({ errorMessage: 'Internal Server Error, Try Refreshing' });
                                }
                            });
                            } else {
                        this.setState( {errorMessage: 'Error - Invalid Flat Code'} );
                    }
                }));
            } else {
                this.setState( {errorMessage: 'Error - Invalid Flat Code'} );
            }
        });
    };

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Join a Flat</Title>
                    </Body>
                </Header>
                <View  style={{flex: 1}}>
                    <View>
                        <Form>
                            <Item style={styles.inviteInputItem}>
                                <Input style={styles.inviteInput}
                                    placeholder="Invite Code"
                                    onChangeText = {inviteCode => this.setState({ inviteCode })}
                                    value = {this.state.inviteCode}
                                />
                            </Item>
                        </Form>
                        <Button block success onPress={this.handleJoin}>
                            <Text>Join Flat</Text>
                        </Button>
                    </View>
                    <View>
                    {this.state.errorMessage &&
                    <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>}
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center"}}>
                    <Button full onPress={this.onBackPressed}><Text>Home</Text></Button>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    inviteInputItem: {
        paddingTop: 200,
        marginLeft: 75,
        marginRight: 75
    },
    inviteInput: {
        textAlign: 'center'
    }
});
