/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_susi",
        editProfile: "B2C_1_edit_profile",
        resetPassword: "B2C_1_reset_password"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://ncfpoc.b2clogin.com/ncfpoc.onmicrosoft.com/B2C_1_susi",
        },
        editProfile: {
            authority: "https://ncfpoc.b2clogin.com/ncfpoc.onmicrosoft.com/B2C_1_edit_profile"
        },
        resetPassword: {
            authority: "https://ncfpoc.b2clogin.com/ncfpoc.onmicrosoft.com/B2C_1_reset_password"
        }
    },
    authorityDomain: "ncfpoc.b2clogin.com"
}