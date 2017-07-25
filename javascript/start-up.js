function startgame() {
    $('#start-up h1').addClass('off');
    $('#start-up button.button').addClass('off');
    $('#heroselect').addClass('off');
}

function showcareer() {
    $('#careerwindow').rmClass('off');
    $('#careerwindow .menubar').rmClass('off');
    $('#careerwindow .menubar').rmClass('hide');
    $('#careerwindow article').addClass('off');
    $('#allheros').rmClass('off');
    $('#allheros').rmClass('hide');
    $('#allheros').addClass('current-career')
    $('#start-up h1').addClass('off');
    $('#start-up button.button').addClass('off');
    $('#heroselect').addClass('off');
    $('#careerwindow .contentwindow').rmClass('off');
}

function showhelp() {
    $('#helpwindow').rmClass('off');
    $('#helpwindow .menubar').rmClass('off');
    $('#helpwindow .menubar').rmClass('hide');
    $('#helpwindow .contentwindow').rmClass('off');
    $('#start-up h1').addClass('off');
    $('#start-up button.button').addClass('off');
    $('#heroselect').addClass('off')
}
