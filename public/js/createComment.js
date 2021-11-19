async function createComment(event) {
    event.preventDefault();
    const content = document.querySelector("#commentContent").value;
    const postId = document.querySelector("#PostId").value;
    const res = await fetch('/api/comments/create', {
        method: 'POST',
        body: JSON.stringify({ postId, content }),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(res)
    if (res.ok) {
        document.location.replace(`/onePost/${postId}`);
    } else {
        console.log(res.json())
        alert("failed to create comment")
    }
};

document.querySelector('.postForm').addEventListener('submit', createComment);