$(document).ready(function () {

    CargarGridRollos();

    $("#btnRegresar").click(function () {
        bloquoteObject();
        var url = $(this).attr('data-url');
        window.location.href = url;
    });

    $("#btnUbicarPartida").click(function () {
        var kilos = 0;
        var objArray = [];
        var UBICACION_ROLLO = [];
        var gridRollos = $('#frmIndexRollo').find('#gridRollo').data('kendoGrid')._data;
        if (gridRollos.length > 0) {
            var allSelected = $("#gridRollo tr.k-state-selected");
            if (allSelected.length > 0) {
                $.each(allSelected, function (e) {
                    var row = $(this);
                    var grid = row.closest(".k-grid").data("kendoGrid");
                    var dataItem = grid.dataItem(row);
                    objArray.push(dataItem);
                    kilos = parseFloat(kilos) + parseFloat(dataItem.RolQKOr);
                });
                var url = encodeURI("PEDIDO_NUMERO=" + $('#frmIndexRollo').find('input[id="NumeroPedido"]').val() +
                    "&PARTIDA_NUMERO=" + $('#frmIndexRollo').find('input[id="RolCPartd"]').val() +
                    "&ARTICULO_CODIGO=" + $('#frmIndexRollo').find('input[id="MaeCCod"]').val() +
                    "&ARTICULO_DESCRIPCION=" + $('#frmIndexRollo').find('input[id="MaeDDes"]').val() +
                    "&TOTAL_KILOS=" + kilos.toFixed(2) +
                    "&NUMERO_ROLLOS=" + allSelected.length);
                BootstrapDialog.show({
                    title: 'REGISTRAR UBICACION',
                    message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), url)),
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }, {
                        label: 'Registrar',
                        icon: 'glyphicon glyphicon-save',
                        action: function (dialog) {
                            var UBICACIONKey = $('#frmUbicarRollo').find('input[id="UBICACIONKey"]').val().split("|")[0]
                            var UBICACION_ESTADOKey = $('#frmUbicarRollo').find('select[id="UBICACION_ESTADOKey"]').val()
                            if (UBICACIONKey != "" && UBICACIONKey != undefined) {
                                if (UBICACION_ESTADOKey != "" && UBICACION_ESTADOKey != undefined) {
                                    for (var index = 0; index < allSelected.length; index++) {
                                        UBICACION_ROLLO[index] = {
                                            UBICACIONKey: $('#frmUbicarRollo').find('input[id="UBICACIONKey"]').val().split("|")[0],
                                            EMPRESA_CODIGO: objArray[index]["EmpCCod"],
                                            CLIENTE_NOMBRES: $('#frmIndexRollo').find('input[id="Cliente"]').val(),
                                            PARTIDA_NUMERO: objArray[index]["RolCPartd"],
                                            PEDIDO_NUMERO: $('#frmIndexRollo').find('input[id="NumeroPedido"]').val(),
                                            PEDIDO_AÑO: objArray[index]["RolNAPedGe"],
                                            ALMACEN_CODIGO: objArray[index]["AlmCCod"],
                                            ALMACEN_NOMBRE: $('#frmIndexRollo').find('input[id="NombreAlmacen"]').val(),
                                            ARTICULO_CODIGO: objArray[index]["MaeCCod"],
                                            ARTICULO_DESCRIPCION: objArray[index]["MaeDDes"],
                                            TIPO_ARTICULO_CODIGO: objArray[index]["TarCCod"],
                                            ROLLO_NUMERO: objArray[index]["RolNNro"],
                                            ROLLO_PESO: objArray[index]["RolQKOr"],
                                            ROLLO_AÑO: objArray[index]["RolNAno"],
                                            COLOR: objArray[index]["ColDNom"],
                                            FECHA_INGRESO: $('#frmIndexRollo').find('input[id="FECHA_INGRESO"]').val(),
                                            NUMERO_ROLLOS: allSelected.length,
                                            FLG_TIPO: "1",
                                            FLG_ALMACEN: true,
                                            ESTADO: "A"
                                        }
                                    }
                                    $.ajax({
                                        datatype: 'json',
                                        contentType: "application/json",
                                        url: '/UbicacionRollo/Actualizar',
                                        type: 'POST',
                                        data: JSON.stringify({
                                            _entidad: UBICACION_ROLLO,
                                            entidad: null,
                                            UBICACION_ESTADOKey: $('#frmUbicarRollo').find('select[id="UBICACION_ESTADOKey"]').val()
                                        }),
                                        beforeSend: function () {
                                            bloquoteObject();
                                        },
                                        success: function (data) {
                                            console.log(data);
                                            if (!data.rpta) {
                                                errorAddModelo("divErrorUbicacionRollos", "ulListaErrorUbicacionRollos", data.errores);
                                            } else {
                                                ActualizarTablaRollo();
                                                dialog.close();
                                            }
                                            AlertMessage(data.result);
                                            desbloqObject();
                                        }
                                    }).fail(function (jqxhr, textStatus, error) {
                                        var err = textStatus + ', ' + error;
                                        console.log("Request Failed: " + err);
                                        desbloqObject();
                                    });
                                }
                                else {
                                    AlertMessage("DEBE SELECCIONAR EL ESTADO DE LA UBICACION");
                                }
                            }
                            else {
                                AlertMessage("DEBE SELECCIONAR UNA UBICACION")
                            }
                        }
                    }]
                }).setSize(BootstrapDialog.SIZE_WIDE);
            }
            else {
                AlertMessage("DEBE SELECCIONAR POR LO MENOS UN ROLLO DE LA LISTA")
            }
        }
        else {
            AlertMessage("NO SE ENCONTRARON ROLLOS PARA LA PARTIDA SELECCIONADA");
        }

    });

});

function CargarGridRollos() {
    $("#gridRollo").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Rollo/ListarPaginado",
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
                    EmpCCod: $('#frmIndexRollo :input[id="EmpCCod"]').val(),
                    RolSEstCr: $('#frmIndexRollo :input[id="RolSEstCr"]').val(),
                    RolCPartd: $('#frmIndexRollo :input[id="RolCPartd"]').val()
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
                    RolNAno: { type: "string" },
                    RolNNro: { type: "string" },
                    RolSEstCr: { type: "string" },
                    MaeDDes: { type: "string" },
                    MaeCCod: { type: "string" },
                    TarCCod: { type: "string" },
                    ColDNom: { type: "string" },
                    RolQKOr: { type: "string" },
                    RolCPartd: { type: "string" },
                    RolNAPedGe: { type: "string" },
                    RolNPedGe: { type: "string" },
                    AlmCCod: { type: "string" },
                    AlmDDes: { type: "string" },
                    EmpCCod: { type: "string" },
                    RolSEstCr: { type: "string" }
                }
            }
        },
        pageSize: 1000,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridRollo").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: false,
        selectable: false,
        persistSelection: true,
        toolbar: kendo.template($("#templateRollo").html()),
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE ROLLOS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns:
            [{
                selectable: true, width: "50px"
            }, {
                field: "RolNAno",
                title: "Año",
                width: 100
            }, {
                field: "RolNNro",
                title: "Nro",
                width: 100
            }, {
                field: "MaeDDes",
                title: "Articulo",
                width: 500
            }, {
                field: "ColDNom",
                title: "Color",
                width: 200
            }, {
                field: "RolQKOr",
                title: "Peso",
                width: 100
            }]
    }).data("kendoGrid");

}


function ActualizarTablaRollo() {
    var grid = $('#gridRollo').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}
