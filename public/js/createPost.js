async function createPost(event) {
    event.preventDefault();
    const heading = document.querySelector('#postHeading').value;
    const content = document.querySelector("#postContent").value;

    const res = await fetch('/api/posts/create', {
        method: 'POST',
        body: JSON.stringify({ heading, content }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log(res.json())
        alert(res.json())
    }
};

document.querySelector('.postForm').addEventListener('submit', createPost);