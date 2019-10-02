import React, { Component } from 'react';
import {Container, Header, Text, Form, Item, Input, Body, Title, Content, Button} from 'native-base';
import firebase from "../utils/firebase";
import rest from "../services/rest";
import {StyleSheet, View} from "react-native";

export class CreateFlatPage extends Component {

    state = {flatName: '', errorMessage: null};

    onBackPressed = () => {
        this.props.navigation.navigate('Home');
    };

    handleCreate = () => {
        const userId = firebase.auth().currentUser.uid;
        let data = new FormData();
        data.append("name", this.state.flatName);

        rest.createUsersFlat(userId, data).then(
            (response) => {
                console.log(response);
                if (response.status === 201){
                    this.onBackPressed();
                } else {
                    this.setState({errorMessage: response.errorMessage})
                }
            }
        )
    };

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Create a Flat</Title>
                    </Body>
                </Header>
                <View>
                    <Form>
                        <Item>
                            <Input
                                   placeholder="Flat Name"
                                   onChangeText = {flatName => this.setState({ flatName })}
                                   value = {this.state.flatName}
                            />
                        </Item>
                    </Form>
                    <Button block success onPress={this.handleCreate}>
                        <Text>Create Flat</Text>
                    </Button>
                </View>
                <View>
                    {this.state.errorMessage &&
                    <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>}
                </View>
                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center"}}>
                    <Button full onPress={this.onBackPressed}><Text>Home</Text></Button>
                </View>
            </Container>
        );
    }
}


