
function showlike(postid){
  $(document).ready(()=>{
    // console.log("loaded");
    let url = "/posts/"+postid+"/likes";
    $.get(url,(data)=>{
      $('#likeBoxModal').html(data);
    },'html');
  });
};


function likepost(postid){
  $(document).ready(() => {
    $.post('/posts/' + postid + '/likes', (data) => {
      //window.alert(data);
      $('#like' + postid).html(data);
    }, 'html');
    $('#likeBox').modal('toggle');
  });
}
function unlikepost(postid) {

  let xhttp = new XMLHttpRequest();
  let url = "/posts/" + postid + "/likes";
  xhttp.open('DELETE', url, true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
          $(document).ready(()=>{

            //window.alert(this.response);
            $('#like' + postid).html(this.response);

          })
        return;
      } else
        window.alert(this.responseText);
        location.reload();
        return;
    }
  };
}

function showComment(postid) {
  $(document).ready(() => {
    $.get('/posts/' + postid + '/comments', (data) => {
      $('#c' + postid).html(data);
    }, 'html');
  });
};


function addComment(postid) {
  let text = document.getElementById(postid+"#ta").value;
  
  let xhttp = new XMLHttpRequest();
  let url = "/posts/" + postid + "/comments";
  xhttp.open('POST', url, true);
  xhttp.setRequestHeader("Content-Type","application/json")
  if(text.length==0)return;
  xhttp.send(JSON.stringify({'commentText':text}));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200)
       $(document).ready(() => {
          showComment(postid);
        })
      else
        alert(this.responseText);
    }
  };
};



function showReply(postid, commentid) {
  $(document).ready(() => {
    $.get('/posts/' + postid + '/comments/' + commentid + '/reply', (data) => {
      $('#r' + commentid).html(data);
    }, 'html');
  });
}


function addReply(postid,commentid) {
  let text = document.getElementById(commentid + "#rp").value;
  // console.log(text);
  if (text.length == 0) return;

  let xhttp = new XMLHttpRequest();
  let url = "/posts/" + postid + '/comments/'+commentid+"/reply";
  xhttp.open('POST', url, true);
  xhttp.setRequestHeader("Content-Type", "application/json")

  xhttp.send(JSON.stringify({ 'replyText': text }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200)
        $(document).ready(() => {
          return showReply(postid,commentid);
        })
      else
        return alert(this.responseText);
    }
  };
};
function deleteComment(postid, commentid) {

  let xhttp = new XMLHttpRequest();
  let url = "/posts/" + postid + "/comments/" + commentid;
  xhttp.open('DELETE', url, true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        $(document).ready(() => {
          showComment(postid);
        })

      } else
        window.alert(this.responseText);
      return;
    }
  };
}

function deleteReply(postid, commentid,replyid) {

  let xhttp = new XMLHttpRequest();
  let url = "/posts/" + postid + "/comments/" + commentid+'/reply/'+replyid;
  xhttp.open('DELETE', url, true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        $(document).ready(() => {
          showReply(postid,commentid);
        })
        return;
      } else
        window.alert(this.responseText);
      return;
    }
  };
}
function editPost(postid) {

  let form = document.getElementById('editTextForm');

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let text = document.getElementById("editText").value;
    if (text.length == 0) return;
    let xhttp = new XMLHttpRequest();
    let url = "/posts/" + postid;
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify({ 'editText': text }));

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          $(document).ready(() => {
            location.reload();
          })
        } else
          window.alert(this.responseText);
        return;
      }
    };
  });
}

function editComment(postid, commentid) {

  let form = document.getElementById('editTextForm');

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let text = document.getElementById("editText").value;
    if (text.length == 0) return;
    let xhttp = new XMLHttpRequest();
  let url = "/posts/" + postid + "/comments/" + commentid;
  xhttp.open('PUT', url, true);
  xhttp.setRequestHeader("Content-Type", "application/json")
  xhttp.send(JSON.stringify({ 'editText': text }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        $(document).ready(() => {

          $('#editBox').modal('toggle');
          showComment(postid);
        })
      } else
        window.alert(this.responseText);
      return;
    }
  };
});
}

function editReply(postid, commentid, replyid) {
  let form = document.getElementById('editTextForm');

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let text = document.getElementById("editText").value;
    if (text.length == 0) return;
    let xhttp = new XMLHttpRequest();
    let url = "/posts/" + postid + "/comments/" + commentid + '/reply/' + replyid;
    xhttp.open('PUT', url, true);
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify({ 'editText': text }));

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200){
          $(document).ready(() => {
            $('#editBox').modal('toggle');
            showReply(postid, commentid);
          })
          return;
        } else
          window.alert(this.responseText);
        return;
      }
    };

  });
}


      