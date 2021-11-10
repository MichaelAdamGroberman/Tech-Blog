const regFormHandler = async (event) => {
    // The below statement prevents the event from triggering the default event handler
    event.preventDefault();

    const username = document.querySelector('#Username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#passwordConfirm').value.trim();

    if (username && confirmPassword && password) {

        if (confirmPassword != password) {
            alert("passwords don't match")
            return;
        };

        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create user', response.json());
        }
    }
};

document
    .querySelector('.loginForm').addEventListener('submit', handleReg);

