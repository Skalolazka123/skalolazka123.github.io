const parallax = $('.parallax-effect'),
    big_title = $('.big-title'),
    header = $('header'),
    shadow = $('.shadow'),
    desc_content = $('.desc__content'),
    desc_img = $('.desc__img-wrap'),
    change_opacity = $('.change-opacity'),
    desc_sect = $('.desc'),
    title_border = $('.desc__title-border');

let header_height = header.outerHeight(),
    desc_sect_height = desc_sect.outerHeight();





$(window).scroll(function(event) {

    let scr = $(window).scrollTop(),
        desc_sectY = desc_sect[0].getBoundingClientRect();


    parallax.each(function(index, el) {
        let speed = $(this).data('speed');
        //движение слоев с разной скоростью, кот задается в data-speed эл-та +
        $(this).css('transform', 'translateY(' + (scr * speed) +'px)');
    });

    //opacity для h1 (кот посередине header) плавно меняется от 1 до 0 (при скролл на header_height / 2)
    big_title.css('opacity', - scr / (header_height / 2) + 1);
    //плавное увеличение затемнения
    shadow.css('height', ((scr / 2) + 300) + 'px');
    //анимация для текста (подъезжает вниз)
    desc_content.css('transform', 'translateY(' + (((scr / (desc_sect_height + desc_sectY.top) * 50 - 50) <= 0) ? (scr / (desc_sect_height + desc_sectY.top) * 50 - 50) : 0) + 'px)');
    //анимация для изобр (подъезжает вверх)
    desc_img.css('transform', 'translateY(' + (((scr / (desc_sect_height + desc_sectY.top) * (-50) + 50) >= 0) ? (scr / (desc_sect_height + desc_sectY.top) * (-50) + 50) : 0) + 'px)');

    change_opacity.each(function(index, el) {
        $(this).css('opacity', scr / (desc_sectY.top + desc_sect_height));
    });

    title_border.css('width', (scr / (desc_sectY.top + desc_sect_height) * 30 <= 30 ? scr / (desc_sectY.top + desc_sect_height) * 30 : 30) + '%');
});