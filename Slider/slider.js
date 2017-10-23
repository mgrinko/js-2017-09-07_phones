'use strict';

const KEYBOARD_STEP = 3;
const WHEEL_STEP = 30;

const LEFT_BUTTON_CODE = 37;
const RIGHT_BUTTON_CODE = 39;


class Slider {
  constructor(options) {
    this._element = options.element;
    this._thumbElement = this._element.querySelector('.slider__thumb');

    this._maxLeft = this._element.clientWidth - this._thumbElement.offsetWidth;
    this._currentLeft = parseFloat(getComputedStyle(this._thumbElement).left);

    this._onDocumentMouseMove = this._onDocumentMouseMove.bind(this);
    this._onDocumentMouseUp = this._onDocumentMouseUp.bind(this);
    this._onThumbMouseDown = this._onThumbMouseDown.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onDocumentLeftKeyDown = this._onDocumentLeftKeyDown.bind(this);
    this._onDocumentRightKeyDown = this._onDocumentRightKeyDown.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this._thumbElement.addEventListener('mousedown', this._onThumbMouseDown);

    this._element.addEventListener('wheel', (event) => {
      event.preventDefault();

      this.move(this._currentLeft + event.deltaY / WHEEL_STEP);
    });

    this._element.addEventListener('mouseenter', this._onMouseEnter);
  }

  move(left) {
    left = Math.max(left, 0);
    left = Math.min(left, this._maxLeft);

    this._currentLeft = left;
    this._thumbElement.style.left = left + 'px';
  }

  _onThumbMouseDown() {
    document.addEventListener('mousemove', this._onDocumentMouseMove);
    document.addEventListener('mouseup', this._onDocumentMouseUp);
  }

  _onDocumentMouseMove(event) {
    let containerPosition = this._element.getBoundingClientRect();

    this.move(event.clientX - containerPosition.left)
  }

  _onDocumentMouseUp() {
    document.removeEventListener('mousemove', this._onDocumentMouseMove);
    document.removeEventListener('mouseup', this._onDocumentMouseUp);
  }

  _onMouseEnter(event) {
    document.addEventListener('keydown', this._onDocumentLeftKeyDown);
    document.addEventListener('keydown', this._onDocumentRightKeyDown);
    this._element.addEventListener('mouseleave', this._onMouseLeave);
  }

  _onDocumentLeftKeyDown(event) {
    if (event.keyCode === LEFT_BUTTON_CODE) {
      this.move(this._currentLeft - KEYBOARD_STEP);
    }
  }

  _onDocumentRightKeyDown(event) {
    if (event.keyCode === RIGHT_BUTTON_CODE) {
      this.move(this._currentLeft + KEYBOARD_STEP);
    }
  }

  _onMouseLeave(event) {
    document.removeEventListener('keydown', this._onDocumentLeftKeyDown);
    document.removeEventListener('keydown', this._onDocumentRightKeyDown);
    this._element.removeEventListener('mouseleave', this._onMouseLeave);
  }
}