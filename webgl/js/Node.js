/*
 * Author     : Marlene Vásquez
 * Documento  : Node.js
 * Created on : 10-may-2015, 16:11:49
 */

/* global LIBS */
//===============================================================
//                      NODE
//===============================================================
var TIPO ={PLANETA:1,SATELITE:2};

function Node ( rad,GL, url, dist, tipo){
   
    this.radio = rad;
    this.URL = url;
    this.TIPO = tipo;
   
    this.distance = dist;
    this.MATRIX_LOCAL= LIBS.get_I4();
    this.OBJETO = new Sphere(this.radio, 90,GL,this.URL);    
}
//===============================================================
//                      SETMATRIX
//===============================================================
Node.prototype.setMatrix=function(matrix){
    this.MATRIX_LOCAL = matrix;
},
//===============================================================
//                      GETMATRIX
//===============================================================
Node.prototype.getMatrix=function(){
    return this.MATRIX_LOCAL;
},
//===============================================================
//                      DRAW
//===============================================================
Node.prototype.draw = function(GL,_position , _uv,_normal){   
    return this.OBJETO.draw(GL,_position,_uv,_normal);
};
