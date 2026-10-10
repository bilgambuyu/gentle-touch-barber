(function(){
  // Open/closed status in Vienna time
  try{
    var parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Vienna',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
    var get=function(t){var p=parts.find(function(x){return x.type===t});return p?p.value:''};
    var map={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
    var d=map[get('weekday')], mins=parseInt(get('hour'),10)*60+parseInt(get('minute'),10);
        var open=d!==0 && mins>=600 && mins<1140;
    var s=document.getElementById('status'), t=document.getElementById('status-text');
    s.classList.add(open?'open':'closed');
    if(open) t.textContent='Open now · until 19:00';
    else if(d!==0 && mins<600) t.textContent='Closed · opens at 10:00';
    else t.textContent='Closed · opens '+((d===6||d===0)?'Monday':'tomorrow')+' 10:00';
  }catch(e){}

  // Google Maps embed: shown on the live site; the drawn map stays as fallback in previews that block embeds
  try{
    var h=location.hostname;
    var preview=/claude|anthropic|claudeusercontent/.test(h)||h===''||location.protocol==='file:';
    if(!preview){
      var f=document.createElement('iframe');
      f.src='https://www.google.com/maps?q=GentleTouch+Barber,+Neubaug%C3%BCrtel+22,+1070+Wien&output=embed';
      f.title='Map: Gentle Touch Barber, Neubaugürtel 22, 1070 Wien';
      f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';f.allowFullscreen=true;
      document.getElementById('map').appendChild(f);
      document.getElementById('map-fallback').hidden=true;
    }
  }catch(e){}
  // Copy phone number
  var b=document.getElementById('copy-phone');
  b.addEventListener('click',function(){
    var n='0688 64239919';
    var done=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy number'},1800)};
    try{navigator.clipboard.writeText(n).then(done,function(){sel()})}catch(e){sel()}
    function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('phone'));var w=getSelection();w.removeAllRanges();w.addRange(r);b.textContent='Selected · copy it'}
  });
})();
