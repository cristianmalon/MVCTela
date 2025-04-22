$(document).ready(function () {
    $(window).load(function () {
        $("#VIGENCIA_MATRICULA").kendoDatePicker();

        $("#VIGENCIA_CERTI_AERONAV").kendoDatePicker();

        $(".dropdown-menu li a").click(function () {
            $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
            $(this).parents(".dropdown").find('.btn').val($(this).data('value'));

            var btnValue = $(this).attr("btn-value");
            var uniValue = $(this).attr("uni-value");

            $('#' + btnValue).attr("uni-value", uniValue);
        });
        if ($("#FLG_SIN_VIGENCIA").is(':checked')) {
            $("#VIGENCIA_MATRICULA").val('');
            $('#VIGENCIA_MATRICULA').data('kendoDatePicker').enable(false);
        }
        else {
            $('#VIGENCIA_MATRICULA').data('kendoDatePicker').enable(true);
        }
        if ($("#FLG_SIN_VIGENCIA_AERONAVE").is(':checked')) {
            $("#VIGENCIA_CERTI_AERONAV").val('');
            $('#VIGENCIA_CERTI_AERONAV').data('kendoDatePicker').enable(false);
        }
        else {
            $('#VIGENCIA_CERTI_AERONAV').data('kendoDatePicker').enable(true);
        }

        $("#XFABRICANTE_PA").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            select: onSelectFabricante,
            filter: "contains",
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($.trim($("#XTIPO_AERONAVE_PA").data("kendoComboBox").value()).length != 0 && $("#XTIPO_AERONAVE_PA").data("kendoComboBox").value() != null) {
                        if ($.trim($("#XFABRICANTE_PA").data("kendoComboBox").value()).length != 0 && $("#XFABRICANTE_PA").data("kendoComboBox").value() != null) {
                            $.ajax({
                                datatype: 'json',
                                url: '/Aeronave/datoTipoModelo',
                                type: 'POST',
                                contentType: "application/json",
                                data: JSON.stringify({
                                    XTIPOMODELO: $("#XTIPO_AERONAVE_PA").data("kendoComboBox").value(), XFABRICANTE: $("#XFABRICANTE_PA").data("kendoComboBox").value()//
                                }),
                                beforeSend: function () {
                                    bloquoteObject();
                                },
                                success: function (data) {

                                    if (!data.rpta) {
                                        errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                                    } else {
                                        var l_Genm_Correccion_PA = data.l_Genm_Correccion_PA;

                                        var lModelo = [];
                                        $.each(l_Genm_Correccion_PA, function (index, value) {
                                            var oModelo = {
                                                value: value.XTIPOMODELOPA,
                                                text: value.DESCRIPCION
                                            }
                                            lModelo.push(oModelo);
                                        });
                                        $("#XMODELO_PA").data("kendoComboBox").text('');
                                        var multiselect = $("#XMODELO_PA").data("kendoComboBox");
                                        multiselect.setDataSource(lModelo);
                                    }
                                    desbloqObject();
                                }
                            }).fail(function (jqxhr, textStatus, error) {
                                var err = textStatus + ', ' + error;
                                desbloqObject();
                            });

                        }

                    }
                }
            }
        });
        $("#XTIPO_AERONAVE_PA").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            select: onSelectTipoAeronave,
            filter: "contains",
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($.trim($("#XTIPO_AERONAVE_PA").data("kendoComboBox").value()).length != 0 && $("#XTIPO_AERONAVE_PA").data("kendoComboBox").value() != null) {
                        if ($.trim($("#XFABRICANTE_PA").data("kendoComboBox").value()).length != 0 && $("#XFABRICANTE_PA").data("kendoComboBox").value() != null) {

                            $.ajax({
                                datatype: 'json',
                                url: '/Aeronave/datoTipoModelo',
                                type: 'POST',
                                contentType: "application/json",
                                data: JSON.stringify({
                                    XTIPOMODELO: $("#XTIPO_AERONAVE_PA").data("kendoComboBox").value(), XFABRICANTE: $("#XFABRICANTE_PA").data("kendoComboBox").value()//
                                }),
                                beforeSend: function () {
                                    bloquoteObject();
                                },
                                success: function (data) {

                                    if (!data.rpta) {
                                        errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                                    } else {
                                        var l_Genm_Correccion_PA = data.l_Genm_Correccion_PA;

                                        var lModelo = [];
                                        $.each(l_Genm_Correccion_PA, function (index, value) {
                                            var oModelo = {
                                                value: value.XTIPOMODELOPA,
                                                text: value.DESCRIPCION
                                            }
                                            lModelo.push(oModelo);
                                        });
                                        $("#XMODELO_PA").data("kendoComboBox").text('');
                                        var multiselect = $("#XMODELO_PA").data("kendoComboBox");
                                        multiselect.setDataSource(lModelo);
                                    }
                                    desbloqObject();
                                }
                            }).fail(function (jqxhr, textStatus, error) {
                                var err = textStatus + ', ' + error;
                                desbloqObject();
                            });
                        }

                    }
                }
            }
        });

        $("#XMODELO_PA").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            }
        });

        $(".tabNext").click(function () {
            var valid = $(this).attr("valida-dato");
            var next = $(this).attr("next-tab");
            var flgNext = true;
            if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
                switch (valid) {
                    case 'general':
                        if (validGeneral()) {
                            saveGeneral(next);
                        }
                        break;
                    case 'tecnicos':
                        if (validTecnico()) {
                            saveTecnico(next);
                        }
                        break;
                    case 'tecnicos_second':
                        if (validTecnicoSecond()) {
                            saveTecnicoDos(next);
                        }
                        break;
                    case 'motores':
                        if (validMotores()) {
                            saveMotores(next);
                        }
                        break;
                    case 'helices':
                        flgNext = true;
                        saveHelices(next);
                        break;
                    case 'trenes':
                        flgNext = true;
                        if (validHelicoptero()) {
                            next = 'declaracion';
                        }
                        saveTrenes(next);
                        break;
                    case 'helicopteros':
                        flgNext = true;
                        if (validHelicoptero()) {
                            next = 'declaracion';
                        }
                        saveHelicop(next);
                        break;
                }
            }
            if ($("#ID_ESTADO_AERONAVE_PA").val() == "3") {
                activaTab("tabRegAeronave", next);
            }
            if ($("#ID_ESTADO_AERONAVE_PA").val() == "1" || $("#ID_ESTADO_AERONAVE_PA").val() == "2") {
                switch (valid) {
                    case 'general':
                        if (validGeneral()) {
                            saveGeneral(next);
                        }
                        break;
                }
            }
        });

        //Type Head Contacto
        $('#ContactoRepre_NOMBRE_COMPLETO').typeahead({
            source: function (query, process) {
                return $.getJSON(
                    '/Aeronave/FilterContacto',
                    { criterio: query },
                    function (data) {
                        var dato = [];
                        $("#ContactoRepre_CARGO_DESCRIPCION").val("");
                        $("#ContactoRepre_CORREO").val("");
                        $("#ContactoRepre_TELEFONO").val("");
                        $("#ContactoRepre_XCONTACTO").val("");
                        $.each(data.l_Autocomplete, function (index, item) {
                            dato.push({
                                label: item.label,
                                value: item.value,
                                CORREO: item.CORREO,
                                NUMERO: item.NUMERO,
                                XCARGO: item.XCARGO,
                                XCARGO_DETALLE: item.XCARGO_DETALLE
                            });
                        });
                        return process(dato);

                    });
            },
            displayText: function (item) { console.log(item); return item.label; },
            updater: function (item) {
                $("#ContactoRepre_CARGO_DESCRIPCION").val(item.XCARGO_DETALLE);
                $("#ContactoRepre_CORREO").val(item.CORREO);
                $("#ContactoRepre_TELEFONO").val(item.NUMERO);
                $("#ContactoRepre_XCONTACTO").val(item.value);

                return item.label;
            }
        });



        $(".btnCancelarAeronave").click(function () {
            window.location = "/ConsultaBandejaEmpresaInternacionalPA/Index";
        });

        $("#gestionHeliceHelicoppAeronave").click(function () {
            gestionHeliceHelicop();
        });
        $("#btnNewHeliceHelicop").click(function () {
            NuevoHeliceHelicop();
        });
        $("#btnEditHeliceHelicop").click(function () {
            EditHeliceHelicop();
        });
        $("#txtNRO_PALAS").keyup(function () {
            var Contador = $(this).val();
            gridPalasHelicesRegistro("", Contador);
        });
        $("#btnRegistroHeliceModalHelicop").click(function () {
            SaveHelicePalaHelicoptero();
        });
        $("#FLG_SIN_VIGENCIA").click(function () {
            if ($(this).is(':checked')) {
                $("#VIGENCIA_MATRICULA").val('');
                $('#VIGENCIA_MATRICULA').data('kendoDatePicker').enable(false);
            }
            else {
                $('#VIGENCIA_MATRICULA').data('kendoDatePicker').enable(true);
            }
        });
        $("#FLG_SIN_VIGENCIA_AERONAVE").click(function () {
            if ($(this).is(':checked')) {
                $("#VIGENCIA_CERTI_AERONAV").val('');
                $('#VIGENCIA_CERTI_AERONAV').data('kendoDatePicker').enable(false);
            }
            else {
                $('#VIGENCIA_CERTI_AERONAV').data('kendoDatePicker').enable(true);
            }
        });
        
    });
});
function onSelectTipoAeronave(e) {
    var dataItem = this.dataItem(e.item);

    if ($.trim($("#XFABRICANTE_PA").data("kendoComboBox").value()).length != 0 && $("#XFABRICANTE_PA").data("kendoComboBox").value() != null) {
        if (dataItem.value != "" && dataItem.value != null) {
            $.ajax({
                datatype: 'json',
                url: '/Aeronave/datoTipoModelo',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    XTIPOMODELO: dataItem.value, XFABRICANTE: $("#XFABRICANTE_PA").data("kendoComboBox").value()//
                }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    if (!data.rpta) {
                        errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                    } else {
                        var l_Genm_Correccion_PA = data.l_Genm_Correccion_PA;

                        var lModelo = [];
                        $.each(l_Genm_Correccion_PA, function (index, value) {
                            var oModelo = {
                                value: value.XTIPOMODELOPA,
                                text: value.DESCRIPCION
                            }
                            lModelo.push(oModelo);
                        });
                        $("#XMODELO_PA").data("kendoComboBox").text('');
                        var multiselect = $("#XMODELO_PA").data("kendoComboBox");
                        multiselect.setDataSource(lModelo);
                    }
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                desbloqObject();
            });
        }
    }
}
function onSelectFabricante(e) {
    var dataItem = this.dataItem(e.item);
    if ($("#XTIPO_AERONAVE_PA").data("kendoComboBox").value().trim().length != 0 && $("#XTIPO_AERONAVE_PA").data("kendoComboBox").value() != null) {
        if (dataItem.value != "" && dataItem.value != null) {
            $.ajax({
                datatype: 'json',
                url: '/Aeronave/datoTipoModelo',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    XTIPOMODELO: $("#XTIPO_AERONAVE_PA").data("kendoComboBox").value(), XFABRICANTE: dataItem.value
                }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    if (!data.rpta) {
                        errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                    } else {
                        var l_Genm_Correccion_PA = data.l_Genm_Correccion_PA;

                        var lModelo = [];
                        $.each(l_Genm_Correccion_PA, function (index, value) {
                            var oModelo = {
                                value: value.XTIPOMODELOPA,
                                text: value.DESCRIPCION
                            }
                            lModelo.push(oModelo);
                        });
                        $("#XMODELO_PA").data("kendoComboBox").text('');
                        var multiselect = $("#XMODELO_PA").data("kendoComboBox");
                        multiselect.setDataSource(lModelo);
                    }
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                desbloqObject();
            });
        }
    }
}

