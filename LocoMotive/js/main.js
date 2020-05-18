$(document).ready(function() {

    //Button filter in portfolio block
    $('.button[filter]').click(function() {

        //When we hid all elem - our filter container has a 0 height
        //and all content under filter pulls up.
        if ($(window).width() >= '1200') {
            //When we hid all elem - our filter container has a 0 height
            //and all content under filter pulls up.
            var filterHeight = $('.row.filter').height();
            $('.row.filter').height(filterHeight);
        }
        //Value filter
        filterVal = $(this).attr('filter');


        //Hide all pictures and val off for all buttons
        $('.filter > div').hide('fast');
        $('.portfolio__buttons > .button').each(function(index, el) {
            $(this).attr("val", 'off');
        });

        //Filtretion. Show pictures with apropriate filter and val on for apropriate button
        if (filterVal == 'all') {

            $('.filter > div').show('slow', function() {
                //delete filter fix hight
                $('.row.filter').height('auto');
            });
            $('.filter > .button[filter="all"]').attr('val', 'on');

        } else {
            $('.filter > div[filter="' + filterVal + '"]').show('slow');
            $('.button[filter="' + filterVal + '"]').attr('val', 'on');
        }

    });

    //Slick slider setting
    $('.multiple-items').slick({
        autoplay: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: true,
        nextArrow: '<span class="fa-stack fa-2x arr-next"><i class="fas fa-circle fa-stack-2x"></i><i class="fa fa-angle-right fa-stack-1x fa-inverse"></i></span>',
        prevArrow: '<span class="fa-stack fa-2x arr-prev"><i class="fas fa-circle fa-stack-2x"></i><i class="fa fa-angle-left fa-stack-1x fa-inverse"></i></span>',
        dotsClass: 'dots-style',
        responsive: [{
                breakpoint: 1220,
                settings: {
                    arrows: false
                }

            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });



});

/*Responsive menu*/
/*
    $('ul.menu a[href^="#"').click(function() {
        $('html, body').stop().animate({
            scrollTop: $(this.hash).offset().top

        }, 1000);
        e.preventDefault();
    });
    */

//Slow scroll to...

$("body").on('click', '[href*="#"]', function(e) {

    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top }, 1000);
    e.preventDefault();
});

//Get the button:
mybutton = document.getElementById("toTop");


// When the user scrolls down from the top of the document, show the button
$(window).scroll(function() {
    if ($(this).scrollTop() !== 0) {
        $("#toTop").fadeIn();
        return;
    } else {
        $("#toTop").fadeOut();
    }
})


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    $('html, body').animate({
        scrollTop: 0

    }, 500);
}