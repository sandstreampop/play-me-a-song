const canvas = document.getElementById("canvas");
addEventListener("resize", resizeCanvas, false);
function resizeCanvas() {
    if (!isCanvas(canvas)) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw(canvas);
}
resizeCanvas();
function draw(canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    ctx.fillStyle = "black";
    ctx.fillRect(10, 10, 150, 100);
}
function isCanvas(maybeCanvas) {
    if (maybeCanvas === undefined) return false;
    return typeof maybeCanvas.getContext === "function";
}
const constraints = {
    video: true
};
const video = document.querySelector("video");
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    if (video) video.srcObject = stream;
    stream.getVideoTracks()[0];
});

