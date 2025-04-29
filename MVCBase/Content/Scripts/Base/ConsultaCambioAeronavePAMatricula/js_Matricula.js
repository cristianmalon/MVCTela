$(document).ready(function () {
    //alert(1);


    $("#FECHA_EXPEDICION").kendoDatePicker();
    $("#FECHA_VIGENCIA").kendoDatePicker();
    //$("#FECHA_VIGENCIA").data("kendoDatePicker").value("");

    $("#MATRICULA_ANTERIOR").toggleDisable();
  


    
    var data = $("#XCAMBIO_MATRICULA_PA").val();



    if (data.length > 1) {
        disabledDivDatosCambioMatricula();

        if ($("#FECHA_VIGENCIA").data("kendoDatePicker").value() == null || $("#FECHA_VIGENCIA").val() == "01/01/1900") {
            $("#FECHA_VIGENCIA").data("kendoDatePicker").value("");
            $("#FECHA_VIGENCIA").val('');
        }
        if ($("#FECHA_EXPEDICION").data("kendoDatePicker").value() == null || $("#FECHA_EXPEDICION").val() == "01/01/1900") {
            $("#FECHA_EXPEDICION").data("kendoDatePicker").value("");
            $("#FECHA_EXPEDICION").val('');
        }


    } else {
        $("#FECHA_VIGENCIA").data("kendoDatePicker").value("");
        $("#FECHA_VIGENCIA").val('');
    }
    
});

function disabledDivDatosCambioMatricula() {
    
    $("#MATRICULA_NUEVA").toggleDisable();
    $("#ID_TIPO_CAMBIO_PA").toggleDisable();
    $("#XTIPOCAMBIOMATRICULAPA").toggleDisable();
    $("#NRO_TITULO").toggleDisable();
    $("#DICTAMEN").toggleDisable();
    $("#TOMO").toggleDisable();
    $("#ASIENTO").toggleDisable();
    $("#OBSERVACION").toggleDisable();
    $("#FECHA_EXPEDICION").data("kendoDatePicker").enable(false);
    $("#FECHA_VIGENCIA").data("kendoDatePicker").enable(false);
    $("#btnRegistrarRegMatricula").hide();
}

