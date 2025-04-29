$(document).ready(function () {
    CargarDatosKendoUi();

    if ($("#XID_HABILITACION_LIC").val().trim() == "") {
        $("#FECHA_EXPEDICION").val('');
    }
});

function CargarDatosKendoUi() {

    $("#XID_TIPO_HABILITACION_LIC").css({ "width": "100%", "height": "auto" }).kendoComboBox({
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

$("#btnRegistrarHabilitacion").bind("click", function () {

    if (validDatosHabilitacion()) {

        var T_GENM_HABILITACION = {
            ID_HABILITACION_LIC: 0,
            XID_TIPO_HABILITACION_LIC: $("#XID_TIPO_HABILITACION_LIC").data("kendoComboBox").value(),
            XID_LICENCIA: $("#XID_LICENCIA").val().trim(),
            FECHA_EXPEDICION: $("#FECHA_EXPEDICION").val(),//$("#FECHA_EXPEDICION").data("kendoDatePicker").value(),
            OBSERVACION: $("#OBSERVACION").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_HABILITACION_LIC: $("#XID_HABILITACION_LIC").val().trim()

        }

        console.log(T_GENM_HABILITACION);


        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/LicenciaHabilitacion/SaveHabilitacion',
            type: 'POST',
            data: JSON.stringify({ objHabilitacion: T_GENM_HABILITACION }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorHabilitacion", "ulListaErrorHabilitacion", data.errores);
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


function validDatosHabilitacion() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#XID_TIPO_HABILITACION_LIC").data("kendoComboBox").value() == null || $("#XID_TIPO_HABILITACION_LIC").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_TIPO_HABILITACION_LIC_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_TIPO_HABILITACION_LIC": [{ ErrorMessage: "Debe seleccionar el tipo de Habilitación" }] })
    }
    if (isDate($("#FECHA_EXPEDICION").val()) == false) {
        flg = false;
        $("#FECHA_EXPEDICION").parents("span").addClass("valError");
        objData.push({ "FECHA_EXPEDICION": [{ ErrorMessage: "Debe ingresar una fecha de expedición válida" }] })
    }

    if (flg) {
        $("#divErrorHabilitacion").hide();
    }
    else {
        $("#divErrorHabilitacion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHabilitacion"></ul>');
        errorAddJS("divErrorHabilitacion", "ulListaErrorHabilitacion", objData)
    }

    return flg;
}