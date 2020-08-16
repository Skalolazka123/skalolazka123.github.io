var total = 666,
    limits = 10,
    page = 1;

$(document).ready(function() {

    //gets JSON from api with limits entries per page (default = 10)
    takeJSON(limits);

    //sort output by field
    $('.content-order-by__btn').click(function() {
        //get input value
        var orderByVal = Number($('.content-order-by__input').val());

        if ($.isNumeric(orderByVal)) {
            //gets JSON from api with limits entries per page and number value of order_by
            takeJSON('', limits, orderByVal);
            console.log('Сортировка вывода по полю прошла успешно');
        }

    });

    //sorting entries
    $('#sort-select').change(function() {

        //get selected value
        var order = this.value;

        if (order == 'asc' || order == 'desc') {
            //gets JSON from api with limits
            takeJSON('', limits, '', order);
        } else {
            takeJSON(limits);
        }
        console.log('Сортировка прошла успешно');



    });



    //change limits entries per page
    $('#limits-select').change(function() {
        //get selected value
        limits = Number(this.value);

        //gets JSON from api with limits
        takeJSON('', limits)
    });
    /*

    //click pagination (first variant with plagin Bootstrap 4 Modern Pagination with jQuery)
    function createPagination() {
        $('#table-control__pagination-items').Pagination({ // id to initial draw and use pagination
            size: total, // size of list input
            pageShow: 5, // 5 page-item per page
            page: 1, // current page (default)
            limit: limits, // current limit show perpage (default)
        }, function(obj) { // callback function, you can use it to re-draw table or something
            $('#table-control__pagination-temp').html('Current page: ' + obj.page);

            //gets JSON from api with skip and limits
            var skipCount = obj.page * limits;

            //gets JSON from api with number of entries to skip and limits entries per page
            takeJSON(skipCount, limits, '', '');

        });

    };
    createPagination();
    */


    //My pagination
    $('#table-control__pagination-items .page-item').click(function(e) {
        //click next
        if ($(this).hasClass("page-item_next")) {

            //disable and active pagination buttons with right moment
            if (page == 1) {
                $('.page-item_prev').removeClass('disabled');
            } else if (page == total - 1) {
                $(this).addClass('disabled');
            }

            if (page < total) {
                //calculate limits
                var skipCount = page * limits;

                //what page we are
                page = page + 1;
            }


        }

        //click prev
        if ($(this).hasClass("page-item_prev")) {

            //disable and active pagination buttons with right moment
            if (page == 2) {
                $(this).addClass('disabled');
            } else if (page == total - 2) {
                $('.page-item_next').removeClass('disabled');
            }

            if (page > 1) {
                //calculate limits
                var skipCount = (page - 2) * limits;

                //what page we are
                page = page - 1;
            }

        }

        //gets JSON from api with number of entries to skip and limits entries per page
        takeJSON(skipCount, limits, '', '');
        e.preventDefault();

        //user info what page we are
        $('.table-control__pagination-current-page').html('Текущая страница: ' + page);

    });


    //function gets JSON from api
    function takeJSON(skipCount, limitCount, orderBy, orderType) {
        $.getJSON('http://api.odesseo.com.ua/warehouses', { skip: skipCount, limit: limitCount, order_by: orderBy, order: orderType }, function(data) {

                //clear the table
                $('.table__body').empty();
                total = Math.ceil(data.total / limits);

                //variable to write table row
                var row;
                $.each(data.data, function(indx, el) {

                    //create new table row with data from json
                    row = '<tr><th scope="row">' + (indx + 1) + '</th> <td>' + el.ref + '</td>' + '<td>' + el.name + '</td>' + '<td>' + el.city + '</td>' + '<td>' + el.number + '</td></tr>';
                    //append new row to table
                    $(row, {}).appendTo('.table__body');
                });

            })

            //completion functions
            .done(function() {
                console.log("JSON успешно получен и обработан");
            })
            .fail(function() {
                console.log("Ошибка выполнения");
            })
            .always(function() {
                console.log("Завершение выполнения");
            });
    }

});