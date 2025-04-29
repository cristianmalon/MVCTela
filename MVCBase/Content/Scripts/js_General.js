$(document).ready(function () {
    $('body').on("click", ".modalMTC", function () {
        var url = $(this).attr('data-url');
        var divModal = $(this).attr('data-div');
        var divContenedor = $(this).attr('data-contenedor');

        var seccionModal = ".seccionModal";
        var seccionContenedor = ".contenedor";

        if (divModal) {
            seccionModal = "#" + divModal;
        }

        if (divContenedor) {
            seccionContenedor = "#" + divContenedor;
        }

        $.ajax({
            url: url,
            beforeSend: function () {
                bloquoteObject();
                bloquoteModal();
            },
            success: function (data) {
                desbloqObject();
                desbloqModal();
                $(seccionModal).html(data);
                $(seccionContenedor).modal('show');
            }
        });
    });
    $('body').on("click", ".modalMTC2", function () {
        var url = $(this).attr('data-url');
        var divModal = $(this).attr('data-div');
        var divContenedor = $(this).attr('data-contenedor');

        var seccionModal = ".seccionModal2";
        var seccionContenedor = ".contenedor2";

        if (divModal) {
            seccionModal = "#" + divModal;
        }

        if (divContenedor) {
            seccionContenedor = "#" + divContenedor;
        }

        $.ajax({
            url: url,
            beforeSend: function () {
                bloquoteObject();
                bloquoteModal();
            },
            success: function (data) {
                desbloqObject();
                desbloqModal();
                $(seccionModal).html(data);
                $(seccionContenedor).modal('show');
            }
        });
    });
    $('body').on("click", ".modalMTC3", function () {
        var url = $(this).attr('data-url');
        var divModal = $(this).attr('data-div');
        var divContenedor = $(this).attr('data-contenedor');

        var seccionModal = ".seccionModal3";
        var seccionContenedor = ".contenedor3";

        if (divModal) {
            seccionModal = "#" + divModal;
        }

        if (divContenedor) {
            seccionContenedor = "#" + divContenedor;
        }

        $.ajax({
            url: url,
            beforeSend: function () {
                bloquoteObject();
                bloquoteModal();
            },
            success: function (data) {
                desbloqObject();
                desbloqModal();
                $(seccionModal).html(data);
                $(seccionContenedor).modal('show');
            }
        });
    });
    $('body').on("click", ".closeModalId", function () {
        var modal = $(this).attr('modal-data-id');
        $(modal).modal('hide');
    });


    //$(document.body).on('keypress', 'input[type=text]', function (e) {
    //    if (permite(e, $(this).attr('data-valid'))) {
    //        return true;
    //    }
    //    e.preventDefault();
    //    return false;
    //});

    $("input[type=search]").keypress(function (e) {
        if (permite(e, $(this).attr('data-valid'))) {
            return true;
        }
        e.preventDefault();
        return false;
    });
    $("textarea").keypress(function (e) {
        if (permite(e, $(this).attr('data-valid'))) {
            return true;
        }
        e.preventDefault();
        return false;
    });

    //bootbox.setDefaults({
    //    locale: "es"
    //});
});
$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});
$(document).ajaxError(function (event, request, settings) {

    //var notification = $("#notification").kendoNotification({
    //    position: {
    //        pinned: true,
    //        top: 30,
    //        right: 30
    //    },
    //    autoHideAfter: 0,
    //    stacking: "down",
    //    templates: [{
    //        type: "info",
    //        template: $("#emailTemplate").html()
    //    }, {
    //        type: "error",
    //        template: $("#errorTemplate").html()
    //    }, {
    //        type: "upload-success",
    //        template: $("#successTemplate").html()
    //    }]

    //}).data("kendoNotification");
    if (request.status == 404) {
        Swal.fire({
            icon: 'error',
            title: 'SISTEMA',
            text: `currio un problema interno Error ${request.status.toString()} - ${request.statusText}`,
        });
    } else {
        notification.show({
            title: "Error de Conexion",
            message: "Su maquina perdio la conexion con el servidor actualize la pagina"
        }, "error");
    }

});
function modalAjaxReporte(url, Data) {
    seccionModal = ".seccionModalReporte";
    seccionContenedor = ".contenedorReporte";

    $.ajax({
        url: url,
        data: Data,
        beforeSend: function () {
            bloquoteObject();
            bloquoteModal();
        },
        success: function (data) {
            $(seccionModal).html(data);
            $(seccionContenedor).modal('show');
            desbloqObject();
            desbloqModal();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            console.log(thrownError);
            desbloqObject();
            desbloqModal();
        }
    });
}
function modalAjaxRequestGet(url, divModal, divContenedor, Data) {
    var seccionModal = ".seccionModal";
    var seccionContenedor = ".contenedor";

    seccionModal = ($.trim(divModal).length > 0) ? "#" + divModal : seccionModal;

    seccionContenedor = ($.trim(divContenedor).length > 0) ? "#" + divContenedor : seccionContenedor;

    url = (Data) ? (($.trim(Data).length > 0) ? url + "?" + $.trim(Data) : "") : url;

    $.ajax({
        url: url,
        beforeSend: function () {
            bloquoteObject();
            bloquoteModal();
        },
        success: function (data) {
            $(seccionModal).html(data);
            $(seccionContenedor).modal('show');
            desbloqObject();
            desbloqModal();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            console.log(thrownError);
        }
    });
}
function modalAjaxRequestGet2(url, divModal, divContenedor, Data) {
    var seccionModal = ".seccionModal2";
    var seccionContenedor = ".contenedor2";

    seccionModal = ($.trim(divModal).length > 0) ? "#" + divModal : seccionModal;

    seccionContenedor = ($.trim(divContenedor).length > 0) ? "#" + divContenedor : seccionContenedor;

    url = (Data) ? (($.trim(Data).length > 0) ? url + "?" + $.trim(Data) : "") : url;

    $.ajax({
        url: url,
        beforeSend: function () {
            bloquoteObject();
            bloquoteModal();
        },
        success: function (data) {
            $(seccionModal).html(data);
            $(seccionContenedor).modal('show');
            desbloqObject();
            desbloqModal();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            console.log(thrownError);
        }
    });
}
function modalAjaxRequestGet3(url, divModal, divContenedor, Data) {
    var seccionModal = ".seccionModal3";
    var seccionContenedor = ".contenedor3";

    seccionModal = ($.trim(divModal).length > 0) ? "#" + divModal : seccionModal;

    seccionContenedor = ($.trim(divContenedor).length > 0) ? "#" + divContenedor : seccionContenedor;

    url = (Data) ? (($.trim(Data).length > 0) ? url + "?" + $.trim(Data) : "") : url;

    $.ajax({
        url: url,
        beforeSend: function () {
            bloquoteObject();
            bloquoteModal();
        },
        success: function (data) {
            desbloqObject();
            desbloqModal();
            $(seccionModal).html(data);
            $(seccionContenedor).modal('show');
        }
    });
}
function prepareReport(divID, nomReporte, detParam) {
    $.ajax({
        url: '/Reportes/postReportParam',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ detParam: detParam }),
        beforeSend: function () {
            bloquoteObject('');
        },
        success: function (response) {
            var DataObject = response.Object;
            if (DataObject.flag) {
                ViewReport(divID, nomReporte);
            }
            else {
                $("#" + divID).html('');
                $("#" + divID).html('<strong><h3>' + DataObject.message + '</h3></strong>');
            }
            desbloqObject('');
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject('');
        console.log("Request Failed: " + err);
        $("#" + divID).html('');
        $("#" + divID).html('<strong><h3>Request Failed: ' + err + '</h3></strong>');
    });
}
function modalClose(divModal) {
    var seccionModal = "#contenedor";
    seccionModal = ($.trim(divModal).length > 0) ? "#" + divModal : seccionModal;
    $(seccionModal).modal('hide');
}
function modalClose2(divModal) {
    var seccionModal = "#contenedor2";
    seccionModal = ($.trim(divModal).length > 0) ? "#" + divModal : seccionModal;
    $(seccionModal).modal('hide');
}
function actionRequestGet(url, Data) {
    url = (Data) ? ($.trim(Data).length > 0) ? url + "?" + $.trim(Data) : "" : url;
    window.location = url;
}
function activaTab(id, tab) {
    $('#' + id + ' a[href="#' + tab + '"]').tab('show');
}
function errorAddModelo(divError, listaError, errorData) {
    $("#" + divError).removeAttr("style");
    $("#" + listaError).empty();
    $.each(errorData, function (key, value) {
        if (value != null) {
            if (key == "*") {
                $("#" + listaError).append("<li>" + value + "</li>");
            }
            else {
                $("#" + key).removeClass("valError").addClass("valError");
                $("#" + listaError).append("<li>" + value[value.length - 1].ErrorMessage + "</li>");
            }
        }
    });
}

