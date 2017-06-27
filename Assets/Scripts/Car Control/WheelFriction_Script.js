// Define the variables used in the script, the Corresponding collider is the wheel collider at the position of
// the visible wheel, the slip prefab is the prefab instantiated when the wheels slide, the rotation value is the
// value used to rotate the wheel around it's axel.
// These variables allow the script to power the wheels of the car.
var FrontLeftWheel : WheelCollider;
var FrontRightWheel : WheelCollider;
var BackLeftWheel : WheelCollider;
var BackRightWheel : WheelCollider;

// Wheel Friction curves
var ForwardExtremumSlip : float = 10;//1.0;
var ForwardExtremumValue : float = 100;//20000.0;
var ForwardAsymptoteSlip : float = 100;//2.0;
var ForwardAsymptoteValue : float = 1;//10000.0;
var ForwardStiffness : float = 1.0;

var SidewaysExtremumSlip : float = 6;//1.0;
var SidewaysExtremumValue : float = 100;//20000.0;
var SidewaysAsymptoteSlip : float = 30;//2.0;
var SidewaysAsymptoteValue : float = 1;//10000.0;
var SidewaysStiffness : float = 2.0;


function Update () {
	// Forward Friction
	FrontLeftWheel.forwardFriction.extremumSlip = ForwardExtremumSlip;
	FrontLeftWheel.forwardFriction.extremumValue = ForwardExtremumValue;
	FrontLeftWheel.forwardFriction.asymptoteSlip = ForwardAsymptoteSlip;
	FrontLeftWheel.forwardFriction.asymptoteValue = ForwardAsymptoteValue;
	FrontLeftWheel.forwardFriction.stiffness = ForwardStiffness;
	
	FrontRightWheel.forwardFriction.extremumSlip = ForwardExtremumSlip;
	FrontRightWheel.forwardFriction.extremumValue = ForwardExtremumValue;
	FrontRightWheel.forwardFriction.asymptoteSlip = ForwardAsymptoteSlip;
	FrontRightWheel.forwardFriction.asymptoteValue = ForwardAsymptoteValue;
	FrontRightWheel.forwardFriction.stiffness = ForwardStiffness;
	
	BackLeftWheel.forwardFriction.extremumSlip = ForwardExtremumSlip;
	BackLeftWheel.forwardFriction.extremumValue = ForwardExtremumValue;
	BackLeftWheel.forwardFriction.asymptoteSlip = ForwardAsymptoteSlip;
	BackLeftWheel.forwardFriction.asymptoteValue = ForwardAsymptoteValue;
	BackLeftWheel.forwardFriction.stiffness = ForwardStiffness;
	
	BackRightWheel.forwardFriction.extremumSlip = ForwardExtremumSlip;
	BackRightWheel.forwardFriction.extremumValue = ForwardExtremumValue;
	BackRightWheel.forwardFriction.asymptoteSlip = ForwardAsymptoteSlip;
	BackRightWheel.forwardFriction.asymptoteValue = ForwardAsymptoteValue;
	BackRightWheel.forwardFriction.stiffness = ForwardStiffness;
	
	//Sideways Friction
	FrontLeftWheel.sidewaysFriction.extremumSlip = SidewaysExtremumSlip;
   	FrontLeftWheel.sidewaysFriction.extremumValue = SidewaysExtremumValue;
	FrontLeftWheel.sidewaysFriction.asymptoteSlip = SidewaysAsymptoteSlip;
	FrontLeftWheel.sidewaysFriction.asymptoteValue = SidewaysAsymptoteValue;
	FrontLeftWheel.sidewaysFriction.stiffness = SidewaysStiffness;
	
	FrontRightWheel.sidewaysFriction.extremumSlip = SidewaysExtremumSlip;
	FrontRightWheel.sidewaysFriction.extremumValue = SidewaysExtremumValue;
	FrontRightWheel.sidewaysFriction.asymptoteSlip = SidewaysAsymptoteSlip;
	FrontRightWheel.sidewaysFriction.asymptoteValue = SidewaysAsymptoteValue;
	FrontRightWheel.sidewaysFriction.stiffness = SidewaysStiffness;
	
	BackLeftWheel.sidewaysFriction.extremumSlip = SidewaysExtremumSlip;
	BackLeftWheel.sidewaysFriction.extremumValue = SidewaysExtremumValue;
	BackLeftWheel.sidewaysFriction.asymptoteSlip = SidewaysAsymptoteSlip;
	BackLeftWheel.sidewaysFriction.asymptoteValue = SidewaysAsymptoteValue;
	BackLeftWheel.sidewaysFriction.stiffness = SidewaysStiffness;
	
	BackRightWheel.sidewaysFriction.extremumSlip = SidewaysExtremumSlip;
	BackRightWheel.sidewaysFriction.extremumValue = SidewaysExtremumValue;
	BackRightWheel.sidewaysFriction.asymptoteSlip = SidewaysAsymptoteSlip;
	BackRightWheel.sidewaysFriction.asymptoteValue = SidewaysAsymptoteValue;
	BackRightWheel.sidewaysFriction.stiffness = SidewaysStiffness;
	
	// The rigidbody velocity is always given in world space, but in order to work in local space of the car model we need to transform it first.
	var relativeVelocity : Vector3 = transform.InverseTransformDirection(GetComponent.<Rigidbody>().velocity);
	//UpdateFriction(relativeVelocity);
}

