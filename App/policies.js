/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1A_SIGNUP_SIGNIN",
        editProfile: "B2C_1A_PROFILEEDIT",
        resetPassword: "B2C_1A_PASSWORDRESET"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://ncfpoc.b2clogin.com/ncfpoc.onmicrosoft.com/B2C_1A_SIGNUP_SIGNIN",
        },
        editProfile: {
            authority: "https://ncfpoc.b2clogin.com/ncfpoc.onmicrosoft.com/B2C_1A_PROFILEEDIT"
        },
        resetPassword: {
            authority: "https://ncfpoc.b2clogin.com/ncfpoc.onmicrosoft.com/B2C_1A_PASSWORDRESET"
        }
    },
    authorityDomain: "ncfpoc.b2clogin.com"
}