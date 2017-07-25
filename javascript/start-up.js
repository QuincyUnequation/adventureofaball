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
    $('#allheros').rmClass('hide');
    $('#allheros').addClass('current-career')
    $('#start-up h1').addClass('off');
    $('#start-up button.button').addClass('off');
    $('#heroselect').addClass('off');
}

function showhelp() {
    $('#helpwindow').rmClass('off');
    $('#helpwindow .menubar').rmClass('off');
    $('#helpwindow .menubar').rmClass('hide');
    $('#start-up h1').addClass('off');
    $('#start-up button.button').addClass('off');
    $('#heroselect').addClass('off')
}
