console.log('This is my login');

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    if (!username && !password) {
      alert('Must have username & password')
      return
    }
    console.log(username)
    console.log(password)
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json',},
      body: JSON.stringify({username,password})
    })

      console.log(response)
      if (response.ok) {
        document.location.replace('/order');
      } else {
        alert('Failed to log in');
      }
    };

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
