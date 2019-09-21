import React, { Component } from 'react';
import { Container, Content, H1, Button, Text } from 'native-base';
import firebase from "../utils/firebase";

export class HomePage extends Component {

    handleLogout = () => {
        firebase.auth().signOut().then(r => console.log("Signed Out"));
    };

    render() {
        return (
            <Container>
                <Content>
                    <H1>Home</H1>

                    <Button primary
                        onPress={this.handleLogout}
                    ><Text> Logout </Text></Button>
                </Content>
            </Container>
        )
    }
}
