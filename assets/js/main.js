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

  // Parallax: layers drift at different speeds while scrolling
  (function(){
    var mq=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mq&&mq.matches) return;
    var layers=[];
    function add(el,speed,frame){ if(el) layers.push({el:el,speed:speed,frame:frame||el}); }
    add(document.querySelector('.hero-photo img'),0.10,document.querySelector('.hero-photo'));
    add(document.querySelector('.hero-copy'),-0.06);
    document.querySelectorAll('.gallery figure').forEach(function(f,i){ add(f.querySelector('img'), i%2?0.14:0.08, f); });
    add(document.querySelector('.about-photo img'),0.12,document.querySelector('.about-photo'));
    var heroPhoto=document.querySelector('.hero-photo');
    var ticking=false;
    function update(){
      ticking=false;
      var vh=window.innerHeight;
      layers.forEach(function(l){
        var r=l.frame.getBoundingClientRect();
        if(r.bottom<-200||r.top>vh+200) return;
        var off=(r.top+r.height/2)-vh/2;
        var y=-off*l.speed;
        var max=r.height*0.11; if(y>max)y=max; if(y<-max)y=-max;
        l.el.style.translate='0 '+y.toFixed(1)+'px';
      });
      if(heroPhoto){
        var hr=heroPhoto.getBoundingClientRect();
        heroPhoto.style.setProperty('--frame-y',(-(hr.top+hr.height/2-vh/2)*0.06).toFixed(1)+'px');
      }
    }
    function onScroll(){ if(!ticking){ ticking=true; requestAnimationFrame(update); } }
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    update();
  })();
  // Copy phone number
  var b=document.getElementById('copy-phone');
  b.addEventListener('click',function(){
    var n='0688 64239919';
    var done=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy number'},1800)};
    try{navigator.clipboard.writeText(n).then(done,function(){sel()})}catch(e){sel()}
    function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('phone'));var w=getSelection();w.removeAllRanges();w.addRange(r);b.textContent='Selected · copy it'}
  });
})();
