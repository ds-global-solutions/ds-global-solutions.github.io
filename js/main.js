/**
 *
 *  Main JavaScript
 *
 **/

// IIFE - Immediately Invoked Function Expression
(function ($, window, document) {

  // The $ is now locally scoped

  // Listen for the jQuery ready event on the document
  $(function () {

    // The DOM is ready!

    // Global Variables
    var $window = $(window);

    /**
     *  Page Loader
     **/
    setTimeout(function () {
      $('.page-loader').addClass('load-complete');
    }, 1500);

    /**
     *  Parallax with Scrollax.js - Initialization
     **/
    'use strict';
    $.Scrollax();

    /**
     *  Main Menu Navigation
     **/
    var $body = $('body');
    var $nav_menu = $('.navigation-bar');
    var $nav_menu_link = $('#navMenu ul li a');
    var $toggle_menu_button = $('.navTrigger');

    // Navigation Menu Link
    $nav_menu_link.on('click', function () {

      // Select Current Navigation Item
      $nav_menu_link.parent().removeClass('current-menu-item');
      $(this).parent().addClass('current-menu-item');

      // Close Mobile Menu
      $nav_menu.removeClass('active');
      $toggle_menu_button.removeClass('active');
      $body.removeClass('no-scroll');

    });

    // Toggle Mobile Menu
    $toggle_menu_button.on('click', function () {
      $nav_menu.toggleClass('active');
      $body.toggleClass('no-scroll');
      $(this).toggleClass('active');
    });

    // Remove all classes on window resize
    $window.on('resize', function () {
      $nav_menu.removeClass('active');
      $body.removeClass('no-scroll');
      $toggle_menu_button.removeClass('active');
    });

    /**
     *  Scroll Event
     **/
    $window.scroll(function () {

      // Scroll Variables
      var $scrollTop = $window.scrollTop();
      var $windowHeight = $window.height();

      /**
       *  Go to Top Button
       **/
      var $go_top = $('.go-to-top-button');

      if ($scrollTop > 600) {
        $go_top.addClass('active');
      } else {
        $go_top.removeClass('active');
      }

      // Reveal Item on Scroll
      function revealItem($container, $item) {
        if ($scrollTop > ($container.offset().top - $windowHeight / 1.3)) {

          $item.each(function (i) {
            setTimeout(function () {
              $item.eq(i).addClass("is-showing");
            }, 150 * (i + 1));
          });

        }
      }

    });

    /**
     *  Smooth Scrolling for Links
     **/
    $('a[href*="#"]:not([href="#"])').on('click', function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

    /**
     *  Contact form
     **/
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    }

    $("#form-section").submit(function(e) {
      e.preventDefault();

      var name = $("#contact-name").val();
      var email = $("#contact-email").val();
      var subject = $("#contact-subject").val();
      var message = $("#contact-message").val();
      var gotcha = $("#contact-gotcha").val();

      var div_button = $('#contact-action');

      if ( name.localeCompare("") === 0  || email.localeCompare("") === 0 || message.localeCompare("") === 0 ) {
        div_button.html('<button type="submit" class="send-button" value="Send" disabled><i class="fa fa-exclamation-triangle"></i>Fields empty</button>');

        setInterval(
          function () {
              div_button.html('<button type="submit" class="send-button" value="Send"><i class="fa fa-paper-plane"></i>Send Message</button>');
          }, 3000
        );
      } else if (!isValidEmailAddress(email)) {
        div_button.html('<button type="submit" class="send-button" value="Send" disabled><i class="fa fa-exclamation-triangle"></i>Check email</button>');

        setInterval(
            function () {
              div_button.html('<button type="submit" class="send-button" value="Send"><i class="fa fa-paper-plane"></i>Send Message</button>');
            }, 3000
        );
      } else {
        $.ajax({
          url: 'https://formspree.io/f/' + formspree_id,
          method: 'POST',
          data: {
            name: name,
            email: email,
            subject: subject,
            message: message,
            _gotcha: gotcha
          },
          dataType: "json",
          beforeSend: function() {
            div_button.html('<button type="submit" class="send-button" value="Send" disabled><i class="fa fa-spinner fa-spin"></i>In progress</button>');
          },
          success: function(data) {
            div_button.html('<button type="submit" class="send-button" value="Send" disabled><i class="fa fa-check"></i>Message sent</button>');

            setInterval(
              function () {
                // Erase form fields
                $('#contact-name').val("");
                $('#contact-email').val("");
                $('#contact-subject').val("");
                $('#contact-message').val("");

                div_button.html('<button type="submit" class="send-button" value="Send"><i class="fa fa-paper-plane"></i>Send Message</button>');
              }, 3000
            );
          },
          error: function(err) {
            div_button.html('<button type="submit" class="send-button" value="Send" disabled><i class="fa fa-exclamation-triangle"></i>Send failed, try again</button>');

            setInterval(
              function () {
                div_button.html('<button type="submit" class="send-button" value="Send"><i class="fa fa-paper-plane"></i>Send Message</button>');
              }, 4000
            );
          }
        });
      }

      return false;
    });

  });

}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter
