/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

// var viewerApp;

// function launchViewer(urn) {
//     var options = {
//         env: 'AutodeskProduction',
//         getAccessToken: getForgeToken
//     };
//     var documentId = 'urn:' + urn;
//     Autodesk.Viewing.Initializer(options, function onInitialized() {
//         viewerApp = new Autodesk.Viewing.ViewingApplication('forgeViewer');
//         viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
//         viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
//     });
// }

// function onDocumentLoadSuccess(doc) {
//     // We could still make use of Document.getSubItemsWithProperties()
//     // However, when using a ViewingApplication, we have access to the **bubble** attribute,
//     // which references the root node of a graph that wraps each object from the Manifest JSON.
//     var viewables = viewerApp.bubble.search({ 'type': 'geometry' });
//     if (viewables.length === 0) {
//         console.error('Document contains no viewables.');
//         return;
//     }

//     // Choose any of the avialble viewables
//     viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
// }

// function onDocumentLoadFailure(viewerErrorCode) {
//     console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
// }

// function onItemLoadSuccess(viewer, item) {
//     // item loaded, any custom action?
//     drawPushpin(viewer);
//     console.log('viewer')
//     console.log(viewer)
// }

// function onItemLoadFail(errorCode) {
//     console.error('onItemLoadFail() - errorCode:' + errorCode);
// }

// function drawPushpin(viewer){

//     // var temp = {location:{x:100,y:100,z:100}}; 
//     // if(temp == '') return;
  
//     var pushpin_data = {location:{x:-503,y:-220,z:-682}
//   ,pos:[1316.3107214801587,793.9098665088047,494.76439158362314],
//   target:[-4071.01069937704,-2956.34891939824,-751.884539552351],
//   up:[-0.5468436965317846,0.8276165227404017,-0.12654194107306874]
// };
// var screenpoint = viewer.worldToClient(new THREE.Vector3(pushpin_data.location.x,
//         pushpin_data.location.y,
//         pushpin_data.location.z,));
  
        
//         var htmlMarker = '<div id="mymk"></div>';
//         var parent = viewer.container
//         $(parent).append(htmlMarker);
//         $('#mymk').css({
//             'pointer-events': 'none',
//             'width': '20px',
//             'height': '20px',
//             'position': 'absolute',
//             'overflow': 'visible' 
//             });
        
//         $('#mymk').append('<svg id="mysvg"></svg>')
//         var snap = Snap($('#mysvg')[0]);
//         var circle = snap.paper.circle(14, 14, 12);
//         circle.attr({
//             fill: "#FF8888",
//             fillOpacity: 0.6,
//             stroke: "#FF0000",
//             strokeWidth: 3
//         }); 
  
//         var $container = $('#mymk'); 
//         $container.css({
//             'left': screenpoint.x,
//             'top': screenpoint.y
//             });  
  
//         //camera
  
//         viewer.navigation.setView (new THREE.Vector3(pushpin_data.pos[0],pushpin_data.pos[1],pushpin_data.pos[2]),
//         new THREE.Vector3(pushpin_data.target[0],pushpin_data.target[1],pushpin_data.target[2])) ;
//         viewer.navigation.setCameraUpVector ( new THREE.Vector3(pushpin_data.up[0],pushpin_data.up[1],pushpin_data.up[2])) ;
  
  
//         viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, function(rt){
  
//           var temp = $('#labelProjectHref').text(); 
//           if(temp == '') return;
        
//           var pushpin_data = JSON.parse(temp);
        
//           var screenpoint = viewer.worldToClient(new THREE.Vector3(pushpin_data.location.x,
//               pushpin_data.location.y,
//               pushpin_data.location.z,));
  
//           var $container = $('#mymk'); 
//           $container.css({
//               'left': screenpoint.x,
//               'top': screenpoint.y
//               });
//           });
//         }
  

function getForgeToken(callback) {
    jQuery.ajax({
      url: '/api/forge/oauth/token',
      success: function (res) {
        callback(res.access_token, res.expires_in)
      }
    });
  }



  var viewerApp;
