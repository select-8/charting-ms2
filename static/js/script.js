$(document).ready(function () {
//variable should be cached for performance
    const p = $('#para1');
    p.hide();
    $("#drop-down").click(function () {
        p.slideToggle("slow");
    });
});