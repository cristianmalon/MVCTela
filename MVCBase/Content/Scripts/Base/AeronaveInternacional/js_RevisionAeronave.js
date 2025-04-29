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
            },
        });
        $("#XTIPO_AERONAVE_PA").kendoDropDownList({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            select: onSelectTipoAeronave,
            filter: "contains",
            change: function (e) {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
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

        disabledDivDatosGenerales();
        disabledDivDatosAeronave();
        disabledDivDatosSolicitante();
       
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
    $("#filtro_Estado_Aeronave").change(function () {
        if ($("#filtro_Estado_Aeronave option:selected").val().trim().length != 0 && $("#filtro_Estado_Aeronave option:selected").val() != null) {
            if ($("#filtro_Estado_Aeronave option:selected").val() == $("#XVALIDOBSERVADO").val()) {
                $("#obsGeneral").show();
            }
            else {
                $("#obsGeneral").hide();
            }
        }
    });
    $("#XTIPO_AERONAVE_PA").change(function () {
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
    });

    $(".btnCancelarAeronave").click(function () {
        window.location = "/ConsultaBandejaEmpresaInternacionalPA/Index";
    });

    $("#btnGuardarAeronave").click(function () {
        if (validGeneral()) {
            saveGeneral();
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

    $('#XTIPO_AERONAVE_PA').val('AVIONES');

    $("#XTIPO_AERONAVE_PA option").each(function () {
        if ($(this).text() == "AVIONES")
            $(this).select(); // This is where my problem is
    });
});

function onSelectTipoAeronave(e) {
    var dataItem = this.dataItem(e.item);
    if ($("#XFABRICANTE_PA option:selected").val().trim().length != 0 && $("#XFABRICANTE_PA option:selected").val() != null) {
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
function valStateAeronave() {
    var Estado = $("#ID_ESTADO_AERONAVE_PA").val();
    switch (Estado) {
        case '1':
            break;
        case '2':
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
        url: '/Aeronave/datoCorreccion',
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
                console.log(l_Genm_Correccion_PA);
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
            REMANENTE_DIAS: item.REMANENTE_DIAS
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
        url: '/Aeronave/SaveHelicop',
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
            REMANENTE_DIAS: item.REMANENTE_DIAS
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
        url: '/Aeronave/SaveTrenes',
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
            FECHA_LIMITE_SO: item.FECHA_LIMITE_SO
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
        url: '/Aeronave/SaveHelices',
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
            REMANENTE_DIAS: item.REMANENTE_DIAS
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
        url: '/Aeronave/SaveMotores',
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
        url: '/Aeronave/SaveTecnicoDos',
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
        url: '/Aeronave/SaveTecnico',
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
function saveGeneral() {
    var oBandejaInter = {
        XAERONAVE_PA: $("#XAERONAVE_PA").val(),
        OBSERVACION: $("#txtGeneral").val(),
        XESTADO_BANDEJA_INTER_PA: $("#filtro_Estado_Aeronave option:selected").val()
    }

    $.ajax({
        datatype: 'json',
        url: '/AeronaveInternacional/SaveCorreccionInternacional',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            oBandejaInter: oBandejaInter
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
                window.location = "/ConsultaBandejaEmpresaInternacionalPA/Bandeja";
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
        return datoflag;
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
    if ($("#XTIPO_SERVICIO_PA  option:selected").val() == "") {
        flg = false;
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
    
    if ($("#filtro_Estado_Aeronave option:selected").val().trim() == "") {
        flg = false;
        objData.push({ "filtro_Estado_Aeronave": [{ ErrorMessage: "Debe seleccionar el estado de la aeronave" }] })
    }

    if ($("#filtro_Estado_Aeronave option:selected").val() == $("#XVALIDOBSERVADO").val()) {
        if ($("#txtGeneral").val().trim() == "") {
            flg = false;
            objData.push({ "txtGeneral": [{ ErrorMessage: "Debe ingresar una observación" }] })
        }
    }

    if (flg) {
        $("#divErrorAeronave").hide();
    }
    else {
        $("#divErrorAeronave").html('<strong>No se puede grabar</strong><ul id="ulListaErrorAeronave"></ul>');
        errorAddJS("divErrorAeronave", "ulListaErrorAeronave", objData)
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

            $("#FECHA_VIDA_LIMITE_MOTOR").data("kendoDatePicker").value(dateFormat($("#FECHA_INFORMACION").val()));
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_MOTOR").val('');
            $("#FECHA_LIMITE_BO_MOTOR").val('');
            $("#FECHA_LIMITE_SO_MOTOR").val('');
            //LIMPIAR COMBOS
            $("#FABRICANTE_MOTOR option:first").attr('selected', 'selected');
            $("#MODELO_MOTOR option:first").attr('selected', 'selected');
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

            $("#NUMERO_PARTE_MOTOR").val('');

            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_MOTOR").val('');
            $("#FECHA_LIMITE_BO_MOTOR").val('');
            $("#FECHA_LIMITE_SO_MOTOR").val('');
            //LIMPIAR COMBOS
            $("#FABRICANTE_MOTOR option:first").attr('selected', 'selected');
            $("#MODELO_MOTOR option:first").attr('selected', 'selected');
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

                $("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").data("kendoMultiSelect").value(itemData.IDENTIFICADOR_DISCO_LIMITANTE.split(","));
                $("#REMANENTE_HORAS_MOTOR").val(itemData.REMANENTE_HORAS);
                $("#REMANENTE_CICLOS_MOTOR").val(itemData.REMANENTE_CICLOS);
                $("#NUMERO_PARTE_MOTOR").val(itemData.NUMERO_PARTE);

                //FECHAS
                $("#FECHA_LIMITE_SN_MOTOR").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SN));
                $("#FECHA_LIMITE_BO_MOTOR").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_BO));
                $("#FECHA_LIMITE_SO_MOTOR").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SO));

                //COMBOS
                $("#FABRICANTE_MOTOR").find('option[value="' + itemData.XFABRICANTE_PA + '"]').attr("selected", "selected");
                $("#MODELO_MOTOR").find('option[value="' + itemData.XMODELO_PA + '"]').attr("selected", "selected");
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
                        itemData.set("XMODELO_PA", $("#MODELO_MOTOR  option:selected").val());
                        itemData.set("XFABRICANTE_PA", $("#FABRICANTE_MOTOR  option:selected").val());
                        itemData.set("DESCRIPCION_POSICION", $("#POSICION_MOTOR  option:selected").text());
                        itemData.set("DESCRIPCION_MODELO", $("#MODELO_MOTOR  option:selected").text());
                        itemData.set("DESCRIPCION_FABRICANTE", $("#FABRICANTE_MOTOR  option:selected").text());
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
                        itemData.set("REMANENTE_DIAS", $("#REMANENTE_DIAS_MOTOR").val());
                        itemData.set("REMANENTE_HORAS", $("#REMANENTE_HORAS_MOTOR").val());
                        itemData.set("REMANENTE_CICLOS", $("#REMANENTE_CICLOS_MOTOR").val());
                        itemData.set("FECHA_LIMITE_SN", $("#FECHA_LIMITE_SN_MOTOR").val());
                        itemData.set("FECHA_LIMITE_BO", $("#FECHA_LIMITE_BO_MOTOR").val());
                        itemData.set("FECHA_LIMITE_SO", $("#FECHA_LIMITE_SO_MOTOR").val());
                        itemData.set("NUMERO_PARTE", $("#NUMERO_PARTE_MOTOR").val());
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
                            XMODELO_PA: $("#MODELO_MOTOR  option:selected").val(),
                            XFABRICANTE_PA: $("#FABRICANTE_MOTOR  option:selected").val(),
                            DESCRIPCION_POSICION: $("#POSICION_MOTOR  option:selected").text(),
                            DESCRIPCION_MODELO: $("#MODELO_MOTOR  option:selected").text(),
                            DESCRIPCION_FABRICANTE: $("#FABRICANTE_MOTOR  option:selected").text(),
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
                            NUMERO_PARTE: $("#NUMERO_PARTE_MOTOR").val()
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

            $("#NUMERO_PARTE_HELICE").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICE").val('');
            $("#FECHA_LIMITE_BO_HELICE").val('');
            $("#FECHA_LIMITE_SO_HELICE").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICES option:first").attr('selected', 'selected');
            $("#FABRICANTE_HELICES option:first").attr('selected', 'selected');
            $("#POSICION_MOTOR option:first").attr('selected', 'selected');
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

            $("#NUMERO_PARTE_HELICE").val('');
            //LIMPIAR FECHAS
            $("#FECHA_LIMITE_SN_HELICE").val('');
            $("#FECHA_LIMITE_BO_HELICE").val('');
            $("#FECHA_LIMITE_SO_HELICE").val('');
            //LIMPIAR COMBOS
            $("#POSICION_HELICES option:first").attr('selected', 'selected');
            $("#FABRICANTE_HELICES option:first").attr('selected', 'selected');
            $("#POSICION_MOTOR option:first").attr('selected', 'selected');
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
                //FECHAS
                $("#FECHA_LIMITE_SN_HELICE").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SN));
                $("#FECHA_LIMITE_BO_HELICE").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_BO));
                $("#FECHA_LIMITE_SO_HELICE").data("kendoDatePicker").value(dateFormat(itemData.FECHA_LIMITE_SO));

                //COMBOS
                $("#FABRICANTE_HELICES").find('option[value="' + itemData.XFABRICANTE_PA + '"]').attr("selected", "selected");
                $("#MODELO_HELICES").find('option[value="' + itemData.XMODELO_PA + '"]').attr("selected", "selected");
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
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_HELICE").val()
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
            $("#MODELO_TRENES option:first").attr('selected', 'selected');
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
            //LIMPIAR COMBOS
            $("#POSICION_TRENES option:first").attr('selected', 'selected');
            $("#TIPO_TRENES option:first").attr('selected', 'selected');
            $("#MODELO_TRENES option:first").attr('selected', 'selected');
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
                $("#MODELO_TRENES").find('option[value="' + itemData.XMODELO_PA + '"]').attr("selected", "selected");

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
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_TRENES").val()
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
            $("#FABRICANTE_HELICOP option:first").attr('selected', 'selected');
            $("#POSICION_HELICOP option:first").attr('selected', 'selected');
            $("#TIPO_HELICOP option:first").attr('selected', 'selected');
            $("#MODELO_HELICOP option:first").attr('selected', 'selected');
            //Cierra Modal
            $("#modalHelicopAeronave").modal('hide');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelicop").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicop"></ul>');
            $("#divErrorHelicop").hide();
            break;
        case 'N':
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
            $("#FABRICANTE_HELICOP option:first").attr('selected', 'selected');
            $("#POSICION_HELICOP option:first").attr('selected', 'selected');
            $("#TIPO_HELICOP option:first").attr('selected', 'selected');
            $("#MODELO_HELICOP option:first").attr('selected', 'selected');
            //Cierra Modal
            $("#modalHelicopAeronave").modal('show');
            //quitar clases de error
            $(".valError").removeClass("valError");
            $("#divErrorHelicop").html('<strong>No se puede grabar</strong><ul id="ulListaErrorHelicop"></ul>');
            $("#divErrorHelicop").hide();
            break;
        case 'E':
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
                $("#FABRICANTE_HELICOP").find('option[value="' + itemData.XFABRICANTE_PA + '"]').attr("selected", "selected");
                $("#POSICION_HELICOP").find('option[value="' + itemData.XPOSICION_HELICOPTERO_PA + '"]').attr("selected", "selected");
                $("#TIPO_HELICOP").find('option[value="' + itemData.XTIPO_HELICOPTERO_PA + '"]').attr("selected", "selected");
                $("#MODELO_HELICOP").find('option[value="' + itemData.XMODELO_PA + '"]').attr("selected", "selected");

                $("#FECHA_VIDA_LIMITE_HELICOP").focus();
                $("#FECHA_ULTIMO_OH_HELICOP").focus();
                $("#FECHA_LIMITE_SN_HELICOP").focus();
                $("#FECHA_LIMITE_BO_HELICOP").focus();
                $("#FECHA_LIMITE_SO_HELICOP").focus();
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
                            FECHA_LIMITE_SO: $("#FECHA_LIMITE_SO_HELICOP").val()
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
    //gestionHeliceHelicoppAeronave
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
                    title: "Helice",
                },
                {
                    field: "NRO_PALAS",
                    title: "NRO PALAS",
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
    var lIdentificador = $("#IDENTIFICADOR_DISCO_LIMITANTE_MOTOR").data('kendoMultiSelect');

    if (lIdentificador.value().length == 0) {
        flg = false;
        objData.push({ "IDENTIFICADOR_DISCO_LIMITANTE_MOTOR": [{ ErrorMessage: "Debe Seleccionar una opcion de Identificador de Disco Limitante como minimo para el registro del motor" }] })
    }

    if ($("#POSICION_MOTOR  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_MOTOR": [{ ErrorMessage: "Debe seleccionar la posición del motor" }] })
    }
    if ($("#FABRICANTE_MOTOR  option:selected").val() == "") {
        flg = false;
        objData.push({ "FABRICANTE_MOTOR": [{ ErrorMessage: "Debe seleccionar el fabricante del motor" }] })
    }
    if ($("#MODELO_MOTOR  option:selected").val() == "") {
        flg = false;
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
    if ($("#CSN_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "CSN_MOTOR": [{ ErrorMessage: "Debe ingresar el CSN del motor" }] })
    }
    if ($("#FECHA_LIMITE_SN_MOTOR").val().trim() != "" && $("#FECHA_LIMITE_SN_MOTOR").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SN_MOTOR": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SN del motor" }] })
    }

    if ($("#TBO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_MOTOR": [{ ErrorMessage: "Debe ingresar el TBO del motor" }] })
    }
    if ($("#CBO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "CBO_MOTOR": [{ ErrorMessage: "Debe ingresar el CBO del motor" }] })
    }
    if ($("#FECHA_LIMITE_BO_MOTOR").val().trim() != "" && $("#FECHA_LIMITE_BO_MOTOR").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_BO_MOTOR": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO del motor" }] })
    }

    if ($("#TSO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_MOTOR": [{ ErrorMessage: "Debe ingresar el TSO del motor" }] })
    }
    if ($("#CSO_MOTOR").val().trim() == "") {
        flg = false;
        objData.push({ "CSO_MOTOR": [{ ErrorMessage: "Debe ingresar el CSO del motor" }] })
    }
    if ($("#FECHA_LIMITE_SO_MOTOR").val().trim() != "" && $("#FECHA_LIMITE_SO_MOTOR").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SO_MOTOR": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SO del motor" }] })
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

    errorAddJS("divErrorMotor", "ulListaErrorMotor", objData)
    return flg;
}

