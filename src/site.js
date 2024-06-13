
let dragging = false;
let draggingElm;

let initTargetPos;
let initMousePos;


let frontZ = 1;

function initDraggables() {

    function onMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
  
      // save mouse position
      const mx = e.clientX
      const my = e.clientY
      initMousePos = {
        x: mx, 
        y: my
      };
  
      const styles = window.getComputedStyle(e.target);
      initTargetPos = {
        x: parseFloat(styles.left),
        y: parseFloat(styles.top),
      }
  
      // bring elm to front
      e.target.style.zIndex = `${frontZ}`
      frontZ += 1;
  
      e.target.style.cursor = 'grabbing';
  
      dragging = true;
      draggingElm = e.target;
  
    }
  
    function onMouseMove(e) {
  
      e.preventDefault();
      e.stopPropagation();
  
  
      // todo: how do we support multiple gestures?
      if (!dragging) { return; }

  
      // current position of mouse
      const mx = e.clientX
      const my = e.clientY
  
      // get initial pos
      const p0 = initTargetPos;
      const m0 = initMousePos;
  
  
      // get the mouse delta
      const dx = mx - m0.x
      const dy = my - m0.y
  
      const elm = draggingElm;
  
      // apply it to the initial position
      draggingElm.style.left = `${p0.x + dx}px`
      draggingElm.style.top = `${p0.y + dy}px`
  
    }
  
    function onMouseUp(e) {
      if (!dragging) return;
  
      e.preventDefault();
      e.stopPropagation();
  
      // current position of mouse
      const mx = e.clientX
      const my = e.clientY
  
      // get the mouse delta
      const m0 = initMousePos;
  
  
      function distSquared(x1, y1, x2, y2) {
        return Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
      }
  
      if (distSquared(mx, my, m0.x, m0.y) < 100){
        const clickFn = draggingElm.dataset.clickhandler;
        eval(clickFn);
      }
  
      e.target.style.cursor = 'grab';
  
      dragging = false;
      e.draggingElm = null;
  
       // e.target.classList.add("floating");
    }

  // init events

  const draggables = document.getElementsByClassName('draggable');
  for (const d of draggables) {
    d.addEventListener("pointerdown", onMouseDown, true);

    // const container = document.body;
    const container = d.parentElement;
    container.addEventListener("pointermove", onMouseMove, true);
    container.addEventListener("pointerup", onMouseUp, true);
    

    function preventBehavior(e) {
    e.preventDefault();
    };
    
    container.addEventListener("touchmove", preventBehavior, {passive: false});
    

    // this is to stop the onclick from bubbling up to
    // parent elements (we have our own clickHandler
    // system)
    d.addEventListener("click",  function (e) {
      e.stopPropagation();
    });

  }
  


}

initDraggables();

let rotationMagnitude = 10;
let scaleMagnitude = .2;
let translateXMag = 30;
let translateYMag = 10;

function randomizeRotation(elm) {
  let rot = Math.random() * rotationMagnitude - (rotationMagnitude / 2);
  elm.style.setProperty('--rotation', rot + 'deg');
 }


function randomizeTranslation() {
  return Math.random() * translateXMag - (translateXMag / 2);
}


function jitterElms(elms) {
  for (const elm of elms) {
    randomizeRotation(elm);


    // scale
    let scale = Math.random() * scaleMagnitude + 1;
    elm.style.setProperty('--scale', `${scale}`);

    let translateX = randomizeTranslation();

    // elm.style.setProperty('--translateX', `${translateX}%`);


    let translateY = randomizeTranslation();
    elm.style.setProperty('--translateY', `${translateY}%`);

  }
}

const allPhotos = document.getElementsByClassName('about-pile-image-container');
const fgPhotos = document.getElementsByClassName('about-pile-image-foreground');
const nicknacks = document.getElementsByClassName('nicknack');

// jitterElms(allPhotos);
jitterElms(fgPhotos);
jitterElms(nicknacks);


function positionForegroundPhotos() {
  let elms = document.getElementsByClassName('about-pile-image-foreground');
  elms = [...elms];

  elms.sort(() => {
    return 0.5 - Math.random();
  });

  const num = elms.length;
  for (let i = 0; i < num; i++) {
    const elm = elms[i];

    let top = Math.random() * 60 + 20;
    elm.style.setProperty('--top', `${top}%`);

    let interval = (100.0 / num);
    let offset = interval*i;
    let padding = interval / 6;
    let range = interval - padding*2;
    let left = padding + offset + Math.random()*range;
    elm.style.setProperty('--left', `${left}%`);
  }
}

positionForegroundPhotos();