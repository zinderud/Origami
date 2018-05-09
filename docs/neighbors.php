<?php include 'header.php';?>

<h1>NEIGHBORS</h1>

<section id="intro">

	<div class="centered">
		<canvas id="canvas-mouse-select" resize></canvas>
	</div>

	<div class="centered">
		<pre><code>cp.<f>getNearestNode</f>(<n id="sketch-ms-x1">x</n>, <n id="sketch-ms-y1">y</n>)<br>cp.<f>getNearestEdge</f>(<n id="sketch-ms-x2">x</n>, <n id="sketch-ms-y2">y</n>)</code></pre>
	</div>

	<div class="quote">
		<p>These functions are useful for relocating parts after an operation, and user-input.</p>
	</div>

	<div class="half p5sketch" id="div-p5-nearest-node"></div>
	<div class="half p5sketch" id="div-p5-nearest-edge"></div>
	<div class="centered">
		<pre class="centered language-javascript"><code class="language-javascript"><span id="spanNearestNodeIndex"></span>cp.<f>getNearestNode</f>( <n id="spanNearest1MouseX">x</n>, <n id="spanNearest1MouseY">y</n> )<br><span id="spanNearestEdgeIndex"></span>cp.<f>getNearestEdge</f>( <n class="token argument" id="spanNearest2MouseX">x</n>, <n class="token argument" id="spanNearest2MouseY">y</n> )</code></pre>
	</div>

	<div class="quote">
		<p>The nearest edge provides information like the nearest point on the edge.</p>
	</div>

	<div class="centered">
		<canvas id="canvas-nearest-nodes" resize class="fill"></canvas>
	</div>

	<div class="centered">
		<pre><code>cp.<f>getNearestNodes</f>(<n id="sketch-ms-x1">x</n>, <n id="sketch-ms-y1">y</n>, <n>how many nodes</n>)</code></pre>
	</div>

	<div class="quote">
		<p>It's possible to get more than just one in an array sorted by distance.</p>
	</div>

	<div class="centered">
		<canvas id="canvas-nearest-angle" resize></canvas>
	</div>

	<div class="centered">
		<pre><code>cp.<f>getNearestInteriorAngle</f>(<n id="sketch-nia-x">x</n>, <n id="sketch-nia-y">y</n>)<c> // </c><a href="library/interiorAngle.php"><c>InteriorAngle</c></a></code></pre>
	</div>

</section>

<script type="text/javascript" src="../tests/mouse-select.js"></script>

<!-- include .js sketches -->
<script type="text/javascript" src="../lib/p5.min.js"></script>
<script type="text/javascript" src="../dist/cp.p5js.js"></script>
<script type="text/javascript" src="../tests/15_nearest_node.js"></script>
<script type="text/javascript" src="../tests/15_nearest_edge.js"></script>
<script type="text/javascript" src="../tests/nearest_nodes.js"></script>
<script type="text/javascript" src="../tests/nearest_angle.js"></script>
<script>

nearAngleCallback = function(point){
	if(point === undefined){
		document.getElementById("sketch-nia-x").innerHTML = 'x';
		document.getElementById("sketch-nia-y").innerHTML = 'y';
	}
	else{
		document.getElementById("sketch-nia-x").innerHTML = (point.x).toFixed(2);
		document.getElementById("sketch-nia-y").innerHTML = (point.y).toFixed(2);
	}
}

mouse_select_callback = function(e){
	document.getElementById("sketch-ms-x1").innerHTML = (e.x).toFixed(2);
	document.getElementById("sketch-ms-y1").innerHTML = (e.y).toFixed(2);
	document.getElementById("sketch-ms-x2").innerHTML = (e.x).toFixed(2);
	document.getElementById("sketch-ms-y2").innerHTML = (e.y).toFixed(2);
}

	var p5a = new p5(p5_nearest_node, 'div-p5-nearest-node');
	var p5b = new p5(p5_nearest_edge, 'div-p5-nearest-edge');

	p5a.callback = function(e){
		if(e.x != undefined && e.y != undefined && e.node != undefined){
			document.getElementById("spanNearest1MouseX").innerHTML = (e.x).toFixed(2);
			document.getElementById("spanNearest1MouseY").innerHTML = (e.y).toFixed(2);
			document.getElementById("spanNearestNodeIndex").innerHTML = '<v>node' + e.node.index + '</v>  ← ';
		} else{
			document.getElementById("spanNearest1MouseX").innerHTML = ' x';
			document.getElementById("spanNearest1MouseY").innerHTML = ' y ';
			document.getElementById("spanNearestNodeIndex").innerHTML = '';
		}
		// console.log(e);
	}
	p5b.callback = function(e){
		if(e.x != undefined && e.y != undefined){
			document.getElementById("spanNearest2MouseX").innerHTML = (e.x).toFixed(2);
			document.getElementById("spanNearest2MouseY").innerHTML = (e.y).toFixed(2);
// distance
// edge
// location
			document.getElementById("spanNearestEdgeIndex").innerHTML = '<v>edge' + e.nearest.edge.index + '</v>, (<n>' + e.nearest.point.x.toFixed(2) + '</n>,<n>' + e.nearest.point.y.toFixed(2) + '</n>)  ← ';
		} else{
			document.getElementById("spanNearest2MouseX").innerHTML = ' x';
			document.getElementById("spanNearest2MouseY").innerHTML = ' y ';
			document.getElementById("spanNearestEdgeIndex").innerHTML = '';
		}
		// console.log(e);
	}
</script>

<?php include 'footer.php';?>