var _viewer3D;

function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };
  var documentId = 'urn:' + urn;
  Autodesk.Viewing.Initializer(options, function onInitialized() {
    viewerApp = new Autodesk.Viewing.ViewingApplication('forgeViewer');
    viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
    viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  // We could still make use of Document.getSubItemsWithProperties()
  // However, when using a ViewingApplication, we have access to the **bubble** attribute,
  // which references the root node of a graph that wraps each object from the Manifest JSON.
  var viewables = viewerApp.bubble.search({ 'type': 'geometry' });
  if (viewables.length === 0) {
    console.error('Document contains no viewables.');
    return;
  }

  // Choose any of the avialble viewables
  viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess(viewer, item) {
  // item loaded, any custom action?
  var pushpins = [{x:-732.6904673656754, y: -239.0262101555732, z:23.396726279618637},
                   {x:-487.1797671706493, y: -255.60155803366868, z:-673.434250425583},
                   {x:251.08190451974164, y: -219.12292480939604, z:-220.8910194835148}
                ]
  _viewer3D = viewer;
//   $(_viewer3D.container).bind("click", onMouseClick);
for(pushpin in pushpins){
    drawPushpin(pushpins[pushpin],pushpin)
}
$('.markup').click(function(){
    var id = $(this).attr('data-val');
    id = 1 + parseInt(id);
    $(".list-item[data-num='"+id+"']").click();
})
  _viewer3D.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, function(rt){  

    var $eles = $("div[id^='mymk']");

    var DOMeles = $eles.get();

    for(var index in DOMeles){
       
      var DOMEle = DOMeles[index];
      var divEle = $('#' + DOMEle.id);
       var val = divEle.data('3DData'); 
       var pushpinModelPt = JSON.parse(val);
    //    console.log('pushpinModelPt:')
    //    console.log(pushpinModelPt)
       var screenpoint = _viewer3D.worldToClient(new THREE.Vector3(
        pushpinModelPt.x,
        pushpinModelPt.y,
        pushpinModelPt.z,));
  
        divEle.css({
            'left': screenpoint.x - 24,
            'top': screenpoint.y - 12
            }); 
      } 
  }); 
  
//   var nav = viewer.navigation;
  //code from: 
function zoom (){
    var nav = viewer.navigation
    var pos = nav.getPosition()
    var target = nav.getTarget()
    var viewdir = new THREE.Vector3()
    viewdir.subVectors (pos, target).normalize()
    // zooms out by 100 along the view direction
    viewdir.multiplyScalar (1000)
    pos.add(viewdir)
    nav.setPosition(pos)
}
var graph1shown = false;
var graph2shown = false;
$('.list-item').click(function(){
    // viewer.fitToView();
    var num = $(this).attr('data-num');
    if(num == 1){
        // viewer.Toolkit.isolateFull(this.viewer)
        // nav.setPosition(pushpins[0])
        var dbid = [10073]
// viewer.select(dbid)
viewer.fitToView(dbid, viewer.model)
zoom() 

if(!graph1shown){

    var smoothie = new SmoothieChart();
    smoothie.streamTo(document.getElementById("mycanvas1"));
    // Data
    var line1 = new TimeSeries();
    setInterval(function() {
        line1.append(new Date().getTime(), Math.random());
    },500);
    smoothie.addTimeSeries(line1);
    graph1shown = true;
}

    }else if(num == 2){
        // nav.setPosition(pushpins[1])
        var dbid = [3761]
        viewer.fitToView(dbid, viewer.model)
        zoom() 
        if(!graph2shown){
        var smoothie = new SmoothieChart({
            grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb(60, 0, 0)',
            lineWidth: 1, millisPerLine: 250, verticalSections: 6, },
            labels: { fillStyle:'rgb(60, 0, 0)' }
        });
        smoothie.streamTo(document.getElementById("mycanvas2"));
        var line1 = new TimeSeries();
var line2 = new TimeSeries();
        setInterval(function() {
            line1.append(new Date().getTime(), Math.random());
            line2.append(new Date().getTime(), Math.random());
          },500);
          smoothie.addTimeSeries(line1,
            { strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });
            smoothie.addTimeSeries(line2,
                { strokeStyle:'rgb(255, 0, 255)', fillStyle:'rgba(255, 0, 255, 0.3)', lineWidth:3 });
                graph2shown = true;
            }
    }else{
        // nav.setPosition(pushpins[2])
        var dbid = [10948]
        viewer.fitToView(dbid, viewer.model)
        zoom() 
        // var smoothie = new SmoothieChart();
        // smoothie.streamTo(document.getElementById("mycanvas3"));
        // // Data
        // var line1 = new TimeSeries();
        // setInterval(function() {
        // line1.append(new Date().getTime(), Math.random());
        // },500);
        // smoothie.addTimeSeries(line1);
    }
           
})
}

