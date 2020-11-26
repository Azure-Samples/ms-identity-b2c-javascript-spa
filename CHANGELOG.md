# CHANGELOG

## 11/23/2020

* Updated MSAL.js to 2.7.0
* Resolved access token null value issue.
* Resolved an issue due to accessToken field returning empty from B2C server. This is an interim solution.
* editProfile user-flow now forces user to sign-out after due to an issue with homeAccountId caching. This is an interim solution.