//Validación de Modelo del Motor
function validHeliceReg() {
    var objData = [];
    var flg = true;

    if ($("#POSICION_HELICES  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_HELICES": [{ ErrorMessage: "Debe seleccionar la posición de la helice" }] })
    }
    if ($("#FABRICANTE_HELICES  option:selected").val() == "") {
        flg = false;
        objData.push({ "FABRICANTE_HELICES": [{ ErrorMessage: "Debe seleccionar el fabricante de la helice" }] })
    }
    if ($("#MODELO_HELICES  option:selected").val() == "") {
        flg = false;
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
    if ($("#CSN_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "CSN_HELICE": [{ ErrorMessage: "Debe ingresar el CSN de la helice" }] })
    }
    if ($("#FECHA_LIMITE_SN_HELICE").val().trim() != "" && $("#FECHA_LIMITE_SN_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SN_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SN de la helice" }] })
    }

    if ($("#TBO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_HELICE": [{ ErrorMessage: "Debe ingresar el TBO de la helice" }] })
    }
    if ($("#CBO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "CBO_HELICE": [{ ErrorMessage: "Debe ingresar el CBO de la helice" }] })
    }
    if ($("#FECHA_LIMITE_BO_HELICE").val().trim() != "" && $("#FECHA_LIMITE_BO_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_BO_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO de la helice" }] })
    }

    if ($("#TSO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_HELICE": [{ ErrorMessage: "Debe ingresar el TSO de la helice" }] })
    }
    if ($("#CSO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "CSO_HELICE": [{ ErrorMessage: "Debe ingresar el CSO de la helice" }] })
    }
    if ($("#FECHA_LIMITE_SO_HELICE").val().trim() != "" && $("#FECHA_LIMITE_SO_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SO_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SO de la helice" }] })
    }
    if ($("#VIDA_LIMITE_HORAS_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_HORAS_HELICE": [{ ErrorMessage: "Debe ingresar la vida limite (Hora) de la helice" }] })
    }
    if ($("#VIDA_LIMITE_CICLO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_CICLO_HELICE": [{ ErrorMessage: "Debe ingresar la vida limite (ciclo) de la helice" }] })
    }

    if ($("#FECHA_ULTIMO_OH_HELICE").val().trim() != "" && $("#FECHA_ULTIMO_OH_HELICE").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_ULTIMO_OH_HELICE": [{ ErrorMessage: "Debe ingresar una fecha valida para la ultima fecha de OH de la helice" }] })
    }
    if ($("#REMANENTE_HORAS_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_HORAS_HELICE": [{ ErrorMessage: "Debe ingresar la remanente (Horas) de la helice" }] })
    }
    if ($("#REMANENTE_CICLO_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_CICLO_HELICE": [{ ErrorMessage: "Debe ingresar la remanente (Ciclo) de la helice" }] })
    }
    if ($("#NUMERO_PARTE_HELICE").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_PARTE_HELICE": [{ ErrorMessage: "Debe ingresar el numero parte de la helice" }] })
    }

    errorAddJS("divErrorHelice", "ulListaErrorHelice", objData)
    return flg;
}

