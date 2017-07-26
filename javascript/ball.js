var eps = 1e-10;
var my_timer;
var first = 1;
var my_scene = {
	items : [],
	map : [],
	map_box : [],
	map_type : [],
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
		if(this.damaged > 0){
			--this.damaged;
		}
		this.hero_sphere.position.x += this.hero_speed;
		this.camera.position.x += this.hero_speed;
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
			var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
			var material = new THREE.MeshBasicMaterial({color : 0xffff00});
			var it = {};
			it.item = new THREE.Mesh(geometry, material);
			it.rot_spd_x = 0.01;
			it.rot_spd_y = 0.02;
			it.rot_spd_z = 0.03;
			it.item.position.x = this.hero_sphere.position.x + 30;
			it.item.position.y = (Math.floor(Math.random() * 3) - 1) * 1.5;
			it.item.position.z = 0;
			this.scene.add(it.item);
			this.items.push(it);
			this.timer_count = 0;
			
			var type = Math.floor(Math.random() * 2);
			geometry = new THREE.BoxGeometry(this.hero_speed * 60, 1, 1);
			material = new THREE.MeshBasicMaterial({color : type == 0 ? 0x00ffff : 0xff0000});
			var ground = new THREE.Mesh(geometry, material);
			ground.position.x = this.hero_sphere.position.x + 30;
			ground.position.y = (Math.floor(Math.random() * 3) - 1) * 1.5;
			ground.position.z = 0.5;
			this.scene.add(ground);
			this.map.push(ground);
			var BoxHelper = new THREE.BoxHelper(ground, 0x000000);
			this.map_box.push(BoxHelper);
			this.scene.add(BoxHelper);
			this.map_type.push(type);
		}
		var i = 0;
		while(i < this.items.length){
			var it = this.items[i].item;
			it.rotation.x += this.items[i].rot_spd_x;
			it.rotation.y += this.items[i].rot_spd_y;
			it.rotation.z += this.items[i].rot_spd_z;
			var diff_x = it.position.x - this.hero_sphere.position.x;
			var diff_y = it.position.y - this.hero_sphere.position.y;
			var diff_z = it.position.z - this.hero_sphere.position.z;
			var radius = this.hero_sphere.geometry.parameters.radius;
			var length = it.geometry.parameters.width;
			if(it.position.x - this.hero_sphere.position.x + eps < -5){
				this.scene.remove(it);
				this.items.splice(i, 1);
			}
			else if(diff_x * diff_x + diff_y * diff_y + diff_z * diff_z - eps < (radius + length) * (radius + length)){
				this.scene.remove(it);
				this.items.splice(i, 1);
				++this.score;
				sys.modpts(this.score);
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
						this.endgame();
						break;
					}
				}
				if(Math.max(x - radius, startx) + eps < Math.min(x + radius, endx)){
					if(Math.max(y - radius, starty) + eps < Math.min(y + radius, endy)){
						if(z - radius + eps < startz && z + radius - eps > startz){
							z = startz - radius;
							this.hero_sphere.position.z = z;
							this.hero_speed_z = -this.hero_speed_z;
							this.hp_change(-20);
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
							y = starty - radius;
							this.side_moving = Math.floor(Math.abs(this.map[i].position.y - 1.5 - y) / 0.05);
							this.hero_speed_y = -0.05;
							this.hero_sphere.position.y = y;
							this.hp_change(-20);
						}
						if(y + radius - eps > endy && y - radius + eps < endy){
							y = endy + radius;
							this.side_moving = Math.floor(Math.abs(this.map[i].position.y + 1.5 - y) / 0.05);
							this.hero_speed_y = 0.05;
							this.hero_sphere.position.y = y;
							this.hp_change(-20);
						}
					}
				}
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
	},
	endgame : function(){
		clearInterval(my_timer);
	},
	game_init : function(){
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
		this.hero_speed = 0.1;
		this.hero_speed_y = 0;
		this.hero_speed_z = 0;
		this.side_moving = 0;
		this.jumping = 0;
		this.rolling = 0;
		this.timer_count = 0;
		this.score = 0;
		this.hp = 100;
	},
	hp_change : function(delta){
		if(delta > 0 || (delta < 0 && this.damaged == 0)){
			this.hp += delta;
			if(delta < 0){
				this.damaged = 20;
			}
		}
		if(this.hp > this.hp_max){
			this.hp == this.hp_max;
		}
		if(this.hp <= 0){
			this.hp = 0;
			this.endgame();
		}
		sys.updatehp(this.hp, this.hp_max);
	}
};

function timer() {
	my_scene.update();
	my_scene.renderer.render(my_scene.scene, my_scene.camera);
}

function init(){
	if(first){
		my_scene.scene = new THREE.Scene();
		my_scene.camera = new THREE.PerspectiveCamera(75, document.documentElement.clientWidth / document.documentElement.clientHeight, 0.1, 1000);
		my_scene.timer = 0;
		my_scene.renderer = new THREE.WebGLRenderer();
		my_scene.renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
		my_scene.renderer.setClearColor(0x7f7f7f);
		document.body.appendChild(my_scene.renderer.domElement);
		first = 0;
		var geometry = new THREE.SphereGeometry(0.25, 32, 32);
		var material = new THREE.MeshBasicMaterial({color : 0xffffff});
		my_scene.hero_sphere = new THREE.Mesh(geometry, material);
	}

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
	sys.updatehp(my_scene.hp, my_scene.hp_max);
	my_timer = setInterval(timer, 16);
}

document.onkeydown = function(event){
	var e = event || window.event || argument.callee.caller.arguments[0];
	my_scene.keydown(e);
}