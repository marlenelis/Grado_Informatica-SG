/*
 * Author     : Marlene Vásquez
 * Documento  : luces.js
 * Created on : 17-may-2015, 20:00:07
 */
/* global THREE */

var LUZ={PUNTUAL:1,DIRECCIONAL:2};

function Luz(luz,color,intensity,distance,shadow){
    this.tipo = luz;
    this.color = color;
    this.shadow = shadow;
    this.intensity = intensity;
    this.object =  (this.tipo===1) ? new THREE.PointLight(this.color, this.intensity, distance): new THREE.DirectionalLight(this.color,this.intensity);
    this.object.castShadow = this.shadow;    
}

Luz.prototype.setPosition=function(x,y,z){
    this.object.position.set(x,y,z);
};