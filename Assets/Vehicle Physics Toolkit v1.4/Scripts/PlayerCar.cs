using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.Networking;

public class PlayerCar : NetworkBehaviour
{


	public float maxMotorTorque=10; // maximum torque the motor can apply to wheel
	public float maxSteeringAngle=10; // maximum steer angle the wheel can have


	public WheelCollider fl;
	public WheelCollider fr;
	public Transform flt;
	public Transform frt;
	public WheelCollider bl;
	public WheelCollider br;

	public Transform blt;
	public Transform brt;

	public float  maxbrakeTorque=99999999;
	public  Vector3 massCenter=Vector3.zero;
	public  Vector3 setMassCenter=Vector3.zero;
	public Rigidbody myRigidody;
	public float AntiRollForce=500;


	public Text t1;
	void Start () {
		myRigidody= this.gameObject.GetComponent<Rigidbody> ();
		massCenter = myRigidody.centerOfMass;

		if (isLocalPlayer) {
			Camera.main.transform.SetParent (this.transform);
			Camera.main.transform.localPosition= new Vector3 (0,6,-13);
			Camera.main.transform.localRotation = Quaternion.Euler (7,0,0);
			myRigidody.centerOfMass = Vector3.zero;
		}
	}
	void OnGUI1()
	{
		if (GUILayout.Button ("setCenter"))
		{
			myRigidody.centerOfMass = setMassCenter;
		}
	}

	public float fr_torque_ratio = 0.0f;
	public float fl_torque_ratio = 0.0f;
	int carspeed=0;

	[SyncVar(hook="OnValueChange")]
	public int CurrentClinetCount=0;


	public void OnValueChange(int k){
		//if (isLocalPlayer) {
			MainUIController.Instance.currentClinet.text ="OnLine Car "+ k;
		//}
	}



	void Update () 
	{

		if (!isLocalPlayer)
			return;
		float motor = maxMotorTorque * Input.GetAxis("Vertical");
		float steering = maxSteeringAngle * Input.GetAxis("Horizontal");
		if (Input.GetKey (KeyCode.Space)) {
			bl.brakeTorque = maxbrakeTorque;
			br.brakeTorque = maxbrakeTorque;
		} else {

			bl.brakeTorque = 0;
			br.brakeTorque = 0;
			bl.motorTorque = motor;
			br.motorTorque = motor;
		}

		carspeed = Mathf.RoundToInt((bl.rpm + br.rpm) / 2*Mathf.PI*bl.radius/60*3.6f);

		MainUIController.Instance.carSpeed.text = "speed "+carspeed+":km/h";
		//t1.text = bl.rpm + "";

		fl.steerAngle = steering;
		fr.steerAngle = steering;

		driveWheelByCollder (fr, frt);
		driveWheelByCollder (fl, flt);
		driveWheelByCollder (bl, blt);
		driveWheelByCollder (br, brt);



		WheelHit hitFr;
		bool isGround_fr = fr.GetGroundHit (out hitFr);
		if (isGround_fr) {
			fr_torque_ratio = (-fr.transform.InverseTransformPoint (hitFr.point).y-fr.radius)/fr.suspensionDistance;
		}

		WheelHit hitfl;
		bool isGroundfl = fl.GetGroundHit (out hitfl);
		if (isGroundfl) {
			fl_torque_ratio=(-fl.transform.InverseTransformPoint(hitfl.point).y-fl.radius)/fl.suspensionDistance;
		}

		float addTorque = (fl_torque_ratio - fl_torque_ratio) * AntiRollForce;
		if (isGroundfl) {
			myRigidody.AddForceAtPosition (flt.transform.up * -addTorque, flt.transform.position);

		}
		if (isGround_fr) {
			myRigidody.AddForceAtPosition (frt.transform.up * addTorque, frt.transform.position);
		}




	}


	private void driveWheelByCollder(WheelCollider c,Transform t){
		Vector3 position;
		Quaternion rotation;
	    c.GetWorldPose (out position, out rotation);

		t.transform.position = position;
		t.rotation = rotation;
	}



	public override void OnStartLocalPlayer ()
	{
		base.OnStartLocalPlayer ();
		if (isLocalPlayer) {
			CmdAddPlayer ();
		}
	}



	[Command]
	public void CmdAddPlayer(){
		MainSenceController.Instance.AddNewPlayer (this);
		CurrentClinetCount=MainSenceController.Instance.listPlayers.Count;
	}

}
