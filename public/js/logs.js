getData();

async function getData() {
  const response = await fetch('http://back-end-service:9000/api');
  const data = await response.json();

  for (item of data) {
    const logDiv = document.getElementById('log_div');
    const root = document.createElement('p');
    root.setAttribute('class', 'logs');
    const mood = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');
    const button = document.createElement('button');
    button.id = "delete";
    button.textContent = "Delete";

    mood.textContent = `Status: ${item.mood}`;
    // geo.textContent = `${item.lat}°, ${item.lon}°`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = item.image64;
    image.alt = 'Dan Shiffman making silly faces.';

    button.addEventListener('click', () => {
      deletePost(item._id);
      // Call the deletePost function passing the post ID
    });

    root.append(mood, date, image, button);
    logDiv.append(root);
  }
  console.log(data);
}

function deletePost(postId) {
  fetch(`http://back-end-service:9000/api/${postId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        // Post deleted successfully, perform any necessary UI updates
        console.log(`Post with ID ${postId} deleted.`);
        location.reload();
      } else {
        // Error occurred while deleting the post, handle the error
        console.error(`Error deleting post with ID ${postId}.`);
      }
    })
    .catch(error => {
      // Error occurred while making the request, handle the error
      console.error(`Error deleting post with ID ${postId}.`, error);
    });
}
