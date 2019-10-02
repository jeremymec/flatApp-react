import React, { Component } from "react"
import rest from "../services/rest";
import firebase from "../utils/firebase";
import {
    Body,
    Content,
    Container,
    Header,
    Form,
    Title,
    Input,
    Item,
    Textarea, Button, Text,
} from "native-base";
import {FlatList, TouchableOpacity, View} from "react-native";
import Moment from 'moment';

export class CreatePostPage extends Component {

    state = { title: '', content: '' };

    onBackPressed = () => {
        this.props.navigation.navigate('NewsFeed');
    };

    onSubmitPressed = () => {
        const userId = firebase.auth().currentUser.uid;
        let formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("content", this.state.content);
        formData.append("author", firebase.auth().currentUser.email);
        rest.createNewsPost(userId, formData).then(
            (response) => {
                if (response.status === 200){
                    this.onBackPressed();
                } else {
                    console.log("Unexpected Error has Occurred");
                }
            }

        );
    };

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Create Post</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input
                                placeholder="Title"
                                onChangeText={title => this.setState({title})}
                                value={this.state.title}
                            />
                        </Item>
                        <Item>
                            <Textarea rowSpan={5}
                                placeholder="Enter some text to post..."
                                onChangeText={content => this.setState({content})}
                                value={this.state.content}
                            />
                        </Item>
                    </Form>

                    <View style={{paddingTop: 50}}>
                        <Button block style={{alignSelf: 'center', width: 200}} onPress={this.onSubmitPressed}><Text>Create Post</Text></Button>
                    </View>

                </Content>
                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center"}}>
                    <Button full onPress={this.onBackPressed}><Text>Back to Newsfeed</Text></Button>
                </View>
            </Container>
        );
    }

}

