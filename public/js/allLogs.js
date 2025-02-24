async function getData(backend) {
  const response = await fetch(`${backend}/allPosts/`);
  const data = await response.json();

  const userDataArray = Array.isArray(data) ? data : [data];

  const userData = userDataArray[0].data;
  console.log(userData);
  // console.log(userDataArray[0].message);

  for (item of userData) {
    const logDiv = document.getElementById('log_div');
    const root = document.createElement('p');
    const mood = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');
    const button = document.createElement('button');

    root.setAttribute('class', 'logs');
    mood.textContent = `Status: ${item.mood}`;
    // geo.textContent = `${item.lat}°, ${item.lon}°`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = `data:image/png;base64,${item.image64.split(",")[1] || item.image64}`;
    image.alt = 'Alt text for the image';

    root.append(mood, date, image);
    logDiv.append(root);

    button.dataset.id = item._id;
  }
  // console.log(data);
}
