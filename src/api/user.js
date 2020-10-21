export { UserApi };

class UserApi {
    static token = null;
    static baseUrl = 'http://localhost:8080/api';
    static username = '';
    static password = '';
    static email = '';
    static fullName = '';
    static gender = '';
    static birthdate = 0;
    phone = '';
    avatarUrl = '';

    


}
    // static get url() {
    //     return `${Api.baseUrl}/user`;
    // }

    // static async login(credentials) {
    //     axios.post(this.baseUrl + 'user/login', {username: credentials.username, password: credentials.password})
    //     .then(response => {
    //       this.token = response.data.token;
    //       router.go(1);
    //      // router.push({name:'Explorar'});
    //       }).then(() => console.log(this.token)).catch(error => console.log(error.code));
    // }

    // static async logout(controller) {
    //     await Api.post(`${UserApi.url}/logout`, true, controller);
    //     Api.token = undefined;
    // }
    // static async register(registerCredentials){
    //     var cont = 1;

    //     if (registerCredentials.usernameReg === '') {
    //         Principal.showMissingUsername = true;
    //         console.log("user vacio");
    //         cont = 0;
    //     }

    //     if (registerCredentials.passReg === '' || registerCredentials.passReg.length < 8) {
    //         Principal.showMissingPass = true;
    //         console.log("pass vacio o inc");
    //         cont = 0;
    //     }

    //     if (this.emailReg === '') {
    //         Principal.showMissingEmail = true;
    //         console.log("email vacio");
    //         cont = 0;
    //     }
    //     //los campos restantes se llenan con "basura", luego dentro de la Web algunos campos podrian modificarse
    //     //y otros no, de todas formas, si no se utilizan no cambia
    //     if (cont) {
    //         axios.post(this.baseUrl + 'user', {
    //             username: registerCredential.usernameReg,
    //             password: registerCredential.passReg,
    //             fullName: "j d",
    //             gender: "male",
    //             birthdate: 0,
    //             email: registerCredential.emailReg,
    //             phone: "0000-0000",
    //             avatarUrl: " "
    //         }).then(() => {
    //             Principal.showMissingUsername = false;
    //             Principal.showMissingPass = false;
    //             Principal.showMissingEmail = false;
    //             Principal.verification = true;

    //         })
    //             .catch(error => console.log(error.detail));
    //     }
    // }
    // static async verifyCode(registerCredential){
    //     axios.post(this.baseUrl + 'user/verify_email', {
    //         email: registerCredential.emailReg,
    //         code: registerCredential.verificationInput
    //     }).then(() => {
    //         const nCredential = new Credentials(registerCredential.usernameReg, registerCredential.passReg);
    //         this.logIn(nCredential);
    //     }).catch(error => {
    //         console.log(error.detail);
    //         this.incorrectCode = true;

    //     });
    //}
//

// class Credentials {
//     constructor(username, password) {
//         this.username = username;
//         this.password = password;
//     }
//}