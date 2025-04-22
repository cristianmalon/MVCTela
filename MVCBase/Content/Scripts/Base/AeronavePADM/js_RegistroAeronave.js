$(document).ready(function () {
    $(window).load(function () {

        $("#FECHA_FABRICACION").kendoDatePicker();
        $("#FECHA_LIMITE_SN_MOTOR").kendoDatePicker();
        $("#FECHA_LIMITE_BO_MOTOR").kendoDatePicker();
        $("#FECHA_LIMITE_SO_MOTOR").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_MOTOR").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_MOTOR").data("kendoDatePicker").readonly();

        $("#FECHA_LIMITE_SN_HELICE").kendoDatePicker();
        $("#FECHA_LIMITE_BO_HELICE").kendoDatePicker();
        $("#FECHA_LIMITE_SO_HELICE").kendoDatePicker();
        $("#FECHA_ULTIMO_OH_HELICE").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_HELICE").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_HELICE").data("kendoDatePicker").readonly();

        $("#FECHA_LIMITE_SN_TRENES").kendoDatePicker();
        $("#FECHA_LIMITE_BO_TRENES").kendoDatePicker();
        $("#FECHA_LIMITE_SO_TRENES").kendoDatePicker();
        $("#FECHA_ULTIMO_OH_TRENES").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_TRENES").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_TRENES").data("kendoDatePicker").readonly();

        $("#FECHA_LIMITE_SN_HELICOP").kendoDatePicker();
        $("#FECHA_LIMITE_BO_HELICOP").kendoDatePicker();
        $("#FECHA_LIMITE_SO_HELICOP").kendoDatePicker();
        $("#FECHA_ULTIMO_OH_HELICOP").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_HELICOP").kendoDatePicker();
        $("#FECHA_VIDA_LIMITE_HELICOP").data("kendoDatePicker").readonly();

        $("#FECHA_TURNM_MOTOR").kendoDatePicker();
        $("#FECHA_CURM_MOTOR").kendoDatePicker();

        $("#FECHA_TURNM_HELICE").kendoDatePicker();

        $("#FECHA_TURNM_TRENES").kendoDatePicker();
        $("#FECHA_CURM_TRENES").kendoDatePicker();

        $("#FECHA_TURNM_HELICOP").kendoDatePicker();
        $("#FECHA_CURM_HELICOP").kendoDatePicker();

        $("#FECHA_TURNM").kendoDatePicker();        
        $("#FECHA_CURM").kendoDatePicker();
        //alert($("#FECHA_TURNM").val())

        if ($("#FECHA_TURNM").data("kendoDatePicker").value() == null || $("#FECHA_TURNM").val() == "01/01/1900")
        {            
            $("#FECHA_TURNM").data("kendoDatePicker").value("");
            $("#FECHA_TURNM").val('');
        }
        if ($("#FECHA_CURM").data("kendoDatePicker").value() == null || $("#FECHA_CURM").val() == "01/01/1900")
        {
            
            $("#FECHA_CURM").data("kendoDatePicker").value("");
            $("#FECHA_CURM").val('');
        }

       
        $("#XPERSONAJURIDICA").kendoComboBox({
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
                    
                    if ($.trim($("#XPERSONAJURIDICA").data("kendoComboBox").value()) != "" && $("#XPERSONAJURIDICA").data("kendoComboBox").value() != null)
                    {
                        $.ajax({
                            datatype: 'json',
                            url: '/AeronavePADM/datoPersonaJuridica',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                XPERSONAJURIDICA: $.trim($("#XPERSONAJURIDICA").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
                                } else {
                                    var l_Genm_Persona_Juridica_PA = data.l_Genm_Persona_Juridica_PA;
                                    console.log(l_Genm_Persona_Juridica_PA);

                                    $("#PersonaJuridica_RAZON_SOCIAL").val("");
                                    $("#PersonaJuridica_RUC").val("");
                                    $("#PersonaJuridica_NOMBRE_COMERCIAL").val("");
                                    $("#PersonaJuridica_DIRECCION_COMPLETA").val("");

                                    $("#ContactoRepre_CORREO").val("");
                                    $("#ContactoRepre_CARGO_DESCRIPCION").val("");
                                    $("#ContactoRepre_TELEFONO").val("");
                                    $("#ContactoRepre_NOMBRE_COMPLETO").val("");

                                    $("#PersonaJuridica_RAZON_SOCIAL").val(l_Genm_Persona_Juridica_PA[0].RAZON_SOCIAL);
                                    $("#PersonaJuridica_RUC").val(l_Genm_Persona_Juridica_PA[0].RUC);
                                    $("#PersonaJuridica_NOMBRE_COMERCIAL").val(l_Genm_Persona_Juridica_PA[0].NOMBRE_COMERCIAL);
                                    $("#PersonaJuridica_DIRECCION_COMPLETA").val(l_Genm_Persona_Juridica_PA[0].DIRECCION);


                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            desbloqObject();
                        });
                    }
                    else {
                        $("#PersonaJuridica_RAZON_SOCIAL").val("");
                        $("#PersonaJuridica_RUC").val("");
                        $("#PersonaJuridica_NOMBRE_COMERCIAL").val("");
                        $("#PersonaJuridica_DIRECCION_COMPLETA").val("");

                        $("#ContactoRepre_CORREO").val("");
                        $("#ContactoRepre_CARGO_DESCRIPCION").val("");
                        $("#ContactoRepre_TELEFONO").val("");
                        $("#ContactoRepre_NOMBRE_COMPLETO").val("");
                        $("#ContactoRepre_XCONTACTO").val("");
                    }
                }
            },
        });

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
                                url: '/AeronavePADM/datoTipoModelo',
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
                            url: '/AeronavePADM/datoModeloMotor',
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
                            url: '/AeronavePADM/datoModeloHelice',
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
                            url: '/AeronavePADM/datoModeloHelicoptero',
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


        $("#FECHA_INFORMACION").kendoDatePicker();
        $("#FECHA_INFORMACION").data("kendoDatePicker").readonly();

        $("#XDATOS_UTIL_AERONAVE_PA").kendoMultiSelect().data("kendoMultiSelect");
        $("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").kendoMultiSelect().data("kendoMultiSelect");

        $(".dropdown-menu li a").click(function () {
            $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
            $(this).parents(".dropdown").find('.btn').val($(this).data('value'));

            var btnValue = $(this).attr("btn-value");
            var uniValue = $(this).attr("uni-value");

            $('#' + btnValue).attr("uni-value", uniValue);
        });

        //Valores numericos

        $("#NRO_TANQUES_COMBUSTIBLE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#NRO_TRIPULACION").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#NRO_PASAJEROS").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#NRO_PASAJEROS_MAXIMO").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#TRIPULACION_MINIMA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#NRO_BODEGAS").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#CICLOS_VUELO").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#HORAS_VUELO").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#MINUTOS_VUELO").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_DIAS_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_CICLO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_HORAS_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });


        $("#txtNRO_PALAS").autoNumeric('init', { vMin: 0, vMax: 30, aSep: '' });
        $("#VIDA_LIMITE_HORAS_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#VIDA_LIMITE_CICLO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_HORAS_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_CICLOS_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#VIDA_LIMITE_MINUTO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
        $("#TSN_MINUTO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
        $("#TBO_MINUTO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
        $("#TSO_MINUTO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });
        $("#REMANENTE_MINUTO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 59, aSep: '' });

        $("#VIDA_LIMITE_HORAS_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#VIDA_LIMITE_CICLO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_HORAS_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_CICLO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#VIDA_LIMITE_HORAS_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#VIDA_LIMITE_CICLO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_HORAS_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_CICLO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_DIAS_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#VIDA_LIMITE_HORAS_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#VIDA_LIMITE_CICLO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_HORAS_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#REMANENTE_CICLO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_DIAS_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#VIDA_LIMITE_HORAS_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#VIDA_LIMITE_CICLO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_HORAS_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_CICLO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        $("#VIDA_LIMITE_HORAS_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#VIDA_LIMITE_CICLO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_HORAS_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_CICLO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });

        //valores nuemricos motor
        $("#TSN_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SN_MOTOR").attr("readonly", "readonly");

        $("#TBO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_BO_MOTOR").attr("readonly", "readonly");

        $("#TSO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#REMANENTE_DIAS_MOTOR").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SO_MOTOR").attr("readonly", "readonly");

        //valores numericos helices
        $("#TSN_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SN_HELICE").attr("readonly", "readonly");

        $("#TBO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_BO_HELICE").attr("readonly", "readonly");

        $("#TSO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_HELICE").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SO_HELICE").attr("readonly", "readonly");

        //valores numericos trenes
        $("#TSN_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SN_TRENES").attr("readonly", "readonly");

        $("#TBO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_BO_TRENES").attr("readonly", "readonly");

        $("#TSO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_TRENES").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SO_TRENES").attr("readonly", "readonly");
        //$("#FECHA_ULTIMO_OH_TRENES").attr("readonly", "readonly");

        //valores numericos helicoptero
        $("#TSN_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $//("#FECHA_LIMITE_SN_HELICOP").attr("readonly", "readonly");

        $("#TBO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_BO_HELICOP").attr("readonly", "readonly");

        $("#TSO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_HELICOP").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SO_HELICOP").attr("readonly", "readonly");
        //$("#FECHA_ULTIMO_OH_HELICOP").attr("readonly", "readonly");

        //valores numericos HELICOPPRItero rotor principal
        $("#TSN_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SN_HELICOPPRI").attr("readonly", "readonly");

        $("#TBO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_BO_HELICOPPRI").attr("readonly", "readonly");

        $("#TSO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_HELICOPPRI").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SO_HELICOPPRI").attr("readonly", "readonly");

        //valores numericos HELICOPCOLAtero
        $("#TSN_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSN_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SN_HELICOPCOLA").attr("readonly", "readonly");

        $("#TBO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CBO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_BO_HELICOPCOLA").attr("readonly", "readonly");

        $("#TSO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        $("#CSO_HELICOPCOLA").autoNumeric('init', { vMin: 0, vMax: 9999999999999999999999999, aSep: '' });
        //$("#FECHA_LIMITE_SO_HELICOPCOLA").attr("readonly", "readonly");

        $("#PESO_BASICO_VACIO").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_MAXIMO_DECOLAJE").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_OPERACIONAL_BASICO").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_MAXIMO_ATERRIZAJE").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_MAXIMO_TAXEO").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#PESO_MAXIMO_CERO_COMBUSTIBLE").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#CAPACIDAD_COMBUSTIBLE").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#CAPACIDAD_OXIGENO_TRIPULACION").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });
        $("#CAPACIDAD_OXIGENO_PASAJEROS").autoNumeric('init', { vMin: '0.00', vMax: '9999999999999999999999999.99', aSep: '', aDec: '.' });

        $("#VHF_RANGO_FRECUENCIA_INI").autoNumeric('init', { vMin: '0.000', vMax: '9999999999999999999999999.999', aSep: '', aDec: '.' });
        $("#VHF_RANGO_FRECUENCIA_FIN").autoNumeric('init', { vMin: '0.000', vMax: '9999999999999999999999999.999', aSep: '', aDec: '.' });
        $("#HF_RANGO_FRECUENCIA_INI").autoNumeric('init', { vMin: '0.000', vMax: '9999999999999999999999999.999', aSep: '', aDec: '.' });
        $("#HF_RANGO_FRECUENCIA_FIN").autoNumeric('init', { vMin: '0.000', vMax: '9999999999999999999999999.999', aSep: '', aDec: '.' });
        $("#VOR_ILS_RANGO_FRECUENCIA_INI").autoNumeric('init', { vMin: '0.000', vMax: '9999999999999999999999999.999', aSep: '', aDec: '.' });
        $("#VOR_ILS_RANGO_FRECUENCIA_FIN").autoNumeric('init', { vMin: '0.000', vMax: '9999999999999999999999999.999', aSep: '', aDec: '.' });
        $("#ADF_RANGO_FRECUENCIA_INI").autoNumeric('init', { vMin: '0.000', vMax: '9999999999999999999999999.999', aSep: '', aDec: '.' });
        $("#ADF_RANGO_FRECUENCIA_FIN").autoNumeric('init', { vMin: '0.000', vMax: '9999999999999999999999999.999', aSep: '', aDec: '.' });

        $("#TBO_HORA").autoNumeric('init', { vMin: '0', vMax: '9999999999999999999999999', aSep: '', aDec: '.' });
        $("#TBO_MINUTO").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#TSO_HORA").autoNumeric('init', { vMin: '0', vMax: '9999999999999999999999999', aSep: '', aDec: '.' });
        $("#TSO_MINUTO").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#REMANENTE_TOH_HORA").autoNumeric('init', { vMin: '0', vMax: '9999999999999999999999999', aSep: '', aDec: '.' });
        $("#REMANENTE_TOH_MINUTO").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#CBO_HORA").autoNumeric('init', { vMin: '0', vMax: '9999999999999999999999999', aSep: '', aDec: '.' });
        $("#CSO_HORA").autoNumeric('init', { vMin: '0', vMax: '9999999999999999999999999', aSep: '', aDec: '.' });
        $("#REMANENTE_COH_HORA").autoNumeric('init', { vMin: '0', vMax: '9999999999999999999999999', aSep: '', aDec: '.' });


        $("#VIDA_LIMITE_MINUTO_HELICE").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#TSN_MINUTO_HELICE").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#TBO_MINUTO_HELICE").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#TSO_MINUTO_HELICE").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#REMANENTE_MINUTO_HELICE").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });

        $("#VIDA_LIMITE_MINUTO_TRENES").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#TSN_MINUTO_TRENES").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#TBO_MINUTO_TRENES").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#TSO_MINUTO_TRENES").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });
        $("#REMANENTE_MINUTO_TRENES").autoNumeric('init', { vMin: '0', vMax: '59', aSep: '', aDec: '.' });

        //Type Head Contacto
        $('#ContactoRepre_NOMBRE_COMPLETO').typeahead({
            source: function (query, process) {
                return $.getJSON(
                    '/AeronavePADM/FilterContacto',
                    { criterio: query, id_persona_juridica: $("#XPERSONAJURIDICA").data("kendoComboBox").value() },
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

        
        //HORAS AERONAVES
        $("#TBO_HORA").blur(function (e) {
            if (Number($("#TSO_HORA").val()) == Number($("#TBO_HORA").val())) {
                if (Number($("#TBO_MINUTO").val()) < Number($("#TSO_MINUTO").val())) {
                    bootbox.alert("El TBO (Min) de la Aeronave no puede ser menor que el TSO (Min) de la Aeronave");
                    $("#TSO_MINUTO").val(0);
                }
            }
            if (Number($("#TBO_HORA").val()) < Number($("#TSO_HORA").val())) {
                bootbox.alert("El TBO (Hora) de la Aeronave no puede ser menor que el TSO (Hora) de la Aeronave");
                $("#TSO_HORA").val(0);
            }
        });

        $("#TSO_MINUTO").blur(function (e) {
            if (Number($("#TSO_HORA").val()) == Number($("#TBO_HORA").val())) {
                if (Number($("#TBO_MINUTO").val()) < Number($("#TSO_MINUTO").val())) {
                    bootbox.alert("El TBO (Min) de la Aeronave no puede ser menor que el TSO (Min) de la Aeronave");
                    $("#TSO_MINUTO").val(0);
                }
            }
        });
        $("#TBO_MINUTO").blur(function (e) {
            if (Number($("#TSO_HORA").val()) == Number($("#TBO_HORA").val())) {
                if (Number($("#TBO_MINUTO").val()) < Number($("#TSO_MINUTO").val())) {
                    bootbox.alert("El TBO (Min) de la Aeronave no puede ser menor que el TSO (Min) de la Aeronave");
                    $("#TSO_MINUTO").val(0);
                }
            }
        });
                
        $("#TSO_HORA").blur(function (e) {
            if (Number($("#TSO_HORA").val()) == Number($("#TBO_HORA").val())) {
                if (Number($("#TBO_MINUTO").val()) < Number($("#TSO_MINUTO").val())) {
                    bootbox.alert("El TBO (Min) de la Aeronave no puede ser menor que el TSO (Min) de la Aeronave");
                    $("#TSO_MINUTO").val(0);
                }
            }
            if (Number($("#TBO_HORA").val()) < Number($("#TSO_HORA").val())) {
                bootbox.alert("El TBO (Hora) de la Aeronave no puede ser menor que el TSO (Hora) de la Aeronave");
                $("#TSO_HORA").val(0);
            }
        });

        //HORAS MOTOR

        $("#TBO_MOTOR").blur(function (e) {
            if (Number($("#TSO_MOTOR").val()) == Number($("#TBO_MOTOR").val())) {
                if (Number($("#TBO_MINUTO_MOTOR").val()) < Number($("#TSO_MINUTO_MOTOR").val())) {
                    bootbox.alert("El TBO (Min) del motor de la Aeronave no puede ser menor que el TSO (Min) del motor de la Aeronave");
                    $("#TSO_MINUTO_MOTOR").val(0);
                }
            }
            if (Number($("#TBO_MOTOR").val()) < Number($("#TSO_MOTOR").val())) {
                bootbox.alert("El TBO (Hora) del motor de la Aeronave no puede ser menor que el TSO (Hora) del motor de la Aeronave");
                $("#TSO_MOTOR").val(0);
            }
        });

        $("#TSO_MOTOR").blur(function (e) {
            if (Number($("#TSO_MOTOR").val()) == Number($("#TBO_MOTOR").val())) {
                if (Number($("#TBO_MINUTO_MOTOR").val()) < Number($("#TSO_MINUTO_MOTOR").val())) {
                    bootbox.alert("El TBO (Min) del motor de la Aeronave no puede ser menor que el TSO (Min) del motor de la Aeronave");
                    $("#TSO_MINUTO_MOTOR").val(0);
                }
            }
            if (Number($("#TBO_MOTOR").val()) < Number($("#TSO_MOTOR").val())) {
                bootbox.alert("El TBO (Hora) del motor de la Aeronave no puede ser menor que el TSO (Hora) del motor de la Aeronave");
                $("#TSO_MOTOR").val(0);
            }
        });

        $("#TBO_MINUTO_MOTOR").blur(function (e) {
            if (Number($("#TSO_MOTOR").val()) == Number($("#TBO_MOTOR").val())) {
                if (Number($("#TBO_MINUTO_MOTOR").val()) < Number($("#TSO_MINUTO_MOTOR").val())) {
                    bootbox.alert("El TBO (Min) del motor de la Aeronave no puede ser menor que el TSO (Min) del motor de la Aeronave");
                    $("#TSO_MINUTO_MOTOR").val(0);
                }
            }
        });

        $("#TSO_MINUTO_MOTOR").blur(function (e) {
            if (Number($("#TSO_MOTOR").val()) == Number($("#TBO_MOTOR").val())) {
                if (Number($("#TBO_MINUTO_MOTOR").val()) < Number($("#TSO_MINUTO_MOTOR").val())) {
                    bootbox.alert("El TBO (Min) del motor de la Aeronave no puede ser menor que el TSO (Min) del motor de la Aeronave");
                    $("#TSO_MINUTO_MOTOR").val(0);
                }
            }
        });

        //HORAS HELICE

        $("#TBO_HELICE").blur(function (e) {
            if (Number($("#TSO_HELICE").val()) == Number($("#TBO_HELICE").val())) {
                if (Number($("#TBO_MINUTO_HELICE").val()) < Number($("#TSO_MINUTO_HELICE").val())) {
                    bootbox.alert("El TBO (Min) del hélice de la Aeronave no puede ser menor que el TSO (Min) del hélice de la Aeronave");
                    $("#TSO_MINUTO_HELICE").val(0);
                }
            }
            if (Number($("#TBO_HELICE").val()) < Number($("#TSO_HELICE").val())) {
                bootbox.alert("El TBO (Hora) del hélice de la Aeronave no puede ser menor que el TSO (Hora) del hélice de la Aeronave");
                $("#TSO_HELICE").val(0);
            }
        });

        $("#TSO_HELICE").blur(function (e) {
            if (Number($("#TSO_HELICE").val()) == Number($("#TBO_HELICE").val())) {
                if (Number($("#TBO_MINUTO_HELICE").val()) < Number($("#TSO_MINUTO_HELICE").val())) {
                    bootbox.alert("El TBO (Min) del hélice de la Aeronave no puede ser menor que el TSO (Min) del hélice de la Aeronave");
                    $("#TSO_MINUTO_HELICE").val(0);
                }
            }
            if (Number($("#TBO_HELICE").val()) < Number($("#TSO_HELICE").val())) {
                bootbox.alert("El TBO (Hora) del hélice de la Aeronave no puede ser menor que el TSO (Hora) del hélice de la Aeronave");
                $("#TSO_HELICE").val(0);
            }
        });

        $("#TBO_MINUTO_HELICE").blur(function (e) {
            if (Number($("#TSO_HELICE").val()) == Number($("#TBO_HELICE").val())) {
                if (Number($("#TBO_MINUTO_HELICE").val()) < Number($("#TSO_MINUTO_HELICE").val())) {
                    bootbox.alert("El TBO (Min) del hélice de la Aeronave no puede ser menor que el TSO (Min) del hélice de la Aeronave");
                    $("#TSO_MINUTO_HELICE").val(0);
                }
            }
        });

        $("#TSO_MINUTO_HELICE").blur(function (e) {
            if (Number($("#TSO_HELICE").val()) == Number($("#TBO_HELICE").val())) {
                if (Number($("#TBO_MINUTO_HELICE").val()) < Number($("#TSO_MINUTO_HELICE").val())) {
                    bootbox.alert("El TBO (Min) del hélice de la Aeronave no puede ser menor que el TSO (Min) del hélice de la Aeronave");
                    $("#TSO_MINUTO_HELICE").val(0);
                }
            }
        });

        
        $(".evalaeronavehora").blur(function () {
            fnRemanenteHora('TBO_HORA', 'TBO_MINUTO', 'TSO_HORA', 'TSO_MINUTO', 'REMANENTE_TOH_HORA', 'REMANENTE_TOH_MINUTO');
        });

        $(".evalmotorhora").blur(function () {
            fnRemanenteHora('TBO_MOTOR', 'TBO_MINUTO_MOTOR', 'TSO_MOTOR', 'TSO_MINUTO_MOTOR', 'REMANENTE_HORAS_MOTOR', 'REMANENTE_MINUTO_MOTOR');
        });

        $(".evalhelicehora").blur(function () {
            fnRemanenteHora('TBO_HELICE', 'TBO_MINUTO_HELICE', 'TSO_HELICE', 'TSO_MINUTO_HELICE', 'REMANENTE_HORAS_HELICE', 'REMANENTE_MINUTO_HELICE');
        });

        //CICLOS AERONAVES
        $("#CBO_HORA").blur(function (e) {
            if (Number($("#CBO_HORA").val()) < Number($("#CSO_HORA").val())) {
                bootbox.alert("El CBO (Ciclo) de la Aeronave no puede ser menor que el CSO (Ciclo) de la Aeronave");
                $("#CSO_HORA").val(0);
            }
        });
        $("#CSO_HORA").blur(function (e) {
            if (Number($("#CBO_HORA").val()) < Number($("#CSO_HORA").val())) {
                bootbox.alert("El CBO (Ciclo) de la Aeronave no puede ser menor que el CSO (Ciclo) de la Aeronave");
                $("#CSO_HORA").val(0);
            }
        });

        //CICLOS MOTOR

        $("#CBO_MOTOR").blur(function (e) {
            if (Number($("#CBO_MOTOR").val()) < Number($("#CSO_MOTOR").val())) {
                bootbox.alert("El CBO (Ciclo) del motor la Aeronave no puede ser menor que el CSO (Ciclo) del motor de la Aeronave");
                $("#CSO_MOTOR").val(0);
            }
        });

        $("#CSO_MOTOR").blur(function (e) {
            if (Number($("#CBO_MOTOR").val()) < Number($("#CSO_MOTOR").val())) {
                bootbox.alert("El CBO (Ciclo) del motor la Aeronave no puede ser menor que el CSO (Ciclo) del motor de la Aeronave");
                $("#CSO_MOTOR").val(0);
            }
        });


        $(".evalaeronaveciclo").blur(function () {
            fnRemanenteCiclo('CBO_HORA', 'CSO_HORA', 'REMANENTE_COH_HORA');
        });
        $(".evalmotorciclo").blur(function () {
            fnRemanenteCiclo('CBO_MOTOR', 'CSO_MOTOR', 'REMANENTE_CICLOS_MOTOR');
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
                        console.log(validHelicoptero());
                        if (validHelicoptero()) {
                            next = 'declaracion';
                            saveTrenes(next);
                        }
                        else{
                            saveTrenes(next);
                        }
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
                switch (valid) {
                    case 'trenes':
                        if (validHelicoptero()) {
                            next = 'declaracion';
                            activaTab("tabRegAeronave", next);
                        }
                        else {
                            activaTab("tabRegAeronave", next);
                        }
                        break;
                    default:
                        activaTab("tabRegAeronave", next);
                        
                }
                activaTab("tabRegAeronave", next);
            }
            if ($("#ID_ESTADO_AERONAVE_PA").val() == "1" || $("#ID_ESTADO_AERONAVE_PA").val() == "2") {
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
                            saveTrenes(next);
                        }
                        else {
                            saveTrenes(next);
                        }
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

        $("#addMotorAeronave").click(function () { actionRegMotor('N'); });
        $("#modifyMotorAeronave").click(function () { actionRegMotor('E'); });
        $("#btnRegistroModalMotor").click(function () { actionRegMotor('G'); });

        $("#addHelicesAeronave").click(function () { actionRegHelice('N'); });
        $("#modifyHelicesAeronave").click(function () { actionRegHelice('E'); });
        $("#btnRegistroModalHelice").click(function () { actionRegHelice('G'); });

        $("#addTrenesAeronave").click(function () { actionRegTrenes('N'); });
        $("#modifyTrenesAeronave").click(function () { actionRegTrenes('E'); });
        $("#btnRegistroModalTrenes").click(function () { actionRegTrenes('G'); });

        $("#addHelicopAeronave").click(function () { actionRegHelicop('N'); });
        $("#modifyHelicopAeronave").click(function () { actionRegHelicop('E'); });
        $("#btnRegistroModalHelicop").click(function () { actionRegHelicop('G'); });

        $("#addHelicopPriAeronave").click(function () { actionRegHelicopPri('N'); });
        $("#modifyHelicopPriAeronave").click(function () { actionRegHelicopPri('E'); });
        $("#btnRegistroModalHelicopPri").click(function () { actionRegHelicopPri('G'); });

        $("#addHelicopColaAeronave").click(function () { actionRegHelicopCola('N'); });
        $("#modifyHelicopColaAeronave").click(function () { actionRegHelicopCola('E'); });
        $("#btnRegistroModalHelicopCola").click(function () { actionRegHelicopCola('G'); });

        $("#XTIPO_AERONAVE_PA").change(function () {
            if ($("#XTIPO_AERONAVE_PA option:selected").val().trim().length != 0 && $("#XTIPO_AERONAVE_PA option:selected").val() != null) {
                validHelicoptero();
                console.log($("#XFABRICANTE_PA").data("kendoDropDownList").value());
                if ($.trim($("#XFABRICANTE_PA").data("kendoDropDownList").value()) != "" && $("#XFABRICANTE_PA").data("kendoDropDownList").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/AeronavePADM/datoTipoModelo',
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
        });

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
            //carga helicop rotor principal
            gridHelicopPriAeronave("");
            //carga helicop rotor cola
            gridHelicopColaAeronave("");
        }
        else {
            datosGrillas();
        }

        $(".btnCancelarAeronave").click(function () {
            window.location = "/ConsultaBandejaTotalPA/Index";
        });

        $("#btnGuardarAeronave").click(function () {
            if (validConformidad()) {
                var objConforAjax = [];

                $("#tblConformidad select").each(function () {
                    var ident = $(this).attr("identificador");
                    var dataConfor = {
                        XAERONAVE_PA: $("#XAERONAVE_PA").val(),
                        XITEM_CONFORMIDAD_PA: $("#hdXITEM_CONFORMIDAD_PA_" + ident).val(),
                        XDECLA_CONFORMIDAD_PA: $("#hdDecla_" + ident).val(),
                        XTIPO_LEYENDA_PA: $("#cbDecla_" + ident + "  option:selected").val(),
                    }

                    objConforAjax.push(dataConfor);
                });

                var flagCrConformidad = "0";
                var divDatosDeclaracion = "divDatosDeclaracion";

                if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
                    if ($("#crDatosDeclaracion").val() == "1") {
                        flagCrConformidad = "1";
                    }
                }

                $.ajax({
                    datatype: 'json',
                    url: '/AeronavePADM/SaveConformidad',
                    type: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify({
                        objConfor: objConforAjax
                        , flagCrConformidad: flagCrConformidad
                        , divDatosDeclaracion: divDatosDeclaracion
                        , EstadoAeronave: $("#ID_ESTADO_AERONAVE_PA").val()
                        , XAERONAVE_PA: $("#XAERONAVE_PA").val()
                    }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        if (!data.rpta) {
                            errorAddModelo("divErrorDeclaracion", "ulListaErrorDatosGeneralesAjax", data.errores);
                        } else {
                            bootbox.alert("El registro de la aeronave esta completo!", function () {                               
                                //NO PONER NADA POR MIENTRAS
                                window.location = "/ConsultaBandejaTotalPA/Index";
                                //window.location = "/EnviarRegistroPADM/Index";
                            });
                        }
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    desbloqObject();
                });
            }
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
        valStateAeronave();

    });
});


function fnRemanenteHora(TBO_HORA, TBO_MINUTO, TSO_HORA, TSO_MINUTO, REMANENTE_TOH_HORA, REMANENTE_TOH_MINUTO) {
    var TBO_HORA = $("#" + TBO_HORA).val();
    var TBO_MINUTO = $("#" + TBO_MINUTO).val();

    var TSO_HORA = $("#" + TSO_HORA).val();
    var TSO_MINUTO = $("#" + TSO_MINUTO).val();

    var TOTALHORA = (((Number(TBO_HORA) * 60) + Number(TBO_MINUTO)) - ((Number(TSO_HORA * 60) + Number(TSO_MINUTO))));

    $('#' + REMANENTE_TOH_HORA).val(parseInt(TOTALHORA / 60));
    $('#' + REMANENTE_TOH_MINUTO).val(parseInt(TOTALHORA % 60));
}
function fnRemanenteCiclo(TBO_HORA,  TSO_HORA,  REMANENTE_TOH_HORA) {
    var TBO_HORA = $("#" + TBO_HORA).val();

    var TSO_HORA = $("#" + TSO_HORA).val();

    var TOTALHORA = (Number(TBO_HORA) - Number(TSO_HORA)) ;

    $('#' + REMANENTE_TOH_HORA).val(parseInt(TOTALHORA));
}
function onSelectFabricanteHelice(e) {
    var dataItem = this.dataItem(e.item);
    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/AeronavePADM/datoModeloHelice',
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
            url: '/AeronavePADM/datoModeloHelicoptero',
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
            url: '/AeronavePADM/datoModeloMotor',
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
function SelectModeloMotor(Fabricante, e) {
    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/datoModeloMotor',
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
        url: '/AeronavePADM/datoModeloHelice',
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
        url: '/AeronavePADM/datoModeloHelicoptero',
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
function onSelectFabricante(e) {
    var dataItem = this.dataItem(e.item);
    if ($("#XTIPO_AERONAVE_PA option:selected").val().trim().length != 0 && $("#XTIPO_AERONAVE_PA option:selected").val() != null) {
        if (dataItem.value != "" && dataItem.value != null) {
            $.ajax({
                datatype: 'json',
                url: '/AeronavePADM/datoTipoModelo',
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

function valStateAeronave() {
    var Estado = $("#ID_ESTADO_AERONAVE_PA").val();
    switch (Estado) {
        case '1':
            break;
        case '2':
            $("#XPERSONAJURIDICA").data("kendoComboBox").enable(false);
            break;
        case '3':
            disabledDivDatosGenerales();
            disabledDivDatosAeronave();
            disabledDivDatosSolicitante();
            disabledDivDatosTecnicos();
            disabledDivDatosTanques();
            disabledDivDatosAvionica();
            disabledDivDatosOperaciones();
            disabledDivDatosDeclaracion();
            $("#addMotorAeronave").hide();
            $("#modifyMotorAeronave").html('Visualizar Datos');
            $("#btnRegistroModalMotor").hide();

            $("#addHelicesAeronave").hide();
            $("#modifyHelicesAeronave").html('Visualizar Datos');
            $("#btnRegistroModalHelice").hide();

            $("#addTrenesAeronave").hide();
            $("#modifyTrenesAeronave").html('Visualizar Datos');
            $("#btnRegistroModalTrenes").hide();

            $("#addHelicopAeronave").hide();
            $("#modifyHelicopAeronave").html('Visualizar Datos');
            $("#btnRegistroModalHelicop").hide();

            $("#addHelicopPriAeronave").hide();
            $("#modifyHelicopPriAeronave").html('Visualizar Datos');
            $("#btnRegistroModalHelicopPri").hide();

            $("#addHelicopColaAeronave").hide();
            $("#modifyHelicopColaAeronave").html('Visualizar Datos');
            $("#btnRegistroModalHelicopCola").hide();
            $(".clsSituacion").html("(El Registro no se puede modificar)");
            $("#btnGuardarAeronave").hide();
            break;
        case '4':
            disabledDivDatosGenerales();
            $("#crGeneral").val("0");
            disabledDivDatosAeronave();
            $("#crDatosAeronave").val("0");
            disabledDivDatosSolicitante();
            $("#crDatosSolicitante").val("0");
            disabledDivDatosTecnicos();
            $("#crDatosTecnicos").val("0");
            disabledDivDatosTanques();
            $("#crDatosTanques").val("0");
            disabledDivDatosAvionica();
            $("#crDatosAvionica").val("0");
            disabledDivDatosOperaciones();
            $("#crDatosOperaciones").val("0");
            disabledDivDatosDeclaracion();
            $("#crDatosDeclaracion").val("0");

            $("#addMotorAeronave").hide();
            $("#modifyMotorAeronave").html('Visualizar Datos');
            $("#btnRegistroModalMotor").hide();
            $("#crDatosMotores").val("0");

            $("#addHelicesAeronave").hide();
            $("#modifyHelicesAeronave").html('Visualizar Datos');
            $("#btnRegistroModalHelice").hide();
            $("#crDatosHelices").val("0");

            $("#addTrenesAeronave").hide();
            $("#modifyTrenesAeronave").html('Visualizar Datos');
            $("#btnRegistroModalTrenes").hide();
            $("#crDatosTrenes").val("0");

            $("#addHelicopAeronave").hide();
            $("#modifyHelicopAeronave").html('Visualizar Datos');
            $("#btnRegistroModalHelicop").hide();
            $("#crDatosHelicopteros").val("0");
            $("#btnNewHeliceHelicop").hide();
            $("#btnRegistroHeliceModalHelicop").hide();

            $("#addHelicopPriAeronave").hide();
            $("#modifyHelicopPriAeronave").html('Visualizar Datos');
            $("#btnRegistroModalHelicopPri").hide();
            $("#crDatosHelicopPri").val("0");

            $("#addHelicopColaAeronave").hide();
            $("#modifyHelicopColaAeronave").html('Visualizar Datos');
            $("#btnRegistroModalHelicopCola").hide();
            $("#crDatosHelicopCola").val("0");

            datosCorreccion();
            break;
    }
}
function datosCorreccion() {
    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/datoCorreccion',
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
                errorAddModelo("divErrorAeronave", "ulListaErrorAeronave", data.errores);
            } else {
                var l_Genm_Correccion_PA = data.l_Genm_Correccion_PA;

                $.each(l_Genm_Correccion_PA, function (key, value) {
                    var divDato = value.DETDIV;
                    var divMessage = value.MENSAJE;
                    var dataDiv = $("#" + divDato).attr("data-div");

                    $("#" + divDato).removeClass("dhhBorder");
                    $("#" + divDato).addClass("dhhBorderError");
                    $("#" + dataDiv).show();
                    $("#" + divDato + " p").html(divMessage);

                    valDisableDiv(divDato);
                });
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function valDisableDiv(div) {
    if (div == "divGeneral") {
        enabledDivDatosGenerales();
        $("#crGeneral").val("1");
    }
    if (div == "divDatosAeronave") {
        enabledDivDatosAeronave();
        $("#crDatosAeronave").val("1");
    }
    if (div == "divDatosSolicitante") {
        enabledDivDatosSolicitante();
        $("#crDatosSolicitante").val("1");
    }
    if (div == "divDatosTecnicos") {
        enabledDivDatosTecnicos();
        $("#crDatosTecnicos").val("1");
    }
    if (div == "divDatosTanques") {
        enabledDivDatosTanques();
        $("#crDatosTanques").val("1");
    }
    if (div == "divDatosAvionica") {
        enabledDivDatosAvionica();
        $("#crDatosAvionica").val("1");
    }
    if (div == "divDatosOperaciones") {
        enabledDivDatosOperaciones();
        $("#crDatosOperaciones").val("1");
    }
    if (div == "divDatosMotores") {
        $("#addMotorAeronave").show();
        $("#modifyMotorAeronave").html('Modificar Datos');
        $("#btnRegistroModalMotor").show();
        $("#crDatosMotores").val("1");
    }
    if (div == "divDatosHelices") {
        $("#addHelicesAeronave").show();
        $("#modifyHelicesAeronave").html('Modificar Datos');
        $("#btnRegistroModalHelice").show();
        $("#crDatosHelices").val("1");
    }
    if (div == "divDatosTrenes") {
        $("#addTrenesAeronave").show();
        $("#modifyTrenesAeronave").html('Modificar Datos');
        $("#btnRegistroModalTrenes").show();
        $("#crDatosTrenes").val("1");
    }
    if (div == "divDatosHelicopteros") {
        $("#addHelicopAeronave").show();
        $("#modifyHelicopAeronave").html('Modificar Datos');
        $("#btnRegistroModalHelicop").show();
        $("#crDatosHelicopteros").val("1");

        $("#btnRegistroModalHelicop").show();
        $("#btnNewHeliceHelicop").show();
        $("#btnRegistroHeliceModalHelicop").show();
    }
    if (div == "divDatosHelicopPri") {
        $("#addHelicopPriAeronave").show();
        $("#modifyHelicopPriAeronave").html('Modificar Datos');
        $("#btnRegistroModalHelicopPri").show();
        $("#crDatosHelicopPri").val("1");
    }
    if (div == "divDatosHelicopCola") {
        $("#addHelicopColaAeronave").show();
        $("#modifyHelicopColaAeronave").html('Modificar Datos');
        $("#btnRegistroModalHelicopCola").show();
        $("#crDatosHelicopCola").val("1");
    }
    if (div == "divDatosDeclaracion") {
        enabledDivDatosDeclaracion();
        $("#crDatosDeclaracion").val("1");
    }
}
function datosGrillas() {

    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/grillasAeronave',
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

function saveHelicop(next) {
    var objHelicopAjax = [];
    var gridHelicop = $("#gridHelicop").data("kendoGrid").dataSource.data();

    $.each(gridHelicop, function (index, item) {
        var dataHelicop = {
            XAERONAVE_PA: $("#XAERONAVE_PA").val(),
            XHELICOPTERO_PA: item.XHELICOPTERO_PA,
            XPOSICION_HELICOPTERO_PA: item.XPOSICION_HELICOPTERO_PA,
            XFABRICANTE_PA: item.XFABRICANTE_PA,
            XMODELO_PA: item.XMODELO_PA,
            XTIPO_HELICOPTERO_PA: item.XTIPO_HELICOPTERO_PA,
            NUMERO_SERIE: item.NUMERO_SERIE,
            TSN: item.TSN,
            CSN: item.CSN,
            TBO: item.TBO,
            CBO: item.CBO,
            TSO: item.TSO,
            CSO: item.CSO,
            VIDA_LIMITE_HORAS: item.VIDA_LIMITE_HORAS,
            VIDA_LIMITE_CICLO: item.VIDA_LIMITE_CICLO,
            FECHA_VIDA_LIMITE: item.FECHA_VIDA_LIMITE,
            FECHA_ULTIMO_OH: item.FECHA_ULTIMO_OH,
            REMANENTE_HORAS: item.REMANENTE_HORAS,
            REMANENTE_CICLO: item.REMANENTE_CICLO,
            NUMERO_PARTE: item.NUMERO_PARTE,
            FECHA_LIMITE_SN: item.FECHA_LIMITE_SN,
            FECHA_LIMITE_BO: item.FECHA_LIMITE_BO,
            FECHA_LIMITE_SO: item.FECHA_LIMITE_SO,
            REMANENTE_DIAS: item.REMANENTE_DIAS,

            FECHA_TURNM: item.FECHA_TURNM,
            FECHA_CURM: item.FECHA_CURM,
            VIDA_LIMITE_MINUTO: item.VIDA_LIMITE_MINUTO,
            TSN_MINUTO: item.TSN_MINUTO,
            TBO_MINUTO: item.TBO_MINUTO,
            TSO_MINUTO: item.TSO_MINUTO,
            REMANENTE_MINUTO: item.REMANENTE_MINUTO
        }
        objHelicopAjax.push(dataHelicop);
    });

    var flagCrHelicop = "0";
    var divDatosHelicopteros = "divDatosHelicopteros";


    if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
        if ($("#crDatosHelicopteros").val() == "1") {
            flagCrHelicop = "1";
        }
    }

    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/SaveHelicop',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            objHelicop: objHelicopAjax
            , flagCrHelicop: flagCrHelicop
            , divDatosHelicopteros: divDatosHelicopteros
            , EstadoAeronave: $("#ID_ESTADO_AERONAVE_PA").val()
            , XAERONAVE_PA: $("#XAERONAVE_PA").val()
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorHelicop", "ulListaErrorHelicop", data.errores);
            } else {
                datosGrillas();
                if (next != "") {
                    activaTab("tabRegAeronave", next);
                }
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
        return false;
    });
}

function saveTrenes(next) {
    var objTrenesAjax = [];
    var gridTrenes = $("#gridTrenes").data("kendoGrid").dataSource.data();

    $.each(gridTrenes, function (index, item) {
        var dataTrenes = {
            XAERONAVE_PA: $("#XAERONAVE_PA").val(),
            XTRENES_PA: item.XTRENES_PA,
            XPOSICION_TRENES_PA: item.XPOSICION_TRENES_PA,
            XMODELO_PA: item.XMODELO_PA,
            XTIPO_TRENES_PA: item.XTIPO_TRENES_PA,
            NUMERO_SERIE: item.NUMERO_SERIE,
            TSN: item.TSN,
            CSN: item.CSN,
            TBO: item.TBO,
            CBO: item.CBO,
            TSO: item.TSO,
            CSO: item.CSO,
            VIDA_LIMITE_HORAS: item.VIDA_LIMITE_HORAS,
            VIDA_LIMITE_CICLO: item.VIDA_LIMITE_CICLO,
            FECHA_VIDA_LIMITE: item.FECHA_VIDA_LIMITE,
            FECHA_ULTIMO_OH: item.FECHA_ULTIMO_OH,
            REMANENTE_HORAS: item.REMANENTE_HORAS,
            REMANENTE_CICLO: item.REMANENTE_CICLO,
            NUMERO_PARTE: item.NUMERO_PARTE,
            FECHA_LIMITE_SN: item.FECHA_LIMITE_SN,
            FECHA_LIMITE_BO: item.FECHA_LIMITE_BO,
            FECHA_LIMITE_SO: item.FECHA_LIMITE_SO,
            REMANENTE_DIAS: item.REMANENTE_DIAS,

            VIDA_LIMITE_MINUTO: item.VIDA_LIMITE_MINUTO,
            TSN_MINUTO: item.TSN_MINUTO,
            TBO_MINUTO: item.TBO_MINUTO,
            TSO_MINUTO: item.TSO_MINUTO,
            REMANENTE_MINUTO: item.REMANENTE_MINUTO,
            FECHA_TURNM: item.FECHA_TURNM,
            FECHA_CURM: item.FECHA_CURM
        }
        objTrenesAjax.push(dataTrenes);
    });

    var flagCrTrenes = "0";
    var divDatosTrenes = "divDatosTrenes";

    if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
        if ($("#crDatosTrenes").val() == "1") {
            flagCrTrenes = "1";
        }
    }

    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/SaveTrenes',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            objTrenes: objTrenesAjax
            , flagCrTrenes: flagCrTrenes
            , divDatosTrenes: divDatosTrenes
            , EstadoAeronave: $("#ID_ESTADO_AERONAVE_PA").val()
            , XAERONAVE_PA: $("#XAERONAVE_PA").val()
        }),
        beforeSend: function () {
            bloquoteObject()
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorTrenes", "ulListaErrorTrenes", data.errores);
            } else {
                datosGrillas();
                activaTab("tabRegAeronave", next);
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
        return false;
    });
}

function saveHelices(next) {
    var objHelicesAjax = [];
    var gridHelices = $("#gridHelices").data("kendoGrid").dataSource.data();

    $.each(gridHelices, function (index, item) {
        var dataHelices = {
            XAERONAVE_PA: $("#XAERONAVE_PA").val(),
            XHELICES_PA: item.XHELICES_PA,
            XPOSICION_HELICES_PA: item.XPOSICION_HELICES_PA,
            XMODELO_PA: item.XMODELO_PA,
            XFABRICANTE_PA: item.XFABRICANTE_PA,
            NUMERO_SERIE: item.NUMERO_SERIE,
            TSN: item.TSN,
            CSN: item.CSN,
            TBO: item.TBO,
            CBO: item.CBO,
            TSO: item.TSO,
            CSO: item.CSO,
            VIDA_LIMITE_HORAS: item.VIDA_LIMITE_HORAS,
            VIDA_LIMITE_CICLO: item.VIDA_LIMITE_CICLO,
            FECHA_VIDA_LIMITE: item.FECHA_VIDA_LIMITE,
            FECHA_ULTIMO_OH: item.FECHA_ULTIMO_OH,
            REMANENTE_HORAS: item.REMANENTE_HORAS,
            REMANENTE_CICLO: item.REMANENTE_CICLO,
            REMANENTE_DIAS: item.REMANENTE_DIAS,
            NUMERO_PARTE: item.NUMERO_PARTE,
            FECHA_LIMITE_SN: item.FECHA_LIMITE_SN,
            FECHA_LIMITE_BO: item.FECHA_LIMITE_BO,
            FECHA_LIMITE_SO: item.FECHA_LIMITE_SO,

            VIDA_LIMITE_MINUTO: item.VIDA_LIMITE_MINUTO,
            TSN_MINUTO: item.TSN_MINUTO,
            TBO_MINUTO: item.TBO_MINUTO,
            TSO_MINUTO: item.TSO_MINUTO,
            REMANENTE_MINUTO: item.REMANENTE_MINUTO,
            FECHA_TURNM: item.FECHA_TURNM
        }
        objHelicesAjax.push(dataHelices);
    });

    var flagCrHelices = "0";
    var divDatosHelices = "divDatosHelices";

    if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
        if ($("#crDatosHelices").val() == "1") {
            flagCrHelices = "1";
        }
    }

    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/SaveHelices',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            objHelices: objHelicesAjax
            , flagCrHelices: flagCrHelices
            , divDatosHelices: divDatosHelices
            , EstadoAeronave: $("#ID_ESTADO_AERONAVE_PA").val()
            , XAERONAVE_PA: $("#XAERONAVE_PA").val()
        }),
        beforeSend: function () {
            bloquoteObject()
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorHelice", "ulListaErrorHelice", data.errores);
            } else {
                datosGrillas();
                activaTab("tabRegAeronave", next);
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
        return false;
    });
}
function saveMotores(next) {
    var objMotoresAjax = [];
    var gridMotores = $("#gridMotores").data("kendoGrid").dataSource.data();

    $.each(gridMotores, function (index, item) {
        var dataMotores = {
            XAERONAVE_PA: $("#XAERONAVE_PA").val(),
            XMOTOR_AERONAVE_PA: item.XMOTOR_AERONAVE_PA,
            XPOSICION_MOTOR_PA: item.XPOSICION_MOTOR_PA,
            XMODELO_PA: item.XMODELO_PA,
            XFABRICANTE_PA: item.XFABRICANTE_PA,
            NUMERO_SERIE: item.NUMERO_SERIE,
            TSN: item.TSN,
            CSN: item.CSN,
            TBO: item.TBO,
            CBO: item.CBO,
            TSO: item.TSO,
            CSO: item.CSO,
            VIDA_LIMITE_HORAS: item.VIDA_LIMITE_HORAS,
            VIDA_LIMITE_CICLO: item.VIDA_LIMITE_CICLO,
            FECHA_VIDA_LIMITE: item.FECHA_VIDA_LIMITE,
            IDENTIFICADOR_DISCO_LIMITANTE: item.IDENTIFICADOR_DISCO_LIMITANTE,
            REMANENTE_HORAS: item.REMANENTE_HORAS,
            REMANENTE_CICLOS: item.REMANENTE_CICLOS,
            FECHA_LIMITE_SN: item.FECHA_LIMITE_SN,
            FECHA_LIMITE_BO: item.FECHA_LIMITE_BO,
            FECHA_LIMITE_SO: item.FECHA_LIMITE_SO,
            NUMERO_PARTE: item.NUMERO_PARTE,
            REMANENTE_DIAS: item.REMANENTE_DIAS,

            VIDA_LIMITE_MINUTO: item.VIDA_LIMITE_MINUTO,
            TSN_MINUTO: item.TSN_MINUTO,
            TBO_MINUTO: item.TBO_MINUTO,
            TSO_MINUTO: item.TSO_MINUTO,
            REMANENTE_MINUTO: item.REMANENTE_MINUTO,

            FECHA_TURNM: item.FECHA_TURNM,
            FECHA_CURM: item.FECHA_CURM
        }
        objMotoresAjax.push(dataMotores);
    });
    var flagCrMotores = "0";
    var divDatosMotores = "divDatosMotores";

    if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
        if ($("#crDatosMotores").val() == "1") {
            flagCrMotores = "1";
        }
    }

    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/SaveMotores',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            objMotores: objMotoresAjax
            , flagCrMotores: flagCrMotores
            , divDatosMotores: divDatosMotores
            , EstadoAeronave: $("#ID_ESTADO_AERONAVE_PA").val()
            , XAERONAVE_PA: $("#XAERONAVE_PA").val()
        }),
        beforeSend: function () {
            bloquoteObject()
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorMotorGeneral", "ulListaErrorMotorGeneral", data.errores);
            } else {
                datosGrillas();
                activaTab("tabRegAeronave", next);
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
        return false;
    });
}
function saveTecnicoDos(next) {
    var objTanquesAjax = {
        XTANQUES_PA: $("#XTANQUES_PA").val(),
        NRO_TANQUES_COMBUSTIBLE: $("#NRO_TANQUES_COMBUSTIBLE").val(),
        CAPACIDAD_COMBUSTIBLE: $("#CAPACIDAD_COMBUSTIBLE").val(),
        XUNIDAD_MEDIDA_COMBUSTIBLE: $("#XUNIDAD_MEDIDA_COMBUSTIBLE").attr("uni-value"),
        NRO_TRIPULACION: $("#NRO_TRIPULACION").val(),
        CAPACIDAD_OXIGENO_TRIPULACION: $("#CAPACIDAD_OXIGENO_TRIPULACION").val(),
        XUNIDAD_MEDIDA_CAP_OXIGENO: $("#XUNIDAD_MEDIDA_CAP_OXIGENO").attr("uni-value"),
        NRO_PASAJEROS: $("#NRO_PASAJEROS").val(),
        CAPACIDAD_OXIGENO_PASAJEROS: $("#CAPACIDAD_OXIGENO_PASAJEROS").val(),
        XUNIDAD_MEDIDA_CAP_PASA: $("#XUNIDAD_MEDIDA_CAP_PASA").attr("uni-value"),
        XAERONAVE_PA: $("#XAERONAVE_PA").val()
    }

    var objAvionicaAjax = {
        XEQUIPO_AVIONICA_PA: $("#XEQUIPO_AVIONICA_PA").val(),
        CODIGO_ASIGNACION_DIRECCIONES: $("#CODIGO_ASIGNACION_DIRECCIONES").val(),
        ELT_CODIFICACION: $("#ELT_CODIFICACION").val(),
        VHF_COMUNICACION: $("#VHF_COMUNICACION").val(),
        VHF_RANGO_FRECUENCIA_INI: $("#VHF_RANGO_FRECUENCIA_INI").val(),
        VHF_RANGO_FRECUENCIA_FIN: $("#VHF_RANGO_FRECUENCIA_FIN").val(),
        XUNIDAD_MEDIDA_VHF: $("#XUNIDAD_MEDIDA_VHF").attr("uni-value"),
        HF_COMUNICACION: $("#HF_COMUNICACION").val(),
        HF_RANGO_FRECUENCIA_INI: $("#HF_RANGO_FRECUENCIA_INI").val(),
        HF_RANGO_FRECUENCIA_FIN: $("#HF_RANGO_FRECUENCIA_FIN").val(),
        XUNIDAD_MEDIDA_HF: $("#XUNIDAD_MEDIDA_HF").attr("uni-value"),
        VOR_ILS: $("#VOR_ILS").val(),
        VOR_ILS_RANGO_FRECUENCIA_INI: $("#VOR_ILS_RANGO_FRECUENCIA_INI").val(),
        VOR_ILS_RANGO_FRECUENCIA_FIN: $("#VOR_ILS_RANGO_FRECUENCIA_FIN").val(),
        XUNIDAD_MEDIDA_VOR: $("#XUNIDAD_MEDIDA_VOR").attr("uni-value"),
        ADF: $("#ADF").val(),
        ADF_RANGO_FRECUENCIA_INI: $("#ADF_RANGO_FRECUENCIA_INI").val(),
        ADF_RANGO_FRECUENCIA_FIN: $("#ADF_RANGO_FRECUENCIA_FIN").val(),
        XUNIDAD_MEDIDA_ADF: $("#XUNIDAD_MEDIDA_ADF").attr("uni-value"),
        XAERONAVE_PA: $("#XAERONAVE_PA").val()
    }

    var objOperacionesAjax = {
        TRIPULACION_MINIMA: $("#TRIPULACION_MINIMA").val(),
        NRO_PASAJEROS_MAXIMO: $("#NRO_PASAJEROS_MAXIMO").val(),
        CAPACIDAD_CARGA_UTIL: $("#CAPACIDAD_CARGA_UTIL").val(),
        XUNIDAD_MEDIDA_CAP_CARGA: $("#XUNIDAD_MEDIDA_CAP_CARGA").attr("uni-value"),
        NRO_BODEGAS: $("#NRO_BODEGAS").val(),
        CAPACIDAD_CARGA_BODEGAS: $("#CAPACIDAD_CARGA_BODEGAS").val(),
        XUNIDAD_MEDIDA_CAP_CARGA_BO: $("#XUNIDAD_MEDIDA_CAP_CARGA_BO").attr("uni-value"),
        CAPACIDAD_VOLUMETRICA_BODEGAS: $("#CAPACIDAD_VOLUMETRICA_BODEGAS").val(),
        XUNIDAD_MEDIDA_CAP_VOL_BO: $("#XUNIDAD_MEDIDA_CAP_VOL_BO").attr("uni-value"),
        AUTONOMIA_VUELO: $("#AUTONOMIA_VUELO").val(),
        XUNIDAD_MEDIDA_HORAS_VUELO: $("#XUNIDAD_MEDIDA_HORAS_VUELO").attr("uni-value"),
        CONSUMO_HORARIO_COMBUSTIBLE: $("#CONSUMO_HORARIO_COMBUSTIBLE").val(),
        XUNIDAD_MEDIDA_CONS_COMB: $("#XUNIDAD_MEDIDA_CONS_COMB").attr("uni-value"),
        TECHO_MAXIMO: $("#TECHO_MAXIMO").val(),
        XUNIDAD_MEDIDA_TECHO_MAX: $("#XUNIDAD_MEDIDA_TECHO_MAX").attr("uni-value"),
        TECHO_CRUCERO: $("#TECHO_CRUCERO").val(),
        XUNIDAD_MEDIDA_TECHO_CRU: $("#XUNIDAD_MEDIDA_TECHO_CRU").attr("uni-value"),
        VELOCIDAD_MAXIMA: $("#VELOCIDAD_MAXIMA").val(),
        XUNIDAD_MEDIDA_VEL_MAX: $("#XUNIDAD_MEDIDA_VEL_MAX").attr("uni-value"),
        VELOCIDAD_CRUCERO: $("#VELOCIDAD_CRUCERO").val(),
        XUNIDAD_MEDIDA_VEL_CRU: $("#XUNIDAD_MEDIDA_VEL_CRU").attr("uni-value"),
        XAERONAVE_PA: $("#XAERONAVE_PA").val(),
        XDATOS_OPERACIONALES_PA: $("#XDATOS_OPERACIONALES_PA").val()
    }
    var flagCrTanque = "0";
    var divDatosTanques = "divDatosTanques";

    var flagCrAvionica = "0";
    var divDatosAvionica = "divDatosAvionica";

    var flagCrOperacion = "0";
    var divDatosOperaciones = "divDatosOperaciones";

    if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
        if ($("#crDatosTanques").val() == "1") {
            flagCrTanque = "1";
        }
        if ($("#crDatosAvionica").val() == "1") {
            flagCrAvionica = "1";
        }
        if ($("#crDatosOperaciones").val() == "1") {
            flagCrOperacion = "1";
        }
    }
    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/SaveTecnicoDos',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            objTanques: objTanquesAjax
            , objAvionica: objAvionicaAjax
            , objOperaciones: objOperacionesAjax
            , flagCrTanque: flagCrTanque
            , flagCrAvionica: flagCrAvionica
            , flagCrOperacion: flagCrOperacion
            , divDatosTanques: divDatosTanques
            , divDatosAvionica: divDatosAvionica
            , divDatosOperaciones: divDatosOperaciones
            , EstadoAeronave: $("#ID_ESTADO_AERONAVE_PA").val()

        }),
        beforeSend: function () {
            bloquoteObject()
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorDatosOperaciones", "ulListaDatosOperaciones", data.errores);
            } else {
                datoflag = true;
                $("#XTANQUES_PA").val(data.tanque);
                $("#XEQUIPO_AVIONICA_PA").val(data.avionica);
                $("#XDATOS_OPERACIONALES_PA").val(data.operacional);
                activaTab("tabRegAeronave", next);
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
        return datoflag;
    });
}
function saveTecnico(next) {
    var lRap = $("#XDATOS_UTIL_AERONAVE_PA").data('kendoMultiSelect');

    var objDatosTecAjax = {
        XDATOS_TEC_AERONAVE_PA: $("#XDATOS_TEC_AERONAVE_PA").val(),
        XTIPO_SERVICIO_PA: $("#XTIPO_SERVICIO_PA option:selected").val(),
        XCATEGORIA_AERONAVE_PA: $("#XCATEGORIA_AERONAVE_PA option:selected").val(),
        XUTIL_AERONAVE_RAP_PA: $("#XUTIL_AERONAVE_RAP_PA option:selected").val(),
        PESO_BASICO_VACIO: $("#PESO_BASICO_VACIO").val(),
        XUNIDAD_PESO_BASICO_VACIO: $("#XUNIDAD_PESO_BASICO_VACIO").attr("uni-value"),
        PESO_MAXIMO_DECOLAJE: $("#PESO_MAXIMO_DECOLAJE").val(),
        XUNIDAD_MAXIMO_DECOLAJE: $("#XUNIDAD_MAXIMO_DECOLAJE").attr("uni-value"),
        PESO_OPERACIONAL_BASICO: $("#PESO_OPERACIONAL_BASICO").val(),
        XUNIDAD_PESO_OPERACIONAL_BAS: $("#XUNIDAD_PESO_OPERACIONAL_BAS").attr("uni-value"),
        PESO_MAXIMO_ATERRIZAJE: $("#PESO_MAXIMO_ATERRIZAJE").val(),
        XUNIDAD_MAXIMO_ATERRIZAJE: $("#XUNIDAD_MAXIMO_ATERRIZAJE").attr("uni-value"),
        PESO_MAXIMO_TAXEO: $("#PESO_MAXIMO_TAXEO").val(),
        XUNIDAD_PESO_MAXIMO_TAXEO: $("#XUNIDAD_PESO_MAXIMO_TAXEO").attr("uni-value"),
        PESO_MAXIMO_CERO_COMBUSTIBLE: $("#PESO_MAXIMO_CERO_COMBUSTIBLE").val(),
        XUNIDAD_MAXIMO_CERO_COMBUSTI: $("#XUNIDAD_MAXIMO_CERO_COMBUSTI").attr("uni-value"),
        XAERONAVE_PA: $("#XAERONAVE_PA").val()
    }

    var objDataUtilAjax = [];
    $.each(lRap.value(), function (index, value) {
        var oDataUtil = {
            XUTIL_AERONAVE_RAP_PA: value
        }
        objDataUtilAjax.push(oDataUtil);
    });

    var flagCrDatosTec = "0";
    var divDatosTecnicos = "divDatosTecnicos";

    if ($("#ID_ESTADO_AERONAVE_PA").val() == "4") {
        if ($("#crDatosTecnicos").val() == "1") {
            flagCrDatosTec = "1";
        }
    }

    $.ajax({
        datatype: 'json',
        url: '/AeronavePADM/SaveTecnico',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            objTecnico: objDatosTecAjax
            , objDataUtil: objDataUtilAjax
            , flagCrDatosTec: flagCrDatosTec
            , divDatosTecnicos: divDatosTecnicos
            , EstadoAeronave: $("#ID_ESTADO_AERONAVE_PA").val()
        }),
        beforeSend: function () {
            bloquoteObject()
        },
        success: function (data) {
            if (!data.rpta) {
                errorAddModelo("divErrorDatoTecnico", "ulListaErrorDatoTecnico", data.errores);
            } else {
                datoflag = true;
                $("#XDATOS_TEC_AERONAVE_PA").val(data.tecnico);
                activaTab("tabRegAeronave", next);
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
        return datoflag;
    });
}
function saveGeneral(next) {
    var datoflag = false;
    var objAeronaveAjax = {
        XAERONAVE_PA: $("#XAERONAVE_PA").val(),
        XTIPO_AERONAVE_PA: $("#XTIPO_AERONAVE_PA option:selected").val(),
        XFABRICANTE_PA: $("#XFABRICANTE_PA").data("kendoDropDownList").value(),
        MATRICULA: $("#MATRICULA").val(),
        XMODELO_PA: $("#XMODELO_PA").data("kendoDropDownList").value(),
        NUMERO_SERIE: $("#NUMERO_SERIE").val(),
        HORAS_VUELO: $("#HORAS_VUELO").val(),
        MINUTOS_VUELO: $("#MINUTOS_VUELO").val(),
        CICLOS_VUELO: $("#CICLOS_VUELO").val(),
        FECHA_FABRICACION: $("#FECHA_FABRICACION").val(),
        FECHA_INFORMACION: $("#FECHA_INFORMACION").val(),
        XSOLICITUD_AERONAVE_PA: $("#XSOLICITUD_AERONAVE_PA option:selected").val(),
        XFECHA_TURNM: $("#FECHA_TURNM").val(),
        XFECHA_CURM: $("#FECHA_CURM").val(),
        TBO_HORA: $("#TBO_HORA").val(),
        TBO_MINUTO: $("#TBO_MINUTO").val(),
        TSO_HORA: $("#TSO_HORA").val(),
        TSO_MINUTO: $("#TSO_MINUTO").val(),
        REMANENTE_TOH_HORA: $("#REMANENTE_TOH_HORA").val(),
        REMANENTE_TOH_MINUTO: $("#REMANENTE_TOH_MINUTO").val(),
        CBO_HORA: $("#CBO_HORA").val(),
        CSO_HORA: $("#CSO_HORA").val(),
        REMANENTE_COH_HORA: $("#REMANENTE_COH_HORA").val()
    }

    var objSolicitanteAjax = {
        XSOLICITANTE_PA: $("#XSOLICITANTE_PA").val(),
        XCONDICION_SOLIC_PA: $("#XCONDICION_SOLIC_PA option:selected").val(),
        XCONTACTO: $("#ContactoRepre_XCONTACTO").val(),
        XPERSONA_JURIDICA: $("#XPERSONAJURIDICA").val()
    }
    console.log(objSolicitanteAjax);
    
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
        url: '/AeronavePADM/SaveGeneral',
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
                activaTab("tabRegAeronave", next);
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
//Funcion que valida motores
function validMotores() {
    var dataMotorAeronave = $("#gridMotores").data("kendoGrid").dataSource.data();
    var flgMotorGeneral = false;

    $.each(dataMotorAeronave, function (index, item) {
        flgMotorGeneral = true;
    });
    if (!flgMotorGeneral) {
        $("#divErrorMotorGeneral").html('<strong>Debe registrar como minimo 1 motor</strong><ul id="ulListaErrorMotorGeneral"></ul>');
        $("#divErrorMotorGeneral").show();
    }
    else {
        $("#divErrorMotorGeneral").hide();
    }
    return flgMotorGeneral;
}
//Function valida datos tecnicos
function validTecnico() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;
    var lRap = $("#XDATOS_UTIL_AERONAVE_PA").data('kendoMultiSelect');

    if (lRap.value().length == 0) {
        flg = false;
        objData.push({ "XDATOS_UTIL_AERONAVE_PA": [{ ErrorMessage: "Debe Seleccionar una Rap como minimo para la utilidad de la aeronave" }] })
    }
    if ($("#XTIPO_SERVICIO_PA").data("kendoDropDownList").value() == "") {
        flg = false;
        $('[aria-owns="XTIPO_SERVICIO_PA_listbox"]').addClass("valError");
        objData.push({ "XTIPO_SERVICIO_PA": [{ ErrorMessage: "Debe seleccionar el tipo de servicio de la aeronave" }] })
    }
    if ($("#XCATEGORIA_AERONAVE_PA  option:selected").val() == "") {
        flg = false;
        objData.push({ "XCATEGORIA_AERONAVE_PA": [{ ErrorMessage: "Debe seleccionar la categoria de la aeronave" }] })
    }
    if ($("#XUTIL_AERONAVE_RAP_PA  option:selected").val() == "") {
        flg = false;
        objData.push({ "XUTIL_AERONAVE_RAP_PA": [{ ErrorMessage: "Debe seleccionar la utilización de la aeronave" }] })
    }
    if ($("#PESO_BASICO_VACIO").val().trim() == "") {
        flg = false;
        objData.push({ "PESO_BASICO_VACIO": [{ ErrorMessage: "Debe ingresar el peso básico de vacio" }] })
    }
    if ($("#PESO_MAXIMO_DECOLAJE").val().trim() == "") {
        flg = false;
        objData.push({ "PESO_MAXIMO_DECOLAJE": [{ ErrorMessage: "Debe ingresar el peso máximo de decolage" }] })
    }
    if ($("#PESO_OPERACIONAL_BASICO").val().trim() == "") {
        flg = false;
        objData.push({ "PESO_OPERACIONAL_BASICO": [{ ErrorMessage: "Debe ingresar el peso operacional básico" }] })
    }
    if ($("#PESO_MAXIMO_ATERRIZAJE").val().trim() == "") {
        flg = false;
        objData.push({ "PESO_MAXIMO_ATERRIZAJE": [{ ErrorMessage: "Debe ingresar el peso máximo de aterrizaje" }] })
    }
    if ($("#PESO_MAXIMO_TAXEO").val().trim() == "") {
        flg = false;
        objData.push({ "PESO_MAXIMO_TAXEO": [{ ErrorMessage: "Debe ingresar el peso máximo de taxeo" }] })
    }
    if ($("#PESO_MAXIMO_CERO_COMBUSTIBLE").val().trim() == "") {
        flg = false;
        objData.push({ "PESO_MAXIMO_CERO_COMBUSTIBLE": [{ ErrorMessage: "Debe ingresar el peso máximo cero combustible" }] })
    }

    if ($("#XUNIDAD_PESO_BASICO_VACIO").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_PESO_BASICO_VACIO": [{ ErrorMessage: "Debe seleccionar el tipo de unidad de peso basico vacio" }] })
    }
    if ($("#XUNIDAD_PESO_OPERACIONAL_BAS").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_PESO_OPERACIONAL_BAS": [{ ErrorMessage: "Debe seleccionar el tipo de unidad de peso operacional basico" }] })
    }
    if ($("#XUNIDAD_PESO_MAXIMO_TAXEO").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_PESO_MAXIMO_TAXEO": [{ ErrorMessage: "Debe seleccionar el tipo de unidad de peso maximo de taxeo" }] })
    }

    if ($("#XUNIDAD_MAXIMO_DECOLAJE").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MAXIMO_DECOLAJE": [{ ErrorMessage: "Debe seleccionar el tipo de unidad de peso maximo de decolaje" }] })
    }
    if ($("#XUNIDAD_MAXIMO_ATERRIZAJE").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MAXIMO_ATERRIZAJE": [{ ErrorMessage: "Debe seleccionar el tipo de unidad de peso maximo de aterrizaje" }] })
    }
    if ($("#XUNIDAD_MAXIMO_CERO_COMBUSTI").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MAXIMO_CERO_COMBUSTI": [{ ErrorMessage: "Debe seleccionar el tipo de unidad de peso maximo cero combustible" }] })
    }

    if (flg) {
        $("#divErrorDatoTecnico").hide();
    }
    else {
        $("#divErrorDatoTecnico").html('<strong>No se puede grabar</strong><ul id="ulListaErrorDatoTecnico"></ul>');
        errorAddJS("divErrorDatoTecnico", "ulListaErrorDatoTecnico", objData)
    }

    return flg;
}
//Function valida datos tecnicos second
function validTecnicoSecond() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#NRO_TANQUES_COMBUSTIBLE  option:selected").val() == "") {
        flg = false;
        objData.push({ "NRO_TANQUES_COMBUSTIBLE": [{ ErrorMessage: "Debe seleccionar el numero de tanques de combustble" }] })
    }
    if ($("#CAPACIDAD_COMBUSTIBLE").val().trim() == "") {
        flg = false;
        objData.push({ "CAPACIDAD_COMBUSTIBLE": [{ ErrorMessage: "Debe ingresar la capacidad de combustible del tanque" }] })
    }

    if ($("#NRO_TRIPULACION").val().trim() == "") {
        flg = false;
        objData.push({ "NRO_TRIPULACION": [{ ErrorMessage: "Debe ingresar el numero de la tripulación" }] })
    }
    if ($("#CAPACIDAD_OXIGENO_TRIPULACION").val().trim() == "") {
        flg = false;
        objData.push({ "CAPACIDAD_OXIGENO_TRIPULACION": [{ ErrorMessage: "Debe ingresar la capacidad de oxigeno de la tripulación" }] })
    }

    if ($("#NRO_PASAJEROS").val().trim() == "") {
        flg = false;
        objData.push({ "NRO_PASAJEROS": [{ ErrorMessage: "Debe ingresar el numero de pasajeros" }] })
    }
    if ($("#CAPACIDAD_OXIGENO_PASAJEROS").val().trim() == "") {
        flg = false;
        objData.push({ "CAPACIDAD_OXIGENO_PASAJEROS": [{ ErrorMessage: "Debe ingresar la capacidad de oxigeno de los pasajeros" }] })
    }
    if ($("#XUNIDAD_MEDIDA_COMBUSTIBLE").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_COMBUSTIBLE": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la capacidad de combustible" }] })
    }
    if ($("#XUNIDAD_MEDIDA_CAP_OXIGENO").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_CAP_OXIGENO": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la capacidad total de oxigeno de tripulación" }] })
    }
    if ($("#XUNIDAD_MEDIDA_CAP_PASA").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_CAP_PASA": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la capacidad total de oxigeno de pasajeros" }] })
    }


    if (flg) {
        $("#divErrorTanques").hide();
    }
    else {
        $("#divErrorTanques").html('<strong>No se puede grabar</strong><ul id="ulListaTanques"></ul>');
        errorAddJS("divErrorTanques", "ulListaTanques", objData)
    }


    if ($("#CODIGO_ASIGNACION_DIRECCIONES").val().trim() == "") {
        flg = false;
        objData.push({ "CODIGO_ASIGNACION_DIRECCIONES": [{ ErrorMessage: "Debe ingresar el codigo de asignacion de direcciones" }] })
    }
    if ($("#ELT_CODIFICACION").val().trim() == "") {
        flg = false;
        objData.push({ "ELT_CODIFICACION": [{ ErrorMessage: "Debe ingresar ELT 406 Mhz codificación" }] })
    }
    if ($("#VHF_COMUNICACION").val().trim() == "") {
        flg = false;
        objData.push({ "VHF_COMUNICACION": [{ ErrorMessage: "Debe ingresar VHF Comunicaciones, Modelo" }] })
    }
    if ($("#VHF_RANGO_FRECUENCIA_INI").val().trim() == "") {
        flg = false;
        objData.push({ "VHF_RANGO_FRECUENCIA_INI": [{ ErrorMessage: "Debe ingresar Rango Frec. VHF" }] })
    }
    if ($("#VHF_RANGO_FRECUENCIA_FIN").val().trim() == "") {
        flg = false;
        objData.push({ "VHF_RANGO_FRECUENCIA_FIN": [{ ErrorMessage: "Debe ingresar Rango Frec. VHF" }] })
    }


    if ($("#HF_COMUNICACION").val().trim() == "") {
        flg = false;
        objData.push({ "HF_COMUNICACION": [{ ErrorMessage: "Debe ingresar HF Comunicaciones, Modelo" }] })
    }
    if ($("#HF_RANGO_FRECUENCIA_INI").val().trim() == "") {
        flg = false;
        objData.push({ "HF_RANGO_FRECUENCIA_INI": [{ ErrorMessage: "Debe ingresar Rango Frec. HF" }] })
    }
    if ($("#HF_RANGO_FRECUENCIA_FIN").val().trim() == "") {
        flg = false;
        objData.push({ "HF_RANGO_FRECUENCIA_FIN": [{ ErrorMessage: "Debe ingresar Rango Frec. HF" }] })
    }

    if ($("#VOR_ILS").val().trim() == "") {
        flg = false;
        objData.push({ "VOR_ILS": [{ ErrorMessage: "Debe ingresar Rango de Frecuencia VOR LS" }] })
    }
    if ($("#VOR_ILS_RANGO_FRECUENCIA_INI").val().trim() == "") {
        flg = false;
        objData.push({ "VOR_ILS_RANGO_FRECUENCIA_INI": [{ ErrorMessage: "Debe ingresar Rango Frec. VOR" }] })
    }
    if ($("#VOR_ILS_RANGO_FRECUENCIA_FIN").val().trim() == "") {
        flg = false;
        objData.push({ "VOR_ILS_RANGO_FRECUENCIA_FIN": [{ ErrorMessage: "Debe ingresar Rango Frec. VOR" }] })
    }

    if ($("#ADF").val().trim() == "") {
        flg = false;
        objData.push({ "ADF": [{ ErrorMessage: "Debe ingresar ADF Modelo" }] })
    }
    if ($("#ADF_RANGO_FRECUENCIA_INI").val().trim() == "") {
        flg = false;
        objData.push({ "ADF_RANGO_FRECUENCIA_INI": [{ ErrorMessage: "Debe ingresar Rango Frec. ADF" }] })
    }
    if ($("#ADF_RANGO_FRECUENCIA_FIN").val().trim() == "") {
        flg = false;
        objData.push({ "ADF_RANGO_FRECUENCIA_FIN": [{ ErrorMessage: "Debe ingresar Rango Frec. ADF" }] })
    }

    if ($("#XUNIDAD_MEDIDA_VHF").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_VHF": [{ ErrorMessage: "Debe seleccionar la unidad de medida de VHF" }] })
    }
    if ($("#XUNIDAD_MEDIDA_HF").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_HF": [{ ErrorMessage: "Debe seleccionar la unidad de medida de HF" }] })
    }
    if ($("#XUNIDAD_MEDIDA_VOR").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_VOR": [{ ErrorMessage: "Debe seleccionar la unidad de medida de VOR" }] })
    }
    if ($("#XUNIDAD_MEDIDA_ADF").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_ADF": [{ ErrorMessage: "Debe seleccionar la unidad de medida de ADF" }] })
    }

    if (flg) {
        $("#divErrorEquipoAvionica").hide();
    }
    else {
        $("#divErrorEquipoAvionica").html('<strong>No se puede grabar</strong><ul id="ulListaEquipoAvionica"></ul>');
        errorAddJS("divErrorEquipoAvionica", "ulListaEquipoAvionica", objData)
    }

    if ($("#TRIPULACION_MINIMA").val().trim() == "") {
        flg = false;
        objData.push({ "TRIPULACION_MINIMA": [{ ErrorMessage: "Debe ingresar el numero de tripulación minima" }] })
    }
    if ($("#NRO_PASAJEROS_MAXIMO").val().trim() == "") {
        flg = false;
        objData.push({ "NRO_PASAJEROS_MAXIMO": [{ ErrorMessage: "Debe ingresar el Nº Pasajeros Max." }] })
    }
    if ($("#CAPACIDAD_CARGA_UTIL").val().trim() == "") {
        flg = false;
        objData.push({ "CAPACIDAD_CARGA_UTIL": [{ ErrorMessage: "Debe ingresar la capacidad de carga util" }] })
    }

    if ($("#NRO_BODEGAS").val().trim() == "") {
        flg = false;
        objData.push({ "NRO_BODEGAS": [{ ErrorMessage: "Debe ingresar el Nº de bodegas" }] })
    }
    if ($("#CAPACIDAD_CARGA_BODEGAS").val().trim() == "") {
        flg = false;
        objData.push({ "CAPACIDAD_CARGA_BODEGAS": [{ ErrorMessage: "Debe ingresar la capacidad de carga de las bodegas" }] })
    }


    if ($("#CAPACIDAD_VOLUMETRICA_BODEGAS").val().trim() == "") {
        flg = false;
        objData.push({ "CAPACIDAD_VOLUMETRICA_BODEGAS": [{ ErrorMessage: "Debe ingresar la capacidad de volumen" }] })
    }

    if ($("#AUTONOMIA_VUELO").val().trim() == "") {
        flg = false;
        objData.push({ "AUTONOMIA_VUELO": [{ ErrorMessage: "Debe ingresar la autonomia de vuelo" }] })
    }


    if ($("#CONSUMO_HORARIO_COMBUSTIBLE").val().trim() == "") {
        flg = false;
        objData.push({ "CONSUMO_HORARIO_COMBUSTIBLE": [{ ErrorMessage: "Debe ingresar el consumo de combustible" }] })
    }


    if ($("#TECHO_MAXIMO").val().trim() == "") {
        flg = false;
        objData.push({ "TECHO_MAXIMO": [{ ErrorMessage: "Debe ingresar el techo maximo" }] })
    }


    if ($("#TECHO_CRUCERO").val().trim() == "") {
        flg = false;
        objData.push({ "TECHO_CRUCERO": [{ ErrorMessage: "Debe ingresar el techo crucero" }] })
    }


    if ($("#VELOCIDAD_MAXIMA").val().trim() == "") {
        flg = false;
        objData.push({ "VELOCIDAD_MAXIMA": [{ ErrorMessage: "Debe ingresar la velocidad maxima" }] })
    }


    if ($("#VELOCIDAD_CRUCERO").val().trim() == "") {
        flg = false;
        objData.push({ "VELOCIDAD_CRUCERO": [{ ErrorMessage: "Debe ingresar la velocidad crucero" }] })
    }

    if ($("#XUNIDAD_MEDIDA_CAP_CARGA").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_CAP_CARGA": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la capacidad de carga" }] })
    }
    if ($("#XUNIDAD_MEDIDA_CAP_CARGA_BO").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_CAP_CARGA_BO": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la capacidad de carga de la bodega" }] })
    }
    if ($("#XUNIDAD_MEDIDA_CAP_VOL_BO").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_CAP_VOL_BO": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la capacidad de volumen de la bodega" }] })
    }
    if ($("#XUNIDAD_MEDIDA_HORAS_VUELO").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_HORAS_VUELO": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la autonomia de vuelo" }] })
    }
    if ($("#XUNIDAD_MEDIDA_CONS_COMB").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_CONS_COMB": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la capacidad de consumo de combustible" }] })
    }
    if ($("#XUNIDAD_MEDIDA_TECHO_MAX").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_TECHO_MAX": [{ ErrorMessage: "Debe seleccionar la unidad de medida para el techo maximo" }] })
    }
    if ($("#XUNIDAD_MEDIDA_TECHO_CRU").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_TECHO_CRU": [{ ErrorMessage: "Debe seleccionar la unidad de medida para el techo crucero" }] })
    }
    if ($("#XUNIDAD_MEDIDA_VEL_MAX").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_VEL_MAX": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la velocidad maxima" }] })
    }
    if ($("#XUNIDAD_MEDIDA_VEL_CRU").attr("uni-value") == "") {
        flg = false;
        objData.push({ "XUNIDAD_MEDIDA_VEL_CRU": [{ ErrorMessage: "Debe seleccionar la unidad de medida para la velocidad crucero" }] })
    }

    if (flg) {
        $("#divErrorDatosOperaciones").hide();
    }
    else {
        $("#divErrorDatosOperaciones").html('<strong>No se puede grabar</strong><ul id="ulListaDatosOperaciones"></ul>');
        errorAddJS("divErrorDatosOperaciones", "ulListaDatosOperaciones", objData)
    }

    return flg;
}
//Function valida datos generales
function validGeneral() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#XPERSONAJURIDICA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XPERSONAJURIDICA_listbox"]').parents("span").addClass("valError");
        objData.push({ "XPERSONAJURIDICA": [{ ErrorMessage: "Debe seleccionar la razón social" }] })
    }
    if ($("#XSOLICITUD_AERONAVE_PA  option:selected").val() == "") {
        flg = false;
        objData.push({ "XSOLICITUD_AERONAVE_PA": [{ ErrorMessage: "Debe seleccionar el tipo de solicitud" }] })
    }
    if ($("#XTIPO_AERONAVE_PA  option:selected").val() == "") {
        flg = false;
        objData.push({ "XTIPO_AERONAVE_PA": [{ ErrorMessage: "Debe seleccionar el tipo de aeronave" }] })
    }
    if ($("#XFABRICANTE_PA").data("kendoDropDownList").value() == "") {
        flg = false;
        $('[aria-owns="XFABRICANTE_PA_listbox"]').addClass("valError");
        objData.push({ "XFABRICANTE_PA": [{ ErrorMessage: "Debe seleccionar el fabricante de la aeronave" }] })
    }
    if ($("#MATRICULA").val().trim() == "") {
        flg = false;
        objData.push({ "MATRICULA": [{ ErrorMessage: "Debe ingresar la matricula de la aeronave" }] })
    }
    if ($("#XMODELO_PA").data("kendoDropDownList").value() == "") {
        flg = false;
        $('[aria-owns="XMODELO_PA_listbox"]').addClass("valError");
        objData.push({ "XMODELO_PA": [{ ErrorMessage: "Debe seleccionar el modelo de la aeronave" }] })
    }
    if ($("#NUMERO_SERIE").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE": [{ ErrorMessage: "Debe ingresar el numero de serie de la aeronave" }] })
    }
    if ($("#MINUTOS_VUELO").val().trim() == "") {
        flg = false;
        objData.push({ "MINUTOS_VUELO": [{ ErrorMessage: "Debe ingresar los minutos de vuelo de la aeronave" }] })
    }
    if ($("#HORAS_VUELO").val().trim() == "") {
        flg = false;
        objData.push({ "HORAS_VUELO": [{ ErrorMessage: "Debe ingresar las horas de vuelo de la aeronave" }] })
    }

    if ($("#CICLOS_VUELO").val().trim() == "") {
        flg = false;
        objData.push({ "CICLOS_VUELO": [{ ErrorMessage: "Debe ingresar los ciclos de la aeronave" }] })
    }

    if ($("#FECHA_FABRICACION").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_FABRICACION").parents("span").addClass("valError");
        objData.push({ "FECHA_FABRICACION": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha de fabricación de la aeronave" }] })
    }
    if ($("#FECHA_INFORMACION").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_INFORMACION": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha de información de la aeronave" }] })
    }
    if ($("#FECHA_TURNM").val().trim() != "" && $("#FECHA_TURNM").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_TURNM").parents("span").addClass("valError");
        objData.push({ "FECHA_TURNM": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha de TURM de la aeronave" }] })
    }
    /*if ($("#FECHA_TURNM").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_TURNM").parents("span").addClass("valError");
        objData.push({ "FECHA_TURNM": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha de TURM de la aeronave" }] })
    }*/
    if ($("#FECHA_CURM").val().trim() != "" && $("#FECHA_CURM").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_CURM").parents("span").addClass("valError");
        objData.push({ "FECHA_CURM": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha de CURM de la aeronave" }] })
    }/*
    if ($("#FECHA_CURM").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_CURM").parents("span").addClass("valError");
        objData.push({ "FECHA_CURM": [{ ErrorMessage: "Debe ingresar una fecha valida para la de fecha de CURM de la aeronave" }] })
    }*/
    if ($("#TBO_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_HORA": [{ ErrorMessage: "Debe ingresar el TBO (Hora) de la aeronave" }] })
    }
    if ($("#TBO_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_MINUTO": [{ ErrorMessage: "Debe ingresar el TBO (Minuto) de la aeronave" }] })
    }
    if ($("#TSO_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_HORA": [{ ErrorMessage: "Debe ingresar el TSO (Hora) de la aeronave" }] })
    }
    if ($("#TSO_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_MINUTO": [{ ErrorMessage: "Debe ingresar el TSO (Minuto) de la aeronave" }] })
    }
    if ($("#REMANENTE_TOH_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_TOH_HORA": [{ ErrorMessage: "Debe ingresar el Remante OH (Hora) de la aeronave" }] })
    }
    if ($("#REMANENTE_TOH_MINUTO").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_TOH_MINUTO": [{ ErrorMessage: "Debe ingresar el Remanente OH (Minuto) de la aeronave" }] })
    }
    if ($("#CBO_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "CBO_HORA": [{ ErrorMessage: "Debe ingresar el CBO (Ciclo) de la aeronave" }] })
    }
    if ($("#CSO_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "CSO_HORA": [{ ErrorMessage: "Debe ingresar el CSO (Ciclo) de la aeronave" }] })
    }
    if ($("#REMANENTE_COH_HORA").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_COH_HORA": [{ ErrorMessage: "Debe ingresar el Remanente OH (Ciclo) de la aeronave" }] })
    }


    if (flg) {
        $("#divErrorAeronave").hide();
    }
    else {
        $("#divErrorAeronave").html('<strong>No se puede grabar</strong><ul id="ulListaErrorAeronave"></ul>');
        errorAddJS("divErrorAeronave", "ulListaErrorAeronave", objData)
    }

    var objDataSolicitante = [];

    if ($("#XCONDICION_SOLIC_PA  option:selected").val() == "") {
        flg = false;
        objDataSolicitante.push({ "XCONDICION_SOLIC_PA": [{ ErrorMessage: "Debe seleccionar la condición del solicitante" }] })
    }
    //
    if ($("#ContactoRepre_XCONTACTO").val() == "") {
        flg = false;
        objDataSolicitante.push({ "ContactoRepre_PersonaNatural_NOMBRE_COMPLETO": [{ ErrorMessage: "Debe seleccionar a un representante legal" }] })
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

//Function grid Trenes
function gridTrenesAeronave(dataTrenes) {
    $("#gridTrenes").html("");
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
    $("#gridHelices").html("");
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
    $("#gridMotores").html("");
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
    $("#gridHelicop").html("");
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
                $("#FECHA_TURNM_TRENES").data("kendoDatePicker").value(dateFormat(itemData.FECHA_TURNM));
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
                bootbox.alert("Seleccione un registro de la tabla de Helicóptero");
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
function gestionHeliceHelicop() {
    var dataDetalle = $("#gridHelicop").data("kendoGrid");
    var itemData = dataDetalle.dataItem(dataDetalle.select());
    if (itemData != null) {

        $.ajax({
            datatype: 'json',
            url: '/AeronavePADM/gridHeliceDataHelicoptero',
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
        bootbox.alert("Seleccione un registro de la tabla de Helicóptero");
    }
}
//btnNewHeliceHelicop
function NuevoHeliceHelicop() {
    $("#txtNRO_PALAS").val("");
    $("#cbPosicionHelice option:first").attr('selected', 'selected');
    $("#chESTADO_HELICE_HELICOP").prop("checked", false);
    $("#txtNRO_PALAS").prop("readonly", false);
    $("#gridPalasHelicesRegistro").html("");
    $("#XHELICE_HELICOP_PA_REG").val("");
    $("#modalRegistroHelicopHelice").modal('show');
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
                    title: "HÉLICE",
                },
                {
                    field: "NRO_PALAS",
                    title: "NRO PALAS",
                },
                {
                    field: "DETALLE_POSICION",
                    title: "POSICIÓN",
                },
                {
                    field: "DETALLE_ESTADO",
                    title: "ESTADO",
                }]
    });
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
            $("#FECHA_VIDA_LIMITE_HELICOPPRI").val($("#FECHA_INFORMACION").val());

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
            $("#FECHA_VIDA_LIMITE_HELICOPPRI").val($("#FECHA_INFORMACION").val());

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
                $("#FECHA_VIDA_LIMITE_HELICOPPRI").val($("#FECHA_INFORMACION").val());


                $("#REMANENTE_HORAS_HELICOPPRI").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLO_HELICOPPRI").val(itemData.REMANENTE_CICLO);

                //FECHAS
                $("#FECHA_LIMITE_SN_HELICOPPRI").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SN));
                $("#FECHA_LIMITE_BO_HELICOPPRI").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_BO));
                $("#FECHA_LIMITE_SO_HELICOPPRI").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SO));
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
                        itemData.set("FECHA_VIDA_LIMITE", $("#FECHA_INFORMACION").val());

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
                            FECHA_VIDA_LIMITE: $("#FECHA_INFORMACION").val(),

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
            $("#FECHA_VIDA_LIMITE_HELICOPCOLA").val($("#FECHA_INFORMACION").val());

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
            $("#FECHA_VIDA_LIMITE_HELICOPCOLA").val($("#FECHA_INFORMACION").val());

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
                $(".valError").removeClass("valError");
                $("#divErrorHelicopCola").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicopCola"></ul>');
                $("#divErrorHelicopCola").hide();
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
                $("#FECHA_VIDA_LIMITE_HELICOPCOLA").val($("#FECHA_INFORMACION").val());

                $("#REMANENTE_HORAS_HELICOPCOLA").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLO_HELICOPCOLA").val(itemData.REMANENTE_CICLO);

                //FECHAS
                $("#FECHA_LIMITE_SN_HELICOPCOLA").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SN));
                $("#FECHA_LIMITE_BO_HELICOPCOLA").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_BO));
                $("#FECHA_LIMITE_SO_HELICOPCOLA").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SO));
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
                        itemData.set("FECHA_VIDA_LIMITE", $("#FECHA_INFORMACION").val());

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
                            FECHA_VIDA_LIMITE: $("#FECHA_INFORMACION").val(),
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

