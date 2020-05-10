/* add click event for details */
    $('.job-item').click(function() {
        $('.job-item-detail').toggleClass('hidden', true);
        $(this).children('.job-item-detail').toggleClass('hidden');
    });
    