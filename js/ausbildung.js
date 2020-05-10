/* add click event for details */
    $('.training-item').click(function() {
        $('.training-item-detail').toggleClass('hidden', true);
        $(this).children('.training-item-detail').toggleClass('hidden');
    });
    