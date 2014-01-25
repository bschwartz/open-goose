(function($) {
  $(function() {
    var resizeNav = function() {
      var navHeight = $(window).height() - $("#header").outerHeight(true)
      $("#body .nav_col").height(navHeight);
    };
    resizeNav();
    $(window).resize(resizeNav);

    var openFullscreen = function() {
      var $action = $("#header .search.action");
      var $header = $("#header");
      var $navCol = $("#body .nav_col");
      var $leftActions = $("#footer .left_actions");
      $header.animate({ marginTop: -$header.outerHeight() }, 200);
      $navCol.animate({ marginLeft: -$navCol.outerWidth(), marginTop: -120 }, 200);
      $action.animate({ top: -$header.outerHeight() + 36 }, 200);
      $leftActions.animate({ left: -$leftActions.outerWidth() }, 200);
      $('body').addClass('in_fullscreen');
    };

    var closeFullscreen = function() {
      var $action = $("#header .search.action");
      var $header = $("#header");
      var $navCol = $("#body .nav_col");
      var $leftActions = $("#footer .left_actions");
      $header.animate({ marginTop: 0 }, 200);
      $navCol.animate({ marginLeft: 0, marginTop: 0 }, 200);
      $action.animate({ top: 36 }, 200);
      $leftActions.animate({ left: 36 }, 200);
      $('body').removeClass('in_fullscreen');
    };

    $(".fullscreen.action").click(function(e) {
      e.preventDefault();
      if (!$('body').is('.in_fullscreen')) {
        openFullscreen();
      } else {
        closeFullscreen();
      }
    });

    // cmd + enter opens fullscreen
    /*
    var isCmd = false;
    $(document).keyup(function (e) {
      if (e.which == 91 || e.which == 93) isCmd=false;
    }).keydown(function (e) {
      if (e.which == 91 || e.which == 93) isCmd=true;
      if (e.which == 13 && isCmd == true) {
        if (!$(e.sourceElement || e.target).is('texarea')) {
          openFullscreen();
          return false;
        }
      }
    });
    */

    // escape closes fullscreen
    $(document).keyup(function(e){
      if(e.keyCode === 27) {
        closeFullscreen();
      }
    });


    // goose winder
    var windingInterval = null;
    var isWinding = false;
    var speed = 0;

    $('img.logo').mouseover(function(){
      if (isWinding) return;
      isWinding = true;

      var wind = function(r) {
        if (!isWinding) return;

        speed = r;
        $('img.logo').css({
          transform: 'rotate(' + r + 'deg)'
        });
        setTimeout(function(){ wind(r * 1.05); }, 100);
      }
      wind(200);
    });

    $('img.logo').mouseout(function(){
      //wanderOff(speed);
      speed = 0;
      isWinding = false;
      //$('img.logo').css({
      //  transform: 'rotate(0deg)'
      //});
      $('img.logo').hide();
      $('img.walking-goose').show();
      $('img.goose-ring').show();

      setTimeout(function(){
        $('img.walking-goose').css({
          transform: 'translate(1600px,0px)'
        });
      }, 1750);
    });

    // goose wander
    var wanderOff = function(speed) {
      $('img.logo').css({
        transform: 'translate(' + speed + 'px,0px)'
      });
      setTimeout(wanderBack, 1000);
    }

    var wanderBack = function() {
      $('img.logo').css({
        transform: 'translate(0px,0px)'
      });
    }

  });
}(jQuery));
