$(document).ready(function () {
//variable should be cached for performance
    const p = $('#para1');
    p.hide();
    $("#button1").click(function () {
        p.slideToggle("slow")
    });

});