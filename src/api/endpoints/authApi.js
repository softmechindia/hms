    import { proxyApiRequest } from "../apiglobal/apiProxy";


    /**
     * Login API Endpoint
     * @param {string} UserID 
     * @param {string} Password 
     */

    export const loginUser = async (UserID, Password) => {
        const loginData = {
            UserID: UserID,
            Password: Password
        };

        return proxyApiRequest("/login", "POST", loginData)
    };