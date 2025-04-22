$(document).ready(function () {
    //alert(1);
    //cargaPersonaJuridica();

    $("#FECHA_EXPEDICION").kendoDatePicker();
    $("#FECHA_VIGENCIA").kendoDatePicker();
   // $("#FECHA_VIGENCIA").data("kendoDatePicker").value("");
    
    $("#txtHisProMatricula").toggleDisable();
    $("#XRAZON_ANTERIOR").toggleDisable();

    $("#XPERSONAJURIDICANUEVA").kendoComboBox({
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

    var data = $("#XCAMBIOPROPIETARIOPA").val();


    //var propietario = $("#XPERSONAJURIDICANUEVA").val();
    
    if (data.length > 1) {

        //alert(propietario);

        disabledDivDatosCambioPropietario();

        if ($("#FECHA_VIGENCIA").data("kendoDatePicker").value() == null || $("#FECHA_VIGENCIA").val() == "01/01/1900") {
            $("#FECHA_VIGENCIA").data("kendoDatePicker").value("");
            $("#FECHA_VIGENCIA").val('');
        }
        if ($("#FECHA_EXPEDICION").data("kendoDatePicker").value() == null || $("#FECHA_EXPEDICION").val() == "01/01/1900") {
            $("#FECHA_EXPEDICION").data("kendoDatePicker").value("");
            $("#FECHA_EXPEDICION").val('');
        }
       //cargaPersonaJuridica();
    } else {
        $("#FECHA_VIGENCIA").data("kendoDatePicker").value("");
        $("#FECHA_VIGENCIA").val('');
    }

    
});



function disabledDivDatosCambioPropietario() {
    $("#XPERSONAJURIDICANUEVA").data("kendoComboBox").enable(false);
    $("#ID_TIPO_CAMBIO_PA").toggleDisable();
    $("#NRO_TITULO").toggleDisable();
    $("#DICTAMEN").toggleDisable();
    $("#TOMO").toggleDisable();
    $("#ASIENTO").toggleDisable();
    $("#OBSERVACION").toggleDisable();
    $("#FECHA_EXPEDICION").data("kendoDatePicker").enable(false);
    $("#FECHA_VIGENCIA").data("kendoDatePicker").enable(false);
    $("#btnRegistrarRegPropietarios").hide();
}

function validDatosCambioPropietario() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;
        
    
    if ($("#ID_TIPO_CAMBIO_PA  option:selected").val() == "4") {
        //alert(4);
        //$("#FECHA_VIGENCIA").data("kendoDatePicker").value("");

        if ($("#XPERSONAJURIDICANUEVA").data("kendoComboBox").value() == null || $("#XPERSONAJURIDICANUEVA").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XPERSONAJURIDICANUEVA_listbox"]').parents("span").addClass("valError");
            objData.push({ "XPERSONAJURIDICANUEVA": [{ ErrorMessage: "Debe seleccionar el propietario actual" }] })
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
            $("#divErrorPropietario").html('<strong>No se puede grabar</strong><ul id="ulListaErrorPropietario"></ul>');
            errorAddJS("divErrorPropietario", "ulListaErrorPropietario", objData)
        }
    }
    else{

        if ($("#XPERSONAJURIDICANUEVA").data("kendoComboBox").value() == null || $("#XPERSONAJURIDICANUEVA").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XPERSONAJURIDICANUEVA_listbox"]').parents("span").addClass("valError");
            objData.push({ "XPERSONAJURIDICANUEVA": [{ ErrorMessage: "Debe seleccionar el propietario actual" }] })
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
            objData.push({ "DICTAMEN": [{ ErrorMessage: "Debe ingresar la partida" }] })
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
            $("#divErrorPropietario").html('<strong>No se puede grabar</strong><ul id="ulListaErrorPropietario"></ul>');
            errorAddJS("divErrorPropietario", "ulListaErrorPropietario", objData)
        }
    }

    return flg;
}

$("#btnRegistrarRegPropietarios").bind("click", function () {


    if (validDatosCambioPropietario()) {


        var T_GENM_CAMBIO_PROPIETARIO_PA = {
            ID_CAMBIO_PROPIETARIO_PA: 0,
            ID_PERSONA_JURIDICA_ANTERIOR: 0,
            ID_PERSONA_JURIDICA_NUEVA: 0,
            ID_AERONAVE_PA: 0,
            CONTREGISTRO: 0,
            //ID_TIPO_CAMBIO_PA: 0,
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
            XCAMBIOPROPIETARIOPA: $("#XCAMBIOPROPIETARIOPA").val().trim(),
            XPERSONAJURIDICAANTERIOR: $("#txtPersonaJuridicaAnterior").val().trim(),
            XPERSONAJURIDICANUEVA: $("#XPERSONAJURIDICANUEVA").data("kendoComboBox").value(),
            XAERONAVEPA: $("#txtAeronave").val().trim(),
            XCONTREGISTRO: $("#txtContRegistro").val().trim(),
            ID_TIPO_CAMBIO_PA: $("#ID_TIPO_CAMBIO_PA").val().trim()
            
        }


        console.log(T_GENM_CAMBIO_PROPIETARIO_PA);


       
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/ConsultaCambioAeronavePA/SaveRegistroCambioPropietario',
            type: 'POST',
            data: JSON.stringify({ objCambioPropietario: T_GENM_CAMBIO_PROPIETARIO_PA }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorPropietario", "ulListaErrorPropietario", data.errores);
                } else {
                    console.log(data.newidaeronave);
                    $("#contenedor").modal('hide');
                    //gridHistoricoPropietario();
                    
                    //window.location = "/ConsultaCambioAeronavePA/ConsultaCambioAeronavePA";
                    window.location = "/ConsultaCambioAeronavePA/ListaCambioPropietario" + '?Index=' + data.newidaeronave;
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