function saveGeneral(next) {
    var datoflag = false;
    var objAeronaveAjax = {
        XAERONAVE_PA: $("#XAERONAVE_PA").val(),
        XTIPO_AERONAVE_PA: $("#XTIPO_AERONAVE_PA").data("kendoComboBox").value(),
        XFABRICANTE_PA: $("#XFABRICANTE_PA").data("kendoComboBox").value(),
        MATRICULA: $("#MATRICULA").val(),
        XMODELO_PA: $("#XMODELO_PA").data("kendoComboBox").value(),
        NUMERO_SERIE: $("#NUMERO_SERIE").val(),
        HORAS_VUELO: 0,
        MINUTOS_VUELO: 0,
        CICLOS_VUELO: 0,
        HORAS_AERONAVE: 0,
        CICLOS_AERONAVE: 0,
        VIGENCIA_MATRICULA: $("#VIGENCIA_MATRICULA").val(),
        VIGENCIA_CERTI_AERONAV: $("#VIGENCIA_CERTI_AERONAV").val(),
        XSOLICITUD_AERONAVE_PA: $("#XSOLICITUD_AERONAVE_PA option:selected").val(),
        FLG_SIN_VIGENCIA: $("#FLG_SIN_VIGENCIA").is(':checked'),
        FLG_SIN_VIGENCIA_AERONAVE: $("#FLG_SIN_VIGENCIA_AERONAVE").is(':checked')
    }

    var objSolicitanteAjax = {
        XSOLICITANTE_PA: $("#XSOLICITANTE_PA").val(),
        XCONDICION_SOLIC_PA: $("#XCONDICION_SOLIC_PA option:selected").val(),
        XCONTACTO: $("#ContactoRepre_XCONTACTO").val(),
    }

    var flagCrAeronaveP = "0";
    var flagCrAeronaveS = "0";
    var flagCrSolicitante = "0";
    var divAeronaveP = "divGeneral";
    var divAeronaveS = "divDatosAeronave";
    var divSolicitante = "divDatosSolicitante";


    if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
        if ($("#crGeneral").val() == "1") {
            flagCrAeronaveP = "1";
        }
        if ($("#crDatosAeronave").val() == "1") {
            flagCrAeronaveS = "1";
        }
        if ($("#crDatosSolicitante").val() == "1") {
            flagCrSolicitante = "1";
        }
    }

    $.ajax({
        datatype: 'json',
        url: '/AeronaveInternacional/SaveGeneral',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            objAeronave: objAeronaveAjax
            , objSolicitante: objSolicitanteAjax
            , divAeronaveP: divAeronaveP
            , divAeronaveS: divAeronaveS
            , divSolicitante: divSolicitante
            , flagCrAeronaveP: flagCrAeronaveP
            , flagCrAeronaveS: flagCrAeronaveS
            , flagCrSolicitante: flagCrSolicitante
            , EstadoAeronave: $("#ID_ESTADO_AERONAVE_PA").val()
        }),
        beforeSend: function () {
            bloquoteObject()
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorDatosGeneralesAjax", "ulListaErrorDatosGeneralesAjax", data.errores);
            } else {
                datoflag = true;
                $("#XAERONAVE_PA").val(data.aeronave);
                $("#XSOLICITANTE_PA").val(data.solicitante);
                window.location = "/ConsultaBandejaEmpresaInternacionalPA/Index";
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
        return datoflag;
    });

    return datoflag;
}


