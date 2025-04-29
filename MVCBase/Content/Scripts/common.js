$(document).ready(function () {
    $.blockUI({ message: '<img src="/Content/images/loading.gif">', css: { border: 'none', background: 'transparent' } });
    $(window).load(function () {
        $.unblockUI();
    });
});