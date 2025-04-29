
$(document).ready(function () {

    $("#FECHA_INICIAL").kendoDatePicker();
    $("#FECHA_CERTIFICADO").kendoDatePicker();
    $("#FECHA_CADUCIDAD").kendoDatePicker();
    $("#XRAP").kendoMultiSelect({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value"
    });
    
    $("#XHABILITACION").kendoMultiSelect({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value"
    });
    
    Certificacion = $("#XCERTIFICACION").val().trim();
    if (Certificacion == "") {
        $("#FECHA_INICIAL").val('');
        $("#FECHA_CERTIFICADO").val('');
        $("#FECHA_CADUCIDAD").val('');
    } else {


        if ($("#XFASE").val().trim() == 5) {

            $("#FECHA_CERTIFICADO").removeAttr("disabled");
            $("#NRO_CERTIFICADO").removeAttr("readonly");
            $("#FECHA_CADUCIDAD").removeAttr("disabled");
        } else {
            $("#FECHA_CERTIFICADO").removeAttr("disabled").attr("disabled", "disabled");
            $("#NRO_CERTIFICADO").removeAttr("readonly").attr("readonly", "readonly");
            $("#FECHA_CADUCIDAD").removeAttr("disabled").attr("disabled", "disabled");
        }


        if ($("#XTIPO_USUARIO").val() == "EXTERNO") {
            $("#XGIRO").removeAttr("disabled").attr("disabled", "disabled");
            var multiSelectRap = $("#XRAP").data("kendoMultiSelect");
            multiSelectRap.enable(false);
            var multiSelectHabilitacion = $("#XHABILITACION").data("kendoMultiSelect");
            multiSelectHabilitacion.enable(false);

            $("#XFASE").removeAttr("disabled").attr("disabled", "disabled");
            $("#XESTADO_CERTIFICACION").removeAttr("disabled").attr("disabled", "disabled");
            $("#RESOLUCION_DIRECTORIAL").removeAttr("readonly").attr("readonly", "readonly");
            $("#NRO_CERTIFICADO").removeAttr("readonly").attr("readonly", "readonly");
            $("#FLG_OPSPECS").removeAttr("disabled").attr("disabled", "disabled");
            $("#FECHA_INICIAL").removeAttr("disabled").attr("disabled", "disabled");
            $("#FECHA_CERTIFICADO").removeAttr("disabled").attr("disabled", "disabled");
            $("#FECHA_CADUCIDAD").removeAttr("disabled").attr("disabled", "disabled");
            $("#NOMBRE_BASE_PRINCIPAL").removeAttr("readonly").attr("readonly", "readonly");
            $("#DIRECCION_CERTIFICACION").removeAttr("readonly").attr("readonly", "readonly");

            

        }



        DatosRapsMultiselect();
        DatosHabilitacionMultiselect();
    }

    $("#XFASE").change(function () {
        if ($("#XFASE").val().trim() == 5) {

            $("#FECHA_CERTIFICADO").removeAttr("disabled");
            $("#NRO_CERTIFICADO").removeAttr("readonly");
            $("#FECHA_CADUCIDAD").removeAttr("disabled");
        } else {
            $("#FECHA_CERTIFICADO").removeAttr("disabled").attr("disabled", "disabled");
            $("#NRO_CERTIFICADO").removeAttr("readonly").attr("readonly", "readonly");
            $("#FECHA_CADUCIDAD").removeAttr("disabled").attr("disabled", "disabled");
            $("#FECHA_CERTIFICADO").val('');
            $("#FECHA_CADUCIDAD").val('');
            $("#NRO_CERTIFICADO").val('');
        }
    });


    $("#XGIRO").change(function () {
        var giro = $("#XGIRO option:selected").val();
        var data;
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Certificacion/Rap',
            type: 'POST',
            data: JSON.stringify({ giro: giro }),
            beforeSend: function () {

            },
            success: function (JsonResponse) {
                data = JsonResponse.l_Rap;
                console.log(JsonResponse.l_Rap);
                $("#XRAP").html('');


                /*$("#XRAP").find('option').remove();*/
                var lRap = [];
                $.each(data, function (index, value) {
                    var oRap = {
                        value: value.XRAP,
                        text: value.DESCRIPCION
                    }
                    lRap.push(oRap);
                });

                var multiselect = $("#XRAP").data("kendoMultiSelect");
                multiselect.setDataSource(lRap);

                var multi = $("#XRAP").data("kendoMultiSelect");
                multi.value([]);
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
        });


        var giro = $("#XGIRO option:selected").val();
        var data;
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Certificacion/Habilitacion',
            type: 'POST',
            data: JSON.stringify({ giro: giro }),
            beforeSend: function () {

            },
            success: function (JsonResponse) {
                data = JsonResponse.l_Habilitacion;
                console.log(JsonResponse.l_Habilitacion);
                $("#XHABILITACION").html('');


                /*$("#XRAP").find('option').remove();*/
                var lHabilitacion = [];
                $.each(data, function (index, value) {
                    var oHabilitacion = {
                        value: value.XHABILITACION,
                        text: value.DESCRIPCION
                    }
                    lHabilitacion.push(oHabilitacion);
                });

                var multiselect = $("#XHABILITACION").data("kendoMultiSelect");
                multiselect.setDataSource(lHabilitacion);

                var multi = $("#XHABILITACION").data("kendoMultiSelect");
                multi.value([]);
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
        });





    });

    $("#btnAceptarCertificacion").click(function () {
        bootbox.confirm("¿Desea grabar un nueva Certificación?", function (res) {
            if (validaCertificacion()) {
                if (res) {
                    var lRap = $("#XRAP").data('kendoMultiSelect');
                    var lHabilitacion = $("#XHABILITACION").data('kendoMultiSelect');
                    var KDPFECHA_INICIAL = $("#FECHA_INICIAL").data("kendoDatePicker");
                    var KDPFECHA_CERTIFICADO = $("#FECHA_CERTIFICADO").data("kendoDatePicker");
                    var KDPFECHA_CADUCIDAD = $("#FECHA_CADUCIDAD").data("kendoDatePicker");

                    var FECHA_INICIAL = new Date(1999, 1, 1);
                    var FECHA_CERTIFICADO = new Date(1999, 1, 1);
                    var FECHA_CADUCIDAD = new Date(1999, 1, 1);

                    FECHA_INICIAL = KDPFECHA_INICIAL.value();
                    FECHA_CERTIFICADO = KDPFECHA_CERTIFICADO.value();
                    FECHA_CADUCIDAD = KDPFECHA_CADUCIDAD.value();

                    var oCertificacion = {
                        XCERTIFICACION: $("#XCERTIFICACION").val(),
                        XPERSONA_JURIDICA: $("#XID_PERSONA_JURIDICA").val(),
                        XGIRO: $("#XGIRO").val(),
                        XRAP: $("#XRAP option:selected").val(),
                        XFASE: $("#XFASE").val(),
                        XESTADO_CERTIFICACION: $("#XESTADO_CERTIFICACION").val(),
                        RESOLUCION_DIRECTORIAL: $("#RESOLUCION_DIRECTORIAL").val(),
                        NRO_CERTIFICADO: $("#NRO_CERTIFICADO").val(),
                        FLG_OPSPECS: $('#FLG_OPSPECS').is(':checked') == true ? true : false,
                        FECHA_INICIAL: FECHA_INICIAL,
                        FECHA_CERTIFICADO: FECHA_CERTIFICADO,
                        FECHA_CADUCIDAD: FECHA_CADUCIDAD,
                        DIRECCION_CERTIFICACION: $("#DIRECCION_CERTIFICACION").val(),
                        NOMBRE_BASE_PRINCIPAL: $("#NOMBRE_BASE_PRINCIPAL").val()

                    };

                    var objDataRapAjax = [];
                    $.each(lRap.value(), function (index, value) {
                        var oDataUtil = {
                            XRAP: value
                        }
                        objDataRapAjax.push(oDataUtil);
                    });

                    var objDataHabilitacionAjax = [];
                    $.each(lHabilitacion.value(), function (index, value) {
                        var oDataUtilHab = {
                            XHABILITACION: value
                        }
                        objDataHabilitacionAjax.push(oDataUtilHab);
                    });

                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Certificacion/SaveCertificacion',
                        type: 'POST',
                        data: JSON.stringify({ oCertificacion: oCertificacion, objDataRap: objDataRapAjax, objDatahabilitacion: objDataHabilitacionAjax }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorCertificacion", "ulListaErrorCertificacion", data.errores);
                                desbloqObject();
                            } else {
                                bootbox.alert("El registro de la certificación esta completo!");
                                window.location = data.url;
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                }
            }
        });
    });


    $("#EliminarContacto").click(function () {
        alert("HOla" );
    });

});

