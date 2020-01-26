$(function(){

  function buildHTML(message){
    var html =
      `<div class="message" data-message-id="${message.id}">
        <div class="message__info">
          <div class="message__info__speaker">
            ${message.user_name}
          </div>
          <div class="message__info__date">
            ${message.created_at}
          </div>
        </div>`
    if ( message.image ) {
      if ( message.content ) {
        html +=
            `<div class="message__text">
              <p class="lower-message__content">${message.content}</p>
            </div>`;
        html +=
            `<img class="lower-message__image" src="${message.image}">
          </div>`
      }
      else {
        html +=
            `<img class="lower-message__image" src="${message.image}">
          </div>`
      }
    } else {
      html +=
          `<div class="message__text">
            <p class="lower-message__content">${message.content}</p>
          </div>
        </div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__message-list').append(html);
      $('.main__message-list').animate({ scrollTop: $('.main__message-list')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
      $('#new_message')[0].reset();
      $('.submit-btn').prop("disabled", false);
    })
  })
  function reloadMessages() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__message-list').append(insertHTML);
        $('.main__message-list').animate({ scrollTop: $('.main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("メッセージの受信に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});