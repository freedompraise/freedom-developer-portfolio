$(function () {
  $(
    "#contactFormEmail input, #contactFormEmail textarea"
  ).jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {},
    submitSuccess: function ($form, event) {
      event.preventDefault();
      var name = $("input#name").val();
      var email = $("input#email").val();
      var subject = $("input#subject").val();
      var message = $("textarea#message").val();

      $this = $("#sendMessageButton");
      $this.prop("disabled", true);

      $.ajax({
        url: "https://formspree.io/f/xwpezypk",
        type: "POST",
        data: {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        cache: false,
        success: function () {
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            )
            .append("<strong>Your message has been sent. </strong>")
            .append("</div>");
          $("#contactFormEmail").trigger("reset");
        },
        error: function () {
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            )
            .append(
              $("<strong>").text(
                "Sorry " +
                  name +
                  ", it seems that our mail server is not responding. Please try again later!"
              )
            )
            .append("</div>");
          $("#contactFormEmail").trigger("reset");
        },
        complete: function () {
          setTimeout(function () {
            $this.prop("disabled", false);
          }, 1000);
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $(
    "#contactFormWhatsApp input, #contactFormWhatsApp textarea"
  ).jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {},
    submitSuccess: function ($form, event) {
      event.preventDefault();
      var name = $("input#name-whatsapp").val();
      var phone = $("input#phone-whatsapp").val();
      var message = $("textarea#message-whatsapp").val();

      $this = $("#sendMessageWhatsAppButton");
      $this.prop("disabled", true);

      $.ajax({
        url: "https://api.whatsapp.com/send",
        type: "GET",
        data: {
          phone: "+2349074577147",
          text:
            "Name: " + name + "%0APhone: " + phone + "%0AMessage: " + message,
        },
        cache: false,
        success: function () {
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            )
            .append("<strong>Your message has been sent. </strong>")
            .append("</div>");
          $("#contactFormWhatsApp").trigger("reset");
        },
        error: function () {
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            )
            .append(
              $("<strong>").text(
                "Sorry " +
                  name +
                  ", it seems that our WhatsApp server is not responding. Please try again later!"
              )
            )
            .append("</div>");
          $("#contactFormWhatsApp").trigger("reset");
        },
        complete: function () {
          setTimeout(function () {
            $this.prop("disabled", false);
          }, 1000);
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

$("#name").focus(function () {
  $("#success").html("");
});
