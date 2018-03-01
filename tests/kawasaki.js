var kawasakiCallback = undefined;

var red = {hue:0.04*360, saturation:0.87, brightness:0.90 };
var yellow = {hue:0.12*360, saturation:0.88, brightness:0.93 };
var blue = {hue:0.53*360, saturation:0.82, brightness:0.28 };
var black = {hue:0, saturation:0, brightness:0 };

var project = new OrigamiPaper("canvas-kawasaki", new CreasePattern().setBoundary([new XY(-1.0,-1.0),new XY(1.0,-1.0),new XY(1.0,1.0),new XY(-1.0,1.0)]));
project.style.mountain.strokeWidth = 0.02;
project.style.mountain.strokeColor = { gray:0.0, alpha:1.0 };
project.cp.edges = project.cp.edges.filter(function(el){ return el.orientation !== CreaseDirection.border});
project.style.selectedNode.fillColor = yellow;
project.style.selectedNode.radius = 0.04;

project.validNodes = [];
var draggingNode = undefined;
project.arcLayer = new project.scope.Layer();
project.arcLayer.sendToBack();
project.backgroundLayer.sendToBack();

project.updateAngles = function(){
	this.arcLayer.activate();
	this.arcLayer.removeChildren();
	var rating = this.centerNode.kawasakiRating();

	var junction = this.centerNode.junction();
	var kawasakis = this.centerNode.junction().kawasakiSolution();

	kawasakis.forEach(function(el, j){
		var joints = el.joints;
		var difference = el.difference;
		for(var i = 0; i < joints.length; i++){
			var a = joints[i].endNodes[0].xy();
			var c = joints[i].endNodes[1].xy();
			var b = joints[i].bisect();
			var arcPts = [a,b,c];
			var arcRadius = 0.35 + difference*0.1;
			for(var p = 0; p < 3; p++){ arcPts[p] = arcPts[p].normalize().scale(arcRadius); }
			var arc = new this.scope.Path.Arc(arcPts[0], arcPts[1], arcPts[2]);
			arc.add(new this.scope.Point(0.0, 0.0));
			arc.fillColor = ([red,blue])[j%2];
			if(Math.abs(difference) < 0.015){ arc.fillColor = yellow; }
			arc.closed = true;
		}
	},this);

	if(kawasakiCallback != undefined){
		var event = kawasakis.map(function(el){
			el['angles'] = el.joints.map(function(joint){ return joint.angle(); });
		});
		kawasakiCallback(kawasakis);
	}

}

project.reset = function(){

	var numNodes = 8;

	this.selectNearestNode = true;
	var creases = [];
	for(var i = 0; i < numNodes; i++){
		var r = Math.random()*0.5 + 0.5;
		var a = Math.random()*Math.PI*2;
		creases.push(this.cp.crease(new XY(0.0, 0.0), new XY(r*Math.cos(a), r*Math.sin(a))).mountain());
	}
	this.cp.clean();
	this.validNodes = [creases[0].uncommonNodeWithEdge(creases[1])];
	for(var i = 1; i < numNodes; i++){
		this.validNodes.push(creases[i].uncommonNodeWithEdge(creases[0]));
	}
	this.centerNode = creases[0].commonNodeWithEdge(creases[1]);
	this.draw();
	this.updateAngles();
}
project.reset();

project.onFrame = function(event) { }
project.onResize = function(event) { }
project.onMouseDown = function(event){
	if(this.validNodes.contains(this.nearestNode)){
		draggingNode = this.nearestNode;
	}
}
project.onMouseUp = function(event){
	draggingNode = undefined;
}
project.onMouseMove = function(event){
	if(draggingNode !== undefined){
		draggingNode.x = event.point.x;
		draggingNode.y = event.point.y;
	}
	this.update();
	this.updateAngles();
}
project.onMouseDidBeginDrag = function(event){ }