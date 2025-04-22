
/*PO del Cliente*/

$("#_OPCCImgRCA").change(function () {
    var files = $(this).prop("files");
    if (this.value.length > 0) {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'jpeg':
                var names = $.map(files, function (val) { return val.name; });
                if (names[0] != null || names[0] != undefined) {
                    $("#OPCCImgRCA").val(names[0]);
                }
                break;
            default:
                AlertMessage('El archivo seleccionado no es un JPG');
                this.value = '';
        }
    }
});

$("#btnShowOPCCImgRCA").on("click", function () {
    var vrImagen = $("#OPCCImgRCA").val();
    var vrRuta = '';
    if (vrImagen.length == 0) {
        AlertMessage("No ha seleccionado ninguna imagen para mostrar");
        return;
    }
    if (vrImagen.split('\\').length > 1) {
        vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaImg=" + vrImagen);
        BootstrapDialog.show({
            title: 'Imagen JPG',
            message: $('<img src="' + vrRuta + '" class="img-responsive" alt="Responsive image">'),
        });
    }
    else {
        let reader = new FileReader();
        reader.readAsDataURL($("#_OPCCImgRCA")[0].files[0]);
        reader.onload = function () {
            let image = document.createElement('img');
            image.src = reader.result;
            image.classList.add("img-responsive");
            BootstrapDialog.show({
                title: 'Imagen JPG',
                message: $("<div align='center'></div>").append(image),
            });
        };
    }
});

$("#_OPCCPDFRCA").change(function () {
    var files = $(this).prop("files");
    if (this.value.length > 0) {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'pdf':
                var names = $.map(files, function (val) { return val.name; });
                if (names[0] != null || names[0] != undefined) {
                    $("#OPCCPDFRCA").val(names[0]);
                }
                break;
            default:
                AlertMessage('El archivo seleccionado no es un PDF');
                this.value = '';
        }
    }
});

$("#btnShowOPCCPDFRCA").on("click", function () {

    var vrPDF = $("#OPCCPDFRCA").val();
    var vrRuta = '';
    if (vrPDF.length == 0) {
        AlertMessage("No ha seleccionado ningún Archivo PDF para mostrar");
        return;
    }
    if (vrPDF.split('\\').length > 1) {
        vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaPDF=" + vrPDF);
        $(this).attr("href", vrRuta)
    }
    else {
        var pdffile_url = URL.createObjectURL($("#_OPCCPDFRCA")[0].files[0]);
        $(this).attr("href", pdffile_url);

    }

});

/*SPEC del Cliente*/

$("#_OPCCImgRCB").change(function () {
    var files = $(this).prop("files");
    if (this.value.length > 0) {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'jpeg':
                var names = $.map(files, function (val) { return val.name; });
                if (names[0] != null || names[0] != undefined) {
                    $("#OPCCImgRCB").val(names[0]);
                }
                break;
            default:
                AlertMessage('El archivo seleccionado no es un JPG');
                this.value = '';
        }
    }
});

$("#btnShowOPCCImgRCB").on("click", function () {
    var vrImagen = $("#OPCCImgRCB").val();
    var vrRuta = '';
    if (vrImagen.length == 0) {
        AlertMessage("No ha seleccionado ninguna imagen para mostrar");
        return;
    }
    if (vrImagen.split('\\').length > 1) {
        vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaImg=" + vrImagen);
        BootstrapDialog.show({
            title: 'Imagen JPG',
            message: $('<img src="' + vrRuta + '" class="img-responsive" alt="Responsive image">'),
        });
    }
    else {
        let reader = new FileReader();
        reader.readAsDataURL($("#_OPCCImgRCB")[0].files[0]);
        reader.onload = function () {
            let image = document.createElement('img');
            image.src = reader.result;
            image.classList.add("img-responsive");
            BootstrapDialog.show({
                title: 'Imagen JPG',
                message: $("<div align='center'></div>").append(image),
            });
        };
    }
});

$("#_OPCCPDFRCB").change(function () {
    var files = $(this).prop("files");
    if (this.value.length > 0) {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'pdf':
                var names = $.map(files, function (val) { return val.name; });
                if (names[0] != null || names[0] != undefined) {
                    $("#OPCCPDFRCB").val(names[0]);
                }
                break;
            default:
                AlertMessage('El archivo seleccionado no es un PDF');
                this.value = '';
        }
    }
});

$("#btnShowOPCCPDFRCB").on("click", function () {
    var vrPDF = $("#OPCCPDFRCB").val();
    var vrRuta = '';
    if (vrPDF.length == 0) {
        AlertMessage("No ha seleccionado ningún Archivo PDF para mostrar");
        return;
    }
    if (vrPDF.split('\\').length > 1) {
        vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaPDF=" + vrPDF);
        $(this).attr("href", vrRuta)
    }
    else {
        var pdffile_url = URL.createObjectURL($("#_OPCCPDFRCB")[0].files[0]);
        $(this).attr("href", pdffile_url);
    }
});

/*Factura / Proforma*/

$("#_OPCCImgRCC").change(function () {
    var files = $(this).prop("files");
    if (this.value.length > 0) {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'jpeg':
                var names = $.map(files, function (val) { return val.name; });
                if (names[0] != null || names[0] != undefined) {
                    $("#OPCCImgRCC").val(names[0]);
                }
                break;
            default:
                AlertMessage('El archivo seleccionado no es un JPG');
                this.value = '';
        }
    }
});

$("#btnShowOPCCImgRCC").on("click", function () {
    var vrImagen = $("#OPCCImgRCC").val();
    var vrRuta = '';
    if (vrImagen.length == 0) {
        AlertMessage("No ha seleccionado ninguna imagen para mostrar");
        return;
    }
    if (vrImagen.split('\\').length > 1) {
        vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaImg=" + vrImagen);
        BootstrapDialog.show({
            title: 'Imagen JPG',
            message: $('<img src="' + vrRuta + '" class="img-responsive" alt="Responsive image">'),
        });
    }
    else {
        let reader = new FileReader();
        reader.readAsDataURL($("#_OPCCImgRCC")[0].files[0]);
        reader.onload = function () {
            let image = document.createElement('img');
            image.src = reader.result;
            image.classList.add("img-responsive");
            BootstrapDialog.show({
                title: 'Imagen JPG',
                message: $("<div align='center'></div>").append(image),
            });
        };
    }
});

$("#_OPCCPDFRCC").change(function () {
    var files = $(this).prop("files");
    if (this.value.length > 0) {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'pdf':
                var names = $.map(files, function (val) { return val.name; });
                if (names[0] != null || names[0] != undefined) {
                    $("#OPCCPDFRCC").val(names[0]);
                }
                break;
            default:
                AlertMessage('El archivo seleccionado no es un PDF');
                this.value = '';
        }
    }
});

$("#btnShowOPCCPDFRCC").on("click", function () {
    debugger;
    var vrPDF = $("#OPCCPDFRCC").val();
    var vrRuta = '';
    if (vrPDF.length == 0) {
        AlertMessage("No ha seleccionado ningún Archivo PDF para mostrar");
        return;
    }
    if (vrPDF.split('\\').length > 1) {
        vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaPDF=" + vrPDF);
        $(this).attr("href", vrRuta)
    }
    else {
        
        var pdffile_url = URL.createObjectURL($("#_OPCCPDFRCC")[0].files[0]);
        console.log(pdffile_url);
        $(this).attr("href", pdffile_url);

    }

});    