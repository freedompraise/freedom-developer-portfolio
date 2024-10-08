$(function () {
  $(
    "#contactFormEmail input, #contactFormEmail textarea"
  ).jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($) {},
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
          _replyto: email,
          subject: subject,
          message: message,
        },
        dataType: "json",
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

  $("#contactFormWhatsApp").on("submit", function (event) {
    event.preventDefault();
    var name = $("input#name-whatsapp").val();
    var message = $("textarea#message-whatsapp").val();

    var contactMessage = `Contact Details:\nName: ${name}\nMessage: ${message}`;
    var encodedMessage = encodeURIComponent(contactMessage);
    var whatsappURL = `https://wa.me/2349074577147/?text=${encodedMessage}`;
    window.location.href = whatsappURL;
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

$("#name").focus(function () {
  $("#success").html("");
});

$(document).ready(function () {
  $("#service").change(function () {
    if ($(this).val() === "custom") {
      $("#message-group").show();
      $("#hire-message").attr("required", true);
    } else {
      $("#message-group").hide();
      $("#hire-message").attr("required", false);
    }
  });

  $("#hireMeForm").on("submit", function (event) {
    event.preventDefault();

    var service = $("#service").val();
    var name = $("#hire-name").val();
    var contact = $("#hire-contact").val();
    var message = $("#hire-message").val() || "No additional message provided.";

    var formData = {
      service: service,
      name: name,
      contact: contact,
      message: message,
    };

    $.ajax({
      url: "https://formspree.io/f/xwpezypk",
      method: "POST",
      dataType: "json",
      data: formData,
      success: function () {
        $("#hireMeModal").modal("hide");
        alert("Your message has been sent successfully!");
      },
      error: function () {
        alert(
          "There was an error sending your message. Please try again later."
        );
      },
    });
  });

  $("#hireMeButton").click(function () {
    $("#hireMeModal").modal("show");
  });
});
