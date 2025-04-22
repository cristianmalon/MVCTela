$(document).ready(function () {

    CargarGridUbicacionMovimiento();

    $("#btnReubicarOrigen").click(function () {
        var PABELLONKey = $('#frmIndexUbicacionMovimiento').find('input[id="PABELLON_DESCRIPCION"]').val();
        var UBICACION_ORIGENKey = $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ORIGENKey"]').val().split("|")[0];
        var UBICACION_ESTADOKey_ORIGEN = $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ESTADOKey_ORIGEN"]').val();
        var url = encodeURI("PABELLONKey=" + PABELLONKey + "&UBICACION_ORIGENKey=" + UBICACION_ORIGENKey + "&UBICACION_ESTADOKey_ORIGEN=" + UBICACION_ESTADOKey_ORIGEN);
        BootstrapDialog.show({
            title: 'SELECCIONAR ORIGEN',
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
                    var UBICACIONKey = $('#frmReubicarOrigen').find('input[id="UBICACIONKey"]').val();
                    if (UBICACIONKey != "" && UBICACIONKey != undefined) {

                        var UBICACION_ESTADOKey_ORIGEN = $('#frmReubicarOrigen').find('select[id="UBICACION_ESTADOKey_ORIGEN"]').val();
                        var PABELLON = $('#frmReubicarOrigen').find('input[id="PABELLON"]').val();

                        if (UBICACION_ESTADOKey_ORIGEN != "" && UBICACION_ESTADOKey_ORIGEN != undefined) {

                            var ESTADO_ACTUAL_ORIGEN = $('#frmReubicarOrigen').find('select[id="UBICACION_ESTADOKey_ORIGEN"]').data("kendoDropDownList").text();

                            if (ESTADO_ACTUAL_ORIGEN == "COMPLETO") {
                                AlertMessage("EL ORIGEN NO PUEDE QUEDAR COMO COMPLETO");
                            }
                            else {
                                var UBICACION_ORIGEN = $('#frmReubicarOrigen').find('input[id="UBICACIONKey"]').data("kendoDropDownList").text();
                                $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ORIGEN"]').val(UBICACION_ORIGEN);
                                $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ORIGENKey"]').val(UBICACIONKey);
                                $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ESTADOKey_ORIGEN"]').val(UBICACION_ESTADOKey_ORIGEN);
                                $('#frmIndexUbicacionMovimiento').find('input[id="PABELLON_DESCRIPCION"]').val(PABELLON);
                                CargarGridUbicacionMovimiento();
                                dialog.close();
                            }
                        }
                        else {
                            AlertMessage("DEBE SELECCIONAR EL ESTADO ACTUAL DE LA UBICACION ORIGEN");
                        }
                    }
                    else {
                        AlertMessage("DEBE SELECCIONAR UNA UBICACION");
                    }
                }
            }]
        });
    });

    $("#btnReubicarDestino").click(function () {
        var objArray = [];
        var UBICACION_MOVIMIENTO = [];
        var gridUbicacionMovimiento = $('#frmIndexUbicacionMovimiento').find('#gridUbicacionMovimiento').data('kendoGrid')._data;
        if (gridUbicacionMovimiento.length > 0) {
            var allSelected = $("#gridUbicacionMovimiento tr.k-state-selected");
            if (allSelected.length > 0) {
                $.each(allSelected, function (e) {
                    var row = $(this);
                    var grid = row.closest(".k-grid").data("kendoGrid");
                    var dataItem = grid.dataItem(row);
                    objArray.push(dataItem);
                });
                var UBICACION_ORIGEN = $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ORIGEN"]').val();
                var UBICACION_ORIGENKey = $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ORIGENKey"]').val().trim("|")[0];
                if (UBICACION_ORIGEN != "" && UBICACION_ORIGEN != undefined && UBICACION_ORIGENKey != "" && UBICACION_ORIGENKey != undefined) {
                    var url = encodeURI("UBICACION_ORIGEN=" + UBICACION_ORIGEN + "&UBICACION_ORIGENKey=" + UBICACION_ORIGENKey);
                    BootstrapDialog.show({
                        title: 'REGISTRAR DESTINO',
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

                                var UBICACIONKey = $('#frmReubicarDestino').find('input[id="UBICACIONKey"]').val();

                                if (UBICACIONKey != "" && UBICACIONKey != undefined) {

                                    var ESTADO_ACTUAL_DESTINO = $('#frmReubicarDestino').find('select[id="UBICACION_ESTADOKey_DESTINO"]').data("kendoDropDownList").text();

                                    if (ESTADO_ACTUAL_DESTINO == "DISPONIBLE") {
                                        AlertMessage("EL ESTADO ACTUAL DEL DESTINO NO PUEDE QUEDAR EN ESTADO DISPONIBLE");
                                    }
                                    else {
                                        var UBICACION_ORIGENKey = $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ORIGENKey"]').val();
                                        var UBICACION_DESTINOKey = $('#frmReubicarDestino').find('input[id="UBICACIONKey"]').val();

                                        for (var index = 0; index < allSelected.length; index++) {
                                            UBICACION_MOVIMIENTO[index] = {
                                                UBICACION_ROLLOKey: objArray[index]["SerialKey"],
                                                UBICACION_ORIGENKey: UBICACION_ORIGENKey.split("|")[0],
                                                UBICACION_DESTINOKey: UBICACION_DESTINOKey.split("|")[0],
                                                ESTADO: "A"
                                            }
                                        }
                                        $.ajax({
                                            datatype: 'json',
                                            contentType: "application/json",
                                            url: '/UbicacionMovimiento/Actualizar',
                                            type: 'POST',
                                            data: JSON.stringify({
                                                _entidad: UBICACION_MOVIMIENTO,
                                                entidad: null,
                                                UBICACION_ESTADOKey_ORIGEN: $('#frmIndexUbicacionMovimiento').find('input[id="UBICACION_ESTADOKey_ORIGEN"]').val(),
                                                UBICACION_ESTADOKey_DESTINO: $('#frmReubicarDestino').find('select[id="UBICACION_ESTADOKey_DESTINO"]').val()
                                            }),
                                            beforeSend: function () {
                                                bloquoteObject();
                                            },
                                            success: function (data) {
                                                console.log(data);
                                                if (!data.rpta) {
                                                    errorAddModelo("divErrorReubicarDestino", "ulListaErrorReubicarDestino", data.errores);
                                                } else {
                                                    ActualizarTablaUbicacionMovimiento();
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
                                }
                                else {
                                    AlertMessage("DEBE SELECCIONAR UNA UBICACION");
                                }

                            }
                        }]
                    });
                }

            }
            else {
                AlertMessage("DEBE SELECCIONAR POR LO MENOS UN ROLLO")
            }
        }
        else {
            AlertMessage("DEBE SELECCIONAR POR LO MENOS UN ROLLO")
        }



    });

});

