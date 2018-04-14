function statusChangeCallback(response) {
  console.log('statusChangeCallback', response);

  if (response.status === 'connected') {
    axios.post('http://localhost:4000/user/fb-login', {}, {
      headers: {
        tokenFB: response.authResponse.accessToken
      }
    })
    .then(response => {
      console.log('Logged in', response)
      localStorage.setItem('token', response.data.token)
      window.location.href = "https://4a55af47.ngrok.io/main.html"
    })
    .catch(err => {
      console.log('Login FB failed', err)
    })

  } else {
    console.log('Not logged in')
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1366559306776878',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.12'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logout() {
  FB.logout(function(response) {
    // user is now logged out
    localStorage.removeItem('token')
    console.log('fb logout')
  });
}