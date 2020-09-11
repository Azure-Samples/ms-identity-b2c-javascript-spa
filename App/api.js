// helper function to access the resource with the token
function callApi(endpoint, token) {

    console.log(token);
    
    const headers = new Headers();
    const bearer = `Bearer ${token}`;
  
    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
      };
  
    fetch(endpoint, options)
      .then(response => response.json())
      .then(response => {

        if (response) {
          logMessage('Web API responded: ' + response.name);
        }
        
        return response;
      }).catch(error => {
        console.error(error);
      });
  }