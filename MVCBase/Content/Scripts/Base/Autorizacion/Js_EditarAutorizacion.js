$(document).ready(function () {


    $("#FECHA_CERTIFICADO").prop("readonly", true);

    $("#FECHA_INICIO").css({ "width": "100%", "height": "auto" }).kendoDatePicker();
    $("#FECHA_CADUCIDAD").css({ "width": "100%", "height": "auto" }).kendoDatePicker();
    $("#FECHA_RESOLUCION").css({ "width": "100%", "height": "auto" }).kendoDatePicker();
    $("#FECHA_PUBLICACION_PERUANO").css({ "width": "100%", "height": "auto" }).kendoDatePicker();
    $("#txtFecInicioAmp").css({ "width": "100%", "height": "auto" }).kendoDatePicker();
    $("#txtFecFinAmp").css({ "width": "100%", "height": "auto" }).kendoDatePicker();
    $("#txtFecResoluc").css({ "width": "100%", "height": "auto" }).kendoDatePicker();
    $("#txtFecha_Pub_Peruano").css({ "width": "100%", "height": "auto" }).kendoDatePicker();

    $("#XTIPO_ACTIVIDAD").css({ "width": "100%", "height": "auto" }).kendoMultiSelect({
        dataTextField: "text",
        dataValueField: "value"
    });

    var Autorizacion = $("#XAUTORIZACION").val().trim();


    if (Autorizacion == "") {
        $("#FECHA_INICIO").val('');
        $("#FECHA_CADUCIDAD").val('');
        $("#FECHA_RESOLUCION").val('');
        $("#FECHA_PUBLICACION_PERUANO").val('');

        DatosAutorizacion();
        $("#divFlgAmpliacion").hide();
        $("#divgridAmpliacion").hide();
    } else {
        //alert($("#XTIPO_USUARIO").val());
        DatosMultiselect();

        if ($("#XTIPO_USUARIO").val() == "EXTERNO") {

            $("#XTIPO_AUTORIZACION_ORIGEN").removeAttr("disabled").attr("disabled", "disabled");
            $("#XTIPO_AUTORIZACION").removeAttr("disabled").attr("disabled", "disabled");
            $("#XESTADO_AUTO_CERT").removeAttr("disabled").attr("disabled", "disabled");
            $("#FECHA_INICIO").removeAttr("disabled").attr("disabled", "disabled");
            $("#FECHA_CADUCIDAD").removeAttr("disabled").attr("disabled", "disabled");
            $("#FECHA_RESOLUCION").removeAttr("disabled").attr("disabled", "disabled");
            $("#NUMERO_PVI").removeAttr("readonly").attr("readonly", "readonly");
            $("#RESOLUCION_DIRECTORIAL").removeAttr("readonly").attr("readonly", "readonly");
            $("#FECHA_PUBLICACION_PERUANO").removeAttr("disabled").attr("disabled", "disabled");
            $("#DIRECCION_AUTORIZACION").removeAttr("readonly").attr("readonly", "readonly");
            $("#NOMBRE_BASE_PRINCIPAL").removeAttr("readonly").attr("readonly", "readonly");
            $("#FLG_AMPLIACION").removeAttr("disabled").attr("disabled", "disabled");
            $("#XTIPO_ACTIVIDAD").removeAttr("disabled").attr("disabled", "disabled");
        }

        





        var tipo = $("#TIPO").val();
        


        if (tipo == "1") {
            DatosOperacion();
            $("#divFlgAmpliacion").hide();
            $("#divgridAmpliacion").hide();
        } else if (tipo == "2") {
            DatosAutorizacion();
            $("#divFlgAmpliacion").hide();
            $("#divgridAmpliacion").hide();
        } else if (tipo = "3") {
            DatosVuelo();

            $("#divFlgAmpliacion").show();
            if ($("#FLG_AMPLIACION").is(':checked')) {
                CargarListaAmpliacion();
                $("#divgridAmpliacion").show();
            } else {
                $("#divgridAmpliacion").hide();
            }

        }
    }

    $("#CancelarAutorizacion").click(function (e) {
        $("#contenedorModalAutorizacion").modal('hide');
    });

    $("#btnAceptarAmpliacion").click(function (e) {
        $("#modalAmpliacion").modal('show');
        $("#txtFecInicioAmp").val('');
        $("#txtFecFinAmp").val('');
        $("#txtFecResoluc").val('');
        $("#txtFecha_Pub_Peruano").val('');
    });

    $("#btnRegistroModalAmpliacion").click(function (e) {
        GuardarAmpliacion();
    });

    $("#FLG_AMPLIACION").change(function() {
        if (this.checked) {
            gridListaAmpliacion('');
            $("#divgridAmpliacion").show();
            $("#btnAceptarAmpliacion").show();
        } else {
            $("#divgridAmpliacion").hide();
            $("#btnAceptarAmpliacion").hide();
        }
    });

    

    $("#XTIPO_AUTORIZACION_ORIGEN").change(function () {

        if ($("#XTIPO_AUTORIZACION_ORIGEN").val() == "") {
            $("#XTIPO_AUTORIZACION").find('option').remove();
            $('#XTIPO_AUTORIZACION').append($('<option>', {
                value: '',
                text: '[SELECCIONE]'
            }));

        } else {
        var autorizacion = $("#XTIPO_AUTORIZACION_ORIGEN option:selected").val();
        var data;
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Autorizacion/TipoAutorizacion',
            type: 'POST',
            data: JSON.stringify({ Tipo_Autorizacion: autorizacion }),
            beforeSend: function () {
                //bloquoteModal('frmModAeropuerto');
            },
            success: function (JsonResponse) {
                //desbloqModal('frmModAeropuerto');
                data = JsonResponse.l_Tipo_Autorizacion;
                tipo = JsonResponse.tipo;

                $("#XTIPO_AUTORIZACION").find('option').remove();
                $('#XTIPO_AUTORIZACION').append($('<option>', {
                    value: '',
                    text: '[SELECCIONE]'
                }));
                $.each(data, function (index, value) {
                    $('#XTIPO_AUTORIZACION').append($('<option>', {
                        value: value.XTIPO_AUTORIZACION,
                        text: value.DESCRIPCION
                    }));
                });
                $("#TIPO").val(tipo);
                if (tipo == "1") {
                    DatosOperacion();
                }else if (tipo == "2"){                    
                    DatosAutorizacion();
                } else if (tipo = "3") {                    
                    DatosVuelo();
                }



            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
        });
        }
    });


    $("#XTIPO_AUTORIZACION").change(function () {
        var Id_TipoAutorizacion = $("#XTIPO_AUTORIZACION option:selected").val();
        var data;
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Autorizacion/TipoActividad',
            type: 'POST',
            data: JSON.stringify({ Id_TipoAutorizacion: Id_TipoAutorizacion }),
            beforeSend: function () {

            },
            success: function (JsonResponse) {
                data = JsonResponse.l_TipoActividad;
                console.log(JsonResponse.l_TipoActividad);
                $("#XTIPO_ACTIVIDAD").html('');


                /*$("#XRAP").find('option').remove();*/
                var lTipoActividad = [];
                $.each(data, function (index, value) {
                    var oTipoActividad = {
                        value: value.XID_TIPO_ACTIVIDAD_AUTORIZAC,
                        text: value.DESCRIPCION
                    }
                    lTipoActividad.push(oTipoActividad);
                });

                var multiselect = $("#XTIPO_ACTIVIDAD").data("kendoMultiSelect");
                multiselect.setDataSource(lTipoActividad);

                var multi = $("#XTIPO_ACTIVIDAD").data("kendoMultiSelect");
                multi.value([]);
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
        });
        
    });
   
    $("#btnAceptar").click(function () {

        bootbox.confirm("¿Desea grabar a la nueva Autorización?", function (res) {
            if (validaAutorizacion()) {
                if (res) {
                    var lTipoActividad = $("#XTIPO_ACTIVIDAD").data('kendoMultiSelect');
                    var KDPFECHA_INICIO = $("#FECHA_INICIO").data("kendoDatePicker");
                    var KDPFECHA_CADUCIDAD = $("#FECHA_CADUCIDAD").data("kendoDatePicker");
                    var KDPFECHA_RESOLUCION = $("#FECHA_RESOLUCION").data("kendoDatePicker");
                    var KDPFECHA_PUBLICACION = $("#FECHA_PUBLICACION_PERUANO").data("kendoDatePicker");
                    var FECHA_INICIO = new Date(1999, 1, 1);
                    var FECHA_CADUCIDAD = new Date(1999, 1, 1);
                    var FECHA_RESOLUCION = new Date(1999, 1, 1);
                    var FECHA_PUBLICACION = new Date(1999, 1, 1);

                    FECHA_INICIO = KDPFECHA_INICIO.value();
                    FECHA_CADUCIDAD = KDPFECHA_CADUCIDAD.value();
                    FECHA_RESOLUCION = KDPFECHA_RESOLUCION.value();
                    FECHA_PUBLICACION = KDPFECHA_PUBLICACION.value();

                    


                    if ($("#XNACIONALIDAD").val() == "1") {
                        var direc_auto = $("#DIRECCION_AUTORIZACION").val();
                        var nom_bas = $("#NOMBRE_BASE_PRINCIPAL").val();
                    } else {
                        var direc_auto = " ";
                        var nom_bas = " ";
                    }


                    var oAutorizacion = {
                        XAUTORIZACION: $("#XAUTORIZACION").val(),
                        XPERSONA_JURIDICA: $("#XID_PERSONA_JURIDICA").val(),
                        XNACIONALIDAD: $("#XNACIONALIDAD").val(),
                        XTIPO_AUTORIZACION_ORIGEN: $("#XTIPO_AUTORIZACION_ORIGEN").val(),
                        XTIPO_AUTORIZACION: $("#XTIPO_AUTORIZACION").val(),
                        XESTADO_AUTO_CERT: $("#XESTADO_AUTO_CERT").val(),
                        FECHA_INICIO: FECHA_INICIO,
                        FECHA_CADUCIDAD: FECHA_CADUCIDAD,
                        FECHA_RESOLUCION: FECHA_RESOLUCION,
                        FECHA_PUBLICACION_PERUANO : FECHA_PUBLICACION,
                        NUMERO_PVI: $("#NUMERO_PVI").val(),
                        RESOLUCION_DIRECTORIAL: $("#RESOLUCION_DIRECTORIAL").val(),
                        DIRECCION_AUTORIZACION: direc_auto,
                        NOMBRE_BASE_PRINCIPAL: nom_bas,
                        FLG_AMPLIACION: $('#FLG_AMPLIACION').is(':checked') == true ? true : false

                    };

                    var objDataTipoActAjax = [];
                    $.each(lTipoActividad.value(), function (index, value) {
                        var oDataUtil = {
                            XID_TIPO_ACTIVIDAD_AUTORIZAC: value
                        }
                        objDataTipoActAjax.push(oDataUtil);
                    });

                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Autorizacion/SaveAutorizacion',
                        type: 'POST',
                        data: JSON.stringify({ oAutorizacion: oAutorizacion, objTipoactividad: objDataTipoActAjax }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorAutorizacion", "ulListaErrorAutorizacion", data.errores);
                                desbloqObject();
                            } else {
                                //bootbox.alert("El registro de la autorización esta completo!");
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
});


function DatosOperacion() {
    $("#divNumeroPVI").hide();
    $("#divNumeroPVI").val('');
    $("#divFechaResolucion").show();
    $("#divPublicacionPeruano").show()
    $("#divresolucionDirectorial").show();
    $("#lblFechaResolucion").text("Fecha Resolución");
}

function DatosVuelo() {
    $("#divPublicacionPeruano").hide();
    $("#divPublicacionPeruano").val('');
    $("#divresolucionDirectorial").hide();
    $("#divresolucionDirectorial").val('');
    $("#divNumeroPVI").show();
    $("#divFechaResolucion").show();
    $("#lblFechaResolucion").text("Fecha Expedición");
}

function DatosAutorizacion() {
    $("#divNumeroPVI").hide();
    $("#divNumeroPVI").val('');
    $("#divFechaResolucion").hide();
    $("#divFechaResolucion").val('');
    $("#divPublicacionPeruano").hide();
    $("#divPublicacionPeruano").val('');
    $("#divresolucionDirectorial").show();
}


function GuardarAmpliacion() {
    var KDPFECHA_INICIO = $("#txtFecInicioAmp").data("kendoDatePicker");
    var KDPFECHA_CADUCIDAD = $("#txtFecFinAmp").data("kendoDatePicker");
    var KDPFECHA_PERUANO = $("#txtFecha_Pub_Peruano").data("kendoDatePicker");
    var KDPFECHA_RESOLUCION = $("#txtFecResoluc").data("kendoDatePicker");
    var FECHA_INICIO = new Date(1999, 1, 1);
    var FECHA_CADUCIDAD = new Date(1999, 1, 1);
    var FECHA_PERUANO = new Date(1999, 1, 1);
    var FECHA_RESOLUCION = new Date(1999, 1, 1);


    FECHA_INICIO = KDPFECHA_INICIO.value();
    FECHA_CADUCIDAD = KDPFECHA_CADUCIDAD.value();
    FECHA_PERUANO = KDPFECHA_PERUANO.value();
    FECHA_RESOLUCION = KDPFECHA_RESOLUCION.value();
    
    var oAmpliacion = {
        XAUTORIZACION: $("#XAUTORIZACION").val(),
        FECHA_INICIO: FECHA_INICIO,
        FECHA_FIN: FECHA_CADUCIDAD,
        RESOLUCION_DIRECTORIAL: $("#txtResolucion_Direc").val(),
        FECHA_RESOLUCION: FECHA_RESOLUCION,
        FECHA_PUBLICACION_PERUANO :FECHA_PERUANO

    };
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Autorizacion/SaveAmpliacion',
        type: 'POST',
        data: JSON.stringify({ oAmpliacion: oAmpliacion }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);
            if (!data.rpta) {
                errorAddModelo("divErrorAmpliacion", "ulListaErrorAmpliacion", data.errores);
                desbloqObject();
            } else {
                CargarListaAmpliacion();
                $("#modalAmpliacion").modal('hide');
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });
}


function validaAutorizacion() {
    var objData = [];
    var flg = true;

    var FechaInicio = isDate($("#FECHA_INICIO").val());
    var FechaCaducidad = isDate($("#FECHA_CADUCIDAD").val());
    var FechaResolucion = isDate($("#FECHA_RESOLUCION").val());
    var Fecha_Publicacion = isDate($("#FECHA_PUBLICACION_PERUANO").val());


    if ($("#XTIPO_AUTORIZACION_ORIGEN").val().trim() == "") {
        flg = false;
        objData.push({ "XTIPO_AUTORIZACION_ORIGEN": [{ ErrorMessage: "Debe seleccionar la Autorización" }] })
    }
    if ($("#XTIPO_AUTORIZACION").val().trim() == "") {
        flg = false;
        objData.push({ "XTIPO_AUTORIZACION": [{ ErrorMessage: "Debe seleccionar el Tipo Autorización" }] })
    }
    if ($("#XESTADO_AUTO_CERT").val().trim() == "") {
        flg = false;
        objData.push({ "XESTADO_AUTO_CERT": [{ ErrorMessage: "Debe seleccionar el Estado" }] })
    }


    if($("#XESTADO_AUTO_CERT option:selected").text().trim() == "EN PROCESO"){


    } else {
                    if (FechaInicio == false) {
                        flg = false;
                        $("#FECHA_INICIO").parents("span").addClass("valError");
                        objData.push({ "FECHA_INICIO": [{ ErrorMessage: "Debe ingresar una Fecha Inicio Valida" }] })
                    }
                    if (FechaCaducidad == false) {
                        flg = false;
                        $("#FECHA_CADUCIDAD").parents("span").addClass("valError");
                        objData.push({ "FECHA_CADUCIDAD": [{ ErrorMessage: "Debe ingresar una Fecha Caducidad Valida" }] })
                    }
                    if (validate_fechaMayorQue($("#FECHA_INICIO").val(), $("#FECHA_CADUCIDAD").val()) == 0) {
                        flag = false;
                        $("#FECHA_INICIO").parents("span").addClass("valError");
                        objData.push({ "FECHA_INICIO": [{ ErrorMessage: "La Fecha de Inicio debe ser menor que la Fecha de Caducidad" }] })
                    }
                }

    //operaciones
    if($("#TIPO").val() == 1){
        if ($("#RESOLUCION_DIRECTORIAL").val().trim() == "") {
            flg = false;
            objData.push({ "RESOLUCION_DIRECTORIAL": [{ ErrorMessage: "Debe Ingresar la Resolución Directorial" }] })
        }
        if (FechaResolucion == false) {
            flg = false;
            $("#FECHA_RESOLUCION").parents("span").addClass("valError");
            objData.push({ "FECHA_RESOLUCION": [{ ErrorMessage: "Debe ingresar una Fecha Resolución Valida" }] })
        }
        if (Fecha_Publicacion == false) {
            flg = false;
            $("#FECHA_PUBLICACION_PERUANO").parents("span").addClass("valError");
            objData.push({ "FECHA_PUBLICACION_PERUANO": [{ ErrorMessage: "Debe ingresar una Fecha de Publicacion Valida" }] })
        }
        //autorizaciones
    }else if($("#TIPO").val() == 2){
        if ($("#RESOLUCION_DIRECTORIAL").val().trim() == "") {
            flg = false;
            objData.push({ "RESOLUCION_DIRECTORIAL": [{ ErrorMessage: "Debe Ingresar la Resolución Directorial" }] })
        }
        //permiso vuelo
    } else if ($("#TIPO").val() == 3) {
        if ($("#NUMERO_PVI").val().trim() == "") {
            flg = false;
            objData.push({ "NUMERO_PVI": [{ ErrorMessage: "Debe Ingresar el número de permiso de vuelo" }] })
        }
        if (FechaResolucion == false) {
            flg = false;
            $("#FECHA_RESOLUCION").parents("span").addClass("valError");
            objData.push({ "FECHA_RESOLUCION": [{ ErrorMessage: "Debe ingresar una Fecha Expedición Valida" }] })
        }
    }

    /*
    if ($("#RESOLUCION_DIRECTORIAL").val().trim() == "") {
        flg = false;
        objData.push({ "RESOLUCION_DIRECTORIAL": [{ ErrorMessage: "Debe Ingresar la Resolución Directorial" }] })
    }*/

    /*
    if ($("#NOMBRE_BASE_PRINCIPAL").val().trim() == "") {
        flg = false;
        objData.push({ "NOMBRE_BASE_PRINCIPAL": [{ ErrorMessage: "Debe Ingresar la Nombre Base" }] })
    }
    if ($("#DIRECCION_AUTORIZACION").val().trim() == "") {
        flg = false;
        objData.push({ "DIRECCION_AUTORIZACION": [{ ErrorMessage: "Debe Ingresar la Direccion" }] })
    }*/

    if (flg) {
        $("#divErrorAutorizacion").hide();
    }
    else {
        $("#divErrorAutorizacion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorAutorizacion"></ul>');
        errorAddJS("divErrorAutorizacion", "ulListaErrorAutorizacion", objData)
    }
    return flg;
}
function CargarListaAmpliacion() {
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Autorizacion/ListadoAmpliacion',
        type: 'POST',
        data: JSON.stringify({ autorizacion: $("#XAUTORIZACION").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);

            gridListaAmpliacion(data.l_Autorizacion_Ampliacion);

            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });
}

function gridListaAmpliacion(data) {

    $("#gridAmpliacion").kendoGrid({
        sortable: true,
        resizable: true,
        dataSource: {
            data: data,
            pageSize: 3
        },
        selectable: "multiple",
        sortable: true,
        pageable: true,
        columns: [
            {
                field: "XAUTORIZACION_AMPLIACION",
                width: 90,
                title: "XAUTORIZACION_AMPLIACION",
                hidden: true
            }, {
                field: "XAUTORIZACION",
                width: 90,
                title: "XAUTORIZACION",
                hidden: true
            }, {
                field: "RESOLUCION_DIRECTORIAL",
                width: 150,
                title: "RESOLUCION DIRECTORIAL"
            }, {
                field: "XFECHA_RESOLUCION",
                width: 150,
                title: "FECHA RESOLUCION"
            }, {
                field: "XFECHA_INICIO",
                width: 150,
                title: "FECHA INICIO"
            }, {
                field: "XFECHA_FIN",
                title: "FECHA FIN",
                width: 150
            }, {
                field: "XFECHA_PUBLICACION_PERUANO",
                title: "FECHA PUBLIC. PERUANO",
                width: 150
            }]
    });

}


function DatosMultiselect() {

    $.ajax({
        datatype: 'json',
        url: '/Autorizacion/DatosMultiselec',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ Id_Autorizacion: $("#XAUTORIZACION").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorAutorizacion", "ulListaErrorAutorizacion", data.errores);
            } else {
                $("#XTIPO_ACTIVIDAD").data("kendoMultiSelect").value(data.varDatoActividad.split(","));
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}

