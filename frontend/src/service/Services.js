
class Services {

    async isAlreadyLogin() {
        let result = await fetch('/clients/isAlreadyLogin', {
            method: 'GET'
        });
        return result;
    }
}

export default Services;