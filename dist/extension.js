(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

const loaderId = setInterval(() => {
  if (!window._gmailjs) {
    return;
  }

  clearInterval(loaderId);
  startExtension(window._gmailjs);
}, 100);

function onAction(compose, originalSendButton) {
  if (!compose.subject()) {
    alert('Please enter a subject');
    compose.dom('subjectbox').focus();
    return;
  }
  originalSendButton.click();
}

function onClickSend(event, compose, originalSendButton) {
  onAction(compose, originalSendButton);
}

function startExtension(gmail) {
  window.gmail = gmail;

  gmail.observe.on('load', () => {
    gmail.observe.on('compose', function (compose, type) {
      const sendButton = compose.find('.gU.Up div[role=button]').first();

      const sendButtonOverlay = document.createElement('div');
      sendButtonOverlay.id = 'custom-send-button';
      sendButtonOverlay.className = sendButton.attr('class');
      sendButtonOverlay.innerHTML = 'Send';
      sendButtonOverlay.setAttribute('role', 'button');
      sendButtonOverlay.setAttribute('aria-hidden', 'true');
      sendButtonOverlay.setAttribute('data-tooltip', 'Send ‪(⌘Enter)');
      sendButtonOverlay.setAttribute('aria-label', 'Send ‪(⌘Enter)');
      sendButtonOverlay.setAttribute('data-tooltip-delay', '800');
      sendButtonOverlay.setAttribute(
        'style',
        'user-select: none;position: absolute;z-index: 999999;'
      );

      sendButtonOverlay.addEventListener('click', (event) => {
        onClickSend(event, compose, sendButton);
      });

      sendButton.parent().prepend(sendButtonOverlay);
    });
  });
}

},{}]},{},[1]);
