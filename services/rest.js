import firebase from "../utils/firebase";
import {resume} from "expo/build/AR";

class restService {

    baseUrl = 'http://localhost:3000';

    async createUser(formdata){
        await fetch(this.baseUrl + "/users", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: formdata
                }
            ).then( () => console.log("Request Sent") );
    }

}

export default new restService();
