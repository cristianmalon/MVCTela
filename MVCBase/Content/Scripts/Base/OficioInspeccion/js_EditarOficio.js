$(document).ready(function () {
    
    if ($("#XID_OFICIO_INSPECCION").val().trim() == "") {
        $("#btnVistaPreviaOfico").hide();
    }
    else {
        $("#btnVistaPreviaOfico").show();
    }

    if ($("#XTIPO_OFICIO").val().trim() == "REITERATIVO" ) {
        $("#ID_OFICIO_REFERENCIA").kendoMultiSelect({
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains"
        });

        $("#ID_OFICIO_REFERENCIA").data("kendoMultiSelect").value("");
    }

    $("#XID_ACRONIMO_OFICIO").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            //selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            } else {
            }
        },
    });
    
    $("#XCONTACTO").kendoMultiSelect({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains"
    });
    
    $("#XID_CONTACTO").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            } else {
                if ($.trim($("#XID_CONTACTO").data("kendoComboBox").value()) != "" && $("#XID_CONTACTO").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/Reiterativo/datoContacto',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XPERSONAJURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
                            XCONTACTO: $.trim($("#XID_CONTACTO").data("kendoComboBox").value())

                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            //console.log(data.l_Genm_Contacto);
                            var l_Genm_Contacto = data.l_Genm_Contacto;

                            var lContacto = [];
                            $.each(l_Genm_Contacto, function (index, value) {
                                var oContacto = {
                                    value: value.XCONTACTO,
                                    text: value.NOMBRE_COMPLETO
                                }
                                lContacto.push(oContacto);
                            });
                            var multiselect = $("#XCONTACTO").data("kendoMultiSelect");
                            multiselect.setDataSource(lContacto);
                            multiselect.value([]);

                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });
                }
            }
        },
    });

    
   
    $("#XID_TRABAJADOR").kendoMultiSelect({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains"
    });
    //$("#XID_TRABAJADOR").data("kendoMultiSelect").value("");

    $("#FECHA_OFICIO").kendoDatePicker();
    oficio = $("#XID_OFICIO_INSPECCION").val().trim();

    if (oficio == "") {
        $("#FECHA_OFICIO").val('');
        $("#btnValidarOficio").hide();
    } else {
        $("#btnValidarOficio").show();
        if ($("#XFLG_VALIDAR").val() == "1") {
            $("#btnRegistroOficio").hide();
            $("#btnValidarOficio").hide();
        }


    }


    $("#btnRegistroOficio").bind("click", function () {
        GuardarOficio();
    });

    $("#btnValidarOficio").bind("click", function () {
        ValidarInspeccion();
    });

    $("#btnVistaPreviaOfico").bind("click", function () {
        VistaPrevia();
    });

});

function VistaPrevia() {
    if ($("#XID_OFICIO_INSPECCION").val().trim().length > 0) {
        modalAjaxReporte("/OficioInspeccion/VerOficioReporte", { XID_OFICIO_INSPECCION: $("#XID_OFICIO_INSPECCION").val() });
    }
    else {
        bootbox.alert("No hay oficio guardado");
    }
}

