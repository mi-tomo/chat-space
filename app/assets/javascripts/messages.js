$(window).on('load',function(){
  if(document.URL.match(/(messages)/)) {
  
      
    $(function() {
      var buildMessageHTML = function(message) {
        var today = message.created_at.toString();
              today = today.slice(0, 16);
              today = today.replace( /-/g, '/' ); 
              today = today.replace( 'T', ' ' ); 
          var img = ""
              if (message.image['url'] !== null) {
               img = `<img class="lower-message__image" src="${message.image['url'] }">`
              }
              var html =`<div class="message">
              <div class="upper-message">
              <div class="upper-message__user-name">
              ${message.user_name}
              </div>
              <div class="upper-message__date">
              ${today}
              </div>
              </div>
              <div class="lower-message" id="${message.id}" >
              ${message.content}
              </div>
              ${ img }
              </div>`


    
        return html;
      };
        $(function() {

          
          var reloadMessages = function() {
            document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});
            
            var list = [0];
          $(".lower-message").each(function() {
            list.push($(this).attr('id'));
            });
              var last_message_id = list.slice(-1)[0];
              let stopper = last_message_id;
              $.ajax({
                url: 'api/messages',
                type: 'get',
                dataType: 'json',
                data: {id: last_message_id}
              })
            
            .done(function(messages) {
              if (messages.length !== 0) { 
                    

                    messages.forEach(function(message){
                    
                      if ( message.id > stopper  ){
                      var html = buildMessageHTML(message);
                      $('.messages').append(html)
                      stopper =message.id
      
                
                    }
                    });

                  $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
              }
              else{
                
              }
              
          })
          .fail(function() {
            console.log('error');
          })
      
      };
      setInterval(reloadMessages, 5000);
      
    });
  });
 }
});