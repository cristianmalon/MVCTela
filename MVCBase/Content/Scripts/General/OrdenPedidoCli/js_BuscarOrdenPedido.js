$(document).ready(function () {

    ConfigurarCalendariosOrdenPed();
    CargarCombosOrdenPedido();
    CargarGridOrdenPedido();

    $("#OPENAno").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaOrdenPedido();
            $(this).removeAttr("disabled");
            $("#OPENAno").focus();
        }
    });

    $("#OPENNro").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaOrdenPedido();
            $(this).removeAttr("disabled");
            $("#OPENNro").focus();
        }
    });

});

function CargarGridOrdenPedido() {
    $("#gridOrdenPedido").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/OrdenPedidoCli/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    EmpCCod: $("#frmIndexBuscarOrdenPedido :input[id='EmpCCod']").val(),
                    TOCCCod: $("#frmIndexBuscarOrdenPedido :input[id='TOCCCod']").val(),
                    OPENAno: $("#frmIndexBuscarOrdenPedido :input[id='OPENAno']").val(),
                    OPESEst: $("#frmIndexBuscarOrdenPedido :input[id='OPESEst']").val(),
                    OPENNro: $("#frmIndexBuscarOrdenPedido :input[id='OPENNro']").val(),
                    CLIENTEKey: $("#frmIndexBuscarOrdenPedido :input[id='CLIENTEKey']").val(),
                    MARCAKey: $("#frmIndexBuscarOrdenPedido :input[id='MARCAKey']").val(),
                    OPECMpd: $("#frmIndexBuscarOrdenPedido :input[id='OPECMpd']").val()
                });
            }
        },
        schema: {
            data: "lista",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    EmpCCod: { type: "string" },
                    TOCCCod: { type: "string" },
                    OPENAno: { type: "number" },
                    OPENNro: { type: "string" },
                    TOCDDes: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridOrdenPedido").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: true,
        selectable: true,
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE ORDENES DE PEDIDO ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "TOCDDes",
                title: "Tipo Orden",
                width: 100
            }, {
                field: "OPENAno",
                title: "Año",
                width: 100
            }, {
                field: "OPENNro",
                title: "Número",
                width: 100
            }]
    }).data("kendoGrid");

}

function ActualizarTablaOrdenPedido() {
    $('#gridOrdenPedido').data('kendoGrid').dataSource.read();
    $('#gridOrdenPedido').data('kendoGrid').refresh();
}

function CargarCombosOrdenPedido() {
    $("#TOCCCod").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: ActualizarTablaOrdenPedido
    });
}

function ConfigurarCalendariosOrdenPed() {
    //CONFIGURANDO EL CALENDARIO
    var viewModel = new kendo.observable({
        dateFilter: new Date(),

        dateFilterFormatted: function () {
            return kendo.toString(this.get('dateFilter'), 'yyyy');
        },
    });
    kendo.bind($('#containerPicker'), viewModel);

    //COLOCAMOS LA FECHA ACTUAL
    var todayDate = kendo.toString(kendo.parseDate(new Date()), 'yyyy');
    $("#OPENAno").data("kendoDatePicker").value(todayDate);

    //PERMISO DE SOLO LECTURA PARA EL CALENDARIO
    $('#OPENAno').attr('readonly', true);
}