    (function(){
      if('serviceWorker' in navigator && ['http:','https:'].includes(location.protocol)){
        window.addEventListener('load', function(){
          navigator.serviceWorker.register('./sw.js')
            .then(function(r){ console.log('Service Worker registrado con éxito:', r.scope); })
            .catch(function(err){ console.error('Error al registrar Service Worker', err); });
        });
      }
    })();
