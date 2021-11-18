const passwordRegex = "^(?=.*\\d)(?=.*[A-Za-z]).{6,20}$";
const emailRegex = "\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b";
const usernameRegex = "^[A-Za-z0-9_-]{4,20}$";

class StringHelper {

    checkValidatePassword(password) {
        return password.match(passwordRegex);
    }

    checkValidateEmail(email) {
        return email.match(emailRegex);
    }

    checkValidateUsername(username) {
        return username.match(usernameRegex);
    }
}

export default StringHelper;