function onItemLoadFail(errorCode) {
  console.error('onItemLoadFail() - errorCode:' + errorCode);
}

// function getForgeToken(callback) {
//   jQuery.ajax({
//     url: '/api/forge/oauth/publictoken',
//     success: function (res) {
//       callback(res.access_token, res.expires_in)
//     }
//   });
// }

function onMouseClick (event) {

      var screenPoint = {
        x: event.clientX,
        y: event.clientY
    };

    var n = normalizeCoords(screenPoint);

    var hitTest1 = _viewer3D.impl.hitTest(screenPoint.x,screenPoint.y,true);

      //get hit point
      var hitTest = _viewer3D.utilities.getHitPoint(
        screenPoint.x,
        screenPoint.y);

    if(hitTest1)
    { 
        console.log(hitTest1.intersectPoint)
       //geometry_sphere.applyMatrix( new THREE.Matrix4().makeTranslation( hitTest.x, hitTest.y, hitTest.z ) );
       //drawPushpin({x:hitTest.x,y:hitTest.y,z:hitTest.z});
       drawPushpin({x:hitTest1.intersectPoint.x,
                    y:hitTest1.intersectPoint.y,
                    z:hitTest1.intersectPoint.z});
    }
}

//normalize the screenpoint
function normalizeCoords (screenPoint) {

  var viewport =
      _viewer3D.navigation.getScreenViewport();

  var n = {
      x: (screenPoint.x - viewport.left) / viewport.width,
      y: (screenPoint.y - viewport.top) / viewport.height
  };

  return n;
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for( var i=0; i < 5; i++ )
  text += possible.charAt(Math.floor(Math.random() * possible.length));
  
  return text;
  }

function drawPushpin(pushpinModelPt,num){  

  var screenpoint = _viewer3D.worldToClient(
                    new THREE.Vector3(pushpinModelPt.x,
                                      pushpinModelPt.y,
                                      pushpinModelPt.z,));

      var randomId = makeid();
      var htmlMarker = '<div data-val="'+num+'" class="markup" id="mymk' + randomId + '"></div>';
      var parent = _viewer3D.container
      $(parent).append(htmlMarker);
      $('#mymk'+randomId ).css({
          'width': '20px',
          'height': '20px',
          'position': 'absolute',
          'overflow': 'visible' ,
          'cursor':'pointer'
          });
      
      $('#mymk'+randomId).append('<svg width="30" height="30" id="mysvg'+randomId+ '"></svg>')
      var snap = Snap($('#mysvg'+randomId)[0]);
      var rad = 12;
      var circle = snap.paper.circle(14, 14, rad);
      circle.attr({
          fill: "#FF8888",
          fillOpacity: 0.6,
          stroke: "#FF0000",
          strokeWidth: 3
      }); 

      var $container = $('#mymk'+randomId); 
      $container.css({
          'left': screenpoint.x - rad*2,
          'top': screenpoint.y - rad
      }); 
      
      //store 3D pt data to the DOM
      var div = $('#mymk'+randomId);
      var storeData = JSON.stringify(pushpinModelPt);
      div.data('3DData', storeData);
      //var val = div.data('store');  
}
