setViewport();

// Устаналиваем метатег Viewport
function setViewport() {
    var meta = document.createElement('meta');
    meta.name = "viewport";
    var vp_width =  Math.max(screen.width, screen.height)/1000;
    meta.content = "width=device-width, initial-scale=" + vp_width;

    document.getElementsByTagName('head')[0].appendChild(meta);
}