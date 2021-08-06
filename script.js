var x = 4,
	y = 51.4,
	wheel,wheelS,
	rod,rodS,
	dot,dotS,
	head,headS,
	back,backS,
	hand,handS,
	ml,mlS,forMl,
	shd,shdS,
	swing = true,
	i = 0,
	cir,
	mInterv,
	pInterv,rInterv,
	ltInterv,rtInterv,
	isFlying = false,
	isBlocking = false,
	canBlock = true,
	blockCount = 0,
	LIFE = 100,
	gameON = false,
	room,name;

const displayRoom = (room) =>{
	var p = document.createElement("p");
	p.style.position = "relative";
	p.style.marginBottom = "5%";
	p.addEventListener("click",()=>{createGame(room)});
	p.innerHTML = room;
	listBox.appendChild(p);

}
const message = (text) =>{
	clearTimeout(mInterv);
	messageId.innerHTML = text;
	mInterv = setTimeout(()=>{messageId.innerHTML = ""},5000);
}
const createGame = (id) =>{
	gameInit.display = "none";
	CGP.display = "block";
	gi.value = id;
	id!=="" ? gi.disabled=true : gi.disabled=false;
}
const previousPage = () =>{
	CGP.display = "none";
	gameInit.display = "block";
}
const stopL = () =>{
	clearTimeout(ltInterv);
	wheelS.animation = "";
}
const stopR = () =>{
	clearTimeout(rtInterv);
	wheelS.animation = "";
}
class ME{
	constructor(){
		wheel = document.createElement("div");
		wheel.id = "wheel";
		wheelS = wheel.style;
		wheelS.background = "-webkit-linear-gradient(left,green,red,black)";
		wheelS.border = "1.5px solid black";
		wheelS.position = "fixed";
		wheelS.width = "30px";
		wheelS.height = "30px";
		wheelS.borderRadius = "100%";
		wheelS.top = y + "%";
		wheelS.left = x + "%";
		game.appendChild(wheel);
		rod = document.createElement("div");
		rodS = rod.style;
		rodS.position = "fixed";
		rodS.backgroundColor = "green";
		rodS.border = "1.5px solid black";
		rodS.width = "10px";
		rodS.height = "40px";
		rodS.top = (y-3.5) + "%";
		rodS.left = (x+3.5) + "%";
		rodS.borderRadius = "15px";
		game.appendChild(rod);
		dot = document.createElement("div");
		dotS = dot.style;
		dotS.position = "fixed";
		dotS.backgroundColor = "black";
		dotS.width = "4px";
		dotS.height = "4px";
		dotS.clipPath = "circle()";
		dotS.top = (y+2.2) + "%";
		dotS.left = (x+5) + "%";
		game.appendChild(dot);
		head = document.createElement("div");
		headS = head.style;
		headS.position = "fixed";
		headS.backgroundColor = "green";
		headS.width = "20px";
		headS.height = "25px";
		headS.borderRadius = "50%";
		headS.top = (y-8.7) + "%";
		headS.left = (x+2) + "%";
		game.appendChild(head);
		back = document.createElement("div");
		backS = back.style;
		backS.position = "fixed";
		backS.backgroundColor = "green";
		backS.width = "17px";
		backS.height = "22px";
		backS.borderRadius = "30%";
		backS.top = (y-4.5) + "%";
		backS.left = (x+2) + "%";
		game.appendChild(back);
		shd = new Shield();
		shdS = shd.style;
		game.appendChild(shd);
		ml = new Malay();
		mlS = ml.style;
		game.appendChild(ml);
		hand = document.createElement("div");
		hand.id = "hand";
		handS = hand.style;
		handS.position = "fixed";
		handS.backgroundColor = "green";
		handS.border = "1px solid black";
		handS.width = "4px";
		handS.height = "25px";
		handS.borderRadius = "50px";
		handS.top = (y-3.3) + "%";
		handS.left = (x+5) + "%";
		game.appendChild(hand);
	}
}
const attack = () =>{
	if(swing){
		swing = false;
		handS.transform = "rotateZ(-150deg)";
		handS.top = (y-7) + "%";
		handS.left = (x+7) + "%";
		mlS.transform = "rotateZ(-100deg)";
		mlS.top = (y-11.5) + "%";
		mlS.left = x + "%";
		setTimeout(()=>{
			handS.top = (y-3.8) + "%";
			handS.left = (x+5) + "%";
			handS.transform = "";
			i = forMl;
			mlS.top = (y-5.5) + "%";
			project();
		},200);
	}
}

