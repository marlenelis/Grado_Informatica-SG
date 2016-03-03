/*
 * Author     : Marlene Vásquez
 * Documento  : Group.js
 * Created on : 14-may-2015, 16:18:20
 */

/* global THREE */

//===============================================================
//                      GROUP
//===============================================================

function Group (name , node){
    this.Node = node;//node root
    this.ListaGroup = [];
    this.name = name; 
    
    this.distance;   
    this.position=0;
};
//===============================================================
//                      ADDNODE
//===============================================================
Group.prototype.addNode=function(node,dis){  
    this.distance = dis;
    this.ListaGroup.push(node); 
};
//===============================================================
//                      DRAW
//===============================================================
Group.prototype.draw = function(scene){     
    this.Node.draw(scene);
     
    for(i=0;i< this.ListaGroup.length;i++)  {
        this.ListaGroup[i].draw(scene);
    }     
};
//===============================================================
//                      ANIMATE
//===============================================================
Group.prototype.animate = function(angle,angleMoon,isRotate,x,y,z){
    this.Node.animate(angle+0.01,0,0,0);//animate node root
    for(i=0;i< this.ListaGroup.length;i++) {           
        this.ListaGroup[i].groupNode.position.x = 30 * Math.cos(angle);        
        this.ListaGroup[i].groupNode.position.z = 30 * Math.sin(angle);
        
        this.ListaGroup[i].animate(angle,angleMoon,x,y,z);//animate node(s)
    }
};