document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(sessionStorage.getItem('users')) || [];
    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        const redirectTo = sessionStorage.getItem('redirectTo');
        if (redirectTo) {
            window.location.href = redirectTo;
            sessionStorage.removeItem('redirectTo');
        } else {
            window.location.href = 'index.html';
        }
    } else {
        alert('Invalid login credentials');
    }
});
