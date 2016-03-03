
/* global LIBS */

//=======================================================//
//                       SPHERE                          //
//=======================================================//
function Sphere( rad,rots,GL,url ){
	
	this.radio = rad;
	this.rotaciones = rots;
	this.url = url;
	
	this.MATRIX_LOCAL = LIBS.get_I4();
	
	// Constructores
	this.vertex = INITS.sphere_vertex(this.radio,this.rotaciones);
	this.faces  = INITS.sphere_faces(rots);
	this.texture = INITS.init_texture(this.url,GL);
	
	this.VERTEX = GL.createBuffer();
	this.FACES= GL.createBuffer ();
	this.init_Buffers( GL );
	
}
//=======================================================//
//                     DRAW_TEXTURE                      //
//=======================================================//
// Activate texture
Sphere.prototype.draw_texture = function( GL ){

	if (this.texture.webglTexture) {
        
		GL.activeTexture(GL.TEXTURE0);
		
		GL.bindTexture(GL.TEXTURE_2D, this.texture.webglTexture);
	}	
},
//=======================================================//
//                     DRAW                              //
//=======================================================//
Sphere.prototype.draw = function( GL,_position,_uv,_normal ){
	
    this.draw_texture( GL );
	
    GL.bindBuffer(GL.ARRAY_BUFFER, this.VERTEX);  
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false,4*(3+2+3),0) ;    
    GL.vertexAttribPointer(_normal, 3, GL.FLOAT, false,4*(3+2+3),3*4) ;
    GL.vertexAttribPointer(_uv, 2, GL.FLOAT, false,4*(3+2+3),6*4) ;
    
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.FACES);
    GL.drawElements(GL.TRIANGLES, this.faces.length , GL.UNSIGNED_SHORT, 0);	
};

//=======================================================//
//                     INIT_BUFFERS                       //
//=======================================================//
Sphere.prototype.init_Buffers = function( GL ){
	
	GL.bindBuffer(GL.ARRAY_BUFFER, this.VERTEX);
	GL.bufferData(GL.ARRAY_BUFFER,new Float32Array(this.vertex),GL.STATIC_DRAW);
	GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.FACES);
	GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces), GL.STATIC_DRAW);
	
};

//=======================================================//
//                     INIT                              //
//=======================================================//
var INITS = {
	
	sphere_faces: function(rots){
	
		var rotations = rots;
		var faces = [];
		for (var i=0; i < rotations; i++) {
			for (var j=0; j < rotations; j++) {
				var first = (i * (rotations + 1)) + j;
				var second = first + rotations + 1;
				faces.push(first);
				faces.push(second);
				faces.push(first + 1);
				
				faces.push(second);
				faces.push(second + 1);
				faces.push(first + 1);
			}
		}
		return faces;
	},
	
//=======================================================//
//                     SPHERE_VERTEX                     //
//=======================================================//
	sphere_vertex: function(rad,rots){
  	
	var rotations = rots;
	var radius = rad;
	var vertex = [];
	
	for (var i=0; i <= rotations; i++) {
		var alpha = i * Math.PI / rotations;
		var sinalpha = Math.sin(alpha);
		var cosalpha = Math.cos(alpha);

		for (var j=0; j <= rotations; j++) {
			var betha = j * 2 * Math.PI / rotations;
			var sinbetha = Math.sin(betha);
			var cosbetha = Math.cos(betha);

			var x = cosbetha * sinalpha;
			var y = cosalpha;
			var z = sinbetha * sinalpha;
			var u = 1 - (j / rotations);
			var v = (i / rotations);

			vertex.push(radius * x);
			vertex.push(radius * y);
			vertex.push(radius * z);
			
			vertex.push(x);
			vertex.push(y);
			vertex.push(z);
			
			vertex.push(u);
			vertex.push(v);
			
		}
	}
	return vertex;
  },
	
//=======================================================//
//                     INIT_TEXTURE                      //
//=======================================================//
	init_texture: function(image_URL,GL){    
    
        var image = new Image();        
        image.src = image_URL;
        image.webglTexture = false;        
        
       image.onload=function(e) {

      var texture=GL.createTexture();
    //  GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
      GL.bindTexture(GL.TEXTURE_2D, texture);
      GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
      GL.generateMipmap(GL.TEXTURE_2D);
      GL.bindTexture(GL.TEXTURE_2D, null);
      image.webglTexture=texture;
    };

    return image;
    }
	
};

