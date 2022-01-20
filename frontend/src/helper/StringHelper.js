const passwordRegex = "^(?=.*\\d)(?=.*[A-Za-z]).{6,20}$";
const emailRegex = "\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b";
const usernameRegex = "^[A-Za-z0-9_-]{4,20}$";
const facebookRegex = "^(?:(?:http|https):\\/\\/)?(?:www.)?facebook.com\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[?\\w\\-]*\\/)?(?:profile.php\\?id=(?=\\d.*))?([\\w\\-]*)?$";
const numberRegex = "^[0-9]+$";
const twitterRegex = "^@?(\\w){1,15}$";

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

    checkValidateFacebook(account) {
        return account.match(facebookRegex);
    }

    checkValidateNumber(number) {
        return number.match(numberRegex);
    }

    checkValidateTwitter(twitter) {
        return twitter.match(twitterRegex);
    }
}

export default StringHelper;