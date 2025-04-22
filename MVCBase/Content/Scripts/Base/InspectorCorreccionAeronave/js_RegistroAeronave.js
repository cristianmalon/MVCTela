$(document).ready(function () {
    $(window).load(function () {
        $("#FECHA_FABRICACION").kendoDatePicker();
        $("#FECHA_INFORMACION").kendoDatePicker();

        $("#FECHA_LIMITE_SN_MOTOR").kendoDatePicker();
        $("#FECHA_LIMITE_BO_MOTOR").kendoDatePicker();
        $("#FECHA_LIMITE_SO_MOTOR").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_MOTOR").kendoDatePicker();

        $("#FECHA_LIMITE_SN_HELICE").kendoDatePicker();
        $("#FECHA_LIMITE_BO_HELICE").kendoDatePicker();
        $("#FECHA_LIMITE_SO_HELICE").kendoDatePicker();
        $("#FECHA_ULTIMO_OH_HELICE").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_HELICE").kendoDatePicker();

        $("#FECHA_LIMITE_SN_TRENES").kendoDatePicker();
        $("#FECHA_LIMITE_BO_TRENES").kendoDatePicker();
        $("#FECHA_LIMITE_SO_TRENES").kendoDatePicker();
        $("#FECHA_ULTIMO_OH_TRENES").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_TRENES").kendoDatePicker();

        $("#FECHA_LIMITE_SN_HELICOP").kendoDatePicker();
        $("#FECHA_LIMITE_BO_HELICOP").kendoDatePicker();
        $("#FECHA_LIMITE_SO_HELICOP").kendoDatePicker();
        $("#FECHA_ULTIMO_OH_HELICOP").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_HELICOP").kendoDatePicker();

        $("#FECHA_LIMITE_SN_HELICOPPRI").kendoDatePicker();
        $("#FECHA_LIMITE_BO_HELICOPPRI").kendoDatePicker();
        $("#FECHA_LIMITE_SO_HELICOPPRI").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_HELICOPPRI").kendoDatePicker();

        $("#FECHA_LIMITE_SN_HELICOPCOLA").kendoDatePicker();
        $("#FECHA_LIMITE_BO_HELICOPCOLA").kendoDatePicker();
        $("#FECHA_LIMITE_SO_HELICOPCOLA").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_HELICOPCOLA").kendoDatePicker();

        $("#FECHA_TURNM_MOTOR").kendoDatePicker();
        $("#FECHA_CURM_MOTOR").kendoDatePicker();

        $("#FECHA_TURNM_HELICE").kendoDatePicker();

        $("#FECHA_TURNM_TRENES").kendoDatePicker();
        $("#FECHA_CURM_TRENES").kendoDatePicker();

        $("#FECHA_TURNM_HELICOP").kendoDatePicker();
        $("#FECHA_CURM_HELICOP").kendoDatePicker();

        $("#FECHA_TURNM").kendoDatePicker();
        $("#FECHA_CURM").kendoDatePicker();

        $("#XDATOS_UTIL_AERONAVE_PA").kendoMultiSelect().data("kendoMultiSelect");
        $("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").kendoMultiSelect().data("kendoMultiSelect");

        $("#XFABRICANTE_PA").kendoDropDownList({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            select: onSelectFabricante,
            filter: "contains",
            change: function (e) {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($("#XTIPO_AERONAVE_PA option:selected").val().trim().length != 0 && $("#XTIPO_AERONAVE_PA option:selected").val() != null) {
                        validHelicoptero();
                        console.log($("#XFABRICANTE_PA").data("kendoDropDownList").value());
                        if ($.trim($("#XFABRICANTE_PA").data("kendoDropDownList").value()) != "" && $("#XFABRICANTE_PA").data("kendoDropDownList").value() != null) {
                            $.ajax({
                                datatype: 'json',
                                url: '/Aeronave/datoTipoModelo',
                                type: 'POST',
                                contentType: "application/json",
                                data: JSON.stringify({
                                    XTIPOMODELO: $("#XTIPO_AERONAVE_PA option:selected").val(),
                                    XFABRICANTE: $.trim($("#XFABRICANTE_PA").data("kendoDropDownList").value())
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
                                        var multiselect = $("#XMODELO_PA").data("kendoDropDownList");
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
            },
        });

        $("#XMODELO_PA").kendoDropDownList({
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

        $("#XTIPO_SERVICIO_PA").kendoDropDownList({
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
        $("#FABRICANTE_MOTOR").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            select: onSelectFabricanteMotor,
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($.trim($("#FABRICANTE_MOTOR").data("kendoComboBox").value()) != "" && $("#FABRICANTE_MOTOR").data("kendoComboBox").value() != null) {
                        $.ajax({
                            datatype: 'json',
                            url: '/Aeronave/datoModeloMotor',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                XFABRICANTE: $.trim($("#FABRICANTE_MOTOR").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                                } else {
                                    var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                                    var lModelo = [];
                                    $.each(l_T_Genm_Modelo_PA, function (index, value) {
                                        var oModelo = {
                                            value: value.XMODELOPA,
                                            text: value.DESCRIPCION
                                        }
                                        lModelo.push(oModelo);
                                    });
                                    var multiselect = $("#MODELO_MOTOR").data("kendoComboBox");
                                    console.log(lModelo);
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
            },
        });
        $("#MODELO_MOTOR").kendoComboBox({
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
        $("#FABRICANTE_HELICES").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            select: onSelectFabricanteHelice,
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($.trim($("#FABRICANTE_HELICES").data("kendoComboBox").value()) != "" && $("#FABRICANTE_HELICES").data("kendoComboBox").value() != null) {
                        $.ajax({
                            datatype: 'json',
                            url: '/Aeronave/datoModeloHelice',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                XFABRICANTE: $.trim($("#FABRICANTE_HELICES").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                                } else {
                                    var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                                    var lModelo = [];
                                    $.each(l_T_Genm_Modelo_PA, function (index, value) {
                                        var oModelo = {
                                            value: value.XMODELOPA,
                                            text: value.DESCRIPCION
                                        }
                                        lModelo.push(oModelo);
                                    });
                                    var multiselect = $("#MODELO_HELICES").data("kendoComboBox");
                                    console.log(lModelo);
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
            },
        });
        $("#MODELO_HELICES").kendoComboBox({
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
        $("#MODELO_TRENES").kendoComboBox({
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
        $("#FABRICANTE_HELICOP").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            select: onSelectFabricanteHelicoptero,
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($.trim($("#FABRICANTE_HELICOP").data("kendoComboBox").value()) != "" && $("#FABRICANTE_HELICOP").data("kendoComboBox").value() != null) {
                        $.ajax({
                            datatype: 'json',
                            url: '/Aeronave/datoModeloHelicoptero',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                XFABRICANTE: $.trim($("#FABRICANTE_HELICOP").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                                } else {
                                    var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                                    var lModelo = [];
                                    $.each(l_T_Genm_Modelo_PA, function (index, value) {
                                        var oModelo = {
                                            value: value.XMODELOPA,
                                            text: value.DESCRIPCION
                                        }
                                        lModelo.push(oModelo);
                                    });
                                    var multiselect = $("#MODELO_HELICOP").data("kendoComboBox");
                                    console.log(lModelo);
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
            },
        });
        $("#MODELO_HELICOP").kendoComboBox({
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
        
        $(".dropdown-menu li a").click(function () {
            $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
            $(this).parents(".dropdown").find('.btn').val($(this).data('value'));

            var btnValue = $(this).attr("btn-value");
            var uniValue = $(this).attr("uni-value");

            $('#' + btnValue).attr("uni-value", uniValue);
        });

        $(".chValidaInspector").click(function () {
            var Observacion;
            var Fieldset;
            if ($(this).is(':checked')) {
                Observacion = $(this).attr("data-observacion");
                Fieldset = $(this).attr("data-fieldset");
                $("#" + Fieldset).removeClass("dhhBorder");
                $("#" + Fieldset).addClass("dhhBorderError");
                $("#" + Observacion).show();
            }
            else {
                Observacion = $(this).attr("data-observacion");
                Fieldset = $(this).attr("data-fieldset");
                $("#" + Fieldset).removeClass("dhhBorderError");
                $("#" + Fieldset).addClass("dhhBorder");
                $("#" + Observacion).hide();
            }
        });

        //Valores numericos
        $("#HORAS_AERONAVE_HORA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#HORAS_AERONAVE_MINUTO").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#HORAS_AERONAVE_SEGUNDO").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CICLOS_AERONAVE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        //valores nuemricos motor
        $("#TSN_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TBO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TSO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        //valores numericos helices
        $("#TSN_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TBO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TSO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        //valores numericos trenes
        $("#TSN_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TBO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TSO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        //valores numericos helicoptero
        $("#TSN_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TBO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TSO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        //valores numericos HELICOPPRItero rotor principal
        $("#TSN_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TBO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TSO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TSN_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TBO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TSO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#PESO_BASICO_VACIO").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_MAXIMO_DECOLAJE").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_OPERACIONAL_BASICO").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_MAXIMO_ATERRIZAJE").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_MAXIMO_TAXEO").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_MAXIMO_CERO_COMBUSTIBLE").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#CAPACIDAD_COMBUSTIBLE").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#CAPACIDAD_OXIGENO_TRIPULACION").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#CAPACIDAD_OXIGENO_PASAJEROS").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });

        $(".tabNext").click(function () {
            var valid = $(this).attr("valida-dato");
            var next = $(this).attr("next-tab");
            var flgNext = true;

            switch (valid) {
                case 'general':
                    break;
                case 'tecnicos':
                    break;
                case 'tecnicos_second':
                    break;
                case 'motores':
                    break;
                case 'helices':
                    break;
                case 'trenes':
                    if (validHelicoptero()) {
                        next = 'declaracion';
                    }
                    break;
                case 'helicopteros':
                    if (validHelicoptero()) {
                        next = 'declaracion';
                    }
                    break;
            }
            saveCorreccion(next);

        });

        $(".tabBack").click(function () {
            var back = $(this).attr("back-tab");
            switch (back) {
                case 'general':
                    break;
                case 'motores':
                    break;
                case 'helices':
                    break;
                case 'trenes':
                    break;
                case 'helicopteros':
                    if (validHelicoptero()) {
                        back = 'trenes';
                    }
                    break;
            }
            activaTab("tabRegAeronave", back);
        });

        $("#modifyMotorAeronave").click(function () { actionRegMotor('E'); });
        $("#modifyHelicesAeronave").click(function () { actionRegHelice('E'); });
        $("#modifyTrenesAeronave").click(function () { actionRegTrenes('E'); });
        $("#modifyHelicopAeronave").click(function () { actionRegHelicop('E'); });
        $("#modifyHelicopPriAeronave").click(function () { actionRegHelicopPri('E'); });
        $("#modifyHelicopColaAeronave").click(function () { actionRegHelicopCola('E'); });
        $("#XTIPO_AERONAVE_PA").change(function () { validHelicoptero(); })
        validHelicoptero();
        valConformidadAsigna();
        if ($("#XAERONAVE_PA").val() == "") {
            //carga motores
            gridMotorAeronave("");
            //carga helices
            gridHelicesAeronave("");
            //carga trenes
            gridTrenesAeronave("");
            //carga helicoptero
            gridHelicopAeronave("");
        }
        else {
            datosGrillas();
        }
        datosCorreccion();
        disabledDivDatosGenerales();
        disabledDivDatosAeronave();
        disabledDivDatosSolicitante();
        disabledDivDatosTecnicos();
        disabledDivDatosTanques();
        disabledDivDatosAvionica();
        disabledDivDatosOperaciones();
        disabledDivDatosDeclaracion();
        $("#btnGuardarObservaciones").click(function () {
            if (validConformidad()) {
                var objConforAjax = [];
                saveCorreccion('fin');
            }
        });

        $("#gestionHeliceHelicoppAeronave").click(function () {
            gestionHeliceHelicop();
        });
        $("#btnEditHeliceHelicop").click(function () {
            EditHeliceHelicop();
        });
        $(".btnCancelarAeronave").click(function () {
            window.location = "/ConsultaBandejaInspectorPA/Index";
        });
    });
});
function EditHeliceHelicop() {

    var dataDetalle = $("#gridRegHeliceHelicop").data("kendoGrid");
    var itemData = dataDetalle.dataItem(dataDetalle.select());
    if (itemData != null) {
        $.ajax({
            datatype: 'json',
            url: '/Aeronave/dataHeliceDataHelicoptero',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                Index: itemData.XHELICE_HELICOP_PA
            }),
            beforeSend: function () {
                bloquoteObject()
            },
            success: function (data) {
                if (!data.rpta) {

                } else {
                    var l_Gend_Helice_Helicop_PA = data.l_Gend_Helice_Helicop_PA

                    $("#cbPosicionHeliceHelicop").find('option[value="' + l_Gend_Helice_Helicop_PA.XPOS_HELICE_HELICOP_PA + '"]').attr("selected", "selected");
                    if (l_Gend_Helice_Helicop_PA.FLG_ESTADO) {
                        $('#chESTADO_HELICE_HELICOP').prop("checked", true);
                    }
                    else {
                        $('#chESTADO_HELICE_HELICOP').prop("checked", false);
                    }
                    $("#txtNRO_PALAS").val(l_Gend_Helice_Helicop_PA.NRO_PALAS);
                    $("#XHELICE_HELICOP_PA_REG").val(l_Gend_Helice_Helicop_PA.XHELICE_HELICOP_PA);

                    gridPalasHelicesRegistro(data.l_Gend_Pala_Helice_Helicop_PA, l_Gend_Helice_Helicop_PA.NRO_PALAS);
                    $("#modalRegistroHelicopHelice").modal('show');
                }
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
            return datoflag;
        });
    }
    else {
        bootbox.alert("Seleccione un registro de la tabla de Helices");
    }
}
function gestionHeliceHelicop() {
    var dataDetalle = $("#gridHelicop").data("kendoGrid");
    var itemData = dataDetalle.dataItem(dataDetalle.select());
    if (itemData != null) {

        $.ajax({
            datatype: 'json',
            url: '/Aeronave/gridHeliceDataHelicoptero',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                Index: itemData.XHELICOPTERO_PA
            }),
            beforeSend: function () {
                bloquoteObject()
            },
            success: function (data) {
                if (!data.rpta) {

                } else {
                    var l_Gend_Helice_Helicop_PA = data.l_Gend_Helice_Helicop_PA;
                    var l_Mae_Pos_Helice_Helicop_PA = data.l_Mae_Pos_Helice_Helicop_PA;
                    gridHeliceHelicop(l_Gend_Helice_Helicop_PA);

                    $("#cbPosicionHeliceHelicop option").remove();
                    $("#cbPosicionHeliceHelicop").append("<option selected='selected' value=''>[SELECCIONE]</option>");

                    $.each(data.l_Mae_Pos_Helice_Helicop_PA, function (index, item) {
                        $("#cbPosicionHeliceHelicop").append("<option value='" + item.XPOS_HELICE_HELICOP_PA + "'>" + item.DESCRIPCION + "</option>");
                    });

                    //Abre Modal
                    $("#XHELICOPTERO_PA_HELICE_HELICOP").val(itemData.XHELICOPTERO_PA);
                    $("#modalHelicopHelice").modal('show');
                }
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
            return datoflag;
        });
    }
    else {
        $("#hdActionRegHelicop").val('');
        bootbox.alert("Seleccione un registro de la tabla de Trenes de Aterrizaje");
    }
}
function gridHeliceHelicop(data) {
    $("#gridRegHeliceHelicop").kendoGrid({
        dataSource: {
            data: data
        },
        sortable: true,
        resizable: true,
        selectable: "multiple",
        height: "400",
        columns: [{
            field: "XHELICE_HELICOP_PA",
            hidden: true
        },
                {
                    field: "XHELICE_HELICOP_PA",
                    hidden: true
                },
                {
                    field: "XHELICOPTERO_PA",
                    hidden: true
                },
                {
                    field: "XPOS_HELICE_HELICOP_PA",
                    hidden: true
                },
                {
                    field: "CONTADOR",
                    hidden: true
                },
                {
                    field: "DETALLE",
                    title: "Helice",
                },
                {
                    field: "NRO_PALAS",
                    title: "NRO PALAS",
                },
                {
                    field: "DETALLE_POSICION",
                    title: "Posición",
                },
                {
                    field: "DETALLE_ESTADO",
                    title: "Estado",
                }]
    });
}
function saveCorreccion(next) {
    var Correccion = [];
    var Eliminar = [];
    var chGeneral = $("#divGeneral").attr("data-checkbox");
    var obsGeneral = $("#" + chGeneral).attr("data-observacion");
    if ($("#" + chGeneral).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsGeneral + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divGeneral"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsGeneral + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divGeneral"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosAeronave").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosAeronave"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosAeronave"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosSolicitante").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosSolicitante"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosSolicitante"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosTecnicos").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosTecnicos"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosTecnicos"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosTanques").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosTanques"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosTanques"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosAvionica").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosAvionica"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosAvionica"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosOperaciones").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosOperaciones"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosOperaciones"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosMotores").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosMotores"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosMotores"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosHelices").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosHelices"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosHelices"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosTrenes").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosTrenes"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosTrenes"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosHelicopteros").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosHelicopteros"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosHelicopteros"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosHelicopPri").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosHelicopPri"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosHelicopPri"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosHelicopCola").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosHelicopCola"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosHelicopCola"
        }
        Eliminar.push(oCorreccion);
    }

    var chDatosAeronave = $("#divDatosDeclaracion").attr("data-checkbox");
    var obsDatosAeronave = $("#" + chDatosAeronave).attr("data-observacion");
    if ($("#" + chDatosAeronave).is(':checked')) {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosDeclaracion"
        }
        Correccion.push(oCorreccion);
    }
    else {
        var oCorreccion = {
            XAERONAVEPA: $("#XAERONAVE_PA").val(),
            XINSPECTOR: $("#XINSPECTOR").val(),
            MENSAJE: $("#" + obsDatosAeronave + " textarea").val(),
            CORREGIDO: 0,
            DETDIV: "divDatosDeclaracion"
        }
        Eliminar.push(oCorreccion);
    }

    $.ajax({
        datatype: 'json',
        url: '/InspectorCorreccionAeronave/SaveCorreccion',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            Correccion: Correccion, Eliminar: Eliminar
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorDatosGeneralesAjax", "ulListaDeclaracion", data.errores);
            } else {
                activaTab("tabRegAeronave", next);
                if (next == "fin") {
                    bootbox.alert("Las observaciones estan completamente registradas!", function () {
                        window.location = "/ConsultaBandejaInspectorPA/Index";
                    });
                }
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function onSelectFabricanteHelice(e) {
    var dataItem = this.dataItem(e.item);
    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Aeronave/datoModeloHelice',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XFABRICANTE: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                } else {
                    var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                    var lModelo = [];
                    $.each(l_T_Genm_Modelo_PA, function (index, value) {
                        var oModelo = {
                            value: value.XMODELOPA,
                            text: value.DESCRIPCION
                        }
                        lModelo.push(oModelo);
                    });
                    var multiselect = $("#MODELO_HELICES").data("kendoComboBox");
                    console.log(lModelo);
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
function onSelectFabricanteHelicoptero(e) {
    var dataItem = this.dataItem(e.item);
    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Aeronave/datoModeloHelicoptero',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XFABRICANTE: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                } else {
                    var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                    var lModelo = [];
                    $.each(l_T_Genm_Modelo_PA, function (index, value) {
                        var oModelo = {
                            value: value.XMODELOPA,
                            text: value.DESCRIPCION
                        }
                        lModelo.push(oModelo);
                    });
                    var multiselect = $("#MODELO_HELICOP").data("kendoComboBox");
                    console.log(lModelo);
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

function onSelectFabricanteMotor(e) {
    var dataItem = this.dataItem(e.item);
    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Aeronave/datoModeloMotor',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XFABRICANTE: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                } else {
                    var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                    var lModelo = [];
                    $.each(l_T_Genm_Modelo_PA, function (index, value) {
                        var oModelo = {
                            value: value.XMODELOPA,
                            text: value.DESCRIPCION
                        }
                        lModelo.push(oModelo);
                    });
                    var multiselect = $("#MODELO_MOTOR").data("kendoComboBox");
                    console.log(lModelo);
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
function onSelectFabricante(e) {
    var dataItem = this.dataItem(e.item);
    if ($("#XTIPO_AERONAVE_PA option:selected").val().trim().length != 0 && $("#XTIPO_AERONAVE_PA option:selected").val() != null) {
        if (dataItem.value != "" && dataItem.value != null) {
            $.ajax({
                datatype: 'json',
                url: '/Aeronave/datoTipoModelo',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    XTIPOMODELO: $("#XTIPO_AERONAVE_PA option:selected").val(), XFABRICANTE: dataItem.value
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

                        var multiselect = $("#XMODELO_PA").data("kendoDropDownList");
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
function SelectModeloMotor(Fabricante, e) {
    $.ajax({
        datatype: 'json',
        url: '/Aeronave/datoModeloMotor',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XFABRICANTE: Fabricante
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {

            if (!data.rpta) {
                errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
            } else {
                var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                var lModelo = [];
                $.each(l_T_Genm_Modelo_PA, function (index, value) {
                    var oModelo = {
                        value: value.XMODELOPA,
                        text: value.DESCRIPCION
                    }
                    lModelo.push(oModelo);
                });
                var multiselect = $("#MODELO_MOTOR").data("kendoComboBox");
                multiselect.setDataSource(lModelo);
                multiselect.value(e);
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function SelectModeloHelice(Fabricante, e) {
    $.ajax({
        datatype: 'json',
        url: '/Aeronave/datoModeloHelice',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XFABRICANTE: Fabricante
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {

            if (!data.rpta) {
                errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
            } else {
                var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                var lModelo = [];
                $.each(l_T_Genm_Modelo_PA, function (index, value) {
                    var oModelo = {
                        value: value.XMODELOPA,
                        text: value.DESCRIPCION
                    }
                    lModelo.push(oModelo);
                });
                var multiselect = $("#MODELO_HELICES").data("kendoComboBox");
                multiselect.setDataSource(lModelo);
                multiselect.value(e);
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function SelectModeloHelicoptero(Fabricante, e) {
    $.ajax({
        datatype: 'json',
        url: '/Aeronave/datoModeloHelicoptero',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XFABRICANTE: Fabricante
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {

            if (!data.rpta) {
                errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
            } else {
                var l_T_Genm_Modelo_PA = data.l_T_Genm_Modelo_PA;

                var lModelo = [];
                $.each(l_T_Genm_Modelo_PA, function (index, value) {
                    var oModelo = {
                        value: value.XMODELOPA,
                        text: value.DESCRIPCION
                    }
                    lModelo.push(oModelo);
                });
                var multiselect = $("#MODELO_HELICOP").data("kendoComboBox");
                multiselect.setDataSource(lModelo);
                multiselect.value(e);
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function datosCorreccion() {
    $.ajax({
        datatype: 'json',
        url: '/InspectorCorreccionAeronave/datoCorreccion',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XAERONAVEPA: $("#XAERONAVE_PA").val()
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {

            if (!data.rpta) {
                errorAddModelo("divErrorDatosGeneralesAjax", "ulListaDeclaracion", data.errores);
            } else {
                var l_Genm_Correccion_PA = data.l_Genm_Correccion_PA;
                $.each(l_Genm_Correccion_PA, function (key, value) {
                    var divDato = value.DETDIV;
                    var divMessage = value.MENSAJE;
                    var chDato = $("#" + divDato).attr("data-checkbox");
                    var obsDatosAeronave = $("#" + chDato).attr("data-observacion");
                    $("#" + chDato).prop("checked", true);
                    $("#" + divDato).removeClass("dhhBorder");
                    $("#" + divDato).addClass("dhhBorderError");
                    $("#" + obsDatosAeronave).show();
                    $("#" + obsDatosAeronave + " textarea").val(divMessage);
                });
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function datosGrillas() {
    $.ajax({
        datatype: 'json',
        url: '/Aeronave/grillasAeronave',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            grillasAeronave: $("#XAERONAVE_PA").val(), varDatoTec: $("#XDATOS_TEC_AERONAVE_PA").val()
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorDatosGeneralesAjax", "ulListaDeclaracion", data.errores);
            } else {
                var grillaMotor = data.l_Genm_Motor_Aeronave_PA;
                var grillaHelices = data.l_Genm_Helices_PA;
                var grillaTrenes = data.l_Genm_Trenes_PA;
                var grillaHelicoptero = data.l_Genm_Helicoptero_PA;

                var grillaHelicopteroPri = data.l_Gend_HelicopRotorPri_PA;
                var grillaHelicopteroCola = data.l_Gend_HelicopRotorCola_PA;

                $("#XDATOS_UTIL_AERONAVE_PA").data("kendoMultiSelect").value(data.varDatoUtil.split(","));
                //carga motores
                gridMotorAeronave(grillaMotor);
                //carga helices
                gridHelicesAeronave(grillaHelices);
                //carga trenes
                gridTrenesAeronave(grillaTrenes);
                //carga helicoptero
                gridHelicopAeronave(grillaHelicoptero);
                //carga helicop rotor principal
                gridHelicopPriAeronave(grillaHelicopteroPri);
                //carga helicop rotor cola
                gridHelicopColaAeronave(grillaHelicopteroCola);

            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}


function validConformidad() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");
    $("#tblConformidad select").each(function () {
        var ident = $(this).attr("identificador");
        if ($("#cbDecla_" + ident + "  option:selected").val() == "") {
            flg = false;
            errorObject("cbDecla_" + ident);
        }
    });
    if (flg) {
        $("#divErrorDeclaracion").hide();
    }
    else {
        $("#divErrorDeclaracion").html('<strong>Debe seleccionar todas las opciones</strong>');
    }

    return flg;
}

function valConformidadAsigna() {
    $("#tblConformidad select").each(function () {
        var ident = $(this).attr("identificador");
        $("#cbDecla_" + ident).find('option[value="' + $("#hdTipoLeyenda_" + ident).val() + '"]').attr("selected", "selected");
    });
}

//Funcion valida atributos para helicopteros
function validHelicoptero() {
    if ($("#XVALIDHELICOPTERO").val() == $("#XTIPO_AERONAVE_PA option:selected").val()) {
        $(".datoElicoptero").show();
        return false;
    }
    else {
        $(".datoElicoptero").hide();
        return true;
    }
}

//Function grid Trenes
function gridTrenesAeronave(dataTrenes) {
    $("#gridTrenes").kendoGrid({
        sortable: true,
        resizable: true,
        dataSource: {
            data: dataTrenes
        },
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XTRENES_PA",
                    hidden: true
                },
                {
                    field: "XPOSICION_TRENES_PA",
                    hidden: true
                },
                {
                    field: "XMODELO_PA",
                    hidden: true
                },
                {
                    field: "XTIPO_TRENES_PA",
                    hidden: true
                },
                {
                    field: "NUMERO_SERIE",
                    title: "Número Serie",
                    width: 150
                }, {
                    field: "NUMERO_PARTE",
                    title: "Nume. Parte",
                    width: 150
                }, {
                    field: "DESCRIPCION_TIPO",
                    title: "Tipo",
                    width: 150
                }, {
                    field: "DESCRIPCION_MODELO",
                    title: "Modelo",
                    width: 150
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Fabricante",
                    width: 150
                }
            ]
        }, {
            title: "SN",
            columns: [{
                field: "TSN",
                title: "TSN",
                width: 70
            }, {
                field: "CSN",
                title: "CSN",
                width: 70
            }, {
                field: "FECHA_LIMITE_SN",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "BO",
            columns: [{
                field: "TBO",
                title: "TBO",
                width: 70
            }, {
                field: "CBO",
                title: "CBO",
                width: 70
            }, {
                field: "FECHA_LIMITE_BO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "SO",
            columns: [{
                field: "TSO",
                title: "TSO",
                width: 70
            }, {
                field: "CSO",
                title: "CSO",
                width: 70
            }, {
                field: "FECHA_LIMITE_SO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "Datos Técnicos",
            columns: [{
                field: "VIDA_LIMITE_HORAS",
                title: "Vida Limite Horas",
                width: 50
            }, {
                field: "VIDA_LIMITE_CICLO",
                title: "Vida Limite Horas",
                width: 50
            }, {
                field: "FECHA_VIDA_LIMITE",
                title: "Vida Limite Horas",
                width: 50
            }, {
                field: "FECHA_ULTIMO_OH",
                title: "Fec. Ultimo OH",
                width: 50
            }, {
                field: "REMANENTE_HORAS",
                title: "Remanente Hora",
                width: 50
            }, {
                field: "REMANENTE_CICLO",
                title: "Remanente Ciclo",
                width: 50
            }, {
                field: "REMANENTE_DIAS",
                title: "Remanente Dias",
                width: 50
            }, {
                field: "VIDA_LIMITE_MINUTO",
                title: "Vida Lim (Min)",
                width: 50
            }, {
                field: "TSN_MINUTO",
                title: "TSN (Min)",
                width: 50
            }, {
                field: "TBO_MINUTO",
                title: "TBO (Min)",
                width: 50
            }, {
                field: "TSO_MINUTO",
                title: "TSO (Min)",
                width: 50
            }, {
                field: "REMANENTE_MINUTO",
                title: "Remanente (Min)",
                width: 50
            }, {
                field: "FECHA_TURNM",
                title: "Fec. TURNM",
                width: 50
            }, {
                field: "FECHA_CURM",
                title: "Fec. CURNM",
                width: 50
            }]
        }]
    });
}

//Function Helices
function gridHelicesAeronave(dataHelices) {
    $("#gridHelices").kendoGrid({
        sortable: true,
        resizable: true,
        dataSource: {
            data: dataHelices
        },
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XHELICES_PA",
                    hidden: true
                },
                {
                    field: "XPOSICION_HELICES_PA",
                    hidden: true
                },
                {
                    field: "XMODELO_PA",
                    hidden: true
                },
                {
                    field: "XFABRICANTE_PA",
                    hidden: true
                },
                {
                    field: "NUMERO_SERIE",
                    title: "Número Serie",
                    width: 100
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Posición",
                    width: 150
                }, {
                    field: "DESCRIPCION_MODELO",
                    title: "Modelo",
                    width: 150
                }, {
                    field: "DESCRIPCION_FABRICANTE",
                    title: "Fabricante",
                    width: 150
                }
            ]
        }, {
            title: "SN",
            columns: [{
                field: "TSN",
                title: "TSN",
                width: 70
            }, {
                field: "CSN",
                title: "CSN",
                width: 70
            }, {
                field: "FECHA_LIMITE_SN",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "BO",
            columns: [{
                field: "TBO",
                title: "TBO",
                width: 70
            }, {
                field: "CBO",
                title: "CBO",
                width: 70
            }, {
                field: "FECHA_LIMITE_BO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "SO",
            columns: [{
                field: "TSO",
                title: "TSO",
                width: 70
            }, {
                field: "CSO",
                title: "CSO",
                width: 70
            }, {
                field: "FECHA_LIMITE_SO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "Datos Técnicos",
            columns: [{
                field: "VIDA_LIMITE_HORAS",
                title: "Vida Limite Horas",
                width: 50
            }, {
                field: "VIDA_LIMITE_CICLO",
                title: "Vida Limite Ciclo",
                width: 50
            }, {
                field: "FECHA_VIDA_LIMITE_HELICE",
                title: "Fecha Vida Limite",
                width: 50
            }, {
                field: "IDENTIFICADOR_DISCO_LIMITANTE",
                title: "Dico Limit.",
                width: 50
            }, {
                field: "REMANENTE_HORAS",
                title: "Remanente Horas",
                width: 50
            }, {
                field: "REMANENTE_CICLO",
                title: "Remanente ciclo",
                width: 50
            }, {
                field: "FECHA_ULTIMO_OH",
                title: "Fec. Ultim. OH",
                width: 50
            }, {
                field: "NUMERO_PARTE",
                title: "Nume. Parte",
                width: 50
            }, {
                field: "REMANENTE_DIAS",
                title: "Remante Días",
                width: 50
            }, {
                field: "TSN_MINUTO",
                title: "TSN (Min)",
                width: 50
            }, {
                field: "TBO_MINUTO",
                title: "TBO (Min)",
                width: 50
            }, {
                field: "TSO_MINUTO",
                title: "TSO (Min)",
                width: 50
            }, {
                field: "REMANENTE_MINUTO",
                title: "Remanente (Min)",
                width: 50
            }, {
                field: "FECHA_TURNM",
                title: "Fecha TURNM",
                width: 50
            }, {
                field: "VIDA_LIMITE_MINUTO",
                title: "Vida Lim. (Min)",
                width: 50
            }]

        }]
    });
}

//Funcion grilla motor
function gridMotorAeronave(dataMotor) {
    $("#gridMotores").kendoGrid({
        dataSource: {
            data: dataMotor
        },
        sortable: true,
        resizable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XMOTOR_AERONAVE_PA",
                    hidden: true
                },
                {
                    field: "XPOSICION_MOTOR_PA",
                    hidden: true
                },
                {
                    field: "XMODELO_PA",
                    hidden: true
                },
                {
                    field: "XFABRICANTE_PA",
                    hidden: true
                },
                {
                    field: "NUMERO_SERIE",
                    title: "Número Serie",
                    width: 100
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Posición",
                    width: 150
                }, {
                    field: "DESCRIPCION_MODELO",
                    title: "Modelo",
                    width: 150
                }, {
                    field: "DESCRIPCION_FABRICANTE",
                    title: "Fabricante",
                    width: 150
                }
            ]
        }, {
            title: "SN",
            columns: [{
                field: "TSN",
                title: "TSN",
                width: 70
            }, {
                field: "CSN",
                title: "CSN",
                width: 70
            }, {
                field: "FECHA_LIMITE_SN",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "BO",
            columns: [{
                field: "TBO",
                title: "TBO",
                width: 70
            }, {
                field: "CBO",
                title: "CBO",
                width: 70
            }, {
                field: "FECHA_LIMITE_BO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "SO",
            columns: [{
                field: "TSO",
                title: "TSO",
                width: 70
            }, {
                field: "CSO",
                title: "CSO",
                width: 70
            }, {
                field: "FECHA_LIMITE_SO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "Datos Técnicos",
            columns: [{
                field: "VIDA_LIMITE_HORAS",
                title: "Vida Limite Horas",
                width: 50
            }, {
                field: "VIDA_LIMITE_CICLO",
                title: "Vida Limite Ciclos",
                width: 50
            }, {
                field: "FECHA_VIDA_LIMITE",
                title: "Fecha Vida Limite",
                width: 50
            }, {
                field: "IDENTIFICADOR_DISCO_LIMITANTE",
                hidden: true
            }, {
                field: "REMANENTE_HORAS",
                title: "Remanente Horas",
                width: 50
            }, {
                field: "REMANENTE_CICLOS",
                title: "Remanente Ciclos",
                width: 50
            }, {
                field: "NUMERO_PARTE",
                title: "Nume. Parte",
                width: 50
            }, {
                field: "REMANENTE_DIAS",
                title: "Remante Dias",
                width: 50
            }, {
                field: "VIDA_LIMITE_MINUTO",
                title: "Vida Limite (Min.)",
                width: 50
            }, {
                field: "TSN_MINUTO",
                title: "TSN (Min)",
                width: 50
            }, {
                field: "TBO_MINUTO",
                title: "TBO (Min)",
                width: 50
            }, {
                field: "TSO_MINUTO",
                title: "TSO (Min)",
                width: 50
            }, {
                field: "REMANENTE_MINUTO",
                title: "Remanente (Min)",
                width: 50
            }, {
                field: "FECHA_TURNM",
                title: "Fec. TURNM",
                width: 50
            }, {
                field: "FECHA_CURM",
                title: "Fecha CURNM",
                width: 50
            }]
        }]
    });
}

//Funcion grilla Helicoptero
function gridHelicopAeronave(dataMotor) {
    $("#gridHelicop").kendoGrid({
        dataSource: {
            data: dataMotor
        },
        sortable: true,
        resizable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XHELICOPTERO_PA",
                    hidden: true
                }, {
                    field: "XPOSICION_HELICOPTERO_PA",
                    hidden: true
                }, {
                    field: "XMODELO_PA",
                    hidden: true
                }, {
                    field: "XFABRICANTE_PA",
                    hidden: true
                }, {
                    field: "XTIPO_HELICOPTERO_PA",
                    hidden: true
                }, {
                    field: "NUMERO_SERIE",
                    title: "Número Serie",
                    width: 150
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Posición",
                    width: 150
                }, {
                    field: "DESCRIPCION_MODELO",
                    title: "Modelo",
                    width: 150
                }, {
                    field: "DESCRIPCION_FABRICANTE",
                    title: "Fabricante",
                    width: 150
                }, {
                    field: "DESCRIPCION_TIPO",
                    title: "Tipo",
                    width: 150
                }
            ]
        }, {
            title: "SN",
            columns: [{
                field: "TSN",
                title: "TSN",
                width: 70
            }, {
                field: "CSN",
                title: "CSN",
                width: 70
            }, {
                field: "FECHA_LIMITE_SN",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "BO",
            columns: [{
                field: "TBO",
                title: "TBO",
                width: 70
            }, {
                field: "CBO",
                title: "CBO",
                width: 70
            }, {
                field: "FECHA_LIMITE_BO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "SO",
            columns: [{
                field: "TSO",
                title: "TSO",
                width: 70
            }, {
                field: "CSO",
                title: "CSO",
                width: 70
            }, {
                field: "FECHA_LIMITE_SO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "Datos Técnicos",
            columns: [{
                field: "VIDA_LIMITE_HORAS",
                title: "Vida Limite Hora",
                width: 100
            }, {
                field: "VIDA_LIMITE_CICLO",
                title: "Vida Limite Ciclo",
                width: 100
            }, {
                field: "FECHA_VIDA_LIMITE",
                title: "Fecha Vida Limite",
                width: 100
            }, {
                field: "FECHA_ULTIMO_OH",
                title: "Fec. Ultimo OH",
                width: 70
            }, {
                field: "REMANENTE_HORAS",
                title: "Remanente Horas",
                width: 100
            }, {
                field: "REMANENTE_CICLO",
                title: "Remanente Ciclo",
                width: 100
            }, {
                field: "REMANENTE_DIAS",
                title: "Remanente Dias",
                width: 100
            }, {
                field: "FECHA_TURNM",
                title: "Fecha TURNM",
                width: 100
            }, {
                field: "FECHA_CURM",
                title: "Fecha CURM",
                width: 100
            }, {
                field: "VIDA_LIMITE_MINUTO",
                title: "Vida Lim. (Min)",
                width: 100
            }, {
                field: "TSN_MINUTO",
                title: "TSN (Min)",
                width: 100
            }, {
                field: "TBO_MINUTO",
                title: "TBO (Min)",
                width: 100
            }, {
                field: "TSO_MINUTO",
                title: "TSO (Min)",
                width: 100
            }, {
                field: "REMANENTE_MINUTO",
                title: "Remanente (Min)",
                width: 100
            }]
        }]
    });
}

//Function grilla rotor principal
function gridHelicopPriAeronave(dataMotor) {
    $("#gridHelicopPri").kendoGrid({
        dataSource: {
            data: dataMotor
        },
        sortable: true,
        resizable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XHELICOP_ROTOR_PRI_PA",
                    hidden: true
                }, {
                    field: "XPOS_HC_ROTOR_PRI_PA",
                    hidden: true
                }, {
                    field: "NUMERO_SERIE",
                    title: "Número Serie",
                    width: 150
                }, {
                    field: "NUMERO_PARTE",
                    title: "Número Parte",
                    width: 150
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Posición",
                    width: 150
                }
            ]
        }, {
            title: "SN",
            columns: [{
                field: "TSN",
                title: "TSN",
                width: 70
            }, {
                field: "CSN",
                title: "CSN",
                width: 70
            }, {
                field: "FECHA_LIMITE_SN",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "BO",
            columns: [{
                field: "TBO",
                title: "TBO",
                width: 70
            }, {
                field: "CBO",
                title: "CBO",
                width: 70
            }, {
                field: "FECHA_LIMITE_BO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "SO",
            columns: [{
                field: "TSO",
                title: "TSO",
                width: 70
            }, {
                field: "CSO",
                title: "CSO",
                width: 70
            }, {
                field: "FECHA_LIMITE_SO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "Datos Técnicos",
            columns: [{
                field: "VIDA_LIMITE_HORAS",
                title: "Vida Limite Hora",
                width: 100
            }, {
                field: "VIDA_LIMITE_CICLO",
                title: "Vida Limite Ciclo",
                width: 100
            }, {
                field: "FECHA_VIDA_LIMITE",
                title: "Fecha Vida Limite",
                width: 100
            }, {
                field: "REMANENTE_HORAS",
                title: "Remanente Horas",
                width: 100
            }, {
                field: "REMANENTE_CICLO",
                title: "Remanente Ciclo",
                width: 100
            }]
        }]
    });
}

//Function grilla rotor cola
function gridHelicopColaAeronave(dataMotor) {
    $("#gridHelicopCola").kendoGrid({
        dataSource: {
            data: dataMotor
        },
        sortable: true,
        resizable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XHELICOP_ROTOR_COLA_PA",
                    hidden: true
                }, {
                    field: "XPOS_HC_ROTOR_COLA_PA",
                    hidden: true
                }, {
                    field: "NUMERO_SERIE",
                    title: "Número Serie",
                    width: 150
                }, {
                    field: "NUMERO_PARTE",
                    title: "Número Parte",
                    width: 150
                }, {
                    field: "DESCRIPCION_POSICION",
                    title: "Posición",
                    width: 150
                }
            ]
        }, {
            title: "SN",
            columns: [{
                field: "TSN",
                title: "TSN",
                width: 70
            }, {
                field: "CSN",
                title: "CSN",
                width: 70
            }, {
                field: "FECHA_LIMITE_SN",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "BO",
            columns: [{
                field: "TBO",
                title: "TBO",
                width: 70
            }, {
                field: "CBO",
                title: "CBO",
                width: 70
            }, {
                field: "FECHA_LIMITE_BO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "SO",
            columns: [{
                field: "TSO",
                title: "TSO",
                width: 70
            }, {
                field: "CSO",
                title: "CSO",
                width: 70
            }, {
                field: "FECHA_LIMITE_SO",
                title: "Fec. Limite",
                width: 100
            }]
        }, {
            title: "Datos Técnicos",
            columns: [{
                field: "VIDA_LIMITE_HORAS",
                title: "Vida Limite Hora",
                width: 100
            }, {
                field: "VIDA_LIMITE_CICLO",
                title: "Vida Limite Ciclo",
                width: 100
            }, {
                field: "FECHA_VIDA_LIMITE",
                title: "Fecha Vida Limite",
                width: 100
            }, {
                field: "REMANENTE_HORAS",
                title: "Remanente Horas",
                width: 100
            }, {
                field: "REMANENTE_CICLO",
                title: "Remanente Ciclo",
                width: 100
            }]
        }]
    });
}

//Eventos de registro para motores
function actionRegMotor(objAction) {
    switch (objAction) {
        case 'I':
            //LIMPIAR INPUTS
            $("#hdActionRegMotor").val('N');
            $("#XMOTOR_AERONAVE_PA").val('');
            $("#NUMERO_SERIE_MOTOR").val('');
            $("#TSN_MOTOR").val('');
            $("#CSN_MOTOR").val('');
            $("#TBO_MOTOR").val('');
            $("#CBO_MOTOR").val('');
            $("#TSO_MOTOR").val('');
            $("#CSO_MOTOR").val('');
            $("#VIDA_LIMITE_HORAS_MOTOR").val('');
            $("#VIDA_LIMITE_CICLO_MOTOR").val('');
            $("#REMANENTE_HORAS_MOTOR").val('');
            $("#REMANENTE_CICLOS_MOTOR").val('');
            $("#NUMERO_PARTE_MOTOR").val('');
            $("#REMANENTE_DIAS_MOTOR").val('');

            $("#VIDA_LIMITE_MINUTO_MOTOR").val('');
            $("#TSN_MINUTO_MOTOR").val('');
            $("#TBO_MINUTO_MOTOR").val('');
            $("#TSO_MINUTO_MOTOR").val('');
            $("#REMANENTE_MINUTO_MOTOR").val('');

            $("#FECHA_TURNM_MOTOR").val('');
            $("#FECHA_CURM_MOTOR").val('');

            $("#FECHA_VIDA_LIMITE_MOTOR").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_MOTOR").val('');
            $("#FECHA_LIMITE_BO_MOTOR").val('');
            $("#FECHA_LIMITE_SO_MOTOR").val('');

            $("#FECHA_TURNM_MOTOR").data('kendoDatePicker').value("");
            $("#FECHA_CURM_MOTOR").data('kendoDatePicker').value("");
            $("#FECHA_LIMITE_SN_MOTOR").data('kendoDatePicker').value("");
            $("#FECHA_LIMITE_BO_MOTOR").data('kendoDatePicker').value("");
            $("#FECHA_LIMITE_SO_MOTOR").data('kendoDatePicker').value("");


            //LIMPIAR COMBOS
            $("#FABRICANTE_MOTOR").data("kendoComboBox").value('');
            $("#MODELO_MOTOR").data("kendoComboBox").value('');
            $("#POSICION_MOTOR option:first").attr('selected', 'selected');

            var multi = $("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").data("kendoMultiSelect");
            multi.value([]);

            //Cierra Modal
            $("#modalMotorAeronave").modal('hide');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorMotor").html('<strong>No se puede grabar</strong><ul id="ulListaErrorMotor"></ul>');
            $("#divErrorMotor").hide();
            break;
        case 'N':
            //LIMPIAR INPUTS
            $("#hdActionRegMotor").val('N');
            $("#XMOTOR_AERONAVE_PA").val('');
            $("#XMOTOR_AERONAVE_PA").val('');
            $("#NUMERO_SERIE_MOTOR").val('');
            $("#TSN_MOTOR").val('');
            $("#CSN_MOTOR").val('');
            $("#TBO_MOTOR").val('');
            $("#CBO_MOTOR").val('');
            $("#TSO_MOTOR").val('');
            $("#CSO_MOTOR").val('');
            $("#REMANENTE_DIAS_MOTOR").val('');
            $("#VIDA_LIMITE_HORAS_MOTOR").val('');
            $("#VIDA_LIMITE_CICLO_MOTOR").val('');
            $("#FECHA_VIDA_LIMITE_MOTOR").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));
            $("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").val('');
            $("#REMANENTE_HORAS_MOTOR").val('');
            $("#REMANENTE_CICLOS_MOTOR").val('');

            $("#VIDA_LIMITE_MINUTO_MOTOR").val('');
            $("#TSN_MINUTO_MOTOR").val('');
            $("#TBO_MINUTO_MOTOR").val('');
            $("#TSO_MINUTO_MOTOR").val('');
            $("#REMANENTE_MINUTO_MOTOR").val('');

            $("#FECHA_TURNM_MOTOR").val('');
            $("#FECHA_CURM_MOTOR").val('');

            $("#NUMERO_PARTE_MOTOR").val('');

            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_MOTOR").val('');
            $("#FECHA_LIMITE_BO_MOTOR").val('');
            $("#FECHA_LIMITE_SO_MOTOR").val('');

            $("#FECHA_TURNM_MOTOR").data('kendoDatePicker').value("");
            $("#FECHA_CURM_MOTOR").data('kendoDatePicker').value("");
            $("#FECHA_LIMITE_SN_MOTOR").data('kendoDatePicker').value("");
            $("#FECHA_LIMITE_BO_MOTOR").data('kendoDatePicker').value("");
            $("#FECHA_LIMITE_SO_MOTOR").data('kendoDatePicker').value("");

            //LIMPIAR COMBOS
            $("#FABRICANTE_MOTOR").data("kendoComboBox").value('');
            $("#MODELO_MOTOR").data("kendoComboBox").value('');
            $("#POSICION_MOTOR option:first").attr('selected', 'selected');

            var multi = $("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").data("kendoMultiSelect");
            multi.value([]);
            //Abre Modal
            $("#modalMotorAeronave").modal('show');
            $(".valError").removeClass("valError");
            $("#divErrorMotor").html('<strong>No se puede grabar</strong><ul id="ulListaErrorMotor"></ul>');
            $("#divErrorMotor").hide();
            break;
        case 'E':
            var dataDetalle = $("#gridMotores").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());
            if (itemData != null) {
                //AGREGAR DATOS A INPUTS DESDE GRILLA
                //INPUTS
                $("#hdActionRegMotor").val('E');
                $("#XMOTOR_AERONAVE_PA").val(itemData.XMOTOR_AERONAVE_PA);
                $("#NUMERO_SERIE_MOTOR").val(itemData.NUMERO_SERIE);
                $("#TSN_MOTOR").val(itemData.TSN);
                $("#CSN_MOTOR").val(itemData.CSN);
                $("#TBO_MOTOR").val(itemData.TBO);
                $("#CBO_MOTOR").val(itemData.CBO);
                $("#TSO_MOTOR").val(itemData.TSO);
                $("#CSO_MOTOR").val(itemData.CSO);
                $("#REMANENTE_DIAS_MOTOR").val(itemData.REMANENTE_DIAS);

                $("#VIDA_LIMITE_HORAS_MOTOR").val(itemData.VIDA_LIMITE_HORAS);
                $("#VIDA_LIMITE_CICLO_MOTOR").val(itemData.VIDA_LIMITE_CICLO);
                $("#FECHA_VIDA_LIMITE_MOTOR").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));
                $("#FECHA_VIDA_LIMITE_MOTOR").focus();

                $("#FECHA_TURNM_MOTOR").data("kendoDatePicker").value(dateFormat(itemData.FECHA_TURNM));
                $("#FECHA_CURM_MOTOR").data("kendoDatePicker").value(dateFormat(itemData.FECHA_CURM));

                $("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").data("kendoMultiSelect").value(itemData.IDENTIFICADOR_DISCO_LIMITANTE.split(","));
                $("#REMANENTE_HORAS_MOTOR").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLOS_MOTOR").val(itemData.REMANENTE_CICLOS);
                $("#NUMERO_PARTE_MOTOR").val(itemData.NUMERO_PARTE);

                $("#VIDA_LIMITE_MINUTO_MOTOR").val(itemData.VIDA_LIMITE_MINUTO);
                $("#TSN_MINUTO_MOTOR").val(itemData.TSN_MINUTO);
                $("#TBO_MINUTO_MOTOR").val(itemData.TBO_MINUTO);
                $("#TSO_MINUTO_MOTOR").val(itemData.TSO_MINUTO);
                $("#REMANENTE_MINUTO_MOTOR").val(itemData.REMANENTE_MINUTO);

                //FECHAS
                $("#FECHA_LIMITE_SN_MOTOR").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SN));
                $("#FECHA_LIMITE_BO_MOTOR").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_BO));
                $("#FECHA_LIMITE_SO_MOTOR").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SO));

                //COMBOS
                $("#FABRICANTE_MOTOR").data("kendoComboBox").value(itemData.XFABRICANTE_PA);
                $("#MODELO_MOTOR").data("kendoComboBox").value('');

                SelectModeloMotor(itemData.XFABRICANTE_PA, itemData.XMODELO_PA)

                $("#POSICION_MOTOR").find('option[value="' + itemData.XPOSICION_MOTOR_PA + '"]').attr("selected", "selected");

                $("#FECHA_VIDA_LIMITE_MOTOR").focus();
                $("#FECHA_LIMITE_SN_MOTOR").focus();
                $("#FECHA_LIMITE_BO_MOTOR").focus();
                $("#FECHA_LIMITE_SO_MOTOR").focus();
                $(".valError").removeClass("valError");
                $("#divErrorMotor").html('<strong>No se puede grabar</strong><ul id="ulListaErrorMotor"></ul>');
                $("#divErrorMotor").hide();
                //Abre Modal
                $("#modalMotorAeronave").modal('show');
            }
            else {
                $("#hdActionRegMotor").val('');
                bootbox.alert("Seleccione un registro de la tabla de Motores");
            }
            break;
        case 'G':
            if ($("#hdActionRegMotor").val() == 'E') {
                var dataPuntosVuelo = $("#gridMotores").data("kendoGrid");
                var itemData = dataPuntosVuelo.dataItem(dataPuntosVuelo.select());
                if (itemData) {
                    if (validMotorReg()) {

                        itemData.set("XMOTOR_AERONAVE_PA", $("#XMOTOR_AERONAVE_PA").val());
                        itemData.set("XPOSICION_MOTOR_PA", $("#POSICION_MOTOR  option:selected").val());
                        itemData.set("XMODELO_PA", $("#MODELO_MOTOR").data("kendoComboBox").value());
                        itemData.set("XFABRICANTE_PA", $("#FABRICANTE_MOTOR").data("kendoComboBox").value());
                        itemData.set("DESCRIPCION_POSICION", $("#POSICION_MOTOR  option:selected").text());
                        itemData.set("DESCRIPCION_MODELO", $("#MODELO_MOTOR").data("kendoComboBox").text());
                        itemData.set("DESCRIPCION_FABRICANTE", $("#FABRICANTE_MOTOR").data("kendoComboBox").text());
                        itemData.set("NUMERO_SERIE", $("#NUMERO_SERIE_MOTOR").val());
                        itemData.set("TSN", $("#TSN_MOTOR").val());
                        itemData.set("CSN", $("#CSN_MOTOR").val());
                        itemData.set("TBO", $("#TBO_MOTOR").val());
                        itemData.set("CBO", $("#CBO_MOTOR").val());
                        itemData.set("TSO", $("#TSO_MOTOR").val());
                        itemData.set("CSO", $("#CSO_MOTOR").val());
                        itemData.set("VIDA_LIMITE_HORAS", $("#VIDA_LIMITE_HORAS_MOTOR").val());
                        itemData.set("VIDA_LIMITE_CICLO", $("#VIDA_LIMITE_CICLO_MOTOR").val());
                        itemData.set("FECHA_VIDA_LIMITE", $("#FECHA_VIDA_LIMITE_MOTOR").val());
                        itemData.set("IDENTIFICADOR_DISCO_LIMITANTE", KendoMultiselectValueStr($("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").data("kendoMultiSelect").value()));

                        itemData.set("FECHA_TURNM", $("#FECHA_TURNM_MOTOR").val());
                        itemData.set("FECHA_CURM", $("#FECHA_CURM_MOTOR").val());
                        itemData.set("REMANENTE_DIAS", $("#REMANENTE_DIAS_MOTOR").val());
                        itemData.set("REMANENTE_HORAS", $("#REMANENTE_HORAS_MOTOR").val());
                        itemData.set("REMANENTE_CICLOS", $("#REMANENTE_CICLOS_MOTOR").val());
                        itemData.set("FECHA_LIMITE_SN", $("#FECHA_LIMITE_SN_MOTOR").val());
                        itemData.set("FECHA_LIMITE_BO", $("#FECHA_LIMITE_BO_MOTOR").val());
                        itemData.set("FECHA_LIMITE_SO", $("#FECHA_LIMITE_SO_MOTOR").val());
                        itemData.set("NUMERO_PARTE", $("#NUMERO_PARTE_MOTOR").val());

                        itemData.set("VIDA_LIMITE_MINUTO", $("#VIDA_LIMITE_MINUTO_MOTOR").val());
                        itemData.set("TSN_MINUTO", $("#TSN_MINUTO_MOTOR").val());
                        itemData.set("TBO_MINUTO", $("#TBO_MINUTO_MOTOR").val());
                        itemData.set("TSO_MINUTO", $("#TSO_MINUTO_MOTOR").val());
                        itemData.set("REMANENTE_MINUTO", $("#REMANENTE_MINUTO_MOTOR").val());

                        actionRegMotor('I');
                    }
                }
            }
            else {
                if (validMotorReg()) {

                    $("#gridMotores")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XMOTOR_AERONAVE_PA: $("#XMOTOR_AERONAVE_PA").val(),
                            XPOSICION_MOTOR_PA: $("#POSICION_MOTOR  option:selected").val(),
                            XMODELO_PA: $("#MODELO_MOTOR").data("kendoComboBox").value(),
                            XFABRICANTE_PA: $("#FABRICANTE_MOTOR").data("kendoComboBox").value(),
                            DESCRIPCION_POSICION: $("#POSICION_MOTOR  option:selected").text(),
                            DESCRIPCION_MODELO: $("#MODELO_MOTOR").data("kendoComboBox").text(),
                            DESCRIPCION_FABRICANTE: $("#FABRICANTE_MOTOR").data("kendoComboBox").text(),
                            NUMERO_SERIE: $("#NUMERO_SERIE_MOTOR").val(),
                            TSN: $("#TSN_MOTOR").val(),
                            CSN: $("#CSN_MOTOR").val(),
                            TBO: $("#TBO_MOTOR").val(),
                            CBO: $("#CBO_MOTOR").val(),
                            TSO: $("#TSO_MOTOR").val(),
                            CSO: $("#CSO_MOTOR").val(),
                            VIDA_LIMITE_HORAS: $("#VIDA_LIMITE_HORAS_MOTOR").val(),
                            VIDA_LIMITE_CICLO: $("#VIDA_LIMITE_CICLO_MOTOR").val(),
                            FECHA_VIDA_LIMITE: $("#FECHA_VIDA_LIMITE_MOTOR").val(),
                            IDENTIFICADOR_DISCO_LIMITANTE: KendoMultiselectValueStr($("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").data("kendoMultiSelect").value()),
                            REMANENTE_HORAS: $("#REMANENTE_HORAS_MOTOR").val(),
                            REMANENTE_CICLOS: $("#REMANENTE_CICLOS_MOTOR").val(),
                            REMANENTE_DIAS: $("#REMANENTE_DIAS_MOTOR").val(),
                            FECHA_LIMITE_SN: $("#FECHA_LIMITE_SN_MOTOR").val(),
                            FECHA_LIMITE_BO: $("#FECHA_LIMITE_BO_MOTOR").val(),
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_MOTOR").val(),
                            NUMERO_PARTE: $("#NUMERO_PARTE_MOTOR").val(),
                            FECHA_TURNM: $("#FECHA_TURNM_MOTOR").val(),
                            FECHA_CURM: $("#FECHA_CURM_MOTOR").val(),
                            VIDA_LIMITE_MINUTO: $("#VIDA_LIMITE_MINUTO_MOTOR").val(),
                            TSN_MINUTO: $("#TSN_MINUTO_MOTOR").val(),
                            TBO_MINUTO: $("#TBO_MINUTO_MOTOR").val(),
                            TSO_MINUTO: $("#TSO_MINUTO_MOTOR").val(),
                            REMANENTE_MINUTO: $("#REMANENTE_MINUTO_MOTOR").val()
                        });
                    $("#modalMotorAeronave").modal('hide');
                }
            }
            break;
        case 'D':

            break;
    }
}
//Function de eventos para Helices
function actionRegHelice(objAction) {
    switch (objAction) {
        case 'I':
            //LIMPIAR INPUTS
            $("#hdActionRegHelice").val('N');
            $("#XHELICES_PA").val('');
            $("#NUMERO_SERIE_HELICES").val('');
            $("#TSN_HELICE").val('');
            $("#CSN_HELICE").val('');
            $("#TBO_HELICE").val('');
            $("#CBO_HELICE").val('');
            $("#TSO_HELICE").val('');
            $("#CSO_HELICE").val('');
            $("#VIDA_LIMITE_HORAS_HELICE").val('');
            $("#VIDA_LIMITE_CICLO_HELICE").val('');
            $("#FECHA_VIDA_LIMITE_HELICE").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));

            $("#FECHA_ULTIMO_OH_HELICE").val('');
            $("#REMANENTE_HORAS_HELICE").val('');
            $("#REMANENTE_CICLO_HELICE").val('');
            $("#REMANENTE_DIAS_HELICE").val('');

            $("#TSN_MINUTO_HELICE").val('');
            $("#TBO_MINUTO_HELICE").val('');
            $("#TSO_MINUTO_HELICE").val('');
            $("#REMANENTE_MINUTO_HELICE").val('');
            $("#FECHA_TURNM_HELICE").val('');
            $("#FECHA_TURNM_HELICE").data("kendoDatePicker").value("");

            $("#NUMERO_PARTE_HELICE").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICE").val('');
            $("#FECHA_LIMITE_BO_HELICE").val('');
            $("#FECHA_LIMITE_SO_HELICE").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICES option:first").attr('selected', 'selected');

            $("#FABRICANTE_HELICES").data("kendoComboBox").value('');
            $("#MODELO_HELICES").data("kendoComboBox").value('');

            //Cierra Modal
            $("#modalHelicesAeronave").modal('hide');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelice").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelice"></ul>');
            $("#divErrorHelice").hide();
            break;
        case 'N':
            //LIMPIAR INPUTS
            //LIMPIAR INPUTS
            $("#hdActionRegHelice").val('N');
            $("#XHELICES_PA").val('');
            $("#NUMERO_SERIE_HELICES").val('');
            $("#TSN_HELICE").val('');
            $("#CSN_HELICE").val('');
            $("#TBO_HELICE").val('');
            $("#CBO_HELICE").val('');
            $("#TSO_HELICE").val('');
            $("#CSO_HELICE").val('');
            $("#VIDA_LIMITE_HORAS_HELICE").val('');
            $("#VIDA_LIMITE_CICLO_HELICE").val('');
            $("#FECHA_VIDA_LIMITE_HELICE").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));

            $("#FECHA_ULTIMO_OH_HELICE").val('');
            $("#REMANENTE_HORAS_HELICE").val('');
            $("#REMANENTE_CICLO_HELICE").val('');
            $("#REMANENTE_DIAS_HELICE").val('');

            $("#VIDA_LIMITE_MINUTO_HELICE").val('');
            $("#TSN_MINUTO_HELICE").val('');
            $("#TBO_MINUTO_HELICE").val('');
            $("#TSO_MINUTO_HELICE").val('');
            $("#REMANENTE_MINUTO_HELICE").val('');
            $("#FECHA_TURNM_HELICE").val('');
            $("#FECHA_TURNM_HELICE").data("kendoDatePicker").value("");

            $("#NUMERO_PARTE_HELICE").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICE").val('');
            $("#FECHA_LIMITE_BO_HELICE").val('');
            $("#FECHA_LIMITE_SO_HELICE").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICES option:first").attr('selected', 'selected');

            $("#FABRICANTE_HELICES").data("kendoComboBox").value('');
            $("#MODELO_HELICES").data("kendoComboBox").value('');

            //Cierra Modal
            $("#modalHelicesAeronave").modal('show');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelice").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelice"></ul>');
            $("#divErrorHelice").hide();
            break;
        case 'E':
            var dataDetalle = $("#gridHelices").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());
            if (itemData != null) {
                //AGREGAR DATOS A INPUTS DESDE GRILLA
                //INPUTS
                $("#hdActionRegHelice").val('E');
                $("#XHELICES_PA").val(itemData.XHELICES_PA);
                $("#NUMERO_SERIE_HELICES").val(itemData.NUMERO_SERIE);
                $("#TSN_HELICE").val(itemData.TSN);
                $("#CSN_HELICE").val(itemData.CSN);
                $("#TBO_HELICE").val(itemData.TBO);
                $("#CBO_HELICE").val(itemData.CBO);
                $("#TSO_HELICE").val(itemData.TSO);
                $("#CSO_HELICE").val(itemData.CSO);
                $("#VIDA_LIMITE_HORAS_HELICE").val(itemData.VIDA_LIMITE_HORAS);
                $("#VIDA_LIMITE_CICLO_HELICE").val(itemData.VIDA_LIMITE_CICLO);
                $("#FECHA_VIDA_LIMITE_HELICE").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));

                $("#FECHA_ULTIMO_OH_HELICE").data("kendoDatePicker").value(dateFormat(itemData.FECHA_ULTIMO_OH));

                $("#REMANENTE_HORAS_HELICE").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLO_HELICE").val(itemData.REMANENTE_CICLO);
                $("#NUMERO_PARTE_HELICE").val(itemData.NUMERO_PARTE);
                $("#REMANENTE_DIAS_HELICE").val(itemData.REMANENTE_DIAS);

                $("#VIDA_LIMITE_MINUTO_HELICE").val(itemData.VIDA_LIMITE_MINUTO);
                $("#TSN_MINUTO_HELICE").val(itemData.TSN_MINUTO);
                $("#TBO_MINUTO_HELICE").val(itemData.TBO_MINUTO);
                $("#TSO_MINUTO_HELICE").val(itemData.TSO_MINUTO);
                $("#REMANENTE_MINUTO_HELICE").val(itemData.REMANENTE_MINUTO);
                $("#FECHA_TURNM_HELICE").data("kendoDatePicker").value(dateFormat(itemData.FECHA_TURNM));

                //FECHAS
                $("#FECHA_LIMITE_SN_HELICE").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SN));
                $("#FECHA_LIMITE_BO_HELICE").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_BO));
                $("#FECHA_LIMITE_SO_HELICE").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SO));

                $("#FABRICANTE_HELICES").data("kendoComboBox").value(itemData.XFABRICANTE_PA);
                $("#MODELO_HELICES").data("kendoComboBox").value('');

                SelectModeloHelice(itemData.XFABRICANTE_PA, itemData.XMODELO_PA);

                //COMBOS
                $("#POSICION_HELICES").find('option[value="' + itemData.XPOSICION_HELICES_PA + '"]').attr("selected", "selected");

                $(".valError").removeClass("valError");
                $("#divErrorHelice").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelice"></ul>');
                $("#divErrorHelice").hide();
                //Abre Modal
                $("#modalHelicesAeronave").modal('show');
            }
            else {
                $("#hdActionRegHelice").val('');
                bootbox.alert("Seleccione un registro de la tabla de Helices");
            }
            break;
        case 'G':
            if ($("#hdActionRegHelice").val() == 'E') {
                var dataPuntosVuelo = $("#gridHelices").data("kendoGrid");
                var itemData = dataPuntosVuelo.dataItem(dataPuntosVuelo.select());
                if (itemData) {
                    if (validHeliceReg()) {
                        itemData.set("XHELICES_PA", $("#XHELICES_PA").val());
                        itemData.set("XPOSICION_HELICES_PA", $("#POSICION_HELICES  option:selected").val());
                        itemData.set("XMODELO_PA", $("#MODELO_HELICES  option:selected").val());
                        itemData.set("XFABRICANTE_PA", $("#FABRICANTE_HELICES  option:selected").val());
                        itemData.set("DESCRIPCION_POSICION", $("#POSICION_HELICES  option:selected").text());
                        itemData.set("DESCRIPCION_MODELO", $("#MODELO_HELICES  option:selected").text());
                        itemData.set("DESCRIPCION_FABRICANTE", $("#FABRICANTE_HELICES  option:selected").text());
                        itemData.set("NUMERO_SERIE", $("#NUMERO_SERIE_HELICES").val());
                        itemData.set("TSN", $("#TSN_HELICE").val());
                        itemData.set("CSN", $("#CSN_HELICE").val());
                        itemData.set("TBO", $("#TBO_HELICE").val());
                        itemData.set("CBO", $("#CBO_HELICE").val());
                        itemData.set("TSO", $("#TSO_HELICE").val());
                        itemData.set("CSO", $("#CSO_HELICE").val());
                        itemData.set("VIDA_LIMITE_HORAS", $("#VIDA_LIMITE_HORAS_HELICE").val());
                        itemData.set("VIDA_LIMITE_CICLO", $("#VIDA_LIMITE_CICLO_HELICE").val());
                        itemData.set("FECHA_VIDA_LIMITE", $("#FECHA_INFORMACION").val());
                        itemData.set("REMANENTE_DIAS", $("#REMANENTE_DIAS_HELICE").val());
                        itemData.set("FECHA_ULTIMO_OH", $("#FECHA_ULTIMO_OH_HELICE").val());
                        itemData.set("REMANENTE_HORAS", $("#REMANENTE_HORAS_HELICE").val());
                        itemData.set("REMANENTE_CICLO", $("#REMANENTE_CICLO_HELICE").val());
                        itemData.set("NUMERO_PARTE", $("#NUMERO_PARTE_HELICE").val());
                        itemData.set("FECHA_LIMITE_SN", $("#FECHA_LIMITE_SN_HELICE").val());
                        itemData.set("FECHA_LIMITE_BO", $("#FECHA_LIMITE_BO_HELICE").val());
                        itemData.set("FECHA_LIMITE_SO", $("#FECHA_LIMITE_SO_HELICE").val());

                        itemData.set("VIDA_LIMITE_MINUTO", $("#VIDA_LIMITE_MINUTO_HELICE").val());
                        itemData.set("TSN_MINUTO", $("#TSN_MINUTO_HELICE").val());
                        itemData.set("TBO_MINUTO", $("#TBO_MINUTO_HELICE").val());
                        itemData.set("TSO_MINUTO", $("#TSO_MINUTO_HELICE").val());
                        itemData.set("REMANENTE_MINUTO", $("#REMANENTE_MINUTO_HELICE").val());
                        itemData.set("FECHA_TURNM", $("#FECHA_TURNM_HELICE").val());

                        actionRegHelice('I');
                    }
                }
            }
            else {
                if (validHeliceReg()) {
                    $("#gridHelices")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XHELICES_PA: $("#XHELICES_PA").val(),
                            XPOSICION_HELICES_PA: $("#POSICION_HELICES  option:selected").val(),
                            XMODELO_PA: $("#MODELO_HELICES  option:selected").val(),
                            XFABRICANTE_PA: $("#FABRICANTE_HELICES  option:selected").val(),
                            DESCRIPCION_POSICION: $("#POSICION_HELICES  option:selected").text(),
                            DESCRIPCION_MODELO: $("#MODELO_HELICES  option:selected").text(),
                            DESCRIPCION_FABRICANTE: $("#FABRICANTE_HELICES  option:selected").text(),
                            NUMERO_SERIE: $("#NUMERO_SERIE_HELICES").val(),
                            TSN: $("#TSN_HELICE").val(),
                            CSN: $("#CSN_HELICE").val(),
                            TBO: $("#TBO_HELICE").val(),
                            CBO: $("#CBO_HELICE").val(),
                            TSO: $("#TSO_HELICE").val(),
                            CSO: $("#CSO_HELICE").val(),
                            VIDA_LIMITE_HORAS: $("#VIDA_LIMITE_HORAS_HELICE").val(),
                            VIDA_LIMITE_CICLO: $("#VIDA_LIMITE_CICLO_HELICE").val(),
                            FECHA_VIDA_LIMITE: $("#FECHA_INFORMACION").val(),
                            FECHA_ULTIMO_OH: $("#FECHA_ULTIMO_OH_HELICE").val(),
                            REMANENTE_HORAS: $("#REMANENTE_HORAS_HELICE").val(),
                            REMANENTE_CICLO: $("#REMANENTE_CICLO_HELICE").val(),
                            REMANENTE_DIAS: $("#REMANENTE_DIAS_HELICE").val(),
                            NUMERO_PARTE: $("#NUMERO_PARTE_HELICE").val(),
                            FECHA_LIMITE_SN: $("#FECHA_LIMITE_SN_HELICE").val(),
                            FECHA_LIMITE_BO: $("#FECHA_LIMITE_BO_HELICE").val(),
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_HELICE").val(),

                            VIDA_LIMITE_MINUTO: $("#VIDA_LIMITE_MINUTO_HELICE").val(),
                            TSN_MINUTO: $("#TSN_MINUTO_HELICE").val(),
                            TBO_MINUTO: $("#TBO_MINUTO_HELICE").val(),
                            TSO_MINUTO: $("#TSO_MINUTO_HELICE").val(),
                            REMANENTE_MINUTO: $("#REMANENTE_MINUTO_HELICE").val(),
                            FECHA_TURNM: $("#FECHA_TURNM_HELICE").val()
                        });
                    actionRegHelice('I');
                }
            }
            break;
        case 'D':

            break;
    }
}
//Function de eventos para Trenes
function actionRegTrenes(objAction) {
    switch (objAction) {
        case 'I':
            //LIMPIAR INPUTS
            $("#hdActionRegTrenes").val('N');
            $("#XTRENES_PA").val('');
            $("#NUMERO_SERIE_TRENES").val('');
            $("#TSN_TRENES").val('');
            $("#CSN_TRENES").val('');
            $("#TBO_TRENES").val('');
            $("#CBO_TRENES").val('');
            $("#TSO_TRENES").val('');
            $("#CSO_TRENES").val('');
            $("#VIDA_LIMITE_HORAS_TRENES").val('');
            $("#VIDA_LIMITE_CICLO_TRENES").val('');
            $("#FECHA_VIDA_LIMITE_TRENES").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));

            $("#FECHA_ULTIMO_OH_TRENES").val('');
            $("#REMANENTE_HORAS_TRENES").val('');
            $("#REMANENTE_CICLO_TRENES").val('');
            $("#REMANENTE_DIAS_TRENES").val('');

            $("#NUMERO_PARTE_TRENES").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_TRENES").val('');
            $("#FECHA_LIMITE_BO_TRENES").val('');
            $("#FECHA_LIMITE_SO_TRENES").val('');
            //LIMPIAR COMBOS
            $("#POSICION_TRENES option:first").attr('selected', 'selected');
            $("#TIPO_TRENES option:first").attr('selected', 'selected');

            $("#MODELO_TRENES").data("kendoComboBox").value('');
            $("#VIDA_LIMITE_MINUTO_TRENES").val('');
            $("#TSN_MINUTO_TRENES").val('');
            $("#TBO_MINUTO_TRENES").val('');
            $("#TSO_MINUTO_TRENES").val('');
            $("#REMANENTE_MINUTO_TRENES").val('');
            $("#FECHA_TURNM_TRENES").val('');
            $("#FECHA_CURM_TRENES").val('');

            $("#FECHA_LIMITE_SN_TRENES").data("kendoDatePicker").value("");
            $("#FECHA_LIMITE_BO_TRENES").data("kendoDatePicker").value("");
            $("#FECHA_LIMITE_SO_TRENES").data("kendoDatePicker").value("");
            $("#FECHA_TURNM_TRENES").data("kendoDatePicker").value("");
            $("#FECHA_CURM_TRENES").data("kendoDatePicker").value("");

            //Cierra Modal
            $("#modalTrenesAeronave").modal('hide');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorTrenes").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTrenes"></ul>');
            $("#divErrorTrenes").hide();
            break;
        case 'N':
            //LIMPIAR INPUTS
            //LIMPIAR INPUTS
            $("#hdActionRegTrenes").val('N');
            $("#XTRENES_PA").val('');
            $("#NUMERO_SERIE_TRENES").val('');
            $("#TSN_TRENES").val('');
            $("#CSN_TRENES").val('');
            $("#TBO_TRENES").val('');
            $("#CBO_TRENES").val('');
            $("#TSO_TRENES").val('');
            $("#CSO_TRENES").val('');
            $("#VIDA_LIMITE_HORAS_TRENES").val('');
            $("#VIDA_LIMITE_CICLO_TRENES").val('');
            $("#FECHA_VIDA_LIMITE_TRENES").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));
            $("#FECHA_ULTIMO_OH_TRENES").val('');
            $("#REMANENTE_HORAS_TRENES").val('');
            $("#REMANENTE_CICLO_TRENES").val('');
            $("#REMANENTE_DIAS_TRENES").val('');

            $("#NUMERO_PARTE_TRENES").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_TRENES").val('');
            $("#FECHA_LIMITE_BO_TRENES").val('');
            $("#FECHA_LIMITE_SO_TRENES").val('');

            $("#MODELO_TRENES").data("kendoComboBox").value('');
            $("#VIDA_LIMITE_MINUTO_TRENES").val('');
            $("#TSN_MINUTO_TRENES").val('');
            $("#TBO_MINUTO_TRENES").val('');
            $("#TSO_MINUTO_TRENES").val('');
            $("#REMANENTE_MINUTO_TRENES").val('');
            $("#FECHA_TURNM_TRENES").val('');
            $("#FECHA_CURM_TRENES").val('');

            $("#FECHA_LIMITE_SN_TRENES").data("kendoDatePicker").value("");
            $("#FECHA_LIMITE_BO_TRENES").data("kendoDatePicker").value("");
            $("#FECHA_LIMITE_SO_TRENES").data("kendoDatePicker").value("");
            $("#FECHA_TURNM_TRENES").data("kendoDatePicker").value("");
            $("#FECHA_CURM_TRENES").data("kendoDatePicker").value("");

            //LIMPIAR COMBOS
            $("#POSICION_TRENES option:first").attr('selected', 'selected');
            $("#TIPO_TRENES option:first").attr('selected', 'selected');
            //Cierra Modal
            $("#modalTrenesAeronave").modal('show');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorTrenes").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTrenes"></ul>');
            $("#divErrorTrenes").hide();
            break;
        case 'E':
            var dataDetalle = $("#gridTrenes").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());
            if (itemData != null) {
                //AGREGAR DATOS A INPUTS DESDE GRILLA
                //INPUTS
                $(".valError").removeClass("valError");
                $("#divErrorTrenes").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTrenes"></ul>');
                $("#divErrorTrenes").hide();

                $("#hdActionRegTrenes").val('E');
                $("#XTRENES_PA").val(itemData.XTRENES_PA);
                $("#NUMERO_SERIE_TRENES").val(itemData.NUMERO_SERIE);
                $("#TSN_TRENES").val(itemData.TSN);
                $("#CSN_TRENES").val(itemData.CSN);
                $("#TBO_TRENES").val(itemData.TBO);
                $("#CBO_TRENES").val(itemData.CBO);
                $("#TSO_TRENES").val(itemData.TSO);
                $("#CSO_TRENES").val(itemData.CSO);
                $("#VIDA_LIMITE_HORAS_TRENES").val(itemData.VIDA_LIMITE_HORAS);
                $("#VIDA_LIMITE_CICLO_TRENES").val(itemData.VIDA_LIMITE_CICLO);

                $("#FECHA_ULTIMO_OH_TRENES").data("kendoDatePicker").value(dateFormat(itemData.FECHA_ULTIMO_OH));

                $("#FECHA_VIDA_LIMITE_TRENES").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));

                $("#MODELO_TRENES").data("kendoComboBox").value(itemData.XMODELO_PA);
                $("#VIDA_LIMITE_MINUTO_TRENES").val(itemData.VIDA_LIMITE_MINUTO);
                $("#TSN_MINUTO_TRENES").val(itemData.TSN_MINUTO);
                $("#TBO_MINUTO_TRENES").val(itemData.TBO_MINUTO);
                $("#TSO_MINUTO_TRENES").val(itemData.TSO_MINUTO);
                $("#REMANENTE_MINUTO_TRENES").val(itemData.REMANENTE_MINUTO);
                $("#FECHA_TURNM_TRENES").val(itemData.FECHA_TURNM);
                $("#FECHA_CURM_TRENES").data("kendoDatePicker").value(dateFormat(itemData.FECHA_CURM));

                $("#REMANENTE_HORAS_TRENES").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLO_TRENES").val(itemData.REMANENTE_CICLO);
                $("#REMANENTE_DIAS_TRENES").val(itemData.REMANENTE_DIAS);

                $("#NUMERO_PARTE_TRENES").val(itemData.NUMERO_PARTE);
                //FECHAS
                $("#FECHA_LIMITE_SN_TRENES").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SN));
                $("#FECHA_LIMITE_BO_TRENES").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_BO));
                $("#FECHA_LIMITE_SO_TRENES").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SO));

                //COMBOS
                $("#POSICION_TRENES").find('option[value="' + itemData.XPOSICION_TRENES_PA + '"]').attr("selected", "selected");
                $("#TIPO_TRENES").find('option[value="' + itemData.XTIPO_TRENES_PA + '"]').attr("selected", "selected");

                //Abre Modal
                $("#modalTrenesAeronave").modal('show');
            }
            else {
                $("#hdActionRegTrenes").val('');
                bootbox.alert("Seleccione un registro de la tabla de Trenes de Aterrizaje");
            }
            break;
        case 'G':
            if ($("#hdActionRegTrenes").val() == 'E') {
                var dataPuntosVuelo = $("#gridTrenes").data("kendoGrid");
                var itemData = dataPuntosVuelo.dataItem(dataPuntosVuelo.select());
                if (itemData) {
                    if (validTrenesReg()) {
                        itemData.set("XTRENES_PA", $("#XTRENES_PA").val());
                        itemData.set("XPOSICION_TRENES_PA", $("#POSICION_TRENES  option:selected").val());
                        itemData.set("XMODELO_PA", $("#MODELO_TRENES  option:selected").val());
                        itemData.set("XTIPO_TRENES_PA", $("#TIPO_TRENES  option:selected").val());
                        itemData.set("DESCRIPCION_POSICION", $("#POSICION_TRENES  option:selected").text());
                        itemData.set("DESCRIPCION_MODELO", $("#MODELO_TRENES  option:selected").text());
                        itemData.set("DESCRIPCION_TIPO", $("#TIPO_TRENES  option:selected").text());
                        itemData.set("NUMERO_SERIE", $("#NUMERO_SERIE_TRENES").val());
                        itemData.set("TSN", $("#TSN_TRENES").val());
                        itemData.set("CSN", $("#CSN_TRENES").val());
                        itemData.set("TBO", $("#TBO_TRENES").val());
                        itemData.set("CBO", $("#CBO_TRENES").val());
                        itemData.set("TSO", $("#TSO_TRENES").val());
                        itemData.set("CSO", $("#CSO_TRENES").val());
                        itemData.set("VIDA_LIMITE_HORAS", $("#VIDA_LIMITE_HORAS_TRENES").val());
                        itemData.set("VIDA_LIMITE_CICLO", $("#VIDA_LIMITE_CICLO_TRENES").val());
                        itemData.set("FECHA_VIDA_LIMITE", $("#FECHA_INFORMACION").val());
                        itemData.set("FECHA_ULTIMO_OH", $("#FECHA_ULTIMO_OH_TRENES").val());
                        itemData.set("REMANENTE_HORAS", $("#REMANENTE_HORAS_TRENES").val());
                        itemData.set("REMANENTE_CICLO", $("#REMANENTE_CICLO_TRENES").val());
                        itemData.set("REMANENTE_DIAS", $("#REMANENTE_DIAS_TRENES").val());
                        itemData.set("NUMERO_PARTE", $("#NUMERO_PARTE_TRENES").val());
                        itemData.set("FECHA_LIMITE_SN", $("#FECHA_LIMITE_SN_TRENES").val());
                        itemData.set("FECHA_LIMITE_BO", $("#FECHA_LIMITE_BO_TRENES").val());
                        itemData.set("FECHA_LIMITE_SO", $("#FECHA_LIMITE_SO_TRENES").val());

                        itemData.set("VIDA_LIMITE_MINUTO", $("#VIDA_LIMITE_MINUTO_TRENES").val());
                        itemData.set("TSN_MINUTO", $("#TSN_MINUTO_TRENES").val());
                        itemData.set("TBO_MINUTO", $("#TBO_MINUTO_TRENES").val());
                        itemData.set("TSO_MINUTO", $("#TSO_MINUTO_TRENES").val());
                        itemData.set("REMANENTE_MINUTO", $("#REMANENTE_MINUTO_TRENES").val());
                        itemData.set("FECHA_TURNM", $("#FECHA_TURNM_TRENES").val());
                        itemData.set("FECHA_CURM", $("#FECHA_CURM_TRENES").val());
                        itemData.set("XMODELO_PA", $("#MODELO_TRENES").data("kendoComboBox").value());

                        actionRegTrenes('I');
                    }
                }
            }
            else {
                if (validTrenesReg()) {
                    $("#gridTrenes")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XTRENES_PA: $("#XTRENES_PA").val(),
                            XPOSICION_TRENES_PA: $("#POSICION_TRENES  option:selected").val(),
                            XMODELO_PA: $("#MODELO_TRENES  option:selected").val(),
                            XTIPO_TRENES_PA: $("#TIPO_TRENES  option:selected").val(),
                            DESCRIPCION_POSICION: $("#POSICION_TRENES  option:selected").text(),
                            DESCRIPCION_MODELO: $("#MODELO_TRENES  option:selected").text(),
                            DESCRIPCION_TIPO: $("#TIPO_TRENES  option:selected").text(),
                            NUMERO_SERIE: $("#NUMERO_SERIE_TRENES").val(),
                            TSN: $("#TSN_TRENES").val(),
                            CSN: $("#CSN_TRENES").val(),
                            TBO: $("#TBO_TRENES").val(),
                            CBO: $("#CBO_TRENES").val(),
                            TSO: $("#TSO_TRENES").val(),
                            CSO: $("#CSO_TRENES").val(),
                            VIDA_LIMITE_HORAS: $("#VIDA_LIMITE_HORAS_TRENES").val(),
                            VIDA_LIMITE_CICLO: $("#VIDA_LIMITE_CICLO_TRENES").val(),
                            FECHA_VIDA_LIMITE: $("#FECHA_INFORMACION").val(),
                            FECHA_ULTIMO_OH: $("#FECHA_ULTIMO_OH_TRENES").val(),
                            REMANENTE_HORAS: $("#REMANENTE_HORAS_TRENES").val(),
                            REMANENTE_CICLO: $("#REMANENTE_CICLO_TRENES").val(),
                            REMANENTE_DIAS: $("#REMANENTE_DIAS_TRENES").val(),
                            NUMERO_PARTE: $("#NUMERO_PARTE_TRENES").val(),
                            FECHA_LIMITE_SN: $("#FECHA_LIMITE_SN_TRENES").val(),
                            FECHA_LIMITE_BO: $("#FECHA_LIMITE_BO_TRENES").val(),
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_TRENES").val(),

                            VIDA_LIMITE_MINUTO: $("#VIDA_LIMITE_MINUTO_TRENES").val(),
                            TSN_MINUTO: $("#TSN_MINUTO_TRENES").val(),
                            TBO_MINUTO: $("#TBO_MINUTO_TRENES").val(),
                            TSO_MINUTO: $("#TSO_MINUTO_TRENES").val(),
                            REMANENTE_MINUTO: $("#REMANENTE_MINUTO_TRENES").val(),
                            FECHA_TURNM: $("#FECHA_TURNM_TRENES").val(),
                            FECHA_CURM: $("#FECHA_CURM_TRENES").val(),
                            XMODELO_PA: $("#MODELO_TRENES").data("kendoComboBox").value()

                        });
                    actionRegTrenes('I');
                }
            }
            break;
        case 'D':

            break;
    }
}
//Function de eventos para Helicoptero
function actionRegHelicop(objAction) {
    switch (objAction) {
        case 'I':
            //LIMPIAR INPUTS
            $("#hdActionRegHelicop").val('N');
            $("#XHELICOPTERO_PA").val('');
            $("#NUMERO_SERIE_HELICOP").val('');
            $("#TSN_HELICOP").val('');
            $("#CSN_HELICOP").val('');
            $("#TBO_HELICOP").val('');
            $("#CBO_HELICOP").val('');
            $("#TSO_HELICOP").val('');
            $("#CSO_HELICOP").val('');
            $("#VIDA_LIMITE_HORAS_HELICOP").val('');
            $("#VIDA_LIMITE_CICLO_HELICOP").val('');
            $("#FECHA_VIDA_LIMITE_HELICOP").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));

            $("#FECHA_ULTIMO_OH_HELICOP").val('');
            $("#REMANENTE_HORAS_HELICOP").val('');
            $("#REMANENTE_CICLO_HELICOP").val('');
            $("#REMANENTE_DIAS_HELICOP").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICOP").val('');
            $("#FECHA_LIMITE_BO_HELICOP").val('');
            $("#FECHA_LIMITE_SO_HELICOP").val('');
            //LIMPIAR COMBOS
            $("#MODELO_HELICOP").data("kendoComboBox").value('');
            $("#FABRICANTE_HELICOP").data("kendoComboBox").value('');

            $("#POSICION_HELICOP option:first").attr('selected', 'selected');
            $("#TIPO_HELICOP option:first").attr('selected', 'selected');

            $("#VIDA_LIMITE_MINUTO_HELICOP").val('');
            $("#TSN_MINUTO_HELICOP").val('');
            $("#TBO_MINUTO_HELICOP").val('');
            $("#TSO_MINUTO_HELICOP").val('');
            $("#REMANENTE_MINUTO_HELICOP").val('');

            $("#FECHA_LIMITE_SN_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_LIMITE_BO_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_LIMITE_SO_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_ULTIMO_OH_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_TURNM_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_CURM_HELICOP").data("kendoDatePicker").value("");

            //Cierra Modal
            $("#modalHelicopAeronave").modal('hide');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelicop").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicop"></ul>');
            $("#divErrorHelicop").hide();
            break;
        case 'N':
            //LIMPIAR INPUTS
            $(".valError").removeClass("valError");
            $("#hdActionRegHelicop").val('N');
            $("#XHELICOPTERO_PA").val('');
            $("#NUMERO_SERIE_HELICOP").val('');
            $("#TSN_HELICOP").val('');
            $("#CSN_HELICOP").val('');
            $("#TBO_HELICOP").val('');
            $("#CBO_HELICOP").val('');
            $("#TSO_HELICOP").val('');
            $("#CSO_HELICOP").val('');
            $("#VIDA_LIMITE_HORAS_HELICOP").val('');
            $("#VIDA_LIMITE_CICLO_HELICOP").val('');
            $("#FECHA_VIDA_LIMITE_HELICOP").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));

            $("#FECHA_ULTIMO_OH_HELICOP").val('');
            $("#REMANENTE_HORAS_HELICOP").val('');
            $("#REMANENTE_CICLO_HELICOP").val('');
            $("#REMANENTE_DIAS_HELICOP").val('');

            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICOP").val('');
            $("#FECHA_LIMITE_BO_HELICOP").val('');
            $("#FECHA_LIMITE_SO_HELICOP").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICOP option:first").attr('selected', 'selected');
            $("#TIPO_HELICOP option:first").attr('selected', 'selected');

            $("#MODELO_HELICOP").data("kendoComboBox").value("");
            $("#FABRICANTE_HELICOP").data("kendoComboBox").value("");

            $("#FECHA_LIMITE_SN_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_LIMITE_BO_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_LIMITE_SO_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_ULTIMO_OH_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_TURNM_HELICOP").data("kendoDatePicker").value("");
            $("#FECHA_CURM_HELICOP").data("kendoDatePicker").value("");

            $("#VIDA_LIMITE_MINUTO_HELICOP").val('');
            $("#TSN_MINUTO_HELICOP").val('');
            $("#TBO_MINUTO_HELICOP").val('');
            $("#TSO_MINUTO_HELICOP").val('');
            $("#REMANENTE_MINUTO_HELICOP").val('');

            //Cierra Modal
            $("#modalHelicopAeronave").modal('show');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelicop").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicop"></ul>');
            $("#divErrorHelicop").hide();
            break;
        case 'E':
            $(".valError").removeClass("valError");
            $("#divErrorHelicop").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicop"></ul>');
            $("#divErrorHelicop").hide();
            var dataDetalle = $("#gridHelicop").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());
            if (itemData != null) {
                //AGREGAR DATOS A INPUTS DESDE GRILLA
                //INPUTS
                $("#hdActionRegHelicop").val('E');
                $("#XHELICOPTERO_PA").val(itemData.XHELICOPTERO_PA);
                $("#NUMERO_SERIE_HELICOP").val(itemData.NUMERO_SERIE);
                $("#TSN_HELICOP").val(itemData.TSN);
                $("#CSN_HELICOP").val(itemData.CSN);
                $("#TBO_HELICOP").val(itemData.TBO);
                $("#CBO_HELICOP").val(itemData.CBO);
                $("#TSO_HELICOP").val(itemData.TSO);
                $("#CSO_HELICOP").val(itemData.CSO);
                $("#VIDA_LIMITE_HORAS_HELICOP").val(itemData.VIDA_LIMITE_HORAS);
                $("#VIDA_LIMITE_CICLO_HELICOP").val(itemData.VIDA_LIMITE_CICLO);
                $("#FECHA_VIDA_LIMITE_HELICOP").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));
                $("#FECHA_ULTIMO_OH_HELICOP").data("kendoDatePicker").value(dateFormat(itemData.FECHA_ULTIMO_OH));
                $("#REMANENTE_HORAS_HELICOP").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLO_HELICOP").val(itemData.REMANENTE_CICLO);
                $("#REMANENTE_DIAS_HELICOP").val(itemData.REMANENTE_DIAS);

                //FECHAS
                $("#FECHA_LIMITE_SN_HELICOP").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SN));
                $("#FECHA_LIMITE_BO_HELICOP").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_BO));
                $("#FECHA_LIMITE_SO_HELICOP").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SO));

                //COMBOS
                $("#POSICION_HELICOP").find('option[value="' + itemData.XPOSICION_HELICOPTERO_PA + '"]').attr("selected", "selected");
                $("#TIPO_HELICOP").find('option[value="' + itemData.XTIPO_HELICOPTERO_PA + '"]').attr("selected", "selected");

                $("#FECHA_VIDA_LIMITE_HELICOP").focus();
                $("#FECHA_ULTIMO_OH_HELICOP").focus();
                $("#FECHA_LIMITE_SN_HELICOP").focus();
                $("#FECHA_LIMITE_BO_HELICOP").focus();
                $("#FECHA_LIMITE_SO_HELICOP").focus();

                $("#FABRICANTE_HELICOP").data("kendoComboBox").value(itemData.XFABRICANTE_PA);
                $("#MODELO_HELICOP").data("kendoComboBox").value('');

                SelectModeloHelicoptero(itemData.XFABRICANTE_PA, itemData.XMODELO_PA);

                $("#FECHA_TURNM_HELICOP").data("kendoDatePicker").value(dateFormat(itemData.FECHA_TURNM));
                $("#FECHA_CURM_HELICOP").data("kendoDatePicker").value(dateFormat(itemData.FECHA_CURM));

                $("#VIDA_LIMITE_MINUTO_HELICOP").val(itemData.VIDA_LIMITE_MINUTO);
                $("#TSN_MINUTO_HELICOP").val(itemData.TSN_MINUTO);
                $("#TBO_MINUTO_HELICOP").val(itemData.TBO_MINUTO);
                $("#TSO_MINUTO_HELICOP").val(itemData.TSO_MINUTO);
                $("#REMANENTE_MINUTO_HELICOP").val(itemData.REMANENTE_MINUTO);

                //Abre Modal
                $("#modalHelicopAeronave").modal('show');
            }
            else {
                $("#hdActionRegHelicop").val('');
                bootbox.alert("Seleccione un registro de la tabla de Trenes de Aterrizaje");
            }
            break;
        case 'G':
            if ($("#hdActionRegHelicop").val() == 'E') {
                var dataPuntosVuelo = $("#gridHelicop").data("kendoGrid");
                var itemData = dataPuntosVuelo.dataItem(dataPuntosVuelo.select());

                if (itemData) {
                    if (validHelicopReg()) {
                        itemData.set("XHELICOPTERO_PA", $("#XHELICOPTERO_PA").val());
                        itemData.set("XPOSICION_HELICOPTERO_PA", $("#POSICION_HELICOP  option:selected").val());
                        itemData.set("XFABRICANTE_PA", $("#FABRICANTE_HELICOP  option:selected").val());
                        itemData.set("XMODELO_PA", $("#MODELO_HELICOP  option:selected").val());
                        itemData.set("XTIPO_HELICOPTERO_PA", $("#TIPO_HELICOP  option:selected").val());
                        itemData.set("DESCRIPCION_POSICION", $("#POSICION_HELICOP  option:selected").text());
                        itemData.set("DESCRIPCION_FABRICANTE", $("#FABRICANTE_HELICOP  option:selected").text());
                        itemData.set("DESCRIPCION_MODELO", $("#MODELO_HELICOP  option:selected").text());
                        itemData.set("DESCRIPCION_TIPO", $("#TIPO_HELICOP  option:selected").text());
                        itemData.set("NUMERO_SERIE", $("#NUMERO_SERIE_HELICOP").val());
                        itemData.set("TSN", $("#TSN_HELICOP").val());
                        itemData.set("CSN", $("#CSN_HELICOP").val());
                        itemData.set("TBO", $("#TBO_HELICOP").val());
                        itemData.set("CBO", $("#CBO_HELICOP").val());
                        itemData.set("TSO", $("#TSO_HELICOP").val());
                        itemData.set("CSO", $("#CSO_HELICOP").val());
                        itemData.set("VIDA_LIMITE_HORAS", $("#VIDA_LIMITE_HORAS_HELICOP").val());
                        itemData.set("VIDA_LIMITE_CICLO", $("#VIDA_LIMITE_CICLO_HELICOP").val());
                        itemData.set("FECHA_VIDA_LIMITE", $("#FECHA_INFORMACION").val());

                        itemData.set("REMANENTE_DIAS", $("#REMANENTE_DIAS_HELICOP").val());
                        itemData.set("FECHA_ULTIMO_OH", $("#FECHA_ULTIMO_OH_HELICOP").val());
                        itemData.set("REMANENTE_HORAS", $("#REMANENTE_HORAS_HELICOP").val());
                        itemData.set("REMANENTE_CICLO", $("#REMANENTE_CICLO_HELICOP").val());

                        itemData.set("FECHA_LIMITE_SN", $("#FECHA_LIMITE_SN_HELICOP").val());
                        itemData.set("FECHA_LIMITE_BO", $("#FECHA_LIMITE_BO_HELICOP").val());
                        itemData.set("FECHA_LIMITE_SO", $("#FECHA_LIMITE_SO_HELICOP").val());

                        itemData.set("FECHA_TURNM", $("#FECHA_TURNM_HELICOP").val());
                        itemData.set("FECHA_CURM", $("#FECHA_CURM_HELICOP").val());

                        itemData.set("VIDA_LIMITE_MINUTO", $("#VIDA_LIMITE_MINUTO_HELICOP").val());
                        itemData.set("TSN_MINUTO", $("#TSN_MINUTO_HELICOP").val());
                        itemData.set("TBO_MINUTO", $("#TBO_MINUTO_HELICOP").val());
                        itemData.set("TSO_MINUTO", $("#TSO_MINUTO_HELICOP").val());
                        itemData.set("REMANENTE_MINUTO", $("#REMANENTE_MINUTO_HELICOP").val());

                        actionRegHelicop('I');
                        saveHelicop("");
                    }
                }
            }
            else {
                if (validHelicopReg()) {
                    $("#gridHelicop")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XHELICOPTERO_PA: $("#XHELICOPTERO_PA").val(),
                            XPOSICION_HELICOPTERO_PA: $("#POSICION_HELICOP  option:selected").val(),
                            XFABRICANTE_PA: $("#FABRICANTE_HELICOP  option:selected").val(),
                            XMODELO_PA: $("#MODELO_HELICOP  option:selected").val(),
                            XTIPO_HELICOPTERO_PA: $("#TIPO_HELICOP  option:selected").val(),
                            DESCRIPCION_POSICION: $("#POSICION_HELICOP  option:selected").text(),
                            DESCRIPCION_FABRICANTE: $("#FABRICANTE_HELICOP  option:selected").text(),
                            DESCRIPCION_MODELO: $("#MODELO_HELICOP  option:selected").text(),
                            DESCRIPCION_TIPO: $("#TIPO_HELICOP  option:selected").text(),
                            NUMERO_SERIE: $("#NUMERO_SERIE_HELICOP").val(),
                            TSN: $("#TSN_HELICOP").val(),
                            CSN: $("#CSN_HELICOP").val(),
                            TBO: $("#TBO_HELICOP").val(),
                            CBO: $("#CBO_HELICOP").val(),
                            TSO: $("#TSO_HELICOP").val(),
                            CSO: $("#CSO_HELICOP").val(),
                            VIDA_LIMITE_HORAS: $("#VIDA_LIMITE_HORAS_HELICOP").val(),
                            VIDA_LIMITE_CICLO: $("#VIDA_LIMITE_CICLO_HELICOP").val(),
                            FECHA_VIDA_LIMITE: $("#FECHA_INFORMACION").val(),

                            FECHA_ULTIMO_OH: $("#FECHA_ULTIMO_OH_HELICOP").val(),
                            REMANENTE_HORAS: $("#REMANENTE_HORAS_HELICOP").val(),
                            REMANENTE_CICLO: $("#REMANENTE_CICLO_HELICOP").val(),
                            REMANENTE_DIAS: $("#REMANENTE_DIAS_HELICOP").val(),

                            FECHA_LIMITE_SN: $("#FECHA_LIMITE_SN_HELICOP").val(),
                            FECHA_LIMITE_BO: $("#FECHA_LIMITE_BO_HELICOP").val(),
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_HELICOP").val(),

                            FECHA_TURNM: $("#FECHA_TURNM_HELICOP").val(),
                            FECHA_CURM: $("#FECHA_CURM_HELICOP").val(),

                            VIDA_LIMITE_MINUTO: $("#VIDA_LIMITE_MINUTO_HELICOP").val(),
                            TSN_MINUTO: $("#TSN_MINUTO_HELICOP").val(),
                            TBO_MINUTO: $("#TBO_MINUTO_HELICOP").val(),
                            TSO_MINUTO: $("#TSO_MINUTO_HELICOP").val(),
                            REMANENTE_MINUTO: $("#REMANENTE_MINUTO_HELICOP").val()

                        });
                    actionRegHelicop('I');
                    saveHelicop("");
                }
            }
            break;
        case 'D':

            break;
    }
}
//Function de eventos para Helicoptero - Rotor Principal
function actionRegHelicopPri(objAction) {
    switch (objAction) {
        case 'I':
            //LIMPIAR INPUTS
            $("#hdActionRegHelicopPri").val('N');
            $("#XHELICOP_ROTOR_PRI_PA").val('');
            $("#NUMERO_PARTE_HELICOPPRI").val('');
            $("#NUMERO_SERIE_HELICOPPRI").val('');
            $("#TSN_HELICOPPRI").val('');
            $("#CSN_HELICOPPRI").val('');
            $("#TBO_HELICOPPRI").val('');
            $("#CBO_HELICOPPRI").val('');
            $("#TSO_HELICOPPRI").val('');
            $("#CSO_HELICOPPRI").val('');
            $("#VIDA_LIMITE_HORAS_HELICOPPRI").val('');
            $("#VIDA_LIMITE_CICLO_HELICOPPRI").val('');
            $("#FECHA_VIDA_LIMITE_HELICOPPRI").val('');

            $("#REMANENTE_HORAS_HELICOPPRI").val('');
            $("#REMANENTE_CICLO_HELICOPPRI").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICOPPRI").val('');
            $("#FECHA_LIMITE_BO_HELICOPPRI").val('');
            $("#FECHA_LIMITE_SO_HELICOPPRI").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICOPPRI option:first").attr('selected', 'selected');
            //Cierra Modal
            $("#modalHelicopPriAeronave").modal('hide');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelicopPri").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicopPri"></ul>');
            $("#divErrorHelicopPri").hide();
            break;
        case 'N':
            //LIMPIAR INPUTS
            $("#hdActionRegHelicopPri").val('N');
            $("#XHELICOP_ROTOR_PRI_PA").val('');
            $("#NUMERO_PARTE_HELICOPPRI").val('');
            $("#NUMERO_SERIE_HELICOPPRI").val('');
            $("#TSN_HELICOPPRI").val('');
            $("#CSN_HELICOPPRI").val('');
            $("#TBO_HELICOPPRI").val('');
            $("#CBO_HELICOPPRI").val('');
            $("#TSO_HELICOPPRI").val('');
            $("#CSO_HELICOPPRI").val('');

            $("#VIDA_LIMITE_HORAS_HELICOPPRI").val('');
            $("#VIDA_LIMITE_CICLO_HELICOPPRI").val('');
            $("#FECHA_VIDA_LIMITE_HELICOPPRI").val('');

            $("#REMANENTE_HORAS_HELICOPPRI").val('');
            $("#REMANENTE_CICLO_HELICOPPRI").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICOPPRI").val('');
            $("#FECHA_LIMITE_BO_HELICOPPRI").val('');
            $("#FECHA_LIMITE_SO_HELICOPPRI").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICOPPRI option:first").attr('selected', 'selected');
            //Cierra Modal
            $("#modalHelicopPriAeronave").modal('show');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelicopPri").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicopPri"></ul>');
            $("#divErrorHelicopPri").hide();
            break;
        case 'E':
            var dataDetalle = $("#gridHelicopPri").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());
            if (itemData != null) {
                //AGREGAR DATOS A INPUTS DESDE GRILLA
                //INPUTS
                $("#hdActionRegHelicopPri").val('E');
                $("#XHELICOP_ROTOR_PRI_PA").val(itemData.XHELICOP_ROTOR_PRI_PA);
                $("#NUMERO_PARTE_HELICOPPRI").val(itemData.NUMERO_PARTE);
                $("#NUMERO_SERIE_HELICOPPRI").val(itemData.NUMERO_SERIE);
                $("#TSN_HELICOPPRI").val(itemData.TSN);
                $("#CSN_HELICOPPRI").val(itemData.CSN);
                $("#TBO_HELICOPPRI").val(itemData.TBO);
                $("#CBO_HELICOPPRI").val(itemData.CBO);
                $("#TSO_HELICOPPRI").val(itemData.TSO);
                $("#CSO_HELICOPPRI").val(itemData.CSO);

                $("#VIDA_LIMITE_HORAS_HELICOPPRI").val(itemData.VIDA_LIMITE_HORAS);
                $("#VIDA_LIMITE_CICLO_HELICOPPRI").val(itemData.VIDA_LIMITE_CICLO);
                $("#FECHA_VIDA_LIMITE_HELICOPPRI").val(itemData.FECHA_VIDA_LIMITE);

                $("#REMANENTE_HORAS_HELICOPPRI").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLO_HELICOPPRI").val(itemData.REMANENTE_CICLO);

                //FECHAS
                $("#FECHA_LIMITE_SN_HELICOPPRI").val(itemData.FECHA_LIMITE_SN);
                $("#FECHA_LIMITE_BO_HELICOPPRI").val(itemData.FECHA_LIMITE_BO);
                $("#FECHA_LIMITE_SO_HELICOPPRI").val(itemData.FECHA_LIMITE_SO);
                //COMBOS
                $("#POSICION_HELICOPPRI").find('option[value="' + itemData.XPOS_HC_ROTOR_PRI_PA + '"]').attr("selected", "selected");

                $("#FECHA_VIDA_LIMITE_HELICOPPRI").focus();
                $("#FECHA_LIMITE_SN_HELICOPPRI").focus();
                $("#FECHA_LIMITE_BO_HELICOPPRI").focus();
                $("#FECHA_LIMITE_SO_HELICOPPRI").focus();

                //Abre Modal
                $("#modalHelicopPriAeronave").modal('show');
            }
            else {
                $("#modalHelicopPriAeronave").val('');
                bootbox.alert("Seleccione un registro de la tabla de Helicoptero - Rotor Principal");
            }
            break;
        case 'G':
            if ($("#hdActionRegHelicopPri").val() == 'E') {
                var dataPuntosVuelo = $("#gridHelicopPri").data("kendoGrid");
                var itemData = dataPuntosVuelo.dataItem(dataPuntosVuelo.select());
                if (itemData) {
                    if (validHelicopPriReg()) {
                        itemData.set("XHELICOP_ROTOR_PRI_PA", $("#XHELICOP_ROTOR_PRI_PA").val());
                        itemData.set("XPOS_HC_ROTOR_PRI_PA", $("#POSICION_HELICOPPRI  option:selected").val());
                        itemData.set("DESCRIPCION_POSICION", $("#POSICION_HELICOPPRI  option:selected").text());
                        itemData.set("NUMERO_SERIE", $("#NUMERO_SERIE_HELICOPPRI").val());
                        itemData.set("NUMERO_PARTE", $("#NUMERO_PARTE_HELICOPPRI").val());
                        itemData.set("TSN", $("#TSN_HELICOP").val());
                        itemData.set("CSN", $("#CSN_HELICOPPRI").val());
                        itemData.set("TBO", $("#TBO_HELICOPPRI").val());
                        itemData.set("CBO", $("#CBO_HELICOPPRI").val());
                        itemData.set("TSO", $("#TSO_HELICOPPRI").val());
                        itemData.set("CSO", $("#CSO_HELICOPPRI").val());

                        itemData.set("VIDA_LIMITE_HORAS", $("#VIDA_LIMITE_HORAS_HELICOPPRI").val());
                        itemData.set("VIDA_LIMITE_CICLO", $("#VIDA_LIMITE_CICLO_HELICOPPRI").val());
                        itemData.set("FECHA_VIDA_LIMITE", $("#FECHA_VIDA_LIMITE_HELICOPPRI").val());

                        itemData.set("REMANENTE_HORAS", $("#REMANENTE_HORAS_HELICOPPRI").val());
                        itemData.set("REMANENTE_CICLO", $("#REMANENTE_CICLO_HELICOPPRI").val());

                        itemData.set("FECHA_LIMITE_SN", $("#FECHA_LIMITE_SN_HELICOPPRI").val());
                        itemData.set("FECHA_LIMITE_BO", $("#FECHA_LIMITE_BO_HELICOPPRI").val());
                        itemData.set("FECHA_LIMITE_SO", $("#FECHA_LIMITE_SO_HELICOPPRI").val());
                        actionRegHelicopPri('I');
                    }
                }
            }
            else {
                if (validHelicopPriReg()) {
                    $("#gridHelicopPri")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XHELICOP_ROTOR_PRI_PA: $("#XHELICOP_ROTOR_PRI_PA").val(),
                            XPOS_HC_ROTOR_PRI_PA: $("#POSICION_HELICOPPRI  option:selected").val(),
                            DESCRIPCION_POSICION: $("#POSICION_HELICOPPRI  option:selected").text(),
                            NUMERO_SERIE: $("#NUMERO_SERIE_HELICOPPRI").val(),
                            NUMERO_PARTE: $("#NUMERO_PARTE_HELICOPPRI").val(),
                            TSN: $("#TSN_HELICOPPRI").val(),
                            CSN: $("#CSN_HELICOPPRI").val(),
                            TBO: $("#TBO_HELICOPPRI").val(),
                            CBO: $("#CBO_HELICOPPRI").val(),
                            TSO: $("#TSO_HELICOPPRI").val(),
                            CSO: $("#CSO_HELICOPPRI").val(),

                            VIDA_LIMITE_HORAS: $("#VIDA_LIMITE_HORAS_HELICOPPRI").val(),
                            VIDA_LIMITE_CICLO: $("#VIDA_LIMITE_CICLO_HELICOPPRI").val(),
                            FECHA_VIDA_LIMITE: $("#FECHA_VIDA_LIMITE_HELICOPPRI").val(),

                            REMANENTE_HORAS: $("#REMANENTE_HORAS_HELICOPPRI").val(),
                            REMANENTE_CICLO: $("#REMANENTE_CICLO_HELICOPPRI").val(),

                            FECHA_LIMITE_SN: $("#FECHA_LIMITE_SN_HELICOPPRI").val(),
                            FECHA_LIMITE_BO: $("#FECHA_LIMITE_BO_HELICOPPRI").val(),
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_HELICOPPRI").val()
                        });
                    actionRegHelicopPri('I');
                }
            }
            break;
        case 'D':

            break;
    }
}
//Function de eventos para Helicoptero - Cola Principal
function actionRegHelicopCola(objAction) {
    switch (objAction) {
        case 'I':
            //LIMPIAR INPUTS
            $("#hdActionRegHelicopCola").val('N');
            $("#XHELICOP_ROTOR_COLA_PA").val('');
            $("#NUMERO_PARTE_HELICOPCOLA").val('');
            $("#NUMERO_SERIE_HELICOPCOLA").val('');
            $("#TSN_HELICOPCOLA").val('');
            $("#CSN_HELICOPCOLA").val('');
            $("#TBO_HELICOPCOLA").val('');
            $("#CBO_HELICOPCOLA").val('');
            $("#TSO_HELICOPCOLA").val('');
            $("#CSO_HELICOPCOLA").val('');
            $("#VIDA_LIMITE_HORAS_HELICOPCOLA").val('');
            $("#VIDA_LIMITE_CICLO_HELICOPCOLA").val('');
            $("#FECHA_VIDA_LIMITE_HELICOPCOLA").val('');

            $("#REMANENTE_HORAS_HELICOPCOLA").val('');
            $("#REMANENTE_CICLO_HELICOPCOLA").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICOPCOLA").val('');
            $("#FECHA_LIMITE_BO_HELICOPCOLA").val('');
            $("#FECHA_LIMITE_SO_HELICOPCOLA").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICOPCOLA option:first").attr('selected', 'selected');
            //Cierra Modal
            $("#modalHelicopColaAeronave").modal('hide');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelicopCola").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicopCola"></ul>');
            $("#divErrorHelicopCola").hide();
            break;
        case 'N':
            //LIMPIAR INPUTS
            $("#hdActionRegHelicopCola").val('N');
            $("#XHELICOP_ROTOR_COLA_PA").val('');
            $("#NUMERO_PARTE_HELICOPCOLA").val('');
            $("#NUMERO_SERIE_HELICOPCOLA").val('');
            $("#TSN_HELICOPCOLA").val('');
            $("#CSN_HELICOPCOLA").val('');
            $("#TBO_HELICOPCOLA").val('');
            $("#CBO_HELICOPCOLA").val('');
            $("#TSO_HELICOPCOLA").val('');
            $("#CSO_HELICOPCOLA").val('');
            $("#VIDA_LIMITE_HORAS_HELICOPCOLA").val('');
            $("#VIDA_LIMITE_CICLO_HELICOPCOLA").val('');
            $("#FECHA_VIDA_LIMITE_HELICOPCOLA").val('');

            $("#REMANENTE_HORAS_HELICOPCOLA").val('');
            $("#REMANENTE_CICLO_HELICOPCOLA").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICOPCOLA").val('');
            $("#FECHA_LIMITE_BO_HELICOPCOLA").val('');
            $("#FECHA_LIMITE_SO_HELICOPCOLA").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICOPCOLA option:first").attr('selected', 'selected');
            //Cierra Modal
            $("#modalHelicopColaAeronave").modal('show');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelicopCola").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicopCola"></ul>');
            $("#divErrorHelicopCola").hide();
            break;
        case 'E':
            var dataDetalle = $("#gridHelicopCola").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());
            if (itemData != null) {
                //AGREGAR DATOS A INPUTS DESDE GRILLA
                //INPUTS
                $("#hdActionRegHelicopCola").val('E');
                $("#XHELICOP_ROTOR_COLA_PA").val(itemData.XHELICOP_ROTOR_COLA_PA);
                $("#NUMERO_PARTE_HELICOPCOLA").val(itemData.NUMERO_PARTE);
                $("#NUMERO_SERIE_HELICOPCOLA").val(itemData.NUMERO_SERIE);
                $("#TSN_HELICOPCOLA").val(itemData.TSN);
                $("#CSN_HELICOPCOLA").val(itemData.CSN);
                $("#TBO_HELICOPCOLA").val(itemData.TBO);
                $("#CBO_HELICOPCOLA").val(itemData.CBO);
                $("#TSO_HELICOPCOLA").val(itemData.TSO);
                $("#CSO_HELICOPCOLA").val(itemData.CSO);

                $("#VIDA_LIMITE_HORAS_HELICOPCOLA").val(itemData.VIDA_LIMITE_HORAS);
                $("#VIDA_LIMITE_CICLO_HELICOPCOLA").val(itemData.VIDA_LIMITE_CICLO);
                $("#FECHA_VIDA_LIMITE_HELICOPCOLA").val(itemData.FECHA_VIDA_LIMITE);

                $("#REMANENTE_HORAS_HELICOPCOLA").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLO_HELICOPCOLA").val(itemData.REMANENTE_CICLO);

                //FECHAS
                $("#FECHA_LIMITE_SN_HELICOPCOLA").val(itemData.FECHA_LIMITE_SN);
                $("#FECHA_LIMITE_BO_HELICOPCOLA").val(itemData.FECHA_LIMITE_BO);
                $("#FECHA_LIMITE_SO_HELICOPCOLA").val(itemData.FECHA_LIMITE_SO);
                //COMBOS
                $("#POSICION_HELICOPCOLA").find('option[value="' + itemData.XPOS_HC_ROTOR_COLA_PA + '"]').attr("selected", "selected");

                $("#FECHA_VIDA_LIMITE_HELICOPCOLA").focus();
                $("#FECHA_LIMITE_SN_HELICOPCOLA").focus();
                $("#FECHA_LIMITE_BO_HELICOPCOLA").focus();
                $("#FECHA_LIMITE_SO_HELICOPCOLA").focus();
                //Abre Modal
                $("#modalHelicopColaAeronave").modal('show');
            }
            else {
                $("#modalHelicopPriAeronave").val('');
                bootbox.alert("Seleccione un registro de la tabla de Helicoptero - Rotor Principal");
            }
            break;
        case 'G':
            if ($("#hdActionRegHelicopCola").val() == 'E') {
                var dataPuntosVuelo = $("#gridHelicopCola").data("kendoGrid");
                var itemData = dataPuntosVuelo.dataItem(dataPuntosVuelo.select());
                if (itemData) {
                    if (validHelicopColaReg()) {
                        itemData.set("XHELICOP_ROTOR_COLA_PA", $("#XHELICOP_ROTOR_COLA_PA").val());
                        itemData.set("XPOS_HC_ROTOR_COLA_PA", $("#POSICION_HELICOPCOLA  option:selected").val());
                        itemData.set("DESCRIPCION_POSICION", $("#POSICION_HELICOPCOLA  option:selected").text());
                        itemData.set("NUMERO_SERIE", $("#NUMERO_SERIE_HELICOPCOLA").val());
                        itemData.set("NUMERO_PARTE", $("#NUMERO_PARTE_HELICOPCOLA").val());
                        itemData.set("TSN", $("#TSN_HELICOP").val());
                        itemData.set("CSN", $("#CSN_HELICOPCOLA").val());
                        itemData.set("TBO", $("#TBO_HELICOPCOLA").val());
                        itemData.set("CBO", $("#CBO_HELICOPCOLA").val());
                        itemData.set("TSO", $("#TSO_HELICOPCOLA").val());
                        itemData.set("CSO", $("#CSO_HELICOPCOLA").val());

                        itemData.set("VIDA_LIMITE_HORAS", $("#VIDA_LIMITE_HORAS_HELICOPCOLA").val());
                        itemData.set("VIDA_LIMITE_CICLO", $("#VIDA_LIMITE_CICLO_HELICOPCOLA").val());
                        itemData.set("FECHA_VIDA_LIMITE", $("#FECHA_VIDA_LIMITE_HELICOPCOLA").val());

                        itemData.set("REMANENTE_HORAS", $("#REMANENTE_HORAS_HELICOPCOLA").val());
                        itemData.set("REMANENTE_CICLO", $("#REMANENTE_CICLO_HELICOPCOLA").val());

                        itemData.set("FECHA_LIMITE_SN", $("#FECHA_LIMITE_SN_HELICOPCOLA").val());
                        itemData.set("FECHA_LIMITE_BO", $("#FECHA_LIMITE_BO_HELICOPCOLA").val());
                        itemData.set("FECHA_LIMITE_SO", $("#FECHA_LIMITE_SO_HELICOPCOLA").val());
                        actionRegHelicopCola('I');
                    }
                }
            }
            else {
                if (validHelicopColaReg()) {
                    $("#gridHelicopCola")
                        .data("kendoGrid")
                        .dataSource
                        .insert({
                            XHELICOP_ROTOR_COLA_PA: $("#XHELICOP_ROTOR_COLA_PA").val(),
                            XPOS_HC_ROTOR_COLA_PA: $("#POSICION_HELICOPCOLA  option:selected").val(),
                            DESCRIPCION_POSICION: $("#POSICION_HELICOPCOLA  option:selected").text(),
                            NUMERO_SERIE: $("#NUMERO_SERIE_HELICOPCOLA").val(),
                            NUMERO_PARTE: $("#NUMERO_PARTE_HELICOPCOLA").val(),
                            TSN: $("#TSN_HELICOPCOLA").val(),
                            CSN: $("#CSN_HELICOPCOLA").val(),
                            TBO: $("#TBO_HELICOPCOLA").val(),
                            CBO: $("#CBO_HELICOPCOLA").val(),
                            TSO: $("#TSO_HELICOPCOLA").val(),
                            CSO: $("#CSO_HELICOPCOLA").val(),

                            VIDA_LIMITE_HORAS: $("#VIDA_LIMITE_HORAS_HELICOPCOLA").val(),
                            VIDA_LIMITE_CICLO: $("#VIDA_LIMITE_CICLO_HELICOPCOLA").val(),
                            FECHA_VIDA_LIMITE: $("#FECHA_VIDA_LIMITE_HELICOPCOLA").val(),
                            REMANENTE_HORAS: $("#REMANENTE_HORAS_HELICOPCOLA").val(),
                            REMANENTE_CICLO: $("#REMANENTE_CICLO_HELICOPCOLA").val(),

                            FECHA_LIMITE_SN: $("#FECHA_LIMITE_SN_HELICOPCOLA").val(),
                            FECHA_LIMITE_BO: $("#FECHA_LIMITE_BO_HELICOPCOLA").val(),
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_HELICOPCOLA").val()
                        });
                    actionRegHelicopCola('I');
                }
            }
            break;
        case 'D':

            break;
    }
}

