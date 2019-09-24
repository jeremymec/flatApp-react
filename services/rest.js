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

}

export default new restService();
