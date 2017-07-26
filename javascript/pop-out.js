
function hidecareer() {
    $('#careerwindow .menubar').addClass('hide');
    $('#careerwindow').addClass('off');
    $('#careerwindow article.current-career').addClass('hide');
    $('#careerwindow article.current-career').rmClass('current-career');
    backtomenu();
}

function hidehelp() {
    $('#helpwindow .menubar').addClass('hide');
    $('#helpwindow').addClass('off');
    backtomenu();
}
