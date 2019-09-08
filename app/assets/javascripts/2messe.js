
$(function(){
  

  function buildPost(post){

      var today = post.created_at.toString();
          today = today.slice(0, 16);
          today = today.replace( /-/g, '/' ); 
          today = today.replace( 'T', ' ' ); 
      var img = ""
          if (post.image['url'] !== null) {
              img = `<img class="lower-message__image" src="${ post.image['url'] }">`
          }
          var html =`<div class="message">
          <div class="upper-message">
          <div class="upper-message__user-name">
          ${post.user_name}
          </div>
          <div class="upper-message__date">
          ${today}
          </div>
          </div>
          <div class="lower-message" id="${post.id}">
          ${post.content}
          </div>
          ${ img }
          </div>`

        return html;
  }
 
 $('#new_message').on('submit',function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
 })
 .done(function(post){
  var html = buildPost(post);
  $('.messages').append(html)
  $("#new_message")[0].reset();
  $('input[name="commit"]').removeAttr("disabled");
  $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
 

 })
 .fail(function(){
      alert('エラ〜');
      $("#new_message")[0].reset();
      $('input[name="commit"]').removeAttr("disabled");
 })
})
});