//Validación de Modelo del Motor
function validMotorReg() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");
    if ($("#POSICION_MOTOR  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_MOTOR": [{ ErrorMessage: "Debe seleccionar la posición del motor" }] })
    }

    if ($("#FABRICANTE_MOTOR").data("kendoComboBox").value() == null || $("#FABRICANTE_MOTOR").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="FABRICANTE_MOTOR_listbox"]').parents("span").addClass("valError");
        objData.push({ "FABRICANTE_MOTOR": [{ ErrorMessage: "Debe seleccionar el fabricante del motor" }] })
    }
    if ($("#MODELO_MOTOR").data("kendoComboBox").value() == null || $("#MODELO_MOTOR").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="MODELO_MOTOR_listbox"]').parents("span").addClass("valError");
        objData.push({ "MODELO_MOTOR": [{ ErrorMessage: "Debe seleccionar el modelo del motor" }] })
    }
    if ($("#NUMERO_SERIE_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE_MOTOR": [{ ErrorMessage: "Debe ingresar el numero de serie del motor" }] })
    }
    if ($("#TSN_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_MOTOR": [{ ErrorMessage: "Debe ingresar el TSN del motor" }] })
    }

    if ($("#TBO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_MOTOR": [{ ErrorMessage: "Debe ingresar el TBO del motor" }] })
    }

    if ($("#FECHA_LIMITE_SN_MOTOR").val().trim() != "" && $("#FECHA_LIMITE_SN_MOTOR").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_LIMITE_SN_MOTOR").parents("span").addClass("valError");
        objData.push({ "FECHA_LIMITE_SN_MOTOR": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de vida útil del motor" }] })
    }

    if ($("#FECHA_CURM_MOTOR").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_CURM_MOTOR").parents("span").addClass("valError");
        objData.push({ "FECHA_CURM_MOTOR": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha CURNM del motor" }] })
    }
    if ($("#FECHA_TURNM_MOTOR").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_TURNM_MOTOR").parents("span").addClass("valError");
        objData.push({ "FECHA_TURNM_MOTOR": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha TURNM del motor" }] })
    }

    if ($("#FECHA_LIMITE_BO_MOTOR").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_LIMITE_BO_MOTOR").parents("span").addClass("valError");
        objData.push({ "FECHA_LIMITE_BO_MOTOR": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO del motor" }] })
    }

    if ($("#TSO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_MOTOR": [{ ErrorMessage: "Debe ingresar el TSO del motor" }] })
    }

    if ($("#VIDA_LIMITE_HORAS_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_HORAS_MOTOR": [{ ErrorMessage: "Debe ingresar la vida limite (Horas) del motor" }] })
    }
    if ($("#REMANENTE_HORAS_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_HORAS_MOTOR": [{ ErrorMessage: "Debe ingresar la remanente (Horas) del motor" }] })
    }
    if ($("#NUMERO_PARTE_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_PARTE_MOTOR": [{ ErrorMessage: "Debe ingresar el numero de parte del motor" }] })
    }

    if ($("#VIDA_LIMITE_MINUTO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_MINUTO_MOTOR": [{ ErrorMessage: "Debe ingresar la vida limite (minuto) del motor" }] })
    }
    if ($("#TSN_MINUTO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_MINUTO_MOTOR": [{ ErrorMessage: "Debe ingresar el TSN (minuto) del motor" }] })
    }
    if ($("#TBO_MINUTO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_MINUTO_MOTOR": [{ ErrorMessage: "Debe ingresar el TBO (minuto) del motor" }] })
    }
    if ($("#TSO_MINUTO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_MINUTO_MOTOR": [{ ErrorMessage: "Debe ingresarel TSO (minuto) del motor" }] })
    }
    if ($("#REMANENTE_MINUTO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_MINUTO_MOTOR": [{ ErrorMessage: "Debe ingresar el Remanente (minuto) del motor" }] })
    }

    errorAddJS("divErrorMotor", "ulListaErrorMotor", objData)
    return flg;
}

