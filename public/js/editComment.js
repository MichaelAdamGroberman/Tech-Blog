const commentId = document.querySelector("#Commentid").value;

async function updateComment(event) {
    event.preventDefault();
    const content = document.querySelector("#commentContent").value;
    const postId = document.querySelector("#postId").value;
    const res = await fetch('/api/comments/edit', {
        method: 'PUT',
        body: JSON.stringify({ commentId, content }),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(res)
    if (res.ok) {
        document.location.replace(`/onePost/${postId}`);
    } else {
        console.log(res.json())
        alert("failed to update comment")
    }
};

async function drop() {
    console.log(commentId)
    const res = await fetch(`/api/comments/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ commentId }),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(res)
    if (res.ok) {
        document.location.replace(`/`);
    } else {
        console.log(res.json())
        alert("failed to delete")
    }
};

document.querySelector('.postForm').addEventListener('submit', updateComment);
