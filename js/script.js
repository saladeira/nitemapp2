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

var meuMarcadorClicado;

var modalPosition = 'close';

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

  modalAnimate('', 'close', '')

  searchAddress = document.getElementById('search-address').value;

  geocoder.geocode( { 'address': searchAddress}, function(results, status) {

    if (status == 'OK') {
      setMapOnAll(null, 'search');
      setMapOnAll(null, 'registrado'); //remove todos os marcadores do tipo search antes de mostrar os novos
      searchResults = results[0];

      map.panTo(results[0].geometry.location);

      addMarker(results[0].geometry.location, searchIcon, '', 'search', true, false, '');

      getRegistered(800);

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

  getRegistered(800);


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
    modalAnimate('', 'close', '')
  });

}; // fim do init map

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
      meuMarcadorClicado = marker;
      markerTipo = marker.marcador;
      abrirInfo(marker.marcador, marker.position)
    }
  })(marker, markerId, markerTipo));

  google.maps.event.addListener(marker, 'dragend', (function(marker, markerId, markerTipo) {
    return function(event) {
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

//registra um novo lugar (chamada ajax para php)

function registrarLocal(data) {

  $.ajax({
      type: 'POST',
      url: 'https://www.esbrubles.com.br/nitemapp/placereg2.php',
      data: data,
      cache: false,
      beforeSend: function() {
        $('.spinner2').removeClass('hide');
        $('.form').prop( "disabled", true );
      },
      success:  function(jqXHR, data, response) {
        //var resposta = response.responseText;
        console.log(response);
        getRegistered(800);
        modalTrasit();
        // if (meuMarcadorClicado.marcador == 'user') {
        //   addMarker(meuMarcadorClicado.position, registeredIcon, '', 'registrado', false, true, '')
        // } else {
        //   meuMarcadorClicado.setOptions({
        //     icon: registeredIcon,
        //     marcador: 'registrado',
        //     draggable: false
        //   })
        // }
        $('.spinner2').addClass('hide');
      },
      error: function(jqXHR, response) {
        console.log(jqXHR, response)
      }
   });
};

//Busca locais já registrados no debug
function getRegistered(raio, callback) {
  //resolve o raio baseado na latitude e longitude

  $.ajax({
      type: 'GET',
      url: 'https://www.esbrubles.com.br/nitemapp/get_places_range2.php',
      data: 'lat=' + map.getCenter().lat() + '&lng=' + map.getCenter().lng() + '&raio=' + raio + '&getRegistered=getRegistered',
      cache: false,
      beforeSend: function() {
        $('.loading-all').removeClass('hide');
      },
      success:  function(jqXHR, data, response) {
        $('.loading-all').addClass('hide');

        if (response.responseText != '') {
          //var resposta = response.responseText;
          var JSONString = response.responseText; // Replace ... with your JSON String

          var JSONObject = $.parseJSON(JSONString);
          registeredResults = JSONObject;

          if (callback && typeof(callback) === "function") {
            callback(registeredResults);
          };

          addPlacesRegistered(registeredResults);
        } else {
          console.log('Sem locais na região')
        };
      },
      error: function(jqXHR, response) {
        console.log(jqXHR, response);
        $('.loading-all').addClass('hide');
      }
   });
};

//Adiciona marcadores para os lugares encontrados no DB
function addPlacesRegistered(obj) {
  setMapOnAll(null, 'registrado');

  for (let i = 0; i < obj.length; i++) {

    var pos = {
      lat: parseFloat(obj[i].place_lat),
      lng: parseFloat(obj[i].place_lng)
    }

    addMarker(pos, registeredIcon, obj[i].place_nome, 'registrado', false, true, i)
  };

};

//Remove marcadores
function setMapOnAll(map, tipo) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].marcador == tipo || tipo == 'todos') {
      markers[i].setMap(map);
    }
  }
};

