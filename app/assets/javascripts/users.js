
$(function() {
  $(document).on('turbolinks:load', function () {
    $(".user-search-remove").off('click');

    $(".user-search-remove").on('click', function() {
           $(this).parent().remove();
    });   

    var search_list = $("#user-search-result");
    var selected_list = $(".chat-group-users");

  function appendProduct(user) {
     var html = `<div class="chat-group-user clearfix">
     <p class="chat-group-user__name">${ user.name }</p>
     <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
     </div> `
     search_list.append(html);
    }

    function appendErrMsgToHTML(msg) {
      var html = ` <p class="chat-group-user__name">${msg} </p>`
      search_list.append(html);
    }

    function appendUser(user) {
      var html = 
      `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-356">
      <input name="group[user_ids][]" type="hidden" value="${ user.id }">
      <p class="chat-group-user__name">${ user.name }</p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${ user.id }">削除</a>
       </div>`
 
      selected_list.append(html);
    }

   
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
      
      
        .done(function(users) {
          
          $("#user-search-result").empty();
          
          if (users.length !== 0) { 
                users.forEach(function(user){
                  appendProduct(user);        
                 
                $(".user-search-add").off('click');
                  $(".user-search-add").on('click', function() {

                    const userid = $(this).attr('data-user-id'); 
                    $(this).parent().remove();
            
                      var adduser = $.grep(users,function(obj,idx){
                      return(obj.id == userid)
                      });
                        
                      appendUser(adduser[0]);
                                        
                      $(".user-search-remove").off('click');

                      $(".user-search-remove").on('click', function() {
                              $(this).parent().remove();
                      });
                  });
              });
          }
          else {
            appendErrMsgToHTML("一致するユーザーが見つかりません");
          }

        })
      .fail(function() {
      alert('error');
      });
    });
  });
}); 

