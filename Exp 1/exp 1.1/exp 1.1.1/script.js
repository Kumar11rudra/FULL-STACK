const post = document.getElementById("post");

const count = document.getElementById("count");

const message = document.getElementById("message");

const media = document.getElementById("media");

const filename = document.getElementById("filename");

const limits = {

Twitter:280,
Facebook:5000,
Instagram:2200,
LinkedIn:3000

};

post.addEventListener("input",validate);

document.querySelectorAll(".platform").forEach(box=>{

box.addEventListener("change",validate);

});

media.addEventListener("change",()=>{

if(media.files.length>0){

filename.innerHTML="Attached File : "+media.files[0].name;

}

});

function validate(){

let text=post.value;

count.innerHTML=text.length;

let selected=[];

document.querySelectorAll(".platform:checked").forEach(box=>{

selected.push(box.value);

});

if(selected.length===0){

message.className="error";

message.innerHTML="Please select at least one platform.";

return;

}

let errors=[];

selected.forEach(platform=>{

if(text.length>limits[platform]){

errors.push(platform+" character limit exceeded ("+limits[platform]+")");

}

});

if(errors.length>0){

message.className="error";

message.innerHTML=errors.join("<br>");

}

else{

message.className="success";

message.innerHTML="✔ Post is valid for selected platform(s).";

}

}

document.getElementById("publishBtn").addEventListener("click",()=>{

let text=post.value.trim();

if(text===""){

alert("Please enter your post.");

return;

}

if(message.className==="error"){

alert("Please fix validation errors before publishing.");

return;

}

alert("Post Published Successfully!");

});