//Validación de Modelo del Motor
function validHeliceReg() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");
    if ($("#POSICION_HELICES  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_HELICES": [{ ErrorMessage: "Debe seleccionar la posición de la helice" }] })
    }
    if ($("#FABRICANTE_HELICES").data("kendoComboBox").value() == null || $("#FABRICANTE_HELICES").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="FABRICANTE_HELICES_listbox"]').parents("span").addClass("valError");
        objData.push({ "FABRICANTE_HELICES": [{ ErrorMessage: "Debe seleccionar el fabricante de la helice" }] })
    }
    if ($("#MODELO_HELICES").data("kendoComboBox").value() == null || $("#MODELO_HELICES").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="MODELO_HELICES_listbox"]').parents("span").addClass("valError");
        objData.push({ "MODELO_HELICES": [{ ErrorMessage: "Debe seleccionar el modelo de la helice" }] })
    }
    if ($("#NUMERO_SERIE_HELICES").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE_HELICES": [{ ErrorMessage: "Debe ingresar el numero de serie de la helice" }] })
    }
    if ($("#TSN_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_HELICE": [{ ErrorMessage: "Debe ingresar el TSN de la helice" }] })
    }

    if ($("#FECHA_LIMITE_SN_HELICE").val().trim() != "" && $("#FECHA_LIMITE_SN_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SN_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SN de la helice" }] })
    }

    if ($("#TBO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_HELICE": [{ ErrorMessage: "Debe ingresar el TBO de la helice" }] })
    }

    if ($("#FECHA_LIMITE_BO_HELICE").val().trim() != "" && $("#FECHA_LIMITE_BO_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_BO_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO de la helice" }] })
    }

    if ($("#TSO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_HELICE": [{ ErrorMessage: "Debe ingresar el TSO de la helice" }] })
    }

    if ($("#FECHA_LIMITE_SO_HELICE").val().trim() != "" && $("#FECHA_LIMITE_SO_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SO_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SO de la helice" }] })
    }
    if ($("#VIDA_LIMITE_HORAS_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_HORAS_HELICE": [{ ErrorMessage: "Debe ingresar la vida limite (Hora) de la helice" }] })
    }

    if ($("#FECHA_ULTIMO_OH_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_ULTIMO_OH_HELICE").parents("span").addClass("valError");
        objData.push({ "FECHA_ULTIMO_OH_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la ultima fecha de OH de la helice" }] })
    }
    if ($("#REMANENTE_HORAS_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_HORAS_HELICE": [{ ErrorMessage: "Debe ingresar la remanente (Horas) de la helice" }] })
    }

    if ($("#NUMERO_PARTE_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_PARTE_HELICE": [{ ErrorMessage: "Debe ingresar el numero parte de la helice" }] })
    }

    if ($("#TSN_MINUTO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_MINUTO_HELICE": [{ ErrorMessage: "Debe ingresar el TSN (Min) de la helice" }] })
    }
    if ($("#TBO_MINUTO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_MINUTO_HELICE": [{ ErrorMessage: "Debe ingresar el TBO (Min) de la helice" }] })
    }
    if ($("#TSO_MINUTO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_MINUTO_HELICE": [{ ErrorMessage: "Debe ingresar el TSO (Min) de la helice" }] })
    }
    if ($("#REMANENTE_MINUTO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_MINUTO_HELICE": [{ ErrorMessage: "Debe ingresar el Remanente (Min) de la helice" }] })
    }
    if ($("#FECHA_TURNM_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_TURNM_HELICE").parents("span").addClass("valError");
        objData.push({ "FECHA_TURNM_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la Fecha TURNM de la helice" }] })
    }
    if ($("#VIDA_LIMITE_MINUTO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_MINUTO_HELICE": [{ ErrorMessage: "Debe ingresar la Vida Limite (Min) de la helice" }] })
    }

    errorAddJS("divErrorHelice", "ulListaErrorHelice", objData)
    return flg;
}

