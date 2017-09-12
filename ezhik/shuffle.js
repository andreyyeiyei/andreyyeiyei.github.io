
var tiles = [0,1,2,3,4,5,6,7,8];
var hiddenID = 8;

shuffleTiles(1000);
pasteTilesInHTML();

console.log(tiles);

// Проверка, может ли игрок пойти (поменять соседние тайлы)

function pasteTilesInHTML () {
    var content = "";
    for (var i = 0; i < tiles.length; i++) {
        content +=
            "<button id=\"" + i + "\" onclick=\"step(this)\" class=\"tile tile-bg\"><img src=\"../ezh/" + (tiles[i] + 1) + ".jpg\"></button>\n";
    }
    console.log(content);
    document.getElementById('ezh-border-in').innerHTML = content; // Меняем содержимое ezh-border-in
}

function shuffleTiles (count) {
    var step = 0;

    while (step < count) {
        var tileKey = Math.floor(Math.random() * tiles.length); // random key in array

        if (isCanBeStep(tileKey, hiddenID)) {
            // Меняем значения соседних тайлов

            // console.log([tiles[tileKey], tiles[hiddenID]]);
            var tmp = tiles[tileKey];
            tiles[tileKey] = tiles[hiddenID];
            tiles[hiddenID] = tmp;
            // console.log([tiles[tileKey], tiles[hiddenID]]);

            // "Перемещаем скрытность" тайла
            hiddenID = tileKey;

            step++;
        }
    }
}

function isCanBeStep (id) {
    var array = [[1,3],[0,4,2],[1,5],[0,4,6],[1,3,5,7],[2,4,8],[3,7],[4,6,8],[5,7]];
    return array[id].indexOf(hiddenID) !== -1;
}
