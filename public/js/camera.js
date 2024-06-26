function setup() {
    var startVideo = document.getElementById('startvideo');
    var stopVideo = document.getElementById('stopvideo');
    var run = "no"
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const mood = document.getElementById('mood').value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const data = { mood, image64 };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('https://k8-backend.shahsportfolio.online/api', options);
        const json = await response.json();
        console.log(json);
        alert("Post Submitted!");
    });
    startVideo.addEventListener('click', function () {
        if (run === "yes") {
            alert("Camera Already Running!");
        } else {
            noCanvas();
            video = createCapture(VIDEO);
            video.parent("cameraid");
            run = "yes";
        }
    });
    stopVideo.addEventListener("click", function () {
        alert("Camera will be stopped........");
        video.stop();
        video.remove();
        run = "no";
    });
}