$(document).ready(function () {

    CargarGridMovimientos();
    CargarCombos();

    $("#btnBuscarMovimientos").click(function () {
        $('#gridMovimientos').data('kendoGrid').dataSource.read();
        $('#gridMovimientos').data('kendoGrid').refresh();
    });


});

function CargarGridMovimientos() {
    $("#gridMovimientos").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/UbicacionMovimiento/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    UBICACION_ORIGENKey: $('#frmIndexMovimientos :input[id="UBICACION_ORIGENKey"]').val(),
                    UBICACION_DESTINOKey: $('#frmIndexMovimientos :input[id="UBICACION_DESTINOKey"]').val(),
                    ROLLO_NUMERO: $('#frmIndexMovimientos :input[id="ROLLO_NUMERO"]').val(),
                    PARTIDA_NUMERO: $('#frmIndexMovimientos :input[id="PARTIDA_NUMERO"]').val(),
                    PEDIDO_NUMERO: $('#frmIndexMovimientos :input[id="PEDIDO_NUMERO"]').val(),
                    ARTICULO_CODIGO: $('#frmIndexMovimientos :input[id="ARTICULO_CODIGO"]').val(),
                    ALMACEN_CODIGO: $('#frmIndexMovimientos :input[id="ALMACEN_CODIGO"]').val(),
                    CLIENTE_NOMBRES: $('#frmIndexMovimientos :input[id="CLIENTE_NOMBRES"]').val(),
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
                    UBICACION_ORIGEN: { type: "string" },
                    UBICACION_DESTINO: { type: "string" },
                    ROLLO_AÑO: { type: "number" },
                    ROLLO_NUMERO: { type: "string" },
                    ROLLO_PESO: { type: "number" },
                    PARTIDA_NUMERO: { type: "string" },
                    PEDIDO_AÑO: { type: "number" },
                    PEDIDO_NUMERO: { type: "string" },
                    ARTICULO_CODIGO: { type: "string" },
                    ARTICULO_DESCRIPCION: { type: "string" },
                    CLIENTE_NOMBRES: { type: "string" },
                    ALMACEN_CODIGO: { type: "string" },
                    ALMACEN_NOMBRE: { type: "string" },
                    ALMACEN_NOMBRE_CODIGO: { type: "string" },
                    UBICACION_ROLLOKey: { type: "string" },
                    UBICACION_ORIGENKey: { type: "string" },
                    UBICACION_DESTINOKey: { type: "string" },
                    UBICACION_ESTADOKey_ORIGEN: { type: "string" },
                    UBICACION_ESTADOKey_DESTINO: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridMovimientos").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateMovimientos").html()),
        noRecords: {
            template: '<br /> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE MOVIMIENTOS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "UBICACION_ORIGEN",
                title: "Origen",
                width: 50
            }, {
                field: "ROLLO_AÑO",
                title: "Año",
                width: 50
            }, {
                field: "ROLLO_NUMERO",
                title: "Rollo",
                width: 50
            }, {
                field: "ROLLO_PESO",
                title: "Peso",
                width: 50
            }, {
                field: "PARTIDA_NUMERO",
                title: "Partida",
                width: 100
            }, {
                field: "PEDIDO_AÑO",
                title: "Año",
                width: 50
            }, {
                field: "PEDIDO_NUMERO",
                title: "Pedido",
                width: 50
            }, {
                field: "UBICACION_DESTINO",
                title: "Destino",
                width: 50
            }, {
                field: "ARTICULO_CODIGO",
                title: "Codigo",
                width: 100
            }, {
                field: "ARTICULO_DESCRIPCION",
                title: "Descripcion Tela",
                width: 200
            }, {
                field: "CLIENTE_NOMBRES",
                title: "Cliente",
                width: 200
            }, {
                field: "ALMACEN_CODIGO",
                title: "Almacen",
                width: 50
            }]
    }).data("kendoGrid");

}

function ActualizarTablaMovimientos() {
    var grid = $('#gridMovimientos').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarCombos() {
    $('#frmIndexMovimientos :input[id="UBICACION_ORIGENKey"]').kendoDropDownList({
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

    $('#frmIndexMovimientos :input[id="UBICACION_DESTINOKey"]').kendoDropDownList({
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
