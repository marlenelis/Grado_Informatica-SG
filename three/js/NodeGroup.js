/*
 * Author     : Marlene Vásquez
 * Documento  : NodeGroup.js
 * Created on : 22-may-2015, 16:16:07
 */
/* global THREE */

function NodeGroup (name , node){
    this.Node = node;//node root
    this.ListaNode = [];
    this.name = name; 
    this.distance;
     
    this.groupNode = new THREE.Group();
    this.groupNode.add(this.Node.Object);
};
//===============================================================
//                      ADDNODE
//===============================================================
NodeGroup.prototype.addNode=function(node,dis){ 
    this.distance= dis;
    this.groupNode.position.x= this.distance;  
    this.groupNode.add(node.Object);
    this.ListaNode.push(node);      
  };
//===============================================================
//                      DRAW
//===============================================================
NodeGroup.prototype.draw = function(scene){
     scene.add(this.groupNode);
};
//===============================================================
//                      ANIMATE
//===============================================================
NodeGroup.prototype.animate = function(angleEarth,angleMoon,x,y,z){
    this.Node.animate(angleEarth,0,0,0);//animate node root
    
    for(i=0;i< this.ListaNode.length;i++) {         
	this.ListaNode[i].animate(angleMoon,x,y,z);//animate node(s) fis
    }
};
//===============================================================
//                      POSITION
//===============================================================
NodeGroup.prototype.position=function(x,y,z){
    this.groupNode.position.x = x;
    this.groupNode.position.y = y;
    this.groupNode.position.z = z;
};
//===============================================================
//                      ROTATION
//===============================================================
NodeGroup.prototype.rotation=function(angle,x,y,z){
    if(x===1)   this.groupNode.rotation.x=angle;     
    if(y===1)   this.groupNode.rotation.y=angle; 
    if(z===1)   this.groupNode.rotation.z=angle;
};

