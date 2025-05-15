const API_BASE = '/';
//const API_BASE = '/api/v2';


const HTTPClient = {
  get: (url) => {
    console.log("In HTTPclient - URL is " + url);
    return fetch(`${API_BASE}${url}`)
    .then(res => {
        if(res.ok) {

    console.log("In Fetch API returning data -->  "); 
          return res.json();
        }
        throw new Error('Network response was not ok123.');
      })
      .then(obj => {
        console.log(obj);
        return obj;
      })
      .catch(err => console.log(err));
  },
  post: (url, data) => {

  }
};




export default {
  getUserinfo: (userid) => {
    console.log("In apiclient.js - userinfo" + userid);
    return HTTPClient.get(`/userinfo`);
  },

  getUserHowls: (userid) => {
    console.log("In apiclient.js - Howls by user -->" + county);
    return HTTPClient.get(`/howls/${userid}` );
  },

  getFollowedHowls: (userid) => {
    console.log("In apiclient.js - Howls of followed user --> " + id);
    return HTTPClient.get(`/FollowedHowls/${userid}`);
  },
  
  getCounties: () => {
    console.log("In apiclient.js - getCounties");
    return HTTPClient.get('/counties');
  },

  getParksByCounty: (county) => {
    console.log("In apiclient.js - getParksByCounty -->" + county);
    return HTTPClient.get("/counties/" + county + "/parks");
  },

  getParkById: (id) => {
    console.log("In apiclient.js - parkById --> " + id);
    return HTTPClient.get(`/parks/${id}`);
  },
};
