var eps = 1e-10;
var my_timer;
var first = 1;
var light;
var my_scene = {
	items : [],
	map : [],
	map_box : [],
	map_type : [],
	plane : [],
	hero_speed : 0.1,
	timer_count : 0,
	score : 0,
	gravity : 0.0016,
	hero_speed_z : 0,
	hero_speed_y : 0,
	side_moving : 0,
	jumping : 0,
	rolling : 0,
	hp_max : 100,
	hp : 100,
	damaged : 0,
	skill : 0,
	cd : 0,
	cd_max : [0, 0, 240, 600],
	recovering : 0,
	first_add : 0,
	color : [0xffff00, 0x00ff00, 0x7f7f00, 0x7f007f, 0x007f7f],
	dust : [0, 0, 0, 0],
	score_cnt : 0,
	skill_level : 0,
	height : [0, 0, 0],
    hp_lost : 0,
    skill_cnt :  [0, 0, 0, 0],
    gamerec : [],
	delta_depth : 0.02,
	hero_color : [0xffffff, 0x7f7f00, 0x7f007f, 0x007f7f],
	resize : function(){
		this.renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
		this.camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
	},
	touch_ground : function(){
		this.hero_speed_z = 0.032;
		this.jumping = 0;
		if(this.rolling > 30){
			this.rolling = 30;
		}
		if(this.rolling <= 30 && this.rolling > 0){
			this.hero_speed_z = 0;
		}
	},
	update : function(){
		++this.score_cnt;
		if(this.score_cnt == 12){
			this.score_change(1);
			this.score_cnt = 0;
		}
		if(this.damaged > 0){
			--this.damaged;
		}
		if(this.cd % 6 == 0){
			sys.updatecd(this.cd / 60);
		}
		if(this.cd > 0){
			--this.cd;
		}
		if(this.recovering > 0){
			--this.recovering;
			if(this.recovering % 15 == 0){
				this.hp_change(1);
                ++this.skill_cnt[1];
			}
		}
		this.hero_sphere.position.x += this.hero_speed;
		this.camera.position.x += this.hero_speed;
		light.position.x += this.hero_speed;
		if(this.rolling > 0 && this.rolling <= 30){
			--this.rolling;
		}
		this.hero_speed_z -= this.gravity;
		this.hero_sphere.position.z += this.hero_speed_z;
		if(this.hero_sphere.position.z - this.hero_sphere.geometry.parameters.radius + eps < 0){
			this.hero_sphere.position.z = this.hero_sphere.geometry.parameters.radius;
			this.touch_ground();
		}
		if(this.side_moving){
			--this.side_moving;
			this.hero_sphere.position.y += this.hero_speed_y;
			if(this.side_moving == 0){
				var y = this.hero_sphere.position.y;
				var diff = Math.abs(y - 1.5);
				var which = 1.5;
				if(diff > Math.abs(y)){
					diff = Math.abs(y);
					which = 0;
				}
				if(diff > Math.abs(y + 1.5)){
					diff = Math.abs(y + 1.5);
					which = -1.5;
				}
				this.hero_sphere.position.y = which;
			}
		}
		++this.timer_count;
		if(this.timer_count == 120){
			for(var j = 0; j < 3; ++j){
				var cut = Math.max(3, 9 - Math.floor(this.hero_sphere.position.x / 1000));
				var type = Math.floor(Math.random() * 10) < cut ? 0 : 1;
				var delta_z = 0;
				if(this.height[j] == 0){
					delta_z = Math.floor(Math.random() * 2);
				}
				if(this.height[j] == 1){
					delta_z = Math.floor(Math.random() * 3) - 1;
				}
				if(this.height[j] == 2){
					delta_z = Math.floor(Math.random() * 2) - 1;
				}
				var height = this.height[j] + delta_z;
				this.height[j] = height;
				if(height == 0){
					height = 0.05;
				}
				if(this.height[j] != 0 || type != 0){
					geometry = new THREE.BoxGeometry(this.hero_speed * 120, 1, height);
					material = new THREE.MeshLambertMaterial({color : type == 0 ? 0x00ffff : 0xff0000});
					var ground = new THREE.Mesh(geometry, material);
					ground.position.x = this.hero_sphere.position.x + this.hero_speed * 600;
					ground.position.y = j * 1.5 - 1.5;
					ground.position.z = height / 2;
					this.scene.add(ground);
					this.map.push(ground);
					var BoxHelper = new THREE.BoxHelper(ground, 0x000000);
					this.map_box.push(BoxHelper);
					this.scene.add(BoxHelper);
					this.map_type.push(type);
				}
			}
						var type = Math.floor(Math.random() * 100);
			if(type < 90){
				type = 0;
			}
			else if(type < 95){
				type = 1;
			}
			else{
				type = Math.floor(Math.random() * 3) + 2;
			}
			var where = Math.floor(Math.random() * 3);
			var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
			var material = new THREE.MeshLambertMaterial({color : this.color[type]});
			var it = {};
			it.item = new THREE.Mesh(geometry, material);
			it.rot_spd_x = 0.01;
			it.rot_spd_y = 0.02;
			it.rot_spd_z = 0.03;
			it.item.position.x = this.hero_sphere.position.x + this.hero_speed * 600;
			it.item.position.y = (where - 1) * 1.5;
			it.item.position.z = this.height[where] + 0.2 + Math.random() * 0.8;
			it.type = type;
			this.scene.add(it.item);
			this.items.push(it);
			this.timer_count = 0;
		}
		var i = 0;
		while(i < this.items.length){
			var it = this.items[i].item;
			it.rotation.x += this.items[i].rot_spd_x;
			it.rotation.y += this.items[i].rot_spd_y;
			it.rotation.z += this.items[i].rot_spd_z;
			var diff_x = this.hero_sphere.position.x - it.position.x;
			var diff_y = this.hero_sphere.position.y - it.position.y;
			var diff_z = this.hero_sphere.position.z - it.position.z;
			var radius = this.hero_sphere.geometry.parameters.radius;
			var length = it.geometry.parameters.width;
			if(this.skill == 2 && diff_x * diff_x + diff_y * diff_y + diff_z * diff_z - eps < 6.25 && this.cd == 0){
				it.position.x += Math.abs(diff_x) > (this.hero_speed + 0.05) ? (this.hero_speed + 0.05) * diff_x / Math.abs(diff_x) : diff_x;
				it.position.y += Math.abs(diff_y) > (Math.abs(this.hero_speed_y) + 0.05) ? (Math.abs(this.hero_speed_y) + 0.05) * diff_y / Math.abs(diff_y) : diff_y;
				it.position.z += Math.abs(diff_z) > (Math.abs(this.hero_speed_z) + 0.05) ? (Math.abs(this.hero_speed_z) + 0.05) * diff_z / Math.abs(diff_z) : diff_z;
			}
			if(it.position.x - this.hero_sphere.position.x + eps < -5){
				this.scene.remove(it);
				this.items.splice(i, 1);
			}
			else if(diff_x * diff_x + diff_y * diff_y + diff_z * diff_z - eps < (radius + length) * (radius + length)){
				if(this.items[i].type == 0){
					this.score_change(50);
					sys.modpts(this.score);
					sys.addmsg("+50!");
                    ++this.dust[0];
				}
				else if(this.items[i].type == 1){
					this.hp_change(10);
					sys.addmsg("Healed!");
				}
				else{
					++this.dust[this.items[i].type - 1];
					var str = "Dust of ";
					if(this.items[i].type == 2){
						str += "General get!";
					}
					if(this.items[i].type == 3){
						str += "Lord get!";
					}
					if(this.items[i].type == 4){
						str += "Samurai get!";
					}
					sys.addmsg(str);
				}
				this.scene.remove(it);
				this.items.splice(i, 1);
				if(this.skill == 2 && this.cd == 0)
				{
					this.cd = this.cd_max[2] * (1.1 - this.skill_level * 0.1);
                    ++this.skill_cnt[2];
				}
			}
			else {
				++i;
			}
		}
		i = 0;
		while(i < this.map.length){
			var it = this.map[i];
			if(it.position.x - this.hero_sphere.position.x + eps < -13){
				this.scene.remove(it);
				this.scene.remove(this.map_box[i]);
				this.map.splice(i, 1);
				this.map_box.splice(i, 1);
				this.map_type.splice(i, 1);
			}
			else{
				var startx = this.map[i].position.x - this.map[i].geometry.parameters.width / 2;
				var endx = this.map[i].position.x + this.map[i].geometry.parameters.width / 2;
				var starty = this.map[i].position.y - this.map[i].geometry.parameters.height / 2;
				var endy = this.map[i].position.y + this.map[i].geometry.parameters.height / 2;
				var startz = this.map[i].position.z - this.map[i].geometry.parameters.depth / 2;
				var endz = this.map[i].position.z + this.map[i].geometry.parameters.depth / 2;
				var radius = this.hero_sphere.geometry.parameters.radius;
				var x = this.hero_sphere.position.x;
				var y = this.hero_sphere.position.y;
				var z = this.hero_sphere.position.z;
				if(x + radius + eps < startx || x - radius - eps > endx){
					++i;
					continue;
				}
				if(y + radius + eps < starty || y - radius - eps > endy){
					++i;
					continue;
				}
				if(z + radius + eps < startz || z - radius - eps > endz){
					++i;
					continue;
				}
				if(starty - eps <= y && y - eps <= endy && startz - eps <= z && z - eps <= endz){
					if(x - radius + eps < startx && x + radius + eps > startx){
						if(this.skill == 3 && this.cd == 0){
							this.hp_change(-40 * (1.1 - this.skill_level * 0.1));
							this.cd = this.cd_max[3] * (1.05 - this.skill_level * 0.05);
							this.scene.remove(it);
							this.scene.remove(this.map_box[i]);
							this.map.splice(i, 1);
							this.map_box.splice(i, 1);
							this.map_type.splice(i, 1);
                            ++this.skill_cnt[3];
							continue;
						}
						else{
							this.endgame();
							break;
						}
					}
				}
				if(Math.max(x - radius, startx) + eps < Math.min(x + radius, endx)){
					if(Math.max(y - radius, starty) + eps < Math.min(y + radius, endy)){
						if(z - radius + eps < startz && z + radius - eps > startz){
							if(this.skill == 3 && this.cd == 0){
								this.hp_change(-40 * (1.1 - this.skill_level * 0.1));
								this.cd = this.cd_max[3] * (1.05 - this.skill_level * 0.05);
								this.scene.remove(it);
								this.scene.remove(this.map_box[i]);
								this.map.splice(i, 1);
								this.map_box.splice(i, 1);
								this.map_type.splice(i, 1);
                                ++this.skill_cnt[3];
								continue;
							}
							else{
								z = startz - radius;
								this.hero_sphere.position.z = z;
								this.hero_speed_z = -this.hero_speed_z;
								this.hp_change(-20);
							}
						}
						if(z + radius - eps > endz && z - radius + eps < endz && this.hero_speed_z < 0){
							z = endz + radius;
							this.hero_sphere.position.z = z;
							this.touch_ground();
							if(this.map_type[i] == 1){
								this.hp_change(-20);
							}
						}
					}
					if(Math.max(z - radius, startz) + eps < Math.min(z + radius, endz)){
						if(y - radius + eps < starty && y + radius - eps > starty){
							if(this.skill == 3 && this.cd == 0){
								this.hp_change(-40 * (1.1 - this.skill_level * 0.1));
								this.cd = this.cd_max[3] * (1.05 - this.skill_level * 0.05);
								this.scene.remove(it);
								this.scene.remove(this.map_box[i]);
								this.map.splice(i, 1);
								this.map_box.splice(i, 1);
								this.map_type.splice(i, 1);
                                ++this.skill_cnt[3];
								continue;
							}
							else{
								y = starty - radius;
								this.side_moving = Math.floor(Math.abs(this.map[i].position.y - 1.5 - y) / 0.05);
								this.hero_speed_y = -0.05;
								this.hero_sphere.position.y = y;
								this.hp_change(-20);
							}
						}
						if(y + radius - eps > endy && y - radius + eps < endy){
							if(this.skill == 3 && this.cd == 0){
								this.hp_change(-40 * (1.1 - this.skill_level * 0.1));
								this.cd = this.cd_max[3] * (1.05 - this.skill_level * 0.05);
								this.scene.remove(it);
								this.scene.remove(this.map_box[i]);
								this.map.splice(i, 1);
								this.map_box.splice(i, 1);
								this.map_type.splice(i, 1);
                                ++this.skill_cnt[3];
								continue;
							}
							else{
								y = endy + radius;
								this.side_moving = Math.floor(Math.abs(this.map[i].position.y + 1.5 - y) / 0.05);
								this.hero_speed_y = 0.05;
								this.hero_sphere.position.y = y;
								this.hp_change(-20);
							}
						}
					}
				}
				++i;
			}
		}
		var nowx = this.hero_sphere.position.x;
		var spd = this.hero_speed;
		if(nowx > (0.1 + spd) * (spd - 0.09) / 0.02 * 1000){
			this.hero_speed += 0.01;
			sys.addmsg("Speed up!");
		}
		if(nowx - Math.floor(nowx / 1000) * 1000 < 100){
			this.first_add = 1;
		}
		if(nowx - Math.floor(nowx / 1000) * 1000 > 900 && this.first_add){
			this.first_add = 0;
			var geometry = new THREE.PlaneGeometry(1200, 5);
			var material = new THREE.MeshLambertMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
			var plane = new THREE.Mesh( geometry, material );
			plane.position.x = Math.floor(nowx / 1000) * 1000 + 1350;
			plane.position.z = this.delta_depth;
			this.scene.add(plane);
			this.plane.push(plane);

			geometry = new THREE.PlaneGeometry(1200, 1);
			material = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide} );
			plane = new THREE.Mesh(geometry, material);
			plane.position.x = Math.floor(nowx / 1000) * 1000 + 1350;
			plane.position.z = 0.01 + this.delta_depth;
			plane.position.y = 1.5;
			this.scene.add(plane);
			this.plane.push(plane);

			geometry = new THREE.PlaneGeometry(1200, 1);
			material = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide} );
			plane = new THREE.Mesh(geometry, material);
			plane.position.x = Math.floor(nowx / 1000) * 1000 + 1350;
			plane.position.z = 0.01 + this.delta_depth;
			this.scene.add(plane);
			this.plane.push(plane);

			geometry = new THREE.PlaneGeometry(1200, 1);
			material = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide} );
			plane = new THREE.Mesh(geometry, material);
			plane.position.x = Math.floor(nowx / 1000) * 1000 + 1350;
			plane.position.y = -1.5;
			plane.position.z = 0.01 + this.delta_depth;
			this.scene.add(plane);
			this.plane.push(plane);
			this.delta_depth *= -1;
		}
		i = 0;
		while(i < this.plane.length){
			var endx = this.plane[i].geometry.parameters.width / 2 + this.plane[i].position;
			if(endx - this.hero_sphere.position.x < -10){
				this.scene.remove(this.plane[i]);
				this.plane.splice(i, 1);
			}
			else{
				++i;
			}
		}
	},
	keydown : function(e){
		if(e.keyCode == 37){
			if(this.side_moving == 0 && this.hero_sphere.position.y + eps < 1.5){
				this.side_moving = 30;
				this.hero_speed_y = 0.05;
			}
		}
		if(e.keyCode == 38){
			if(this.jumping == 0){
				this.hero_speed_z = 0.064;
				this.jumping = 1;
				this.rolling = 0;
			}
		}
		if(e.keyCode == 39){
			if(this.side_moving == 0 && this.hero_sphere.position.y - eps > -1.5){
				this.side_moving = 30;
				this.hero_speed_y = -0.05;
			}
		}
		if(e.keyCode == 40){
			if(this.rolling == 0){
				this.hero_speed_z = -0.05;
				this.rolling = 60;
			}
		}
		if(e.keyCode == 27){
			this.pausegame();
		}
	},
	pausegame : function(){
		clearInterval(my_timer);
		showpause();
	},
	endgame : function(){
        console.log('endgame');
        var isquit = arguments[0] ? arguments[0] : false;
		clearInterval(my_timer);
        if (!isquit) {
            showfin();
            var newdust;
            var newlevel;
            var newpro;
            var msgs;
            for (var i = 0; i < 4; ++i)
                newdust += this.dust[i];
            for (var i = 0; i < 4; ++i) {
                newlevel = sys.hero(i).lv;
                newpro = sys.hero(i).pro;
                if (i > 0)
                    newpro += 3 * this.dust[i];
                if (i == this.skill)
                    newpro += this.dust[0];
                while (10 * Math.pow(2, newlevel) <= newpro)
                    ++newlevel;
                if ((sys.hero(i).lvl == -1) && (newlevel > -1)) {
                    msgs = ' unlock!';
                    switch (i) {
                        case 1 :
                            msgs = 'General' + msgs;
                            break;
                        case 2 :
                            msgs = 'Lord' + msgs;
                            break;
                        case 3 :
                            msgs = 'Samurai' + msgs;
                            break;
                        }
                    sys.addmsg(msgs);
                }
                if (i == this.skill)
                    filex.updater(i, newlevel, newpro, this.hero_sphere.position.x, newdust, this.score, this.hplost, this.skill_cnt[i]);
                else
                    filex.updater(i, newlevel, newpro, 0, 0, 0, 0, 0);
            }
            sys.updatecareer();
        }
    },
	game_init : function(){
        this.skill = sys.heroselect;
        this.skill_level = sys.hero(sys.heroselect).lv;
        this.gamerec = [0, 0, 0, 0, 0, 0];
		for(var i = 0; i < this.items.length; ++i){
			this.scene.remove(this.items[i].item);
		}
		for(var i = 0; i < this.map.length; ++i){
			this.scene.remove(this.map[i]);
			this.scene.remove(this.map_box[i]);
		}
		this.items = [];
		this.map = [];
		this.map_box = [];
		this.map_type = [];
		this.plane = [];
		this.hero_speed = 0.1;
		this.hero_speed_y = 0;
		this.hero_speed_z = 0;
		this.side_moving = 0;
		this.jumping = 0;
		this.rolling = 0;
		this.timer_count = 0;
		this.score = 0;
		this.hp = 100;
		this.recovering = 0;
		this.cd = 0;
		this.score_cnt = 0;
		this.height = [0, 0, 0];
        this.hp_lost = 0;
        this.skill_cnt = [0, 0, 0, 0];
		var geometry = new THREE.PlaneGeometry(1200, 5);
		var material = new THREE.MeshLambertMaterial({color: 0x00ff00, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh(geometry, material);
		plane.position.x = 350;
		this.scene.add(plane);
		this.plane.push(plane);

		geometry = new THREE.PlaneGeometry(1200, 1);
		material = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide} );
		plane = new THREE.Mesh(geometry, material);
		plane.position.x = 350;
		plane.position.y = 1.5;
		plane.position.z = 0.01;
		this.scene.add(plane);
		this.plane.push(plane);

		geometry = new THREE.PlaneGeometry(1200, 1);
		material = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide} );
		plane = new THREE.Mesh(geometry, material);
		plane.position.x = 350;
		plane.position.z = 0.01;
		this.scene.add(plane);
		this.plane.push(plane);

		geometry = new THREE.PlaneGeometry(1200, 1);
		material = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide} );
		plane = new THREE.Mesh(geometry, material);
		plane.position.x = 350;
		plane.position.y = -1.5;
		plane.position.z = 0.02;
		this.scene.add(plane);
		this.plane.push(plane);
        sys.modpts(this.score);
        sys.updatehp(this.hp_max, this.hp_max);
        sys.updatecd(0);
	},
	hp_change : function(delta){
		if(delta > 0 || (delta < 0 && this.damaged == 0)){
			this.hp += delta;
			if(delta < 0){
				this.damaged = 20;
                this.hp_lost += delta;
				if(this.skill == 1){
					this.recovering = Math.floor(-delta * (0.2 + 0.05 * this.skill_level)) * 15;
				}
			}
		}
		if(this.hp > this.hp_max){
			this.hp = this.hp_max;
		}
		if(this.hp <= 0){
			this.hp = 0;
			this.endgame();
		}
		sys.updatehp(this.hp, this.hp_max);
	},
	score_change : function(delta){
		this.score += delta;
		sys.modpts(this.score);
	}
};