//Validación de Modelo del Tren de Aterrizaje
function validTrenesReg() {
    var objData = [];
    var flg = true;

    if ($("#POSICION_TRENES  option:selected").val() == "") {
        flg = false;
        objData.push({ "POSICION_TRENES": [{ ErrorMessage: "Debe seleccionar la posición del tren de aterrizaje" }] })
    }
    if ($("#TIPO_TRENES  option:selected").val() == "") {
        flg = false;
        objData.push({ "TIPO_TRENES": [{ ErrorMessage: "Debe seleccionar el tipo de tren de aterrizaje" }] })
    }
    if ($("#MODELO_TRENES  option:selected").val() == "") {
        flg = false;
        objData.push({ "MODELO_TRENES": [{ ErrorMessage: "Debe seleccionar el modelo del tren de aterrizaje" }] })
    }
    if ($("#NUMERO_SERIE_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_SERIE_TRENES": [{ ErrorMessage: "Debe ingresar el numero de serie del tren de aterrizaje" }] })
    }
    if ($("#TSN_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "TSN_TRENES": [{ ErrorMessage: "Debe ingresar el TSN del tren de aterrizaje" }] })
    }
    if ($("#CSN_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "CSN_TRENES": [{ ErrorMessage: "Debe ingresar el CSN del tren de aterrizaje" }] })
    }
    if ($("#FECHA_LIMITE_SN_TRENES").val().trim() != "" && $("#FECHA_LIMITE_SN_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SN_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SN del tren de aterrizaje" }] })
    }

    if ($("#TBO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_TRENES": [{ ErrorMessage: "Debe ingresar el TBO del tren de aterrizaje" }] })
    }
    if ($("#CBO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "CBO_TRENES": [{ ErrorMessage: "Debe ingresar el CBO del tren de aterrizaje" }] })
    }
    if ($("#FECHA_LIMITE_BO_TRENES").val().trim() != "" && $("#FECHA_LIMITE_BO_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_BO_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO del tren de aterrizaje" }] })
    }

    if ($("#TSO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_TRENES": [{ ErrorMessage: "Debe ingresar el TSO del tren de aterrizaje" }] })
    }
    if ($("#CSO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "CSO_TRENES": [{ ErrorMessage: "Debe ingresar el CSO del tren de aterrizaje" }] })
    }
    if ($("#FECHA_LIMITE_SO_TRENES").val().trim() != "" && $("#FECHA_LIMITE_SO_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SO_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SO del tren de aterrizaje" }] })
    }

    if ($("#VIDA_LIMITE_HORAS_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_HORAS_TRENES": [{ ErrorMessage: "Debe ingresar la vida limite (horas) del tren de aterrizaje" }] })
    }
    if ($("#VIDA_LIMITE_CICLO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_CICLO_TRENES": [{ ErrorMessage: "Debe ingresar la vida limite (ciclo) del tren de aterrizaje" }] })
    }
    if ($("#FECHA_VIDA_LIMITE_TRENES").val().trim() != "" && $("#FECHA_VIDA_LIMITE_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_VIDA_LIMITE_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de  vida limite del tren de aterrizaje" }] })
    }

    if ($("#FECHA_ULTIMO_OH_TRENES").val().trim() != "" && $("#FECHA_ULTIMO_OH_TRENES").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_ULTIMO_OH_TRENES": [{ ErrorMessage: "Debe ingresar una fecha valida para la ultima fecha de OH del tren de aterrizaje" }] })
    }
    if ($("#REMANENTE_HORAS_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_HORAS_TRENES": [{ ErrorMessage: "Debe ingresar la remanente (Horas) del tren de aterrizaje" }] })
    }
    if ($("#REMANENTE_CICLO_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_CICLO_TRENES": [{ ErrorMessage: "Debe ingresar la remanente (Ciclos) del tren de aterrizaje" }] })
    }

    if ($("#NUMERO_PARTE_TRENES").val().trim() == "") {
        flg = false;
        objData.push({ "NUMERO_PARTE_TRENES": [{ ErrorMessage: "Debe ingresar el numero parte del tren de aterrizaje" }] })
    }

    errorAddJS("divErrorTrenes", "ulListaErrorTrenes", objData)
    return flg;
}