//abre Modal da parte de baixo e insere o view dependendo do marcador
function abrirInfo(marcador, latLng) {

  if (marcador == 'user') {

    reverseGeocode(latLng, function(status, res) {
      if (status == 'ok') {

        let myAddress = res[0].address_components

        let endereco;

        if (myAddress[0].types == 'street_number') {
          endereco = myAddress[1].short_name + ', ';
          endereco += myAddress[0].short_name + ' - ';
          endereco += myAddress[3].short_name;
        } else {
          endereco = myAddress[0].short_name + ' - ';
          endereco += myAddress[2].short_name;
        }

        let meuEstado = $('#modal-content').attr('class');

        modalAnimate('', 'tease', marcador, function () {
          populateContent(endereco, 'Você está aqui! ;P', 'imgs/icons2/map.svg', '', '', '');
        });

      } else {
        alert(status)
      }
    });


  }

  if (marcador == 'search') {

    let myAddress = searchResults.address_components

    let endereco;

    if (myAddress[0].types == 'street_number') {
      endereco = myAddress[1].short_name + ', ';
      endereco += myAddress[0].short_name + ' - ';
      endereco += myAddress[3].short_name;
    } else {
      endereco = myAddress[0].short_name + ' - ';
      endereco += myAddress[2].short_name;
    }

    modalAnimate('up', 'tease', marcador, function () {
      populateContent(endereco, 'Resultado da busca', 'imgs/icons2/search.svg', '', '', '');
    });

  }

  if (marcador == 'registrado') {

    let infoPlace = registeredResults[meuMarcadorClicado.index];

    modalAnimate('up', 'tease', marcador, function () {
      populateContent(infoPlace.place_ende, infoPlace.place_nome, 'imgs/icons2/lighthouse.svg', 'teste', 'teste', 'teste');
    });
  }

};

var modalDesc = true;
var modalBadges = true;
var modalEventos = true;


function populateContent(endereco, titulo, imgsrc, descricao, evento, badges) {

  if (endereco != '') {
    $('p.local-endereco').html(endereco);
  } else {
    $('p.local-endereco').html('Sem endereço');
  }

  if (titulo != '') {
    $('h1.local-titulo').html(titulo)
  } else {
    $('h1.local-titulo').html('Ué, nada aqui...')
  }

  if (imgsrc != '') {
    $('.modal-image img').attr('src', imgsrc);
  } else {
    $('.modal-image img').attr('src', 'imgs/icons/015-skull-and-bones.svg');
  }

  if (descricao != '') {
    console.log('tem descricao');
    modalDesc = true;
    $('.default .descript').css({display: 'flex'});
  } else {
    modalDesc = false;
    $('.default .descript').css({display: 'none'});
  }

  if (evento != '') {
    console.log('tem evento');
    modalEventos = true;
    $('.default .eventos').css({display: 'flex'});
  } else {
    modalEventos = false;
    $('.default .eventos').css({display: 'none'});
  }

  if (badges != '') {
    console.log('tem badges');
    modalBadges = true;
    $('.default .badges').css({display: 'flex'});
  } else {
    modalBadges = false;
    $('.default .badges').css({display: 'none'});
  }

};

function modalClose (marcador) {

  $('#modal-upper').removeClass('closed').addClass('opened');

  if (modalPosition == 'full') {
    $('#modal-content').transition({y: '0vh'}, 700, 'easeOutCubic');
    $('.modal-image').transition({y: '5vh', zIndex: 2, scale: 2}, 800, 'easeOutCubic');

    $('.modal-add-local').transition({x: '-34vw', y: '0vh', zIndex: 2, scale: 0.8}, 700, 'easeOutCubic');
    $('.modal-add-evento').transition({x: '34vw', y: '0vh', zIndex: 2, scale: 0.8}, 700, 'easeOutCubic');
  } else {
    $('#modal-content').transition({y: '0vh'}, 400, 'easeOutCubic');
    $('.modal-image').transition({y: '5vh', zIndex: 2, scale: 2}, 500, 'easeOutCubic');

    $('.modal-add-local').transition({x: '-34vw', y: '0vh', zIndex: 2, scale: 0.8}, 700, 'easeOutCubic');
    $('.modal-add-evento').transition({x: '34vw', y: '0vh', zIndex: 2, scale: 0.8}, 700, 'easeOutCubic');
  }
};

function modalTease (marcador) {
  let modal = $('#modal-content');
  let stageHeight = $(window).innerHeight();
  let divHeight;
  let porcentSobe;

  $('#modal-upper').removeClass('closed').addClass('opened');

  if (marcador == 'user' || marcador == 'search') {
    divHeight = $('.content.header').innerHeight();
    porcentSobe = (divHeight*100)/stageHeight;

    $('.modal-add-local').transition({x: '-34vw', y: -(porcentSobe+6)+'vh', zIndex: 2, scale: 0.8}, 800, 'easeOutBack');
    $('.modal-add-evento').transition({x: '34vw', y: -(porcentSobe+6)+'vh', zIndex: 2, scale: 0.8}, 900, 'easeOutBack');
  } else {
    divHeight = $('.content.header').innerHeight()+$('.content.eventos').innerHeight()//+$('.content.adicionar').innerHeight();
    porcentSobe = (divHeight*100)/stageHeight;

    $('.modal-add-local').transition({x: '-34vw', y: '0vh', zIndex: 2, scale: 0.8}, 800, 'easeOutBack');
    $('.modal-add-evento').transition({x: '34vw', y: -(porcentSobe+6)+'vh', zIndex: 2, scale: 0.8}, 900, 'easeOutBack');
  };

  $('#modal-content').transition({y: -porcentSobe+'vh'}, 400, 'easeOutBack');
  $('.modal-image').transition({y: -(porcentSobe+8)+'vh', zIndex: 2, scale: 2}, 500, 'easeOutBack');
  $('.default').transition({y: '0vh'}, 400, 'easeOutBack');
};

