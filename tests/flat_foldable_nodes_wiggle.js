var flat_foldable_nodes_wiggle_callback;
var flat_foldable_nodes_callback;

var ffMoveNode = new OrigamiPaper("canvas-flat-foldable-nodes-wiggle").blackAndWhite();
ffMoveNode.setPadding(0.05);

ffMoveNode.ffCircleAlpha = 0.7;

nearestNode = undefined;
ffMoveNode.movingNode = undefined;
ffMoveNode.mNodeOriginalLocation = undefined;
ffMoveNode.nNode = undefined;
ffMoveNode.selectNearestNode = true;
ffMoveNode.style.selectedNode = { 
	fillColor: undefined, 
	strokeWidth: 0.005,
	radius: 0.02,
	strokeColor: { gray:0 }
}
ffMoveNode.style.nodes = { 
	visible: true,
	fillColor: undefined,
	strokeColor: undefined,
	strokeWidth: 0.0,
	radius: 0.02
};

// loadSVG("/files/svg/sea-turtle-errors.svg", function(e){ 
ffMoveNode.load("/files/svg/crane-errors.svg", function(){ 
	ffMoveNode.draw();
	if(ffMoveNode.nodeLayer != undefined && ffMoveNode.nodeLayer.moveToFront != undefined){
		ffMoveNode.nodeLayer.moveToFront();
	}
	if(ffMoveNode.cpMin !== 0){
		ffMoveNode.style.selectedNode.strokeWidth = 0.005*ffMoveNode.cpMin;
		ffMoveNode.style.selectedNode.radius = 0.02*ffMoveNode.cpMin;
		ffMoveNode.style.nodes.radius = 0.02 * ffMoveNode.cpMin;
	}
	ffMoveNode.setPadding();
	ffMoveNode.update();
	ffMoveNode.colorNodesFlatFoldable();
});

ffMoveNode.colorNodesFlatFoldable = function(){
	for(var i = 0; i < this.cp.nodes.length; i++){
		var color = { hue:130, saturation:0.8, brightness:0.7, alpha:this.ffCircleAlpha }
		if( !this.cp.nodes[i].flatFoldable() ){ 
			color = { hue:0, saturation:0.8, brightness:1, alpha:this.ffCircleAlpha } 
		}
		this.nodes[i].fillColor = color;
	}
}

ffMoveNode.reset = function(){
	paper = this.scope; 
	this.cp.clear();
	this.draw();
}
ffMoveNode.reset();

ffMoveNode.onFrame = function(event) { }
ffMoveNode.onResize = function(event) { }
ffMoveNode.onMouseDown = function(event){ 
	this.movingNode = this.cp.nearest( event.point.x, event.point.y ).node;
	this.mNodeOriginalLocation = new XY(this.movingNode.x, this.movingNode.y);
	if(this.cp != undefined){ this.colorNodesFlatFoldable(); }
}
ffMoveNode.onMouseUp = function(event){ 
	if(this.movingNode != undefined && this.mNodeOriginalLocation != undefined){
		this.movingNode.x = this.mNodeOriginalLocation.x;
		this.movingNode.y = this.mNodeOriginalLocation.y;
		this.movingNode = undefined;
		this.mNodeOriginalLocation = undefined;
		this.update();
	}
	if(this.cp != undefined){ this.colorNodesFlatFoldable(); }
}
ffMoveNode.onMouseMove = function(event) { 
	if(this.movingNode != undefined){
		this.movingNode.x = event.point.x;
		this.movingNode.y = event.point.y;
		this.update();
	} else{
		var nNode = this.cp.nearest( event.point.x, event.point.y ).node;
		if(nearestNode !== nNode){
			nearestNode = nNode;
		}
	}
	if(this.cp != undefined){ this.colorNodesFlatFoldable(); }
	if(flat_foldable_nodes_wiggle_callback != undefined){
		flat_foldable_nodes_wiggle_callback({'point':event.point, 'node':nearestNode.index, 'valid':nearestNode.flatFoldable()});
	}
}
