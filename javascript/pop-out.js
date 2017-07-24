function hidepreference() {
    $('#preferencewindow .menubar').addClass('hide');
    $('#preferencewindow').addClass('off');
    $('#heroselect').rmClass('off');
    $('#start-up h1').rmClass('off');
    $('#start-up button.button').rmClass('off');
}

function hidecareer() {
    $('#careerwindow .menubar').addClass('hide');
    $('#careerwindow').addClass('off');
    $('#heroselect').rmClass('off');
    $('#start-up h1').rmClass('off');
    $('#start-up button.button').rmClass('off');
    $('#careerwindow article.current-career').addClass('hide');
    $('#careerwindow article.current-career').rmClass('current-career');
}

function hidehelp() {
    $('#helpwindow .menubar').addClass('hide');
    $('#helpwindow').addClass('off');
    $('#heroselect').rmClass('off');
    $('#start-up h1').rmClass('off');
    $('#start-up button.button').rmClass('off');
}
