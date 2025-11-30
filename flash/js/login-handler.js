// Login Handler
function handleLogin(email, password) {
    if (email && password) {
        localStorage.setItem('user', JSON.stringify({
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        }));
        window.location.href = '../index.html';
        return true;
    }
    return false;
}

// Test: localStorage.setItem('user', JSON.stringify({email: 'john.doe@example.com', name: 'John Doe'}));
