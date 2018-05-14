//loadView

//metodo pra carregamento de conteudo das parciais
var pageLoaded = null;

var markerTipo;

var map, idWatch, markerUser, markerPlace, accRadius, autocomplete;

var markersUser = [];

var markersPlace = [];

var markersSearch = [];

var markersRegistrado = [];

var markersTemp = [];

var searchResults, userResults;

var filtroRaio = 100;

var markerUserLoaded = false;

function loadView(tag, url, transition, callback) {
    if (url == '') {
      $(tag).html('');

      pageLoaded = '';
    } else {

      $('<link>')
      .appendTo('head')
      .attr({
          type: 'text/css',
          rel: 'stylesheet',
          href: 'pages/' + url + '/' + url + '.css'
      });

      $(tag).load('pages/' + url + '/' + url + '.html', function (jqXHR, textStatus, responseText) {

        pageLoaded = url;

          $.getScript( 'pages/' + url + '/' + url + '.js')
            .done(function (script, textStatus, responseText) {

              $(tag).show();

              if (callback && typeof(callback) === "function") {
                callback();
              };
            })
            .fail (function (jqxhr, settings, exception) {
              window.alert(exception)
            });

      }).hide();
    }
};

//Troca subview com fade
function trocaSubview(aparece, some) {
  let target = $('.'+aparece).attr('data-target');

  $('#'+some).removeClass('show-opacity').addClass('hide-opacity');

  setTimeout(function () {
    loadView('nm-content', aparece, 'none', function () {
      setTimeout(function () {
        $('#'+aparece).removeClass('hide-opacity').addClass('show-opacity');
      }, 200);
    });
  }, 200);

};

//VALIDADOR DE EMAIL COM O BANCO DE DADOS
function validarEmail(data, div, callback) {

  $.ajax({
    type : 'GET',
    url  : 'https://www.esbrubles.com.br/nitemapp/ver_email2.php',
    data: 'email=' + data + '&fromLogin=fromLogin',
    cache: false,
    beforeSend: function() {
      div.parent().find('.fas').toggleClass('fa-spinner fa-pulse');
    },
    success: function(jqXHR, data, response) {
      div.parent().find('.fas').toggleClass('fa-spinner fa-pulse');
      if (callback && typeof(callback) === "function") {
        callback(response);
      }

    },
    error: function(jqXHR, response) {
      window.alert(response);
    }
  });
};


//ADICIONA USUARIO AO DB
function addRowUser(target, formdata, callback) {

  $.ajax({
    type : 'POST',
    url  : 'https://www.esbrubles.com.br/nitemapp/register.php',
    data : formdata,
    cache: false,
    beforeSend: function() {
      $('#'+target.id).prop( "disabled", true ).find('.fas').addClass('fa-spinner fa-pulse');
    },
    success :  function(data, response) {
      if (callback && typeof(callback) === "function") {
        callback(data, response);
      }
    },
    error: function(jqXHR, data, response) {
      window.alert(jqXHR, response)
    }
  });
};

function recuperaSenha (target, formdata, callback) {
  $.ajax({
    type : 'POST',
    url  : 'https://www.esbrubles.com.br/nitemapp/sendmail.php',
    data : formdata,
    cache: false,
    beforeSend: function() {
      $('#'+target.id).prop( "disabled", true ).find('.fas').addClass('fa-spinner fa-pulse');
    },
    success :  function(data, response) {

      $('#'+target.id).prop( "disabled", false ).find('.fas').removeClass('fa-spinner fa-pulse');

      if (callback && typeof(callback) === "function") {
        callback(data, response);
      }

    },
    error: function(jqXHR, data, response) {
      window.alert(jqXHR, response)
    }
  });
}

//APLICA ID AO LOGIN (NAO IMPORTA A ORIGEM)
function setUserId(userId, first) {
  localStorage.setItem('id', userId);

  if (first == 'sim') {
    localStorage.setItem('first', 'true')
  }

  loadView('nm-header', '', 'none')
  loadView('nm-content', 'index_valida-logado', 'none');
};

//FAZ LOGIN COM BANCO DE DADOS
function loginEmail(target, data, callback) {

  $.ajax({
    type : 'POST',
    url  : 'https://www.esbrubles.com.br/nitemapp/login.php',
    data : data,
    cache: false,
    beforeSend: function() {
      $('#'+target.id).prop( "disabled", true ).find('.fas').toggleClass('fa-spinner fa-pulse');
    },
    success :  function(response) {

      $('#'+target.id).prop( "disabled", true ).find('.fas').toggleClass('fa-spinner fa-pulse');
      var JSONString = response; // Replace ... with your JSON String

      var JSONObject = $.parseJSON(JSONString);

      if (callback && typeof(callback) === "function") {
        callback(data, JSONObject);
      }

    },
    error: function(jqXHR, response) {
      window.alert(jqXHR, response)
    }
  });
};

