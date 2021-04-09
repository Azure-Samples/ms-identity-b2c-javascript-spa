// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accountId = "";
let username = "";

function selectAccount () {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (!currentAccounts || currentAccounts.length < 1) {
        return;
    } else if (currentAccounts.length === Object.entries(b2cPolicies.names).length) {
        
        /**
         * Due to the way MSAL caches account objects, the auth response from initiating a user-flow
         * is cached as a new account. Here we make sure we are selecting the account with homeAccountId
         * that contains the sign-up/sign-in user-flow.
         */
        const account = currentAccounts.find(account => 
            account.homeAccountId.toUpperCase().includes(b2cPolicies.names.signUpSignIn.toUpperCase()));
        
        accountId = account.homeAccountId;
        username = account.username;
        welcomeUser(username);
    } else if (currentAccounts.length === 1) {
        accountId = currentAccounts[0].homeAccountId;
        username = currentAccounts[0].username;
        welcomeUser(username);
    }
}

// in case of page refresh
selectAccount();

function handleResponse(response) {
    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        accountId = response.account.homeAccountId;
        username = response.account.username;
        welcomeUser(username);
    } else {
        selectAccount();
    }
}

function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.log(error);
        });
}

function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        redirectMainWindowTo: msalConfig.auth.redirectUri
    };
    
    myMSALObj.logoutPopup(logoutRequest).then(() => {
        window.location.reload();
    });
}

function getTokenPopup(request) {

     /**
     * See here for more information on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    request.account = myMSALObj.getAccountByHomeId(accountId);
    
    return myMSALObj.acquireTokenSilent(request)
        .then((response) => {
            // In case the response from B2C server has an empty accessToken field
            // throw an error to initiate token acquisition
            if (!response.accessToken || response.accessToken === "") {
                throw new msal.InteractionRequiredAuthError;
            }
            return response;
        })
        .catch(error => {
            console.log("Silent token acquisition fails. Acquiring token using popup. \n", error);
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenPopup(request)
                    .then(response => {
                        console.log(response);
                        return response;
                    }).catch(error => {
                        console.log(error);
                    });
            } else {
                console.log(error);   
            }
    });
}
  
function passTokenToApi() {
    getTokenPopup(tokenRequest)
        .then(response => {
            if (response) {
                console.log("access_token acquired at: " + new Date().toString());
                try {
                    callApi(apiConfig.webApi, response.accessToken);
                } catch(error) {
                    console.log(error); 
                }
            }
        });
}

/**
 * To initiate a B2C user-flow, simply make a login request using
 * the full authority string of that user-flow e.g.
 * https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_edit_profile_v2 
 */
function editProfile() {
    myMSALObj.loginPopup(b2cPolicies.authorities.editProfile)
        .catch(error => {
            console.log(error);
        });
}