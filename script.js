let calcData="";
let opened={};

function openApp(id,icon){
document.querySelectorAll(".window").forEach(w=>w.style.display="none");
document.getElementById(id).style.display="block";

if(!opened[id]){
let el=document.createElement("span");
el.innerText=icon;
el.onclick=()=>openApp(id,icon);
document.getElementById("taskApps").appendChild(el);
opened[id]=true;
}

speak("Opening "+id);
}

function closeApp(id){
document.getElementById(id).style.display="none";
}

function loadFolder(type){
let area=document.getElementById("fileArea");

if(type==="home"){
area.innerHTML=`
<div class="file" onclick="loadFolder('docs')">Documents</div>
<div class="file" onclick="loadFolder('images')">Images</div>`;
}

if(type==="docs"){
area.innerHTML=`<div class="file" onclick="showText()">Notes.txt</div>`;
}

if(type==="images"){
area.innerHTML=`<div class="file" onclick="showImage()">Photo</div>`;
}
}

function showText(){
document.getElementById("fileArea").innerHTML="<h2>Notes</h2><p>This is a sample file.</p>";
}

function showImage(){
document.getElementById("fileArea").innerHTML="<img src='https://images.unsplash.com/photo-1501785888041-af3ef285b470' width='100%'>";
}

window.onload=()=>loadFolder('home');

function addValue(v){
calcData+=v;
document.getElementById("screen").innerText=calcData;
}

function clearAll(){
calcData="";
document.getElementById("screen").innerText="0";
}

function removeLast(){
calcData=calcData.slice(0,-1);
document.getElementById("screen").innerText=calcData||"0";
}

function calculate(){
try{
calcData=Function('"use strict";return ('+calcData+')')();
document.getElementById("screen").innerText=calcData;
}catch{
document.getElementById("screen").innerText="Error";
calcData="";
}
}

function searchWeb(){
let q=document.getElementById("searchBox").value;
document.getElementById("browserFrame").src="https://www.bing.com/search?q="+encodeURIComponent(q);
}

function changeWall(n){
let walls=[
"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
"https://images.unsplash.com/photo-1501785888041-af3ef285b470"
];
document.body.style.background="url('"+walls[n-1]+"') center/cover no-repeat";
}

function speak(text){
if(!window.speechSynthesis) return;
let msg=new SpeechSynthesisUtterance(text);
speechSynthesis.cancel();
speechSynthesis.speak(msg);
}

function startVoice(){
speak("Voice system is working");
}