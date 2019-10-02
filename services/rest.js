import firebase from "../utils/firebase";
import {resume} from "expo/build/AR";

class restService {

    baseUrl = 'http://localhost:3000';

    async createUser(formdata) {
        await fetch(this.baseUrl + "/users", {
                method: 'POST',
                body: formdata
            }
        ).then(() => console.log("Request Sent"));
    }

    async leaveUsersFlat(userId: string) {
        let formData = new FormData();
        formData.append("flat_id", "nil");
        return await fetch(this.baseUrl + '/users/' + userId, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        })
    }

    async getUsersFlat(userId: string) {
        return await fetch(this.baseUrl + '/users/' + userId + '/flats');
    }

    async getFlatByInviteCode(inviteCode: string) {
        return await fetch(this.baseUrl + '/flats/' + inviteCode);
    }

    async createUsersFlat(userId: string, flat) {
        return await fetch(this.baseUrl + '/users/' + userId + '/flats',{
            method: 'POST',
            body: flat,
        });
    }

    async joinFlatById(flatId: number, userId: string) {
        let formData = new FormData();
        formData.append("flat_id", flatId);
        return await fetch(this.baseUrl + '/users/' + userId,
            {
                method: 'PATCH',
                credentials: 'include',
                body: formData
            })
    }

    async getTodosByUserId(userId: string) {
        return await fetch(this.baseUrl + '/users/' + userId + '/flats/todos/todo_items')
    }

    async removeTodoItem(userId: string, todoItemId: number) {
        return await fetch(this.baseUrl + '/users/' + userId + '/flats/todos/todo_items/' + todoItemId, {
            method: 'DELETE',
        })
    }

    async createTodoItem(userId: string, item) {
        return await fetch(this.baseUrl + '/users/' + userId + '/flats/todos/todo_items',
            {
                method: 'POST',
                body: item
            })
    }

    async getNewsPostsByUserId(userId: string) {
        return await fetch(this.baseUrl + '/users/' + userId + '/flats/news/news_posts')
    }

    async createNewsPost(userId: string, post) {
        return await fetch(this.baseUrl + '/users/' + userId + '/flats/news/news_posts',
            {
                method: 'POST',
                body: post
            });
    }

}

export default new restService();
