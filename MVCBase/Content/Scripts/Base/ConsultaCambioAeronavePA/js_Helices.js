$(document).ready(function () {

    
    $("#FECHA_DOCUMENTO").kendoDatePicker();
    $("#FECHA_CAMBIO_HELICE").kendoDatePicker();

    $("#txtHisHelMatricula").toggleDisable();
    $("#NUMERO_SERIE_ANTERIOR").toggleDisable();

    var data = $("#XCAMBIOHELICEPA").val();
    if (data.length > 1) {
        
        disabledDivDatosCambioHelice();
        if ($("#FECHA_CAMBIO_HELICE").data("kendoDatePicker").value() == null || $("#FECHA_CAMBIO_HELICE").val() == "01/01/1900") {
            $("#FECHA_CAMBIO_HELICE").data("kendoDatePicker").value("");
            $("#FECHA_CAMBIO_HELICE").val('');
        }
        if ($("#FECHA_DOCUMENTO").data("kendoDatePicker").value() == null || $("#FECHA_DOCUMENTO").val() == "01/01/1900") {
            $("#FECHA_DOCUMENTO").data("kendoDatePicker").value("");
            $("#FECHA_DOCUMENTO").val('');
        }
        //ca
    }
    else {
        $("#FECHA_CAMBIO_HELICE").data("kendoDatePicker").value("");
        $("#FECHA_CAMBIO_HELICE").val('');
    }
    

});

$("#btnCancelarDatosHelices").click(function () {
    $("#contenedorModalNewHelice").modal('hide');
});
$("#closeDatosHelices").click(function () {
    $("#contenedorModalNewHelice").modal('hide');
});

function disabledDivDatosCambioHelice() {
    $("#NUMERO_SERIE_NUEVO").toggleDisable();
    $("#DOCUMENTO_CAMBIO").toggleDisable();
    $("#OBSERVACION").toggleDisable();
    $("#FECHA_DOCUMENTO").data("kendoDatePicker").enable(false);
    $("#FECHA_CAMBIO_HELICE").data("kendoDatePicker").enable(false);
    $("#btnRegistrarRegHelice").hide();
}

function validDatosCambioHelice() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;


    if ($("#NUMERO_SERIE_NUEVO").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE_NUEVO": [{ ErrorMessage: "Debe ingresar el nuevo número de serie" }] })
    }
    if ($("#DOCUMENTO_CAMBIO").val().trim() == "") {
        flg = false;
        objData.push({ "DOCUMENTO_CAMBIO": [{ ErrorMessage: "Debe ingresar el documento de cambio" }] })
    }
    if ($("#FECHA_DOCUMENTO").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_DOCUMENTO").parents("span").addClass("valError");
        objData.push({ "FECHA_DOCUMENTO": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de documento" }] })
    }
    /*if ($("#FECHA_CAMBIO_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_CAMBIO_HELICE").parents("span").addClass("valError");
        objData.push({ "FECHA_CAMBIO_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de cambio de helice" }] })
    }*/
    if ($("#FECHA_CAMBIO_HELICE").val().trim() != "" && $("#FECHA_CAMBIO_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_CAMBIO_HELICE").parents("span").addClass("valError");
        objData.push({ "FECHA_CAMBIO_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de cambio de helice" }] })
    }
    if ($("#OBSERVACION").val().trim() == "") {
        flg = false;
        objData.push({ "OBSERVACION": [{ ErrorMessage: "Debe ingresar la observacion" }] })
    }    
    if (flg) {
        $("#divErrorHelice").hide();
    }
    else {
        $("#divErrorHelice").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelice"></ul>');
        errorAddJS("divErrorHelice", "ulListaErrorHelice", objData)
    }

    return flg;
}

$("#btnRegistrarRegHelice").bind("click", function () {


    if (validDatosCambioHelice()) {


        var T_GENM_CAMBIO_HELICE_PA = {
            ID_CAMBIO_HELICE_PA: 0,
            ID_AERONAVE_PA: 0,
            CONTREGISTRO: 0,
            ID_HELICES_PA: 0,            
            NUMERO_SERIE_ANTERIOR: $.trim($("#NUMERO_SERIE_ANTERIOR").val()),
            NUMERO_SERIE_NUEVO: $.trim($("#NUMERO_SERIE_NUEVO").val()),
            DOCUMENTO_CAMBIO: $("#DOCUMENTO_CAMBIO").val(),
            OBSERVACION: $("#OBSERVACION").val(),
            FECHA_DOCUMENTO: $("#FECHA_DOCUMENTO").val(),
            XFECHA_CAMBIO_HELICE: $("#FECHA_CAMBIO_HELICE").val(),
            FLG_ESTADO: null,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XCAMBIOHELICEPA: $("#XCAMBIOHELICEPA").val().trim(),
            XAERONAVEPA: $("#txtAeronave").val().trim(),
            XCONTREGISTRO: $("#txtContRegistro").val().trim(),
            XHELICESPA: $("#txtIdHelicesPA").val().trim(),
            XITEM: $("#XITEM").val().trim()

        }


        console.log(T_GENM_CAMBIO_HELICE_PA);

        
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/ConsultaCambioAeronavePA/SaveRegistroCambioHelice',
            type: 'POST',
            data: JSON.stringify({ objCambioHelice: T_GENM_CAMBIO_HELICE_PA }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorHelice", "ulListaErrorHelice", data.errores);
                } else {
                    //console.log(data.newcontregistro);

                    $("#contenedorModalNewHelice").modal('hide');
                    
                    //var divModal = $(this).attr('data-div');
                    //var seccionModal = ".seccionModal";
                    //if (divModal) {
                    //    seccionModal = "#" + divModal;
                    //}
                    //$(seccionModal).html(data.newcontregistro);
                    
                    
                    //gridHistoricoHelice();
        
                    
                    window.location = "/ConsultaCambioAeronavePA/ListaCambioHelice" + '?Index=' + data.newidaeronave;
                   
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