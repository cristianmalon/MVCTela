$(document).ready(function () {
    CargarDatosKendoUi();
    
    if ($("#XID_LICENCIA").val().trim() == "") {
        $("#FECHA_EXPEDICION").val('');
    }
});

function CargarDatosKendoUi() {

    $("#XID_TIPO_LICENCIA").css({ "width": "100%", "height": "auto" }).kendoComboBox({
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
    
    $("#FECHA_EXPEDICION").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();

}

$('#FLG_CONVALIDACION_LICENCIA').bind('change', function () {

    if ($(this).is(':checked')) {
        $("#convalidacion").removeClass("hidden");
    }
    else {
        $("#convalidacion").addClass("hidden");
    }
});

$("#btnRegistrarLicencia").bind("click", function () {
    
    if (validDatosLicencia()) {
                
            var T_GENM_LICENCIA = {
                ID_LICENCIA: 0,
                XID_TIPO_LICENCIA: $("#XID_TIPO_LICENCIA").data("kendoComboBox").value(),
                FLG_CONVALIDACION_LICENCIA: $('#FLG_CONVALIDACION_LICENCIA').is(':checked') == true ? true : false,
                NRO_LICENCIA: $("#NRO_LICENCIA").val().trim(),
                FECHA_EXPEDICION: $("#FECHA_EXPEDICION").val(),//$("#FECHA_EXPEDICION").data("kendoDatePicker").value(),
                OBSERVACION: $("#OBSERVACION").val().trim(),
                XID_TIPO_RESTRICCION: $("#XID_TIPO_RESTRICCION").data("kendoComboBox").value(),
                XID_ESTADO_CARD: $("#XID_ESTADO_CARD").data("kendoComboBox").value(),
                XID_PERSONA_JURIDICA: $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value(),
                NRO_LICENCIA_EXTRANJERA: $("#NRO_LICENCIA_EXTRANJERA").val().trim(),
                XID_ACC_EXTRANJERA: $("#XID_ACC_EXTRANJERA").data("kendoComboBox").value(),
                FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
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
    
    if ($("#XID_TIPO_LICENCIA").data("kendoComboBox").value() == null || $("#XID_TIPO_LICENCIA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_TIPO_LICENCIA_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_TIPO_LICENCIA": [{ ErrorMessage: "Debe seleccionar el tipo de licencia" }] })
    }
    if ($("#NRO_LICENCIA").val().trim() == "") {
        flg = false;
        objData.push({ "NRO_LICENCIA": [{ ErrorMessage: "Debe ingresar el número de licencia" }] })
    }
    if (isDate($("#FECHA_EXPEDICION").val()) == false) {
        flg = false;
        $("#FECHA_EXPEDICION").parents("span").addClass("valError");
        objData.push({ "FECHA_EXPEDICION": [{ ErrorMessage: "Debe ingresar una fecha de expedición válida" }] })
    }
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

    if ($('#FLG_CONVALIDACION_LICENCIA').is(':checked')) {
        if ($("#NRO_LICENCIA_EXTRANJERA").val().trim() == "") {
            flg = false;
            objData.push({ "NRO_LICENCIA_EXTRANJERA": [{ ErrorMessage: "Debe ingresar el número de licencia extranjera" }] })
        }
        if ($("#XID_ACC_EXTRANJERA").data("kendoComboBox").value() == null || $("#XID_ACC_EXTRANJERA").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XID_ACC_EXTRANJERA_listbox"]').parents("span").addClass("valError");
            objData.push({ "XID_ACC_EXTRANJERA": [{ ErrorMessage: "Debe seleccionar el un Acc extranjera" }] })
        }

    }
    
    if (flg) {
        $("#divErrorLicencia").hide();
    }
    else {
        $("#divErrorLicencia").html('<strong>No se puede grabar</strong><ul id="ulListaErrorLicencia"></ul>');
        errorAddJS("divErrorLicencia", "ulListaErrorLicencia", objData)
    }

    return flg;
}