//Validación de Modelo del Tren de Aterrizaje
function validTrenesReg() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");
    if ($("#POSICION_TRENES  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_TRENES": [{ ErrorMessage: "Debe seleccionar la posición del tren de aterrizaje" }] })
    }
    if ($("#TIPO_TRENES  option:selected").val() == "") {
        flg = false;
        objData.push({ "TIPO_TRENES": [{ ErrorMessage: "Debe seleccionar el tipo de tren de aterrizaje" }] })
    }
    if ($("#MODELO_TRENES").data("kendoComboBox").value() == null || $("#MODELO_TRENES").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="MODELO_TRENES_listbox"]').parents("span").addClass("valError");
        objData.push({ "MODELO_TRENES": [{ ErrorMessage: "Debe seleccionar el modelo del tren de aterrizaje" }] })
    }
    if ($("#NUMERO_SERIE_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE_TRENES": [{ ErrorMessage: "Debe ingresar el numero de serie del tren de aterrizaje" }] })
    }

    if ($("#CSN_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "CSN_TRENES": [{ ErrorMessage: "Debe ingresar el CSN del tren de aterrizaje" }] })
    }
    if ($("#FECHA_LIMITE_SN_TRENES").val().trim() != "" && $("#FECHA_LIMITE_SN_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SN_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SN del tren de aterrizaje" }] })
    }

    if ($("#CBO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "CBO_TRENES": [{ ErrorMessage: "Debe ingresar el CBO del tren de aterrizaje" }] })
    }
    if ($("#FECHA_LIMITE_BO_TRENES").val().trim() != "" && $("#FECHA_LIMITE_BO_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_LIMITE_BO_TRENES").parents("span").addClass("valError");
        objData.push({ "FECHA_LIMITE_BO_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO del tren de aterrizaje" }] })
    }

    if ($("#CSO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "CSO_TRENES": [{ ErrorMessage: "Debe ingresar el CSO del tren de aterrizaje" }] })
    }
    if ($("#FECHA_LIMITE_SO_TRENES").val().trim() != "" && $("#FECHA_LIMITE_SO_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SO_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SO del tren de aterrizaje" }] })
    }

    if ($("#VIDA_LIMITE_CICLO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_CICLO_TRENES": [{ ErrorMessage: "Debe ingresar la vida limite (ciclo) del tren de aterrizaje" }] })
    }
    if ($("#FECHA_VIDA_LIMITE_TRENES").val().trim() != "" && $("#FECHA_VIDA_LIMITE_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_VIDA_LIMITE_TRENES").parents("span").addClass("valError");
        objData.push({ "FECHA_VIDA_LIMITE_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de  vida limite del tren de aterrizaje" }] })
    }

    if ($("#FECHA_ULTIMO_OH_TRENES").val().trim() != "" && $("#FECHA_ULTIMO_OH_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_ULTIMO_OH_TRENES").parents("span").addClass("valError");
        objData.push({ "FECHA_ULTIMO_OH_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la ultima fecha de OH del tren de aterrizaje" }] })
    }
    if ($("#REMANENTE_CICLO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_CICLO_TRENES": [{ ErrorMessage: "Debe ingresar la remanente (Ciclos) del tren de aterrizaje" }] })
    }

    if ($("#NUMERO_PARTE_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_PARTE_TRENES": [{ ErrorMessage: "Debe ingresar el numero parte del tren de aterrizaje" }] })
    }

    if ($("#FECHA_TURNM_TRENES").val().trim() != "" && $("#FECHA_TURNM_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_TURNM_TRENES").parents("span").addClass("valError");
        objData.push({ "FECHA_TURNM_TRENES": [{ ErrorMessage: "Debe ingresar la Fecha TURNM del tren de aterrizaje" }] })
    }
    if ($("#FECHA_CURM_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_CURM_TRENES").parents("span").addClass("valError");
        objData.push({ "FECHA_CURM_TRENES": [{ ErrorMessage: "Debe ingresar la Fecha CURNM del tren de aterrizaje" }] })
    }

    errorAddJS("divErrorTrenes", "ulListaErrorTrenes", objData)
    return flg;
}