function timer() {
	my_scene.update();
	my_scene.renderer.render(my_scene.scene, my_scene.camera);
}

function init(){
	if(first){
		my_scene.scene = new THREE.Scene();
		my_scene.camera = new THREE.PerspectiveCamera(75, document.documentElement.clientWidth / document.documentElement.clientHeight, 0.1, 100);
		my_scene.timer = 0;
		my_scene.renderer = new THREE.WebGLRenderer();
		my_scene.renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
		my_scene.renderer.setClearColor(0x7f7f7f);
		$('#gamezone').get(0).appendChild(my_scene.renderer.domElement);
		first = 0;
		light = new THREE.PointLight(0xffffff, 2, 200);
		my_scene.scene.add(light);
		var am_light = new THREE.AmbientLight(0x404040); // soft white light
		my_scene.scene.add(am_light);
	}

	my_scene.skill = sys.heroselect;
	var geometry = new THREE.SphereGeometry(0.25, 32, 32);
	var material = new THREE.MeshLambertMaterial({color : my_scene.hero_color[my_scene.skill]});
	my_scene.hero_sphere = new THREE.Mesh(geometry, material);
	my_scene.hero_sphere.position.x = 0;
    my_scene.hero_sphere.position.y = 0;
	my_scene.hero_sphere.position.z = 0.25;
	my_scene.scene.add(my_scene.hero_sphere);
	my_scene.camera.position.x = -5;
	my_scene.camera.position.y = 0;
	my_scene.camera.position.z = 5;
	my_scene.camera.up.x = 0;
	my_scene.camera.up.y = 0;
	my_scene.camera.up.z = 1;
	my_scene.camera.lookAt({x : 3, y : 0, z : 0,});
	my_scene.game_init();
	light.position.set(0, 0, 50);
	sys.updatehp(my_scene.hp, my_scene.hp_max);
	my_timer = setInterval(timer, 16);
}

document.onkeydown = function(event){
	var e = event || window.event || argument.callee.caller.arguments[0];
	my_scene.keydown(e);
}
