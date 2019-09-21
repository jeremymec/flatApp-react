import React, {Component} from 'react'
import firebase from "../utils/firebase";
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
import Constants from "expo-constants/src/Constants";

export class RegisterPage extends Component {

    state = {email: '', password: '', errorMessage: null};

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email,
                this.state.password)
            .then(() => this.props.navigation.navigate('Home'))
            .catch(error => this.setState({errorMessage: error.message}))
    };

    render() {
        return (
            <Container style={{ paddingTop: Constants.statusBarHeight }}>
                <Header>
                    <Body>
                        <Title>Register</Title>
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

                    <Button full primary style={{ paddingBottom: 4}} onPress={this.handleSignUp}>
                        <Text> Create User </Text>
                    </Button>
                    <Button
                        full info
                        onPress={() => this.props.navigation.navigate('Login')} >
                        <Text> Login </Text></Button>
                </Form>
            </Container>
        )
    }
}
