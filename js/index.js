// function([string1, string2],target id,[color1,color2])    
 consoleText([
   'Hello darling.',
   "It's your nerdy husband.",
   'Wishing you a very, very...',
   'INCREDIBLY nerdy...',
   'HAPPY BIRTHDAY!!!',
 'I love you with all my heart.',
 'And wish I could be with you on your special day.',
 "Here's a little birthday puzzle for you.",
   "You'll like it.  There's cake involved."
], 'text',['tomato','rebeccapurple','lightblue']);

hideContainer("wrapper");

function consoleText(words, id, colors) {

  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {
    
    if (letterCount === 0 && waiting === false) { 
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
//        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  
  window.setInterval(function() {
    
    if( words.length === 0 ){
      showContainer("wrapper");
      con.className = 'console-underscore hidden'
    }
    else
      {
          if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;

          } else {
            con.className = 'console-underscore'

            visible = true;
          }
      }
    
  }, 400)
}

const candles = document.querySelectorAll('.candle');
const instructions = document.querySelector('.instructions');
const relightButton = document.querySelector('.relight__btn');

function hideContainer(className){
   document.getElementsByClassName('wrapper')[0].style.visibility = 'hidden' 
}

function showContainer(className){
   document.getElementsByClassName('wrapper')[0].style.visibility = 'visible' 
}

const toggleIsLit = ( e ) => {
  e.currentTarget.classList.toggle('candle--is-lit');
  try{
    e.currentTarget.previousElementSibling.classList.toggle('candle--is-lit');
  } catch(err) {
    console.log('PrevSibling is null, targeting last child.')
    e.currentTarget.parentElement.lastElementChild.classList.toggle('candle--is-lit');
  }
  try{
    e.currentTarget.nextElementSibling.classList.toggle('candle--is-lit');
  } catch(err) {
    console.log('nextSibling is null, targeting first child.')
    e.currentTarget.parentElement.firstElementChild.classList.toggle('candle--is-lit');
  }
}

const lightCandle = ( candle ) => {
  const glow = document.createElement('div');
  const shadow = document.createElement('div');
  const inner = document.createElement('div');
  const outer = document.createElement('div');
  let deg = Math.random()*-25;  
  candle.style.animationDelay = `${deg}s`;
  candle.classList.add('candle--is-lit');
  glow.classList.add('candle__glow');
  shadow.classList.add('candle__shadow');
  outer.classList.add('candle__flame--outer');
  inner.classList.add('candle__flame--inner');
  candle.appendChild(glow);
  candle.appendChild(shadow);
  candle.appendChild(outer);
  candle.appendChild(inner);
}

const instructionsIsShowing = () => instructions.classList.toggle('instructions--is-showing');

const init = () => {
  candles.forEach( (candle) => {
  lightCandle(candle);
  candle.addEventListener('click', toggleIsLit, false);
});
}

const reset = () => {
  candles.forEach( (candle) => candle.classList.add('candle--is-lit'));
}

instructions.addEventListener('click', instructionsIsShowing);

relightButton.addEventListener('click', reset);

init();
instructionsIsShowing();