$(document).ready(function () {
    $("#XTIPO_EVALUACION").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        dataTextField: "DESCRIPCION",
        dataValueField: "XID_TIPO_EVALUACION_LIC"
    });

    $("#XTIPO_HABILITACION").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        dataTextField: "DESCRIPCION",
        dataValueField: "XID_TIPO_HABILITACION_LIC" 
    });

    $("#XTIPO_RESTRICCION").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        dataTextField: "DESCRIPCION",
        dataValueField: "XID_TIPO_RESTRICCION"
    }); 

    $("#XID_TIPO_FUNCION").kendoComboBox({
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



    //Para La Edición
    if ($("#XID_TIPO_LICENCIA").val().trim() != "") {
        DatosEvaluacionMultiselect();
    }
    

});

$("#btnRegistrarTipoLicencia").bind("click", function () {
    if (validDatosTipoLicencias()) {

        var lTipoEvaluacion = $("#XTIPO_EVALUACION").data('kendoMultiSelect');
        var lTipoHabilitacion = $("#XTIPO_HABILITACION").data('kendoMultiSelect');
        var lTipoRestriccion = $("#XTIPO_RESTRICCION").data('kendoMultiSelect');
        var cbtipo_funcion = $("#XID_TIPO_FUNCION").data("kendoComboBox");

        var T_MAE_TIPO_LICENCIA = {
            ID_TIPO_LICENCIA: 0,
            DESCRIPCION_ESPANOL: $("#DESCRIPCION_ESPANOL").val().trim(),
            DESCRIPCION_INGLES: $("#DESCRIPCION_INGLES").val().trim(),
            XID_TIPO_FUNCION: cbtipo_funcion.value(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XID_TIPO_LICENCIA: $("#XID_TIPO_LICENCIA").val().trim()

        }
        console.log(T_MAE_TIPO_LICENCIA);

        var objDataLicEva = [];
        $.each(lTipoEvaluacion.value(), function (index, value) {
            var oDataUtil = {
                XID_TIPO_EVALUACION_LIC: value
            }
            objDataLicEva.push(oDataUtil);

        });
        console.log(objDataLicEva);


        var objDataLicHab = [];
        $.each(lTipoHabilitacion.value(), function (index, value) {
            var oDataUtil = {
                XID_TIPO_HABILITACION_LIC: value
            }
            objDataLicHab.push(oDataUtil);

        });
        console.log(objDataLicHab);

        
        lTipoRestriccion
        var objDataLicRest = [];
        $.each(lTipoRestriccion.value(), function (index, value) {
            var oDataUtil = {
                XID_TIPO_RESTRICCION: value
            }
            objDataLicRest.push(oDataUtil);

        });
        console.log(objDataLicRest);


        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoLicencia/SaveTipoLicencia',
            type: 'POST',
            data: JSON.stringify({ objTipoLicencia: T_MAE_TIPO_LICENCIA, ObjLicenciaEvalua: objDataLicEva, ObjLicenciaHab: objDataLicHab, ObjLicenciaRest: objDataLicRest }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoLicencia", "ulListaErrorTipoLicencia", data.errores);
                } else {
                    $("#contenedor").modal('hide');
                    cargarGridTipoLicencia();

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


function validDatosTipoLicencias() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION_ESPANOL").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION_ESPANOL": [{ ErrorMessage: "Debe ingresar la descripción en español" }] })
    }
    if ($("#DESCRIPCION_INGLES").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION_INGLES": [{ ErrorMessage: "Debe ingresar la descripción en inglés" }] })
    }
    if ($("#XID_TIPO_FUNCION").data("kendoComboBox").value() == null || $("#XID_TIPO_FUNCION").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_TIPO_FUNCION_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_TIPO_FUNCION": [{ ErrorMessage: "Debe seleccionar el tipo de función" }] })
    }
    if ($("#XTIPO_EVALUACION").data("kendoMultiSelect").value() == null || $("#XTIPO_EVALUACION").data("kendoMultiSelect").value() == "") {
        flg = false;
        $('[aria-owns="XTIPO_EVALUACION_taglist XTIPO_EVALUACION_listbox"]').parent("div").addClass("valError");
        objData.push({ "XTIPO_EVALUACION": [{ ErrorMessage: "Debe seleccionar un tipo de evaluación como mínimo" }] })
    }
    if ($("#XTIPO_RESTRICCION").data("kendoMultiSelect").value() == null || $("#XTIPO_RESTRICCION").data("kendoMultiSelect").value() == "") {
        flg = false;
        $('[aria-owns="XTIPO_RESTRICCION_taglist XTIPO_RESTRICCION_listbox"]').parent("div").addClass("valError");
        objData.push({ "XTIPO_RESTRICCION": [{ ErrorMessage: "Debe seleccionar un tipo de restricción como mínimo" }] })
    }

    if (flg) {
        $("#divErrorTipoLicencia").hide();
    }
    else {
        $("#divErrorTipoLicencia").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoLicencia"></ul>');
        errorAddJS("divErrorTipoLicencia", "ulListaErrorTipoLicencia", objData)
    }

    return flg;
}

function DatosEvaluacionMultiselect() {

    $.ajax({
        datatype: 'json',
        url: '/TipoLicencia/DatosMultiselec',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ Id_licencia: $("#XID_TIPO_LICENCIA").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorTipoLicencia", "ulListaErrorTipoLicencia", data.errores);
            } else {
                $("#XTIPO_EVALUACION").data("kendoMultiSelect").value(data.varDatoEvaluacion.split(","));
                $("#XTIPO_HABILITACION").data("kendoMultiSelect").value(data.varDatoHabilitacion.split(","));
                $("#XTIPO_RESTRICCION").data("kendoMultiSelect").value(data.varDatoRestriccion.split(","));
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}


