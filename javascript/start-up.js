function startgame() {
    if (!$('#start-up button.button').hasClass('off')) {
        console.log('reach');
        init();
    }
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
    if (sys.heroselect >  1)
        $('#herohpcd #heroablity').rmClass('off');
    else
        $('#herohpcd #heroablity').addClass('off');
}

function prevhero() {
    --sys.heroselect;
    sys.heroselect += 4;
    sys.heroselect %= 4;
    while (sys.locked()) {
        --sys.heroselect;
        sys.heroselect += 4;
        sys.heroselect %= 4;
    }
    updatetitle();
}

function nexthero() {
    ++sys.heroselect;
    sys.heroselect += 4;
    sys.heroselect %= 4;
    while (sys.locked()) {
        ++sys.heroselect;
        sys.heroselect += 4;
        sys.heroselect %= 4;
    }
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
            /*target.innerHTML = 'A Recaller';
            break;
        case 4 :*/
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
    $('#gamezone').addClass('off');
    $('#herohpcd').rmClass('on');
    $('#herohpcd').addClass('hide');
    $('#ingamepts').rmClass('on');
    $('#ingamepts').addClass('off');
}

function resumegame() {
    if (!sys.onpausecntback && $('#pausepop').hasClass('on'))
        sys.initpausecntback(3);
}

function quitgame() {
    hidepause();
    my_scene.endgame(true);
    backtomenu();
}

function showpause() {
    $('#pausecb').get(0).innerHTML = 'Current Point : ' + my_scene.score.toString();
    $('#pausepop').rmClass('off');
    $('#pausepop').addClass('on');
}

function hidepause() {
    $('#pausepop').rmClass('on');
    $('#pausepop').addClass('hide');
    sys.shutpause();
}

function restart() {
    if ($('#finpop').hasClass('on'))
        init();
    hidefin();
}

function endgame() {
    hidefin();
    backtomenu();
}

function hidefin() {
    $('#finpop').rmClass('on');
    $('#finpop').addClass('hide');
    sys.shutfin();
}

function showfin() {
    $('#fincb').get(0).innerHTML = 'Final Point : ' + my_scene.score.toString();
    $('#finpop').rmClass('off');
    $('#finpop').addClass('on');
}
