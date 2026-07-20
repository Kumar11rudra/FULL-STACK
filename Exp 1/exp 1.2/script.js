let drafts = JSON.parse(localStorage.getItem("drafts")) || [];

let editIndex = -1;

displayDrafts();

function saveDraft(){

const text = document.getElementById("draftText").value.trim();

const status = document.getElementById("status");

if(text===""){

status.style.color="red";
status.innerHTML="Please write something.";

return;

}

status.style.color="green";
status.innerHTML="Saving Draft...";

setTimeout(()=>{

drafts.push(text);

localStorage.setItem("drafts",JSON.stringify(drafts));

document.getElementById("draftText").value="";

status.innerHTML="Draft Saved Successfully.";

displayDrafts();

},800);

}

function displayDrafts(){

const list=document.getElementById("draftList");

list.innerHTML="";

drafts.forEach((draft,index)=>{

list.innerHTML+=`

<div class="card">

<p>${draft}</p>

<button class="edit" onclick="editDraft(${index})">
Edit
</button>

<button class="delete" onclick="deleteDraft(${index})">
Delete
</button>

</div>

`;

});

}

function editDraft(index){

document.getElementById("draftText").value=drafts[index];

editIndex=index;

}

function updateDraft(){

const text=document.getElementById("draftText").value.trim();

const status=document.getElementById("status");

if(editIndex==-1){

status.style.color="red";

status.innerHTML="Select a draft to edit.";

return;

}

drafts[editIndex]=text;

localStorage.setItem("drafts",JSON.stringify(drafts));

editIndex=-1;

document.getElementById("draftText").value="";

status.style.color="green";

status.innerHTML="Draft Updated Successfully.";

displayDrafts();

}

function deleteDraft(index){

if(confirm("Delete this draft?")){

drafts.splice(index,1);

localStorage.setItem("drafts",JSON.stringify(drafts));

displayDrafts();

}

}
