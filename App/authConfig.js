/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 * For more details on MSAL.js and Azure AD B2C, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/working-with-b2c.md 
 */

const msalConfig = {
    auth: {
      clientId: "2fdd06f3-7b34-49a3-a78b-0cf1dd87878e", // This is the ONLY mandatory field; everything else is optional.
      authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
      knownAuthorities: [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
      redirectUri: "http://localhost:6420", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
    },
    cache: {
      cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO.
      storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case msal.LogLevel.Error:
              console.error(message);
              return;
            case msal.LogLevel.Info:
              console.info(message);
              return;
            case msal.LogLevel.Verbose:
              console.debug(message);
              return;
            case msal.LogLevel.Warning:
              console.warn(message);
              return;
          }
        }
      }
    }
  };
  
/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
  scopes: ["openid", "profile", "offline_access"],
};

// Add here scopes for access token to be used at the API endpoints.
const tokenRequest = {
  scopes: [...apiConfig.b2cScopes, "offline_access"],  // e.g. ["https://fabrikamb2c.onmicrosoft.com/8c7ca6cd-b322-47a2-b8d0-b06fb20f9043/hello"]
  forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};