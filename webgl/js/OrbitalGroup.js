/**
 * Created on : 9-mayo-2015, 16:40:05
 * Autor: Marlene Vásquez
 */
//=========================================================================
//                          MOON        
//=========================================================================
/* global LIBS GL, LIBS */

function Moon(GL){
    this.GL = GL;    
    this.MOON = new Sphere( 0.25,30,this.GL,"textures/moon.gif" ); 
    this.MATRIX_LOCAL = this.MOON.MATRIX_LOCAL;
}
Moon.prototype.draw=function(_position , _uv,_normal){   
    this.MOON.draw(this.GL,_position,_uv,_normal);
};
//=========================================================================
//                          EARTH
//=========================================================================
function Earth(GL){
    this.GL = GL;    
    //this.EARTH = new Sphere( 1,100,GL,"textures/earth.jpg" ); 
    this.EARTH = new Sphere( 1,100,this.GL,"textures/tc-earth_daymap.jpg" ); 
    this.MOON = new Moon(this.GL);
    this.MATRIX_LOCAL = this.EARTH.MATRIX_LOCAL;   
}
Earth.prototype.draw=function(_position , _uv,_normal ){       
	this.EARTH.draw( this.GL,_position,_uv,_normal);       
};
//=========================================================================
//                          GROUP
//=========================================================================
function OrbitalGroup(GL){
    this.GL = GL;
    this.earth = new Earth(this.GL);
    this.moon = new Moon(this.GL);
    this.MATRIX_LOCAL = LIBS.get_I4();
}
OrbitalGroup.prototype.draw=function(_Mmatrix ,_position , _uv,_normal,angulo,dt,dis){
    
        // Movement of the earth
	var rotationEarth = LIBS.rotateY( this.earth.MATRIX_LOCAL, dt );
	// Activate matrix motion of the earth
	this.GL.uniformMatrix4fv( _Mmatrix, false, rotationEarth );
	// draw earth       
        this.earth.draw(_position , _uv,_normal);
        
            //movement of the moon
            var m_translate = LIBS.get_I4();
            var m_rotate = LIBS.get_I4();
            LIBS.translateZ( m_translate, dis );
            LIBS.rotateY( m_rotate,angulo );		
            this.moon.MATRIX_LOCAL = LIBS.multMat4( m_translate, m_rotate );
            // Activate matrix motion of the moon
            this.GL.uniformMatrix4fv( _Mmatrix, false, this.moon.MATRIX_LOCAL );
            // draw moon
            this.moon.draw(_position,_uv,_normal);
        
};