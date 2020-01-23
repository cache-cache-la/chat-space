$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__speaker">
              ${message.user_name}
            </div>
            <div class="message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__speaker">
              ${message.user_name}
            </div>
            <div class="message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.main__message-list').append(html);
      $('.main__message-list').animate({ scrollTop: $('.main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

  });
});