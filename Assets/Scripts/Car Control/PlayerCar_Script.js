// ----------- CAR TUTORIAL SAMPLE PROJECT, ? Andrew Gotow 2009 -----------------

// Here's the basic car script described in my tutorial at www.gotow.net/andrew/blog.
// A Complete explaination of how this script works can be found at the link above, along
// with detailed instructions on how to write one of your own, and tips on what values to 
// assign to the script variables for it to work well for your application.

// Contact me at Maxwelldoggums@Gmail.com for more information.

// These variables allow the script to power the wheels of the car.
var FrontLeftWheel : WheelCollider;
var FrontRightWheel : WheelCollider;
var BackLeftWheel : WheelCollider;
var BackRightWheel : WheelCollider;

// These variables are for the gears, the array is the list of ratios. The script
// uses the defined gear ratios to determine how much torque to apply to the wheels.
var GearRatio :  float[];
var DifferentialRatio : float = 3.21;
var CurrentGear : int = 0;

// These variables are just for applying torque to the wheels and shifting gears.
// using the defined Max and Min Engine RPM, the script can determine what gear the
// car needs to be in.
var EngineTorque : float = 600.0;
var MaxEngineRPM : float = 7000.0;
var MinEngineRPM : float = 1000.0;
var EngineRPM : float = 0.0;

//var FrontWheelDrive : int = 1;
//var RearWheelDrive : int = 1;

// Center Of Mass
var COMX : float = 0;
var COMY : float = -0.2;
var COMZ : float = 0.5;

function Start () {
	// I usually alter the center of mass to make the car more stable. I'ts less likely to flip this way.
	GetComponent.<Rigidbody>().centerOfMass.x = COMX;
	GetComponent.<Rigidbody>().centerOfMass.y = COMY;
	GetComponent.<Rigidbody>().centerOfMass.z = COMZ;
}

function Update () {
	//update center of mass
	GetComponent.<Rigidbody>().centerOfMass.x = COMX;
	GetComponent.<Rigidbody>().centerOfMass.y = COMY;
	GetComponent.<Rigidbody>().centerOfMass.z = COMZ;
	
	// This is to limith the maximum speed of the car, adjusting the drag probably isn't the best way of doing it,
	// but it's easy, and it doesn't interfere with the physics processing.
	GetComponent.<Rigidbody>().drag = GetComponent.<Rigidbody>().velocity.magnitude / 250;
	
	// Compute the engine RPM based on the average RPM of the two wheels, then call the shift gear function
	EngineRPM = Mathf.Abs(BackLeftWheel.rpm + BackRightWheel.rpm)/2 * GearRatio[CurrentGear] * DifferentialRatio;
	if ( EngineRPM>10000) {EngineRPM =10000;}
	if ( EngineRPM<0) {EngineRPM =0;}
	ShiftGears();

	// set the audio pitch to the percentage of RPM to the maximum RPM plus one, this makes the sound play
	// up to twice it's pitch, where it will suddenly drop when it switches gears.
	GetComponent.<AudioSource>().pitch = Mathf.Abs(EngineRPM / MaxEngineRPM) + 0.5 ;
	// this line is just to ensure that the pitch does not reach a value higher than is desired.
	if ( GetComponent.<AudioSource>().pitch > 1.5 ) {
		GetComponent.<AudioSource>().pitch = 1.5;
	}

	// finally, apply the values to the wheels.	The torque applied is divided by the current gear, and
	// multiplied by the user input variable.
	//if (FrontWheelDrive) {
	//	FrontLeftWheel.motorTorque = -EngineTorque * GearRatio[CurrentGear]*DifferentialRatio * Input.GetAxis("Vertical") *1000;
	//	FrontRightWheel.motorTorque = -EngineTorque * GearRatio[CurrentGear]*DifferentialRatio * Input.GetAxis("Vertical") *1000;
	//}
	//if (RearWheelDrive) {
		BackLeftWheel.motorTorque = -EngineTorque * GearRatio[CurrentGear] * DifferentialRatio * Input.GetAxis("Vertical") *100;
		BackRightWheel.motorTorque = -EngineTorque * GearRatio[CurrentGear] * DifferentialRatio * Input.GetAxis("Vertical") *100;
	//}

	// the steer angle is an arbitrary value multiplied by the user input.
	FrontLeftWheel.steerAngle = 35 * Input.GetAxis("Horizontal");
	FrontRightWheel.steerAngle = 35 * Input.GetAxis("Horizontal");
}

function ShiftGears() {
	// this funciton shifts the gears of the vehcile, it loops through all the gears, checking which will make
	// the engine RPM fall within the desired range. The gear is then set to this "appropriate" value.
	if ( EngineRPM >= MaxEngineRPM ) {
		var AppropriateGear : int = CurrentGear;
		
		for ( var i = 0; i < GearRatio.length; i ++ ) {
			if ( Mathf.Abs(BackLeftWheel.rpm + BackRightWheel.rpm)/2 * GearRatio[i]*DifferentialRatio < MaxEngineRPM ) {
				AppropriateGear = i;
				break;
			}
		}
		
		CurrentGear = AppropriateGear;
	}
	
	if ( EngineRPM <= MinEngineRPM ) {
		AppropriateGear = CurrentGear;
		
		for ( var j = GearRatio.length-1; j >= 0; j -- ) {
			if ( Mathf.Abs(BackLeftWheel.rpm + BackRightWheel.rpm)/2 * GearRatio[j]*DifferentialRatio > MinEngineRPM ) {
				AppropriateGear = j;
				break;
			}
		}
		
		CurrentGear = AppropriateGear;
	}
}