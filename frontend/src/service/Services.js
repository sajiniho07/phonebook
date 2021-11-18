class Services {

    async isAlreadyLogin() {
        let result = await fetch('/isAlreadyLogin', {
            method: 'GET',
        }).catch(function (error) {
            console.log(error);
        });
        return result;
    }

}

export default Services;