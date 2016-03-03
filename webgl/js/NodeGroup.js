/*
 * Author     : Marlene Vásquez
 * Documento  : GroupNode.js
 * Created on : 10-may-2015, 16:29:09
 */

/* global TIPO, LIBS */
//===============================================================
//                      NODEGROUP
//===============================================================
function NodeGroup( _Mmatrix, _Pmatrix,_position,_uv,_normal ){
    
	this._Mmatrix = _Mmatrix;
	this._Pmatrix = _Pmatrix;
	this._position = _position;
	this._uv = _uv;
	this._normal = _normal;
        this.MATRIX_LOCAL = LIBS.get_I4();
	this.arrayNode = [];	
	this.nElements = 0;
	this.angle = 0;
}
//===============================================================
//                      ADDNODE
//===============================================================
NodeGroup.prototype.addNode= function( node ){	
	this.arrayNode[ this.nElements ] = node;
	this.nElements++;
	
},
//===============================================================
//                      NODE
//===============================================================
NodeGroup.prototype.draw = function( GL,dt,rotate ){
    
	for( var i= 0; i < this.nElements; i++){
		//alert("tipo"+TIPO.PLANETA);
		if( this.arrayNode[i].TIPO === TIPO.PLANETA )
                    
			LIBS.rotateY( this.arrayNode[i].MATRIX_LOCAL, dt );
		else
			if( rotate ){
				
				var m_trans = LIBS.get_I4();
				var m_rotat = LIBS.get_I4();
				LIBS.translateZ( m_trans, this.arrayNode[i].distance );
				LIBS.rotateY( m_rotat, this.angle );
				
				this.arrayNode[i].setMatrix( LIBS.multMat4( m_trans,m_rotat ));
                                
				this.angle = ( this.angle + 0.002 ) % 360;				
			}                      			
			
		GL.uniformMatrix4fv( this._Mmatrix, false, this.arrayNode[i].MATRIX_LOCAL );
		this.arrayNode[i].draw( GL,this._position,this._uv,this._normal );		
	}
		
	
};
