/*window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

*/

var rotationAngle = 90; //initial rotation angle of sprite
var positionX = 500;
var positionY = 450;
var xDistanceTraveledRecord = 0;
var yDistanceTraveledRecord = 0;

//var image = new Image();



var keys = {}; 

var rise = Math.sin(rotationAngle * (Math.PI / 180)),
    run = Math.cos(rotationAngle * (Math.PI/180)),
    riseOverRun = (rise/run),
    runOverRise = (run/rise),
    carAngle = 0;

var distanceTraveledXaxis = 0,
    distanceTraveledYaxis = 0,
    distanceWanted = 1000/100,
    velocityWanted = distanceWanted/(1000/100);
     

var wheelTurnAngle = 0;

var whereItsFacingRise = 0;
var whereItsFacingRun = 0;
var whereItsFacingPointOnTheRadiusX = 500;
var whereItsFacingPointOnTheRadiusY = 430;

//60 hz  Speed 30px/seconds                 Time = (1000/60) milliseconds
    //Speed wanted per frame = 1.8px a frame or changed in distance, taking into account distance needed to be traveled
    //in the X-axis and Y-axis per frame
    //Vy = riseOverRun * Vx
    //dw (distance traveled per frame)
    //dy (distance traveled per frame in the Y axis)
    //dx (distance traveled per frame in the X axis)

    //dw^2 = dy^2 + dx^2
     
    //Vw Velocity wanted 
    //Vy Velocity needed in the Y-axis
    //Vx Velocity needed in the X-axis

    //(tVw)^2 = (tVy)^2 + (tVx)^2

    //dy over dx = risOverRun
    //tVy over tVx = risOverRun
    //Vy over Vx = risOverRun

    //Vx = runOverRise * Vy
    //Vw^2 = Vy^2 + Vx^2
    //so 1.8^2 = (runOverRise * Vy)^2 + Vy^2
    //Vy = SquareRoot(1.8^2/ (runOverRise^2 + 1))
    //Vx = SquareRoot(1.8^2/ (riseOverRun^2 + 1))
    //dy = (1000/60)SquareRoot(1.8^2/ (runOverRise^2 + 1))
    //dx = (1000/60)SquareRoot(1.8^2/ (riseOverRun^2 + 1))
    //distance wanted to be traveled per second (dw) = the length of 30px
    //30px = SquareRoot((1000/60)^2(1.8^2/(riseOverRun^2 + 1)^2 +(1000/60)^2(1.8^2/(runOverRise^2 + 1)^2 )
    // if rise = 0 and run = 1
    //dw = SquareRoot((1000/60)^2(1.8^2/(riseOverRun^2 + 1)^2)
    //30 = SquareRoot((1000/60)^2(1.8^2)^2)

function rightTurn(){
    if ( keys["ArrowUp"] && keys["ArrowRight"] ){
        
        if (wheelTurnAngle < 3 && wheelTurnAngle > -3 ){
            wheelTurnAngle += 1
        }
        if (rotationAngle <= -10 ){
            rotationAngle += 360;
            
        }else if(rotationAngle >= 360){
            rotationAngle -=360;
        }
    
     
    rotationAngle -= wheelTurnAngle;
    console.log("Right Turn Angle: " + wheelTurnAngle + ", Forward Right Turn");
    
    }else if (keys["ArrowDown"] && keys["ArrowRight"]){
        if (wheelTurnAngle < 3 && wheelTurnAngle > -3 ){
            wheelTurnAngle += 1
        }
        if (rotationAngle <= -10 ){
            rotationAngle += 360;
            
        }else if(rotationAngle >= 360){
            rotationAngle -=360;
        }
        rotationAngle += wheelTurnAngle;
        console.log("Down Turn Angle: " + wheelTurnAngle + ", Forward Right Turn");
    }
    
   
}

