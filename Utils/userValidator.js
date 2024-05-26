class Validator {
    /**
     *check if user provided all the required ferlds for user registration
    */
    static validateUserDetails(userInfo) {
        const { userName, password, emailId } = userInfo;
        if (!userName || !password || !emailId) {
            return {
                "status": false,
                "message": "Username,emailid and password  are required"
            };
        } else {
            return {
                "status": true,
                "message": "Validated successfully"
            };
        }
    }
    /**
         *check if user exists or not
        */
    static isUserExists(users, userInfo) {
        const isUserExists = users.find(user => user.userName === userInfo.userName || user.emailID === userInfo.emailId);
        return isUserExists;
    }
    /**
     * 
     check if the user provided user name and password for user login
     */
    static validateLoginDetails(userInfo) {
        const { userName, password } = userInfo;
        if (!userName || !password) {
            return {
                "status": false,
                "message": "Username,Password required"
            };
        } else {
            return {
                "status": true,
                "message": "Validated successfully"
            };
        }
    }
}

module.exports = Validator;