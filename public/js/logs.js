async function getData(userId, backend) {
  const idUser = userId;
  const backEnd = backend;
  const url = `${backEnd}/api/${idUser}`
  const response = await fetch(url);
  const data = await response.json();
  const userDataArray = Array.isArray(data) ? data : [data];

  const userData = userDataArray[0].data
  
  if (userData) {
    for (const item of userData) {
      const logDiv = document.getElementById('log_div');
      const root = document.createElement('p');
      const mood = document.createElement('div');
      const date = document.createElement('div');
      const image = document.createElement('img');
      const button = document.createElement('button');

      button.id = "delete";
      button.textContent = "Delete";
      root.setAttribute('class', 'logs');
      mood.textContent = `Status: ${item.mood}`;
      // geo.textContent = `${item.lat}°, ${item.lon}°`;
      const dateString = new Date(item.timestamp).toLocaleString();
      date.textContent = dateString;
      image.src = `data:image/png;base64,${item.image64.split(",")[1] || item.image64}`;
      image.alt = 'Alt text for the image';

      root.append(mood, date, image, button);
      logDiv.append(root);

      button.dataset.id = item._id;

      button.addEventListener('click', () => {
        const postId = button.dataset.id
        deletePost(postId, backEnd);
        // Call the deletePost function passing the post ID
      });
    }
  }
}
function deletePost(postId, backEnd) {
  const idPost = postId;
  const back = backEnd;  
  fetch(`${back}/api/${idPost}`, {
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