//Validación de Modelo del Helicoptero 
function validHelicopReg() {
    var objData = [];
    var flg = true;

    if ($("#FABRICANTE_HELICOP  option:selected").val() == "") {
        flg = false;
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
    if ($("#MODELO_HELICOP  option:selected").val() == "") {
        flg = false;
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
        objData.push({ "FECHA_LIMITE_SN_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SN del helicoptero" }] })
    }

    if ($("#TBO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "TBO_HELICOP": [{ ErrorMessage: "Debe ingresar el TBO del helicoptero" }] })
    }
    if ($("#CBO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "CBO_HELICOP": [{ ErrorMessage: "Debe ingresar el CBO del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_BO_HELICOP").val().trim() != "" && $("#FECHA_LIMITE_BO_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_BO_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de BO del helicoptero" }] })
    }

    if ($("#TSO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "TSO_HELICOP": [{ ErrorMessage: "Debe ingresar el TSO del helicoptero" }] })
    }
    if ($("#CSO_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "CSO_HELICOP": [{ ErrorMessage: "Debe ingresar el CSO del helicoptero" }] })
    }
    if ($("#FECHA_LIMITE_SO_HELICOP").val().trim() != "" && $("#FECHA_LIMITE_SO_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_LIMITE_SO_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha limite de SO del helicoptero" }] })
    }

    if ($("#VIDA_LIMITE_HORAS_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "VIDA_LIMITE_HORAS_HELICOP": [{ ErrorMessage: "Debe ingresar la vida limite(Horas) del helicoptero" }] })
    }

    if ($("#FECHA_VIDA_LIMITE_HELICOP").val().trim() != "" && $("#FECHA_VIDA_LIMITE_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_VIDA_LIMITE_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha de vida limite del helicoptero" }] })
    }


    if ($("#FECHA_ULTIMO_OH_HELICOP").val().trim() != "" && $("#FECHA_ULTIMO_OH_HELICOP").data("kendoDatePicker").value() == null) {
        flg = false;
        objData.push({ "FECHA_ULTIMO_OH_HELICOP": [{ ErrorMessage: "Debe ingresar una fecha valida para la ultima fecha de OH del helicoptero" }] })
    }
    if ($("#REMANENTE_HORAS_HELICOP").val().trim() == "") {
        flg = false;
        objData.push({ "REMANENTE_HORAS_HELICOP": [{ ErrorMessage: "Debe ingresar la remanente (horas) del helicoptero" }] })
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

    errorAddJS("divErrorHelicopCola", "ulListaErrorHelicopCola", objData)
    return flg;
}

//Disabled Div
function disabledDivDatosGenerales() {
    $("#XSOLICITUD_AERONAVE_PA").toggleDisable();
    $("#XTIPO_AERONAVE_PA").data("kendoDropDownList").enable(false);

}
function disabledDivDatosAeronave() {
    $("#MATRICULA").toggleDisable();
    $("#XMODELO_PA").data("kendoDropDownList").enable(false);
    $("#XFABRICANTE_PA").data("kendoDropDownList").enable(false);
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
                url: '/Aeronave/SaveHelicePala',
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
                        $("#modalHelicopHelice").modal('hide');
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