function CargarGridUbicacionMovimiento() {
    var dataSource = null;
    var UBICACIONKey = $('#frmReubicarOrigen :input[id="UBICACIONKey"]').val();

    if (UBICACIONKey != null && UBICACIONKey != undefined) {
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    type: "POST",
                    url: "/UbicacionRollo/ListarPaginado",
                    contentType: "application/json",
                    dataType: 'json'
                },
                parameterMap: function (options, operation) {
                    return JSON.stringify({
                        PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        UBICACIONKey: UBICACIONKey.split("|")[0],
                        FLG_ALMACEN: 1,
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
                        EMPRESA_CODIGO: { type: "string" },
                        CLIENTE_NOMBRES: { type: "string" },
                        PARTIDA_NUMERO: { type: "string" },
                        PEDIDO_NUMERO: { type: "string" },
                        PEDIDO_AÑO: { type: "string" },
                        ALMACEN_CODIGO: { type: "string" },
                        ALMACEN_NOMBRE: { type: "string" },
                        ARTICULO_CODIGO: { type: "string" },
                        ARTICULO_DESCRIPCION: { type: "string" },
                        TIPO_ARTICULO_CODIGO: { type: "string" },
                        ROLLO_NUMERO: { type: "string" },
                        ROLLO_PESO: { type: "string" },
                        ROLLO_AÑO: { type: "string" },
                        NUMERO_ROLLOS: { type: "string" },
                        COLOR: { type: "string" },
                        FLG_TIPO: { type: "string" },
                        FLG_ALMACEN: { type: "string" },
                        PARTE_NUMERO: { type: "string" },
                        PARTE_AÑO: { type: "string" },
                        PARTE_EMPRESA: { type: "string" },
                        PARTE_TIPO: { type: "string" },
                        UBICACIONKey: { type: "string" },
                        CABECERAKey: { type: "string" },
                        TOTAL_KILOS: { type: "string" },
                        UBICACION_DESC: { type: "string" },
                        PABELLON: { type: "string" },
                        SerialKey: { type: "string" }
                    }
                }
            },
            pageSize: 1000,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        });

    }

    var grid = $("#gridUbicacionMovimiento").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        pageable: false,
        selectable: false,
        toolbar: kendo.template($("#templateUbicacionMovimiento").html()),
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                selectable: true, width: "40px"
            }, {
                field: "UBICACION_DESC",
                title: "Ubicacion",
                width: 60
            }, {
                field: "ROLLO_AÑO",
                title: "Año",
                width: 50
            }, {
                field: "ROLLO_NUMERO",
                title: "Rollo",
                width: 70
            }, {
                field: "ROLLO_PESO",
                title: "Peso",
                width: 50
            }, {
                field: "PARTIDA_NUMERO",
                title: "Partida",
                width: 80
            }, {
                field: "PEDIDO_AÑO",
                title: "Año",
                width: 50
            }, {
                field: "PEDIDO_NUMERO",
                title: "Pedido",
                width: 60
            }, {
                field: "ARTICULO_CODIGO",
                title: "Coigo",
                width: 130
            }, {
                field: "ARTICULO_DESCRIPCION",
                title: "Descripcion Tela",
                width: 220
            }, {
                field: "CLIENTE_NOMBRES",
                title: "Cliente",
                width: 210
            }]
    }).data("kendoGrid");

}

function ActualizarTablaUbicacionMovimiento() {
    var grid = $('#gridUbicacionMovimiento').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}
