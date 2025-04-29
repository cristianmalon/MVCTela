$(document).ready(function () {

    CargarGridStock();
    CargarCombosIndex();
    CargarCalendarioIndex();

    $("#btnBuscarStock").click(function () {
        var StpNApe = $('#frmIndexStock :input[id="StpNApe"]').val();
        var ALMACENKey = $('#frmIndexStock :input[id="ListaAlmacenes"]').val();

        if (StpNApe == "" || StpNApe == undefined) {
            AlertMessage("DEBE INGRESAR EL AÑO");
        }

        if (ALMACENKey == "" || ALMACENKey == undefined) {
            AlertMessage("DEBE SELECCIONAR UN ALMACEN");
        }

        else {
            $('#gridStock').data('kendoGrid').dataSource.read();
            $('#gridStock').data('kendoGrid').refresh();
        }
    });

    $("#btnUbicarPartida").click(function () {
        var data = $("#gridStock").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            var url = encodeURI(item.SerialKey);
            window.location.href = Enrutamiento($(this).attr('data-url'), 'key=' + url)
        }
        else {
            AlertMessage("DEBE SELECCIONAR UNA PARTIDA");
        }
    });

});

function CargarGridStock() {
    $("#gridStock").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Stock/ListarPaginado",
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function () {
                    bloquoteObject();
                },
                complete: function () {
                    desbloqObject();
                }
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    EmpCCod: $('#frmIndexStock :input[id="EmpCCod"]').val(),
                    TarCCod: $('#frmIndexStock :input[id="TarCCod"]').val(),
                    StpNApe: $('#frmIndexStock :input[id="StpNApe"]').val(),
                    ALMACENKey: $('#frmIndexStock :input[id="ListaAlmacenes"]').val(),
                    StpDPed: $('#frmIndexStock :input[id="StpDPed"]').val(),
                    stpcpar: $('#frmIndexStock :input[id="StpCPar"]').val(),
                    maeccod: $('#frmIndexStock :input[id="MaeCCod"]').val(),
                    maeddes: $('#frmIndexStock :input[id="MaeDDes"]').val()
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
                    MaeCCod: { type: "string" },
                    MaeDDes: { type: "string" },
                    StpDPed: { type: "string" },
                    StpCPar: { type: "string" },
                    StpNRol: { type: "number" },
                    StpQCan: { type: "number" },
                    AlmDDes: { type: "string" },
                    CliDDes: { type: "string" },
                    StpNApe: { type: "number" },
                    TarCCod: { type: "string" },
                    AlmCCod: { type: "string" },
                    FECHA_INGRESO: { type: "date" },
                    SerialKey: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridStock").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateStock").html()),
        noRecords: {
            template: '<br/> ' +
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
                field: "StpCPar",
                title: "Partida",
                width: 100
            }, {
                field: "StpNApe",
                title: "Año",
                width: 60
            }, {
                field: "StpDPed",
                title: "Nro Pedido",
                width: 80
            }, {
                field: "FECHA_INGRESO",
                format: "{0:dd/MM/yyyy}",
                title: "Fecha Ingreso",
                width: 100
            }, {
                field: "StpQCan",
                title: "Kg",
                width: 70
            }, {
                field: "StpNRol",
                title: "Qty Rollos",
                width: 60
            }, {
                field: "CliDDes",
                title: "Cliente",
                width: 430
            }]
    }).data("kendoGrid");

}

function ActualizarTablaStock() {
    var grid = $('#gridStock').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarCombosIndex() {
    $('#frmIndexStock :input[id="ListaAlmacenes"]').kendoDropDownList({
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

function CargarCalendarioIndex() {
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
    $("#StpNApe").data("kendoDatePicker").value(todayDate);

    //PERMISO DE SOLO LECTURA PARA EL CALENDARIO
    $('#StpNApe').attr('readonly', true);
}