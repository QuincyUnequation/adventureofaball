var sys = new function() {
    this.msgtopop = new Array();
    this.readytopopmsg = true;
    this.msgdelaycnter;
    this.msgdelay = 20;
    this.poptag;
    setInterval(systimer, 100);
    this.addmsg = function(content) {
        if (typeof content == 'string')
            this.msgtopop.push(content);
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
