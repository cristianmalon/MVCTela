$(document).ready(function () {
    //alert(1);
    $(window).load(function () {
        $("#txtFechaDesde").kendoDatePicker();
        $("#txtFechaHasta").kendoDatePicker();

        $("#txtHisFechaDocumento").kendoDatePicker();
        $("#txtHisFechaCambioMotor").kendoDatePicker();
        // alert(2);

        gridHistoricoMotor('');
        ConsultaListaMotorTodos();
        //gridListaMotor();

        $("#addHistoricoMotor").click(function () { actionRegHistoricoMotor('N'); });
        $("#btnRegistroModalMotor").click(function () { GuardarCambioMotor(); });
        $("#btnConsultaMotor").click(function () { BotonConsultaMotor(); });
        $("#btnBuscarCambiosMotor").click(function () { ConsultaCambioMotor(); });
        $("#btnBuscarMotor").click(function () { ConsultaListaMotor(); });
        $("#btnCancelarModalMotor").click(function () { CanelarModalMotor(); });
        $("#btnCancelarConsultaMotor").click(function () { CanelarModalConsultaMotor(); });


    });

    $("#btnCancelarCambioMotor").click(function () {
        window.location = "/ConsultaCambioAeronavePA/ConsultaCambioAeronavePA";
    });
});

function CanelarModalMotor() {
    $("#modalMotor").modal('hide');
}
function CanelarModalConsultaMotor() {
    $("#modalConsultaMotor").modal('hide');
}

function ConsultaCambioMotor() {

    var KDPFECHA_DESDE = $("#txtFechaDesde").data("kendoDatePicker");
    var KDPFECHA_HASTA = $("#txtFechaHasta").data("kendoDatePicker");
    var FECHA_DOCUMENTO = new Date(1999, 1, 1);
    var FECHA_CAMBIO = new Date(1999, 1, 1);

    FECHA_DESDE = KDPFECHA_DESDE.value();
    FECHA_HASTA = KDPFECHA_HASTA.value();
    var oCambioMotor = {
        XAERONAVE_PA: $("#txtAeronave").val(),
        XMOTOR_AERONAVE_PA: $("#XMOTOR_AERONAVE_PA").val(),
        XITEM: $("#XITEM").val(),
        XCONTREGISTRO : $("#txtContReg").val(),
        NUMERO_SERIE_ANTERIOR: $("#txtPorSerieAnterior").val(),
        NUMERO_SERIE_NUEVO: $("#txtPorNuevaSerie").val()
    };
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/ConsultaCambioAeronavePAMotor/ListaCambioMotores',
        type: 'POST',
        data: JSON.stringify({ aeronave: oCambioMotor, fec_ini: $("#txtFechaDesde").val(), fec_fin: $("#txtFechaHasta").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);

            gridHistoricoMotor(data.l_CambioMotor);
            
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });
}


function ConsultaCambioMotorInicial() {
    var KDPFECHA_DESDE = $("#txtFechaDesde").data("kendoDatePicker");
    var KDPFECHA_HASTA = $("#txtFechaHasta").data("kendoDatePicker");
    var FECHA_DOCUMENTO = new Date(1999, 1, 1);
    var FECHA_CAMBIO = new Date(1999, 1, 1);

    FECHA_DESDE = KDPFECHA_DESDE.value();
    FECHA_HASTA = KDPFECHA_HASTA.value();

    var oCambioMotor = {
        XAERONAVE_PA: $("#txtAeronave").val(),
        XMOTOR_AERONAVE_PA: $("#XMOTOR_AERONAVE_PA").val(),
        XITEM: $("#XITEM").val(),
        XCONTREGISTRO: $("#txtContReg").val(),
        NUMERO_SERIE_ANTERIOR: '',
        NUMERO_SERIE_NUEVO: ''
    };
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/ConsultaCambioAeronavePAMotor/ListaCambioMotores',
        type: 'POST',
        data: JSON.stringify({ aeronave: oCambioMotor, fec_ini: '', fec_fin: '' }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);

            gridHistoricoMotor(data.l_CambioMotor);

            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });
}

