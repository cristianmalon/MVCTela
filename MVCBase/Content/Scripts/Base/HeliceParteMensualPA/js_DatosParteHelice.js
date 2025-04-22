$(document).ready(function () {

  
    $("#HORA_FECHA_TURM").kendoDatePicker();
    $("#HORA_FECHA_TURM").kendoDatePicker();
    $("#FECHA_INFORMACION_PARTE").kendoDatePicker();

    $("#XTIPO_SITUACION_PARTE").kendoComboBox({
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

    disabledDivInicialParteHelice();

    calculoHoraMotor();
    //calculoLimiteMotor();
    //calculoCicloMotor();
    //calculoLimiteCicloMotor();

    $("#HORA_TOTAL_ANTERIOR_HORA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
    $("#HORA_TOTAL_ANTERIOR_MINUTO").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
    $("#HORA_MES_HORA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
    $("#HORA_MES_MINUTO").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
    $("#HORA_ACUMULADO_HORA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
    $("#HORA_ACUMULADO_MINUTO").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
    $("#HORA_LIMITE_OH_HORA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
    $("#HORA_LIMITE_OH_MINUTO").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
    $("#HORA_ULTIMO_OH_HORA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
    $("#HORA_ULTIMO_OH_MINUTO").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
    $("#HORA_OPERACION_HORA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
    $("#HORA_OPERACION_MINUTO").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });

    $(".evaltotalhora").blur(function () {
        fnTotalHora('HORA_TOTAL_ANTERIOR_HORA', 'HORA_TOTAL_ANTERIOR_MINUTO', 'HORA_MES_HORA', 'HORA_MES_MINUTO', 'HORA_ACUMULADO_HORA', 'HORA_ACUMULADO_MINUTO');
    });

    $("#HORA_LIMITE_OH_HORA").blur(function (e) {
        if (Number($("#HORA_ULTIMO_OH_HORA").val()) == Number($("#HORA_LIMITE_OH_HORA").val())) {
            if (Number($("#HORA_LIMITE_OH_MINUTO").val()) < Number($("#HORA_ULTIMO_OH_MINUTO").val())) {
                bootbox.alert("El Limite Overh. (Min) de la Aeronave no puede ser menor que el Desde Ult. Overhaul (Min) de la Aeronave");
                $("#HORA_ULTIMO_OH_MINUTO").val(0);
            }
        }
        if (Number($("#HORA_LIMITE_OH_HORA").val()) < Number($("#HORA_ULTIMO_OH_HORA").val())) {
            bootbox.alert("El Limite Overh. (Hora) de la Aeronave no puede ser menor que el Desde Ult. Overhaul (Hora) de la Aeronave");
            $("#HORA_ULTIMO_OH_HORA").val(0);
        }
    });

    $("#HORA_ULTIMO_OH_HORA").blur(function (e) {
        if (Number($("#HORA_ULTIMO_OH_HORA").val()) == Number($("#HORA_LIMITE_OH_HORA").val())) {
            if (Number($("#HORA_LIMITE_OH_MINUTO").val()) < Number($("#HORA_ULTIMO_OH_MINUTO").val())) {
                bootbox.alert("El Limite Overh. (Min) de la Aeronave no puede ser menor que el Desde Ult. Overhaul (Min) de la Aeronave");
                $("#HORA_ULTIMO_OH_MINUTO").val(0);
            }
        }
        if (Number($("#HORA_LIMITE_OH_HORA").val()) < Number($("#HORA_ULTIMO_OH_HORA").val())) {
            bootbox.alert("El Limite Overh. (Hora) de la Aeronave no puede ser menor que el Desde Ult. Overhaul (Hora) de la Aeronave");
            $("#HORA_ULTIMO_OH_HORA").val(0);
        }
    });


    $("#HORA_ULTIMO_OH_MINUTO").blur(function (e) {
        if (Number($("#HORA_ULTIMO_OH_HORA").val()) == Number($("#HORA_LIMITE_OH_HORA").val())) {
            if (Number($("#HORA_LIMITE_OH_MINUTO").val()) < Number($("#HORA_ULTIMO_OH_MINUTO").val())) {
                bootbox.alert("El Limite Overh. (Min) de la Aeronave no puede ser menor que el Desde Ult. Overhaul (Min) de la Aeronave");
                $("#HORA_ULTIMO_OH_MINUTO").val(0);
            }
        }
    });

    $("#HORA_LIMITE_OH_MINUTO").blur(function (e) {
        if (Number($("#HORA_ULTIMO_OH_HORA").val()) == Number($("#HORA_LIMITE_OH_HORA").val())) {
            if (Number($("#HORA_LIMITE_OH_MINUTO").val()) < Number($("#HORA_ULTIMO_OH_MINUTO").val())) {
                bootbox.alert("El Limite Overh. (Min) de la Aeronave no puede ser menor que el Desde Ult. Overhaul (Min) de la Aeronave");
                $("#HORA_ULTIMO_OH_MINUTO").val(0);
            }
        }
    });

    $(".evalaeronavehora").blur(function () {
        fnRemanenteHora('HORA_LIMITE_OH_HORA', 'HORA_LIMITE_OH_MINUTO', 'HORA_ULTIMO_OH_HORA', 'HORA_ULTIMO_OH_MINUTO', 'HORA_OPERACION_HORA', 'HORA_OPERACION_MINUTO');
    });

   
    var data = $("#XPARTE_HELICES_PA").val();

    if (data.length > 1) {
        disabledDivPartehelice();

    }

    $("#btnRegistroParteMensualHelice").click(function () {
        if (validParteHelice()) {
            var objConforAjax = [];

            var dataParteHelice = {
                XHELICES_PA: $("#XHELICE_AERONAVE_PA").val(),
                XAERONAVE_PA: $("#txtAeronave").val(),
                XCONTREGISTRO: $("#txtContRegistro").val(),
                XTIPO_SITUACION: $("#XTIPO_SITUACION_PARTE").data("kendoComboBox").value(),
                FECHA_INFORMACION: $("#FECHA_INFORMACION_PARTE").val().trim(),
                HORA_FECHA_TURM: $("#HORA_FECHA_TURM").val(),
                HORA_TOTAL_ANTERIOR_HORA: $("#HORA_TOTAL_ANTERIOR_HORA").val(),
                HORA_TOTAL_ANTERIOR_MINUTO: $("#HORA_TOTAL_ANTERIOR_MINUTO").val(),
                HORA_MES_HORA: $("#HORA_MES_HORA").val(),
                HORA_MES_MINUTO: $("#HORA_MES_MINUTO").val(),
                HORA_ACUMULADO_HORA: $("#HORA_ACUMULADO_HORA").val(),
                HORA_ACUMULADO_MINUTO: $("#HORA_ACUMULADO_MINUTO").val(),
                HORA_LIMITE_OH_HORA: $("#HORA_LIMITE_OH_HORA").val(),
                HORA_LIMITE_OH_MINUTO: $("#HORA_LIMITE_OH_MINUTO").val(),
                HORA_ULTIMO_OH_HORA: $("#HORA_ULTIMO_OH_HORA").val(),
                HORA_ULTIMO_OH_MINUTO: $("#HORA_ULTIMO_OH_MINUTO").val(),
                HORA_OPERACION_HORA: $("#HORA_OPERACION_HORA").val(),
                HORA_OPERACION_MINUTO: $("#HORA_OPERACION_MINUTO").val(),
                HORA_OBSERVACION: $("#HORA_OBSERVACION").val(),                
                XPARTE_HELICES_PA: $("#XPARTE_HELICES_PA").val().trim(),
                XITEM: $("#XITEM").val().trim()
            }

            console.log(dataParteHelice);

            
            $.ajax({
                datatype: 'json',
                url: '/HeliceParteMensualPA/SaveDatosParteHelice',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    dataParteHelice: dataParteHelice
                }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {
                    console.log(data);
                    if (!data.rpta) {
                        errorAddModelo("divErrorDatoHelice", "ulListaErrorDatoHelice", data.errores);
                    } else {
                        //$("#contenedor").modal('hide');
                        //$("#contenedorModalNewParteMotor").modal('hide');

                        //gridParteMensualMotor();
                        //gridHistoricoParteMensualMotor();
                        window.location = "/HeliceParteMensualPA/ListaDatosParteHelice" + '?Index=' + data.newidaeronave;
                        //window.location = window.location;
                        //bootbox.alert("El registro se guardo con exito!");
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

});


function fnRemanenteHora(HORA_LIMITE_OH_HORA, HORA_LIMITE_OH_MINUTO, HORA_ULTIMO_OH_HORA, HORA_ULTIMO_OH_MINUTO, HORA_OPERACION_HORA, HORA_OPERACION_MINUTO) {
    var HORA_LIMITE_OH_HORA = $("#" + HORA_LIMITE_OH_HORA).val();
    var HORA_LIMITE_OH_MINUTO = $("#" + HORA_LIMITE_OH_MINUTO).val();

    var HORA_ULTIMO_OH_HORA = $("#" + HORA_ULTIMO_OH_HORA).val();
    var HORA_ULTIMO_OH_MINUTO = $("#" + HORA_ULTIMO_OH_MINUTO).val();

    var TOTALHORA = (((Number(HORA_LIMITE_OH_HORA) * 60) + Number(HORA_LIMITE_OH_MINUTO)) - ((Number(HORA_ULTIMO_OH_HORA * 60) + Number(HORA_ULTIMO_OH_MINUTO))));

    $('#' + HORA_OPERACION_HORA).val(parseInt(TOTALHORA / 60));
    $('#' + HORA_OPERACION_MINUTO).val(parseInt(TOTALHORA % 60));
}


function fnTotalHora(HORA_TOTAL_ANTERIOR_HORA, HORA_TOTAL_ANTERIOR_MINUTO, HORA_MES_HORA, HORA_MES_MINUTO, HORA_ACUMULADO_HORA, HORA_ACUMULADO_MINUTO) {
    var HORA_TOTAL_ANTERIOR_HORA = $("#" + HORA_TOTAL_ANTERIOR_HORA).val();
    var HORA_TOTAL_ANTERIOR_MINUTO = $("#" + HORA_TOTAL_ANTERIOR_MINUTO).val();

    var HORA_MES_HORA = $("#" + HORA_MES_HORA).val();
    var HORA_MES_MINUTO = $("#" + HORA_MES_MINUTO).val();

    var TOTALHORA = (((Number(HORA_TOTAL_ANTERIOR_HORA) * 60) + Number(HORA_TOTAL_ANTERIOR_MINUTO)) + ((Number(HORA_MES_HORA * 60) + Number(HORA_MES_MINUTO))));

    $('#' + HORA_ACUMULADO_HORA).val(parseInt(TOTALHORA / 60));
    $('#' + HORA_ACUMULADO_MINUTO).val(parseInt(TOTALHORA % 60));
}




$("#btnCancelarDatosParteHelice").click(function () {
    $("#contenedorModalNewParteHelice").modal('hide');
});
$("#closeParteHelice").click(function () {
    $("#contenedorModalNewParteHelice").modal('hide');
});

function disabledDivInicialParteHelice() {
    $("#txtHelSerie").toggleDisable();
    $("#txtHelFabricante").toggleDisable();
    $("#txtHelModelo").toggleDisable();
    $("#txtHelPosicion").toggleDisable();

    $("#HORA_ACUMULADO_HORA").toggleDisable();
    $("#HORA_ACUMULADO_MINUTO").toggleDisable();

    $("#HORA_OPERACION_HORA").toggleDisable();
    $("#HORA_OPERACION_MINUTO").toggleDisable();
    
}

function disabledDivPartehelice() {
   
    $("#HORA_TOTAL_ANTERIOR_HORA").toggleDisable();
    $("#HORA_TOTAL_ANTERIOR_MINUTO").toggleDisable();
    $("#HORA_MES_HORA").toggleDisable();
    $("#HORA_MES_MINUTO").toggleDisable();
    $("#HORA_ACUMULADO_HORA").toggleDisable();
    $("#HORA_ACUMULADO_MINUTO").toggleDisable();
    $("#HORA_LIMITE_OH_HORA").toggleDisable();
    $("#HORA_LIMITE_OH_MINUTO").toggleDisable();
    $("#HORA_ULTIMO_OH_HORA").toggleDisable();
    $("#HORA_ULTIMO_OH_MINUTO").toggleDisable();
    $("#HORA_OPERACION_HORA").toggleDisable();
    $("#HORA_OPERACION_MINUTO").toggleDisable();
    $("#HORA_OBSERVACION").toggleDisable();
   
    $("#XTIPO_SITUACION_PARTE").data("kendoComboBox").enable(false);

    $("#HORA_FECHA_TURM").data("kendoDatePicker").enable(false);
    $("#FECHA_INFORMACION_PARTE").data("kendoDatePicker").enable(false);
    $("#btnRegistroParteMensualHelice").hide();
}


function validParteHelice() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#FECHA_INFORMACION_PARTE").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_INFORMACION_PARTE").parents("span").addClass("valError");
        objData.push({ "FECHA_INFORMACION_PARTE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha información" }] })
    }
    if ($("#XTIPO_SITUACION_PARTE").data("kendoComboBox").value() == null || $("#XTIPO_SITUACION_PARTE").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XTIPO_SITUACION_PARTE_listbox"]').parents("span").addClass("valError");
        objData.push({ "XTIPO_SITUACION_PARTE": [{ ErrorMessage: "Debe seleccionar la situación" }] })
    }
    if ($("#HORA_FECHA_TURM").val().trim() != "" && ($("#HORA_FECHA_TURM").data("kendoDatePicker").value() == null ||  $("#HORA_FECHA_TURM").val() == '01/01/1900')) {
        flg = false;
        $("#HORA_FECHA_TURM").parents("span").addClass("valError");
        objData.push({ "HORA_FECHA_TURM": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de T.U.R.M." }] })
    }    
    if ($("#HORA_TOTAL_ANTERIOR_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_TOTAL_ANTERIOR_HORA": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_TOTAL_ANTERIOR_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_TOTAL_ANTERIOR_MINUTO": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_MES_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_MES_HORA": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_MES_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_MES_MINUTO": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_ACUMULADO_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_ACUMULADO_HORA": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_ACUMULADO_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_ACUMULADO_MINUTO": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_LIMITE_OH_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_LIMITE_OH_HORA": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_LIMITE_OH_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_LIMITE_OH_MINUTO": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_ULTIMO_OH_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_ULTIMO_OH_HORA": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_ULTIMO_OH_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_ULTIMO_OH_MINUTO": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_OPERACION_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_OPERACION_HORA": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    if ($("#HORA_OPERACION_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "HORA_OPERACION_MINUTO": [{ ErrorMessage: "Debe ingresar el registro" }] })
    }
    

    if (flg) {
        $("#divErrorDatoHelice").hide();
    }
    else {
        $("#divErrorDatoHelice").html('<strong>No se puede grabar</strong><ul id="ulListaErrorDatoHelice"></ul>');
        errorAddJS("divErrorDatoHelice", "ulListaErrorDatoHelice", objData)
    }

    return flg;
}

function calculoHoraMotor() {
    var HORAANTERIOR = Number($("#HORA_TOTAL_ANTERIOR_HORA").val());
    var MINUTOANTERIOR = Number($("#HORA_TOTAL_ANTERIOR_MINUTO").val());

    var HORAMES = Number($("#HORA_MES_HORA").val());
    var HORAMESMINUTO = Number($("#HORA_MES_MINUTO").val());

    var TOTALHORA = Number(((HORAANTERIOR * 60) + MINUTOANTERIOR) + ((HORAMES * 60) + HORAMESMINUTO));

    var NEWHORA = parseInt(TOTALHORA / 60);
    var NEWMINUTO = parseInt(TOTALHORA % 60);

    $('#HORA_ACUMULADO_HORA').val(NEWHORA);
    $('#HORA_ACUMULADO_MINUTO').val(NEWMINUTO);

}
/*
function calculoLimiteMotor() {
    var HORA_LIMITE_OH_HORA = Number($("#HORA_LIMITE_OH_HORA").val());
    var HORA_LIMITE_OH_MINUTO = Number($("#HORA_LIMITE_OH_MINUTO").val());

    var HORA_ULTIMO_OH_HORA = Number($("#HORA_ULTIMO_OH_HORA").val());
    var HORA_ULTIMO_OH_MINUTO = Number($("#HORA_ULTIMO_OH_MINUTO").val());

    var TOTALLIMITE = Number(((HORA_LIMITE_OH_HORA * 60) + HORA_LIMITE_OH_MINUTO) - ((HORA_ULTIMO_OH_HORA * 60) + HORA_ULTIMO_OH_MINUTO));

    var NEWHORA = parseInt(TOTALLIMITE / 60);
    var NEWMINUTO = parseInt(TOTALLIMITE % 60);

    $('#HORA_OPERACION_HORA').val(NEWHORA);
    $('#HORA_OPERACION_MINUTO').val(NEWMINUTO);

}

$('#HORA_TOTAL_ANTERIOR_HORA').blur(function () {
    calculoHoraMotor();
});
$('#HORA_TOTAL_ANTERIOR_MINUTO').blur(function () {
    calculoHoraMotor();
});
$('#HORA_MES_HORA').blur(function () {
    calculoHoraMotor();
});
$('#HORA_MES_MINUTO').blur(function () {
    calculoHoraMotor();
});
$('#HORA_LIMITE_OH_HORA').blur(function () {
    calculoLimiteMotor();
});
$('#HORA_LIMITE_OH_MINUTO').blur(function () {
    calculoLimiteMotor();
});
$('#HORA_ULTIMO_OH_HORA').blur(function () {
    calculoLimiteMotor();
});
$('#HORA_ULTIMO_OH_MINUTO').blur(function () {
    calculoLimiteMotor();
});
*/