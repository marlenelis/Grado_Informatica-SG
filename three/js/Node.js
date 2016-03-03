/*
 * Author     : Marlene Vásquez
 * Documento  : Node.js
 * Created on : 14-may-2015, 16:18:20
 */

/* global THREE */

//===============================================================
//                      NODE
//===============================================================
function Node ( rad, URL, name ,material){
    this.Geometry =  new THREE.SphereGeometry(rad,30,30);
        
    this.map = THREE.ImageUtils.loadTexture( URL );
    this.map.minFilter = THREE.NearestFilter;
    this.map.magFilter = THREE.NearestFilter;
    this.map.wrapS =this.map.wrapT= THREE.RepeatWrapping;
    this.map.anisotropy = 4;
    
    this.distance = 0; 
    this.Material = (material===0)?new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(URL)}):
                                   new THREE.MeshLambertMaterial( { map: this.map } );
    this.Object = new THREE.Mesh(this.Geometry, this.Material);
    this.Object.position.x = 0;
    this.Object.position.y = 0;
    this.Object.position.z = 0;
    this.Object.name = name;          
}
//===============================================================
//                      POSITION
//===============================================================
Node.prototype.position=function(x,y,z){
    this.Object.position.x = x;
    this.Object.position.y = y;
    this.Object.position.z = z;
};
//===============================================================
//                      ROTATION
//===============================================================
Node.prototype.rotation=function(angle,x,y,z){
    if(x===1)   this.Object.rotation.x=angle;     
    if(y===1)   this.Object.rotation.y=angle; 
    if(z===1)   this.Object.rotation.z=angle;
};
//===============================================================
//                      ANIMATE
//===============================================================
Node.prototype.animate=function(angle,X,Y,Z){  
    this.rotation(angle,0,1,0); 
    this.position(X,Y,Z);
};
//===============================================================
//                      DRAW
//===============================================================
Node.prototype.draw=function(scene){
    scene.add(this.Object);
};
