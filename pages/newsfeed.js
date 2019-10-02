import React, { Component } from "react"
import rest from "../services/rest";
import firebase from "../utils/firebase";
import {
    Body,
    Content,
    Container,
    Header,
    Text,
    Title,
    Card,
    CardItem,
    List,
    ListItem,
    Button,
} from "native-base";
import {FlatList, TouchableOpacity, View} from "react-native";
import Moment from 'moment';

export class NewsFeedPage extends Component {

    state = { newsPosts: [] };

    componentDidMount() {
        this.updateModel();
    }

    onBackPressed = () => {
        this.props.navigation.navigate('Home');
    };

    onNewPressed = () => {
        this.props.navigation.navigate('CreatePost');
    };

    updateModel() {
        const userId = firebase.auth().currentUser.uid;

        this.setState({newsPosts: []});

        rest.getNewsPostsByUserId(userId).then(
            (response) =>
                response.json().then(
                    (responseJson) => {
                        console.log(responseJson);
                        for (let i = 0; i < responseJson.length; i++) {
                            console.log(responseJson[i]);
                            let newsPost = new NewsPost(responseJson[i]);
                            console.log(newsPost);
                            this.setState((prevState => ({
                                newsPosts: [...prevState.newsPosts, newsPost]
                            })))
                        }}));
    }

    render() {
        return (
            <Container style={{flexGrow: 1}}>
                <Header>
                    <Body>
                        <Title>News Feed</Title>
                    </Body>
                </Header>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Button full success onPress={this.onNewPressed}><Text>Create New Post</Text></Button>
                </View>
                <Content style={{flexGrow: 1}}>
                    <List>
                        <FlatList
                            data={this.state.newsPosts}
                            renderItem={({item}) =>
                                <ListItem>
                                    <Content>
                                    <Card>
                                        <CardItem header><Text>{item.title}</Text></CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text>{item.content}</Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem footer>
                                            <Text>Posted by {item.author} on {Moment(item.created_at).format("dddd, h:mm:ss a")}</Text>
                                        </CardItem>
                                        </Card>
                                    </Content>
                                </ListItem>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </List>
                </Content>
                <View style={{ justifyContent: "flex-end", alignItems: "center"}}>
                    <Button full onPress={this.onBackPressed}><Text>Home</Text></Button>
                </View>
            </Container>
        );
    }

}

export class NewsPost {
    id: number;
    author: string;
    title: string;
    content: string;
    created_at: string;

    // tslint:disable-next-line:ban-types
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

