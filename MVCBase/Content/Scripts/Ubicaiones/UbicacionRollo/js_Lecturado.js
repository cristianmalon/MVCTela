$(document).ready(function () {

    $("#LecturadoFailed").hide();
    $("#LecturadoSuccess").hide();

    CargarGridLecturado();

    $('#CODIGO_BARRAS').on('keypress', function (e) {
        if (e.which === 13) {
            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            //Do Stuff, submit, etc..
            var CODIGO_BARRAS = $("#CODIGO_BARRAS").val();
            if (CODIGO_BARRAS != "" && CODIGO_BARRAS != undefined) {

                var existe = false;
                var gridDataArray = $('#frmLecturado').find('#gridLecturado').data('kendoGrid')._data;
                for (var index = 0; index < gridDataArray.length; index++) {
                    var itemgrid = gridDataArray[index]['CODIGO_BARRAS'];
                    if (itemgrid == CODIGO_BARRAS) {
                        existe = true;
                    }
                }

                if (!existe) {
                    var ROLLO = {
                        CODIGO_BARRAS: CODIGO_BARRAS.trim(),
                        EmpCCod: $('#frmLecturado').find('input[id="EmpCCod"]').val(),
                        RolSEstCr: $('#frmLecturado').find('input[id="RolSEstCr"]').val(),
                    }
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/Rollo/ListarLecturado',
                        type: 'POST',
                        data: JSON.stringify({ entidad: ROLLO }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            console.log(data);
                            if (!data.rpta) {
                                LecturadoFailed();
                            }
                            else {
                                LecturadoSuccess();
                                //Populate grid
                                var grid = $("#gridLecturado").data("kendoGrid");
                                grid.dataSource.insert(0, {
                                    CODIGO_BARRAS: CODIGO_BARRAS,
                                    RolNPedTn: data.lista[0].RolNPedTn,
                                    CliDDes: data.lista[0].CliDDes,
                                    NroParte: data.lista[0].NroParte,
                                    AnoParte: data.lista[0].AnoParte,
                                    Empresa: data.lista[0].Empresa,
                                    TipoParte: data.lista[0].TipoParte,
                                    EmpCCod: data.lista[0].EmpCCod,
                                    RolNAno: data.lista[0].RolNAno,
                                    RolNNro: data.lista[0].RolNNro,
                                    RolSEstCr: data.lista[0].RolSEstCr,
                                    MaeDDes: data.lista[0].MaeDDes,
                                    MaeCCod: data.lista[0].MaeCCod,
                                    TarCCod: data.lista[0].TarCCod,
                                    ColDNom: data.lista[0].ColDNom,
                                    RolQKOr: data.lista[0].RolQKOr,
                                    RolCPartd: data.lista[0].RolCPartd,
                                    RolNAPedGe: data.lista[0].RolNAPedGe,
                                    RolNPedGe: data.lista[0].RolNPedGe,
                                    AlmCCod: data.lista[0].AlmCCod,
                                    AlmDDes: data.lista[0].AlmDDes,
                                });
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                }
                else {
                    AlertMessage("EL ROLLO LECTURADO YA SE ENCUENTRA EN LA LISTA");
                }
            }

            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");

            //Set focus property to textbox
            $("#CODIGO_BARRAS").focus();

            //Clean textbox
            $("#CODIGO_BARRAS").val("");
        }
    });

    $("#btnUbicarRollos").click(function () {
        var kilos = 0;
        var UBICACION_ROLLO = [];
        var gridLecturado = $('#frmLecturado').find('#gridLecturado').data('kendoGrid')._data;
        if (gridLecturado.length > 0) {
            var NUMERO_ROLLOS = gridLecturado.length;

            var gridDataArray = $('#frmLecturado').find('#gridLecturado').data('kendoGrid')._data;
            for (var index = 0; index < gridDataArray.length; index++) {
                var kilos = parseFloat(kilos) + parseFloat(gridDataArray[index]['RolQKOr']);
            }

            var url = encodeURI("&TOTAL_KILOS=" + kilos.toFixed(2) + "&NUMERO_ROLLOS=" + NUMERO_ROLLOS);
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
                        var UBICACIONKey = $('#frmUbicarRollosLecturado').find('input[id="UBICACIONKey"]').val().split("|")[0]
                        var UBICACION_ESTADOKey = $('#frmUbicarRollosLecturado').find('select[id="UBICACION_ESTADOKey"]').val()
                        if (UBICACIONKey != "" && UBICACIONKey != undefined) {
                            if (UBICACION_ESTADOKey != "" && UBICACION_ESTADOKey != undefined) {

                                for (var index = 0; index < gridDataArray.length; index++) {
                                    UBICACION_ROLLO[index] = {
                                        UBICACIONKey: $('#frmUbicarRollosLecturado').find('input[id="UBICACIONKey"]').val().split("|")[0],
                                        EMPRESA_CODIGO: gridDataArray[index]['EmpCCod'],
                                        CLIENTE_NOMBRES: gridDataArray[index]['CliDDes'],
                                        PARTIDA_NUMERO: gridDataArray[index]['RolCPartd'],
                                        PEDIDO_NUMERO: gridDataArray[index]['RolNPedTn'],
                                        PEDIDO_AÑO: gridDataArray[index]['RolNAPedGe'],
                                        ALMACEN_CODIGO: gridDataArray[index]['AlmCCod'],
                                        ALMACEN_NOMBRE: gridDataArray[index]['AlmDDes'],
                                        ARTICULO_CODIGO: gridDataArray[index]['MaeCCod'],
                                        ARTICULO_DESCRIPCION: gridDataArray[index]['MaeDDes'],
                                        TIPO_ARTICULO_CODIGO: gridDataArray[index]['TarCCod'],
                                        ROLLO_NUMERO: gridDataArray[index]['RolNNro'],
                                        ROLLO_PESO: gridDataArray[index]['RolQKOr'],
                                        ROLLO_AÑO: gridDataArray[index]['RolNAno'],
                                        COLOR: gridDataArray[index]['ColDNom'],
                                        NUMERO_ROLLOS: NUMERO_ROLLOS,
                                        PARTE_NUMERO: gridDataArray[index]['NroParte'],
                                        PARTE_AÑO: gridDataArray[index]['AnoParte'],
                                        PARTE_EMPRESA: gridDataArray[index]['Empresa'],
                                        PARTE_TIPO: gridDataArray[index]['TipoParte'],
                                        FLG_TIPO: "2",
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
                                        UBICACION_ESTADOKey: $('#frmUbicarRollosLecturado').find('select[id="UBICACION_ESTADOKey"]').val()
                                    }),
                                    beforeSend: function () {
                                        bloquoteObject();
                                    },
                                    success: function (data) {
                                        console.log(data);
                                        if (!data.rpta) {
                                            errorAddModelo("divErrorUbicacionRollos", "ulListaErrorUbicacionRollos", data.errores);
                                        } else {
                                            LimpiarTablaLecturado();
                                            $("#CODIGO_BARRAS").focus();
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
            });

        }
        else {
            AlertMessage("DEBE LECTURAR POR LO MENOS UN ROLLO");
        }

    });

    $("#btnRemoverRollo").click(function () {
        var data = $("#gridLecturado").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            data.dataSource.remove(item);
        }
        else {
            AlertMessage("DEBE SELECCIONAR EL ROLLO QUE DESEA REMOVER");
        }
    });

});

function CargarGridLecturado() {
    $("#gridLecturado").html('');
    var dataSource = new kendo.data.DataSource({
        schema: {
            type: 'json',
            model: {
                fields: {
                    CODIGO_BARRAS: { type: "string" },
                    RolNPedTn: { type: "string" },
                    CliDDes: { type: "string" },
                    NroParte: { type: "number" },
                    AnoParte: { type: "number" },
                    Empresa: { type: "string" },
                    TipoParte: { type: "string" },
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
    });

    var grid = $("#gridLecturado").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: false,
        selectable: true,
        toolbar: kendo.template($("#templateLecturado").html()),
        noRecords: {
            template: 'NO SE TIENE REGISTROS DE ROLLOS'
        },
        columns: [
            {
                field: "CODIGO_BARRAS",
                hidden: true
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

function LimpiarTablaLecturado() {
    $("#gridLecturado").data('kendoGrid').dataSource.data([]);
}

function LecturadoSuccess() {
    $("#LecturadoSuccess").show();
    $("#LecturadoFailed").hide();
}

function LecturadoFailed() {
    $("#LecturadoFailed").show();
    $("#LecturadoSuccess").hide();
}