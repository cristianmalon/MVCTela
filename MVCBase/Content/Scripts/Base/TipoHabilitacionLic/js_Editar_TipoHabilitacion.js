$(document).ready(function () {
    $("#XTIPO_EVALUACION").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        dataTextField: "DESCRIPCION",
        dataValueField: "XID_TIPO_EVALUACION_LIC"
    });

    if ($("#XID_TIPO_HABILITACION_LIC").val().trim() != "") {
        DatosEvaluacionMultiselect();
    } 


});

$("#btnRegistrarTipoHabilitacion").bind("click", function () {

    if (validDatosTipoHabilitacion()) {

        var lTipoEvaluacion = $("#XTIPO_EVALUACION").data('kendoMultiSelect');

        var T_MAE_TIPO_HABILITACION_LIC = {
            ID_TIPO_HABILITACION_LIC: 0,
            DESCRIPCION_ESPANOL: $("#DESCRIPCION_ESPANOL").val().trim(),
            DESCRIPCION_INGLES: $("#DESCRIPCION_INGLES").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_HABILITACION_LIC: $("#XID_TIPO_HABILITACION_LIC").val().trim()

        }
        console.log(XID_TIPO_HABILITACION_LIC);

        var objDataHabEva = [];
        $.each(lTipoEvaluacion.value(), function (index, value) {
            var oDataUtil = {
                XID_TIPO_EVALUACION_LIC: value
            }
            objDataHabEva.push(oDataUtil);
            
        });
        console.log(objDataHabEva);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoHabilitacionLic/SaveTipoHabilitacion',
            type: 'POST',
            data: JSON.stringify({ objTipoHabilitacion: T_MAE_TIPO_HABILITACION_LIC, ObjHabilEvalua: objDataHabEva }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoHabilitacion", "ulListaErrorTipoHabilitacion", data.errores);
                } else {
                    $("#contenedor").modal('hide');
                    cargarGridTipoHabilitacion();

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


function validDatosTipoHabilitacion() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION_ESPANOL").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION_ESPANOL": [{ ErrorMessage: "Debe ingresar la descripción en español" }] })
    }
    if ($("#DESCRIPCION_INGLES").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION_INGLES": [{ ErrorMessage: "Debe ingresar la descripción en ingles" }] })
    }
    if ($("#XTIPO_EVALUACION").data("kendoMultiSelect").value() == null || $("#XTIPO_EVALUACION").data("kendoMultiSelect").value() == "") {
        flg = false;
        $('[aria-owns="XTIPO_EVALUACION_taglist XTIPO_EVALUACION_listbox"]').parent("div").addClass("valError");
        objData.push({ "XTIPO_EVALUACION": [{ ErrorMessage: "Debe Seleccionar un tipo de evaluación como mínimo" }] })
    }

    if (flg) {
        $("#divErrorTipoHabilitacion").hide();
    }
    else {
        $("#divErrorTipoHabilitacion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoHabilitacion"></ul>');
        errorAddJS("divErrorTipoHabilitacion", "ulListaErrorTipoHabilitacion", objData)
    }

    return flg;
}

function DatosEvaluacionMultiselect() {

    $.ajax({
        datatype: 'json',
        url: '/TipoHabilitacionLic/DatosEvaluacion',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ Id_habilitacion: $("#XID_TIPO_HABILITACION_LIC").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorTipoHabilitacion", "ulListaErrorTipoHabilitacion", data.errores);
            } else {
                $("#XTIPO_EVALUACION").data("kendoMultiSelect").value(data.varDatoRap.split(","));
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}