function modalFull (marcador) {
  let modal = $('#modal-content');
  let stageHeight = $(window).innerHeight();
  let divHeight;

  if (marcador == 'user' || marcador == 'search') {
    return false;
  } else {
    divHeight = $('.default').outerHeight();

    $('#modal-upper').removeClass('opened').addClass('closed');

    let porcentSobe = (divHeight*100)/stageHeight;

    $('#modal-content').transition({y: -(porcentSobe+5)+'vh'}, 300, 'easeOutBack');
    $('.modal-add-evento').transition({x: '34vw', y: -(porcentSobe+16)+'vh', zIndex: 2, scale: 0.8}, 600, 'easeOutBack', function () {
      $('.modal-add-evento').transition({zIndex: 5}, 0, 'ease', function () {
        $('.modal-add-evento').transition({x: '34vw', y: -(porcentSobe+10)+'vh', scale: 0.8}, 500, 'easeOutBack')
      })
    });
    $('.modal-image').transition({y: -(porcentSobe+18)+'vh', scale: 2}, 400, 'easeOutBack', function () {
      $('.modal-image').transition({zIndex: 5}, 0, 'ease', function () {
        $('.modal-image').transition({y: -(porcentSobe+12)+'vh', scale: 2}, 300, 'easeOutBack');
      })
    });

    $('.default').transition({y: '5vh'}, 300, 'easeOutBack');
  };
}

function modalTransit(vetor, marcador, posModal, callback) {
  console.log(vetor, marcador, modalPosition);

  let modal = $('#modal-content');
  let stageHeight = $(window).innerHeight();
  let divHeight;

  if (vetor == 'left' && posModal == 'tease') {
    divHeight = $('.form-local').innerHeight();

    let porcentSobe = (divHeight*100)/stageHeight;

    $('.default').transition({x: '-100vw', y: '0vh'}, 300, 'easeOutCubic');
    $('#modal-content').transition({y: -(porcentSobe)+'vh'}, 300, 'easeOutCubic');
    $('.form-local').transition({x: '0vw', y: '0vh'}, 300, 'easeOutCubic');

    modalPosition = 'form-local';
  } else if (vetor == 'right' && posModal == 'form-local') {
    divHeight = $('.default').outerHeight();

    let porcentSobe = (divHeight*100)/stageHeight;

    $('.default').transition({x: '0vw', y: '0vh'}, 300, 'easeOutCubic');
    $('#modal-content').transition({y: -(porcentSobe)+'vh'}, 300, 'easeOutCubic');
    $('.form-local').transition({x: '100vw', y: '0vh'}, 300, 'easeOutCubic');

    modalPosition = 'tease';
  }
}

function modalAnimate(vetor, goTo, marcador, callback) {

  if (callback && typeof(callback) === "function") {
    callback();
  };

  //go to close
  if (goTo == 'close') {
    modalPosition = goTo;
    modalClose(marcador);
  }
  //go to tease
  else if (goTo == 'tease') {
    modalPosition = goTo;
    modalTease(marcador)
  }
  //go to full
  else if (goTo == 'full') {
    modalPosition = goTo;
    modalFull(marcador)
  }
  //qualquer outro
  else {
    if (vetor == 'up' && modalPosition == 'close') {
      modalTease(marcador);
      modalPosition = 'tease';
    } else if (vetor == 'up' && modalPosition == 'tease') {
      modalFull(marcador);
      if (marcador == 'user' || marcador == 'search') {
        modalPosition = 'tease';
      } else {
        modalPosition = 'full';
      }
    } else if (vetor == 'down' && modalPosition == 'full') {
      modalTease(marcador);
      modalPosition = 'tease';
    } else if (vetor == 'down' && modalPosition == 'tease') {
      modalClose(marcador);
      modalPosition = 'close';
    } else {
      modalTransit(vetor, marcador, modalPosition);
      console.log('else')
    }
  }
}

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
