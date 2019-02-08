$(document).ready(()=>{
  $('.btn-like').click(()=>{
    console.log($(this).val());/*
    if($(this).val()=='like')
      $(this).val('unlike');
    else
      $(this).val('like');*/
  });
});
function showlike(postid){
  $(document).ready(()=>{
    console.log("loaded");
    let url = "/posts/"+postid+"/likes";
    $.get(url,(data)=>{
      $('#likeBoxModal').html(data);
    },'html');
  });
};


function showComment(postid){
  $(document).ready(()=>{
    $.get('/posts/'+postid+'/comments',(data)=>{
      $('#c'+postid).html(data);
    },'html');
  });
};
   
function likepost(postid,bid){
  let xhttp = new XMLHttpRequest();
  let url = "/posts/"+postid+"/likes";
  xhttp.open('POST', url, true);  
 
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ){
      if(this.status==200){
        $(document).ready(()=>{
          $("#u"+bid).show();
          $("#l"+bid).hide();
         
        })
        return;
      }else{
        return window.alert(this.responseText);
      }  
    }              
  };
}
        
   
function unlikepost(postid,bid){
  
  let xhttp = new XMLHttpRequest();
  let url = "/posts/"+postid+"/likes";
  xhttp.open('DELETE', url, true);  
  xhttp.send();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ){
      if(this.status==200){
        $(document).ready(()=>{
          $("#u"+bid).hide();
           $("#l"+bid).show();
        })    
        return;      
      }else
        return window.alert(this.responseText);
    }
  };
}
      