/*
* Template Name: Sunshine - Responsive vCard Template
* Author: LMPixels (Linar Miftakhov)
* Author URL: http://themeforest.net/user/lmpixels
* Version: 1.0
*/

(function($) {
"use strict";
    
    // Portfolio subpage filters
    function portfolio_init() {
        var portfolio_grid = $('#portfolio_grid'),
            portfolio_filter = $('#portfolio_filters');
            
        if (portfolio_grid) {

            portfolio_grid.shuffle({
                speed: 450,
                itemSelector: 'figure'
            });

            $('.site-main-menu').on("click", "a", function (e) {
                portfolio_grid.shuffle('update');
            });


            portfolio_filter.on("click", ".filter", function (e) {
                portfolio_grid.shuffle('update');
                e.preventDefault();
                $('#portfolio_filters .filter').parent().removeClass('active');
                $(this).parent().addClass('active');
                portfolio_grid.shuffle('shuffle', $(this).attr('data-group') );
            });

        }
    }
    // /Portfolio subpage filters

    // Contact form validator
    $(function () {

        $('#contact-form').validator();

        $('#contact-form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var url = "contact_form/contact_form.php";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data)
                    {
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact-form').find('.messages').html(alertBox);
                            if (messageAlert == "alert-success") {
                                $('#contact-form')[0].reset();
                            }
                        }
                    }
                });
                return false;
            }
        });
    });
    // /Contact form validator

    // Text Rotator
    $.fn.extend({ 
            rotaterator: function(options) {

                var defaults = {
                    fadeSpeed: 500,
                    pauseSpeed: 100,
                    child:null
                };
                 
                var options = $.extend(defaults, options);
             
                return this.each(function() {
                      var o =options;
                      var obj = $(this);                
                      var items = $(obj.children(), obj);
                      items.each(function() {$(this).hide();});
                      if(!o.child){var next = $(obj).children(':first');
                      }else{var next = o.child;
                      }
                      $(next).fadeIn(o.fadeSpeed, function() {
                            $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
                                var next = $(this).next();
                                if (next.length === 0){
                                        next = $(obj).children(':first');
                                }
                                $(obj).rotaterator({child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed});
                            });
                        });
                });
            }
        });
    // /Text Rotator

    // Hide Mobile menu
    function mobileMenuHide() {
        var windowWidth = $(window).width();
        if (windowWidth < 1024) {
            $('#site_header').addClass('mobile-menu-hide');
        }
    }
    // /Hide Mobile menu

    // Animate page loader
    $(window).on('load', function() {
        $(".preloader").fadeOut("slow");
    });

    $(document).ready(function(){

        // Initialize Portfolio grid
        var $portfolio_container = $("#portfolio-grid");

        $portfolio_container.imagesLoaded(function () {
            setTimeout(function(){
                portfolio_init(this);
            }, 500);
        });

        // Portfolio hover effect init
        $(' #portfolio_grid > figure > a ').each( function() { $(this).hoverdir(); } );

        // Mobile menu
        $('.menu-toggle').click(function() { 
            $('#site_header').toggleClass('mobile-menu-hide');
        });

        // Testimonials Slider
        var $testimonials = $(".testimonials.owl-carousel").owlCarousel({
            nav: true, // Show next/prev buttons.
            items: 1, // The number of items you want to see on the screen.
            loop: true, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 10,
        });

        // Reinit testimonials carousel on subpage change
        $('.site-main-menu').on("click", "a", function (e) {
           $testimonials.trigger('refresh.owl.carousel');
        });

        // Text rotator init
        $('#rotate').rotaterator({fadeSpeed:800, pauseSpeed:1900});
 

         // Blog grid init
        setTimeout(function(){
            var $container = $(".blog-masonry");
            $container.masonry();
        }, 500);

        $('.site-main-menu').on("click", "a", function (e) {
            var $container = $(".blog-masonry");
            $container.masonry();
        });

        // Lightbox init
        $('.lightbox').magnificPopup({
            type: 'image',
            removalDelay: 300,

            // Class that is added to popup wrapper and background
            // make it unique to apply your CSS animations just to this exact popup
            mainClass: 'mfp-fade',
            image: {
                // options for image content type
                titleSrc: 'title'
            },

            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '<div class="mfp-title mfp-bottom-iframe-title"></div>'+
                      '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                      id: 'v=', // String that splits URL in a two parts, second part should be %id%
                      // Or null - full URL will be returned
                      // Or a function that should return %id%, for example:
                      // id: function(url) { return 'parsed id'; }

                      src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                      index: 'vimeo.com/',
                      id: '/',
                      src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                      index: '//maps.google.',
                      src: '%id%&output=embed'
                    }
                },

                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            },

            callbacks: {
                    markupParse: function(template, values, item) {
                     values.title = item.el.attr('title');
                    }
                },
        });


    });

    // Mobile menu hide
    $(window).on('resize', function() {
         mobileMenuHide();
    });

    // Mobile menu hide on main menu item click
    $('.site-main-menu').on("click", "a", function (e) {
        mobileMenuHide();
    });

})(jQuery);
