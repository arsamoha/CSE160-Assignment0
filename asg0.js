var ctx;
var canvas;

function main() {
  canvas = document.getElementById("example");
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return;
  }
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(v, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(
    canvas.width / 2 + v.elements[0] * 20,
    canvas.height / 2 - v.elements[1] * 20,
    v.elements[2] * 20
  );
  ctx.stroke();
}

function handleDrawEvent() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var x = document.getElementById("x-coordinate").value;
  var y = document.getElementById("y-coordinate").value;
  let v1 = new Vector3([x, y, 0]);
  drawVector(v1, "red");

  var x2 = document.getElementById("x2-coordinate").value;
  var y2 = document.getElementById("y2-coordinate").value;
  let v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var x = document.getElementById("x-coordinate").value;
  var y = document.getElementById("y-coordinate").value;
  let v1 = new Vector3([x, y, 0]);
  drawVector(v1, "red");

  var x2 = document.getElementById("x2-coordinate").value;
  var y2 = document.getElementById("y2-coordinate").value;
  let v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");

  var operation = document.getElementById("operations").value;
  var scalar = document.getElementById("scalar").value;
  var v3;
  var v4;

  if (operation == "add") {
    v3 = v1.add(v2);
  } else if (operation == "subtract") {
    v3 = v1.sub(v2);
  } else if (operation == "multiply") {
    v3 = v1.mul(scalar);
    v4 = v2.mul(scalar);
  } else if (operation == "divide") {
    v3 = v1.div(scalar);
    v4 = v2.div(scalar);
  } else if (operation == "magnitude") {
    let m1 = v1.magnitude();
    let m2 = v2.magnitude();
    console.log("Magnitude v1: " + m1);
    console.log("Magnitude v2: " + m2);
  } else if (operation == "normalize") {
    v3 = v1.normalize();
    v4 = v2.normalize();
  } else if (operation == "angle-btw") {
    console.log("Angle: " + angleBetween(v1, v2));
  } else if (operation == "area") {
    console.log("Area of the triangle: " + areaTriangle(v1, v2));
  }
  drawVector(v3, "green");
  if (v4) {
    drawVector(v4, "green");
  }
}

function angleBetween(v1, v2) {
  var dot = Vector3.dot(v1, v2);
  var m1 = v1.magnitude();
  var m2 = v2.magnitude();

  var angle = Math.acos(dot / (m1 * m2));
  angle *= 180 / Math.PI;

  return angle;
}

function areaTriangle(v1, v2) {
  var a = Vector3.cross(v1, v2);
  var v1 = new Vector3([a[0], a[1], a[2]]);

  var b = v1.magnitude() / 2;

  return b;
}
