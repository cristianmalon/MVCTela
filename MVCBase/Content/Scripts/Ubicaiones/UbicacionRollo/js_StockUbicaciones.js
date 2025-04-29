$(document).ready(function () {

    CargarCombos();

    CargarGridStockUbicaciones();

    $("#btnBuscarStockUbicaciones").click(function () {
        $('#gridStockUbicaciones').data('kendoGrid').dataSource.read();
        $('#gridStockUbicaciones').data('kendoGrid').refresh();
    });

});

function CargarGridStockUbicaciones() {
    $("#gridStockUbicaciones").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/UbicacionRollo/ListarStockUbicaciones",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    PEDIDO_NUMERO: $('#frmIndexStockUbicaciones :input[id="PEDIDO_NUMERO"]').val(),
                    PARTIDA_NUMERO: $('#frmIndexStockUbicaciones :input[id="PARTIDA_NUMERO"]').val(),
                    CLIENTE_NOMBRES: $('#frmIndexStockUbicaciones :input[id="CLIENTE_NOMBRES"]').val(),
                    ALMACEN_CODIGOKey: $("#ALMACEN_CODIGOKey").val(),
                    ESTADO: 'A'
                });
            }
        },
        schema: {
            data: "lista",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    PABELLON: { type: "string" },
                    UBICACION_DESC: { type: "string" },
                    ARTICULO_CODIGO: { type: "string" },
                    ARTICULO_DESCRIPCION: { type: "string" },
                    PEDIDO_NUMERO: { type: "string" },
                    PARTIDA_NUMERO: { type: "string" },
                    ROLLOS: { type: "number" },
                    STOCK: { type: "number" },
                    FECHA_INGRESO: { type: "date" },
                    F_ULT_MOV: { type: "date" },
                    COMPROMISO: { type: "string" },
                    ALMACEN_NOMBRE: { type: "string" },
                    ALMACEN_CODIGO: { type: "string" },
                    CLIENTE_NOMBRES: { type: "string" },
                    OBSERVACION: { type: "string" },
                    PEDIDO_AÑO: { type: "number" },
                    ALMACEN_TIPO: { type: "string" },
                    USUARIO: { type: "string" },
                    ESTADO_UBICACION: { type: "string" },
                    FECHA_UBI: { type: "date" },
                    ESTADO: { type: "string" },
                    UBICACION_ESTADOKey: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridStockUbicaciones").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateStockUbicaciones").html()),
        noRecords: {
            template: '<br /> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE STOCK ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "ARTICULO_CODIGO",
                title: "Código",
                width: 120
            }, {
                field: "ARTICULO_DESCRIPCION",
                title: "Articulo",
                width: 190
            }, {
                field: "PEDIDO_NUMERO",
                title: "Pedido",
                width: 60
            }, {
                field: "PEDIDO_AÑO",
                title: "Año Pedido",
                width: 80
            }, {
                field: "PARTIDA_NUMERO",
                title: "Partida",
                width: 80
            }, {
                field: "ROLLOS",
                title: "Rollos",
                width: 50
            }, {
                field: "STOCK",
                title: "Stock",
                width: 60
            }, {
                field: "UBICACION_DESC",
                title: "Ubicacion",
                width: 70
            }, {
                field: "FECHA_INGRESO",
                title: "F.ingreso",
                format: "{0: dd/MM/yyyy}",
                width: 80
            }, {
                field: "F_ULT_MOV",
                title: "F.Ult.Mov",
                format: "{0: dd/MM/yyyy}",
                width: 80
            }, {
                field: "COMPROMISO",
                title: "Compromiso",
                width: 80
            }, {
                field: "ALMACEN_NOMBRE",
                title: "Almacen",
                width: 150
            }, {
                field: "CLIENTE_NOMBRES",
                title: "Cliente",
                width: 150
            }, {
                field: "OBSERVACION",
                title: "Observacion",
                width: 100
            }, {
                field: "ALMACEN_TIPO",
                title: "Almacen",
                width: 70
            }, {
                field: "USUARIO",
                title: "Usuario",
                width: 100
            }, {
                field: "ESTADO_UBICACION",
                title: "Estado",
                width: 100
            }, {
                field: "FECHA_UBI",
                title: "Fecha Ubi.",
                format: "{0: dd/MM/yyyy}",
                width: 100
            }]
    }).data("kendoGrid");

}

function ActualizarTablaStockUbicaciones() {
    var grid = $('#gridStockUbicaciones').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarCombos() {
    $("#ALMACEN_CODIGOKey").kendoDropDownList({
        placeholder: "[TODOS]",
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
}