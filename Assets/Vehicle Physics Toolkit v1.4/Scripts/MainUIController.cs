using UnityEngine;
using System.Collections;
using UnityEngine.UI;


public class MainUIController : MonoBehaviour 
{
	#region sigleton

	private static MainUIController _instance=null;




	public static MainUIController Instance
	{
		get{
			if (_instance == null) {
				_instance = GameObject.FindObjectOfType (typeof(MainUIController)) as MainUIController;
			}
			return _instance;
		}
	}
	#endregion

	#region var

	public Text carSpeed;
	public Text currentClinet;
	#endregion





}
