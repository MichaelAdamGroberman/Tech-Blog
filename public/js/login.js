

const handlelog = async (event) => {
    // The below statement prevents the event from triggering the default event handler
    event.preventDefault();
    const username = document.querySelector("#Username").value.trim();
    const password = document.querySelector("#password").value.trim();
    if (password && username) {
        const res = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            console.log("ok")
            document.location.replace('/dashboard')
        }
        else {
            console.log(res.json())
            alert("incorrect password or username")
        }
    }

}


document.querySelector('.loginForm').addEventListener('submit', handlelog);