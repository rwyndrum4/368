let canvas;
let context;
let t = 0;
let i = 0;
let model = {
  board: "......./......./......./......./......./......./",
  next: "X",
}


function tick() {
  window.requestAnimationFrame(splat);
}

function splat(n) {
  let d = n - t;
  t = n;
  context.clearRect(0,0,canvas.width = 860,canvas.height = 780)

  // Adapted from https://jayhawk-nation.web.app/examples/TicTacToe
  // Taken from https://www.html5canvastutorials.com/tutorials/html5-canvas-lines/
  for(let i = 0;i < 7;i++) {
    context.beginPath();
    context.moveTo(0, 120 + (i - 1) * 120);
    context.lineTo(840, 120 + (i - 1) * 120);
    context.strokeStyle = 'blue';
    context.lineWidth = 5;
    context.stroke();
    context.beginPath();
    context.moveTo(120 + i * 120, 0);
    context.lineTo(120 + i * 120, 720);
    context.strokeStyle = 'blue';
    context.lineWidth = 5;
    context.stroke();
  }
  context.font = "54pt Calibri"
  context.fillStyle = "red";

  for(let i = 0; i <= 7; i++) {
    for(let j = 0; j <= 6; j++) {
      let me = model.board.charAt(i + (j * 8));
      if (me != '.') {
	context.fillText(me, 40 + i * 120, 70 + j * 120);
      }
    }
  }
  context.font = "20pt Calibri"
  context.fillStyle = "green";

  context.fillText(JSON.stringify(model), 10, 760);

  tick();
}

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.querySelector("#myCanvas");
  console.log("Got here");
  context = canvas.getContext("2d");
  console.log(context);
  splat();
})

function roundMe(x){ return Math.ceil((x-20)/120)-1 }

document.addEventListener("click", e => {
  const [i,j] = [e.x,e.y].map(roundMe);
  if (i < 0 || i > 7) return;
  if (j < 0 || j >= 6) return;

  const ix = i + j * 8;
  if (model.board.charAt(ix) != '.') {
    return;
  }
  // gravity rule
  if(ix < 40 && model.board.charAt(ix + 8) == '.') {
    return;
  }

  function inarow(ix,n,direction) {
    switch (direction) {
    case 1: //right
        if(n < 4 && model.board.charAt(ix) == model.board.charAt(ix+1)) {
          console.log(n+1, 'in a row checking right')
          inarow(ix+1,n+1,1);
        }
        else if (n == 4) {
          console.log('Winner!', ix, 'to the right');
          return
        }
        else {
          return
        }

    case 2: //left
      if(n < 4 && model.board.charAt(ix) == model.board.charAt(ix-1)) {
        console.log(n+1, 'in a row checking left')
        inarow(ix-1,n+1,2);
      }
      else if (n == 4) {
        console.log('Winner!', ix, 'to the left');
        return
      }
      else {
        return
      }

    case 3: //up
      if(n < 4 && model.board.charAt(ix) == model.board.charAt(ix-8)) {
        console.log(n+1, 'in a row checking up')
        inarow(ix-8,n+1,3);

      }
      else if (n == 4) {
        console.log('Winner!', ix, 'this isnt gonna happen in a game');
        return
      }
      else {
        return
      }

    case 4: //down
      if(n < 4 && model.board.charAt(ix) == model.board.charAt(ix+8)) {
        console.log(n+1, 'in a row checking down')
        inarow(ix+8,n+1,4);

      }
      else if (n == 4) {
        console.log('Winner!', ix, 'down');
        return
      }
      else {
        return
      }

    case 5: //downleft
      if(n < 4 && model.board.charAt(ix) == model.board.charAt(ix+7)) {
        console.log(n+1, 'in a row checking up right')
        inarow(ix+7,n+1,5);
      }
      else if (n == 4) {
        console.log('Winner! up and right', ix);
        return
      }
      else {
        return
      }

      case 6: //downright
        if(n < 4 && model.board.charAt(ix) == model.board.charAt(ix+9)) {
          console.log(ix, n+1, 'in a row checking up left')
          inarow(ix+9,n+1,6);
        }
        else if (n == 4) {
          console.log('Winner! up and left', ix);
          return
        }
        else {
          return
        }

        case 7: //upleft
          if(n < 4 && model.board.charAt(ix) == model.board.charAt(ix-9)) {
            console.log(n+1, 'in a row checking down and right')
            inarow(ix-9,n+1,7);
          }
          else if (n == 4) {
            console.log('Winner! down and right', ix);
            return
          }
          else {
            return
          }
        case 8: //upright
          if(n < 4 && model.board.charAt(ix) == model.board.charAt(ix-7)) {
            console.log(n+1, 'in a row checking up and right')
            inarow(ix-7,n+1,8);
          }
          else if (n == 4) {
            console.log('Winner! up and right', ix);
            return
          }
          else {
            return
          }

      }
  }

//check for directions on win
  function checkwin(ix) {
    if(model.board.charAt(ix) == model.board.charAt(ix+1) && model.board.charAt(ix) != '.') { //check to the right
      if(model.board.charAt(ix) == model.board.charAt(ix-1))
      {
        inarow(ix,2,1);
      }
      else {
      inarow(ix,1,1);
      }
    }
    else if(model.board.charAt(ix) == model.board.charAt(ix-1) && model.board.charAt(ix) != '.') { //check to the left
      if(model.board.charAt(ix) == model.board.charAt(ix+1))
      {
        inarow(ix,2,2);
      }
        inarow(ix,1,2);
    }
    else if(model.board.charAt(ix) == model.board.charAt(ix-8) && model.board.charAt(ix) != '.') { //check above
      if(model.board.charAt(ix) == model.board.charAt(ix+8))
      {
        inarow(ix,2,3);
      }
        inarow(ix,1,3);
    }
    else if(model.board.charAt(ix) == model.board.charAt(ix+8) && model.board.charAt(ix) != '.') { //check below
        inarow(ix,1,4);
    }
    else if(model.board.charAt(ix) == model.board.charAt(ix+7) && model.board.charAt(ix) != '.') { //check downleft
      if(model.board.charAt(ix) == model.board.charAt(ix-7))
      {
        inarow(ix,2,5);
      }
        inarow(ix,1,5);
    }
    else if(model.board.charAt(ix) == model.board.charAt(ix+9) && model.board.charAt(ix) != '.') { //check downright
      if(model.board.charAt(ix) == model.board.charAt(ix-9))
      {
        inarow(ix,2,6);
      }
        inarow(ix,1,6);
    }
    else if(model.board.charAt(ix) == model.board.charAt(ix-9) && model.board.charAt(ix) != '.') { //check upleft
      if(model.board.charAt(ix) == model.board.charAt(ix+9))
      {
        inarow(ix,2,7);
      }
        inarow(ix,1,7);
    }
    else if(model.board.charAt(ix) == model.board.charAt(ix-7) && model.board.charAt(ix) != '.') { //check upright
      if(model.board.charAt(ix) == model.board.charAt(ix+7))
      {
        inarow(ix,2,8);
      }
        inarow(ix,1,8);
    }

  }

  console.log(i,j,ix)
  model.board =
    model.board.slice(0,ix) +
    model.next +
    model.board.slice(ix+1,48)

    checkwin(ix);

  if (model.next == 'X') {
    model.next = 'O'
  } else if (model.next == 'O') {
    model.next = 'X'
  }

})
