$(document).ready(function () {
    cargarGridAsignaInspectorPA();
    //cargarGridInspectores("");

    });

$("#btnBuscarAsigInspector").click(function () { cargarGridAsignaInspectorPA(); });

$("#btnBuscarInspectores").click(function () { cargarGridInspectores(); });

function cargarGridAsignaInspectorPA() {
    $("#gridAsignaInspectorPA").html('');

    $.ajax({
        datatype: 'json',
        url: '/AsignaInspectorPA/ListarAsigInspector',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ objtxtRazonSocial: $('#txtRazonSocial').val(), objtxtMatricula: $('#txtMatricula').val(), objtxtSerie: $('#txtSerie').val(), objfiltro_Tipo_Aeronave: $('#filtro_Tipo_Aeronave').val(), objfiltro_Tipo_Servicio: $('#filtro_Tipo_Servicio').val(), objfiltro_Estado_Asignacion: $('#filtro_Estado_Asignacion').val() }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            //console.log(JsonResponse);

            var dataSource = new kendo.data.DataSource({
                batch: true,
                pageSize: 20,
                data: JsonResponse.l_GENM_ASIGINSPECTPA,
                schema: {
                    model: {
                        id: "XAERONAVE_PA_BANDEJA",
                        fields: {
                            XAERONAVE_PA_BANDEJA: { editable: false, nullable: true }
                        }
                    }
                }
            });


            var grid = $("#gridAsignaInspectorPA").kendoGrid({

                dataSource: dataSource,
                pageable: true,
                dataBound: onDataBound,
                //height: 300,
                columns: [
                    {
                        title: "MARCAR",
                        width: 80,
                        template: "<input type='checkbox' class='checkbox' />"
                    },
                    {
                        field: "XAERONAVE_PA_BANDEJA",
                        width: 90,
                        title: "ID_AEROPABAN",
                        hidden: true
                    }, {
                        field: "XBANDEJA",
                        width: 90,
                        title: "ID_BANDEJA",
                        hidden: true
                    }, {
                        field: "XAERONAVE_PA",
                        width: 90,
                        title: "ID_AERONAVE_PA",
                        hidden: true
                    }, {
                        field: "DESCRIPCION",
                        title: "DESCRIPCION",
                        flex: 1,
                        hidden: true
                    }, {
                        field: "XRAZONSOCIAL",
                        title: "RAZON SOCIAL",
                        flex: 1
                    }, {
                        field: "MATRICULA",
                        title: "MATRICULA",
                        flex: 1
                    }, {
                        field: "NUMERO_SERIE",
                        title: "SERIE",
                        flex: 1
                    }, {
                        field: "XCATEGORIAAERONAVE",
                        title: "CATEGORIA AERONAVE",
                        flex: 1
                    }, {
                        field: "FLG_RECEPCIONADO",
                        width: 90,
                        title: "ESTADO"
                    }]
            }).data("kendoGrid");

            //bind click event to the checkbox
            grid.table.on("click", ".checkbox", selectRow);


        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });

}

function cargarGridInspectores() {
    $("#gridInspectores").html('');

    $.ajax({
        datatype: 'json',
        url: '/AsignaInspectorPA/ListarInspectores',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ objtxtNombres: $('#txtNombres').val(), objtxtApePaterno: $('#txtApePaterno').val(), objtxtApeMaterno: $('#txtApeMaterno').val(), objtxtNro: $('#txtNro').val() }),
        beforeSend: function () {
        },
        success: function (JsonResponse) {
            //console.log(JsonResponse);

            var dataSource = new kendo.data.DataSource({
                batch: true,
                pageSize: 20,
                data: JsonResponse.l_GENM_INSPECTORES/*,
                    schema: {
                        model: {
                            id: "XBANDEJA",
                            fields: {
                                XBANDEJA: { editable: false, nullable: true }
                            }
                        }
                    }*/
            });


            var grid = $("#gridInspectores").kendoGrid({

                dataSource: dataSource,
                pageable: true,
                selectable: "multiple",
                //dataBound: onDataBound,
                //height: 300,
                columns: [
                    /*{
                        title: "MARCAR",
                        width: 80,
                        template: "<input type='checkbox' class='checkbox' />"
                    },*/ {
                            field: "XIDINSPECTOR",                       
                            hidden: false
                        }, {
                            field: "XNOMBRES",
                            hidden: false
                        }, {
                            field: "XPATERNO",
                            hidden: false
                        }, {
                            field: "XMATERNO",
                            hidden: false
                        }, {
                            field: "XNOMBRECOMPLETO",
                            title: "APELLIDOS/NOMBRES",
                            flex: 1
                        }, {
                            field: "XNUMERODOC",
                            flex: 1,
                            title: "N° DOCUMENTO"
                        }, {
                            field: "XDESCOORDINACION",
                            flex: 1,
                            title: "UBICACION"
                        }]
            }).data("kendoGrid");

            //bind click event to the checkbox btnInspectores
            //grid.table.on("click", ".checkbox", selectRow);


        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });

}

var checkedIds = {};

//on click of the checkbox:
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#gridAsignaInspectorPA").data("kendoGrid"),
    dataItem = grid.dataItem(row);


    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
        checkedIds[dataItem.id] = { "IDAEROPABAN": dataItem.XAERONAVE_PA_BANDEJA, "IDBANDEJA": dataItem.XBANDEJA, "IDAERONAVEPA": dataItem.XAERONAVE_PA };

    } else {
        //-remove selection
        delete checkedIds[dataItem.id];
        row.removeClass("k-state-selected");
    }
}

//on dataBound event restore previous selected rows:
function onDataBound(e) {
    var view = this.dataSource.view();
    for (var i = 0; i < view.length; i++) {
        if (checkedIds[view[i].id]) {
            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
            .addClass("k-state-selected")
            .find(".checkbox")
            .attr("checked", "checked");
        }
    }
}

