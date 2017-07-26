function startgame() {
    $('#start-up h1').addClass('off');
    $('#start-up button.button').addClass('off');
    $('#heroselect').addClass('off');
    $('.herobar').rmClass('off');
    $('.herobar').rmClass('hide');
    $('.herobar').addClass('on');
    $('.ptsgain').rmClass('off');
    $('.ptsgain').rmClass('hide');
    $('.ptsgain').addClass('on');
    $('#gamezone').rmClass('off');
    if (sys.heroselect >  2)
        $('#herohpcd #heroablity').rmClass('off');
    else
        $('#herohpcd #heroablity').addClass('off');
    init();
}

function prevhero() {
    --sys.heroselect;
    sys.heroselect += 5;
    sys.heroselect %= 5;
    updatehero();
}

function nexthero() {
    ++sys.heroselect;
    sys.heroselect += 5;
    sys.heroselect %= 5;
    updatehero();
}

function updatehero() {
    updatetitle();
}

function updatetitle() {
    var target = $('#start-up h1 span').get(0);
    switch (sys.heroselect) {
        case 1 :
            target.innerHTML = 'A General';
            break;
        case 2 :
            target.innerHTML = 'A Lord';
            break;
        case 3 :
            target.innerHTML = 'A Recaller';
            break;
        case 4 :
            target.innerHTML = 'A Samurai';
            break;
        default :
            target.innerHTML = 'A Ball';
    }
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

function backtomenu() {
    $('#heroselect').rmClass('off');
    $('#start-up h1').rmClass('off');
    $('#start-up button.button').rmClass('off');
}
