
class Services {

    async isAlreadyLogin() {
        let result = await fetch('/isAlreadyLogin', {
            method: 'GET'
        });
        return result;
    }
}

export default Services;