function BotonConsultaMotor() {
    var entityGrid = $("#griListaMotor").data("kendoGrid");
    var selectedRowsIns = $(".k-state-selected", "#griListaMotor");
    var selectedItemgrid = entityGrid.dataItem(selectedRowsIns[0]);
    if (selectedItemgrid != undefined) {
        $("#modalConsultaMotor").modal('show');        
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        //$("#txtPorSerieAnterior").val(selectedItem.NUMERO_SERIE);
        $("#txtHisAntSerie").val(selectedItem.NUMERO_SERIE);
        $("#XMOTOR_AERONAVE_PA").val(selectedItem.XMOTOR_AERONAVE_PA);
        $("#XITEM").val(selectedItem.XITEM);


        ConsultaCambioMotorInicial();
    } else{
        bootbox.alert("Seleccione un registro de la tabla")
    }

    
}
function gridHistoricoMotor(dataMotor) {
    $("#gridHistoricoMotor").kendoGrid({
        sortable: true,
        resizable: true,
        dataSource: {
            data: dataMotor,
            pageSize: 5
        },
        change: onChange,
        selectable: true,
        sortable: true,
        pageable: true,
        columns: [
            {
                field: "XAERONAVE_PA",
                width: 90,
                title: "ID_AERONAVE_PA",
                hidden: true
            }, {
                field: "XCAMBIO_MOTOR_PA",
                width: 90,
                title: "ID_CAMBIO_MOTOR_PA",
                hidden: true
            }, {
                field: "XMOTOR_AERONAVE_PA",
                width: 90,
                title: "ID_MOTOR_AERONAVE_PA",
                hidden: true
            }, {
                field: "XCONTREGISTRO",
                width: 90,
                title: "ID_CONTREGISTRO",
                hidden: true
            }, {
                field: "MATRICULA",
                width: 90,
                title: "MATRICULA",
                hidden: true
            }, {
                field: "NUMERO_SERIE_ANTERIOR",
                title: "SERIE ANTERIOR",
                width: 150
            }, {
                field: "NUMERO_SERIE_NUEVO",
                title: "SERIE ACTUAL",
                width: 150
            }, {
                field: "DOCUMENTO_CAMBIO",
                title: "DOCUMENTO DE CAMBIO",
                width: 150
            }, {
                field: "XFECHA_DOCUMENTO",
                title: "FECHA DOCUMENTO",
                width: 130
            }, {
                field: "XFECHA_CAMBIO_MOTOR",
                title: "FECHA CAMBIO",
                width: 130
            }, {
                field: "OBSERVACION",
                title: "OBSERVACION",
                width: 150
            }]
    });
}

function onChange(arg) {
    var entityGrid = $("#gridHistoricoMotor").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());
    $("#modalMotor").modal('show');
    $("#divMatriculaData").show();
    $("#divMatriculaNuevo").hide();
    $("#divSerieAnteriorData").show();
    $("#divSerieAnteriorNuevo").hide();
    $("#btnRegistroModalMotor").hide();

    $("#txtHisMatriculaData").val(selectedItem.MATRICULA);
    $("#txtHisAntSerieData").val(selectedItem.NUMERO_SERIE_ANTERIOR);
    $("#txtHisActSerie").val(selectedItem.NUMERO_SERIE_NUEVO);
    $("#txtHisDocumento").val(selectedItem.DOCUMENTO_CAMBIO);
    $("#txtHisFechaDocumento").val(selectedItem.XFECHA_DOCUMENTO);
    $("#txtHisFechaCambioMotor").val(selectedItem.XFECHA_CAMBIO_MOTOR);
    $("#txtHisObservacion").val(selectedItem.OBSERVACION);


    $("#txtHisMatriculaData").removeAttr("readonly").attr("readonly", "readonly");
    $("#txtHisAntSerieData").removeAttr("readonly").attr("readonly", "readonly");
    $("#txtHisActSerie").removeAttr("readonly").attr("readonly", "readonly");
    $("#txtHisDocumento").removeAttr("readonly").attr("readonly", "readonly");
    $("#txtHisObservacion").removeAttr("readonly").attr("readonly", "readonly");

    $("#txtHisFechaDocumento").removeAttr("disabled").attr("disabled", "disabled");
    $("#txtHisFechaCambioMotor").removeAttr("disabled").attr("disabled", "disabled");
}

