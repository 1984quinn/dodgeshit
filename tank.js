var nails = [], difficulty = 6, num_of_tanks = 2, tanks = [];
for(var i = 0; i < num_of_tanks; i ++){
  var tank = {
    y: 0,
    speed: 0,
    ele: document.createElement('img')
  };
  document.querySelector('#canvas').appendChild(tank.ele);
  tank.ele.src = "tank.png";
  tank.ele.style.width = "100px";
  tank.ele.style.left = `${1000 - 120 * i - 100}px`;
  tank.ele.style.bottom = 0;
  tank.ele.style.position = "absolute";
  tanks.push(tank);
}
var jump = function(){
}
var gravity = function(){
  // adding nail
  if(Math.random() < 0.01){
    var nail = {
      x: 0,
      ele: document.createElement('img')
    };
    nail.ele.src = "nail.png";
    nail.ele.style.width = "20px";
    nail.ele.style.bottom = 0;
    nail.ele.style.position = "absolute";
    document.querySelector('#canvas').appendChild(nail.ele);
    nails.push(nail);
  }
  nails = nails.filter(function(nail){
    if(nail.x >= 1000){
      document.querySelector('#canvas').removeChild(nail.ele);
    }
    return nail.x < 1000;
  });


  // logic of tanks
  tanks.forEach(function(tank){
    tank.y += tank.speed;
    tank.y = tank.y < 0 ? 0 : tank.y; 
    if(tank.y){
      tank.speed -= 0.5;
    } else{
      tank.speed = 0;
    }
  });
  // logic of nails
  nails.forEach(function(nail){
    nail.x += difficulty;
  });


  // logic of game
  difficulty += 0.001;


  // render
  tanks.forEach(function(tank){
    tank.ele.style.bottom = `${tank.y}px`;
  });
  nails.forEach(function(nail){
    nail.ele.style.left = `${nail.x}px`;
  });
  window.requestAnimationFrame(gravity);
}
gravity();
document.onkeypress = function(ev){
  if(ev.charCode >= 49 && ev.charCode < 49 + num_of_tanks){
    var tank = tanks[ev.charCode - 49];
    if(tank.y == 0){
      tank.speed += 20;
    }
  }
};