function errorAddModeloHtml(divError, listaError, errorData) {
    $("#" + divError).removeAttr("style");
    $("#" + listaError).empty();
    $(".valError").removeClass("valError");
    $.each(errorData, function (key, value) {
        if (value != null) {
            if (key == "*") {
                $("#" + listaError).append("<li>" + value + "</li>");
            }
            else {
                $("#" + key).removeClass("valError").addClass("valError");
                $("#" + listaError).append("<li>" + value[value.length - 1].ErrorMessage + "</li>");
            }
        }
    });
}

function errorAddJS(divError, listaError, errorData) {
    $("#" + divError).removeAttr("style");
    $("#" + listaError).empty();
    $.each(errorData, function (key, value) {
        $.each(value, function (key, value) {
            if (value != null) {
                if (key == "*") {
                    $("#" + listaError).append("<li>" + value + "</li>");
                }
                else {
                    $("#" + key).removeClass("valError").addClass("valError");
                    $("#" + listaError).append("<li>" + value[value.length - 1].ErrorMessage + "</li>");
                }
            }
        });
    });
}
function errorAddJSHtml(divError, listaError, errorData) {
    $("#" + divError).removeAttr("style");
    $("#" + listaError).empty();
    $(".valError").removeClass("valError");
    $.each(errorData, function (key, value) {
        $.each(value, function (key, value) {
            if (value != null) {
                if (key == "*") {
                    $("#" + listaError).append("<li>" + value + "</li>");
                }
                else {
                    $("#" + key).removeClass("valError").addClass("valError");
                    $("#" + listaError).append("<li>" + value[value.length - 1].ErrorMessage + "</li>");
                }
            }
        });
    });
}
function errorObject(key) {
    $("#" + key).removeClass("valError").addClass("valError");
}
function addAlert(message) {
    var popupNotification = $("#popupNotification").kendoNotification({
        position: {
            pinned: true,
            top: 30,
            right: 30
        },
        autoHideAfter: 2000,
        stacking: "down",
        templates: [{
            type: "error",
            template: "<div class='wrong-pass'><img src='../Content/images/error-icon.png' /><h3>#: titulo #</h3><p> #: mensage # </p></div>"
        }, {
            type: "upload-success",
            template: "<div class='wrong-pass'><img src='../Content/images/success-icon.png' /><h3>#: titulo #</h3><p> #: mensage # </p></div>"
        }]
    });
    popupNotification.data("kendoNotification").show({ titulo: "error", mensage: message }, "error");
}
function addMessage(message) {
    var popupNotification = $("#popupNotification").kendoNotification({
        position: {
            pinned: true,
            top: 30,
            right: 30
        },
        autoHideAfter: 2000,
        stacking: "down",
        templates: [{
            type: "error",
            template: "<div class='wrong-pass'><img src='../Content/images/error-icon.png' /><h3>#: titulo #</h3><p> #: mensage # </p></div>"
        }, {
            type: "upload-success",
            template: "<div class='wrong-pass'><img src='../Content/images/success-icon.png' /><h3>#: titulo #</h3><p> #: mensage # </p></div>"
        }]
    });
    popupNotification.data("kendoNotification").show({ titulo: "error", mensage: message }, "upload-success");
}
function disableDiv(id) {
    $("#" + id).find('input, button, textarea, select, table,tr ,td, th, a').prop("disabled", true);
}
function enabledDiv(id) {
    $("#" + id).find('input, button, textarea, select, table,tr ,td, th, a').prop("disabled", false);
}
function bloquoteObject() {
    $.blockUI({
        baseZ: 2000,
        message: '<img src="/Content/images/loading.gif">',
        css: { border: 'none', background: 'transparent' }
    });
}
function desbloqObject() {
    $.unblockUI();
}
function bloquoteModal() {
    $(".modal-content").block({ message: null });
}
function desbloqModal() {
    $(".modal-content").unblock();
}
function desbloqObjectReport() {
    $.unblockUI();
}
function modalResult(tittle, message) {
    bootbox.dialog({
        message: '<strong>' + message + '<strong/>',
        title: tittle,
        buttons: {
            success: {
                label: "Aceptar",
                className: "btn-success",
            }
        }
    });
}

