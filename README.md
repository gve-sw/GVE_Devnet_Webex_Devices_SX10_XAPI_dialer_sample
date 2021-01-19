#  Webex Devices SX10 XAPI dialer sample
Sample code that uses xAPI and the JSXAPI library to implement custom dial buttons on Webex Room devices running from a central server. This is particularly useful for SX10 devices that cannot run macros on-board. 

Many thanks to **Chris Norman** for his sample code that was used as a base for this one: http://voipnorm.blogspot.com/2018/08/running-macros-for-cisco-sx10-or-any.html

## Contacts
* Gerardo Chaves (gchaves@cisco.com)

## Solution Components
* Webex Collaboration Devices
* Cisco Webex Endpoint API - xAPI

## Installation/Configuration

1) Make sure you have node.js installed on your computer: https://nodejs.org/en/download/. 

2) Install the jsxapi library if you have not done so yet:  
```npm install jsxapi```  
If you are unfamiliar with the jsxapi library and how it interacts with Cisco Webex Collaborations devices, you can take the [Creating custom in-room controls and Macros for Cisco collaboration devices](https://developer.cisco.com/learning/lab/collab-xapi-controls/step/1) Learning Lab from Cisco Devnet which gives you step-by-step instructions on how to create in-room controls and how to interact with them using code either as macros (not supportd on SX10 devices) or via the jsxapi library from a separate computer running node.js

3) Download or clone all files from this repository into the local directory of the machine from where you will execute the code  
Example:  
```  
git clone https://wwwin-github.cisco.com/gve/GVE_Devnet_Webex_Devices_SX10_XAPI_dialer_sample.git
cd GVE_Devnet_Webex_Devices_SX10_XAPI_dialer_sample
```  

4) Using your favorite editor, fill out the hostname or IP addresses for each device you wish to control in the `endpoints_ip.txt` file (one per line)  

5) Edit `index.js` file and assign the appropriate values for your setup:  
**CUSTOM_PANEL_BUTTON**: The id of the panel button on the device you would like to use to place the custom call (example:  'panel_dial_custom')  
**CUSTOM_DESTINATION**: The number of SIP URI to dial when the custom button is pressed (example: 'user@acme.com')  
**USER_NAME**: Username of the integration account being used to connect to the devices (same for all)  
**USER_PWD**: Password of the integration account being used to connect to the devices (same for all) 

6) Each Collaboration Device to be used needs to have a local user account configured on it for this script to be able to 
register for events and send commands to it via SSH using the JSXAPI library.    
Here are instructions on how to create such accounts:  
https://help.webex.com/en-us/jkhs20/Local-User-Administration-on-Room-and-Desk-Devices  
You must assign Admin, Integrator and RoomControl privileges to the account but you might also want to add User and Audit privileges as well so you can fully control the device via web page if necessary for testing.  
You must use the same username/password for all devices to use this script and they have to match the **USER_NAME** and **USER_PWD**  you defined in the previous step.  


### Running the code

Once you have perfomed the steps in the configuration section above, you can start the node.js server process with the following command:  


 ```node index.js```
 
### Usage  

Once the code is running, it connect to all devices listed in the `endpoints_ip.txt` file and will listen for button presses on the corresponding Touch 10 devices. If panel button with ID **CUSTOM_PANEL_BUTTON*** is pressed on any of them, the code will send back the command have the same device dial **CUSTOM_DESTINATION** . 


### LICENSE

Provided under Cisco Sample Code License, for details see [LICENSE](LICENSE.md)

### CODE_OF_CONDUCT

Our code of conduct is available [here](CODE_OF_CONDUCT.md)

### CONTRIBUTING

See our contributing guidelines [here](CONTRIBUTING.md)

#### DISCLAIMER:
<b>Please note:</b> This script is meant for demo purposes only. All tools/ scripts in this repo are released for use "AS IS" without any warranties of any kind, including, but not limited to their installation, use, or performance. Any use of these scripts and tools is at your own risk. There is no guarantee that they have been through thorough testing in a comparable environment and we are not responsible for any damage or data loss incurred with their use.
You are responsible for reviewing and testing any scripts you run thoroughly before use in any non-testing environment.