//Validación de Modelo del Helicoptero 
function validHelicopReg() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");

    if ($("#FABRICANTE_HELICOP").data("kendoComboBox").value() == null || $("#FABRICANTE_HELICOP").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="FABRICANTE_HELICOP_listbox"]').parents("span").addClass("valError");
        objData.push({ "FABRICANTE_HELICOP": [{ ErrorMessage: "Debe seleccionar el fabricante del helicoptero" }] })
    }
    if ($("#POSICION_HELICOP  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_HELICOP": [{ ErrorMessage: "Debe seleccionar la posicion" }] })
    }
    if ($("#TIPO_HELICOP  option:selected").val() == "") {
        flg = false;
        objData.push({ "TIPO_HELICOP": [{ ErrorMessage: "Debe seleccionar el tipo de helicoptero" }] })
    }
    if ($("#MODELO_HELICOP").data("kendoComboBox").value() == null || $("#MODELO_HELICOP").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="MODELO_HELICOP_listbox"]').parents("span").addClass("valError");
        objData.push({ "MODELO_HELICOP": [{ ErrorMessage: "Debe seleccionar el modelo del helicoptero" }] })
    }
    if ($("#NUMERO_SERIE_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE_HELICOP": [{ ErrorMessage: "Debe ingresar el numero de serie del helicoptero" }] })
    }
    if ($("#TSN_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_HELICOP": [{ ErrorMessage: "Debe ingresar el TSN del helicoptero" }] })
    }
    if ($("#CSN_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "CSN_HELICOP": [{ ErrorMessage: "Debe ingresar el CSN del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_SN_HELICOP").val().trim() != "" && $("#FECHA_LIMITE_SN_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_LIMITE_SN_HELICOP").parents("span").addClass("valError");
        objData.push({ "FECHA_LIMITE_SN_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SN del helicoptero" }] })
    }

    if ($("#TBO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_HELICOP": [{ ErrorMessage: "Debe ingresar el TBO del helicoptero" }] })
    }

    if ($("#FECHA_LIMITE_BO_HELICOP").val().trim() != "" && $("#FECHA_LIMITE_BO_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_LIMITE_BO_HELICOP").parents("span").addClass("valError");
        objData.push({ "FECHA_LIMITE_BO_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO del helicoptero" }] })
    }

    if ($("#TSO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_HELICOP": [{ ErrorMessage: "Debe ingresar el TSO del helicoptero" }] })
    }

    if ($("#FECHA_LIMITE_SO_HELICOP").val().trim() != "" && $("#FECHA_LIMITE_SO_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_LIMITE_SO_HELICOP").parents("span").addClass("valError");
        objData.push({ "FECHA_LIMITE_SO_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SO del helicoptero" }] })
    }

    if ($("#VIDA_LIMITE_HORAS_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_HORAS_HELICOP": [{ ErrorMessage: "Debe ingresar la vida limite(Horas) del helicoptero" }] })
    }
    if ($("#VIDA_LIMITE_CICLO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_CICLO_HELICOP": [{ ErrorMessage: "Debe ingresar la vida limite(Ciclos) del helicoptero" }] })
    }

    if ($("#FECHA_VIDA_LIMITE_HELICOP").val().trim() != "" && $("#FECHA_VIDA_LIMITE_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_VIDA_LIMITE_HELICOP").parents("span").addClass("valError");
        objData.push({ "FECHA_VIDA_LIMITE_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de vida limite del helicoptero" }] })
    }


    if ($("#FECHA_ULTIMO_OH_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_ULTIMO_OH_HELICOP").parents("span").addClass("valError");
        objData.push({ "FECHA_ULTIMO_OH_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la ultima fecha de OH del helicoptero" }] })
    }
    if ($("#REMANENTE_HORAS_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_HORAS_HELICOP": [{ ErrorMessage: "Debe ingresar la remanente (horas) del helicoptero" }] })
    }

    if ($("#FECHA_TURNM_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_TURNM_HELICOP").parents("span").addClass("valError");
        objData.push({ "FECHA_TURNM_HELICOP": [{ ErrorMessage: "Debe ingresar Fecha TURNM del helicoptero" }] })
    }
    if ($("#FECHA_CURM_HELICOP").val().trim() != "" && $("#FECHA_CURM_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_CURM_HELICOP").parents("span").addClass("valError");
        objData.push({ "FECHA_CURM_HELICOP": [{ ErrorMessage: "Debe ingresar la Fecha CURNM del helicoptero" }] })
    }

    if ($("#VIDA_LIMITE_MINUTO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_MINUTO_HELICOP": [{ ErrorMessage: "Debe ingresar la Vida Limite (Min) del helicoptero" }] })
    }
    if ($("#TSN_MINUTO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_MINUTO_HELICOP": [{ ErrorMessage: "Debe ingresar la TSN (Min) del helicoptero" }] })
    }
    if ($("#TBO_MINUTO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_MINUTO_HELICOP": [{ ErrorMessage: "Debe ingresar la TBO (Min) del helicoptero" }] })
    }
    if ($("#TSO_MINUTO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_MINUTO_HELICOP": [{ ErrorMessage: "Debe ingresar la TSO (Min) del helicoptero" }] })
    }
    if ($("#REMANENTE_MINUTO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_MINUTO_HELICOP": [{ ErrorMessage: "Debe ingresar la Remanente (Min) del helicoptero" }] })
    }

    errorAddJS("divErrorHelicop", "ulListaErrorHelicop", objData)
    return flg;
}

