$(document).ready(function () {
    
    $("#txtFechaDesde").kendoDatePicker();
    $("#txtFechaHasta").kendoDatePicker();
    
  
    gridHistoricoHelice();

    $("#btnBuscarCambiosHelices").click(function () {
        gridHistoricoHelice();

    });

    $("#btnLimpiarCambiosHelices").click(function () {
        $("#txtHelSerieAnt").val('');
        $("#txtHelSerieAct").val('');
        $("#txtFechaDesde").val('');
        $("#txtFechaHasta").val('');
        gridHistoricoHelice();
    });

    $("#addNewHelice").click(function () {

        
        var IDHELICE = $('#txtIdHelicesPA').val();
        var situacionbandeja = $('#txtSituacionBandeja').val();

        
        if (situacionbandeja == 2)
        {
            var url = $(this).attr('data-url') + '?Index=' + IDHELICE;
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
            bootbox.alert("No puede registrar un nuevo cambio de hélice de la aeronave porque aún la empresa no ha enviado el nuevo registro de la aeronave");
        }

    });

    $("#addModifyHelice").click(function () {


        var dataDetalleHistoHelice = $("#gridHistoricoHelice").data("kendoGrid");
        var itemDataHistHelice = dataDetalleHistoHelice.dataItem(dataDetalleHistoHelice.select());
        if (itemDataHistHelice != undefined) {
            
            var IDHELICE = $('#txtIdHelicesPA').val();

            var url = $(this).attr('data-url') + '?Index=' + IDHELICE + '&IndexCambio=' + itemDataHistHelice.XCAMBIOHELICEPA;
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


function gridHistoricoHelice() {

    $("#gridHistoricoHelice").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/ConsultaCambioAeronavePA/ListarDataHelicePA",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objRegistro: $('#txtRegistroNew').val(), objITEM: $('#XITEM').val(), objSerieeAnt: $('#txtHelSerieAnt').val(), objSerieAct: $('#txtHelSerieAct').val(), objFechaDesde: $('#txtFechaDesde').val(), objFechaHasta: $('#txtFechaHasta').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_CAMBIOHELICEPA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XCAMBIOHELICEPA: { type: "string" },
                    XAERONAVEPA: { type: "string" },
                    XCONTREGISTRO: { type: "string" },
                    XHELICESPA: { type: "string" },
                    NUMERO_SERIE_ANTERIOR: { type: "string" },
                    NUMERO_SERIE_NUEVO: { type: "string" },
                    DOCUMENTO_CAMBIO: { type: "string" },
                    XFECHA_DOCUMENTO: { type: "string" },
                    XFECHA_CAMBIO_HELICE: { type: "string" },
                    OBSERVACION: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridHistoricoHelice").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        columns: [{
            title: "General",
            columns: [
                {
                    field: "XCAMBIOHELICEPA",
                    width: 90,
                    title: "ID_CAMBIO_HELICE_PA",
                    hidden: true
                }, {
                    field: "XAERONAVEPA",
                    width: 90,
                    title: "ID_AERONAVE_PA",
                    hidden: true
                }, {
                    field: "XCONTREGISTRO",
                    width: 90,
                    title: "ID_CONTREGISTRO",
                    hidden: true
                }, {
                    field: "XHELICESPA",
                    width: 90,
                    title: "ID_HELICES_PA",
                    hidden: true
                }, {
                    field: "NUMERO_SERIE_ANTERIOR",
                    width: 90,
                    title: "SERIE ANTERIOR"
                }, {
                    field: "NUMERO_SERIE_NUEVO",
                    title: "SERIE ACTUAL",
                    width: 90
                }, {
                    field: "DOCUMENTO_CAMBIO",
                    title: "DOC. CAMBIO",
                    width: 100
                }, {
                    field: "XFECHA_DOCUMENTO",
                    title: "FECHA DOC.",
                    width: 100
                }, {
                    field: "XFECHA_CAMBIO_HELICE",
                    title: "FECHA CAMBIO",
                    width: 100
                }, {
                    field: "OBSERVACION",
                    title: "OBSERVACIÓN",
                    width: 100
                }
            ]
        }]
    }).data("kendoGrid");

}
