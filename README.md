---
page_type: sample
languages:
  - javascript
products:
  - azure-active-directory-b2c
  - microsoft-identity-platform
name: Vanilla JavaScript Single-page Application secured with MSAL.js 2.x using the Authorization Code Flow (PKCE) on Azure AD B2C
urlFragment: ms-identity-b2c-javascript-callapi
description: "This sample demonstrates a Vanilla JavaScript Single-page Application with MSAL.js 2.x using the Authorization Code Flow (w/ PKCE) to authorize users to call a Web API protected by Azure Active Directory B2C"
---

# Vanilla JavaScript Single-page Application secured with MSAL.js 2.x using the Authorization Code Flow (PKCE) on Azure AD B2C

 1. [Overview](#overview)
 1. [Scenario](#scenario)
 1. [Contents](#contents)
 1. [Prerequisites](#prerequisites)
 1. [Setup](#setup)
 1. [Registration](#registration)
 1. [Running the sample](#running-the-sample)
 1. [Explore the sample](#explore-the-sample)
 1. [About the code](#about-the-code)
 1. [Deployment](#deployment)
 1. [More information](#more-information)
 1. [Community Help and Support](#community-help-and-support)
 1. [Contributing](#contributing)
 1. [Code of Conduct](#code-of-conduct)

## Overview

This sample demonstrates a Vanilla JavaScript single-page application that lets users authenticate against [Azure Active Directory B2C](https://azure.microsoft.com/services/active-directory/external-identities/b2c/) (Azure AD B2C) using the [Microsoft Authentication Library for JavaScript](https://github.com/AzureAD/microsoft-authentication-library-for-js) (MSAL.js) and authorize them to call a web API that is also protected by **Azure AD B2C**.

## Scenario

1. The client application uses the **MSAL.js** to obtain an **Access Token** from **Azure AD B2C**.
1. The **Access Token** is used as a **bearer** to *authorize* the user to call a protected web API.
1. The protected web API responds with the name of the signed-in user.

![Overview](./ReadmeFiles/topology.png)

## Contents

| File/folder           | Description                                |
|-----------------------|--------------------------------------------|
| `App/authPopup.js`    | Main authentication logic resides here (using popup flow). |
| `App/authRedirect.js` | Use this instead of `authPopup.js` for authentication with redirect flow. |
| `App/authConfig.js`   | Contains configuration parameters for the sample. |
| `App/apiConfig.js`    | Contains Web API scopes and coordinates. |
| `App/policies.js`     | Contains B2C custom policies and user-flows.  |

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) must be installed to run this sample.
- A modern web browser. This sample uses **ES6** conventions and will not run on **Internet Explorer**.
- [Visual Studio Code](https://code.visualstudio.com/download) is recommended for running and editing this sample.
- [VS Code Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension is recommended for interacting with Azure through VS Code Interface.
- An Azure Active Directory B2C (Azure AD B2C) tenant. For more information on how to get an Azure AD tenant, see: [Create an Azure Active Directory B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant)
- A user account in your Azure AD B2C tenant.

## Setup

### Step 1: Clone or download this repository

From your shell or command line:

```console
git clone https://github.com/Azure-Samples/ms-identity-b2c-javascript-callapi.git
```

or download and extract the repository .zip file.

> :warning: Given that the name of the sample is quite long, and so are the names of the referenced packages, you might want to clone it in a folder close to the root of your hard drive, to avoid maximum file path length limitations on Windows.

### Step 2: Install project dependencies

```console
    cd ms-identity-b2c-javascript-callapi
    npm install
```

## Registration

> :information_source: This sample comes with a pre-registered application for testing purposes. If you would like to use your own **Azure AD B2C** tenant and application, follow the steps below to register and configure the applications in the **Azure Portal**. Otherwise, continue with the steps for [Running the sample](#running-the-sample).

> :information_source: This sample is calling a web API that is already protected by Azure AD B2C and hosted on Azure websites. If you would like to setup and use your own web API, follow the instructions on the [Node.js Web API with Azure AD B2C](https://github.com/Azure-Samples/active-directory-b2c-javascript-nodejs-webapi) sample. Otherwise, continue with the steps for [Running the sample](#running-the-sample).

### Choose the Azure AD B2C tenant where you want to create your applications

As a first step you'll need to:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. If your account is present in more than one **Azure AD B2C** tenant, select your profile at the top right corner in the menu on top of the page, and then **switch directory** to change your portal session to the desired **Azure AD B2C** tenant.

#### Register the app (ms-identity-b2c-javascript-callapi)

1. Navigate to the Microsoft identity platform for developers [App registrations](https://go.microsoft.com/fwlink/?linkid=2083908) page.
1. Select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
   - In the **Name** section, enter a meaningful application name that will be displayed to users of the app, for example `ms-identity-b2c-javascript-callapi`.
   - Under **Supported account types**, select **Accounts in any organizational directory or any identity provider**.
   - In the **Redirect URI (optional)** section, select **Single-page application** in the combo-box and enter the following redirect URI: `http://localhost:6420`.
1. Select **Register** to create the application.
1. In the app's registration screen, find and note the **Application (client) ID**. You use this value in your app's configuration file(s) later in your code.
1. Select **Save** to save your changes.

#### Configure the app (ms-identity-b2c-javascript-callapi) to use your app registration

Open the project in your IDE (like Visual Studio Code) to configure the code.

> In the steps below, "ClientID" is the same as "Application ID" or "AppId".

Open the `App\authConfig.js` file. Then:

1. Find the key `clientId` and replace the existing value with the application ID (clientId) of the `ms-identity-b2c-javascript-callapi` application copied from the Azure portal.
1. Find the key `redirectUri` and replace the existing value with the base address of the ms-identity-b2c-javascript-callapi project (by default `http://localhost:6420`).

Open the `App\policies.js` file. Then:

1. Find the key `policies.names` and replace it with the names (IDs) of your policies/user-flows e.g. `b2c_1_susi`.
1. Find the key `policies.authorities` abd replace it with the authority strings of your policies/user-flows e.g. `https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_susi`.
1. Find the key `policies.authorityDomain` abd replace it with the domain of your authority e.g. `fabrikamb2c.b2clogin.com`.

Open the `App\apiConfig.js` file. Then:

1. Find the key `b2cScopes` and replace the existing value with the scope of your web API.
1. Find the key `webAPI` and replace the existing value with the coordinates of your web API.

## Running the sample

```console
    cd ms-identity-b2c-javascript-callapi
    npm start
```

## Explore the sample

1. Open your browser and navigate to `http://localhost:6420`.
1. Click on the **sign-in** button on the top right corner.

![Screenshot](./ReadmeFiles/screenshot.png)

> :thought_balloon: Consider taking a moment to [share your experience with us](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUMkFXQjk0QkZKQ0U4VFgxWTVISkpNVFBETSQlQCN0PWcu)

## About the code

## Sign-in

MSAL.js provides 3 login APIs: `loginPopup()`, `loginRedirect()` and `ssoSilent()`:

```javascript
    myMSALObj.loginPopup(loginRequest)
        .then((response) => {
            // your logic
        })
        .catch(error => {
            console.error(error);
        });
```

To use the redirect flow, you must register a handler for redirect promise. **MSAL.js** provides `handleRedirectPromise()` API:

```javascript
    myMSALObj.handleRedirectPromise()
        .then((response) => {
            // your logic
        })
        .catch(err => {
            console.error(err);
        });

    myMSALObj.loginRedirect(loginRequest);
```

The recommended pattern is that you fallback to an **interactive method** should the silent SSO fails.

```javascript

    const silentRequest = {
      scopes: ["openid", "profile"],
      loginHint: "example@domain.net"
    };

    myMSALObj.ssoSilent(silentRequest)
        .then((response) => {
            // your logic
        }).catch(error => {
            console.error("Silent Error: " + error);
            if (error instanceof msal.InteractionRequiredAuthError) {
                myMSALObj.loginRedirect(loginRequest);
            }
        });
```

You can pass custom query string parameters to your sign-in request, using the `extraQueryParameters` property. For instance, in order to customize your B2C user interface, you can:

```javascript
    const loginRequest = {
      scopes: ["openid", "profile"],
      extraQueryParameters: { campaignId: 'hawaii', ui_locales: 'es' }
    };

    myMSALObj.loginRedirect(loginRequest);
```

See here for more: [Customize the user interface of your application in Azure AD B2C](https://docs.microsoft.com/azure/active-directory-b2c/custom-policy-ui-customization)

You can get all the active accounts of a signed-in user with the get `getAllAccounts()` API. If you know the **home ID** of an account, you can select it by:

```javascript
    myMSALObj.getAccountByHomeId(homeId);
```

> :warning: MSAL.js also provides a `getAccountByUsername()` API, which is not recommended with B2C as the B2C server may not return a username and as such, **home ID** is a more robust identifier to select an account.

### Sign-out

The application redirects the user to the **Microsoft identity platform** logout endpoint to sign out. This endpoint clears the user's session from the browser. If your app did not go to the logout endpoint, the user may re-authenticate to your app without entering their credentials again, because they would have a valid single sign-in session with the **Microsoft identity platform** endpoint. See for more: [Send a sign-out request](https://docs.microsoft.com/azure/active-directory/develop/v2-protocols-oidc#send-a-sign-out-request).

The sign-out clears the user's single sign-on session with **Azure AD B2C**, but it might not sign the user out of their **social identity provider** session. If the user selects the same identity provider during a subsequent sign-in, they might re-authenticate without entering their credentials. Here the assumption is that, if a user wants to sign out of the application, it doesn't necessarily mean they want to sign out of their social account (e.g. Facebook) itself.

### Acquire a Token

Access Token requests in **MSAL.js** are meant to be *per-resource-per-scope(s)*. This means that an **Access Token** requested for resource A with scope `scp1`:

- cannot be used for accessing resource **A** with scope `scp2`, and,
- cannot be used for accessing resource **B** of any scope.

The intended recipient of an **Access Token** is represented by the `aud` claim; in case the value for the `aud` claim does not mach the resource `APP ID URI`, the token should be considered invalid. Likewise, the permissions that an **Access Token** grants is represented by the `scp` claim. See [Access Token claims](https://docs.microsoft.com/azure/active-directory/develop/access-tokens#payload-claims) for more information.

MSAL.js exposes 3 APIs for acquiring a token: `acquireTokenPopup()`, `acquireTokenRedirect()` and `acquireTokenSilent()`:

```javascript
    myMSALObj.acquireTokenPopup(request)
        .then(response => {
            // do something with response
        })
        .catch(error => {
            console.log(error)
        });
```

For `acquireTokenRedirect()`, you must register a redirect promise handler:

```javascript
    myMSALObj.handleRedirectPromise()
        .then(response => {
            // do something with response
        })
        .catch(error => {
            console.log(error);
        });

    myMSALObj.acquireTokenRedirect(request);
```

### ID Token validation

A single-page application does not benefit from validating ID tokens, since the application runs without a back-end and as such, attackers can intercept and edit the keys used for validation of the token.

### Access Token validation

Clients should treat access tokens as opaque strings, as the contents of the token are intended for the resource only (such as a web API). For validation and debugging purposes, developers can decode **JWT**s (*JSON Web Tokens*) using a site like [jwt.ms](https://jwt.ms).

### Refresh Tokens and token lifetimes

Access tokens in the browser have a default recommended expiration of 1 hour. After this 1 hour, any bearer calls with the expired token will be rejected. This token can be refreshed silently using the refresh token retrieved with this token. For more information, see: [Configurable token lifetimes in Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/active-directory-configurable-token-lifetimes)

Refresh tokens given to single-page applications are limited-time refresh tokens (usually 24 hours from the time of retrieval). This is a non-adjustable lifetime. Whenever a refresh token is used to renew an access token, a new refresh token is fetched with the renewed access token.

The **MSAL.js** exposes the `acquireTokenSilent()` API which is meant to retrieve a non-expired token silently.

```javascript
    myMSALObj.acquireTokenSilent(request)
        .then(tokenResponse => {
        // Do something with the tokenResponse
        }).catch(async (error) => {
            if (error instanceof InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenPopup(request);
            }
        }).catch(error => {
            handleError(error);
        });
```

### Integrating user-flows

- **Sign-up/sign-in**

This user-flow allows your users to sign-in to your application if the user has an account already, or sign-up for an account if not. This is the default user-flow that we pass during the initialization of MSAL instance.

- **Password reset**

When a user clicks on the **forgot your password?** link during sign-in, **Azure AD B2C** will throw an error. To initiate the password reset user-flow, you need to catch this error and handle it by sending another login request with the corresponding password reset authority string.

```javascript
    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);

            if (error.errorMessage) {
                if (error.errorMessage.indexOf("AADB2C90118") > -1) {
                myMSALObj.loginPopup(b2cPolicies.authorities.forgotPassword)
                    .then(response => {
                        console.log(response);
                        window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");
                    })
                }
            }
    });
```

In case if you are using redirect flow, you should catch the error inside `handleRedirectPromise()`:

```javascript
    myMSALObj.handleRedirectPromise()
        .then(handleResponse)
        .catch(error => {
            console.error(error);

            if (error.errorMessage.indexOf("AADB2C90118") > -1) {
                try {
                    myMSALObj.loginRedirect(b2cPolicies.authorities.forgotPassword);
                } catch(err) {
                    console.log(err);
                }
            }
        });
```

Then, in `handleResponse()`:

```javascript
    function handleResponse(response) {
        if (response !== null) {

            if (response.idTokenClaims['acr'] === b2cPolicies.names.forgotPassword) {
                window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");

                const logoutRequest = {
                    account: myMSALObj.getAccountByHomeId(accountId),
                    postLogoutRedirectUri: "http://localhost:6420"
                };

                myMSALObj.logout(logoutRequest);
            } else if (response.idTokenClaims['acr'] === b2cPolicies.names.editProfile) {
                window.alert("Profile has been updated successfully.");
            } else {
                // sign-in as usual
            }
        }
    }
```

- **Edit Profile**

Unlike password reset, edit profile user-flow does not require users to sign-out and sign-in again. Instead, **MSAL.js** will handle
switching back to the authority string of the default user-flow automatically.

```javascript
    myMSALObj.loginPopup(b2cPolicies.authorities.editProfile)
        .then(response => {
            console.log(response);
            // your logic here
        });
```

## Deployment

### Deployment to Azure Storage

There is one single-page application in this sample. To deploy it to **Azure Storage**, you'll need to:

- create an Azure Storage blob
- build your project and upload it
- update config files with website coordinates

> :information_source: If you would like to use **VS Code Azure Tools** extension for deployment, [watch the tutorial](https://docs.microsoft.com/azure/developer/javascript/tutorial-vscode-static-website-node-01) offered by Microsoft Docs.

#### Build and upload the `ms-identity-b2c-javascript-callapi` to an Azure Storage blob

Build your project to get a distributable files folder, where your built `html`, `css` and `javascript` files will be generated. Then follow the steps below:

> :warning: When uploading, make sure you upload the contents of your distributable files folder and **not** the entire folder itself.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Locate your storage account and display the account overview.
1. Select **Static website** to display the configuration page for static websites.
1. Select **Enabled** to enable static website hosting for the storage account.
1. In the **Index document name** field, specify a default index page (For example: `index.html`).
1. The default **index page** is displayed when a user navigates to the root of your static website.
1. Click **Save**. The Azure portal now displays your static website endpoint. Make a note of the **Primary endpoint field**.
1. In the `ms-identity-b2c-javascript-signin` project source code, update your configuration file with the **Primary endpoint field** as your new **Redirect URI** (you will register this URI later).
1. Next, select **Storage Explorer**.
1. Expand the **BLOB CONTAINERS** node, and then select the `$web` container.
1. Choose the **Upload** button to upload files.
1. If you intend for the browser to display the contents of file, make sure that the content type of that file is set to `text/html`.
1. In the pane that appears beside the **account overview page** of your storage account, select **Static Website**. The URL of your site appears in the **Primary endpoint field**. In the next section, you will register this URI.

### Update the Azure AD B2C app registration for `ms-identity-b2c-javascript-callapi`

1. Navigate back to to the [Azure portal](https://portal.azure.com).
1. In the left-hand navigation pane, select the **Azure AD B2C** service, and then select **App registrations**.
1. In the resulting screen, select the `ms-identity-b2c-javascript-callapi` application.
1. From the *Branding* menu, update the **Home page URL**, to the address of your service, for example `https://ms-identity-b2c-javascript-callapi`. Save the configuration.
1. Add the same URI in the list of values of the *Authentication -> Redirect URIs* menu. If you have multiple redirect URIs, make sure that there a new entry using the App service's URI for each redirect URI.

## More information

Configure your application:

- [Use Microsoft Authentication Library for JavaScript to work with Azure AD B2C](https://docs.microsoft.com/azure/active-directory/develop/msal-b2c-overview)
- [Tutorial: Create an Azure Active Directory B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant)
- [Single sign-on with MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-sso)
- [Handle MSAL.js exceptions and errors](https://docs.microsoft.com/azure/active-directory/develop/msal-handling-exceptions?tabs=javascript)
- [Logging in MSAL.js applications](https://docs.microsoft.com/azure/active-directory/develop/msal-logging?tabs=javascript)

Learn more about **Microsoft Identity Platform** and **Azure AD B2C**:

- [Microsoft identity platform (Azure Active Directory for developers)](https://docs.microsoft.com/azure/active-directory/develop/)
- [Overview of Microsoft Authentication Library (MSAL)](https://docs.microsoft.com/azure/active-directory/develop/msal-overview)
- [What is Azure Active Directory B2C?](https://docs.microsoft.com/azure/active-directory-b2c/overview)
- [Azure AD B2C User Flows](https://docs.microsoft.com/azure/active-directory-b2c/user-flow-overview)
- [Azure AD B2C Custom Policies](https://docs.microsoft.com/azure/active-directory-b2c/custom-policy-overview)

See more code samples:

- [MSAL B2C code samples](https://docs.microsoft.com/azure/active-directory-b2c/code-samples)

For more information about how OAuth 2.0 protocols work in this scenario and other scenarios, see [Authentication Scenarios for Azure AD](https://docs.microsoft.com/azure/active-directory/develop/authentication-flows-app-scenarios).

## Community Help and Support

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`azure-ad-b2c` `ms-identity` `adal` `msal`].

If you find a bug in the sample, please raise the issue on [GitHub Issues](../../issues).

To provide a recommendation, visit the following [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