//Validación de Modelo del Helicoptero Rotor Principal
function validHelicopPriReg() {
    var objData = [];
    var flg = true;

    if ($("#POSICION_HELICOPPRI  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_HELICOPPRI": [{ ErrorMessage: "Debe seleccionar la posicion" }] })
    }
    if ($("#NUMERO_PARTE_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_PARTE_HELICOPPRI": [{ ErrorMessage: "Debe ingresar el numero de parte del rotor principal del helicoptero" }] })
    }
    if ($("#NUMERO_SERIE_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE_HELICOPPRI": [{ ErrorMessage: "Debe ingresar el el numero de serie del rotor principal del helicoptero" }] })
    }
    if ($("#TSN_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_HELICOPPRI": [{ ErrorMessage: "Debe ingresar el TSN del rotor principal del helicoptero" }] })
    }
    if ($("#CSN_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "CSN_HELICOPPRI": [{ ErrorMessage: "Debe ingresar el CSN del rotor principal del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_SN_HELICOPPRI").val().trim() != "" && $("#FECHA_LIMITE_SN_HELICOPPRI").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SN_HELICOPPRI": [{ ErrorMessage: "Debe ingresar una fecha valida la fecha limite de SN del rotor principal del helicoptero" }] })
    }

    if ($("#TBO_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_HELICOPPRI": [{ ErrorMessage: "Debe ingresar el TBO del rotor principal del helicoptero" }] })
    }
    if ($("#CBO_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "CBO_HELICOPPRI": [{ ErrorMessage: "Debe ingresar el CBO del rotor principal del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_BO_HELICOPPRI").val().trim() != "" && $("#FECHA_LIMITE_BO_HELICOPPRI").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_BO_HELICOPPRI": [{ ErrorMessage: "Debe ingresaruna fecha valida para la fecha limite de BO del rotor principal del helicoptero" }] })
    }

    if ($("#TSO_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_HELICOPPRI": [{ ErrorMessage: "Debe ingresar el TSO del rotor principal del helicoptero" }] })
    }
    if ($("#CSO_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "CSO_HELICOPPRI": [{ ErrorMessage: "Debe ingresar el CSO del rotor principal del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_SO_HELICOPPRI").val().trim() != "" && $("#FECHA_LIMITE_SO_HELICOPPRI").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SO_HELICOPPRI": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SO del rotor principal del helicoptero" }] })
    }

    if ($("#VIDA_LIMITE_HORAS_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_HORAS_HELICOPPRI": [{ ErrorMessage: "Debe ingresar la vida limite(Horas) del rotor principal del helicoptero" }] })
    }

    if ($("#FECHA_VIDA_LIMITE_HELICOPPRI").val().trim() != "" && $("#FECHA_VIDA_LIMITE_HELICOPPRI").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_VIDA_LIMITE_HELICOPPRI": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de vida limite del rotor principal del helicoptero" }] })
    }

    if ($("#REMANENTE_HORAS_HELICOPPRI").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_HORAS_HELICOPPRI": [{ ErrorMessage: "Debe ingresar la remanente (horas) del rotor principal del helicoptero" }] })
    }

    errorAddJS("divErrorHelicopPri", "ulListaErrorHelicopPri", objData)
    return flg;
}

