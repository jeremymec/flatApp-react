import React, { Component } from 'react';
import Constants from "expo-constants/src/Constants";
import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title,
} from 'native-base';


export class LoginPage extends Component {

    state = { email: '', password: '', errorMessage: null };

    handleLogin = () => {
        // TODO: Firebase stuff...
        console.log('handleLogin')
    };

    render() {
        return (
            <Container style={{ paddingTop: Constants.statusBarHeight }}>
                <Header>
                    <Body>
                        <Title>Login</Title>
                    </Body>
                </Header>
                <Form>
                    <FormItem floatingLabel>
                        <Label>Email</Label>
                        <Input
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        />
                    </FormItem>
                    <FormItem floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry
                        onChangeText = {password => this.setState({ password })}
                        value = {this.state.password}
                        />
                    </FormItem>

                    <Button full primary style={{ paddingBottom: 4}} onPress={this.handleLogin}>
                        <Text> Login </Text>
                    </Button>
                    <Button
                        full info
                        onPress={() => this.props.navigation.navigate('Register')} >
                        <Text> Sign Up </Text></Button>
                </Form>
            </Container>
        );
    }
}
