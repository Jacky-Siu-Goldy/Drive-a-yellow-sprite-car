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
var slowDownOrSpeedUp = true;
//var image = new Image();

let handle;

let keysPressed = new Set();

var  upArrow = false,
     downArrow = false,
     rightArrow = false,
     leftArrow = false,
     upRight = false,
     upLeft = false,
     downRight = false,
     downLeft = false,
     stationary = true; 

var rise = Math.sin(rotationAngle * (Math.PI / 180)),
    run = Math.cos(rotationAngle * (Math.PI/180)),
    riseOverRun = (rise/run),
    runOverRise = (run/rise),
    carAngle = 0;

var distanceTraveledXaxis = 0,
    distanceTraveledYaxis = 0,
    distanceWanted = 11,
    velocityWanted = distanceWanted/(1000/60);
     

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
    if ( upRight ){
        
        /*if(slowDownOrSpeedUp && distanceWanted <14){
            distanceWanted +=1;
        }else if(distanceWanted == 14){
            distanceWanted -=1;
            slowDownOrSpeedUp = false;
        }else if (distanceWanted == 8){
            distanceWanted +=1;
            slowDownOrSpeedUp = true
        }else if(!slowDownOrSpeedUp && distanceWanted > 8 && distanceWanted < 14){
            distanceWanted -=1;
        }*/
        //distanceWanted = 14
        //velocityWanted = distanceWanted/(1000/60);
        
            wheelTurnAngle = 3 * (distanceWanted / 11);
        
        if (rotationAngle < 0 ){
            rotationAngle += 360;
            
        }else if(rotationAngle >= 360){
            rotationAngle -=360;
        }
        console.log(""+ distanceWanted);
     
    rotationAngle -= wheelTurnAngle;
    console.log("Right Turn Angle: " + wheelTurnAngle + ", Forward Right Turn");
    
    }else if (downRight){
      
            wheelTurnAngle = 3 * (distanceWanted / 11);
        
        if (rotationAngle < 0){
            rotationAngle += 360;
            
        }else if(rotationAngle >= 360){
            rotationAngle -=360;
        }
        rotationAngle += wheelTurnAngle;
        console.log("Down Turn Angle: " + wheelTurnAngle + ", Forward Right Turn");
    }
    
   
}

