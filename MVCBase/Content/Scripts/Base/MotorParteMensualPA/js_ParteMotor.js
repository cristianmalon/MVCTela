$(document).ready(function () {

    //CargarMes();
    //CargarAnio();

    $("#txtSituacionMotor").kendoComboBox({
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

    $("#txtMesParteAeronave").kendoComboBox({
        placeholder: "[SELECCIONE MES]",
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


    $("#txtAnioParteAeronave").kendoComboBox({
        placeholder: "[SELECCIONE AÑO]",
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

    gridParteMensualMotor();

    $("#btnBuscarParteMotor").click(function () {
        gridParteMensualMotor();

    });

    $("#btnLimpiarParteMotor").click(function () {
        $("#txtSituacionMotor").data("kendoComboBox").value('');
        $("#txtMesParteAeronave").data("kendoComboBox").value('');
        $("#txtAnioParteAeronave").data("kendoComboBox").value('');
        gridParteMensualMotor();
    });

    $("#addNewParteMotor").click(function () {

        var IDMOTORAERONAVEPA = $('#XMOTOR_AERONAVE_PA').val();
        //var XCONTREGISTRO = $('#XCONTREGISTRO').val();
        


        //var url = $(this).attr('data-url') + '?Index=' + XCONTREGISTRO + '&Contreg=' + IDMOTORAERONAVEPA;
        var url = $(this).attr('data-url') + '?Index=' + IDMOTORAERONAVEPA ;
        var divModal = $(this).attr('data-div');
        var divContenedor = $(this).attr('data-contenedor');

        var seccionModal = ".seccionModal";
        var seccionContenedor = ".contenedor";

        if (divModal) {
            seccionModal = "#" + divModal;
        }

        if (divContenedor) {
            seccionContenedor = "#" + divContenedor;
        }

        $.ajax({
            url: url,
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                desbloqObject();
                $(seccionModal).html(data);
                $(seccionContenedor).modal('show');
            }
        });

    });
    
    $("#addModifyParteMotor").click(function () {

        

        var dataDetalleParteMotor = $("#gridParteMensualMotor").data("kendoGrid");
        var itemDataParteMotor = dataDetalleParteMotor.dataItem(dataDetalleParteMotor.select());
        if (itemDataParteMotor != undefined) {

            var IDMOTORAERONAVEPA = $('#XMOTOR_AERONAVE_PA').val();

            var url = $(this).attr('data-url') + '?Index=' + IDMOTORAERONAVEPA + '&IndexParte=' + itemDataParteMotor.XPARTE_MOTOR_PA;
            var divModal = $(this).attr('data-div');
            var divContenedor = $(this).attr('data-contenedor');

            var seccionModal = ".seccionModal";
            var seccionContenedor = ".contenedor";

            if (divModal) {
                seccionModal = "#" + divModal;
            }

            if (divContenedor) {
                seccionContenedor = "#" + divContenedor;
            }

            $.ajax({
                url: url,
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {
                    desbloqObject();
                    $(seccionModal).html(data);
                    $(seccionContenedor).modal('show');
                }
            });

        }
        else {
            bootbox.alert("Seleccione un registro de la tabla");
        }


    });
    




});

function gridParteMensualMotor() {

    $("#gridParteMensualMotor").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/MotorParteMensualPA/ListarSelectParteMotor",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objCONTREGISTRO: $('#XCONTREGISTRO').val(), objITEM: $('#XITEM').val(), objSITUACION: $('#txtSituacionMotor').val(), objMES: $('#txtMesParteAeronave').val(), objAnio: $('#txtAnioParteAeronave').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_PARTEMOTOR",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XPARTE_MOTOR_PA: { type: "string" },
                    XAERONAVE_PA: { type: "string" },
                    XCONTREGISTRO: { type: "string" },
                    XMOTOR_AERONAVE_PA: { type: "string" },
                    XFECHA_INFORMACION: { type: "string" },
                    SITUACION_AERONAVE: { type: "string" },
                    XHORA_FECHA_TURM: { type: "string" },
                    HTOTAL_GENERAL_ANT: { type: "string" },
                    HTOTAL_MES: { type: "string" },
                    HTOTAL_ACUMULADO: { type: "string" },
                    HLIMITE_OVERHAUL: { type: "string" },
                    HULTIMO_LIMITE_OVERHAUL: { type: "string" },
                    HDISP_OPERACION: { type: "string" },
                    HORA_OBSERVACION: { type: "string" },
                    XCICLO_FECHA_TURM: { type: "string" },
                    CICLO_TOTAL_ANTERIOR: { type: "string" },
                    CICLO_HORA_MES: { type: "string" },
                    CICLO_TOTAL_ACUMULADO: { type: "string" },
                    CICLO_LIMITE_OH: { type: "string" },
                    CICLO_ULTIMO_OH: { type: "string" },
                    CICLO_OPERACION: { type: "string" },
                    CICLO_OBSERVACION: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridParteMensualMotor").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
        {
            title: "GENERAL",
            columns: [
                {
                    field: "XPARTE_MOTOR_PA",
                    width: 90,
                    title: "ID_PARTE_MOTOR_PA",
                    hidden: true
                }, {
                    field: "XAERONAVE_PA",
                    width: 90,
                    title: "ID_AERONAVE_PA",
                    hidden: true
                }, {
                    field: "XCONTREGISTRO",
                    width: 90,
                    title: "ID_CONTREGISTRO",
                    hidden: true
                }, {
                    field: "XMOTOR_AERONAVE_PA",
                    width: 90,
                    title: "ID_MOTOR_AERONAVE_PA",
                    hidden: true
                }, {
                    field: "XFECHA_INFORMACION",
                    title: "FECHA INFOR.",
                    width: 150
                }, {
                    field: "SITUACION_AERONAVE",
                    width: 150,
                    title: "SITUACIÓN"
                }]

        }, {
            title: "HORAS",
            columns: [

            {
                field: "XHORA_FECHA_TURM",
                title: "FECHA T.U.R.M.",
                width: 150
            }, {
                field: "HTOTAL_GENERAL_ANT",
                title: "TOTAL GRAL. ANTERIOR",
                width: 150
            }, {
                field: "HTOTAL_MES",
                title: "TOTAL EN EL MES",
                width: 150
            }, {
                field: "HTOTAL_ACUMULADO",
                title: "TOTAL ACUMULADO",
                width: 150
            }, {
                field: "HLIMITE_OVERHAUL",
                title: "LÍMITE OVERHAUL",
                width: 150
            }, {
                field: "HULTIMO_LIMITE_OVERHAUL",
                title: "DESDE ULT. OVERHAUL",
                width: 150
            }, {
                field: "HDISP_OPERACION",
                title: "DISP. OPER.",
                width: 150
            }, {
                field: "HORA_OBSERVACION",
                title: "OBSERVACIÓN",
                width: 150
            }]
        }, {
            title: "CICLOS",
            columns: [
            {
                field: "XCICLO_FECHA_TURM",
                title: "FECHA T.U.R.M.",
                width: 150
            }, {
                field: "CICLO_TOTAL_ANTERIOR",
                title: "TOTAL GRAL. ANTERIOR",
                width: 150
            }, {
                field: "CICLO_HORA_MES",
                title: "TOTAL EN EL MES",
                width: 150
            }, {
                field: "CICLO_TOTAL_ACUMULADO",
                title: "TOTAL ACUMULADO",
                width: 150
            }, {
                field: "CICLO_LIMITE_OH",
                title: "LÍMITE OVERHAUL",
                width: 150
            }, {
                field: "CICLO_ULTIMO_OH",
                title: "DESDE ULT. OVERHAUL",
                width: 150
            }, {
                field: "CICLO_OPERACION",
                title: "DISP. OPER.",
                width: 150
            }, {
                field: "CICLO_OBSERVACION",
                title: "OBSERVACIÓN",
                width: 150
            }]
        }]
    }).data("kendoGrid");

}