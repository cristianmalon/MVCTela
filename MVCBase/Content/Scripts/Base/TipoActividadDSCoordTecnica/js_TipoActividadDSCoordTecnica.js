$(document).ready(function () {

    $("#XCOORDINACION_TECNICA").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#XTIPO_ACTIVIDAD_DS").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

});

function validDatosTipoActividadDSCoordTecnica() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    
    if ($("#XCOORDINACION_TECNICA").data("kendoComboBox").value() == null || $("#XCOORDINACION_TECNICA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XCOORDINACION_TECNICA_listbox"]').parents("span").addClass("valError");
        objData.push({ "XCOORDINACION_TECNICA": [{ ErrorMessage: "Debe seleccionar la coordinación técnica" }] })
    }
    if ($("#XTIPO_ACTIVIDAD_DS").data("kendoComboBox").value() == null || $("#XTIPO_ACTIVIDAD_DS").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XTIPO_ACTIVIDAD_DS_listbox"]').parents("span").addClass("valError");
        objData.push({ "XTIPO_ACTIVIDAD_DS": [{ ErrorMessage: "Debe seleccionar el tipo de actividad" }] })
    }
    if (flg) {
        $("#divErrorTipoActividadDSCoordTecnica").hide();
    }
    else {
        $("#divErrorTipoActividadDSCoordTecnica").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoActividadDSCoordTecnica"></ul>');
        errorAddJS("divErrorTipoActividadDSCoordTecnica", "ulListaErrorTipoActividadDSCoordTecnica", objData)
    }

    return flg;
}

$("#btnRegistrarTipoActividadDSCoordTecnica").bind("click", function () {


    if (validDatosTipoActividadDSCoordTecnica()) {


        var T_GEND_TIP_ACTI_DS_COORD_TEC = {
            ID_TIP_ACTI_DS_COORD_TEC: 0,
            ID_COORDINACION_TECNICA: 0,
            ID_TIPO_ACTIVIDAD_DS: 0,            
            FECHA_FIN: $("#FECHA_FIN").val(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XTIP_ACTI_DS_COORD_TEC: $("#XTIP_ACTI_DS_COORD_TEC").val().trim(),
            XCOORDINACION_TECNICA: $.trim($("#XCOORDINACION_TECNICA").data("kendoComboBox").value()),
            XTIPO_ACTIVIDAD_DS: $.trim($("#XTIPO_ACTIVIDAD_DS").data("kendoComboBox").value())

        }

        console.log(T_GEND_TIP_ACTI_DS_COORD_TEC);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoActividadDSCoordTecnica/SaveRegistroTipoActividadDSCoordTecnica',
            type: 'POST',
            data: JSON.stringify({ objTipoActividadDSCoordTecnica: T_GEND_TIP_ACTI_DS_COORD_TEC }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoActividadDSCoordTecnica", "ulListaErrorTipoActividadDSCoordTecnica", data.errores);
                } else {
                    //console.log(data.newcontregistro);

                    $("#contenedor").modal('hide');
                    cargarGridTipoActividadDSCoordTecnica();

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