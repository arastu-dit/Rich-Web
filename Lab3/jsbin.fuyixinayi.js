//Variable Declaration

const src = Rx.Observable
  .interval(100 /* ms */ )
  .timeInterval();

//The above creates a stream that
//emits an element every
//100 milliseconds. 

const canvas = document.getElementById('canvas');
const splitsList = document.getElementById('splits-list');
const digital = document.getElementById('digital');
let StartTimer = false;
let time = 0; 

const subscription = src.subscribe(
  x => {
    if(!StartTimer) return;
    time++;
    draw(time);
    digital.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
  });

//Above subscribes stream to function


//Below are clickable events

Rx.Observable.fromEvent(document.getElementById('start'), 'click')
  .subscribe(e => {
    StartTimer = true;
  });

Rx.Observable.fromEvent(document.getElementById('stop'), 'click')
  .subscribe(e => {
    StartTimer = false;
  });

Rx.Observable.fromEvent(document.getElementById('split'), 'click')
  .subscribe(e => {
    splitsList.innerHTML += digital.innerHTML + "<br/>";
  });

Rx.Observable.fromEvent(document.getElementById('reset'), 'click')
  .subscribe(e => {
    StartTimer = false;
    time = 0;
    draw(time);
    digital.innerHTML = "0:0:00";
    splitsList.innerHTML = "";
  });

//Clock drawn using JS Canvas API
const draw = (time) => {
  if (canvas.getContext) {
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    const watchSize = 100;
    const contentSize = 0.93;


    //Central dot of clock
    context.fillStyle = "Black";
    context.beginPath();
    context.arc(watchSize, watchSize, 2, 0, 2 * Math.PI, true);
    context.fill();


    context.strokeStyle = "MidnightBlue";
    context.beginPath();

    // Outer circle
    context.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);
    context.arc(watchSize, watchSize, watchSize - 3, 0, Math.PI * 2, true);

    //12 longer lines (1-12)
    for (let i = 0; i < 12; i++) {
      let angle = i * (Math.PI * 2 / 12);
      const armLength = watchSize * 0.15;
      context.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
      context.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);
    }

    //60 short lines
    for (let i = 0; i < 60; i++) {
      let angle = i * (Math.PI * 2 / 60);
      const armLength = watchSize * 0.05;
     context.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
     context.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);
    }

    //minutes arm
    let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
    let armLength = watchSize * 0.5;
    context.moveTo(watchSize, watchSize);
  context.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    //seconds arm
    angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
    armLength = watchSize * 1;
    context.moveTo(watchSize, watchSize);
    context.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    context.stroke();
  }
}

draw();