function ConsultaListaMotor() {
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/ConsultaCambioAeronavePAMotor/ListaMotoresBusqueda',
        type: 'POST',
        data: JSON.stringify({ aeronave: $("#txtAeronave").val(), numero_serie: $("#txtSerieMotor").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);
            gridListaMotor(data.l_Motor);
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });

}
function ConsultaListaMotorTodos() {
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/ConsultaCambioAeronavePAMotor/ListaMotores',
        type: 'POST',
        data: JSON.stringify({ aeronave: $("#txtAeronave").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);
            gridListaMotor(data.l_Motor);
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });

}

function gridListaMotor(data) {
            
                $("#griListaMotor").kendoGrid({
                    sortable: true,
                    resizable: true,
                    dataSource: {
                        data: data,
                        pageSize: 5
                    },
                    selectable: "multiple",
                    sortable: true,
                    pageable: true,
                    columns: [
                        {
                            field: "XAERONAVE_PA",
                            width: 90,
                            title: "ID_AERONAVE_PA",
                            hidden: true
                        }, {
                            field: "XMOTOR_AERONAVE_PA",
                            width: 90,
                            title: "XMOTOR_AERONAVE_PA",
                            hidden: true
                        }, {
                            field: "XITEM",
                            width: 90,
                            title: "XITEM",
                            hidden: true
                        }, {
                            field: "NUMERO_SERIE",
                            width: 150,
                            title: "NUMERO SERIE"
                        },{
                            field: "DESCRIPCION_MODELO",
                            title: "MODELO",
                            width: 150
                        }, {
                            field: "DESCRIPCION_FABRICANTE",
                            title: "FABRICANTE",
                            width: 150
                        }, {
                            field: "DESCRIPCION_POSICION",
                            title: "POSICIÓN",
                            width: 150
                        }]
                });

}

function validaCambioMotor() {
    var objData = [];
    var flg = true;

    var FechaDocumento = isDate($("#txtHisFechaDocumento").val());
    var FechaCambioMotor = isDate($("#txtHisFechaCambioMotor").val());

    if ($("#txtHisAntSerie").val().trim() == "") {
        flg = false;
        objData.push({ "txtHisAntSerie": [{ ErrorMessage: "Debe ingresar un antiguo número serie" }] })
    }
    if ($("#txtHisActSerie").val().trim() == "") {
        flg = false;
        objData.push({ "txtHisActSerie": [{ ErrorMessage: "Debe seleccionar un nuevo número de serie" }] })
    }    
    if (FechaDocumento == false) {
        flg = false;
        objData.push({ "txtHisFechaDocumento": [{ ErrorMessage: "Debe ingresar una Fecha documento Valida" }] })
    }/*
    if (FechaCambioMotor == false) {
        flg = false;
        objData.push({ "txtHisFechaCambioMotor": [{ ErrorMessage: "Debe ingresar una Fecha de  Cambio de motor Valida" }] })
    }*/
    if ($("#txtHisDocumento").val().trim() == "") {
        flg = false;
        objData.push({ "txtHisDocumento": [{ ErrorMessage: "Debe ingresar documento de inscripción" }] })
    }

    if (flg) {
        $("#divErrorMotor").hide();
    }
    else {
        $("#divErrorMotor").html('<strong>No se puede grabar</strong><ul id="ulListaErrorMotor"></ul>');
        errorAddJS("divErrorMotor", "ulListaErrorMotor", objData)
    }
    return flg;
}

