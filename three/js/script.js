/* global THREE, speed, LUZ */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.01, 1000);
var renderer = new THREE.WebGLRenderer();

var sun, moon, earth, angle=0, timer;
var nodeSun,nodeMoon,nodeEarth;
var rotate = true;
var x=0,z=0;
var TEXTURA ={ 
                SUN:    'textures/sun.jpg',
                MOON:   'textures/moon.jpg',
                EARTH:  'textures/preview_earth.jpg',
                STARTS: 'textures/stars.jpg'
              };
var MATERIAL={BASIC:0,LAMBER:1};
main();
//=================================================================
function onDocumentMouseDown( event ) {
	( rotate === true ) ? rotate = false : rotate = true;
}
//=================================================================
function renderScene() {
    timer = Date.now() * 0.0005;   
    if(rotate) {  
        angle = ( angle + 0.03 ) % 360;	//angle orbit 
        x = 5 * Math.cos(angle); 
        z = 5 * Math.sin(angle); 
    }
    nodeSun.animate(timer, angle,rotate,x,0,z );
        
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
}
//===========================================================================
//                  MAIN
//===========================================================================
function main() {   
    
    renderer.setClearColor(0x00000,0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.setSize($("#canvas").innerWidth(), $("#canvas").innerHeight());
    
      document.body.appendChild(renderer.domElement);
    
    //---------------------------------------------------------------------
//    var axes = new THREE.AxisHelper( 20 );
//    scene.add(axes); 
    //---------------------------------------------------------------------
    //sun
    nodeSun = new Group("System",new Node(8,TEXTURA.SUN,'SUN',MATERIAL.BASIC));
    //EARTH
    nodeEarth = new NodeGroup("Planet-Earth", new Node(4,TEXTURA.EARTH,'EARTH',MATERIAL.LAMBER)); 
    //EARTH + MOON
    nodeEarth.addNode(new Node(1,TEXTURA.MOON,'MOON',MATERIAL.LAMBER),12);
    //SUN + EARTH
    nodeSun.addNode(nodeEarth,18);
    
    nodeSun.draw(scene);
    //---------------------------------------------------------------------
    //                      LUCES
    //---------------------------------------------------------------------
   var pointLight = new Luz( LUZ.PUNTUAL,0xffffff ,3,100,true ); //  Luz proveniente de un punto en el espacio,		                                
    pointLight.setPosition(0, 0, 0 );             //  Localización de la luz. (x, y, z).
    scene.add( pointLight.object );  
    //---------------------------------------------------------------------
    //      when the mouse, call the given function    
    //---------------------------------------------------------------------
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    //---------------------------------------------------------------------
    //                      Añadir cámara
    //---------------------------------------------------------------------
    camera.position.x = 120;
    camera.position.y = 0;
    camera.position.z = 120;
    camera.lookAt(scene.position);

    $("#canvas").append(renderer.domElement);
    renderScene();
}