class Malay{
	constructor(){
		var ml = document.createElement("img");
		ml.id = "malay";
		ml.src = "axe.jpg";
		var mlS = ml.style;
		mlS.position = "fixed";
		mlS.width = "40px";
		mlS.height = "40px";
		mlS.border = "none";
		mlS.top = (y-5.5) + "%";
		forMl = x+3;
		mlS.left = forMl + "%";
       return ml;
    }
}

class Shield{
	constructor(){
		var shd = document.createElement("img");
		shd.id = "shd";
		shd.src = "shieldBtn.png";
		var shdS = shd.style;
		shdS.transform = "rotateY(65deg)";
		shdS.position = "fixed";
		shdS.width = "30px";
		shdS.height = "65px";
		shdS.border = "none";
		shdS.top = (y-10.5) + "%";
		shdS.left = (x+6) + "%";
		shdS.display = "none";
    	return shd;
    }
}

const project = () =>{
	isFlying = true;
	mlS.animation = "cycle0 .2s linear infinite";
	pInterv = setTimeout(()=>{
		i++;
		mlS.left = i + "%";
		if(_isFlying && i>=90-_i){
			clearTimeout(pInterv);
			reverse();
		}
		else if(_isBlocking && i>=90-(_x+4+(30/screen.width*100))){
			clearTimeout(pInterv);
			_blockCount++;
			if(_blockCount === 10){
				_canBlock = false;
				_blockCount = 0;
				sbrkHim.backgroundColor = "red";
				himShield.opacity = ".5";
				_noDefense();
				setTimeout(()=>{_canBlock = true;himShield.opacity = ".9";sbrkHim.backgroundColor = "green";},10000);
			}
			reverse();
		}
		else if(i>=90-_x){
			clearTimeout(pInterv);
			_LIFE-=4;
			himLife.width = _LIFE + "%"
			if(_LIFE<50){
				himLife.backgroundColor = "red";
				himLifeCon.borderColor = "red";
			}else{}
			if(_LIFE <= 0){
				gameON = false;
				gameover.top = "-3%";
				win.style.color = "green";
				win.innerHTML = "VICTORY";
				win.style.display = "block";
			}
			reverse();
		}
		else if(i>=100){
			clearTimeout(pInterv);
			reverse();
		}
		else{project()}
	},10);
}

const reverse = () =>{
	mlS.animation = "cycle1 .2s linear infinite";
	rInterv = setTimeout(()=>{
		i--;
		mlS.left = i + "%";
		if(i<=x+3){
			clearTimeout(rInterv);
			mlS.left = (x+3) + "%";
			mlS.animation = "";
			mlS.transform = "";
			swing = true;
			isFlying = false;
			return;
		}
		else{reverse()}
	},10);
}

const moveLeft = () =>{
	ltInterv = setTimeout(()=>{
		if(x>1){
			wheelS.animation = "cycle1 .5s linear infinite";
			x--;forMl--;
			wheelS.left = x + "%";
			rodS.left = (x+3.5) + "%";
			dotS.left = (x+5) + "%";
			headS.left = (x+2) + "%";
			backS.left = (x+2) + "%";
			shdS.left = (x+6) + "%";
			if(!isFlying){mlS.left = (x+3) + "%";}
			handS.left = (x+5) + "%";
			moveLeft();
		}
		else{wheelS.animation = "";}
	},10);
}
const moveRight = () =>{
	cir = x+(45/screen.width*100);
	rtInterv = setTimeout(()=>{
		if(cir<100 && x+(66/screen.width*100)<100-_x){
			wheelS.animation = "cycle0 .5s linear infinite";
			x++;forMl++;
			wheelS.left = x + "%";
			rodS.left = (x+3.5) + "%";
			dotS.left = (x+5) + "%";
			headS.left = (x+2) + "%";
			backS.left = (x+2) + "%";
			shdS.left = (x+6) + "%";
			if(!isFlying){mlS.left = (x+3) + "%";}
			handS.left = (x+5) + "%";
			moveRight();
		}
		else{wheelS.animation = "";}
	},10);
}
const defense = () =>{
	if(canBlock){
		isBlocking = true;
		shdS.display = "block";
	}
}
const noDefense = () =>{
	isBlocking = false;
	shdS.display = "none";
}
            /** OPPONENT SECTION **/
