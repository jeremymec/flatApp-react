import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {LoginPage} from "./pages/login";
import {RegisterPage} from "./pages/register";
import * as Font from 'expo-font';
import Ionicons from "@expo/vector-icons/build/Ionicons";
import Loading from "./pages/loading";
import {HomePage} from "./pages/home";
import {JoinPage} from "./pages/joinflat";
import {TodoPage} from "./pages/todo";
import HeaderBackButton from "react-navigation";
import {NewsFeedPage} from "./pages/newsfeed";

const rootStack = createSwitchNavigator({
        Loading: Loading,
        Login: LoginPage,
        Register: RegisterPage,
        Home: HomePage,
        Join: JoinPage,
        Todo: TodoPage,
        NewsFeed: NewsFeedPage
},
    {
        InitialName: 'Loading'
    });

const AppObj = createAppContainer(rootStack);

const navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>,
});

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });
    }

    render(){
        if (this.state.isReady) {
            return <AppObj />;
        } else {
            return null;
        }
    }

}
