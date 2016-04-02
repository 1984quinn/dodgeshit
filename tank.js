var nails = [], difficulty = 6, num_of_tanks = localStorage.num_of_tanks, tanks = [], keys = 'afjp', champion = null;
num_of_tanks = num_of_tanks || 2;
for(var i = 0; i < num_of_tanks; i ++){
  var tank = {
    y: 0,
    speed: 0,
    ele: document.createElement('img'),
    title: document.createElement('span'),
    key: keys[i].toUpperCase(),
    keyCharCode: keys.charCodeAt(i)
  };
  document.querySelector('#canvas').appendChild(tank.ele);
  tank.ele.src = "tank.png";
  tank.ele.style.width = "100px";
  tank.x = 1000 - 120 * (num_of_tanks - i)
  tank.ele.style.left = `${tank.x}px`;
  tank.ele.style.position = "absolute";


  document.querySelector('#canvas').appendChild(tank.title);
  tank.title.style.width = "100px";
  tank.title.style.left = `${tank.x}px`;
  tank.title.style.bottom = `10px`;
  tank.title.style.position = "absolute";
  tank.title.style.textAlign = "center";
  tank.title.innerText = `${tank.key}`;

  tanks.push(tank);
}
var jump = function(tank){
  if(tank.y == 0 && !tank.dead){
    tank.speed += 20;
  }
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
    nail.ele.style.bottom = "50px";
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
  tanks.forEach(function(tank, tank_i){
    // gravity
    if(tank !== champion){
      tank.y += tank.speed;
      tank.y = tank.y < 0 ? 0 : tank.y; 
      if(tank.y){
        tank.speed -= 0.5;
      } else{
        tank.speed = 0;
      }
    }
    // death of tank
    if(tank.y < 50){
      nails.forEach(function(nail){
        if(nail.x > tank.x && nail.x < tank.x + 100){
          tank.dead = true;
          tank.ele.style.transform = "rotate(180deg)";

          // check champion tank
          var alive_tanks = tanks.filter(function(the_tank){
            return !the_tank.dead;
          });
          if(alive_tanks.length == 1){
            champion = alive_tanks[0];
            champion.y = 200;
            champion.speed = 0;
            champion.title.innerText = `${champion.key} is the champion`;
          }
        }
      });
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
    tank.ele.style.bottom = `${tank.y + 30}px`;
  });
  nails.forEach(function(nail){
    nail.ele.style.left = `${nail.x}px`;
  });
  window.requestAnimationFrame(gravity);
}
gravity();
document.onkeypress = function(ev){
  tanks.forEach(function(tank){
    if(ev.charCode == tank.keyCharCode){
      jump(tank);
    }
  });
};