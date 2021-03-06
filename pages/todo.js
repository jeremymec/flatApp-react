import React, { Component } from "react"
import rest from "../services/rest";
import firebase from "../utils/firebase";
import {Body, Button, Container, Header, Text, Title, List, ListItem, CheckBox, Form, Item, Input} from "native-base";
import {Grid, Row} from "react-native-easy-grid";
import {FlatList, TouchableOpacity, View} from "react-native";

export class TodoPage extends Component {

    state = { todoItems: [], newItemName: '' };

    componentDidMount() {
        this.updateModel();
    }

    onBackPressed = () => {
        this.props.navigation.navigate('Home');
    };

    onItemPressed = i => {
        const userId = firebase.auth().currentUser.uid;
        const itemId = i.id;
        rest.removeTodoItem(userId, itemId).then(
            this.updateModel()
        )
    };

    onItemCreate = () => {
        const userId = firebase.auth().currentUser.uid;
        let formData = new FormData();
        formData.append("content", this.state.newItemName);
        rest.createTodoItem(userId, formData).then(r => {
            this.setState({newItemName: ''});
            this.updateModel();

        })
    };

    updateModel() {
        const userId = firebase.auth().currentUser.uid;

        this.setState({todoItems: []});

        rest.getTodosByUserId(userId).then(
            (response) => {
                return response.json().then(
                    (responseJson) => {
                        for (let i = 0; i < responseJson.length; i++) {
                            console.log(responseJson[i]);
                            let todoItem = new TodoItem(responseJson[i]);
                            this.setState((prevState => ({
                                todoItems: [...prevState.todoItems, todoItem]
                            })))
                        }
                    }
                );
            }
        );

    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>To-do List</Title>
                    </Body>
                </Header>
                <View>
                    <List>
                    <FlatList
                        data={this.state.todoItems}
                              renderItem={({item}) =>
                                  <ListItem style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                      <Text>{item.content}</Text>
                                      <Button success onPress={() => this.onItemPressed(item)}><Text>Done!</Text></Button>
                                  </ListItem>}
                              keyExtractor={(item, index) => index.toString()}
                              />
                    </List>
                    <Form>
                        <Item>
                            <Input placeholder="Item Name"
                                   onChangeText={newItemName => this.setState({newItemName})}
                                   value={this.state.newItemName}/>
                            <Button primary style={{textAlign: 'right'}} onPress={this.onItemCreate}><Text>Add Item</Text></Button>
                        </Item>
                    </Form>
                </View>
                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center"}}>
                    <Button full onPress={this.onBackPressed}><Text>Home</Text></Button>
                </View>
            </Container>
            );
    }

}

export class TodoItem {
    id: number;
    content: string;
    selected: boolean;

    // tslint:disable-next-line:ban-types
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

