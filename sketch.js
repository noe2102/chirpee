//make a variable to catch the JSON object
var dataz;

//this is what pings their API and uses a javascript thing called socket.io
//basically imagine it as opening up the star gate and the data comes through
io.connect('wss://smartcitizen.xyz').on('data-received', function(device) {
	if(device.data.id==3648){
		console.log(device);
		//$('body').append("<div>" + device.data.name + "</div>");   
		//we put the json dataz in a variable called dataz
		dataz=device;
	}

});


var soundData;
var no2;
var co;
var soundHawk;
var soundMagpie;
var playMode = 'sustain';
var s= 1;

function preload()
{
  // initialize sound
  soundHawk = loadSound('data/preybird.mp3');
  soundMagpie = loadSound('data/magpie.mp3');
}



function setup() {
	createCanvas(640, 480);
	background(0,0,0);
	println(dataz);
}

function draw() {

	noStroke();
	if(dataz!=null){
//ping API to get sensor value
		soundData = dataz.data.data.sensors[7].raw_value;
		println("soundData:"+soundData);

		no2 = dataz.data.data.sensors[3].raw_value;
  co = dataz.data.data.sensors[4].raw_value;
		println("no2"+no2);
			println("co"+co);
	}
	
	

	from = color(255, 0, 0);
	to = color(0, 0, 255);
	var x = map(100,0,2500, 0,1);
	var col1 = lerpColor(from, to, x); //http://p5js.org/reference/#/p5/lerpColor
	fill(col1);
	rect(0,0,width,height/2);
	fill(0);
	rect(0,height/2,width,height/2);

	if(soundData>12){
		if(s==1){
			soundHawk.play();
			s=0;
		}
		soundHawk.onended(myCallback);
		
	}else{
		soundHawk.stop();
	}


}
function myCallback () {
	console.info("sound finished");
	s=1;
}


