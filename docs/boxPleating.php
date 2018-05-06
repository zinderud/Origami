<?php include 'header.php';?>

<!-- <script type="text/javascript" src="../lib/p5.min.js"></script>
<script type="text/javascript" src="../src/cp.p5js.js"></script>
 -->

<!-- <h3 class="centered" style="padding-top:2em;">CHAPTER V.</h3> -->
<h1>BOX PLEATING</h1>

<section id="intro">

	<div class="quote">
		<p>Parameterize box pleat sinks</p>
	</div>

	<div class="centered">
		<canvas id="canvas-no-crossing" resize class="panorama"></canvas>
	</div>

	<div class="quote">
		<p>Robert Lang's "Water Strider"</p>
	</div>

	<div class="centered">
		<pre><code><c>// returns an array of new Crease objects</c><br>cp.<f>creaseRayRepeat</f>(center, direction)</code></pre>
	</div>

	<div class="quote">
		<p>When a path hits a diagonal, it is reflected across and repeats.</p>
	</div>

</section>

<script src="../tests/no_crossing.js"></script>

<?php include 'footer.php';?>