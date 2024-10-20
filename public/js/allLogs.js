async function getData(backend) {
  const response = await fetch(`http://${backend}/allPosts/`);
  const data = await response.json();

  for (item of data) {
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
    image.src = item.image64;
    image.alt = 'Alt text for the image';

    root.append(mood, date, image);
    logDiv.append(root);

    button.dataset.id = item._id;
  }
  console.log(data);
}