function oneMoreTry(x,y){
   
    let 
        aRise = Math.sin(rotationAngle * (Math.PI / 180)),//* orY;
        
        aRun = Math.cos(rotationAngle * (Math.PI / 180));//* orX;
       
        
        console.log("aRun: " + aRun);
        console.log("calculatedSine: " + aRise);
        console.log ("calculatedCosine: " + aRun);
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
        whereItsFacingPointOnTheRadiusX = Math.round(positionX + x *aRun *20);//cosineRun * 50;
        whereItsFacingPointOnTheRadiusY = Math.round(positionY + y *aRise *20);//sineRise * 50;
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
    distanceTraveledXaxis = (1000/60) * Math.sqrt(Math.pow(velocityWanted,2)/ (Math.pow(riseOverRun,2) + 1));
    distanceTraveledYaxis = (1000/60) * Math.sqrt(Math.pow(velocityWanted,2)/ (Math.pow(runOverRise,2) + 1));
    console.log("Distance Traveled X: " + distanceTraveledXaxis);
    console.log("Distance Traveled Y: " + distanceTraveledYaxis);
    
}
function leftTurn(){
    
    
  
    if (upLeft){
        
        
            wheelTurnAngle = 3 * (distanceWanted / 11);
        
    
     
        rotationAngle += wheelTurnAngle ;
        if (rotationAngle < 0 ){
            rotationAngle += 360;
            
        }else if(rotationAngle >= 360){
            rotationAngle -=360;
        }
    console.log("Left Turn Angle: " + wheelTurnAngle + ", Forward Left Turn");

    }else if (downLeft){
        
            wheelTurnAngle = 3 * (distanceWanted / 11);
        
        
        rotationAngle -= wheelTurnAngle ;
        
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
            positionX = (positionX + Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY + Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(1, -1);
        }else if (rise == -1 && Math.abs(run) < 0.000001){
            positionX = positionX || 500;
            positionY = (positionY +  Math.floor(distanceTraveledYaxis))|| 450;
            oneMoreTry(0, 1);
        }else if (rise > -1 && rise < 0 && run > -1 && run < 0){
            positionX = (positionX - Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY +  Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(1, -1);
        }else if(rise == 0 & Math.abs(run) < -1){
            positionX = (positionX - Math.floor(distanceTraveledXaxis)) || 500;
            positionY = positionY || 450;
            oneMoreTry(-1, 0);
        }else if (rise < 1 && rise > 0 && run > -1 && run < 0){
            positionX = (positionX - Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY -  Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(1, -1);
        }else if (rise == 1 && Math.abs(run) < 0.000001){
            positionX = positionX ||500 ;
            positionY = (positionY -  Math.floor(distanceTraveledYaxis))|| 450;
            oneMoreTry(0, -1);
        }else if (rise < 1 && rise > 0 && run > 0 && run < 1){
            positionX = (positionX + Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY -  Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(1, -1);
        }else if (rise == 0 && run == 1){
            if (rotationAngle == 0){
                carAngle = 90;
            }else{
                carAngle = 90 - rotationAngle;
            }
            positionX = (positionX + Math.floor(distanceTraveledXaxis)) || 500;
            positionY = positionY || 450;
            oneMoreTry(1 , 0);
        }else if (Math.abs(rise) < 0.00001 && run == -1){
            positionX = (positionX - Math.floor(distanceTraveledXaxis)) || 500;
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
            positionX = (positionX - Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY -  Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(-1, 1);
        }else if (rise == -1 && Math.abs(run) < 0.000001){
            positionX = positionX || 500;
            positionY = (positionY -  Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(0, -1);
        }else if (rise > -1 && rise < 0 && run > -1 && run < 0){
            positionX = (positionX + Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY -  Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(-1, 1);
        }else if(rise  == 0 && run == -1){
            positionX = (positionX + Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY) || 450;
            oneMoreTry(1, 0);
        }else if (rise < 1 && rise > 0 && run > -1 && run < 0){
            positionX = (positionX + Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY +  Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(-1, 1);
        }else if(rise == 1 && Math.abs(run) < 0.000001){
            positionX = (positionX) ||500;
            positionY = (positionY +  Math.floor(distanceTraveledYaxis)) || 450 ;
            oneMoreTry(0, 1);
            console.log("DTY : " + distanceTraveledYaxis);
        }else if (rise < 1 && rise > 0 && run < 1 && run > 0){
            positionX = (positionX - Math.floor(distanceTraveledXaxis))|| 500;
            positionY = (positionY + Math.floor(distanceTraveledYaxis)) || 450;
            oneMoreTry(-1, 1);
           
        }else if (rise == 0 && run == 1){
            if (rotationAngle == 0){
                carAngle = 90;
            }else{
                carAngle = 90 - rotationAngle;
            }
            positionX = (positionX - Math.floor(distanceTraveledXaxis)) || 500;
            positionY = (positionY) || 450;
            oneMoreTry(-1, 0);
        }else if (Math.abs(rise) < 0.00001 && run == -1){
            
            positionX = (positionX + Math.floor(distanceTraveledXaxis)) || 500;
            positionY = positionY || 450;
            oneMoreTry(1 , 0);
        }
        
    }
   

}


////////////////////////////////////////////////////  
addEventListener("keydown", function (event){
    if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight" ){
        event.preventDefault();
    }
    
    keysPressed.add(event.key);
    try{
        keysPressed.forEach(elt => {
            if (elt === "ArrowUp"){
                upArrow = true;
            }else if (elt === "ArrowDown"){
                downArrow = true;
            }else if (elt === "ArrowRight"){
                rightArrow = true;
            }else if (elt === "ArrowLeft"){
                leftArrow = true;
            }else if (elt === ""){
                stationary = true;
            }

            if(!upArrow && !downArrow && !leftArrow && !rightArrow){
                throw("stop");
            }else if (upArrow && rightArrow && !downArrow && !leftArrow){
                throw("upRight");
            }else if(upArrow && leftArrow && !downArrow && !rightArrow){
                throw("upLeft");
            }else if(downArrow && rightArrow & !upArrow && !leftArrow){
                throw("downRight");
            }else if(downArrow && leftArrow && !upArrow && !rightArrow){
                throw("downLeft");
            }else if(upArrow && downArrow && !leftArrow && !rightArrow){
                throw("upDown");
            }else if(!upArrow && !downArrow && leftArrow && rightArrow){
                throw("leftRight");
            }else if(upArrow && downArrow && leftArrow && rightArrow){
                throw("upDownLeftRight");
            }
        })
    } catch (e){
        if (e === "stop"){
            upRight = upLeft = downRight = downLeft = upArrow = downArrow = rightArrow = leftArrow= false;
            stationary = true;
        }else if(e === "upRight"){
            upRight = true;
            
        }else if (e === "upLeft"){
            upLeft = true
            
        }else if (e ==="downRight"){
            downRight = true
            
        }else if (e === "downLeft"){
            downLeft = true;
            
        }else if (e === "upDown"){
            upRight = upLeft = downRight = downLeft = upArrow = downArrow = rightArrow = leftArrow= false;
            stationary = true;
        }else if (e === "leftRight"){
            upRight = upLeft = downRight = downLeft = upArrow = downArrow = rightArrow = leftArrow= false;
            stationary = true;
        }else if (e === "upDownLeftRight"){
            upRight = upLeft = downRight = downLeft = upArrow = downArrow = rightArrow = leftArrow= false;
            stationary = true;
        }
    }
   
    
    

    
});

addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "ArrowLeft"){
    upRight = upLeft = downRight = downLeft = rightArrow = leftArrow = false;
    } else if (event.key === "ArrowRight"){
        upRight = upLeft = downRight = downLeft = rightArrow = rightArrow = false;
    } else{
        upRight = upLeft = downRight = downLeft = upArrow = downArrow = rightArrow = leftArrow= false;
    }
    keysPressed.delete(event.key);
   
    
})

function checkKeys(){
    
    //wheelTurnAngle = 0;
    positionManipulationFormula();
    
    if (upLeft){
        
        arrowUp();
        leftTurn();
               
        console.log("U, L, "+positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle); 
    }else if (upRight){ 
       
        arrowUp();
        rightTurn();
        
        console.log("U, R, "+positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle); 
      
    }else if (upArrow){ 
        
        arrowUp();
        
        console.log("U, "+positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle);
    }else if (downLeft){
        
        arrowDown();
        leftTurn();

        console.log("D, L, " + positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle);
    }else if (downRight){
        
        arrowDown();
        rightTurn();
       
        
        console.log("D, R,  " + positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle);
    }else if (downArrow){
        
        arrowDown();
        
        console.log("D, " + positionX + "," + positionY);
        console.log("Rotation Angle: " + rotationAngle);
    
    }else if (stationary){
        positionX = positionX;
        positionY = positionY;
    }
    

    console.log("positionX: " + positionX + ", positionY: " + positionY)
    
    requestAnimationFrame(checkKeys);
    
  
}
checkKeys();

//requestAnimationFrame(checkKeys);