//Valida o codigo enviado por email para trocar a senha
function verificaCodigo(target, data, callback) {

  $.ajax({
    type : 'POST',
    url  : 'https://www.esbrubles.com.br/nitemapp/vercodigo.php',
    data : data,
    cache: false,
    beforeSend: function() {
      $('#'+target.id).prop( "disabled", true ).find('.fas').toggleClass('fa-spinner fa-pulse');
    },
    success :  function(response, data) {

      $('#'+target.id).prop( "disabled", false ).find('.fas').toggleClass('fa-spinner fa-pulse');
      var JSONString = response; // Replace ... with your JSON String

      var JSONObject = $.parseJSON(JSONString);

      if (callback && typeof(callback) === "function") {
        callback(data, JSONObject);
      }

    },
    error: function(jqXHR, response) {
      window.alert(jqXHR, response)
    }
  });
};

//Renova a senha
function renovarSenha(target, data, callback) {

  $.ajax({
    type : 'POST',
    url  : 'https://www.esbrubles.com.br/nitemapp/updatesenha.php',
    data : data,
    cache: false,
    beforeSend: function() {
      $('#'+target.id).prop( "disabled", true ).find('.fas').toggleClass('fa-spinner fa-pulse');
    },
    success :  function(response, data) {

      $('#'+target.id).prop( "disabled", false ).find('.fas').toggleClass('fa-spinner fa-pulse');
      // var JSONString = response; // Replace ... with your JSON String
      //
      // var JSONObject = $.parseJSON(JSONString);

      if (callback && typeof(callback) === "function") {
        callback(data, response);
      }

    },
    error: function(jqXHR, response) {
      $('#'+target.id).prop( "disabled", false ).find('.fas').toggleClass('fa-spinner fa-pulse');
      window.alert(jqXHR, response)
    }
  });
};

//Remove first login
function termosAceito(target, data, callback) {

  $.ajax({
    type : 'POST',
    url  : 'https://www.esbrubles.com.br/nitemapp/updatesenha.php',
    data : data,
    cache: false,
    beforeSend: function() {
      $('#'+target.id).prop( "disabled", true ).find('.fas').toggleClass('fa-spinner fa-pulse');
    },
    success :  function(response, data) {

      $('#'+target.id).prop( "disabled", false ).find('.fas').toggleClass('fa-spinner fa-pulse');
      // var JSONString = response; // Replace ... with your JSON String
      //
      // var JSONObject = $.parseJSON(JSONString);

      if (callback && typeof(callback) === "function") {
        callback(data, response);
      }

    },
    error: function(jqXHR, response) {
      $('#'+target.id).prop( "disabled", false ).find('.fas').toggleClass('fa-spinner fa-pulse');
      window.alert(jqXHR, response)
    }
  });
};

//Para iniciar a geolocalização
var fireOnce = true;
function watchPos (callback) {

  var opstionsGeo = {
    enableHighAccuracy: false,
    maximumAge: 0
  };
  console.log('positioning')
  navigator.geolocation.watchPosition(
    function(position){
      if (callback && typeof(callback) === "function" && fireOnce) {
        callback(position);
        fireOnce = false;
      }
      localStorage.setItem('lat', position.coords.latitude);
      localStorage.setItem('lng', position.coords.longitude);

      if (markerUserLoaded) {
        movePinUser(position);
      }

    },
    function(error){
      alert('Não foi possível te encontrar :(\nVerifique sua conexão ou permita que o aplicativo acesse sua localização')
  }, opstionsGeo);
};

function movePinUser(pos) {

  var moveTo = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  };

  markers[0].setPosition(moveTo);
  accRadius.setCenter(moveTo);

  if (pos.coords.accuracy < 50) {
    accRadius.setRadius(0)
  } else {
    //accRadius.setRadius(pos.coords.accuracy);
    accRadius.setRadius(0);
  }
}

//Coloca marcadores adicionados com a busca em um array pra depois remove-los
function setMapOnAll(map, tipo) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].marcador == tipo || tipo == 'todos') {
      markers[i].setMap(map);
    }
  }
};

