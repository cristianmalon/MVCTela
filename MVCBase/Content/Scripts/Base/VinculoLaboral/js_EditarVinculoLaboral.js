$(document).ready(function () {
    
    $("#FECHA_INICIO").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();
    $("#FECHA_TERMINO").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();
    $("#FECHA_CONTRATO").css({ "width": "100%", "heigth": "auto" }).kendoDatePicker();

    $("#XID_TIPO_FUNCION").css({"width":"100%", "heigth": "auto"}).kendoComboBox({
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

    $("#XID_PERSONA_JURIDICA").css({ "width": "100%", "heigth": "auto" }).kendoComboBox({
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

    //Un Nuevo Registro
    if ($("#XID_VINCULO_LABORAL_PJ_PA").val().trim() == "") {
        $("#FECHA_INICIO").val('');
        $("#FECHA_TERMINO").val('');
        $("#FECHA_CONTRATO").val('');

        
    } else {
        if ($("#FLG_CONTRATO_INDETERMINADO").is(':checked')) {
            $("#FECHA_TERMINO").data("kendoDatePicker").enable(false);
            $("#FECHA_TERMINO").val('');
        } else {
            $("#FECHA_TERMINO").data("kendoDatePicker").enable(true);
        }
    }


});

$("#FLG_CONTRATO_INDETERMINADO").click(function (e) {
    if ($(this).is(':checked')) {
        $("#FECHA_TERMINO").data("kendoDatePicker").enable(false);
        $("#FECHA_TERMINO").val('');
    } else {
        $("#FECHA_TERMINO").data("kendoDatePicker").enable(true);
    }
});

$("#btnRegistrarVinculoLaboral").bind("click", function () {
    if (validDatosVinculoLaboral()) {

        

        if ($("#XID_VINCULO_LABORAL_PJ_PA").val().trim() == "") {

            var cbtipo_funcion = $("#XID_TIPO_FUNCION").data("kendoComboBox");

            var T_GEND_VINCULO_LABORAL_PJ_PA = {
                ID_VINCULO_LABORAL_PJ_PA: 0,
                XID_PERSONA_JURIDICA: $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value(),
                XID_TIPO_FUNCION: $("#XID_TIPO_FUNCION").data("kendoComboBox").value(),
                FECHA_INICIO: $("#FECHA_INICIO").data("kendoDatePicker").value(),
                FECHA_TERMINO: $("#FECHA_TERMINO").data("kendoDatePicker").value(),
                FECHA_CONTRATO: $("#FECHA_CONTRATO").data("kendoDatePicker").value(),
                FLG_CONTRATO_INDETERMINADO: $('#FLG_CONTRATO_INDETERMINADO').is(':checked') == true ? true : false,
                FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_VINCULO_LABORAL_PJ_PA: $("#XID_VINCULO_LABORAL_PJ_PA").val().trim(),
                XID_PERSONAL_AERONAUTICO: $("#XID_PERSONAL_AERONAUTICO").val()
            }
        } else {
            var T_GEND_VINCULO_LABORAL_PJ_PA = {
                ID_VINCULO_LABORAL_PJ_PA: 0,                
                FECHA_TERMINO: $("#FECHA_TERMINO").data("kendoDatePicker").value(),
                FLG_CONTRATO_INDETERMINADO: $('#FLG_CONTRATO_INDETERMINADO').is(':checked') == true ? true : false,
                FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_VINCULO_LABORAL_PJ_PA: $("#XID_VINCULO_LABORAL_PJ_PA").val().trim()
            }
        }

        
        console.log(T_GEND_VINCULO_LABORAL_PJ_PA);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/VinculoLaboral/SaveVinculoLaboral',
            type: 'POST',
            data: JSON.stringify({ objVinculoLaboral: T_GEND_VINCULO_LABORAL_PJ_PA }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorVinculoLaboral", "ulListaErrorVinculoLaboral", data.errores);
                } else {
                    $("#contenedor").modal('hide');
                    cargarGridVinculoLaboral();

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


function validDatosVinculoLaboral() {

    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#XID_VINCULO_LABORAL_PJ_PA").val().trim() == "") {
        
        if ($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value() == null || $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XID_PERSONA_JURIDICA_listbox"]').parents("span").addClass("valError");
            objData.push({ "XID_PERSONA_JURIDICA": [{ ErrorMessage: "Debe seleccionar una empresa" }] })
        }
        if ($("#XID_TIPO_FUNCION").data("kendoComboBox").value() == null || $("#XID_TIPO_FUNCION").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XID_TIPO_FUNCION_listbox"]').parents("span").addClass("valError");
            objData.push({ "XID_TIPO_FUNCION": [{ ErrorMessage: "Debe seleccionar el tipo de función" }] })
        }

        if (isDate($("#FECHA_INICIO").val()) == false) {
            flg = false;
            $("#FECHA_INICIO").parents("span").addClass("valError");
            objData.push({ "FECHA_INICIO": [{ ErrorMessage: "Debe ingresar una fecha de inicio Válida" }] })
        }

        if (!$("#FLG_CONTRATO_INDETERMINADO").is(':checked')) {
            if (isDate($("#FECHA_TERMINO").val()) == false) {
                flg = false;
                $("#FECHA_TERMINO").parents("span").addClass("valError");
                objData.push({ "FECHA_TERMINO": [{ ErrorMessage: "Debe ingresar una fecha de termino Válida" }] })
            } else {
                if (validate_fechaMayorQue($("#FECHA_INICIO").val(), $("#FECHA_TERMINO").val()) == 0) {
                    flg = false;
                    $("#FECHA_INICIO").parents("span").addClass("valError");
                    $("#FECHA_TERMINO").parents("span").addClass("valError");
                    objData.push({ "FECHA_INICIO": [{ ErrorMessage: "La fecha de inicio debe ser menor que la fecha de termino" }] })
                }

                if (validate_fechaMayorQue($("#FECHA_CONTRATO").val(), $("#FECHA_TERMINO").val()) == 0) {
                    flg = false;
                    $("#FECHA_CONTRATO").parents("span").addClass("valError");
                    $("#FECHA_TERMINO").parents("span").addClass("valError");
                    objData.push({ "FECHA_CONTRATO": [{ ErrorMessage: "La fecha de contrato debe ser menor que la fecha de termino" }] })
                }
            }


        }

        if (isDate($("#FECHA_CONTRATO").val()) == false) {
            flg = false;
            $("#FECHA_CONTRATO").parents("span").addClass("valError");
            objData.push({ "FECHA_CONTRATO": [{ ErrorMessage: "Debe ingresar una fecha de contrato Válida" }] })
        }

        


    } else {
        if (!$("#FLG_CONTRATO_INDETERMINADO").is(':checked')) {
            if (isDate($("#FECHA_TERMINO").val()) == false) {
                flg = false;
                $("#FECHA_TERMINO").parents("span").addClass("valError");
                objData.push({ "FECHA_TERMINO": [{ ErrorMessage: "Debe ingresar una fecha de termino Válida" }] })
            } else {
                if (validate_fechaMayorQue($("#XFECHA_INICIO").val(), $("#FECHA_TERMINO").val()) == 0) {
                    flg = false;
                    $("#FECHA_TERMINO").parents("span").addClass("valError");
                    objData.push({ "FECHA_TERMINO": [{ ErrorMessage: "La fecha de inicio debe ser menor que la fecha de termino" }] })
                }

                if (validate_fechaMayorQue($("#XFECHA_CONTRATO").val(), $("#FECHA_TERMINO").val()) == 0) {
                    flg = false;
                    $("#FECHA_TERMINO").parents("span").addClass("valError");
                    objData.push({ "FECHA_TERMINO": [{ ErrorMessage: "La fecha de contrato debe ser menor que la fecha de termino" }] })
                }
            }
        }
    }

    if (flg) {
        $("#divErrorTipoLicencia").hide();
    }
    else {
        $("#divErrorVinculoLaboral").html('<strong>No se puede grabar</strong><ul id="ulListaErrorVinculoLaboral"></ul>');
        errorAddJS("divErrorVinculoLaboral", "ulListaErrorVinculoLaboral", objData)
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