var _x = 4,
	_y = 51.4,
	_wheel,_wheelS,
	_rod,_rodS,
	_dot,_dotS,
	_head,_headS,
	_back,_backS,
	_hand,_handS,
	_ml,_mlS,_forMl,
	_shd,_shdS,
	_swing = true,
	_i = 0,
	_cir,
	_pInterv,_rInterv,
	_ltInterv,_rtInterv,
	_isFlying = false,
	_isBlocking = false,
	_canBlock = true,
	_blockCount = 0,
	_LIFE = 100;
class HIM{
	constructor(){
		_wheel = document.createElement("div");
		_wheel.id = "wheel";
		_wheelS = _wheel.style;
		_wheelS.background = "-webkit-linear-gradient(right,green,red,black)";
		_wheelS.border = "1.5px solid black";
		_wheelS.position = "fixed";
		_wheelS.width = "30px";
		_wheelS.height = "30px";
		_wheelS.borderRadius = "100%";
		_wheelS.top = _y + "%";
		_wheelS.right = _x + "%";
		game.appendChild(_wheel);
		_rod = document.createElement("div");
		_rodS = _rod.style;
		_rodS.position = "fixed";
		_rodS.backgroundColor = "green";
		_rodS.border = "1.5px solid black";
		_rodS.width = "10px";
		_rodS.height = "40px";
		_rodS.top = (_y-3.5) + "%";
		_rodS.right = (_x+3.5) + "%";
		_rodS.borderRadius = "15px";
		game.appendChild(_rod);
		_dot = document.createElement("div");
		_dotS = _dot.style;
		_dotS.position = "fixed";
		_dotS.backgroundColor = "black";
		_dotS.width = "4px";
		_dotS.height = "4px";
		_dotS.clipPath = "circle()";
		_dotS.top = (_y+2.2) + "%";
		_dotS.right = (_x+5) + "%";
		game.appendChild(_dot);
		_head = document.createElement("div");
		_headS = _head.style;
		_headS.position = "fixed";
		_headS.backgroundColor = "green";
		_headS.width = "20px";
		_headS.height = "25px";
		_headS.borderRadius = "50%";
		_headS.top = (_y-8.7) + "%";
		_headS.right = (_x+2) + "%";
		game.appendChild(_head);
		_back = document.createElement("div");
		_backS = _back.style;
		_backS.position = "fixed";
		_backS.backgroundColor = "green";
		_backS.width = "17px";
		_backS.height = "22px";
		_backS.borderRadius = "30%";
		_backS.top = (_y-4.5) + "%";
		_backS.right = (_x+2) + "%";
		game.appendChild(_back);
		_shd = new _Shield();
		_shdS = _shd.style;
		game.appendChild(_shd);
		_ml = new _Malay();
		_mlS = _ml.style;
		game.appendChild(_ml);
		_hand = document.createElement("div");
		_hand.id = "hand";
		_handS = _hand.style;
		_handS.position = "fixed";
		_handS.backgroundColor = "green";
		_handS.border = "1px solid black";
		_handS.width = "4px";
		_handS.height = "25px";
		_handS.borderRadius = "50px";
		_handS.top = (_y-3.3) + "%";
		_handS.right = (_x+5) + "%";
		game.appendChild(_hand);
	}
}
const _attack = () =>{
	if(_swing){
		_swing = false;
		_handS.transform = "rotateZ(150deg)";
		_handS.top = (_y-7) + "%";
		_handS.right = (_x+7) + "%";
		_mlS.transform = "rotateZ(100deg) rotateY(180deg)";
		_mlS.top = (_y-11.5) + "%";
		_mlS.right = _x + "%";
		setTimeout(()=>{
			_handS.top = (_y-3.8) + "%";
			_handS.right = (_x+5) + "%";
			_handS.transform = "";
			_i = _forMl;
			_mlS.top = (_y-5.5) + "%";
			_project();
		},200);
	}
}

class _Malay{
	constructor(){
		var _ml = document.createElement("img");
		_ml.id = "malay";
		_ml.src = "axe.jpg";
		var _mlS = _ml.style;
		_mlS.position = "fixed";
		_mlS.width = "40px";
		_mlS.height = "40px";
		_mlS.top = (_y-5.5) + "%";
		_mlS.transform = "rotateY(180deg)";
		_forMl = _x+3;
		_mlS.right = _forMl + "%";
    	return _ml;
    }
}

class _Shield{
	constructor(){
		var _shd = document.createElement("img");
		_shd.id = "_shd";
		_shd.src = "shieldBtn.png";
		var _shdS = _shd.style;
		_shdS.transform = "rotateY(65deg)";
		_shdS.position = "fixed";
		_shdS.width = "30px";
		_shdS.height = "65px";
		_shdS.border = "none";
		_shdS.top = (_y-10.5) + "%";
		_shdS.right = (_x+6) + "%";
		_shdS.display = "none";
    	return _shd;
    }
}

