 //****** SELECT ITEMS  *****
var alert = $('.alert')
const form = $(".form");
var input = $('#input');
const submit = $('#btn');
var list = $('.list');

//Edit option
let editElement;
let edit;
let editFlag = false;

//****** EVENT LISTNER *****
$('form').submit(addItem);

//****** FUNCTIONS *****

//Adding a new item into the list
function addItem(event){
    event.preventDefault(); // To prevent adding empty items
    //console.log(input.val());
    const value = input.val();
    const key = new Date().getTime().toString(); //Simply written to get a unique number to set it as id
    //console.log(id);
    if(value!=='' && editFlag === false) // Enter
    {
        //console.log("Enter");

        displayAlert("Item Added Successfully" , "success");
       
        list.append(`
            <div id=${key} class="eachList row">
                <div class="col-8">${value}</div>
                <div class="col-2">
                    <i id="edit" class="fas fa-edit"></i>
                </div>
                <div class="col-2">
                    <i id="remove" class="fas fa-trash"></i>
                </div>
            </div>
        `);
        
        $('.eachList #edit').click(editItem);
        $('.eachList #remove').click(removeItem);
        //add to local storage
        addtoLocalStorage(key,value);
        //set back to default
        setBackToDefault();
        
    }
    else if(value!=='' && editFlag === true) //Edit
    {
        //console.log("Edit");
        displayAlert("Item Edited Successfully","success");
        editElement.css('visibility','visible');
        edit.textContent=value;
        
        let x = editElement[0].id; //key
        //console.log(x);
        
        addToLocalStorage(x,value);
        setBackToDefault();
    }
    else //Empty input
    {
        //console.log("Empty");
        displayAlert("Empty Value" , "warning");
    }
}

//Display ALERT
function displayAlert(text,bg)
{
    alert.html(text) 
    alert.addClass(`bg-${bg}`);

//Remove ALERT
    setTimeout(function(){
        alert.html('') 
        alert.removeClass(`bg-${bg}`);
    },1500);
}

//Set back to default is used to remove the item in the placeholder
function setBackToDefault(){
    //console.log("set back")
    input.val('');
    editFlag = false;
    submit.html("Enter")
    $('.count').html(localStorage.length);
}

// Edit item
function editItem(event){
    editElement = $(this).parent().parent();
    edit = editElement[0].children[0];
    //console.log(edit);
    input.val(edit.textContent);
    editElement.css('visibility','hidden');
    
    editFlag=true;
    submit.html('Edit');
}

//Remove Item
function removeItem(event){
    //console.log('remove')
    const element = $(this).parent().parent();
    //console.log(element);
    let key = element[0].id;
    //console.log(key);

    removeFromLocalStorage(key);

    element.fadeOut(500 ,function(){
        $(this).remove();
        setBackToDefault();       
    });

    displayAlert("Item Removed Successfully","danger")
}

//****** LOCAL STRORAGE *****
function addtoLocalStorage(key,value){
    //console.log("local")
    localStorage.setItem(key,value);
}

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
}

//****** SETUP ITEMS *****
window.onload = function(){
    setBackToDefault();
    for(let i=0;i<localStorage.length;i++)
    {
        //console.log(localStorage.getItem(id[i]));
        displayAlert("Items Loaded Successfully" , "primary");
        
        var key = localStorage.key(i);
        list.append(`
            <div id=${key} class="eachList row">
                <div class="col-8">
                    ${localStorage.getItem(key)}
                </div>
                <div class="col-2">
                    <i id="edit" class="fas fa-edit"></i>
                </div>
                <div class="col-2">
                    <i id="remove" class="fas fa-trash"></i>
                </div>
            </div>
        `);
        
        $('.eachList #edit').click(editItem);
        $('.eachList #remove').click(removeItem);
    }
};

//****** Remove Suggestions from INPUT ****
input.autocomplete({
    source:[]
});

