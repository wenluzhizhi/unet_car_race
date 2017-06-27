// These variables allow the script to power the wheels of the car.
var FrontLeftWheel : WheelCollider;
var FrontRightWheel : WheelCollider;
var BackLeftWheel : WheelCollider;
var BackRightWheel : WheelCollider;

var wheelRadius : float = 0.33;
var springLength : float = 0.1;
var damperForce : float = 50;//50;
var springForceFront : float = 8500;//18500;
var springForceRear : float = 5500;//9000;

function Update () {
	// Forward Suspension	
	FrontLeftWheel.radius= wheelRadius;	
	FrontLeftWheel.suspensionDistance = springLength;
	FrontLeftWheel.suspensionSpring.spring = springForceFront;
	FrontLeftWheel.suspensionSpring.damper = damperForce;
	
	FrontRightWheel.radius= wheelRadius;
	FrontRightWheel.suspensionDistance = springLength;
	FrontRightWheel.suspensionSpring.spring = springForceFront;
	FrontRightWheel.suspensionSpring.damper = damperForce;
	
	// Rear Suspension	
	BackLeftWheel.radius= wheelRadius;	
	BackLeftWheel.suspensionDistance = springLength;
	BackLeftWheel.suspensionSpring.spring = springForceRear;
	BackLeftWheel.suspensionSpring.damper = damperForce;
	
	BackRightWheel.radius= wheelRadius;
	BackRightWheel.suspensionDistance = springLength;
	BackRightWheel.suspensionSpring.spring = springForceRear;
	BackRightWheel.suspensionSpring.damper = damperForce;
}