function disabledDivDatosGenerales() {
    $("#XSOLICITUD_AERONAVE_PA").toggleDisable();
    $("#XTIPO_AERONAVE_PA").toggleDisable();
}
function disabledDivDatosAeronave() {
    $("#MATRICULA").toggleDisable();
    $("#XMODELO_PA").data("kendoDropDownList").enable(false);
    $("#NUMERO_SERIE").toggleDisable();
    $("#XFABRICANTE_PA").data("kendoDropDownList").enable(false);
    $("#FECHA_FABRICACION").toggleDisable();
    $("#HORAS_VUELO").toggleDisable();
    $("#MINUTOS_VUELO").toggleDisable();
    $("#CICLOS_VUELO").toggleDisable();
    $("#FECHA_INFORMACION").toggleDisable();
    $("#FECHA_INFORMACION").data("kendoDatePicker").enable(false);
    $("#FECHA_FABRICACION").data("kendoDatePicker").enable(false);
    $("#FECHA_TURNM").data("kendoDatePicker").enable(false);
    $("#TBO_HORA").toggleDisable();
    $("#TBO_MINUTO").toggleDisable();
    $("#TSO_HORA").toggleDisable();
    $("#TSO_MINUTO").toggleDisable();
    $("#REMANENTE_TOH_HORA").toggleDisable();
    $("#REMANENTE_TOH_MINUTO").toggleDisable();
    $("#FECHA_CURM").data("kendoDatePicker").enable(false);
    $("#CBO_HORA").toggleDisable();
    $("#CSO_HORA").toggleDisable();
    $("#REMANENTE_COH_HORA").toggleDisable();
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
    $("#XTIPO_SERVICIO_PA").data("kendoDropDownList").enable(false);
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
                    VIDA_UTIL: { type: "date" },
                    VIDA_LIMITE_HORAS: { type: "number", validation: { required: true, message: 'Ingrese la vida limite (horas)' } },
                    TSN: { type: "number", validation: { required: true, message: 'Ingrese el TSN' } },
                    REMANENTE_HORAS: { type: "number", validation: { required: true, message: 'Ingrese el Remante' } },
                    REMANENTE_DIAS: { type: "number" }
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
            { field: "TSN", title: "TSN", width: "130px" },
            { field: "TSO", title: "TSO", width: "130px" },
            { field: "REMANENTE_HORAS", title: "Remanente Horas", width: "130px" },
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
function categoryDropDownEditor(container, options) {
    var data = []

    data.push(
    {
        XPOS_PALA_HELICOP_PA: 1,
        DESCRIPCION: "SUPERIOR"
    });

    data.push(
    {
        XPOS_PALA_HELICOP_PA: 2,
        DESCRIPCION: "INFERIOR"
    });

    $('<input required data-text-field="DESCRIPCION" data-value-field="XPOS_PALA_HELICOP_PA" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataSource: data,
            dataTextField: "DESCRIPCION",
            dataValueField: "XPOS_PALA_HELICOP_PA"
        });
}