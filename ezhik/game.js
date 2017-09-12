console.log(hiddenID); // get in shuffle.js

var buttons = getElements('ezh-border-in', 'button');
var images = getElements('ezh-border-in', 'img');
hiddenButtonOfID(hiddenID);

// Ход в игре
function step(selectButton) {
    var id = +selectButton.id; // convert to numeric

    if (!isCanBeStep(id)) {
        return;
    }

    for (var i = 0; i < buttons.length; i++) {
        if (id === i) {
            var tmp = images[hiddenID].src;
            images[hiddenID].src = images[id].src;

            hideAnimated(buttons[id], function () {
                // После выполнения анимации, выполняем следующий код
                images[id].src = tmp;
                hiddenID = id;
                isWin();
            });

        } else {
            if (buttons[i].style.visibility === 'hidden') {
                showAnimated(buttons[i]);
            }
        }
    }
}

// isCanBeStep - shuffle.js

// Показать кнопку по ID
function showButtonOfID (id) {
    buttons[id].style.visibility = 'visible';
}

// Скрывает или раскрывает кнопку по ID
function hiddenButtonOfID (id) {
    buttons[id].style.visibility = 'hidden';
}

// Проверка на победу
function isWin () {
    for (var i = 0; i < images.length; i++) {
        var filename = getFilenameOfPath(images[i].src);

        if (i !== filename-1) {
            return;
        }
    }

    // ending game..
    console.log("win");
    hiddenID = -1;
    showAnimated(buttons[8]);
    alert("Картинка собрана!");
}

// Получаем имя файла без расширения
function getFilenameOfPath (path) {
    var filename = path.replace(/^.*[\\\/]/, '');
    var extension = '.' + filename.split('.').pop();

    return filename.replace(extension, '');
}

// Получаем дочерние элементы определенного тега от divID
function getElements (divID, tag) {
    var div = document.getElementById(divID);
    return div.getElementsByTagName(tag);
}

// ------------------------------------------------------------------------

function showAnimated (elem, f) {
    animated(elem, true, f);
}

function hideAnimated(elem, f) {
    animated(elem, false, f);
}

function animated (elem, show, f) {
    var delay = 2;

    var step = show ? 5 : -5;
    var end = show ? 100 : 0;
    var count = show ? 0 : 100;
    var visible = show ? 'visible' : 'hidden';

    elem.style.visibility = 'visible';
    elem.style.opacity = show ? 0 : 100;

    function loop() {
        if (count === end) {
            elem.style.visibility = visible;
            elem.style.opacity = 100;

            if (f) {f();}

            return;
        }

        count += step;
        elem.style.opacity = count / 100;

        setTimeout(loop, delay);
    }

    loop();
}