function UpdateFriction(relativeVelocity : Vector3)
{
	var sqrVel : float = relativeVelocity.x * relativeVelocity.x;

	// Forward
	var maxFStif : int = 100;
	var minFStif : int = 70;
	FrontLeftWheel.forwardFriction.extremumValue = Mathf.Clamp(maxFStif - sqrVel, 0, maxFStif);
	FrontLeftWheel.forwardFriction.asymptoteValue = Mathf.Clamp(minFStif - (sqrVel / 2), 0, minFStif);
	FrontRightWheel.forwardFriction.extremumValue = Mathf.Clamp(maxFStif - sqrVel, 0, maxFStif);
	FrontRightWheel.forwardFriction.asymptoteValue = Mathf.Clamp(minFStif - (sqrVel / 2), 0, minFStif);
	
	BackLeftWheel.forwardFriction.extremumValue = Mathf.Clamp(maxFStif - sqrVel, 10, maxFStif);
	BackLeftWheel.forwardFriction.asymptoteValue = Mathf.Clamp(minFStif - (sqrVel / 2), 10, minFStif);
	BackRightWheel.forwardFriction.extremumValue = Mathf.Clamp(maxFStif - sqrVel, 10, maxFStif);
	BackRightWheel.forwardFriction.asymptoteValue = Mathf.Clamp(minFStif - (sqrVel / 2), 10, minFStif);
	
	// Add extra sideways friction based on the car's turning velocity to avoid slipping
	var maxSStif : int = 100;
	var minSStif : int = 50;
	FrontLeftWheel.sidewaysFriction.extremumValue = Mathf.Clamp(maxSStif- sqrVel, 10, maxSStif);
	FrontLeftWheel.sidewaysFriction.asymptoteValue = Mathf.Clamp(minSStif - (sqrVel / 2), 10, minSStif);
	FrontRightWheel.sidewaysFriction.extremumValue = Mathf.Clamp(maxSStif - sqrVel, 10, maxSStif);
	FrontRightWheel.sidewaysFriction.asymptoteValue = Mathf.Clamp(minSStif - (sqrVel / 2), 10, minSStif);
	
	BackLeftWheel.sidewaysFriction.extremumValue = Mathf.Clamp(maxSStif - sqrVel, 10, maxSStif);
	BackLeftWheel.sidewaysFriction.asymptoteValue = Mathf.Clamp(minSStif - (sqrVel / 2), 10, minSStif);
	BackRightWheel.sidewaysFriction.extremumValue = Mathf.Clamp(maxSStif - sqrVel, 10, maxSStif);
	BackRightWheel.sidewaysFriction.asymptoteValue = Mathf.Clamp(minSStif - (sqrVel / 2), 10, minSStif);

}