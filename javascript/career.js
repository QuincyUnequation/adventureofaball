function switchcareertag(index) {
    $('#careerwindow article.current-career').addClass('hide');
    $('#careerwindow article.current-career').rmClass('current-career');
    var target;
    switch (index) {
        case 1 :
            target = $('#careerwindow article#noobs');
            break;
        case 2 :
            target = $('#careerwindow article#generals');
            break;
        case 3 :
            target = $('#careerwindow article#lords');
            break;
        case 4 :
            target = $('#careerwindow article#recallers');
            break;
        case 5 :
            target = $('#careerwindow article#samurais');
            break;
        default :
            target = $('#careerwindow article#allheros');
            break;
    }
    target.addClass('current-career');
    target.rmClass('off');
    target.rmClass('hide');
}
