import React, { Component } from 'react';
import {Container, Header, Text, Form, Item, Input, Body, Title, Content, Button} from 'native-base';
import firebase from "../utils/firebase";
import rest from "../services/rest";
import {StyleSheet, View} from "react-native";

export class JoinPage extends Component {

    state = {inviteCode: '', errorMessage: null};

    handleJoin = () => {
        let getRequest = rest.getFlatByInviteCode(this.state.inviteCode);
        getRequest.then((response) => {
            if (response.status === 200) {
                return response.json().then((responseJson => {
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
                <Content>
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
                        <Button primary onPress={this.handleJoin}>
                            <Text>Join Flat</Text>
                        </Button>
                        {this.state.errorMessage &&
                        <Text>{this.state.errorMessage}</Text>}
                    </View>
                </Content>
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