function GuardarCambioMotor() {
    if (validaCambioMotor()) {
    var KDPFECHA_DOC = $("#txtHisFechaDocumento").data("kendoDatePicker");
    var KDPFECHA_CAMBIO = $("#txtHisFechaCambioMotor").data("kendoDatePicker");
    var FECHA_DOCUMENTO = new Date(1999, 1, 1);
    var FECHA_CAMBIO = new Date(1999, 1, 1);

    FECHA_DOCUMENTO = KDPFECHA_DOC.value();
    FECHA_CAMBIO = KDPFECHA_CAMBIO.value();

    var oCambioMotor = {
        XAERONAVE_PA: $("#txtAeronave").val(),
        XMOTOR_AERONAVE_PA: $("#XMOTOR_AERONAVE_PA").val(),
        XITEM: $("#XITEM").val(),
        NUMERO_SERIE_ANTERIOR: $("#txtHisAntSerie").val(),
        NUMERO_SERIE_NUEVO: $("#txtHisActSerie").val(),
        DOCUMENTO_CAMBIO: $("#txtHisDocumento").val(),
        FECHA_DOCUMENTO: FECHA_DOCUMENTO,
        FECHA_CAMBIO_MOTOR: FECHA_CAMBIO,
        OBSERVACION: $("#txtHisObservacion").val(),
        XCONTREGISTRO: $("#txtContReg").val(),
        MATRICULA: $("#XMATRICULA_SAVE").val()
    };

    console.log(oCambioMotor);
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/ConsultaCambioAeronavePAMotor/SaveCambioMotor',
        type: 'POST',
        data: JSON.stringify({ oCambioMotor: oCambioMotor }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);
            if (!data.rpta) {
                errorAddModelo("divErrorMotor", "ulListaErrorMotor", data.errores);
                desbloqObject();
            } else {
                console.log(data.newidaeronave);
                bootbox.alert("El registro de la autorización esta completo!");
                $("#modalMotor").modal('hide');
                ConsultaCambioMotorInicial();
                window.location = "/ConsultaCambioAeronavePAMotor/ListaCambioMotor" + '?Index=' + data.newidaeronave;
                //window.location = data.url;

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
//Eventos de registro para historico motor
function actionRegHistoricoMotor(objAction) {
    if ($("#txtSituacionBandeja").val() == 2) {
    switch (objAction) {
        
        case 'N':
            //LIMPIAR INPUTS
            $("#hdActionMotor").val('N');
            $("#txtHisActSerie").val('');
            $("#txtHisDocumento").val('');
            $("#txtHisObservacion").val('');

            //LIMPIAR FECHAS
            $("#txtHisFechaDocumento").val('');
            $("#txtHisFechaCambioMotor").val('');
            //LIMPIAR COMBOS
            //$("#FABRICANTE_MOTOR option:first").attr('selected', 'selected');

            //habilita campos
            $("#txtHisActSerie").removeAttr("readonly");
            $("#txtHisDocumento").removeAttr("readonly");
            $("#txtHisObservacion").removeAttr("readonly");

            $("#txtHisFechaDocumento").removeAttr("disabled");
            $("#txtHisFechaCambioMotor").removeAttr("disabled");

            //Abre Modal
            $("#modalMotor").modal('show');
            $("#divMatriculaNuevo").show();
            $("#divMatriculaData").hide();
            $("#divSerieAnteriorNuevo").show();
            $("#divSerieAnteriorData").hide();
            $("#btnRegistroModalMotor").show();
            $(".valError").removeClass("valError");
            $("#divErrorMotor").html('<strong>No se puede grabar</strong><ul id="ulListaErrorMotor"></ul>');
            $("#divErrorMotor").hide();
            break;
        
        case 'D':

            break;
        }
    } else {

        bootbox.alert("No puede registrar un nuevo cambio de motor de la aeronave porque aún la empresa no ha enviado el nuevo registro de la aeronave");
    }
}