function GuardarOficio() {

    if ($("#XTIPO_OFICIO").val() =="OFICIO") {
        if (validaOficio()) {
        bootbox.confirm("¿Desea grabar el oficio?", function (res) {        
            if (res) {
                var KDPFECHA_OFICIO = $("#FECHA_OFICIO").data("kendoDatePicker");
                var FECHA_OFICIO = new Date(1999, 1, 1);
                FECHA_OFICIO = KDPFECHA_OFICIO.value();

                var KDPFECHA_INSPECCION = $("#FECHA_INSPECCION").data("kendoDatePicker");
                var FECHA_INSPECCION = new Date(1999, 1, 1);
                FECHA_INSPECCION = KDPFECHA_INSPECCION.value();

                var oOficio = {
                    XID_OFICIO_INSPECCION: $("#XID_OFICIO_INSPECCION").val(),
                    XID_ACRONIMO_OFICIO: $("#XID_ACRONIMO_OFICIO").val(),
                    XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
                    XID_CONTACTO: $("#XID_CONTACTO").val(),
                    XID_INSPECTOR: $("#XID_INSPECTOR_OFICIO").val(),
                    XID_DIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
                    XID_COORDINACION_TECNICA: $("#XID_COORDINACION_TECNICA").val(),
                    NUMERO_OFICIO: $("#NUMERO_OFICIO").val(),
                    FECHA_INSPECCION: FECHA_INSPECCION,
                    FECHA_OFICIO: FECHA_OFICIO,
                    CONSIDERACION_1: $("#CONSIDERACION_1").val(),
                    CONSIDERACION_2: $("#CONSIDERACION_2").val(),
                    CONCLUSION_1: $("#CONCLUSION_1").val(),
                    CONCLUSION_2: $("#CONCLUSION_2").val(),
                    CONCLUSION_3: $("#CONCLUSION_3").val(),
                    DESCRIPCION_CARGO: $("#DESCRIPCION_CARGO").val(),
                    SIGLAS_OFICIO: $("#SIGLAS_OFICIO").val(),
                    COMENTARIOS: $("#COMENTARIOS").val(),
                    REFERENCIA_1: $("#REFERENCIA_1").val(),
                    REFERENCIA_2: $("#REFERENCIA_2").val(),
                    REFERENCIA_3: $("#REFERENCIA_3").val(),
                    REFERENCIA_4: $("#REFERENCIA_4").val(),
                    REFERENCIA_5: $("#REFERENCIA_5").val(),
                    REFERENCIA_6: $("#REFERENCIA_6").val(),
                    COPIA_1: $("#COPIA_1").val(),
                    COPIA_2: $("#COPIA_2").val(),
                    COPIA_3: $("#COPIA_3").val(),
                    COPIA_4: $("#COPIA_4").val(),
                    COPIA_5: $("#COPIA_5").val(),
                    FLG_FECHA_DOC: $('input[name=FLG_FECHA_DOC]:checked').val(),
                    XID_INSPECCION: $("#XINSPECCION").val(),

                };
                
                var lReferencia = $("#XCONTACTO").data('kendoMultiSelect');
                var objDataReferenciajax = [];
                $.each(lReferencia.value(), function (index, value) {
                    var oReferencia = {
                        XCONTACTO: value
                    }
                    objDataReferenciajax.push(oReferencia);
                });

                var lTrabajador = $("#XID_TRABAJADOR").data('kendoMultiSelect');
                var objDataTrabajadorajax = [];
                $.each(lTrabajador.value(), function (index, value) {
                    var oTrabajador = {
                        XID_TRABAJADOR: value
                    }
                    objDataTrabajadorajax.push(oTrabajador);
                });
                                
               // console.log(objDataReferenciajax);
               // console.log(objDataTrabajadorajax);

                var objDiscrepanciaAjax = [];
                var gridDiscrepancias = $("#gridDiscrepancia").data("kendoGrid").dataSource.data();

                $.each(gridDiscrepancias, function (index, item) {

                    var dataDiscrepancias = {
                        XID_DISCREPANCIA: item.XDISCREPANCIA,
                        XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
                        XID_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
                        XID_TIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
                        XID_INSPECCION: $("#XINSPECCION").val(),
                        XID_ESTADO_DISCREPANCIA_DS: item.XESTADO_DISCREPANCIA_DS

                    }
                    objDiscrepanciaAjax.push(dataDiscrepancias);
                    console.log(objDiscrepanciaAjax);
                });
                
                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/OficioInspeccion/SaveOficio',
                    type: 'POST',
                    data: JSON.stringify({ oOficio: oOficio, objDataReferencia: objDataReferenciajax, objDataTrabajador: objDataTrabajadorajax, objDiscrepancia: objDiscrepanciaAjax }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        console.log(data);
                        if (!data.rpta) {
                            errorAddModelo("divErrorOficio", "ulListaOficio", data.errores);
                            desbloqObject();
                        } else {
                            bootbox.alert("Se registro el Oficio!");
                            $("#contenedor2").modal('hide');
                            $("#btnVerOficios").show();
                            //$("#btnReiterativo").show();
                            $("#btnLevantar").show();
                            $("#btnExtension").show();
                            $("#btnVerDocumentos").show();
                            ConsultaDiscrepancia();
                            //$("[data-dismiss=modal]").trigger({ type: "click" });
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
    }

    } else if ($("#XTIPO_OFICIO").val() == "REITERATIVO") {
        if (validaOficio()) {
        bootbox.confirm("¿Desea grabar el oficio?", function (res) {            
                if (res) {
                    var KDPFECHA_OFICIO = $("#FECHA_OFICIO").data("kendoDatePicker");
                    var FECHA_OFICIO = new Date(1999, 1, 1);
                    FECHA_OFICIO = KDPFECHA_OFICIO.value();

                    var KDPFECHA_INSPECCION = $("#FECHA_INSPECCION").data("kendoDatePicker");
                    var FECHA_INSPECCION = new Date(1999, 1, 1);
                    FECHA_INSPECCION = KDPFECHA_INSPECCION.value();

                    var oOficio = {
                        XID_OFICIO_INSPECCION: $("#XID_OFICIO_INSPECCION").val(),
                        XID_ACRONIMO_OFICIO: $("#XID_ACRONIMO_OFICIO").val(),
                        XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
                        XID_CONTACTO: $("#XID_CONTACTO").val(),
                        XID_INSPECTOR: $("#XID_INSPECTOR_OFICIO").val(),
                        XID_DIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
                        XID_COORDINACION_TECNICA: $("#XID_COORDINACION_TECNICA").val(),
                        NUMERO_OFICIO: $("#NUMERO_OFICIO").val(),
                        FECHA_INSPECCION: FECHA_INSPECCION,
                        FECHA_OFICIO: FECHA_OFICIO,
                        XID_OFICIO_REFERENCIA: $("#XID_OFICIO_REFERENCIA").val(),
                        CONSIDERACION_1: $("#CONSIDERACION_1").val(),
                        CONSIDERACION_2: $("#CONSIDERACION_2").val(),
                        CONCLUSION_1: $("#CONCLUSION_1").val(),
                        CONCLUSION_2: $("#CONCLUSION_2").val(),
                        CONCLUSION_3: $("#CONCLUSION_3").val(),
                        DESCRIPCION_CARGO: $("#DESCRIPCION_CARGO").val(),
                        SIGLAS_OFICIO: $("#SIGLAS_OFICIO").val(),
                        COMENTARIOS: $("#COMENTARIOS").val(),
                        REFERENCIA_1: $("#REFERENCIA_1").val(),
                        REFERENCIA_2: $("#REFERENCIA_2").val(),
                        REFERENCIA_3: $("#REFERENCIA_3").val(),
                        REFERENCIA_4: $("#REFERENCIA_4").val(),
                        REFERENCIA_5: $("#REFERENCIA_5").val(),
                        REFERENCIA_6: $("#REFERENCIA_6").val(),
                        COPIA_1: $("#COPIA_1").val(),
                        COPIA_2: $("#COPIA_2").val(),
                        COPIA_3: $("#COPIA_3").val(),
                        COPIA_4: $("#COPIA_4").val(),
                        COPIA_5: $("#COPIA_5").val(),
                        FLG_SATISFACTORIA: $('input[name=FLG_FECHA_DOC]:checked').val(),
                        XID_INSPECCION: $("#XINSPECCION").val(),

                    };

                    var lOficios = $("#ID_OFICIO_REFERENCIA").data('kendoMultiSelect');
                    var objDataReiterativoajax = [];
                    $.each(lOficios.value(), function (index, value) {
                        var oDataOficio = {
                            ID_OFICIO_REFERENCIA: value
                        }
                        objDataReiterativoajax.push(oDataOficio);
                    });

                    var lReferencia = $("#XCONTACTO").data('kendoMultiSelect');
                    var objDataReferenciajax = [];
                    $.each(lReferencia.value(), function (index, value) {
                        var oReferencia = {
                            XCONTACTO: value
                        }
                        objDataReferenciajax.push(oReferencia);
                    });

                    var lTrabajador = $("#XID_TRABAJADOR").data('kendoMultiSelect');
                    var objDataTrabajadorajax = [];
                    $.each(lTrabajador.value(), function (index, value) {
                        var oTrabajador = {
                            XID_TRABAJADOR: value
                        }
                        objDataTrabajadorajax.push(oTrabajador);
                    });
                    /*
                    console.log(objDataReiterativoajax);
                    console.log(objDataReferenciajax);
                    console.log(objDataTrabajadorajax);
                    */
                    //var objDiscrepanciaAjax = [];
                    //var gridDiscrepancias = $("#gridDiscrepancia").data("kendoGrid").dataSource.data();

                    //$.each(gridDiscrepancias, function (index, item) {

                    //    var dataDiscrepancias = {
                    //        XID_DISCREPANCIA: item.XDISCREPANCIA,
                    //        XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
                    //        XID_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
                    //        XID_TIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
                    //        XID_INSPECCION: $("#XINSPECCION").val(),

                    //    }
                    //    objDiscrepanciaAjax.push(dataDiscrepancias);
                    //});
                    
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Reiterativo/SaveOficio',
                        type: 'POST',
                        data: JSON.stringify({ oOficio: oOficio, objDataReiterativo: objDataReiterativoajax, objDataReferencia: objDataReferenciajax, objDataTrabajador: objDataTrabajadorajax }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                errorAddModelo("divErrorOficio", "ulListaOficio", data.errores);
                                desbloqObject();
                            } else {
                                bootbox.alert("Se registro el Oficio!");
                                $("#contenedor2").modal('hide');
                                $("#btnReiterativo").show();
                                $("#btnLevantar").show();
                                $("#btnExtension").show();
                                ConsultaDiscrepancia();
                                //$("[data-dismiss=modal]").trigger({ type: "click" });
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
        }
    }

}

function ValidarInspeccion() {
    bootbox.confirm("¿Desea Validar el oficio?", function (res) {            
        if (res) {
    $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/Inspeccion/ActualizarFlgValidar',
                    type: 'POST',
                    data: JSON.stringify({ Inspeccion: $("#XINSPECCION").val()}),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        console.log(data);
                        if (!data.rpta) {
                            errorAddModelo("divErrorOficio", "ulListaOficio", data.errores);
                            desbloqObject();
                        } else {
                            bootbox.alert("Valido correctamente el Oficio!");
                            $("#XFLG_VALIDAR").val("1");
                            $("#contenedor2").modal('hide');
                            $("#btnReiterativo").show();
                            $("#btnRegistroOficio").removeAttr("disabled").attr("disabled", "disabled");
                            
                            ValidarInspeccionControles();
                            ConsultaDiscrepancia();

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
}


function ValidarInspeccionControles() {
    
    try {
    $("#btnAddDiscrepancia").hide();
    $("#btnModifyDiscrepancia").html('Ver Discrepancia');
    $("#FECHA_INSPECCION").data("kendoDatePicker").enable(false);
    $("#XDEPARTAMENTO").data("kendoComboBox").enable(false);
    $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").enable(false);
    $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").enable(false);
    $("#OBSERVACION").removeAttr("readonly").attr("readonly", "readonly");
    $("#CT_GENM_PAIS_XPAIS").data("kendoComboBox").enable(false);
    $("#CT_GENM_CIUDAD_XCIUDAD").data("kendoComboBox").enable(false);
    $("#XMATRICULA").data("kendoComboBox").enable(false);
    $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox").enable(false);
    $("#CT_MAE_AERODROMO_XAERODROMO").data("kendoComboBox").enable(false);
    $("#XAERODROMO_FIN").data("kendoComboBox").enable(false);
    $("#CT_GENM_HELIPUERTO_XHELIPUERTO").data("kendoComboBox").enable(false);
    $("#XHELIPUERTO_FIN").data("kendoComboBox").enable(false);
    $("#btnRegistrarInspeccion").hide();
    $("#btnCancelar").html('Cerrar');
    $("#btnGenerarOficio").hide();

    $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").data("kendoComboBox").enable(false);
    $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").data("kendoComboBox").enable(false);
    $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox").enable(false);
        //Agregar para validar radio button!
    $('input:radio[name=FLG_SATISFACTORIA]').removeAttr("disabled").attr("disabled", "disabled");
    }
    catch(e){

    }
}



function validaOficio() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");
    var FechaOficio = isDate($("#FECHA_OFICIO").val());

    if ($("#XID_ACRONIMO_OFICIO").val().trim() == "") {
        flg = false;
        $('[aria-owns="XID_ACRONIMO_OFICIO_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_ACRONIMO_OFICIO": [{ ErrorMessage: "Debe seleccionar un Título correcto" }] })
    }

    if ($("#XID_CONTACTO").val().trim() == "") {
        flg = false;
        $('[aria-owns="XID_CONTACTO_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_CONTACTO": [{ ErrorMessage: "Debe seleccionar una contacto a quien va dirigido " }] })
    }

    if ($("#CONSIDERACION_1").val().trim() == "") {
        flg = false;
        objData.push({ "CONSIDERACION_1": [{ ErrorMessage: "Debe ingresar la primera consideración" }] })
    }

    if ($("#CONSIDERACION_2").val().trim() == "") {
        flg = false;
        objData.push({ "CONSIDERACION_2": [{ ErrorMessage: "Debe ingresar un la segunda consideración" }] })
    }
    if (FechaOficio == false) {
        flg = false;
        $("#FECHA_OFICIO").parents("span").addClass("valError");
        objData.push({ "FECHA_OFICIO": [{ ErrorMessage: "Debe ingresar una Fecha Oficio Valida" }] })
    }


    if (flg) {
        $("#divErrorOficio").hide();
    }
    else {
        $("#divErrorOficio").html('<strong>No se puede grabar</strong><ul id="ulListaOficio"></ul>');
        errorAddJS("divErrorOficio", "ulListaOficio", objData)
    }

    return flg;
}