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
        formData.append("flat", "nil");
        return await fetch(this.baseUrl + '/users/' + userId, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        })
    }

    async getUsersFlat(userId: string) {
        return await fetch(this.baseUrl + '/users/' + userId + '/flats')
            .then((response) => response.json());
    }

}

export default new restService();