const _project = () =>{
	_isFlying = true;
	_mlS.animation = "cycle1 .2s linear infinite";
	_pInterv = setTimeout(()=>{
		_i++;
		_mlS.right = _i + "%";
		if(isFlying && _i>=90-i){
			clearTimeout(_pInterv);
			_reverse();
		}
		else if(isBlocking && _i>=90-(x+4+(30/screen.width*100))){
			clearTimeout(_pInterv);
			blockCount++;
			if(blockCount === 10){
			canBlock = false;
			blockCount = 0;
			sbrkMe.backgroundColor = "red";
			meShield.opacity = ".5";
			noDefense();
			setTimeout(()=>{canBlock = true;meShield.opacity = ".9";sbrkMe.backgroundColor = "green";},10000);
			}
			_reverse();
		}
		else if(_i>=90-x){
			clearTimeout(_pInterv);
			LIFE-=4;
			meLife.width = LIFE + "%";
			if(LIFE<50){
				meLife.backgroundColor = "red";
				meLifeCon.borderColor = "red";
			 }else{}
			 if(LIFE <= 0){
				 gameON = false;
				 gameover.top = "-3%";
				 win.style.color = "red";
				 win.innerHTML = "DEFEAT";
				 win.style.display = "block";
			 }
			_reverse();
		}
		else if(_i>=100){
			clearTimeout(_pInterv);
			_reverse();
		}
		else{_project()}
	},10);
}

const _reverse = () =>{
	_mlS.animation = "cycle0 .2s linear infinite";
	_rInterv = setTimeout(()=>{
		_i--;
		_mlS.right = _i + "%";
		if(_i<=_x+3){
			clearTimeout(_rInterv);
			_mlS.right = (_x+3) + "%";
			_mlS.animation = "";
			_mlS.transform = "rotateY(180deg)";
			_swing = true;
			_isFlying = false;
			return;
		}
		else{_reverse()}
	},10);
}

const _moveLeft = () =>{
	_ltInterv = setTimeout(()=>{
		if(_x>1){
			_wheelS.animation = "cycle0 .5s linear infinite";
			_x--;_forMl--;
			_wheelS.right = _x + "%";
			_rodS.right = (_x+3.5) + "%";
			_dotS.right = (_x+5) + "%";
			_headS.right = (_x+2) + "%";
			_backS.right = (_x+2) + "%";
			_shdS.right = (_x+6) + "%";
			if(!_isFlying){_mlS.right = (_x+3) + "%";}
			_handS.right = (_x+5) + "%";
			_moveLeft();
		}
		else{_wheelS.animation = "";}
	},10);
}
const _moveRight = () =>{
	_cir = _x+(45/screen.width*100);
	_rtInterv = setTimeout(()=>{
		if(_cir<100 && _x+(66/screen.width*100)<100-x){
   			_wheelS.animation = "cycle1 .5s linear infinite";
			_x++;_forMl++;
			_wheelS.right = _x + "%";
			_rodS.right = (_x+3.5) + "%";
			_dotS.right = (_x+5) + "%";
			_headS.right = (_x+2) + "%";
			_backS.right = (_x+2) + "%";
			_shdS.right = (_x+6) + "%";
			if(!_isFlying){_mlS.right = (_x+3) + "%";}
			_handS.right = (_x+5) + "%";
			_moveRight();
		}
		else{_wheelS.animation = "";}
	},10);
}

const _defense = () =>{
	if(_canBlock){
		_isBlocking = true;
		_shdS.display = "block";
	}
}
const _noDefense = () =>{
	_isBlocking = false;
	_shdS.display = "none";
}
const prepare = () =>{
        CGP.display = "none";
        game.style.display = "block";
	gameON = true;
        message("Ready!!!");
}
const joined = (Nm) =>{
        himName.innerHTML = Nm;
        message(name+" is connected");
        gameON = true;
        soc.emit("myName",{r: room, n: name});
}
const waiting = () =>{
        CGP.display = "none";
        game.style.display = "block";
        message("Waiting for an opponent");
}
const proceed = () =>{
	gi = document.getElementById("gi").value;
	pn = document.getElementById("pn").value;
        name = pn.toString();
        room = gi.toString();
        if(name && room){
                meName.innerHTML = name;
                soc.emit("joinRoom",{r: room,n: name});
        }
}
