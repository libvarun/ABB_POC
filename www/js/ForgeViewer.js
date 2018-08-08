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

var viewerApp;

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
    drawPushpin(viewer);
    console.log('viewer')
    console.log(viewer)
}

function onItemLoadFail(errorCode) {
    console.error('onItemLoadFail() - errorCode:' + errorCode);
}

function drawPushpin(viewer){

    // var temp = {location:{x:100,y:100,z:100}}; 
    // if(temp == '') return;
  
    var pushpin_data = {location:{x:-503,y:-220,z:-682}
  ,pos:[1316.3107214801587,793.9098665088047,494.76439158362314],
  target:[-4071.01069937704,-2956.34891939824,-751.884539552351],
  up:[-0.5468436965317846,0.8276165227404017,-0.12654194107306874]
};
var screenpoint = viewer.worldToClient(new THREE.Vector3(pushpin_data.location.x,
        pushpin_data.location.y,
        pushpin_data.location.z,));
  
        
        var htmlMarker = '<div id="mymk"></div>';
        var parent = viewer.container
        $(parent).append(htmlMarker);
        $('#mymk').css({
            'pointer-events': 'none',
            'width': '20px',
            'height': '20px',
            'position': 'absolute',
            'overflow': 'visible' 
            });
        
        $('#mymk').append('<svg id="mysvg"></svg>')
        var snap = Snap($('#mysvg')[0]);
        var circle = snap.paper.circle(14, 14, 12);
        circle.attr({
            fill: "#FF8888",
            fillOpacity: 0.6,
            stroke: "#FF0000",
            strokeWidth: 3
        }); 
  
        var $container = $('#mymk'); 
        $container.css({
            'left': screenpoint.x,
            'top': screenpoint.y
            });  
  
        //camera
  
        viewer.navigation.setView (new THREE.Vector3(pushpin_data.pos[0],pushpin_data.pos[1],pushpin_data.pos[2]),
        new THREE.Vector3(pushpin_data.target[0],pushpin_data.target[1],pushpin_data.target[2])) ;
        viewer.navigation.setCameraUpVector ( new THREE.Vector3(pushpin_data.up[0],pushpin_data.up[1],pushpin_data.up[2])) ;
  
  
        viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, function(rt){
  
          var temp = $('#labelProjectHref').text(); 
          if(temp == '') return;
        
          var pushpin_data = JSON.parse(temp);
        
          var screenpoint = viewer.worldToClient(new THREE.Vector3(pushpin_data.location.x,
              pushpin_data.location.y,
              pushpin_data.location.z,));
  
          var $container = $('#mymk'); 
          $container.css({
              'left': screenpoint.x,
              'top': screenpoint.y
              });
          });
        }
  

function getForgeToken(callback) {
    jQuery.ajax({
      url: '/api/forge/oauth/token',
      success: function (res) {
        callback(res.access_token, res.expires_in)
      }
    });
  }