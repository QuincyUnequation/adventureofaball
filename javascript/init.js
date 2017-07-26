var sys = new function() {
    this.msgtopop = new Array();
    this.readytopopmsg = true;
    this.msgdelaycnter;
    this.msgdelay = 20;
    this.poptag;
    this.heroselect = 0;
    setInterval(systimer, 100);
    this.addmsg = function(content) {
        if (typeof content == 'string')
            this.msgtopop.push(content);
    }
    this.updateallhero = function(dis, d, pts, hplost) {
        $('.card#alldis .cardcontent').get(0).innerHTML = dis.toString();
        $('.card#alldust .cardcontent').get(0).innerHTML = d.toString();
        $('.card#allpts .cardcontent').get(0).innerHTML = pts.toString();
        $('.card#allhplost .cardcontent').get(0).innerHTML = hplost.toString();
    }
    this.updatenoob = function(lv, collected, tocollect, d, pts, hplost) {
        $('#allheros .herointro.noobstatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#allheros .herointro.noobstatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#noobs .herointro.noobstatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#noobs .herointro.noobstatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#noobs .card#noobdust .cardcontent').get(0).innerHTML = d.toString();
        $('#noobs .card#noobpts .cardcontent').get(0).innerHTML = pts.toString();
        $('#noobs .card#noobhplost .cardcontent').get(0).innerHTML = hplost.toString();
    }
    this.updategeneral = function(lv, collected, tocollect, d, pts, hplost, hprestore) {
        $('#allheros .herointro.generalstatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#allheros .herointro.generalstatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#generals .herointro.generalstatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#generals .herointro.generalstatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#generals .card#generaldust .cardcontent').get(0).innerHTML = d.toString();
        $('#generals .card#generalpts .cardcontent').get(0).innerHTML = pts.toString();
        $('#generals .card#generalhplost .cardcontent').get(0).innerHTML = hplost.toString();
        $('#generals .card#generalhprestore .cardcontent').get(0).innerHTML = hprestore.toString();
    }
    this.updatelord = function(lv, collected, tocollect, d, pts, hplost, bpts) {
        $('#allheros .herointro.lordstatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#allheros .herointro.lordstatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#lords .herointro.lordstatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#lords .herointro.lordstatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#lords .card#lorddust .cardcontent').get(0).innerHTML = d.toString();
        $('#lords .card#lordpts .cardcontent').get(0).innerHTML = pts.toString();
        $('#lords .card#lordhplost .cardcontent').get(0).innerHTML = hplost.toString();
        $('#lords .card#lordbonuspts .cardcontent').get(0).innerHTML = bpts.toString();
    }
    this.updaterecaller = function(lv, collected, tocollect, d, pts, hplost, rcls) {
        $('#allheros .herointro.recallerstatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#allheros .herointro.recallerstatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#recallers .herointro.recallerstatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#recallers .herointro.recallerstatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#recallers .card#recallerdust .cardcontent').get(0).innerHTML = d.toString();
        $('#recallers .card#recallerpts .cardcontent').get(0).innerHTML = pts.toString();
        $('#recallers .card#recallerhplost .cardcontent').get(0).innerHTML = hplost.toString();
        $('#recallers .card#recallerrecalls .cardcontent').get(0).innerHTML = rcls.toString();
    }
    this.updatesamurai = function(lv, collected, tocollect, d, pts, hplost, walls) {
        $('#allheros .herointro.samuraistatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#allheros .herointro.samuraistatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#samurais .herointro.samuraistatus .statussapn').get(0).innerHTML = 'Lv.' + lv.toString();
        $('#samurais .herointro.samuraistatus .progresspan').get(0).innerHTML = collected.toString() + '/' + tocollect.toString();
        $('#samurais .card#samuraidust .cardcontent').get(0).innerHTML = d.toString();
        $('#samurais .card#samuraipts .cardcontent').get(0).innerHTML = pts.toString();
        $('#samurais .card#samuraihplost .cardcontent').get(0).innerHTML = hplost.toString();
        $('#samurais .card#samuraisamuraitama .cardcontent').get(0).innerHTML = walls.toString();
    }
    this.modpts = function(pts) { $('#ingamepts').get(0).innerHTML = pts.toString(); }
    this.popmsg = function() {
        if (this.readytopopmsg && (this.msgtopop.length > 0)) {
            this.readytopopmsg = false;
            $('#msg').get(0).innerHTML = this.msgtopop[this.msgtopop.length - 1];
            this.poptag = this.msgtopop.length - 1;
            $('#msg').rmClass('off');
            $('#msg').addClass('on');
            this.msgdelaycnter = 0;
        }
        else if (!this.readytopopmsg) {
            ++this.msgdelaycnter;
            if (this.msgdelaycnter == this.msgdelay) {
                $('#msg').rmClass('on');
                $('#msg').addClass('off');
                this.readytopopmsg = true;
                var tmp = this.msgtopop[this.msgtopop.length - 1];
                this.msgtopop[this.msgtopop.length - 1] = this.msgtopop[this.poptag];
                this.msgtopop[this.poptag] = tmp;
                this.msgtopop.pop();
            }
        }
    }
}();

function systimer() {
    sys.popmsg();
}

/*
function msgtest(x) {
    for (var i = 0; i < x; ++i)
        sys.addmsg(i.toString());
}*/
