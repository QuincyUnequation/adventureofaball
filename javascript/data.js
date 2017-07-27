lordvar filex = new function(e) {
    this.data;
    this.env = e;
    this.load = function() {
        var raw = unescape(e.cookie);
        if (!/^aoab/.test())
            this.data = '{"noob" : {"lv" : 0, "pro" : 0, "dis" : 0, "dust" : 0, "pts" : 0, "hplost" : 0}, ' +
            '"general" : {"lv" : "-1", "pro" : 0, "dis" : 0, "dust" : 0, "pts" : 0, "hplost" : 0, "restore" : 0}, ' +
            '"lord" : {"lv" : "-1", "pro" : 0, "dis" : 0, "dust" : 0, "pts" : 0, "hplost" : 0, "bonus" : 0}, ' +
            '"samurai" : {"lv" : "-1", "pro" : 0, "dis" : 0, "dust" : 0, "pts" : 0, "hplost" : 0, "wall" : 0}}';
        else {
            this.data = raw.replace(/^aoab/, '');
        }
        return JSON.parse(this.data);
    }
    this.store = function(obj) {
        this.env.cookie = 'aoab' + escape(JSON.stringify(obj));
    }
    this.updater = function() {
        var herotype = arguments[0];
        switch (herotype) {
            case 1 :
                generalupdate(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                break;
            case 2 :
                lordupdate(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                break;
            case 3 :
                samuraiupdate(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                break;
            default :
                noobupdate(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                break;
        }
    }
    this.generalupdate = function(lvl, prog, adddis, addpts, adddust, addhplost, addrestore) {
        this.load();
        var obj = JSON.parse(this.data);
        obj.general.lv = lvl;
        obj.general.pro = prog;
        obj.general.dis += adddis;
        obj.general.pts += addpts;
        obj.general.dust += adddust;
        obj.general.hplost += addhplost;
        ojb.general.restore += addrestore;
        this.store(obj);
    }
    this.lordupdate = function(lvl, prog, adddis, addpts, adddust, addhplost, addbonus) {
        this.load();
        var obj = JSON.parse(this.data);
        obj.lord.lv = lvl;
        obj.lord.pro = prog;
        obj.lord.dis += adddis;
        obj.lord.pts += addpts;
        obj.lord.dust += adddust;
        obj.lord.hplost += addhplost;
        obj.lord.bonus += addbonus;
        this.store(obj);
    }
    this.samuraiupdate = function(lvl, prog, adddis, addpts, adddust, addhplost, addwall) {
        this.load();
        var obj = JSON.parse(this.data);
        obj.samurai.lv = lvl;
        obj.samurai.pro = prog;
        obj.samurai.dis += adddis;
        obj.samurai.pts += addpts;
        obj.samurai.dust += adddust;
        obj.samurai.hplost += addhplost;
        obj.samurai.wall += addwall;
        this.store(obj);
    }
    this.noobupdate = function(lvl, prog, adddis, addpts, adddust, addhplost) {
        this.load();
        var obj = JSON.parse(this.data);
        obj.noob.lv = lvl;
        obj.noob.pro = prog;
        obj.noob.dis += adddis;
        obj.noob.pts += addpts;
        obj.noob.dust += adddust;
        obj.noob.hplost += addhplost;
        this.store(obj);
    }
}(document);
