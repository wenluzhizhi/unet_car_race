using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.Networking;

public class MainSenceController :MonoBehaviour
{


	#region sigleton

	private static MainSenceController _instance=null;
	public static MainSenceController Instance
	{
		get{
			if (_instance == null) {
				_instance = GameObject.FindObjectOfType (typeof(MainSenceController)) as MainSenceController;
			}
			return _instance;
		}
	}
	#endregion




	public List<PlayerCar> listPlayers=new List<PlayerCar>();


	public void AddNewPlayer(PlayerCar p)
	{
		
		listPlayers.RemoveAll (delegate(PlayerCar go) {
			return (go==null);
		});
		if (!listPlayers.Contains (p)) {
			listPlayers.Add (p);
		}


	}




}