//executa a busca por endereço
function codeAddress() {

  fechaInfo();

  searchAddress = document.getElementById('search-address').value;

  geocoder.geocode( { 'address': searchAddress}, function(results, status) {

    if (status == 'OK') {
      setMapOnAll(null, 'search'); //remove todos os marcadores do tipo search antes de mostrar os novos
      searchResults = results[0];

      map.panTo(results[0].geometry.location);

      addMarker(results[0].geometry.location, searchIcon, '', 'search', true, false, '');

      //getRegistered(800);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};

reverseGeocode = function(latlng, f){
    if(typeof latlng != 'undefined' && latlng != null) {
        geocoder.geocode( {'location': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            f('ok', results);
          } else {
            f('error', null);
          }
        });
    } else {
      f('error', null);
    }
}

//Função para desenhar o mapa
function initMap(pos) {

  geocoder = new google.maps.Geocoder();

  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('search-address')), {
      types: ['geocode']
    });

  autocomplete.addListener('place_changed', codeAddress);

  var posInit = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  };

  map = new google.maps.Map(document.getElementById('gmap'), {
    center: posInit,
    zoom: 17,
    disableDefaultUI: true,
    styles: estilo
  });

  addMarker(posInit, userIcon, '', 'user', false, true, '');
  markerUserLoaded = true;
  //
  // getRegistered(800);
  //
  // map.addListener('dragend', function () {
  //   getRegistered(800)
  // })

  accRadius = new google.maps.Circle({
    strokeColor: '#FFFFFF',
    strokeOpacity: 0,
    strokeWeight: 1,
    fillColor: '#e61367',
    fillOpacity: 0.1,
    map: map,
    center: posInit,
    clickable: false,
    radius: 0 //pos.coords.accuracy
  });

  google.maps.event.addListener(map, 'click', function (event) {
    fechaInfo()
  });

}; // fim do init map

//Fechar info do clique
function fechaInfo() {
  console.log('fecha info');
  modalClose();
}

//abre Modal da parte de baixo e insere o view dependendo do marcador
function abrirInfo(marcador, latLng) {

  if (marcador == 'user') {
    fecharModal = true;

    reverseGeocode(latLng, function(status, res) {
      if (status == 'ok') {
        let endereco = res[0].address_components[1].short_name + ', ';
        endereco += res[0].address_components[0].short_name + ' - ';
        endereco += res[0].address_components[3].short_name + '/';
        endereco += res[0].address_components[5].short_name;

        $('p.local-endereco').html(endereco);

        $('h1.local-titulo').html('Você está aqui! ;P')

        $('.modal-wrapper .eventos, .modal-wrapper .descript, .modal-wrapper .badges').css({display: 'none'});

        $('#modal-content').addClass('stop');

        modalTease();

      } else {
        alert(status)
      }
    });


  }

  if (marcador == 'search') {
    $('p.local-endereco').html('Endereco da busca');

    $('h1.local-titulo').html('Resultado da busca')

    $('.modal-wrapper .eventos, .modal-wrapper .descript, .modal-wrapper .badges').css({display: 'flex'});

    modalTease();
  }

  console.log(marcador)
}

//Cria ID randomico e grande
var criaID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9);
};


var markers = [];

//Icones para o mapa
var searchIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  fillOpacity: 0.8,
  fillColor: '#6c9880',
  strokeOpacity: 1,
  strokeColor: '#6c9880',
  strokeWeight: 3,
  scale: 8 //pixels
};

var userIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  fillOpacity: 0.3,
  fillColor: '#e61367',
  strokeOpacity: 1,
  strokeColor: '#e61367',
  strokeWeight: 2,
  scale: 5 //pixels
};

var placeIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  fillOpacity: 0.4,
  fillColor: '#eabd4d',
  strokeOpacity: 0.7,
  strokeColor: '#eabd4d',
  strokeWeight: 1,
  labelOrigin: new google.maps.Point(0, -3),
  scale: 8 //pixels
};

var tempIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  fillOpacity: 1,
  fillColor: '#e61367',
  strokeOpacity: 0.7,
  strokeColor: '#e61367',
  strokeWeight: 1,
  scale: 4 //pixels
};

var registeredIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  fillOpacity: 0.9,
  fillColor: '#eabd4d',
  strokeOpacity: 1,
  strokeColor: '#eabd4d',
  strokeWeight: 3,
  labelOrigin: new google.maps.Point(0, -3),
  scale: 8 //pixels
};

var validIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  fillOpacity: 0.9,
  fillColor: '#40948f',
  strokeOpacity: 1,
  strokeColor: '#40948f',
  strokeWeight: 3,
  scale: 8 //pixels
};

var clickIcon = {
  path: google.maps.SymbolPath.CIRCLE,
  fillOpacity: 0.9,
  fillColor: '#e61367',
  strokeOpacity: 0,
  strokeColor: '#e61367',
  strokeWeight: 0,
  scale: 10 //pixels
};

