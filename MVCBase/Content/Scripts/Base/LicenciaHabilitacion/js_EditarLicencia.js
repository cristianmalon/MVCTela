$(document).ready(function () {
    CargarDatosKendoUi();

    if ($("#XFLG_SUSPENCION").val() == "0") {
        $("#btnSuspender").show();
        $("#btnActivar").hide();
    } else {
        $("#btnSuspender").hide();
        $("#btnActivar").show();
    }

    
});

function CargarDatosKendoUi() {
      
    $("#XID_TIPO_RESTRICCION").css({ "width": "100%", "height": "auto" }).kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#XID_ESTADO_CARD").css({ "width": "100%", "height": "auto" }).kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#XID_PERSONA_JURIDICA").css({ "width": "100%", "height": "auto" }).kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#XID_ACC_EXTRANJERA").css({ "width": "100%", "height": "auto" }).kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });
    
}



$("#btnRegistrarLicencia").bind("click", function () {

    if (validDatosLicencia()) {

        var T_GENM_LICENCIA = {
            ID_LICENCIA: 0,            
            OBSERVACION: $("#OBSERVACION").val().trim(),
            XID_TIPO_RESTRICCION: $("#XID_TIPO_RESTRICCION").data("kendoComboBox").value(),
            XID_ESTADO_CARD: $("#XID_ESTADO_CARD").data("kendoComboBox").value(),
            XID_PERSONA_JURIDICA: $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value(),
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_PERSONAL_AERONAUTICO: $("#XID_PERSONAL_AERONAUTICO").val(),
            XID_LICENCIA: $("#XID_LICENCIA").val().trim()
        }

        console.log(T_GENM_LICENCIA);


        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/LicenciaHabilitacion/SaveLicencia',
            type: 'POST',
            data: JSON.stringify({ objLicencia: T_GENM_LICENCIA }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorLicencia", "ulListaErrorLicencia", data.errores);
                } else {
                    $("#contenedor").modal('hide');
                    $("body").find("#gridLicencias").data('kendoGrid').dataSource.read();
                    $("body").find("#gridLicencias").data('kendoGrid').refresh();
                }

                desbloqObject();

            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });

    }
});


function validDatosLicencia() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#XID_TIPO_RESTRICCION").data("kendoComboBox").value() == null || $("#XID_TIPO_RESTRICCION").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_TIPO_RESTRICCION_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_TIPO_RESTRICCION": [{ ErrorMessage: "Debe seleccionar el tipo de restricción" }] })
    }
    if ($("#XID_ESTADO_CARD").data("kendoComboBox").value() == null || $("#XID_ESTADO_CARD").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_ESTADO_CARD_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_ESTADO_CARD": [{ ErrorMessage: "Debe seleccionar el estado card" }] })
    }
    //if ($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value() == null || $("#XID_TIPO_RESTRICCION").data("kendoComboBox").value() == "") {
    //    flg = false;
    //    $('[aria-owns="XID_PERSONA_JURIDICA_listbox"]').parents("span").addClass("valError");
    //    objData.push({ "XID_PERSONA_JURIDICA": [{ ErrorMessage: "Debe seleccionar el lugar de procedencia" }] })
    //}


    if (flg) {
        $("#divErrorLicencia").hide();
    }
    else {
        $("#divErrorLicencia").html('<strong>No se puede grabar</strong><ul id="ulListaErrorLicencia"></ul>');
        errorAddJS("divErrorLicencia", "ulListaErrorLicencia", objData)
    }

    return flg;
}


$("#btnSuspender").bind("click", function () {
    modalAjaxRequestGet2($(this).attr("data-url"), "", "", "Id_Licencia=" + $('#XID_LICENCIA').val());
});