function DatosRapsMultiselect() {

    $.ajax({
        datatype: 'json',
        url: '/Certificacion/DatosRaps',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ Id_Certificacion: $("#XCERTIFICACION").val()}),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorCertificacion", "ulListaErrorCertificacion", data.errores);
            } else {
                $("#XRAP").data("kendoMultiSelect").value(data.varDatoRap.split(","));
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}


function DatosHabilitacionMultiselect() {

    $.ajax({
        datatype: 'json',
        url: '/Certificacion/DatosHabilitacion',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ Id_Certificacion: $("#XCERTIFICACION").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorCertificacion", "ulListaErrorCertificacion", data.errores);
            } else {
                $("#XHABILITACION").data("kendoMultiSelect").value(data.varDatoHabilitacion.split(","));
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}



function validaCertificacion() {
    var objData = [];
    var flg = true;
    var lRap = $("#XRAP").data('kendoMultiSelect');

    var FechaInicial = isDate($("#FECHA_INICIAL").val());
    var FechaCertificado = isDate($("#FECHA_CERTIFICADO").val());
    var FechaCaducidad = isDate($("#FECHA_CADUCIDAD").val());

    if ($("#XGIRO").val().trim() == "") {
        flg = false;
        objData.push({ "XGIRO": [{ ErrorMessage: "Debe seleccionar el Giro" }] })
    }
    if (lRap.value().length == 0) {
        flg = false;
        objData.push({ "XRAP": [{ ErrorMessage: "Debe Seleccionar una Rap como mínimo" }] })
    }
    if ($("#XFASE").val().trim() == "") {
        flg = false;
        objData.push({ "XFASE": [{ ErrorMessage: "Debe seleccionar la Fase" }] })
    }
    if ($("#XESTADO_CERTIFICACION").val().trim() == "") {
        flg = false;
        objData.push({ "XESTADO_CERTIFICACION": [{ ErrorMessage: "Debe seleccionar el Estado" }] })
    }/*
    if ($("#RESOLUCION_DIRECTORIAL").val().trim() == "") {
        flg = false;
        objData.push({ "RESOLUCION_DIRECTORIAL": [{ ErrorMessage: "Debe Ingresar la Resolución Directorial" }] })
    }*/
    if (FechaInicial == false) {
        flg = false;
        objData.push({ "FECHA_INICIAL": [{ ErrorMessage: "Debe ingresar una Fecha Inicial Valida" }] })
    }
    if ($("#XFASE").val().trim() == "5") {
        if ($("#NRO_CERTIFICADO").val().trim() == "") {
            flg = false;
            objData.push({ "NRO_CERTIFICADO": [{ ErrorMessage: "Debe Ingresar el Nro. de Certificado" }] })
        }

        if (FechaCertificado == false) {
            flg = false;
            objData.push({ "FECHA_CERTIFICADO": [{ ErrorMessage: "Debe ingresar una Fecha Certificado Valida" }] })
        }

        /*if (FechaCaducidad == false) {
            flg = false;
            objData.push({ "FECHA_CADUCIDAD": [{ ErrorMessage: "Debe ingresar una Fecha Caducidad Valida" }] })
        }*/

        if (validate_fechaMayorQue($("#FECHA_INICIAL").val(), $("#FECHA_CERTIFICADO").val()) == 0) {
            flg = false;
            objData.push({ "FECHA_INICIAL": [{ ErrorMessage: "La Fecha Inicial debe ser menor que la Fecha de Certificación" }] })
        }
        /*
        if (validate_fechaMayorQue($("#FECHA_INICIAL").val(), $("#FECHA_CADUCIDAD").val()) == 0) {
            flg = false;
            objData.push({ "FECHA_INICIAL": [{ ErrorMessage: "La Fecha Inicial debe ser menor que la Fecha de Caducidad" }] })
        }
        
        if (validate_fechaMayorQue($("#FECHA_CERTIFICADO").val(), $("#FECHA_CADUCIDAD").val()) == 0) {
            
            flg = false;
            objData.push({ "FECHA_CERTIFICADO": [{ ErrorMessage: "La Fecha de Certificado debe ser menor que la Fecha de Caducidad" }] })
        }*/
        
    }
    


    if (flg) {
        $("#divErrorCertificacion").hide();
    }
    else {
        $("#divErrorCertificacion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorCertificacion"></ul>');
        errorAddJS("divErrorCertificacion", "ulListaErrorCertificacion", objData)
    }
    return flg;
}



