




//var orientationX = Math.cos(rotationAngle * (Math.PI/180));
//var orientationY = Math.sin(rotationAngle * (Math.PI/180));
console.log("script js loaded")
var width = 1000,
    height = 900;

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.id = "myCanvas";
canvas.width = width;
canvas.height = height;


const myCanvas = document.getElementById('myCanvas');
myCanvas.style.border = '4px solid black';
const ctx= canvas.getContext("2d");
myCanvas.style.position = 'absolute';
myCanvas.style.zIndex = '0';
myCanvas.style.background = 'grey';
const canvas2 = document.createElement("canvas");
document.body.appendChild(canvas2);
const ctx2=canvas2.getContext("2d");
canvas2.id = "myCanvas2"
canvas2.width = width;
canvas2.height = height;
canvas2.style.position = 'absolute';

const myCanvas2 = document.getElementById("myCanvas2");

myCanvas2.style.zIndex = '2';
const image = new Image();
image.src = './assets/car-sprite/Yellow-car-sprite.png';

const image2 = new Image();
image2.src = './assets/car-sprite/Left_Turn_Arrow_White4.png'

function draw (){
    if (rotationAngle < 0){
        rotationAngle += 360;
        
    }else if(rotationAngle >= 360){
        rotationAngle -=360;
    }
    a = positionX;
    b = positionY;
    c = whereItsFacingPointOnTheRadiusX;
    d = whereItsFacingPointOnTheRadiusY;
    ctx.save();
    
    ctx.clearRect(0, 0, 1000, 900);
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.arc(a, b, 20, 0 ,2 * Math.PI )

    ctx.moveTo(a,b);

    ctx.lineTo(c,d)
    ctx.stroke();
    ctx.drawImage(image2, 500, 450, image2.width*0.6, image2.height);
    ctx.restore();
   
    requestAnimationFrame(draw);
   
};



function draw2(){
    if (rotationAngle < 0){
        rotationAngle += 360;
        
    }else if(rotationAngle >= 360){
        rotationAngle -=360;
    }
    
    if (carAngle < 0){
        carAngle += 360;
        
    }else if(rotationAngle >= 360){
        carAngle -=360;
    }
    ctx2.clearRect(0, 0, 1000, 900);
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.save();
    ctx2.translate(positionX, positionY);
    console.log("Rotation Angle: " + rotationAngle);
    
    ctx2.rotate((carAngle)*(Math.PI/180));
    console.log("Car Angle: " + carAngle);
    ctx2.drawImage(image, -image.width /2, -(image.height-image.height/3.8));

    ctx2.restore();
    
    //angle += clockwise ? rotationSpeed: -rotationSpeed;
    requestAnimationFrame(draw2);
}


draw();
draw2();






    
   


