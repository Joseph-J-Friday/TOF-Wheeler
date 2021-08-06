var sbrkHim = document.getElementById("sbrkHim").style,
	himLife = document.getElementById("himLife").style,
	himShield = document.getElementById("himShield").style,
	sbrkMe = document.getElementById("sbrkMe").style,
	meLife = document.getElementById("meLife").style,
	meLifeCon = document.getElementById("meLifeCon").style,
	himLifeCon = document.getElementById("himLifeCon").style,
	meShield = document.getElementById("meShield").style,
	game = document.getElementById("game"),
	gameover = document.getElementById("gameover").style,
	win = document.getElementById("win"),
	messageId = document.getElementById("message"),
	listBox = document.getElementById("listBox"),
	CGP = document.getElementById("CGP").style,
	gameInit = document.getElementById("gameInit").style,
	meName = document.getElementById("meName"),
	himName = document.getElementById("himName"),
	gi = document.getElementById("gi"),
	pn = document.getElementById("pn"),
	lit = document.getElementById("lit").style;
const soc = io.connect();
soc.on("newRoom",(r)=>{displayRoom(r)});
soc.on("eachRoom",(room)=>{displayRoom(room)});
soc.on("created",()=>{new ME(); waiting()});
soc.on("joined",(name)=>{new HIM(); joined(name)});
soc.on("prepare",()=>{new ME(); new HIM(); prepare()});
soc.on("OppoName",(nm)=>{himName.innerHTML = nm});
document. getElementById("attack").addEventListener("touchstart",()=>{gameON ? attack()+soc.emit("attack",(room)) : null},false);
document.getElementById("left").addEventListener("touchstart",()=>{gameON ? moveLeft()+soc.emit("left",(room)) : null},false);
document.getElementById("right").addEventListener("touchstart",()=>{gameON ? moveRight()+soc.emit("right",(room)) : null},false);
document.getElementById("shieldBtn").addEventListener("touchstart",()=>{gameON ? defense()+soc.emit("defense",(room)) : null},false);
document.getElementById("left").addEventListener("touchend",()=>{gameON ? stopL()+soc.emit("endLeft",(room)) : null},false);
document.getElementById("right").addEventListener("touchend",()=>{gameON ? stopR()+soc.emit("endRight",(room)) : null},false);
document.getElementById("shieldBtn").addEventListener("touchend",()=>{gameON ? noDefense()+soc.emit("noDefense",(room)) : null});
soc.on("attack",()=>{_attack()});
soc.on("defense",()=>{_defense()});
soc.on("noDefense",()=>{_noDefense()});
soc.on("left",()=>{_moveLeft()});
soc.on("right",()=>{_moveRight()});
soc.on("endLeft",()=>{clearTimeout(_ltInterv); _wheelS.animation = ""});
soc.on("endRight",()=>{clearTimeout(_rtInterv); _wheelS.animation = ""});

window.onload = ()=>{setTimeout(()=>{lit.display="none";gameInit.display="block"},10000)}
