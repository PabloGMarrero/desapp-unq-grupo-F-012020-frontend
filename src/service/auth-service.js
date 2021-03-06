import axios from 'axios';
//const API_URL = 'https://buyingfromhome.herokuapp.com/authusers/'
const API_URL = 'http://localhost:8080/authusers/'

class AuthService{
    login(name, email, password){
        return axios.post(API_URL+"signin", {
            name, email, password
        })
    }

    logout(){
        // localStorage.removeItem("user");
        // localStorage.removeItem("shopping_list")
        // localStorage.removeItem("prod_count")
        localStorage.clear()
    }

    register(name, email, password){
        return axios.post(API_URL+"signup", {
            name, email, password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    registerIsUserDoesNotExist(name, email, password){
        return axios.post(API_URL+"authsignin",{
            name, email, password
        })
    }

    
}

export default new AuthService()