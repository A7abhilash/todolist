var x=$('#input');
$('#btn').click(function(){
    $('.list').append('<li class="newList">' + x.val() + '<i id="remove" class="fa fa-trash"></i></li>');
});

 $('ul').on('click',"i",function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    event.stopPropogation();
}); 

