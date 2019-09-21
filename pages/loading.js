import firebase from "../utils/firebase"
import React, {Component} from "react";
import {ActivityIndicator, Text, View, StyleSheet} from "react-native";

export default class Loading extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Login');
                console.log("Reached Home");
            } else {
                this.props.navigation.navigate('Login');
                console.log("Reached Login");
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