var opstionsGeo = {
  enableHighAccuracy: true,
  maximumAge: 0
};

//Adiconar marcadores
function addMarker(latLng, icone, label, tipo, drag, clique, index) {

  if (label != '') {
    marker = new google.maps.Marker({
      id: criaID(),
      marcador: tipo,
      index: index,
      position: latLng,
      map: map,
      draggable: drag,
      clickable: clique,
      icon: icone,
      label: {
        text: label,
        fontSize: '12px',
        fontFamily: '"Source Sans Pro", sans-serif',
        color: 'white'
      },
      optimized: false
    });
  } else {
    marker = new google.maps.Marker({
      id: criaID(),
      marcador: tipo,
      index: index,
      position: latLng,
      map: map,
      draggable: drag,
      clickable: clique,
      icon: icone,
      optimized: false
    });
  }

  markerId = marker.id;

  markerTipo = marker.marcador;

  google.maps.event.addListener(marker, 'click', (function(marker, markerId, markerTipo) {
    return function(event) {
      markerTipo = marker.marcador
      abrirInfo(marker.marcador, marker.position)
      //openInfo(marker.position, ($(window).height()/2)-toPanX, ($(window).width()/2)-toPanY, marker.marcador);
      //addListeners();
    }
  })(marker, markerId, markerTipo));

  google.maps.event.addListener(marker, 'dragend', (function(marker, markerId, markerTipo) {
    return function(event) {
      console.log('drag')
      marker.setPosition(event.latLng);
      $('#searchPlaceField').val('').blur();
      reverseGeocode(event.latLng, function(status, res) {
        if (status == 'ok') {
          searchResults = res;
        } else {
          alert(status)
        }
      });
    }
  })(marker, markerId, markerTipo));

  //addDrag(tipo, marker.id);

  markers.push(marker);

  if (tipo == 'search') {
    markersSearch.push(marker);
  }

  if (tipo == 'place') {
    markersPlace.push(marker);
  }

  if (tipo == 'registrado') {
    markersRegistrado.push(marker);
  }

  if (tipo == 'temp') {
    markersTemp.push(marker);
  }

};//fim do add Marker


//Primeiro estagio do modal
function modalTease () {

  let divHeight = $('.amostra').outerHeight();
  let stageHeight = $(document).outerHeight();
  let porcentSobe = (divHeight*100)/stageHeight;

  $('#modal-content').transition({y: -(porcentSobe+8.4)+'vh'}, 300, 'easeOutCubic');
  $('.modal-image').transition({zIndex: 2}, 0, 'easeOutCubic', function(){
    $('.modal-image').transition({x: '42vw', y: -(porcentSobe+7)+'vh', scale: 2}, 700, 'easeOutCubic');
  });
  $('.modal-wrapper').transition({y: '0vh'}, 500, 'ease');

  if ($('#modal-content').hasClass('stop')) {
    console.log('para')
  } else {
    $('#modal-content').removeAttr('class').addClass('tease');
  }


};

//Modal totalmente aberto
function modalFull () {

  let divHeight = $('.modal-wrapper').outerHeight();
  let stageHeight = $(document).outerHeight();
  let porcentSobe = (divHeight*100)/stageHeight;

  if ($('#modal-content').hasClass('full')) {
    console.log('aberto');
  } else if ($('#modal-content').hasClass('stop')) {
    console.log('para');
  } else {
    $('#modal-content').transition({y: -(porcentSobe+12)+'vh'}, 500, 'easeOutCubic').addClass('full');
    $('.modal-image').transition({x: '42vw', y: -(porcentSobe+15)+'vh', scale: 2}, 500, 'easeOutCubic', function () {
      $('.modal-image').transition({zIndex: 5}, 0, 'ease', function () {
        $('.modal-image').transition({x: '42vw', y: -(porcentSobe+9)+'vh', scale: 2}, 600, 'easeOutCubic');
      })
    });

    $('.modal-wrapper').transition({y: '5vh'}, 900, 'easeOutCubic');
  }

};

//Fecha o modal
function modalClose () {
  $('#modal-content').removeAttr('class');

  $('#modal-content').transition({y: '0vh'}, 300, 'easeInOutCubic');
  $('.modal-image').transition({x: '40vw', y: '20vh', scale: 1, sIndex: 2}, 200, 'easeInOutCubic');
};


//ESTILO DO MAPA - não colocar nada ABAIXO//estilo do mapa - NAO COLOCAR NADA ABAIXO
var estilo = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]
