
function Particle(geometry, material,basedVeloVector) {

	
	THREE.Points.call(this,geometry,material);
	this.velocity = new THREE.Vector3(0,0,0);	
	this.velocity.copy(basedVeloVector);
}


Particle.prototype = Object.create(THREE.Points.prototype);
Particle.prototype.constructor = Particle;

Particle.prototype.update = function(delta) 
{
	var accel = new THREE.Vector3(0,-0.9,0);
	accel.multiplyScalar(delta);
	this.velocity.add(accel);
	var accelVelocity = new THREE.Vector3(0,0,0);
	accelVelocity.copy(this.velocity);
	accelVelocity.multiplyScalar(delta);
	this.position.add(accelVelocity);
}

this.velocity = new THREE.Vector3(0,0,3.3,0.21);

function ParticleSystem(geometry,material) {
	THREE.Object3D.call(this);	
	this.geometry = geometry;
	this.material = material;
}


ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
ParticleSystem.prototype.constructor = ParticleSystem;

ParticleSystem.prototype.update = function(delta) 
{
	//setting up the angle
	var velocity = new THREE.Vector3(0.0,10,0);
	var aX = new THREE.Vector3((Math.random() * 10),0,0);
	var angleX = Math.PI * ((Math.random()*2)-1) * 0.1;

	velocity.applyAxisAngle(aX,angleX);

	var aZ = new THREE.Vector3(0,0,(Math.random() * 10));
	var angleZ = Math.PI * ((Math.random()*2)-1) * 0.1;

	velocity.applyAxisAngle(aZ,angleZ);

	
	var particle = new Particle(this.geometry,this.material,velocity);
	this.add(particle);

	for (var i = 0 ; i < this.children.length ; i++)	
	{
		var object = this.children[i];	
		if ( object instanceof Particle)
		{
			object.update(delta);		
		}

	}
		

}

ParticleSystem.prototype.addParticle = function(particle) 
{
	this.add(particle,velocity);
}