function validDatosCambioMatricula() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#ID_TIPO_CAMBIO_PA  option:selected").val() == "4") {

        if ($("#XTIPOCAMBIOMATRICULAPA  option:selected").val() == "") {
            flg = false;
            objData.push({ "XTIPOCAMBIOMATRICULAPA": [{ ErrorMessage: "Debe seleccionar la modalidad de cambio" }] })
        }
        if ($("#MATRICULA_NUEVA").val().trim() == "") {
            flg = false;
            objData.push({ "MATRICULA_NUEVA": [{ ErrorMessage: "Debe registrar la matricula actual" }] })
        }
        if ($("#ID_TIPO_CAMBIO_PA  option:selected").val() == "") {
            flg = false;
            objData.push({ "ID_TIPO_CAMBIO_PA": [{ ErrorMessage: "Debe seleccionar el documento de inscripción" }] })
        }
        if ($("#NRO_TITULO").val().trim() == "") {
            flg = false;
            objData.push({ "NRO_TITULO": [{ ErrorMessage: "Debe ingresar el número de título" }] })
        }
        if ($("#FECHA_EXPEDICION").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#FECHA_EXPEDICION").parents("span").addClass("valError");
            objData.push({ "FECHA_EXPEDICION": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de inspección" }] })
        }
        if ($("#FECHA_VIGENCIA").val().trim() != "" && $("#FECHA_VIGENCIA").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#FECHA_VIGENCIA").parents("span").addClass("valError");
            objData.push({ "FECHA_VIGENCIA": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de vigencia" }] })
        }
        if ($("#OBSERVACION").val().trim() == "") {
            flg = false;
            objData.push({ "OBSERVACION": [{ ErrorMessage: "Debe ingresar una observación" }] })
        }
        if (flg) {
            $("#divErrorPropietario").hide();
        }
        else {
            $("#divErrorMatricula").html('<strong>No se puede grabar</strong><ul id="ulListaErrorMatricula"></ul>');
            errorAddJS("divErrorMatricula", "ulListaErrorMatricula", objData)
        }
    }
    else {
        if ($("#XTIPOCAMBIOMATRICULAPA  option:selected").val() == "") {
            flg = false;
            objData.push({ "XTIPOCAMBIOMATRICULAPA": [{ ErrorMessage: "Debe seleccionar la modalidad de cambio" }] })
        }
        if ($("#MATRICULA_NUEVA").val().trim() == "") {
            flg = false;
            objData.push({ "MATRICULA_NUEVA": [{ ErrorMessage: "Debe registrar la matricula actual" }] })
        }
        if ($("#ID_TIPO_CAMBIO_PA  option:selected").val() == "") {
            flg = false;
            objData.push({ "ID_TIPO_CAMBIO_PA": [{ ErrorMessage: "Debe seleccionar el documento de inscripción" }] })
        }
        if ($("#NRO_TITULO").val().trim() == "") {
            flg = false;
            objData.push({ "NRO_TITULO": [{ ErrorMessage: "Debe ingresar el número de título" }] })
        }
        if ($("#DICTAMEN").val().trim() == "") {
            flg = false;
            objData.push({ "DICTAMEN": [{ ErrorMessage: "Debe ingresar el dictamen" }] })
        }
        if ($("#FECHA_EXPEDICION").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#FECHA_EXPEDICION").parents("span").addClass("valError");
            objData.push({ "FECHA_EXPEDICION": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de inspección" }] })
        }
        if ($("#TOMO").val().trim() == "") {
            flg = false;
            objData.push({ "TOMO": [{ ErrorMessage: "Debe ingresar el tomo" }] })
        }
        if ($("#FECHA_VIGENCIA").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#FECHA_VIGENCIA").parents("span").addClass("valError");
            objData.push({ "FECHA_VIGENCIA": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de vigencia" }] })
        }
        if ($("#ASIENTO").val().trim() == "") {
            flg = false;
            objData.push({ "ASIENTO": [{ ErrorMessage: "Debe ingresar el asiento" }] })
        }
        if ($("#OBSERVACION").val().trim() == "") {
            flg = false;
            objData.push({ "OBSERVACION": [{ ErrorMessage: "Debe ingresar una observación" }] })
        }
        if (flg) {
            $("#divErrorPropietario").hide();
        }
        else {
            $("#divErrorMatricula").html('<strong>No se puede grabar</strong><ul id="ulListaErrorMatricula"></ul>');
            errorAddJS("divErrorMatricula", "ulListaErrorMatricula", objData)
        }
    }
    return flg;
}

$("#btnRegistrarRegMatricula").bind("click", function () {


    if (validDatosCambioMatricula()) {


        var T_GENM_CAMBIO_MATRICULA_PA = {
            ID_CAMBIO_PROPIETARIO_PA: 0,            
            MATRICULA_ANTERIOR: $("#MATRICULA_ANTERIOR").val().trim(),
            MATRICULA_NUEVA: $("#MATRICULA_NUEVA").val().trim(),
            ID_AERONAVE_PA: 0,
            CONTREGISTRO: 0,
            //ID_TIPO_CAMBIO_PA: 0,
            ID_TIPO_CAMBIO_MATRICULA_PA: 0,
            DICTAMEN: $("#DICTAMEN").val().trim(),
            NRO_TITULO: $("#NRO_TITULO").val().trim(),
            ASIENTO: $("#ASIENTO").val(),
            TOMO: $("#TOMO").val(),
            OBSERVACION: $("#OBSERVACION").val(),
            FECHA_EXPEDICION: $("#FECHA_EXPEDICION").val(),
            XFECHA_VIGENCIA: $("#FECHA_VIGENCIA").val(),
            FLG_ESTADO: null,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XCAMBIO_MATRICULA_PA: $("#XCAMBIO_MATRICULA_PA").val().trim(),
            XAERONAVEPA: $("#txtAeronave").val().trim(),
            XCONTREGISTRO: $("#txtContRegistro").val().trim(),
            ID_TIPO_CAMBIO_PA: $("#ID_TIPO_CAMBIO_PA").val().trim(),
            XTIPOCAMBIOMATRICULAPA: $("#XTIPOCAMBIOMATRICULAPA").val().trim()

        }


        console.log(T_GENM_CAMBIO_MATRICULA_PA);


        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/ConsultaCambioAeronavePAMatricula/SaveRegistroCambioMatricula',
            type: 'POST',
            data: JSON.stringify({ objCambioMatricula: T_GENM_CAMBIO_MATRICULA_PA }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorMatricula", "ulListaErrorMatricula", data.errores);
                } else {
                    console.log(data.newidaeronave);
                    $("#contenedor").modal('hide');
                    //gridHistoricoMatricula();

                    //window.location = "/ConsultaCambioAeronavePA/ConsultaCambioAeronavePA";
                    window.location = "/ConsultaCambioAeronavePAMatricula/ListaCambioMatricula" + '?Index=' + data.newidaeronave;
                    //window.location = window.location;
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