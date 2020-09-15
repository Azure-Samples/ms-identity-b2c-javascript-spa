---
page_type: sample
languages:
  - javascript
products:
  - azure-active-directory-b2c
  - microsoft-identity-platform
  - microsoft-authentication-library 
urlFragment: ms-identity-b2c-javascript-callapi
description: "Vanilla JavaScript Single-page Application built with MSAL.js 2.x using Authorization Code Flow (w/ PKCE) to authorize users to call a protected Web API"
---

<br>
<div id="navbar">
    <p>In this tutorial: authentication, B2C, identity providers</p>
    <a href="/">Previous Tutorial</a>
    <a href="/">Next Tutorial</a>
    <a href="/">All Tutorials</a>
</div>
<br>

# Vanilla JavaScript Single-page Application built with MSAL.js 2.x using Authorization Code Flow (w/ PKCE) to authorize users to call a protected Web API

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

This sample demonstrates a Vanilla JavaScript single-page application that lets users authenticate against [Azure Active Directory B2C](https://azure.microsoft.com/services/active-directory/external-identities/b2c/) using the [Microsoft Authentication Library for JavaScript \(MSAL\.js\)](https://github.com/AzureAD/microsoft-authentication-library-for-js) and authorize them to call a web API that is also protected by **Azure AD B2C**. In doing so, it also illustrates various authorization and B2C concepts, such as [Access Tokens](https://docs.microsoft.com/azure/active-directory/develop/access-tokens), [Refresh Tokens](https://docs.microsoft.com/azure/active-directory-b2c/tokens-overview#token-types), [Token Lifetimes and Configuration](https://docs.microsoft.com/azure/active-directory-b2c/tokens-overview#configuration), [Authorization Code Grant](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow), [Dynamic Scopes and Incremental Consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent), **silent requests** and more.

![Overview](./ReadmeFiles/topology.png)

## Scenario

1. The client application uses the **MSAL.js** to obtain an **Access Token** from **Azure AD B2C**.
2. The **Access Token** is used as a **bearer** to *authorize* the user to call a protected web API.

## Contents

| File/folder           | Description                                |
|-----------------------|--------------------------------------------|
| `App/`                | Contains sample source code.               |
| `App/authPopup.js`    | Main authentication logic resides here (using Popup flow). |
| `App/authRedirect.js` | Use this instead of `authPopup.js` for authentication with redirect flow. |
| `App/authConfig.js`   | Contains configuration parameters for the sample. |
| `App/policies.js`     | Contains B2C custom policies and user-flows.  |
| `App/ui.js`           | Contains UI logic.                         |
| `server.js`           | Simple Node server to `index.html`.        |
| `ReadmeFiles/`        | Contains illustrations for README and etc. |
| `CHANGELOG.md`        | List of changes to the sample.             |
| `CONTRIBUTING.md`     | Guidelines for contributing to the sample. |
| `LICENSE`             | The license for the sample.                |

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) must be installed to run this sample.
- A modern web browser. This sample uses **ES6** conventions and will not run on **Internet Explorer**.
- [Visual Studio Code](https://code.visualstudio.com/download) is recommended for running and editing this sample.
- [VS Code Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension is recommended for interacting with Azure through VS Code Interface.
- An Azure Active Directory (Azure AD) tenant. For more information on how to get an Azure AD tenant, see: [How to get an Azure AD tenant](https://azure.microsoft.com/documentation/articles/active-directory-howto-tenant/)
- A user account in your Azure AD tenant.

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

:warning: This sample comes with a pre-registered application for testing purposes. If you would like to use your own **Azure AD B2C** tenant and application, follow the steps below to register and configure the applications in the **Azure Portal**. Otherwise, continue with the steps for [Running the sample](#running-the-sample).

### Choose the Azure AD B2C tenant where you want to create your applications

As a first step you'll need to:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. If your account is present in more than one Azure AD B2C tenant, select your profile at the top right corner in the menu on top of the page, and then **switch directory** to change your portal session to the desired Azure AD B2C tenant.

If you don't have an Azure AD B2C tenant yet, please see: [Tutorial: Create an Azure Active Directory B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant).

#### Register the app (ms-identity-b2c-javascript-callapi)

1. Navigate to the Microsoft identity platform for developers [App registrations](https://go.microsoft.com/fwlink/?linkid=2083908) page.
1. Select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
   - In the **Name** section, enter a meaningful application name that will be displayed to users of the app, for example `ms-identity-b2c-javascript-callapi`.
   - Under **Supported account types**, select **Accounts in any organizational directory or any identity provider. For authenticating users with Azure AD B2C**.
   - In the **Redirect URI (optional)** section, select **Single-Page Application** in the combo-box and enter the following redirect URI: `http://localhost:6420/`.
1. Select **Register** to create the application.
1. In the app's registration screen, find and note the **Application (client) ID**. You use this value in your app's configuration file(s) later in your code.
1. Select **Save** to save your changes.

### Create User Flows and Custom Policies

Please refer to: [Tutorial: Create user flows in Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-user-flows)

### Add External Identity Providers

Please refer to: [Tutorial: Add identity providers to your applications in Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-add-identity-providers)

#### Configure the app (ms-identity-b2c-javascript-callapi) to use your app registration

Open the project in your IDE (like Visual Studio or Visual Studio Code) to configure the code.

> In the steps below, "ClientID" is the same as "Application ID" or "AppId".

1. Open the `App\authConfig.js` file.
1. Find the key `clientId` and replace the existing value with the application ID (clientId) of the `ms-identity-b2c-javascript-callapi` application copied from the Azure portal.
1. Find the key `redirectUri` and replace the existing value with the base address of the ms-identity-b2c-javascript-callapi project (by default `http://localhost:6420`).
1. Find the key `postLogoutRedirectUri` and replace the existing value with the base address of the ms-identity-b2c-javascript-callapi project and the **signout** page that the app will redirect to e.g. `http://localhost:6420/signout`.

1. Open the `App\policies.js` file.
1. Find the key `names` and populate it with your policy names e.g. `signUpSignIn`.
1. Find the key `authorities` and populate it with your policy authority strings e.g. `https://<your-tenant-name>.b2clogin.com/<your-tenant-name>.onmicrosoft.com/b2c_1_susi`.
1. Find the key `authorityDomain` and populate it with the domain portion of your authority string e.g. `<your-tenant-name>.b2clogin.com`.

## Running the sample

```console
    cd ms-identity-b2c-javascript-callapi
    npm start
```

## Explore the sample

1. Open your browser and navigate to `http://localhost:6420`.
1. Click on the **sign-in** button on the top right corner.

![Screenshot](./ReadmeFiles/screenshot.png)

> :information_source: Did the sample not work for you as expected? Then please reach out to us using the [GitHub Issues](../../../../issues) page.

## About the code

### Acquire a Token

### Dynamic Scopes and Incremental Consent

### Access Token validation

### Refresh Tokens and token lifetimes

## Deployment

There is one single-page application in this sample. To deploy it to **Azure Storage**, you'll need to:

- create an Azure Storage blob
- build your project and upload it
- update config files with website coordinates

> :information_source: If you would like to use **VS Code Azure Tools** extension for deployment, [watch the tutorial](https://docs.microsoft.com/azure/developer/javascript/tutorial-vscode-static-website-node-01) offered by Microsoft Docs.

### Build and upload the `ms-identity-b2c-javascript-callapi` to an Azure Storage blob

Build your project to get a distributable files folder, where your built `html`, `css` and `javascript` files will be generated. Then follow the steps below:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Locate your storage account and display the account overview.
1. Select **Static website** to display the configuration page for static websites.
1. Select **Enabled** to enable static website hosting for the storage account.
1. In the **Index document name** field, specify a default index page (For example: `index.html`).
1. The default **index page** is displayed when a user navigates to the root of your static website.
1. Click **Save**. The Azure portal now displays your static website endpoint.
1. Next, select **Storage Explorer**.
1. Expand the **BLOB CONTAINERS** node, and then select the `$web` container.
1. Choose the **Upload** button to upload files.
1. If you intend for the browser to display the contents of file, make sure that the content type of that file is set to `text/html`.
1. In the pane that appears beside the **account overview page** of your storage account, select **Static Website**. The URL of your site appears in the **Primary endpoint field**.
1. Update your `App\authConfig.js` with the **Primary endpoint field** as your new **Redirect URI**. In the next section, you will register this URI on the **Azure Portal**.

### Update the Azure AD app registration for `ms-identity-b2c-javascript-callapi`

1. Navigate back to to the [Azure portal](https://portal.azure.com).
1. In the left-hand navigation pane, select the **Azure AD B2C** service, and then select **App registrations**.
1. In the resulting screen, select the `ms-identity-b2c-javascript-callapi` application.
1. From the *Branding* menu, update the **Home page URL**, to the address of your service, for example [https://contoso.azurewebsites.net](https://ms-identity-b2c-javascript-callapi-contoso.azurewebsites.net). Save the configuration.
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