function oneMoreTry(x,y){
   
    let calculatedSine = 0,
        calculatedCosine = 0,
        aRise = Math.sin(rotationAngle * (Math.PI / 180)),//* orY;
        
        aRun = Math.cos(rotationAngle * (Math.PI / 180));//* orX;
       
        calculatedSine= 1/Math.sqrt(Math.pow((Math.sin(rotationAngle * (Math.PI / 180))/ Math.cos(rotationAngle * (Math.PI / 180))),2) + 1)
        calculatedCosine = 1/Math.sqrt(Math.pow(( Math.cos(rotationAngle * (Math.PI / 180))/Math.sin(rotationAngle * (Math.PI / 180))),2) + 1)
        console.log("aRise: " + aRise);
        console.log("aRun: " + aRun);
        console.log("calculatedSine: " + calculatedSine);
        console.log ("calculatedCosine: " + calculatedCosine);
    if( rise == 0 && run == 1){
        
        whereItsFacingPointOnTheRadiusY = positionY;
        whereItsFacingPointOnTheRadiusX = positionX + x * 20 ;
    }else if (Math.abs(rise) < 0.00001 && run == -1){ 
        whereItsFacingPointOnTheRadiusY = positionY ;
        whereItsFacingPointOnTheRadiusX = positionX + x * 20;
    }else if ( rise == -1 && Math.abs(run) < 0.000001){
        whereItsFacingPointOnTheRadiusX = positionX ;
        whereItsFacingPointOnTheRadiusY = positionY + y * 20; 
    }else if ( rise == 1 && Math.abs(run) < 0.000001){
        whereItsFacingPointOnTheRadiusX = positionX ;
        whereItsFacingPointOnTheRadiusY = positionY + y * 20;
    }else{ 
        whereItsFacingPointOnTheRadiusX = Math.round(positionX + x * aRun * 20);//cosineRun * 50;
        whereItsFacingPointOnTheRadiusY = Math.round(positionY + y * aRise * 20);//sineRise * 50;
    }

}

function positionManipulationFormula(){
    console.log("------------------");
    rise = Math.sin(rotationAngle * (Math.PI / 180));//* orY;
    console.log("Rotation rise: " + rise);
    run = Math.cos(rotationAngle * (Math.PI / 180));//* orX;
    console.log("Rotation run: " + run);
    riseOverRun = (rise/run);
    runOverRise = (run/rise);
    distanceTraveledXaxis = (1000/100) * Math.sqrt(Math.pow(velocityWanted,2)/ (Math.pow(riseOverRun,2) + 1));
    distanceTraveledYaxis = (1000/100) * Math.sqrt(Math.pow(velocityWanted,2)/ (Math.pow(runOverRise,2) + 1));
    console.log("Distance Traveled X: " + distanceTraveledXaxis);
    console.log("Distance Traveled Y: " + distanceTraveledYaxis);
    
}
function leftTurn(){
    
    
  
    if (keys["ArrowUp"] && keys["ArrowLeft"] ){
        
        if(wheelTurnAngle > -1 && wheelTurnAngle < 1 ){
            wheelTurnAngle -= 1
        }
    
     
        rotationAngle += wheelTurnAngle;
        if (rotationAngle < 0 ){
            rotationAngle += 360;
            
        }else if(rotationAngle >= 360){
            rotationAngle -=360;
        }
    console.log("Left Turn Angle: " + wheelTurnAngle + ", Forward Left Turn");

    }else if (keys["ArrowDown"] && keys["ArrowLeft"]){
        if(wheelTurnAngle > -1 && wheelTurnAngle < 1 ){
            wheelTurnAngle -= 1
        } 
        
        rotationAngle -= wheelTurnAngle;
        
        if (rotationAngle < 0){
            rotationAngle += 360;
            
        }else if(rotationAngle >= 360){
            rotationAngle -=360;
        }
    console.log("Left Turn Angle: " + wheelTurnAngle + ", Backward Left Turn")

    }
}