$("#btnActivar").bind("click", function () {
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/LicenciaHabilitacion/ActivarLicencia',
        type: 'POST',
        data: JSON.stringify({ Id_Licencia: $('#XID_LICENCIA').val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);
            if (!data.rpta) {
                errorAddModelo("divErrorLicencia", "ulListaErrorLicencia", data.errores);
            } else {

                bootbox.alert("La Activación de la Licencia se realizó con éxito", function () {
                    $("#btnSuspender").show();
                    $("#btnActivar").hide();
                });



            }

            desbloqObject();

        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });
});




    
    //$("#btnSuspender").bind("click", function () {
    //    bootbox.dialog({
    //        title: "¿Esta seguro de reprogramar la planificación?",
    //        message: '<div class="row">' +
    //            '<div class="col-md-12">' +
    //            '<form>' +

    //            '<div class="form-group">' +
    //            '<label class="control-label asterisco">Motivo</label>' +
    //            '<textarea class="form-control" rows="3" id="motivoCalendarInspeccion"></textarea>' +
    //            '</div>' +

    //            '<div class="form-group clearfix">' +
    //            '<label class="control-label col-md-2 asterisco">Fecha Inicio</label>' +
    //            '<div class="col-md-4">' +
    //            '<input type="text" id="fechaInicioCalendarInspeccion" class="form-control" onkeypress="return false;" />' +
    //            '</div>' +
    //            '<label class="control-label col-md-2 asterisco">Fecha Fin</label>' +
    //            '<div class="col-md-4">' +
    //            '<input type="text" id="fechaFinCalendarInspeccion" class="form-control" onkeypress="return false;" />' +
    //            '</div> </div>' +

    //            '<div class="form-group">' +
    //            '<div id="divErrorCalendarInspeccion" class="alert alert-warning alert-dismissible" style="display:none;">' +
    //            '<strong>No se puede grabar</strong>' +
    //            '<ul id="ulListaErrorCalendarInspeccion"></ul>' +
    //            '</div>' +

    //            //'<script>$(function(){var aaaa=@Model.DESC_ANO;var start=$("#fechaInicioCalendarInspeccion").css("width","100%").kendoDatePicker({change:function(e){if(value===null){value=kendo.parseDate()}var d=new Date(start.value());end.value("");end.min(d);end.max(new Date(d.getFullYear(),d.getMonth()+1,0))}}).data("kendoDatePicker");var end=$("#fechaFinCalendarInspeccion").css("width","100%").kendoDatePicker({change:function(e){var dt=e.sender;var value=dt.value();console.log(value);if(value===null){value=kendo.parseDate(dt.element.val(),dt.options.parseFormats)}if(value<dt.min()){dt.value(dt.min())}else if(value>dt.max()){dt.value(dt.max())}}}).data("kendoDatePicker")})<\/script>' +


    //            '<script>$(function(){ $("#fechaInicioCalendarInspeccion").css("width","100%").kendoDatePicker({ }); })<\/script>' +

    //            '</form> </div> </div>',
    //        buttons: [{
    //            label: "Cancelar",
    //            className: "btn-default"
    //        }
    //        //, {
    //        //    label: "Aceptar",
    //        //    className: "btn-primary",
    //        //    callback: function () {
    //        //        var MOTIVO = $("#motivoCalendarInspeccion").val();
    //        //        var XFECHA_INICIO = $("#fechaInicioCalendarInspeccion").val();
    //        //        var XFECHA_FIN = $("#fechaFinCalendarInspeccion").val();
    //        //        $.ajax({
    //        //            url: "",
    //        //            data: "XID_ACTIVIDAD_DS=@Model.XID_ACTIVIDAD_DS&ID_ESTADO_ACTIVIDAD_DS=3&MOTIVO=" + MOTIVO + "&XFECHA_INICIO=" + XFECHA_INICIO + "&XFECHA_FIN=" + XFECHA_FIN,
    //        //            beforeSend: function () {
    //        //                bloquoteObject();
    //        //            },
    //        //            success: function (data) {
    //        //                desbloqObject();
    //        //                if (!data.rpta) {
    //        //                    errorAddModelo("divErrorCalendarInspeccion", "ulListaErrorCalendarInspeccion", data.errores);
    //        //                } else {
    //        //                    $("#Calendar").fullCalendar("refetchEvents");
    //        //                    popupCalendarInspeccion();
    //        //                }
    //        //            }
    //        //        });
    //        //        return false;
    //        //    }
    //        //}
    //        ]
    //    });
    //});