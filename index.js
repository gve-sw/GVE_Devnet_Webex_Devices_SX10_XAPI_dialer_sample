/*
Copyright (c) 2020 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*/

//Constructor for creating a endpoint object with video xapi.
const util = require('util');
const EventEmitter = require('events').EventEmitter;
const jsxapi = require('jsxapi');
const CUSTOM_PANEL_BUTTON='panel_dial_custom';
const CUSTOM_DESTINATION='user@acme.com';
const USER_PWD='username';
const USER_NAME='userpassword';

//pass in object 
function ConnxAPI(endpoint){
    this.endpoint = endpoint;
    this.xapi;
    this.connectedStatus = 'false';
    this.domain = '.webex.com';
    this.mysite = 'mysite';
    this.init();
}
util.inherits(ConnxAPI,EventEmitter);
ConnxAPI.prototype.init = function(){
    const self = this;
    return self.connect()
        .then((status) =>{
            console.log(status);
            self.onReady();
            return;
        })
        .catch((err) => {
            console.error(err);
        })
}
//connect to ssh service on endpoints
ConnxAPI.prototype.connect = function() {
    var self = this;
    return new Promise((resolve, reject) => {
        self.xapi = jsxapi.connect('ssh://' + self.endpoint.ipAddress||self.endpoint.url, {
            username: self.endpoint.username,
            password: self.endpoint.password,
            keepaliveInterval: 4000
        });
        self.onError();
        resolve ("Connection opening..........")
            .catch ((err) => {
                reject (console.error(err));
            });
    });
}
//close ssh connection
ConnxAPI.prototype.closeConnect =  function(){
    const self = this;
    return new Promise((resolve, reject) => {
        console.log("xapi session closed.");
        self.connectedStatus = "false";
        resolve (self.xapi.close());
        return self;

    })
};
//Load event monitoring after connecting via ssh to endpoint
ConnxAPI.prototype.onReady =  function(){
    const self = this;
    self.xapi.on('ready', () => {
        console.log("connexion successful!");
        self.connectedStatus = "true";
        self.customCalling();
        return self;
    })
};
//event monitors for custom calling panel button press
ConnxAPI.prototype.customCalling = function(){
    const self =this;

    self.xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
        if (event.PanelId==CUSTOM_PANEL_BUTTON){
            console.log('Dialing custom destination...');
            self.xapi.command("dial", {Number: CUSTOM_DESTINATION});
        }
    });
};
//track ssh error events and reconnect
ConnxAPI.prototype.onError =  function(){
    const self = this;
    self.xapi.on('error', (err) => {
        console.error(`connexion failed: ${err}`);
        if(err === 'client-timeout'){
            setTimeout(function(){
                self.init();
            }, 4000)
        }else{
            self.closeConnect();
            setTimeout(function(){
                self.init();
            }, 4000)
        }
    });
};


var fs = require('fs');
var ip_address_lines = fs.readFileSync('endpoints_ip.txt').toString().split("\n");
var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/; 
var codecs = [];
var the_match= [];
for (j in ip_address_lines)
{
    the_match = ip_address_lines[j].match(r);
    if (the_match.length==1) {
        codecs.push(the_match[0]);
    }
}
console.log("Device addresses loaded: ");
for(i in codecs) {
    console.log(codecs[i]);
}
const videoArray = [];
codecs.forEach( function (ip) {
    if (ip!="") {
    const endpoint = {
            'password':USER_PWD,
            'username':USER_NAME,
            'ipAddress':ip
    };
    const videoCodec = new ConnxAPI(endpoint);
    videoArray.push(videoCodec);
    }
});
