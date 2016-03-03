
/* global LIBS, TIPO */

var main=function() {
  var CANVAS=document.getElementById("your_canvas");
  CANVAS.width=window.innerWidth;
  CANVAS.height=window.innerHeight;
  
  /*========================= CAPTURE MOUSE EVENTS ========================= */

  var rotate = true;
  var mouseDown=function( e ) {    
	( rotate === true ) ? rotate = false : rotate = true;	
  };
  CANVAS.addEventListener( "mousedown", mouseDown, false );
  
  /*========================= GET WEBGL CONTEXT ========================= */
  var GL; 
  try {
    GL = CANVAS.getContext("experimental-webgl", {antialias: true});
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  }
  
  /*========================= SHADERS ========================= */
  
  var shader_vertex_source="\n\
attribute vec3 position;\n\
attribute vec3 normal;\n\
uniform mat4 Pmatrix;\n\
uniform mat4 Vmatrix;\n\
uniform mat4 Mmatrix;\n\
attribute vec2 uv;\n\
varying vec2 vTextureCoord;\n\
varying vec3 vNormal;\n\
varying vec3 vView;\n\
void main(void) { \n\
gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
vNormal=vec3(Mmatrix*vec4(normal, 0.));\n\
vView=vec3(Vmatrix*Mmatrix*vec4(position, 1.));\n\
vTextureCoord=uv;\n\
}";
  
  var shader_fragment_source="\n\
precision mediump float;\n\
uniform sampler2D sampler;\n\
varying vec2 vTextureCoord;\n\
varying vec3 vNormal;\n\
varying vec3 vView;\n\
const vec3 vsource_ambient_color=vec3(1.,1.,1.);\n\
const vec3 vsource_diffuse_color=vec3(1.,1.,1.);\n\
const vec3 vsource_specular_color=vec3(1.,1.,1.);\n\
const vec3 vsource_direction=vec3(-1.,0.,0.);\n\
\n\
const vec3 vmat_ambient_color = vec3(0.2,0.2,0.2);\n\
const vec3 vmat_diffuse_color = vec3(1.,1.,1.);\n\
const vec3 vmat_specular_color= vec3(1.,1.,1.);\n\
const float mat_shininess = 32.;\n\
\n\
void main(void) {\n\
    vec3 color=vec3(texture2D(sampler, vTextureCoord));\n\
	vec3 v_ambient = vsource_ambient_color*vmat_ambient_color;\n\
	vec3 v_diffuse = vsource_diffuse_color*vmat_diffuse_color*max(0., dot(vNormal, vsource_direction));\n\
	vec3 vV= normalize(vView);\n\
	vec3 vR = reflect(vsource_direction, vNormal);\n\
	\n\
	\n\
	vec3 v_specular = vsource_specular_color*vmat_specular_color*pow(max(dot(vR,vV),0.), mat_shininess);\n\
	vec3 vI = v_ambient+v_diffuse+v_specular;\n\
	gl_FragColor = vec4(vI*color, 1.);\n\
}";
  
  var get_shader=function(source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };
  
  var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");
  
  var SHADER_PROGRAM=GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);
  
  GL.linkProgram(SHADER_PROGRAM);
  
  var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
  var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
  var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");
  var _sampler = GL.getUniformLocation(SHADER_PROGRAM, "sampler");
  
  var _uv = GL.getAttribLocation(SHADER_PROGRAM, "uv");
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
  var _normal = GL.getAttribLocation(SHADER_PROGRAM, "normal");

  GL.enableVertexAttribArray(_uv);
  GL.enableVertexAttribArray(_position);
  GL.enableVertexAttribArray(_normal);
  
  GL.useProgram(SHADER_PROGRAM);
  GL.uniform1i(_sampler, 0);

  /*========================= MATRIX ========================= */
  
  var PROJMATRIX=LIBS.get_projection(30, CANVAS.width/CANVAS.height, 1, 10);
  var VIEWMATRIX=LIBS.get_I4();
  
  LIBS.translateZ(VIEWMATRIX, -6);
    
  /*========================= DRAWING ========================= */
  GL.enable( GL.DEPTH_TEST );
  GL.depthFunc( GL.LEQUAL );
  GL.clearColor( 0.0, 0.0, 0.0, 0.0 );
  GL.clearDepth( 1.0 );
	var time_old=0;
	// init object 
	var earth = new Node(  1,GL,"textures/earth.jpg", 0, TIPO.PLANETA );
	var moon = new Node( 0.2,GL,"textures/moon.gif", 2 , TIPO.SATELITE);
        // Start angle of the orbit of the moon 
	//var angle = 0.0;
	
        var orbitalGroup = new NodeGroup( _Mmatrix, _Pmatrix,_position,_uv,_normal);
            orbitalGroup.addNode(earth);
            orbitalGroup.addNode(moon);
  
  var animate=function( time ) {
	  
    var dt= ( time-time_old ) / 1000;
	
	time_old=time;
    GL.viewport( 0.0, 0.0, CANVAS.width, CANVAS.height );
    GL.clear( GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT );
    GL.uniformMatrix4fv( _Pmatrix, false, PROJMATRIX );
    GL.uniformMatrix4fv( _Vmatrix, false, VIEWMATRIX );
    
    //===================================================================
    //                      draw GroupOrbital
    //===================================================================
                orbitalGroup.draw(GL,dt,rotate);

                GL.flush();
    window.requestAnimationFrame(animate);
  };
  animate(0);
};