//Function valida datos generales
function validGeneral() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#XSOLICITUD_AERONAVE_PA  option:selected").val() == "") {
        flg = false;
        objData.push({ "XSOLICITUD_AERONAVE_PA": [{ ErrorMessage: "Debe seleccionar el tipo de solicitud" }] })
    }
    if ($("#XTIPO_AERONAVE_PA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XTIPO_AERONAVE_PA_listbox"]').addClass("valError");
        objData.push({ "XTIPO_AERONAVE_PA": [{ ErrorMessage: "Debe seleccionar el tipo de aeronave" }] })
    }
    if ($("#XFABRICANTE_PA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XFABRICANTE_PA_listbox"]').addClass("valError");
        objData.push({ "XFABRICANTE_PA": [{ ErrorMessage: "Debe seleccionar el fabricante de la aeronave" }] })
    }
    if ($("#MATRICULA").val().trim() == "") {
        flg = false;
        objData.push({ "MATRICULA": [{ ErrorMessage: "Debe ingresar la matricula de la aeronave" }] })
    }
    if ($("#XMODELO_PA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XMODELO_PA_listbox"]').addClass("valError");
        objData.push({ "XMODELO_PA": [{ ErrorMessage: "Debe seleccionar el modelo de la aeronave" }] })
    }
    if (!$("#FLG_SIN_VIGENCIA").is(':checked')) {
        if ($("#VIGENCIA_MATRICULA").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#VIGENCIA_MATRICULA").parents("span").addClass("valError");
            objData.push({ "VIGENCIA_MATRICULA": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha de vigencia de la matricula" }] })
        }
    }
    if (!$("#FLG_SIN_VIGENCIA_AERONAVE").is(':checked')) {
        if ($("#VIGENCIA_CERTI_AERONAV").data("kendoDatePicker").value() == null) {
            flg = false;
            $("#VIGENCIA_CERTI_AERONAV").parents("span").addClass("valError");
            objData.push({ "VIGENCIA_CERTI_AERONAV": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha de información de la aeronave" }] })
        }
    }

    if (flg) {
        $("#divErrorAeronave").hide();
    }
    else {
        $("#divErrorAeronave").html('<strong>No se puede grabar</strong><ul id="ulListaErrorAeronave"></ul>');
        errorAddJS("divErrorAeronave", "ulListaErrorAeronave", objData)
    }

    var objDataSolicitante = [];

    if ($("#ContactoRepre_XCONTACTO").val() == "") {
        flg = false;
        objDataSolicitante.push({ "ContactoRepre_NOMBRE_COMPLETO": [{ ErrorMessage: "Debe seleccionar a un representante legal" }] })
    }
    if (flg) {
        $("#divErrorSolicitante").hide();
    }
    else {
        $("#divErrorSolicitante").html('<strong>No se puede grabar</strong><ul id="ulListaErrorSolicitante"></ul>');
        errorAddJS("divErrorSolicitante", "ulListaErrorSolicitante", objDataSolicitante)
    }

    return flg;
}



//Disabled Div
function disabledDivDatosGenerales() {
    $("#XSOLICITUD_AERONAVE_PA").toggleDisable();
    $("#XTIPO_AERONAVE_PA").toggleDisable();
}
function disabledDivDatosAeronave() {
    $("#MATRICULA").toggleDisable();
    $("#XMODELO_PA").toggleDisable();
    $("#NUMERO_SERIE").toggleDisable();
    $("#XFABRICANTE_PA").toggleDisable();
    $("#VIGENCIA_MATRICULA").toggleDisable();
    $("#HORAS_AERONAVE_HORA").toggleDisable();
    $("#HORAS_AERONAVE_MINUTO").toggleDisable();
    $("#CICLOS_AERONAVE").toggleDisable();
    $("#VIGENCIA_CERTI_AERONAV").toggleDisable();
    $("#VIGENCIA_CERTI_AERONAV").data("kendoDatePicker").enable(false);
    $("#VIGENCIA_MATRICULA").data("kendoDatePicker").enable(false);
}
function disabledDivDatosSolicitante() {
    $("#PersonaNaturalSolicitante_NOMBRE_COMPLETO").toggleDisable();
    $("#PersonaNaturalSolicitante_NUMERO_DOCUMENTO").toggleDisable();
    $("#PersonaJuridica_RAZON_SOCIAL").toggleDisable();
    $("#PersonaJuridica_RUC").toggleDisable();
    $("#PersonaJuridica_NOMBRE_COMERCIAL").toggleDisable();
    $("#XCONDICION_SOLIC_PA").toggleDisable();
    $("#PersonaJuridica_DIRECCION_COMPLETA").toggleDisable();
    $("#ContactoRepre_NOMBRE_COMPLETO").toggleDisable();
    $("#ContactoRepre_CARGO_DESCRIPCION").toggleDisable();
    $("#ContactoRepre_TELEFONO").toggleDisable();
    $("#ContactoRepre_CORREO").toggleDisable();
}
function disabledDivDatosTecnicos() {
    $("#XTIPO_SERVICIO_PA").toggleDisable();
    $("#XCATEGORIA_AERONAVE_PA").toggleDisable();
    $("#PESO_BASICO_VACIO").toggleDisable();
    $("#PESO_MAXIMO_DECOLAJE").toggleDisable();
    $("#PESO_OPERACIONAL_BASICO").toggleDisable();
    $("#PESO_MAXIMO_ATERRIZAJE").toggleDisable();
    $("#PESO_MAXIMO_TAXEO").toggleDisable();
    $("#PESO_MAXIMO_CERO_COMBUSTIBLE").toggleDisable();
    $("#XUNIDAD_PESO_BASICO_VACIO").toggleDisable();
    $("#XUNIDAD_MAXIMO_DECOLAJE").toggleDisable();
    $("#XUNIDAD_PESO_OPERACIONAL_BAS").toggleDisable();
    $("#XUNIDAD_MAXIMO_ATERRIZAJE").toggleDisable();
    $("#XUNIDAD_PESO_MAXIMO_TAXEO").toggleDisable();
    $("#XUNIDAD_MAXIMO_CERO_COMBUSTI").toggleDisable();
    $("#XDATOS_UTIL_AERONAVE_PA").data("kendoMultiSelect").enable(false);
}
function disabledDivDatosTanques() {
    $("#NRO_TANQUES_COMBUSTIBLE").toggleDisable();
    $("#CAPACIDAD_COMBUSTIBLE").toggleDisable();
    $("#XUNIDAD_MEDIDA_COMBUSTIBLE").toggleDisable();
    $("#NRO_TRIPULACION").toggleDisable();
    $("#NRO_PASAJEROS").toggleDisable();
    $("#CAPACIDAD_OXIGENO_TRIPULACION").toggleDisable();
    $("#CAPACIDAD_OXIGENO_PASAJEROS").toggleDisable();
    $("#XUNIDAD_MEDIDA_CAP_OXIGENO").toggleDisable();
    $("#XUNIDAD_MEDIDA_CAP_PASA").toggleDisable();
}
function disabledDivDatosAvionica() {
    $("#CODIGO_ASIGNACION_DIRECCIONES").toggleDisable();
    $("#ELT_CODIFICACION").toggleDisable();
    $("#VHF_COMUNICACION").toggleDisable();
    $("#HF_COMUNICACION").toggleDisable();
    $("#VOR_ILS").toggleDisable();
    $("#ADF").toggleDisable();
    $("#VHF_RANGO_FRECUENCIA_INI").toggleDisable();
    $("#HF_RANGO_FRECUENCIA_INI").toggleDisable();
    $("#VOR_ILS_RANGO_FRECUENCIA_INI").toggleDisable();
    $("#ADF_RANGO_FRECUENCIA_INI").toggleDisable();
    $("#VHF_RANGO_FRECUENCIA_FIN").toggleDisable();
    $("#HF_RANGO_FRECUENCIA_FIN").toggleDisable();
    $("#VOR_ILS_RANGO_FRECUENCIA_FIN").toggleDisable();
    $("#ADF_RANGO_FRECUENCIA_FIN").toggleDisable();
    $("#XUNIDAD_MEDIDA_VHF").toggleDisable();
    $("#XUNIDAD_MEDIDA_HF").toggleDisable();
    $("#XUNIDAD_MEDIDA_VOR").toggleDisable();
    $("#XUNIDAD_MEDIDA_ADF").toggleDisable();

}
function disabledDivDatosOperaciones() {
    $("#TRIPULACION_MINIMA").toggleDisable();
    $("#NRO_PASAJEROS_MAXIMO").toggleDisable();
    $("#CAPACIDAD_CARGA_UTIL").toggleDisable();
    $("#XUNIDAD_MEDIDA_CAP_CARGA").toggleDisable();
    $("#NRO_BODEGAS").toggleDisable();
    $("#CAPACIDAD_CARGA_BODEGAS").toggleDisable();
    $("#XUNIDAD_MEDIDA_CAP_CARGA_BO").toggleDisable();
    $("#CAPACIDAD_VOLUMETRICA_BODEGAS").toggleDisable();
    $("#XUNIDAD_MEDIDA_CAP_VOL_BO").toggleDisable();
    $("#AUTONOMIA_VUELO").toggleDisable();
    $("#XUNIDAD_MEDIDA_HORAS_VUELO").toggleDisable();
    $("#CONSUMO_HORARIO_COMBUSTIBLE").toggleDisable();
    $("#XUNIDAD_MEDIDA_CONS_COMB").toggleDisable();
    $("#TECHO_MAXIMO").toggleDisable();
    $("#XUNIDAD_MEDIDA_TECHO_MAX").toggleDisable();
    $("#TECHO_CRUCERO").toggleDisable();
    $("#XUNIDAD_MEDIDA_TECHO_CRU").toggleDisable();
    $("#VELOCIDAD_MAXIMA").toggleDisable();
    $("#XUNIDAD_MEDIDA_VEL_MAX").toggleDisable();
    $("#VELOCIDAD_CRUCERO").toggleDisable();
    $("#XUNIDAD_MEDIDA_VEL_CRU").toggleDisable();
}
function disabledDivDatosDeclaracion() {
    $("#tblConformidad select").toggleDisable();
}
//Habilitar
function enabledDivDatosGenerales() {
    $("#XSOLICITUD_AERONAVE_PA").toggleEnable();
    $("#XTIPO_AERONAVE_PA").toggleEnable();
}
function enabledDivDatosAeronave() {
    $("#MATRICULA").toggleEnable();
    $("#XMODELO_PA").toggleEnable();
    $("#NUMERO_SERIE").toggleEnable();
    $("#XFABRICANTE_PA").toggleEnable();
    $("#VIGENCIA_MATRICULA").toggleEnable();
    $("#HORAS_AERONAVE_HORA").toggleEnable();
    $("#HORAS_AERONAVE_MINUTO").toggleEnable();
    $("#CICLOS_AERONAVE").toggleEnable();
    $("#VIGENCIA_CERTI_AERONAV").toggleEnable();
    $("#VIGENCIA_CERTI_AERONAV").data("kendoDatePicker").enable(false);
    $("#VIGENCIA_MATRICULA").data("kendoDatePicker").enable(false);
}
function enabledDivDatosSolicitante() {
    $("#PersonaNaturalSolicitante_NOMBRE_COMPLETO").toggleEnable();
    $("#PersonaNaturalSolicitante_NUMERO_DOCUMENTO").toggleEnable();
    $("#PersonaJuridica_RAZON_SOCIAL").toggleEnable();
    $("#PersonaJuridica_RUC").toggleEnable();
    $("#PersonaJuridica_NOMBRE_COMERCIAL").toggleEnable();
    $("#XCONDICION_SOLIC_PA").toggleEnable();
    $("#PersonaJuridica_DIRECCION_COMPLETA").toggleEnable();
    $("#ContactoRepre_NOMBRE_COMPLETO").toggleEnable();
    $("#ContactoRepre_CARGO_DESCRIPCION").toggleEnable();
    $("#ContactoRepre_TELEFONO").toggleEnable();
    $("#ContactoRepre_CORREO").toggleEnable();
}
function enabledDivDatosTecnicos() {
    $("#XTIPO_SERVICIO_PA").toggleEnable();
    $("#XCATEGORIA_AERONAVE_PA").toggleEnable();
    $("#PESO_BASICO_VACIO").toggleEnable();
    $("#PESO_MAXIMO_DECOLAJE").toggleEnable();
    $("#PESO_OPERACIONAL_BASICO").toggleEnable();
    $("#PESO_MAXIMO_ATERRIZAJE").toggleEnable();
    $("#PESO_MAXIMO_TAXEO").toggleEnable();
    $("#PESO_MAXIMO_CERO_COMBUSTIBLE").toggleEnable();
    $("#XUNIDAD_PESO_BASICO_VACIO").toggleEnable();
    $("#XUNIDAD_MAXIMO_DECOLAJE").toggleEnable();
    $("#XUNIDAD_PESO_OPERACIONAL_BAS").toggleEnable();
    $("#XUNIDAD_MAXIMO_ATERRIZAJE").toggleEnable();
    $("#XUNIDAD_PESO_MAXIMO_TAXEO").toggleEnable();
    $("#XUNIDAD_MAXIMO_CERO_COMBUSTI").toggleEnable();
    $("#XDATOS_UTIL_AERONAVE_PA").data("kendoMultiSelect").enable(true);
}
function enabledDivDatosTanques() {
    $("#NRO_TANQUES_COMBUSTIBLE").toggleEnable();
    $("#CAPACIDAD_COMBUSTIBLE").toggleEnable();
    $("#XUNIDAD_MEDIDA_COMBUSTIBLE").toggleEnable();
    $("#NRO_TRIPULACION").toggleEnable();
    $("#NRO_PASAJEROS").toggleEnable();
    $("#CAPACIDAD_OXIGENO_TRIPULACION").toggleEnable();
    $("#CAPACIDAD_OXIGENO_PASAJEROS").toggleEnable();
    $("#XUNIDAD_MEDIDA_CAP_OXIGENO").toggleEnable();
    $("#XUNIDAD_MEDIDA_CAP_PASA").toggleEnable();
}
function enabledDivDatosAvionica() {
    $("#CODIGO_ASIGNACION_DIRECCIONES").toggleEnable();
    $("#ELT_CODIFICACION").toggleEnable();
    $("#VHF_COMUNICACION").toggleEnable();
    $("#HF_COMUNICACION").toggleEnable();
    $("#VOR_ILS").toggleEnable();
    $("#ADF").toggleEnable();
    $("#VHF_RANGO_FRECUENCIA_INI").toggleEnable();
    $("#HF_RANGO_FRECUENCIA_INI").toggleEnable();
    $("#VOR_ILS_RANGO_FRECUENCIA_INI").toggleEnable();
    $("#ADF_RANGO_FRECUENCIA_INI").toggleEnable();
    $("#VHF_RANGO_FRECUENCIA_FIN").toggleEnable();
    $("#HF_RANGO_FRECUENCIA_FIN").toggleEnable();
    $("#VOR_ILS_RANGO_FRECUENCIA_FIN").toggleEnable();
    $("#ADF_RANGO_FRECUENCIA_FIN").toggleEnable();
    $("#XUNIDAD_MEDIDA_VHF").toggleEnable();
    $("#XUNIDAD_MEDIDA_HF").toggleEnable();
    $("#XUNIDAD_MEDIDA_VOR").toggleEnable();
    $("#XUNIDAD_MEDIDA_ADF").toggleEnable();

}
function enabledDivDatosOperaciones() {
    $("#TRIPULACION_MINIMA").toggleEnable();
    $("#NRO_PASAJEROS_MAXIMO").toggleEnable();
    $("#CAPACIDAD_CARGA_UTIL").toggleEnable();
    $("#XUNIDAD_MEDIDA_CAP_CARGA").toggleEnable();
    $("#NRO_BODEGAS").toggleEnable();
    $("#CAPACIDAD_CARGA_BODEGAS").toggleEnable();
    $("#XUNIDAD_MEDIDA_CAP_CARGA_BO").toggleEnable();
    $("#CAPACIDAD_VOLUMETRICA_BODEGAS").toggleEnable();
    $("#XUNIDAD_MEDIDA_CAP_VOL_BO").toggleEnable();
    $("#AUTONOMIA_VUELO").toggleEnable();
    $("#XUNIDAD_MEDIDA_HORAS_VUELO").toggleEnable();
    $("#CONSUMO_HORARIO_COMBUSTIBLE").toggleEnable();
    $("#XUNIDAD_MEDIDA_CONS_COMB").toggleEnable();
    $("#TECHO_MAXIMO").toggleEnable();
    $("#XUNIDAD_MEDIDA_TECHO_MAX").toggleEnable();
    $("#TECHO_CRUCERO").toggleEnable();
    $("#XUNIDAD_MEDIDA_TECHO_CRU").toggleEnable();
    $("#VELOCIDAD_MAXIMA").toggleEnable();
    $("#XUNIDAD_MEDIDA_VEL_MAX").toggleEnable();
    $("#VELOCIDAD_CRUCERO").toggleEnable();
    $("#XUNIDAD_MEDIDA_VEL_CRU").toggleEnable();
}
function enabledDivDatosDeclaracion() {
    $("#tblConformidad select").toggleEnable();
}

function gridPalasHelicesRegistro(data, contador) {
    $("#gridPalasHelicesRegistro").html("");
    var dataSource = new kendo.data.DataSource({
        pageSize: 20,
        autoSync: true,
        schema: {
            model: {
                id: "XPALA_HELICE_HELICOP_PA",
                fields: {
                    XPALA_HELICE_HELICOP_PA: { editable: false, nullable: true },
                    XHELICE_HELICOP_PA: { editable: false, nullable: true },
                    CONTADOR: { editable: false, nullable: false },
                    FECHA_INFORMACION: { type: "date", validation: { required: true, message: 'Seleccione Fecha de Información' } },
                    NUMERO_SERIE: { validation: { required: true, message: 'Ingrese el Numero de Parte' } },
                    XPOS_PALA_HELICOP_PA: { validation: { required: true, message: 'Ingrese el Numero de Parte' }, defaultValue: { XPOS_PALA_HELICOP_PA: 1, DESCRIPCION: "SUPERIOR" } },
                    NUMERO_PARTE: { type: "number", validation: { required: true, message: 'Ingrese el Numero de Parte' } },
                    VIDA_UTIL: { type: "date", validation: { required: true, message: 'Seleccione la fecha de vida útil' } },
                    VIDA_LIMITE_HORAS: { type: "number", validation: { required: true, message: 'Ingrese la vida limite (horas)' } },
                    VIDA_LIMITE_CICLOS: { type: "number", validation: { required: true, message: 'Ingrese la vida limite (ciclos)' } },
                    FECHA_ULTIMO_OH: { type: "date", validation: { required: true, message: 'Seleccione Fecha de Ultimo OH' } },
                    TSO: { type: "number", validation: { required: true, message: 'Ingrese el TSO' } },
                    CSO: { type: "number", validation: { required: true, message: 'Ingrese el CSO' } },
                    TSN: { type: "number", validation: { required: true, message: 'Ingrese el TSN' } },
                    REMANENTE_HORAS: { type: "number", validation: { required: true, message: 'Ingrese el Remante' } },
                    REMANENTE_CICLOS: { type: "number", validation: { required: true, message: 'Ingrese el Remante' } },
                    REMANENTE_DIAS: { type: "number", validation: { required: true, message: 'Ingrese el Remante' } }
                }
            }
        }
    });

    $("#gridPalasHelicesRegistro").kendoGrid({
        dataSource: dataSource,
        height: 300,
        columns: [
            { field: "XPALA_HELICE_HELICOP_PA", hidden: true },
            { field: "XHELICE_HELICOP_PA", hidden: true },
            { field: "CONTADOR", title: "Nº", width: "90px" },
            { field: "FECHA_INFORMACION", title: "Fecha Información", format: "{0:dd/MM/yyyy}", width: "130px" },
            { field: "NUMERO_SERIE", title: "Numero Serie", width: "130px" },
            { field: "XPOS_PALA_HELICOP_PA", title: "Posicion", width: "180px", editor: categoryDropDownEditor, template: "#=XPOS_PALA_HELICOP_PA.DESCRIPCION#" },
            { field: "NUMERO_PARTE", title: "Numero Parte", width: "130px" },
            { field: "VIDA_UTIL", title: "Vida Útil", format: "{0:dd/MM/yyyy}", width: "130px" },
            { field: "VIDA_LIMITE_HORAS", title: "Vida Lim. (horas)", width: "130px" },
            { field: "VIDA_LIMITE_CICLOS", title: "Vida Lim. (ciclos)", width: "130px" },
            { field: "FECHA_ULTIMO_OH", title: "Fecha Ultimo OH", format: "{0:dd/MM/yyyy}" },
            { field: "TSO", title: "TSO", width: "130px" },
            { field: "CSO", title: "CSO", width: "130px" },
            { field: "TSN", title: "TSN", width: "130px" },
            { field: "REMANENTE_HORAS", title: "Remanente Horas", width: "130px" },
            { field: "REMANENTE_CICLOS", title: "Remanente Ciclos", width: "130px" },
            { field: "REMANENTE_DIAS", title: "Remanente Dias", width: "130px" }
        ],
        editable: true
    });

    if (data == "") {
        for (i = 1; i <= contador ; i++) {
            $("#gridPalasHelicesRegistro")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XPALA_HELICE_HELICOP_PA: "",
                            XHELICE_HELICOP_PA: "",
                            CONTADOR: i,
                            FECHA_INFORMACION: "",
                            NUMERO_SERIE: "",
                            XPOS_PALA_HELICOP_PA: { XPOS_PALA_HELICOP_PA: 1, DESCRIPCION: "SUPERIOR" },
                            NUMERO_PARTE: "",
                            VIDA_UTIL: "",
                            VIDA_LIMITE_HORAS: "",
                            VIDA_LIMITE_CICLOS: "",
                            FECHA_ULTIMO_OH: "",
                            TSO: "",
                            CSO: "",
                            TSN: "",
                            REMANENTE_HORAS: "",
                            REMANENTE_CICLOS: "",
                            REMANENTE_DIAS: ""
                        });
        }
    }
    else {
        $.each(data, function (index, item) {
            $("#txtNRO_PALAS").prop("readonly", true);
            $("#gridPalasHelicesRegistro")
                    .data("kendoGrid")
                    .dataSource
                    .insert({
                        XPALA_HELICE_HELICOP_PA: item.XPALA_HELICE_HELICOP_PA,
                        XHELICE_HELICOP_PA: item.XHELICE_HELICOP_PA,
                        CONTADOR: item.CONTADOR,
                        FECHA_INFORMACION: dateFormat(item.XFECHA_INFORMACION),
                        NUMERO_SERIE: item.NUMERO_SERIE,
                        XPOS_PALA_HELICOP_PA: { XPOS_PALA_HELICOP_PA: item.XPOS_PALA_HELICOP_PA, DESCRIPCION: item.DESCRIPCION_PALA, },
                        NUMERO_PARTE: item.NUMERO_PARTE,
                        VIDA_UTIL: dateFormat(item.XVIDA_UTIL),
                        VIDA_LIMITE_HORAS: item.VIDA_LIMITE_HORAS,
                        VIDA_LIMITE_CICLOS: item.VIDA_LIMITE_CICLOS,
                        FECHA_ULTIMO_OH: dateFormat(item.XFECHA_ULTIMO_OH),
                        TSO: item.TSO,
                        CSO: item.CSO,
                        TSN: item.TSN,
                        REMANENTE_HORAS: item.REMANENTE_HORAS,
                        REMANENTE_CICLOS: item.REMANENTE_CICLOS,
                        REMANENTE_DIAS: item.REMANENTE_DIAS
                    });

        });
    }
}


function validaHelicesHelicoptero() {
    var gridPalasHelicesRegistro = $("#gridPalasHelicesRegistro").data("kendoGrid").dataSource.data();
    var flgValidador = true;
    $.each(gridPalasHelicesRegistro, function (index, item) {
        console.log(item);
        if (fnValidaHelicesHelicoptero(item)) {
            var dataPala = {
                XPALA_HELICE_HELICOP_PA: "",
                XHELICE_HELICOP_PA: "",
                CONTADOR: i,
                FECHA_INFORMACION: "",
                NUMERO_SERIE: "",
                XPOS_PALA_HELICOP_PA: { XPOS_PALA_HELICOP_PA: 1, DESCRIPCION: "SUPERIOR" },
                NUMERO_PARTE: "",
                VIDA_UTIL: "",
                VIDA_LIMITE_HORAS: "",
                VIDA_LIMITE_CICLOS: "",
                FECHA_ULTIMO_OH: "",
                TSO: "",
                CSO: "",
                TSN: "",
                REMANENTE_HORAS: "",
                REMANENTE_CICLOS: "",
                REMANENTE_DIAS: ""
            }
            //objMotoresAjax.push(dataMotores);
        }
        else {
            flgValidador = false;
        }
    });

    return flgValidador;
}
function fnValidaHelicesHelicoptero(dataLista) {
    $(".valError").removeClass("valError");
    var flg = true;
    var message = "Item: " + dataLista.CONTADOR;

    if (dataLista.NUMERO_SERIE == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta ingresar el numero de serie";
    }
    if (dataLista.NUMERO_PARTE == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta ingresar el numero de parte";
    }
    if (dataLista.VIDA_UTIL == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar la fecha de vida útil";
    }
    if (dataLista.VIDA_LIMITE_HORAS == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar la vida limite de horas";
    }
    if (dataLista.VIDA_LIMITE_CICLOS == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar la vida limite de ciclos";
    }
    if (dataLista.FECHA_ULTIMO_OH == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar la fecha de último OH";
    }
    if (dataLista.TSO == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el TSO";
    }
    if (dataLista.CSO == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el CSO";
    }
    if (dataLista.TSN == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el TSN";
    }
    if (dataLista.REMANENTE_HORAS == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el remanente de horas";
    }
    if (dataLista.REMANENTE_CICLOS == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el remanente de ciclos";
    }
    if (dataLista.REMANENTE_DIAS == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el remanente de días";
    }

    if (flg) {
        $("#divErrorHelicePala").hide();
    }
    else {
        $("#divErrorHelicePala").show();
        $("#divErrorHelicePala").html('<strong>' + message + '</strong>');
    }

    return flg;
}