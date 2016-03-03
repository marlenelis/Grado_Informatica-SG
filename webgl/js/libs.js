
var LIBS={
  degToRad: function(angle){
    return(angle*Math.PI/180);
  },
  
  get_projection: function(angle, a, zMin, zMax) {
    var tan=Math.tan(LIBS.degToRad(0.5*angle)),
        A=-(zMax+zMin)/(zMax-zMin),
          B=(-2*zMax*zMin)/(zMax-zMin);
    
    return [
      0.5/tan, 0 ,   0, 0,
      0, 0.5*a/tan,  0, 0,
      0, 0,         A, -1,
      0, 0,         B, 0
    ];
  },
  
  get_I4: function() {
    return [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1];
  },
  
  set_I4: function(m) {
    m[0]=1, m[1]=0, m[2]=0, m[3]=0,
      m[4]=0, m[5]=1, m[6]=0, m[7]=0,
        m[8]=0, m[9]=0, m[10]=1, m[11]=0,
          m[12]=0, m[13]=0, m[14]=0, m[15]=1;
  },
  
  rotateX: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv1=m[1], mv5=m[5], mv9=m[9];
    m[1]=m[1]*c-m[2]*s;
    m[5]=m[5]*c-m[6]*s;
    m[9]=m[9]*c-m[10]*s;
    
    m[2]=m[2]*c+mv1*s;
    m[6]=m[6]*c+mv5*s;
    m[10]=m[10]*c+mv9*s;
   // return m;
  },
  
  rotateY: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]+s*m[2];
    m[4]=c*m[4]+s*m[6];
    m[8]=c*m[8]+s*m[10];
    
    m[2]=c*m[2]-s*mv0;
    m[6]=c*m[6]-s*mv4;
    m[10]=c*m[10]-s*mv8;
   // return m;
  },
  
  rotateZ: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]-s*m[1];
    m[4]=c*m[4]-s*m[5];
    m[8]=c*m[8]-s*m[9];
    
    m[1]=c*m[1]+s*mv0;
    m[5]=c*m[5]+s*mv4;
    m[9]=c*m[9]+s*mv8;
    //return m;
  },
  
  set_position: function(m,x,y,z) {
    m[12]=x, m[13]=y, m[14]=z;
  },
   translateX: function(m, t){
    m[12]+=t;
  },
  
  translateY: function(m, t){
    m[13]+=t;
  },
  
  translateZ: function(m, t){
    m[14]+=t;
  },
   normalize: function(u) {
    var size=Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
    u[0]/=size, u[1]/=size, u[2]/=size;
  },

  getTranslation: function(m) {
    return [m[12], m[13], m[14]];
  },

  multVecMat4: function(m, v) {
    return [
      m[0]*v[0] + m[4]*v[1] + m[8]*v[2] + m[12],
      m[1]*v[0] + m[5]*v[1] + m[9]*v[2] + m[13],
      m[2]*v[0] + m[6]*v[1] + m[10]*v[2] + m[14]
    ];
  },
 multMat4: function( m,m2 ){	  
	  var mm_res = LIBS.get_I4();
          var cont=4;
	  for( var i = 0;i<cont;i++ ){		
	     for( var j = 0; j<cont;j++ ){			 
			 mm_res[ i*cont + j ] = 0;			 
			for( var k = 0; k<cont;k++ ){				
				mm_res[ i*4 + j ] += ( m[ i*4 + k ] * m2[ k*4 + j ]);				
			} 
		 }  
	  }
	  return mm_res;
  },
  sub: function(A,B) {
    return [B[0]-A[0], B[1]-A[1], B[2]-A[2]];
  },

  cross: function(u,v){
    return [
      u[1]*v[2]-u[2]*v[1],
      -u[0]*v[2]+u[2]*v[0],
      u[0]*v[1]-u[1]*v[0]
    ];
  },  

    multiply: function(a,b,c){
	c||(c=a);
	var d=a[0],e=a[1],g=a[2],f=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],o=a[9],m=a[10],n=a[11],p=a[12],r=a[13],s=a[14];
	a=a[15];
        var A=b[0],B=b[1],t=b[2],u=b[3],v=b[4],w=b[5],x=b[6],y=b[7],z=b[8],C=b[9],D=b[10],E=b[11],q=b[12],F=b[13],G=b[14];
	b=b[15];
        c[0]=A*d+B*h+t*l+u*p;c[1]=A*e+B*i+t*o+u*r;c[2]=A*g+B*j+t*m+u*s;
	c[3]=A*f+B*k+t*n+u*a;c[4]=v*d+w*h+x*l+y*p;c[5]=v*e+w*i+x*o+y*r;
	c[6]=v*g+w*j+x*m+y*s;c[7]=v*f+w*k+x*n+y*a;c[8]=z*d+C*h+D*l+E*p;
	c[9]=z*e+C*i+D*o+E*r;c[10]=z*g+C*j+D*m+E*s;
	c[11]=z*f+C*k+D*n+E*a;c[12]=q*d+F*h+G*l+b*p;
	c[13]=q*e+F*i+G*o+b*r;c[14]=q*g+F*j+G*m+b*s;
	c[15]=q*f+F*k+G*n+b*a;
        return c;
    },
    squareNorm: function(u) {
    return u[0]*u[0]+u[1]*u[1]+u[2]*u[2];
  }
};