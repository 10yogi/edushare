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
 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ){
      if(this.status==200){
        $(document).ready(()=>{
          $(bid).attr('value',"unlike");
        });
      }              
    }
  };
  xhttp.send();
}
        
   
function unlikepost(postid,bid){
  
  let xhttp = new XMLHttpRequest();
  let url = "/posts/"+postid+"/likes";
  xhttp.open('DELETE', url, true);  

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ){
      if(this.status==200){      
        $(document).ready(()=>{
          $(bid).attr('value',"like");
        });
      } 
    }
  };
  xhttp.send();
}
      