//Validación de Modelo del Helicoptero Rotor Cola
function validHelicopColaReg() {
    var objData = [];
    var flg = true;

    if ($("#POSICION_HELICOPCOLA  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_HELICOPCOLA": [{ ErrorMessage: "Debe seleccionar la posicion" }] })
    }
    if ($("#NUMERO_PARTE_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_PARTE_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar el numero de parte del rotor de cola del helicoptero" }] })
    }
    if ($("#NUMERO_SERIE_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar el el numero de serie del rotor de cola del helicoptero" }] })
    }
    if ($("#TSN_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar el TSN del rotor de cola del helicoptero" }] })
    }
    if ($("#CSN_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "CSN_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar el CSN del rotor de cola del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_SN_HELICOPCOLA").val().trim() != "" && $("#FECHA_LIMITE_SN_HELICOPCOLA").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SN_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar una fecha valida la fecha limite de SN del rotor de cola del helicoptero" }] })
    }

    if ($("#TBO_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar el TBO del rotor de cola del helicoptero" }] })
    }
    if ($("#CBO_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "CBO_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar el CBO del rotor de cola del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_BO_HELICOPCOLA").val().trim() != "" && $("#FECHA_LIMITE_BO_HELICOPCOLA").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_BO_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO del rotor de cola del helicoptero" }] })
    }

    if ($("#TSO_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar el TSO del rotor de cola del helicoptero" }] })
    }
    if ($("#CSO_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "CSO_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar el CSO del rotor de cola del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_SO_HELICOPCOLA").val().trim() != "" && $("#FECHA_LIMITE_SO_HELICOPCOLA").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SO_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar una fecha valida la fecha limite de SO del rotor de cola del helicoptero" }] })
    }

    if ($("#VIDA_LIMITE_HORAS_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_HORAS_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar la vida limite (Horas) del rotor de cola del helicoptero" }] })
    }

    if ($("#FECHA_VIDA_LIMITE_HELICOPCOLA").val().trim() != "" && $("#FECHA_VIDA_LIMITE_HELICOPCOLA").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_VIDA_LIMITE_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de vida limite del rotor de cola del helicoptero" }] })
    }

    if ($("#REMANENTE_HORAS_HELICOPCOLA").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_HORAS_HELICOPCOLA": [{ ErrorMessage: "Debe ingresar la remanente (horas) del rotor de cola del helicoptero" }] })
    }

    errorAddJS("divErrorHelicopCola", "ulListaErrorHelicopCola", objData);

    return flg;
}