function myTrim(x) {
    return String(x).replace(/^\s+|\s+$/gm, '');
}
function padCero(str, max) {
    str = str.toString();
    return str.length < max ? padCero("0" + str, max) : str;
}
function ViewReport(divID, nomReporte) {
    bloquoteObject('');
    $("#" + divID).html('');
    $("#" + divID).html('<iframe src="/Content/Reporte/rptInterface.aspx?NOMREPORT=' + nomReporte + '" style="width:100%; height : 450px;border:thin;" onload="desbloqObjectReport();"></iframe>');
}
function prepareReport(divID, nomReporte, detParam) {
    $.ajax({
        url: '/Reportes/postReportParam',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ detParam: detParam }),
        beforeSend: function () {
            bloquoteObject('');
        },
        success: function (response) {
            var DataObject = response.Object;
            if (DataObject.flag) {
                ViewReport(divID, nomReporte);
            }
            else {
                $("#" + divID).html('');
                $("#" + divID).html('<strong><h3>' + DataObject.message + '</h3></strong>');
            }
            desbloqObject('');
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject('');
        $("#" + divID).html('');
        $("#" + divID).html('<strong><h3>Request Failed: ' + err + '</h3></strong>');
    });
}

function isDate(string) { //string estar· en formato dd/mm/yyyy (dÌ≠as < 32 y meses < 13)
    var ExpReg = /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/
    return (ExpReg.test(string));
}

