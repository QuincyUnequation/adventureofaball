var sys = new function() {
    this.msgtopop = new Array();
    this.readytopopmsg = true;
    this.msgdelaycnter;
    this.msgdelay = 20;
    this.poptag;
    this.heroselect = 0;
    this.pausecnter;
    this.onpause = false;
    this.pausedelay = 10;
    this.onfin = false;
    this.fincnter;
    this.findelay = 10;
    this.onpausecntback = false;
    this.pausecntbackcnter;
    this.careerdata;
    this.hero = function(index) {
        this.careerdata = filex.load();
        switch (index) {
            case 0 :
                return this.careerdata.noob;
            case 1 :
                return this.careerdata.general;
            case 2 :
                return this.careerdata.lord;
            case 3 :
                return this.careerdata.samurai;
        }
    }
    this.locked = function() {
        if (this.hero(this.heroselect).lv > -1)
            return true;
        return false;
    }
    this.lvl = function(x) {
        if (x > -1)
            return '[Lv.' + x.toString() + ']';
        else
            return '[Locked]';
    }
    this.dis = function() {
        return this.hero(0).dis + this.hero(1).dis + this.hero(2).dis + this.hero(3).dis;
    }
    this.dust = function() {
        return this.hero(0).dust + this.hero(1).dust + this.hero(2).dust + this.hero(3).dust;
    }
    this.pts = function() {
        return this.hero(0).pts + this.hero(1).pts + this.hero(2).pts + this.hero(3).pts;
    }
    this.hplost = function() {
        return this.hero(0).hplost + this.hero(1).hplost + this.hero(2).hplost + this.hero(3).hplost;
    }
    this.xp = function(index, current) { return current.toString() + '/' + (index * Math.pow(2, index)).toString(); }
    this.updatecareer = function() {
        this.careerdata = filex.load();
        $('#allheros .noobstatus .statusspan').get(0).innerHTML = this.lvl(this.hero(0).lv);
        $('#noobs .noobstatus .statusspan').get(0).innerHTML = this.lvl(this.hero(0).lv);
        $('#noobs .noobstatus .progressspan').get(0).innerHTML = this.xp(this.hero(0).lv, this.hero(0).dust);
        $('#noobs #noobdust .cardcontent').get(0).innerHTML = this.hero(0).dust.toString();
        $('#noobs #noobpts .cardcontent').get(0).innerHTML = this.hero(0).pts.toString();
        $('#noobs #noobhplost .cardcontent').get(0).innerHTML = this.hero(0).hplost.toString();
        $('#allheros .generalstatus .statusspan').get(0).innerHTML = this.lvl(this.hero(1).lv);
        $('#generals .generalstatus .statusspan').get(0).innerHTML = this.lvl(this.hero(1).lv);
        $('#generals .generalstatus .progressspan').get(0).innerHTML = this.xp(this.hero(1).lv, this.hero(1).dust);
        $('#generals #generaldust .cardcontent').get(0).innerHTML = this.hero(1).dust.toString();
        $('#generals #generalpts .cardcontent').get(0).innerHTML = this.hero(1).pts.toString();
        $('#generals #generalhplost .cardcontent').get(0).innerHTML = this.hero(1).hplost.toString();
        $('#allheros .lordstatus .statusspan').get(0).innerHTML = this.lvl(this.hero(2).lv);
        $('#lords .lordstatus .statusspan').get(0).innerHTML = this.lvl(this.hero(2).lv);
        $('#lords .lordstatus .progressspan').get(0).innerHTML = this.xp(this.hero(2).lv, this.hero(2).dust);
        $('#lords #lorddust .cardcontent').get(0).innerHTML = this.hero(2).dust.toString();
        $('#lords #lordpts .cardcontent').get(0).innerHTML = this.hero(2).pts.toString();
        $('#lords #lordhplost .cardcontent').get(0).innerHTML = this.hero(2).hplost.toString();
        $('#allheros .samuraistatus .statusspan').get(0).innerHTML = this.lvl(this.hero(3).lv);
        $('#samurais .samuraistatus .statusspan').get(0).innerHTML = this.lvl(this.hero(3).lv);
        $('#samurais .samuraistatus .progressspan').get(0).innerHTML = this.xp(this.hero(3).lv, this.hero(3).dust);
        $('#samurais #samuraidust .cardcontent').get(0).innerHTML = this.hero(3).dust.toString();
        $('#samurais #samuraipts .cardcontent').get(0).innerHTML = this.hero(3).pts.toString();
        $('#samurais #samuraihplost .cardcontent').get(0).innerHTML = this.hero(3).hplost.toString();
        $('#allheros #alldis .cardcontent').get(0).innerHTML = this.dis().toString();
        $('#allheros #alldust .cardcontent').get(0).innerHTML = this.dust().toString();
        $('#allheros #allpts .cardcontent').get(0).innerHTML = this.pts().toString();
        $('#allheros #allhplost .cardcontent').get(0).innerHTML = this.hplost().toString();
    }
    setInterval(systimer, 100);
    this.addmsg = function(content) {
        if (typeof content == 'string')
            this.msgtopop.push(content);
    }
    this.updatecd = function(cd) {
        var target = $('#herohpcd span#heroablity span').get(0);
        if (cd == 0)
            target.innerHTML = 'ready';
        else
            target.innerHTML = 'in cooldown(' + cd.toString() + 's)';
    }
    this.updatehp = function(cur, tot) { $('#herohpcd #herohp #hpinfo').get(0).innerHTML = cur.toString() +'/' + tot.toString(); }
    this.settname = function(name) { $('#herohpcd #herohp #nameinfo').get(0).innerHTML = name + '|'; }
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
    this.shutpause = function() {
        this.onpause = true;
        this.pausecnter = 0;
    }
    this.shutfin = function() {
        this.onfin = true;
        this.fincnter = 0;
    }
    this.cntpause = function() {
        if (this.onpause) {
            ++this.pausecnter;
            if (this.pausecnter == this.pausedelay) {
                $('#pausepop').rmClass('hide');
                $('#pausepop').addClass('off');
                this.onpause = false;
            }
        }
    }
    this.initpausecntback = function(delay) {
        this.pausecntbackcnter = delay * 10;
        this.onpausecntback = true;
    }
    this.pausecntback = function() {
        if (this.onpausecntback) {
            if (this.pausecntbackcnter % 10 == 0) {
                $('#pausepop #pausecb').get(0).innerHTML = (this.pausecntbackcnter / 10).toString();
            }
            if (this.pausecntbackcnter == 8) {
                this.onpausecntback = false;
                hidepause();
                my_timer = setInterval(timer, 16);
            }
            --this.pausecntbackcnter;
        }
    }
    this.cntfin = function() {
        if (this.onfin) {
            ++this.fincnter;
            if (this.fincnter == this.findelay) {
                $('#finpop').rmClass('hide');
                $("#finpop").addClass('off');
                this.onfin = false;
            }
        }
    }
}();

function systimer() {
    sys.popmsg();
    sys.cntpause();
    sys.pausecntback();
    sys.cntfin();
}

/*
function msgtest(x) {
    for (var i = 0; i < x; ++i)
        sys.addmsg(i.toString());
}*/
