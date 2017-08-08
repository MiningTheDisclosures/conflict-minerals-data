import './style.css';

function component() {
  var element = document.createElement('div');

  element.innerHTML = 'Hello world';
  element.classList.add('hello');
  element.classList.add('world');
  return element;
}

document.body.appendChild(component());