function arrowUp(){
    if (rotationAngle == 0){
        carAngle = 90;
    }else{
        carAngle = 90 - rotationAngle;
    }
    if (positionX < 50 && positionY < 50){
        positionX = 51; 
        positionY = 51;
        oneMoreTry(0, 0);
    }else if (positionX <= 50 && positionY >=50 && positionY <=850){
        positionX = 51;
        oneMoreTry(0, 0);
    }else if (positionX >= 950 && positionY >=50 && positionY <=850){
        positionX =949;
        oneMoreTry(0, 0);
    }else if (positionX >=50 && positionX <=950 && positionY <=50){
        positionY = 51
        oneMoreTry(0, 0);
    }else if (positionX >= 50 && positionX <=950 && positionY >=850){
        positionY = 849;
        oneMoreTry(0, 0);
    }else if (positionX >=950 && positionY >=850){
        positionX = 949;
        positionY = 849;
        oneMoreTry(0, 0);
    }else if (positionX <=50 && positionY >=850){
        positionX = 51;
        positionY = 849; 
        oneMoreTry(0, 0);
    }else if(positionX >= 950 && positionY <=50){
        positionX = 949;
        positionY = 49;
        oneMoreTry(0, 0);

    }else if(positionX > 50 && positionX < 950 && positionY > 50 && positionY < 850){
        if(rise > -1 && rise < 0 && run > 0 && run < 1){
            positionX = (positionX + Math.round(distanceTraveledXaxis)) || 500;
            positionY = (positionY + Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(1, -1);
        }else if (rise == -1 && Math.abs(run) < 0.000001){
            positionX = positionX || 500;
            positionY = (positionY +  Math.round(distanceTraveledYaxis))|| 450;
            oneMoreTry(0, 1);
        }else if (rise > -1 && rise < 0 && run > -1 && run < 0){
            positionX = (positionX - Math.round(distanceTraveledXaxis)) || 500;
            positionY = (positionY +  Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(1, -1);
        }else if(rise == 0 & Math.abs(run) < -1){
            positionX = (positionX - Math.round(distanceTraveledXaxis)) || 500;
            positionY = positionY || 450;
            oneMoreTry(-1, 0);
        }else if (rise < 1 && rise > 0 && run > -1 && run < 0){
            positionX = (positionX - Math.round(distanceTraveledXaxis)) || 500;
            positionY = (positionY -  Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(1, -1);
        }else if (rise == 1 && Math.abs(run) < 0.000001){
            positionX = positionX ||500 ;
            positionY = (positionY -  Math.round(distanceTraveledYaxis))|| 450;
            oneMoreTry(0, -1);
        }else if (rise < 1 && rise > 0 && run > 0 && run < 1){
            positionX = (positionX + Math.round(distanceTraveledXaxis)) || 500;
            positionY = (positionY -  Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(1, -1);
        }else if (rise == 0 && run == 1){
            if (rotationAngle == 0){
                carAngle = 90;
            }else{
                carAngle = 90 - rotationAngle;
            }
            positionX = (positionX + Math.round(distanceTraveledXaxis)) || 500;
            positionY = positionY || 450;
            oneMoreTry(1 , 0);
        }else if (Math.abs(rise) < 0.00001 && run == -1){
            positionX = (positionX - Math.round(distanceTraveledXaxis)) || 500;
            positionY = positionY || 450;
            oneMoreTry(-1 , 0);
        }
    }
        


}
function arrowDown(){ 
    if (rotationAngle == 0){
        carAngle = 90;
    }else{
        carAngle = 90 - rotationAngle;
    }
    if (positionX < 50 && positionY < 50){
        positionX = 51; 
        positionY = 51;
        oneMoreTry(0, 0);
    }else if (positionX <= 50 && positionY >=50 && positionY <=850){
        positionX = 51;
        oneMoreTry(0, 0);
    }else if (positionX >= 950 && positionY >=50 && positionY <=850){
        positionX =949;
        oneMoreTry(0, 0);
    }else if (positionX >=50 && positionX <=950 && positionY <=50){
        positionY = 51;
        oneMoreTry(0, 0);
    }else if (positionX >= 50 && positionX <=950 && positionY >=850){
        positionY = 849;
        oneMoreTry(0, 0);
    }else if (positionX >=950 && positionY >=850){
        positionX = 949;
        positionY = 849;
        xDistanceTraveledRecord = 0;
        oneMoreTry(0, 0);
    }else if (positionX <=50 && positionY >=850){
        positionX = 51;
        positionY = 849;
        oneMoreTry(0, 0);
    }else if(positionX >= 950 && positionY <=50){
        positionX = 949;
        positionY = 49;
        oneMoreTry(0, 0);

    }else if(positionX > 50 && positionX < 950 && positionY > 50 && positionY < 850){
        if(rise > -1 && rise < 0 && run > 0 && run < 1){
            positionX = (positionX - Math.round(distanceTraveledXaxis)) || 500;
            positionY = (positionY -  Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(-1, 1);
        }else if (rise == -1 && Math.abs(run) < 0.000001){
            positionX = positionX || 500;
            positionY = (positionY -  Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(0, -1);
        }else if (rise > -1 && rise < 0 && run > -1 && run < 0){
            positionX = (positionX + Math.round(distanceTraveledXaxis)) || 500;
            positionY = (positionY -  Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(-1, 1);
        }else if(rise  == 0 && run == -1){
            positionX = (positionX + Math.round(distanceTraveledXaxis)) || 500;
            positionY = (positionY) || 450;
            oneMoreTry(1, 0);
        }else if (rise < 1 && rise > 0 && run > -1 && run < 0){
            positionX = (positionX + Math.round(distanceTraveledXaxis)) || 500;
            positionY = (positionY +  Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(-1, 1);
        }else if(rise == 1 && Math.abs(run) < 0.000001){
            positionX = (positionX) ||500;
            positionY = (positionY +  Math.round(distanceTraveledYaxis)) || 450 ;
            oneMoreTry(0, 1);
            console.log("DTY : " + distanceTraveledYaxis);
        }else if (rise < 1 && rise > 0 && run < 1 && run > 0){
            positionX = (positionX - Math.round(distanceTraveledXaxis))|| 500;
            positionY = (positionY + Math.round(distanceTraveledYaxis)) || 450;
            oneMoreTry(-1, 1);
           
        }else if (rise == 0 && run == 1){
            if (rotationAngle == 0){
                carAngle = 90;
            }else{
                carAngle = 90 - rotationAngle;
            }
            positionX = (positionX - distanceTraveledXaxis) || 500;
            positionY = (positionY) || 450;
            oneMoreTry(-1, 0);
        }else if (Math.abs(rise) < 0.00001 && run == -1){
            
            positionX = (positionX + Math.round(distanceTraveledXaxis)) || 500;
            positionY = positionY || 450;
            oneMoreTry(1 , 0);
        }
        
    }
   

}

addEventListener('keydown', function(e) {       
    keys[e.code] = true;
   //orientationX =  Math.cos(rotationAngle * (Math.PI / 180));
    //orientationY =  Math.sin(rotationAngle * (Math.PI / 180));
    
    e.preventDefault(); 
     // do not block other keys 
    //requestAnimationFrame(function(){draw(positionX,positionY, circlePositionX, circlePositionY)});
}, false); 
////////////////////////////////////////////////////  
addEventListener('keyup', (event) =>{ 
    delete keys[event.key];
   
   
    console.log(positionX + "," + positionY);
    
});  

function checkKeys(){
    positionManipulationFormula();

    if (keys["ArrowUp"] && keys["ArrowLeft"]){ 
         setTimeout(arrowUp(),2000);
         leftTurn();
               
        console.log("U, L, "+positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle); 
    }else if (keys["ArrowUp"] && keys["ArrowRight"]){ 
    
        setTimeout(arrowUp(),2000);
        setTimeout(rightTurn(),2000);
        
        console.log("U, R, "+positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle); 
      
    }else if (keys["ArrowUp"]){ 
        
        setTimeout(arrowUp(),2000);
        
        console.log("U, "+positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle);
    }else if (keys["ArrowDown"] && keys["ArrowLeft"]){
        
        setTimeout(arrowDown(),2000);
        setTimeout(leftTurn(),2000);

        console.log("D, L, " + positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle);
    }else if (keys["ArrowDown"] && keys["ArrowRight"]){
        
        setTimeout(arrowDown(),2000);
        setTimeout(rightTurn(),2000);
       
        
        console.log("D, R,  " + positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle);
    }else if (keys["ArrowDown"]){
        
        setTimeout(arrowDown(),2000);
        
        console.log("D, " + positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle);
    
    }else if (keys["ArrowLeft"]){
            
        setTimeout(leftTurn(),2000);
                    
        console.log("L, " + positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle); 

    }else if (keys["ArrowRight"]){
        
        setTimeout(rightTurn(),2000);

                   
        console.log("R, " + positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle); 
    
    }else if(keys['ArrowUp'] && keys['ArrowDown']){
        
        positionY = positionY;
        positionX = positionX;

    }else if ( keys['ArrowLeft'] && keys['ArrowRight']){
       
        
            wheelTurnAngle = wheelTurnAngle;
        
    }
    
    if(keys['ArrowUp'] == false && keys['ArrowDown'] == false){
        positionY = positionY;
        positionX = positionX;
    }
    if ( keys['ArrowLeft'] == false && keys['ArrowRight'] == false){
           
           if(wheelTurnAngle < 1 & wheelTurnAngle != 1){
               wheelTurnAngle = 0
           }else if (wheelTurnAngle > 1 && wheelTurnAngle != 1){
                wheelTurnAngle = 0;
           }
           
       
    }

    console.log("positionX: " + positionX + ", positionY: " + positionY)
   requestAnimationFrame(checkKeys);
  
}

requestAnimationFrame(checkKeys);