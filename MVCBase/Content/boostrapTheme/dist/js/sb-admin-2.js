$(function () {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var array = url.pathname.split("/");

    if ((array[1] != undefined && $.trim(array[1]) != "") && array[2] == undefined) {
        //url.href = url.href + "/Index"; ---POR REVISAR
    }

    var clsec = $('a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).parent().parent().attr("class");

    if (clsec) {
        if (clsec.indexOf("second") > 0) {
            var element = $('ul.nav a').filter(function () {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).addClass('active').parent().parent().addClass('in').parent();

            var cant = $('a').filter(function () {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).parent().parent().children("li").size();

            var height = cant * 20;

            $('a').filter(function () {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).parent().parent().attr("style", height + "px;")

        }

        if (clsec.indexOf("third") > 0) {

            var element = $('ul.nav a').filter(function () {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).addClass('active').parent().parent().parent().parent().addClass('in').parent();

            var element = $('ul.nav a').filter(function () {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).addClass('active').parent().parent().addClass('in').parent();

            var cant = $('a').filter(function () {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).parent().parent().children("li").size();

            var height = cant * 20;

            $('a').filter(function () {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).parent().parent().attr("style", height + "px;")

            var height2 = (cant + 1) * 20;
            $('a').filter(function () {
                return this.href == url || url.href.indexOf(this.href) == 0;
            }).parent().parent().parent().parent().attr("style", height + "px;")

        }
    }


});
