(function(){
  var ledText = document.getElementById('ledText');
  var ledScreen = document.getElementById('ledScreen');
  var msgInput = document.getElementById('msgInput');
  var speedRange = document.getElementById('speedRange');
  var sizeRange = document.getElementById('sizeRange');
  var colorPicker = document.getElementById('colorPicker');
  var bgPicker = document.getElementById('bgPicker');

  var scrollAnim = null;
  var scrollPos = 0;
  var currentColor = '#22D3EE';
  var currentBg = '#0F0F0F';
  var speed = 5;

  // Update text
  msgInput.addEventListener('input', function(){
    ledText.textContent = this.value || 'Type something...';
    resetScroll();
  });

  // Font size
  sizeRange.addEventListener('input', function(){
    ledText.style.fontSize = this.value + 'px';
  });

  // Speed
  speedRange.addEventListener('input', function(){
    speed = parseInt(this.value);
  });

  // Color swatches
  colorPicker.addEventListener('click', function(e){
    var swatch = e.target.closest('.color-swatch');
    if(!swatch) return;
    colorPicker.querySelectorAll('.color-swatch').forEach(function(s){ s.classList.remove('active'); });
    swatch.classList.add('active');
    currentColor = swatch.dataset.color;
    ledText.style.color = currentColor;
  });

  bgPicker.addEventListener('click', function(e){
    var swatch = e.target.closest('.color-swatch');
    if(!swatch) return;
    bgPicker.querySelectorAll('.color-swatch').forEach(function(s){ s.classList.remove('active'); });
    swatch.classList.add('active');
    currentBg = swatch.dataset.color;
    ledScreen.style.background = currentBg;
  });

  function resetScroll(){
    scrollPos = ledScreen.offsetWidth;
  }

  function animate(){
    var w = ledScreen.offsetWidth;
    var tw = ledText.offsetWidth;
    scrollPos -= speed * 1.2;
    if(scrollPos < -tw) scrollPos = w;
    ledText.style.transform = 'translateX(' + scrollPos + 'px)';
    scrollAnim = requestAnimationFrame(animate);
  }

  resetScroll();
  animate();

  // Fullscreen
  window.goFullscreen = function(){
    var el = ledScreen;
    if(el.requestFullscreen) el.requestFullscreen();
    else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if(el.msRequestFullscreen) el.msRequestFullscreen();
  };

  // Adjust on fullscreen change
  document.addEventListener('fullscreenchange', function(){
    if(document.fullscreenElement){
      ledScreen.style.minHeight = '100vh';
      ledText.style.fontSize = Math.min(parseInt(sizeRange.value) * 2, 200) + 'px';
    } else {
      ledScreen.style.minHeight = '200px';
      ledText.style.fontSize = sizeRange.value + 'px';
    }
    resetScroll();
  });

  // Keep screen awake in fullscreen (Wake Lock API)
  async function requestWakeLock(){
    try {
      if('wakeLock' in navigator){
        await navigator.wakeLock.request('screen');
      }
    } catch(e){}
  }
  document.addEventListener('fullscreenchange', function(){
    if(document.fullscreenElement) requestWakeLock();
  });

})();
