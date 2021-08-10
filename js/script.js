$(document).ready(function() {

    //drawer
    var $header = $( '.js-header' );

    // navigation
    $( '.js-toggle' ).on( 'click', function(e) {
      e.preventDefault();
      if( $(this).hasClass('js-open') ) {
        $header.removeClass( 'add-active' );
        $('body').removeClass('_fixed').css({ top: 0 });//背景固定を解除
        $(window).scrollTop(scrollPos);//元の位置までスクロール
      } else {
        scrollPos = $(window).scrollTop();//topからのスクロール位置を格納
        $( '.js-nav, .js-overlay' ).fadeIn();
        $( '.js-toggle' ).addClass('js-open');
        $header.addClass( 'add-active' );
        $('body').addClass('_fixed').css({ top: -scrollPos });//背景固定
      }
    });
    
    $( ' .js-overlay ' ).on( 'click', function(e) {
      e.preventDefault();
      $( '.js-nav, .js-overlay' ).fadeOut();
      $( '.js-toggle' ).removeClass('js-open');
      $('body').removeClass('_fixed').css({ top: 0 });//背景固定を解除
      $header.removeClass( 'add-active' );
      $(window).scrollTop(scrollPos);//元の位置までスクロール
    });

    var pcWidth = window.matchMedia( 'screen and (min-width: 769px)' );
    function checkBreakPoint() {
      if( pcWidth.matches ) {
        $header.removeClass( 'add-active' );
      }
    }
    pcWidth.addListener( checkBreakPoint );
    checkBreakPoint();

    //header scroll
    $(window).on('scroll', function() {
      if ($('.header').height() < $(this).scrollTop()) {
        $('.header').addClass('_scrolled');
      } else {
        $('.header').removeClass('_scrolled');
      }
    });

    // smooth scroll
    $( 'a[href^="#"]' ).on( 'click', function(e){
      var speed = 500;
      var href= $( this ).attr( 'href' );
      var target = $( href === '#' || href === '' ? 'html' : href );
      var position = target.offset().top  - ($header.outerHeight());
      $( 'html, body' ).animate( { scrollTop:position }, speed, 'swing' );
      e.preventDefault();
    });

    //tab
    $('.news-tabs li').on( 'click', function() {
      var index = $('.news-tabs li').index(this);
      $('.news-tabs li').removeClass('_active');
      $(this).addClass('_active');
      $('.news-lists ul').removeClass('_show').eq(index).addClass('_show');
    });


    //accordion

    $('.accordion-head').click(function () {
      $(this).next().slideToggle();
    });


    //swiper
    new Swiper('.swiper-container', {
    // この中にオプションを記述する。
    initialSlide: 2,
    loop: true,
    height: 407,
    slideToClickedSlide: true,
    slidesPerView: 1.7,
    spaceBetween: 40,
    centeredSlides: true,
    speed: 1000,
    autoplay: {
      delay: 5000
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
        speed: 1000,
        autoplay: {
          delay: 5000
        }
      },
      980: {
        slidesPerView: 3.7,
        spaceBetween: 56,
        speed: 1000,
        autoplay: {
          delay: 5000
        }
      },
      1920: {
        slidesPerView: 4.3,
        spaceBetween: 70,
        speed: 1000,
        autoplay: {
          delay: 5000
        }
      }
    }
    });

    //google form
    let $form = $( '#js-form' )

    $form.submit(function(e) { 
        $.ajax({ 
         url: $form.attr('action'), 
         data: $form.serialize(), 
         type: "POST", 
         dataType: "xml", 
         statusCode: { 
            0: function() { 
              //送信に成功したときの処理
              $form.slideUp()
              $( '#js-success' ).slideDown()
            }, 
            200: function() { 
                //送信に失敗したときの処理 
                $form.slideUp()
                $( '#js-error' ).slideDown()
            }
          } 
        });
        return false; 
    });

    //formの入力確認
    let $submit = $( '#js-submit' );
    let $name = $( '#js-form input[name="entry.834208983"]' );
    let $email = $( '#js-form input[name="entry.732421810"]' );

    $( '#js-form input, #js-form textarea' ).on( 'change', function() {
        if(
            $( '#js-form input[name="entry.834208983"]' ).val() !== "" &&
            $( '#js-form input[name="entry.732421810"]' ).val() !== "" &&
            $( '#js-form textarea[name="entry.1306797456"]' ).val() !== "" &&
            $( '#js-form input[name="entry.1691643969"]' ).prop( 'checked' ) === true
        ) {
            //すべて入力されたとき
            $submit.prop( 'disabled', false )
            $submit.addClass( '-active' )
        } else {
            //入力されていない時
            $submit.prop( 'disabled', true )
            $submit.removeClass( '-active' )
        }
    });

    //form modal
    let scrollPos;
    $('.js-modal-open').click(function() {
      scrollPos = $(window).scrollTop();//topからのスクロール位置を格納
      $('.js-modal').fadeIn();//モーダルをフェードイン
      $('body').addClass('_fixed').css({ top: -scrollPos });//背景固定
    });
    $('.js-overlay, .js-modal-close').click(function() {
      $('.js-modal').fadeOut();//モーダルをフェードアウト
      $('body').removeClass('_fixed').css({ top: 0 });//背景固定を解除
      $(window).scrollTop(scrollPos);//元の位置までスクロール
    });

    //form selectの初期表示の文字色
    $('.js-select').change(function() {
      if( $('.js-select').val() == 'dummy' ) {
        $('.js-select').addClass('_dummy');
      } else {
        $('.js-select').removeClass('_dummy');
      }
    });

    //flatpickr
    flatpickr("#flatpickr", {
      locale:"ja",
      minDate:"today",
      mode:"range"
    })
    
    // aos
    AOS.init({
      offset: 200,
      duration: 1500
    })
    
  }) 
   