//Disabled Div
function disabledDivDatosGenerales() {
    $("#XSOLICITUD_AERONAVE_PA").toggleDisable();
    $("#XTIPO_AERONAVE_PA").toggleDisable();
}
function disabledDivDatosAeronave() {
    $("#XPERSONAJURIDICA").data("kendoComboBox").enable(false);
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
//Habilitar
function enabledDivDatosGenerales() {
    $("#XSOLICITUD_AERONAVE_PA").toggleEnable();
    $("#XTIPO_AERONAVE_PA").toggleEnable();
}
function enabledDivDatosAeronave() {
    $("#MATRICULA").toggleEnable();
    $("#XMODELO_PA").data("kendoDropDownList").enable(true);
    $("#NUMERO_SERIE").toggleEnable();
    $("#XFABRICANTE_PA").data("kendoDropDownList").enable(true);
    $("#FECHA_FABRICACION").toggleEnable();
    $("#HORAS_VUELO").toggleEnable();
    $("#MINUTOS_VUELO").toggleEnable();
    $("#CICLOS_VUELO").toggleEnable();
    $("#FECHA_INFORMACION").toggleEnable();
    $("#FECHA_INFORMACION").data("kendoDatePicker").enable(false);
    $("#FECHA_FABRICACION").data("kendoDatePicker").enable(true);

    $("#FECHA_TURNM").data("kendoDatePicker").enable(true);
    $("#TBO_HORA").toggleEnable();
    $("#TBO_MINUTO").toggleEnable();
    $("#TSO_HORA").toggleEnable();
    $("#TSO_MINUTO").toggleEnable();
    $("#REMANENTE_TOH_HORA").toggleEnable();
    $("#REMANENTE_TOH_MINUTO").toggleEnable();
    $("#FECHA_CURM").data("kendoDatePicker").enable(true);
    $("#CBO_HORA").toggleEnable();
    $("#CSO_HORA").toggleEnable();
    $("#REMANENTE_COH_HORA").toggleEnable();
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
    $("#XTIPO_SERVICIO_PA").data("kendoDropDownList").enable(true);
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
                    FECHA_INFORMACION: {
                        type: "date",
                        validation: {
                            required: {
                                message: "Seleccione una fecha"
                            },
                            date: {
                                message: "Fecha Invalida"
                            },
                        },
                    },
                    NUMERO_SERIE: {
                        validation: {
                            required: {
                                message: "Debe ingresar un numero de serie"
                            }
                        }
                    },
                    XPOS_PALA_HELICOP_PA: { validation: { required: true, message: 'Ingrese el Numero de Parte' }, defaultValue: { XPOS_PALA_HELICOP_PA: 1, DESCRIPCION: "SUPERIOR" } },
                    NUMERO_PARTE: {
                        type: "number", validation: {
                            required: {
                                message: "Debe ingresar un numero de parte"
                            }
                        }
                    },
                    VIDA_UTIL: { type: "date" },
                    VIDA_LIMITE_HORAS: {
                        type: "number", validation: {
                            required: {
                                message: "Debe ingresar la vida limite en horas"
                            }
                        }
                    },
                    TSN: {
                        type: "number", validation: {
                            required: {
                                message: "Debe ingresar el TSN"
                            }
                        }
                    },
                    REMANENTE_HORAS: {
                        type: "number", validation: {
                            required: {
                                message: "Debe ingresar el remanente en horas"
                            }
                        }
                    },
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
            { field: "FECHA_INFORMACION", title: "FECHA INFORMACIÓN", format: "{0:dd/MM/yyyy}", width: "130px" },
            { field: "NUMERO_SERIE", title: "NÚMERO SERIE", width: "130px" },
            { field: "XPOS_PALA_HELICOP_PA", title: "POSICIÓN", width: "180px", editor: categoryDropDownEditor, template: "#=XPOS_PALA_HELICOP_PA.DESCRIPCION#" },
            { field: "NUMERO_PARTE", title: "NÚMERO PARTE Parte", width: "130px" },
            { field: "VIDA_UTIL", title: "VIDA ÚTIL", format: "{0:dd/MM/yyyy}", width: "130px" },
            { field: "VIDA_LIMITE_HORAS", title: "VIDA LIM. (horas)", width: "130px" },
            { field: "VIDA_LIMITE_CICLOS", title: "VIDA LIM. (ciclos)", width: "130px" },
            { field: "FECHA_ULTIMO_OH", title: "FECHA ÚLTIMO OH", format: "{0:dd/MM/yyyy}" },
            { field: "TSN", title: "TSN", width: "130px" },
            { field: "TSO", title: "TSO", width: "130px" },
            { field: "REMANENTE_HORAS", title: "REMANENTE HORAS", width: "130px" },
            { field: "REMANENTE_DIAS", title: "REMANENTE DÍAS", width: "130px" }
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
function validaHelicesHelicoptero() {
    var gridPalasHelicesRegistro = $("#gridPalasHelicesRegistro").data("kendoGrid").dataSource.data();
    var flgValidador = true;
    $.each(gridPalasHelicesRegistro, function (index, item) {
        if (fnValidaHelicesHelicoptero(item)) {
            var dataPala = {
                XPALA_HELICE_HELICOP_PA: "",
                XHELICE_HELICOP_PA: "",
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

    if (dataLista.TSO == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el TSO";
    }

    if (dataLista.TSN == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el TSN";
    }
    if (dataLista.REMANENTE_HORAS == "") {
        flg = false;
        message = "En la paleta Nº " + dataLista.CONTADOR + " : Falta seleccionar el remanente de horas";
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
function fnValidaRegistroHelice() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");

    if ($("#cbPosicionHeliceHelicop option:selected").val() == "" || $("#cbPosicionHeliceHelicop option:selected").val() == undefined) {
        flg = false;
        objData.push({ "cbPosicionHelice": [{ ErrorMessage: "Debe seleccionar la posición de la helice" }] })
    }
    if ($("#txtNRO_PALAS").val() == "") {
        flg = false;
        objData.push({ "txtNRO_PALAS": [{ ErrorMessage: "Debe ingresar el numero de palas" }] })
    }

    if (flg) {
        $("#divErrorHelicePala").hide();
    }
    else {
        errorAddJS("divErrorHelicePala", "ulListaErrorHelicePala", objData)
    }

    return flg;
}
function SaveHelicePalaHelicoptero() {
    if (fnValidaRegistroHelice()) {

        var objHelice = {
            XHELICE_HELICOP_PA: $("#XHELICE_HELICOP_PA_REG").val(),
            XHELICOPTERO_PA: $("#XHELICOPTERO_PA_HELICE_HELICOP").val(),
            XPOS_HELICE_HELICOP_PA: $("#cbPosicionHeliceHelicop  option:selected").val(),
            FLG_ESTADO: $('#chESTADO_HELICE_HELICOP').is(':checked') == true ? true : false,
            NRO_PALAS: $("#txtNRO_PALAS").val()
        }
        if (validaHelicesHelicoptero()) {
            var objPalaHelice = [];
            var gridPalasHelicesRegistro = $("#gridPalasHelicesRegistro").data("kendoGrid").dataSource.data();
            if (gridPalasHelicesRegistro != null) {
                $.each(gridPalasHelicesRegistro, function (index, item) {
                    var PalaHeliceData = {
                        XPALA_HELICE_HELICOP_PA: $("#XPALA_HELICE_HELICOP_PA").val(),
                        XHELICE_HELICOP_PA: $("#XHELICOPTERO_PA_HELICE_HELICOP").val(),
                        CONTADOR: item.CONTADOR,
                        FECHA_INFORMACION: item.FECHA_INFORMACION,
                        NUMERO_SERIE: item.NUMERO_SERIE,
                        ID_POS_PALA_HELICOP_PA: item.XPOS_PALA_HELICOP_PA.XPOS_PALA_HELICOP_PA,
                        NUMERO_PARTE: item.NUMERO_PARTE,
                        VIDA_UTIL: item.VIDA_UTIL,
                        VIDA_LIMITE_HORAS: item.VIDA_LIMITE_HORAS,
                        VIDA_LIMITE_CICLOS: item.VIDA_LIMITE_CICLOS,
                        FECHA_ULTIMO_OH: item.FECHA_ULTIMO_OH,
                        TSO: item.TSO,
                        CSO: item.CSO,
                        TSN: item.TSN,
                        REMANENTE_HORAS: item.REMANENTE_HORAS,
                        REMANENTE_CICLOS: item.REMANENTE_CICLOS,
                        REMANENTE_DIAS: item.REMANENTE_DIAS
                    }

                    objPalaHelice.push(PalaHeliceData);
                });
            }

            $.ajax({
                datatype: 'json',
                url: '/AeronavePADM/SaveHelicePala',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    objHelice: objHelice,
                    objPalaHelice: objPalaHelice
                }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {
                    if (!data.rpta) {
                        errorAddModelo("divErrorHelicePala", "ulListaErrorHelicePala", data.errores);
                    } else {
                        //$("#modalHelicopHelice").modal('hide');
                        $("#modalRegistroHelicopHelice").modal('hide');
                        gestionHeliceHelicop();
                    }
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                desbloqObject();
                return false;
            });
        }


    }
}
function EditHeliceHelicop() {

    var dataDetalle = $("#gridRegHeliceHelicop").data("kendoGrid");
    var itemData = dataDetalle.dataItem(dataDetalle.select());
    if (itemData != null) {
        $.ajax({
            datatype: 'json',
            url: '/AeronavePADM/dataHeliceDataHelicoptero',
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

/*

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

*/