function validate_fechaMayorQue(fechaInicial, fechaFinal) {
    var valuesStart = fechaInicial.split("/");
    var valuesEnd = fechaFinal.split("/");

    // Verificamos que la fecha no sea posterior a la actual
    var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
    var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);
    if (dateStart >= dateEnd) {
        return 0;
    }
    return 1;
}
function dateFormat(objDate) {
    if (objDate == "" || objDate == null) {
        return "";
    }
    else {
        return new Date(objDate.replace('/', '-').replace('/', '-').replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
    }
}
function KendoMultiselectValueStr(valor) {
    var str = "";
    $.each(valor, function (index, value) {
        str = str + "," + value;
    });
    return str;
}
$.fn.toggleDisable = function () {
    return this.each(function () {
        if (typeof this.disabled != "undefined") {
            if (this.disabled) {
                //this.disabled = false;
            } else {
                this.disabled = true;
            }
        }
    });
}
$.fn.toggleEnable = function () {
    return this.each(function () {
        if (typeof this.disabled != "undefined") {
            if (this.disabled) {
                this.disabled = false;
            } else {
                //this.disabled = true;
            }
        }
    });
}
$.fn.toggleOnReadonly = function () {
    return this.each(function () {
        if (typeof this.readonly != "undefined") {
            if (this.readonly) {
                //this.disabled = false;
            } else {
                this.readonly = true;
            }
        }
    });
}
$.fn.toggleOffReadonly = function () {
    return this.each(function () {
        if (typeof this.readonly != "undefined") {
            if (this.readonly) {
                this.readonly = false;
            } else {
                //this.disabled = true;
            }
        }
    });
}



function validaTeclas(e, tip) {

    var tecla = document.all ? tecla = e.keyCode : tecla = e.which;

    var soloLetras = "abcdefghijklmnÒopqrstuvwxyzABCDEFGHIJKLMN—OPQRSTUVWXYZ ";
    var soloAlphan = "abcdefghijklmnÒopqrstuvwxyzABCDEFGHIJKLMN—OPQRSTUVWXYZ 0123456789";
    var soloNumero = "0123456789";
    var soloDecima = "0123456789.";
    var sinCeros = "123456789";
    var soloNumerocoma = "0123456789,-";
    var soloTelefonos = "#*0123456789";

    switch (tip) {
        case 'text':
            return (soloLetras.indexOf(String.fromCharCode(tecla)) > -1);
            break;
        case 'alpha':
            return (soloAlphan.indexOf(String.fromCharCode(tecla)) > -1);
            break;
        case 'number':
            return (soloNumero.indexOf(String.fromCharCode(tecla)) > -1);
            break;
        case 'numeric':
            return (soloDecima.indexOf(String.fromCharCode(tecla)) > -1);
            break;
        case 'sinceros':
            return (sinCeros.indexOf(String.fromCharCode(tecla)) > -1);
            break;
        case 'numcoma':
            return (soloNumerocoma.indexOf(String.fromCharCode(tecla)) > -1);
            break;
        case 'telefono':
            return (soloTelefonos.indexOf(String.fromCharCode(tecla)) > -1);
            break;
    }
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " ·ÈÌÛ˙abcdefghijklmnÒopqrstuvwxyz¡…Õ”⁄ABCDEFGHIJKLMN—OPQRSTUVWXYZ";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function campoTelefono(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "*#0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function campoNumero(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}


function campoFecha(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "/0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function Enrutamiento(ruta, dato) {
    return ruta + "?" + dato;
}

function ShowMessage(content, tittle) {
    $("<div></div>").kendoAlert({
        title: tittle,
        content: content
    }).data("kendoAlert").open();
}

function AlertMessage(content) {
    $("<div></div>").kendoAlert({
        title: "Mensaje",
        content: content
    }).data("kendoAlert").open();
}

function AlertMessageAutoHide(content) {
    //$("<div></div>").kendoAlert({
    //    title: "Mensaje",
    //    content: content
    //}).data("kendoAlert").open();
    //alertify.set('notifier', 'position', 'bottom-right');
    //alertify.set('notifier', 'delay', 0);
    //alertify.notify('Success notification message.').moveTo(100, 1000); 

    Swal.fire({
        toast: true,
        icon: 'success',
        title: content,
        animation: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


}

function DialogMessage(content, redirection) {
    //debugger;
    $("<div></div>").kendoDialog({
        title: "Mensaje",
        content: content,
        closable: false,
        modal: true,
        actions: [
            {
                text: 'OK',
                action: function () {
                    window.location.href = redirection;
                }
            }
        ],
    }).data("kendoDialog").open();
}



function ConfirmMessage(content) {
    return $("<div></div>").kendoConfirm({
        title: "Confirmar",
        content: content
    }).data("kendoConfirm").open().result;
}

function AutoFitColumns(grid) {
    for (var i = 0; i < grid.columns.length; i++) {
        if (!grid.columns[i].headerAttributes.class && grid.columns[i].headerAttributes.class !== "fixed-width") {
            grid.autoFitColumn(i);
        }
    }
}

function generateColumns(response) {
    var columnNames = response["columns"];
    return columnNames.map(function (name) {
        var _name = name.split('-').length > 1 ? name.split('-')[0] : name;
        return {
            field: "_" + _name,
            /*title: name,*/
            format: (isDateField[_name] ? "{0:D}" : ""),
            //width: 180,
            width: ((_name == "IdTrabajador" || _name == "Cargo" || _name == "Nombres") ? 180 : 120),
            title: ((_name == "IdTrabajador" || _name == "Cargo" || _name == "Nombres") ? _name : ("<span class='verticalText'>" + _name + "</span>")),
        };
    })
}

function generateColumnsEditable(response, iseditable) {
    var columnNames = response["columns"];
    return columnNames.map(function (name) {
        var _name = name.split('-').length > 1 ? name.split('-')[0] : name;
        return {
            field: "_" + _name,
            title: name,
            format: (isDateField[_name] ? "{0:D}" : ""),
            //editable: ((_name == "ESTILO_ARTE" || _name == "PREC_COMBINACION") ? false : iseditable) 
            editable: function (dataitem) {
                return ((_name == "ESTILO_ARTE" || _name == "PREC_COMBINACION") ? true : !iseditable)
            }
        };
    })
}

function generateColumnsEditableWithoutDash(response, iseditable) {
    var columnNames = response["columns"];
    return columnNames.map(function (name) {
        var _name = name;
        return {
            field: "_" + _name.replace('-', 'QQ'),
            title: name,
            format: (isDateField[_name] ? "{0:D}" : ""),
            //editable: ((_name == "ESTILO_ARTE" || _name == "PREC_COMBINACION") ? false : iseditable) 
            editable: function (dataitem) {
                return ((_name == "ESTILO_ARTE" || _name == "PREC_COMBINACION") ? true : !iseditable)
            }
        };
    })
}

function calc() {
    // assume this to be dynamically determined  
    var field = "_TOTAL";

    // assume this to be dynamically determined
    var dataSource = window.ds;

    // some custom calc logic
    var newValue = 0;

    $.each(this.data(), function (index, model) {
        newValue += model.get(field);
    });

    return newValue;
}


function generateModel(response) {
    var sampleDataItem = response["data"][0];

    var model = {};
    var fields = {};
    for (var property in sampleDataItem) {
        var _property = property.split('-').length > 1 ? property.split('-')[0] : property;
        property = _property; //.replace("__","-");
        if (property.indexOf("ID") !== -1) {
            model["id"] = property;
        }
        var propType = typeof sampleDataItem[property];

        if (propType === "number") {
            fields[property] = {
                type: "number",
                validation: {
                    required: true,
                    min: 0
                }
            };
            if (model.id === property) {
                fields[property].editable = false;
                fields[property].validation.required = false;
            }
        } else if (propType === "boolean") {
            fields[property] = {
                type: "boolean"
            };
        } else if (propType === "string") {
            var parsedDate = kendo.parseDate(sampleDataItem[property]);
            if (parsedDate) {
                fields[property] = {
                    type: "date",
                    validation: {
                        required: true
                    },
                };
                isDateField[property] = true;
            } else {
                fields[property] = {
                    validation: {
                        required: true
                    }
                };
            }
            fields[property].editable = _property == "_ESTILO_ARTE" ? true : false;
        } else {
            fields[property] = {
                validation: {
                    required: true
                }
            };
        }
    }

    model.fields = fields;

    return model;
}

function generateModelWithoutDash(response) {
    var sampleDataItem = response["data"][0];
    //debugger;
    var model = {};
    var fields = {};
    for (var property in sampleDataItem) {
        //var _property = property.split('-').length > 1 ? property.split('-')[0] : property;
        var _property = property.replace('-', 'QQ');
        property = _property;
        if (property.indexOf("ID") !== -1) {
            model["id"] = property;
        }
        var propType = typeof sampleDataItem[property];

        if (propType === "number") {
            fields[property] = {
                type: "number",
                validation: {
                    required: true,
                    min: 0
                }
            };
            if (model.id === property) {
                fields[property].editable = false;
                fields[property].validation.required = false;
            }
        } else if (propType === "boolean") {
            fields[property] = {
                type: "boolean"
            };
        } else if (propType === "string") {
            var parsedDate = kendo.parseDate(sampleDataItem[property]);
            if (parsedDate) {
                fields[property] = {
                    type: "date",
                    validation: {
                        required: true
                    },
                };
                isDateField[property] = true;
            } else {
                fields[property] = {
                    validation: {
                        required: true
                    }
                };
            }
            fields[property].editable = _property == "_ESTILO_ARTE" ? true : false;
        } else {
            fields[property] = {
                validation: {
                    required: true
                }
            };
        }
    }

    model.fields = fields;

    return model;
}

var Class = function (methods) {
    var klass = function () {
        this.initialize.apply(this, arguments);
    };

    for (var property in methods) {
        klass.prototype[property] = methods[property];
    }

    if (!klass.prototype.initialize) klass.prototype.initialize = function () { };

    return klass;
};

var AdminGrid = Class({
    initialize: function (grid) {
        this.grid = grid;
    },
    refresh: function () {
        $(this.grid).data('kendoGrid').dataSource.read();
        $(this.grid).data('kendoGrid').refresh();
    },
    selectedItem: function () {
        var grd = $(this.grid).data("kendoGrid");
        var selectedItem = grd.dataItem(grd.select());
        return selectedItem;
    },
    getDataItem: function (uid) {
        var grd = $(this.grid).data("kendoGrid");
        var row = grd.tbody.find("tr[data-uid='" + uid + "']");
        var item = grd.dataItem(row);
        return JSON.stringify(item);
    },
    getData: function () {
        var grd = $(this.grid).data("kendoGrid");
        return grd.dataSource.data();
    },
});


function MethodPost(urlAction, parameters, contentType, isMultipart, async, callbackf) {
    return ajaxMethod(urlAction, "POST", parameters, contentType, isMultipart, null, async, callbackf);
}

function MethodGet(urlAction, parameters, contentType, callbackf) {
    return ajaxMethod(urlAction, "GET", parameters, contentType, false, null, false, callbackf);
}

function MethodPut(urlAction, parameters, contentType, callbackf) {
    return ajaxMethod(urlAction, "PUT", parameters, contentType, false, null, false, callbackf);
}

function MethodDelete(urlAction, parameters, contentType, callbackf) {
    return ajaxMethod(urlAction, "DELETE", parameters, contentType, false, null, false, callbackf);
}


function ajaxMethod(urlAction, method, parameters, contentType, isMultipart, beforeSend, async, callbackFunc) {
    var token = sessionStorage.getItem(window.tokenKey);
    var headers = {};
    if (token) {
        //headers.token = token;
        headers.token = "bearer " + token;
    }
    var beforeSend = beforeSend || (function () { });
    var async = (typeof (async) == "undefined" ? false : async);
    var base_url = window.location.origin;
    var config = {
        method: method,
        url: base_url + urlAction,
        dataType: 'json',
        contentType: contentType,
        data: parameters,
        //async: false,
        async: async,
        cache: false,
        headers: headers,
        //global: true,
        beforeSend: function () {
            bloquoteObject()
        },
        complete: function (html) {
            setTimeout(function () {
                //$('#overlay').hide();
            }, 500);
            //$('#overlay').hide();
            //console.log("SALIENDO AJAX ajaxMethod");
        }
    };

    if (isMultipart) {
        config.mimeType = "multipart/form-data";
        config.contentType = false;
        config.processData = false;
    }


    var resul = $.ajax(config)
        .done(function (jqXHR, textStatus, errorThrown) {
            //var token = errorThrown.getResponseHeader('Token');
            //if (token !== null && token !== undefined && token !== "") {
            //    sessionStorage.setItem(window.tokenKey, token);
            //} else {
            //    var fecha = new Date();
            //    localStorage.setItem("logoutMsg", "Se realiza logout por token no retornado por servicio ajaxMethod succes. " + fecha.toLocaleString());
            //    document.getElementById('logoutForm').submit();
            //    return;
            //}

            if (typeof (callbackFunc) == "function") {
                callbackFunc();
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            desbloqObject();
            if (errorThrown === "Unauthorized") {
                var fecha = new Date();
                localStorage.setItem("logoutMsg", "Se realiza logout servicio ajaxMethod fail. " + fecha.toLocaleString());
                document.getElementById('logoutForm').submit();
                return;
            }
            else if (errorThrown === "Bad Request") {
                console.log("Bad Request:", jqXHR.responseText);

                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `${jqXHR.responseText}`,
                });
                return;
            }
            else if (errorThrown === "Internal Server Error") {
                console.log("Internal Server Error:", jqXHR.responseText);
                Swal.fire({
                    icon: 'error',
                    title: 'SISTEMA',
                    text: `${jqXHR.responseText}`,
                });
                return;
            }
            if (jqXHR.responseText === "") return;
            console.log("Error:", jqXHR.responseText);
            Swal.fire({
                icon: 'error',
                title: 'SISTEMA',
                text: `${jqXHR.responseText}`,
            });
        });

    return resul;
}

function selectGridRow(searchedId, grid, idField) {
    var dataSource = grid.dataSource;
    var filters = dataSource.filter() || {};
    var sort = dataSource.sort() || {};
    var models = dataSource.total();
    // We are using a Query object to get a sorted and filtered representation of the data, without paging applied, so we can search for the row on all pages
    var query = new kendo.data.Query(models);
    var rowNum = 0;
    var modelToSelect = null;

    models = query.filter(filters).sort(sort).data;
    console.log(models)
    debugger;
    // Now that we have an accurate representation of data, let's get the item position
    for (var i = 0; i < models.length; ++i) {
        var model = models[i];
        debugger;
        if (model[idField] == searchedId) {
            modelToSelect = model;
            rowNum = i;
            break;
        }
    }

    // If you have persistSelection = true and want to clear all existing selections first, uncomment the next line
    // grid._selectedIds = {};

    // Now go to the page holding the record and select the row
    var currentPageSize = grid.dataSource.pageSize();
    var pageWithRow = parseInt((rowNum / currentPageSize)) + 1; // pages are one-based
    grid.dataSource.page(pageWithRow);

    var row = grid.element.find("tr[data-uid='" + modelToSelect.uid + "']");
    if (row.length > 0) {
        grid.select(row);

        // Scroll to the item to ensure it is visible
        grid.content.scrollTop(grid.select().position().top);
    }
}

function sendRequest(url, method = 'GET', data) {
    const d = $.Deferred();
    //debugger;
    logRequest(method, url, data);

    $.ajax(url, {
        method,
        data,
        cache: false,
        xhrFields: { withCredentials: true },
        headers: {
            "Content-Type": "application/json"
        }
    }).done((result) => {
        if (!result.result) {
            //console.log('errorrrrr')
            d.reject(result.msg);
        }
        //d.resolve(method === 'GET' ? JSON.parse(result.Datos) : result);
        if (method === 'GET') {
            //console.log(result.Datos)
            return d.resolve(JSON.parse(result.Datos))
        } else {
            return d.resolve(result)
        }
    }).fail((xhr) => {
        d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
    });

    return d.promise();
}

function sendRequestTable(url, method = 'GET', data) {
    const d = $.Deferred();
    //debugger;
    logRequest(method, url, data);

    $.ajax(url, {
        method,
        data,
        cache: false,
        xhrFields: { withCredentials: true },
        headers: {
            "Content-Type": "application/json"
        }
    }).done((result) => {
        return;
        //if (!result.result) {
        //console.log('errorrrrr')
        d.reject(result);
        //}
        //d.resolve(method === 'GET' ? JSON.parse(result.Datos) : result);
        if (method === 'GET') {
            //console.log(result.Datos)
            return d.resolve(JSON.parse(result.Datos))
        } else {
            return d.resolve(result)
        }
    }).fail((xhr) => {
        d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
    });

    return d.promise();
}
function logRequest(method, url, data) {
    const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');

    const logList = $('#requests ul');
    const time = DevExpress.localization.formatDate(new Date(), 'HH:mm:ss');
    const newItem = $('<li>').text([time, method, url.slice(URL.length), args].join(' '));

    logList.prepend(newItem);
}