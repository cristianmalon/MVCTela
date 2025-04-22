$(document).ready(function () {

    $('.filtro').on('keypress', function (e) {
        if (e.which === 13) {
          
            ActualizarTablaAsociacionPedido();
          
        }
    });

    CargarSwitch();
    function onDataBound(arg) {
        var myElem = document.getElementById('trParentHeader');
        if (myElem === null) {
            $("#gridPedidoComercial").find("th.k-header").parent().before(`<tr id='trParentHeader'>
                                                <th colspan='1' class='k-header'><strong></strong></th>                                                
                                                <th colspan='2' style='text-align: center;' class='k-header'><strong>GRUPO</strong></th>
                                                <th colspan='10' class='k-header'><strong></strong></th>
                                                </tr>`);
        }
    }
    $("#gridPedidoComercial").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    type: "POST",
                    url: "/AsociacionPedidosPC/ListarPaginado",
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
                        PageNumber: options.page,//(options.page == 0) ? 0 : (options.page - 1),
                        //PageNumber: 1,
                        pageSize: options.pageSize,
                        EmpCCod: $('#frmIdxAsociacionPedidosPC').find('input[id="EmpCCod"]').val(),
                        OPC_EJECUTIVO: $('#frmIdxAsociacionPedidosPC').find('input[id="txtEjecutivo"]').val(),
                        OPC_CLIENTE: $('#frmIdxAsociacionPedidosPC').find('input[id="txtCliente"]').val(),
                        apc_Estado: $('#frmIdxAsociacionPedidosPC').find('input[id="apc_Estado"]').val(),
                        TipoPedido: $('#frmIdxAsociacionPedidosPC').find('input[id="txtTipoPedido"]').val(),
                        TipoMercado: $('#frmIdxAsociacionPedidosPC').find('input[id="TipoMercado"]').val(),
                        Empaques: $('#frmIdxAsociacionPedidosPC').find('input[id="txtEmpaque"]').val(),
                        Marcas: $('#frmIdxAsociacionPedidosPC').find('input[id="txtMarcas"]').val(),
                        apc_Anio: $('#frmIdxAsociacionPedidosPC').find('input[id="apc_Anio"]').val(),
                        apc_Nro: $('#frmIdxAsociacionPedidosPC').find('input[id="apc_Nro"]').val(),

                        DCPOPCCTipPC: $('#frmIdxAsociacionPedidosPC').find('input[id="DCPOPCCTipPC"]').val(),
                        DCPOPCNAno: $('#frmIdxAsociacionPedidosPC').find('input[id="DCPOPCNAno"]').val(),
                        DCPOPCNNro: $('#frmIdxAsociacionPedidosPC').find('input[id="DCPOPCNNro"]').val(),
                        ReqCotTipPC: $('#frmIdxAsociacionPedidosPC').find('input[id="ReqCotTipPC"]').val(),
                        ReqCotAno: $('#frmIdxAsociacionPedidosPC').find('input[id="ReqCotAno"]').val(),
                        ReqCotNro: $('#frmIdxAsociacionPedidosPC').find('input[id="ReqCotNro"]').val()
                        
                    });
                }
            },
            schema: {
                data: "lista",
                total: "pageSize",
                type: 'json',
                model: {
                    fields: {
                        IdAsociacionPedido: { type: "string" },
                        apc_Anio: { type: "string" },
                        apc_Nro: { type: "string" },
                        apc_FecEmi: { type: "date" },

                        OPC_EJECUTIVO: { type: "string" },
                        TipoMercado: { type: "string" },

                        NOMBRE_ESTADO: { type: "String" },
                        COLOR_ESTADO: { type: "String" },
                        PedidosComercial: { type: "String" },
                        apc_EstadoAprobracion: { type: "String" },
                        OrdenesManufactura: { type: "String" },
                        Clientes: { type: "string" },
                        Marcas: { type: "string" },
                        OPC_EJECUTIVO: { type: "string" },
                        TipoPedido: { type: "string" },
                        Empaques: { type: "string" },
                        TipoMercado: { type: "string" },
                        TotalPage: { type: "string" },
                        SerialKey: { type: "string" }
                    }
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        },
        scrollable: true,
        pageable: true,
        selectable: true,
        dataBound: onDataBound,
        toolbar: kendo.template($("#templateSolicitudActualizacionPC").html()),
        detailInit: CargarTablaPedidoComercialDetalle,
        noRecords: {
            template: '<br /> ' +
                ' <div> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "apc_Anio",
                title: "Año",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 50
            }, {
                field: "apc_Nro",
                title: "Nro",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 70
            },
            {
                field: "NOMBRE_ESTADO",
                title: "Estado de Solicitud",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            },
            {
                field: "apc_FecEmi",
                title: "F. Emision",
                format: "{0: dd/MM/yyyy}",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 80
            },
            {
                field: "PedidosComercial",
                title: "Pedido Comercial",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 150
            },
            {
                field: "OrdenesManufactura",
                title: "Ordenes de Manufactura",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 250
            },
            {
                field: "OPC_EJECUTIVO",
                title: "Ejecutivo",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            },
            {
                field: "Clientes",
                title: "Cliente",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 150
            },
            {
                field: "TipoPedido",
                title: "Tipo Pedido",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 150
            },
            {
                field: "Empaques",
                title: "Empaque",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            },
            {
                field: "Marcas",
                title: "Marca",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            },
            {
                field: "TipoMercado",
                title: "Mercado",
                template: '<div align="center"> #if (TipoMercado == "L") {# <label>Local</label> #} else {# <label>Exportación</label> #}# </div>',
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            }
        ],
        change: function (e) {
            debugger;
            var grd = $("#gridPedidoComercial").data("kendoGrid");
            var item = grd.dataItem(grd.select());
            console.log(item);
            if (item != null) {
                if (item.apc_EstadoAprobracion == 'T') {
                    $("#btnEditarPedidoComercial").attr("disabled", "disabled");
                    $("#btnEliminarAsociacion").attr("disabled", "disabled");
                }
                else {
                    $("#btnEditarPedidoComercial").removeAttr("disabled");
                    $("#btnEliminarAsociacion").removeAttr("disabled");
                }
            }

        },
        //dataBound: GoToPage,
        //page: onPaging
    }).data("kendoGrid");


    $("#btnRegistrarGruposAsociaciones").click(function () {
        bloquoteObject();
        var url = $(this).attr('data-url');
        window.location.href = url;
    });

    $("#btnEditarPedidoComercial").click(function () {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            
            bloquoteObject();
            var url_ = Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey);

            window.location.href = url_;


        }
        else {
            AlertMessage("DEBE SELECCIONAR ASOCIACION DE PEDIDO QUE DESEA EDITAR");
        }


    });

    $("#btnActualizarPedidoComercial").click(function () {
        ActualizarTablaAsociacionPedido();
    });

    $("#btnEliminarAsociacion").click(function () {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            console.log(item);
            window.ConfirmMessage("SEGURO QUE DESEA ELIMINAR LA SIGUIENTE ASOCIACION DE PEDIDO?").then(function () {

                var PEDIDO_COMERCIAL_ESTILO = {
                    IdAsociacionPedido: item.IdAsociacionPedido,
                    TipoMercado: item.TipoMercado,
                    ESTADO: "I"
                }

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/AsociacionPedidosPC/Eliminar',
                    type: 'POST',
                    data: JSON.stringify({ entidad: PEDIDO_COMERCIAL_ESTILO }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        if (!data.rpta) {

                        } else {
                            var grid = $('#gridPedidoComercial').data("kendoGrid");
                            grid.dataSource.read();
                            grid.refresh();
                        }
                        AlertMessage(data.result);
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });

            });
        }
        else {
            AlertMessage("DEBE SELECCIONAR ASOCIACION DE PEDIDO QUE DESEA ELIMINAR");
        }


    });

    $("#btnCerrarGrupo").click(function () {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            if (item.apc_EstadoAprobracion == 'T') {
                AlertMessage('LA ASOCIACIÓN DE PEDIDO SE ENCUENTRA CERRADA');
                return;
            }
            console.log(item);
            window.ConfirmMessage("Desea Usted cerrar el registro del Grupo?").then(function () {

                var DATAGrupo = {
                    IdAsociacionPedido: item.IdAsociacionPedido,
                    TipoMercado: item.TipoMercado,
                    apc_Anio: item.apc_Anio,
                    apc_Nro: item.apc_Nro,
                    ESTADO: "A"
                }

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/AsociacionPedidosPC/CerrarGrupo',
                    type: 'POST',
                    data: JSON.stringify({ entidad: DATAGrupo }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        if (!data.rpta) {
                            AlertMessage(data.result);
                        } else {
                            //var grid = $('#gridPedidoComercial').data("kendoGrid");
                            //grid.dataSource.read();
                            //grid.refresh();
                            var vrParametros = data.parametros;
                            console.log(vrParametros);
                            var mCotizacion = {
                                StrTo: data.parametros[0],
                                StrCopyTo: data.parametros[1],
                                StrSubject: data.parametros[2],
                                StrBody: data.parametros[3]
                            };
                            vrRuta = Enrutamiento("../EmailPCP/EnviarPCP", 'strData=' + encodeURIComponent(JSON.stringify(mCotizacion)));
                             BootstrapDialog.show({
                                title: 'Envió Email',
                                cssClass: 'size-wide-dialog-1000',
                                closable: false,
                                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
                                buttons: [
                                    {
                                        label: 'Cerrar',
                                        action: function (dialog) {
                                            AlertMessage('Se ha realizado el envió del cierre de la Asociacion de Pedido');
                                            dialog.close();
                                        }
                                    },
                                    {
                                        label: 'Aceptar',
                                        action: function (dialog) {
                                            var vrcuerpo = $("#frmEnvioEmail").find("textarea[id='strStrBody']").val();
                                            var vrDestinatarios = $("#frmEnvioEmail").find("textarea[id='txtStrTo']").val();

                                            if ($.trim(vrDestinatarios).length == 0) {
                                                AlertMessage('Debe de ingresar al menos un destinatario');
                                                return;
                                            } else {

                                                var arr = vrDestinatarios.split(';');

                                                for (var i = 0; i < arr.length; i++) {
                                                    if ($.trim(arr[i]).length == 0) {
                                                        AlertMessage('Debe de ingresar al menos un destinatario');
                                                        break;
                                                        return;
                                                    }
                                                }
                                            }
                                            if ($.trim(vrcuerpo).length == 0) {
                                                AlertMessage('Debe de ingresar el Contenido del Mensaje');
                                                return;
                                            }
                                            var mCotizacion = {
                                                StrFrom: $("#frmEnvioEmail :input[id='txtStrFrom']").val(),
                                                StrTo: $("#frmEnvioEmail").find("textarea[id='txtStrTo']").val(),
                                                StrCopyTo: $("#frmEnvioEmail").find("textarea[id='strStrCopyTo']").val(),
                                                StrSubject: $("#frmEnvioEmail :input[id='txtStrSubject']").val(),
                                                StrBody: $("#frmEnvioEmail").find("textarea[id='strStrBody']").val(),
                                            };

                                            $.ajax({
                                                datatype: 'json',
                                                contentType: "application/json",
                                                url: '/EmailPCP/EnviarEmailAsociacion',
                                                type: 'POST',
                                                data: JSON.stringify(mCotizacion),
                                                beforeSend: function () { },
                                                success: function (data) {
                                                    if (!data.rpta) {
                                                        AlertMessage(data.result);
                                                        console.log("error :" + data.result);
                                                        return;
                                                    }
                                                    AlertMessage(data.result);
                                                    ActualizarTablaAsociacionPedido();
                                                    console.log("ok :" + data.result);
                                                    dialog.close();
                                                }
                                            }).fail(function (jqxhr, textStatus, error) {
                                                console.log("Request Failed: " + error);
                                                dialog.close();
                                            });
                                        },
                                        error: function (e) {
                                            console.log("Error eviar Mail: [ " + e + " ]")
                                        }
                                    }
                                ]
                            });
                        }
                       // AlertMessage(data.result);
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });

            });
        }
        else {
            AlertMessage("DEBE SELECCIONAR ASOCIACION DE PEDIDO QUE DESEA PROCESAR");
        }


    });
    $("#btnAuditoria").click(function () {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            var DATAGrupo = {
                IdAsociacionPedido: item.IdAsociacionPedido,
                apc_Anio: item.apc_Anio,
                apc_Nro: item.apc_Nro,
                ESTADO: "A"
            }
            
            
            vrRuta = Enrutamiento("../AsociacionPedidosPC/Auditoria", 'strData=' + encodeURIComponent(JSON.stringify(DATAGrupo)));
            BootstrapDialog.show({
                title: 'Auditoria ' + item.apc_Anio + '-' + item.apc_Nro ,
                cssClass: 'size-wide-dialog-1000',
                closable: false,
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
                buttons: [
                    {
                        label: 'Aceptar',
                         action: function (dialog) {
                            dialog.close();
                        }
                    }
                ]
            });
        }
        else {
            AlertMessage("DEBE SELECCIONAR ASOCIACION DE PEDIDO QUE DESEA AUDITAR");
        }


    });

    $("#btnConsultar").click(function () {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            var parametros = "key=" + item.SerialKey + "&Tip=C";
            bloquoteObject();
            var url_ = Enrutamiento($(this).attr('data-url'), parametros);

            window.location.href = url_;


        }
        else {
            AlertMessage("DEBE SELECCIONAR ASOCIACION DE PEDIDO QUE DESEA EDITAR");
        }


    });

    function CargarTablaPedidoComercialDetalle(e) {
        $("<div id='gridComercialDetalle'><div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
                transport: {
                    read: {
                        type: "POST",
                        url: "/AsociacionPedidosPC/ListarPaginadoDetalle",
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
                            PageNumber: options.page, //(options.page == 0) ? 0 : (options.page - 1),
                            pageSize: options.pageSize,
                            IdAsociacionPedido: e.data.IdAsociacionPedido,
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
                            DCPOPCCTipPC: { type: "string" },
                            DCPOPCNAno: { type: "string" },
                            DCPOPCNNro: { type: "string" },
                            DCPOPCNItemDsp: { type: "string" },
                            DCPOPCNItemRC: { type: "string" },
                            OPCNItemD: { type: "string" },
                            OrdenManuAno: { type: "string" },
                            OrdenManuNro: { type: "string" },
                            ReqCotAno: { type: "string" },
                            ReqCotNro: { type: "string" },
                            ReqCotVer: { type: "string" },
                            DCPNPOCli: { type: "string" },
                            DOCDDes: { type: "string" },
                            TipoPedido: { type: "string" },
                            wDCPOPCNEMQNCOD: { type: "string" },
                            DCPOPCNPorDspI: { type: "number" },
                            DCPOPCNPorDspF: { type: "number" },
                            DCPOPCFReqAPT: { type: "date" },
                            DCPOPCFReqExFty: { type: "date" },
                            Estilo: { type: "string" },
                            Cliente: { type: "string" },
                            Marca: { type: "string" },
                            Estado: { type: "string" }
                        }
                    }
                },
                pageSize: 1000,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            scrollable: true,
            pageable: false,
            selectable: true,
            noRecords: {
                template: '</br> NO SE ENCONTRARON REGISTROS </br>'
            },
            columns: [
                {
                    title: "<div align='center'><b> Detalle de Ord. Manuf / DCPOs por Grupo </b></div>",
                    columns: [{
                        title: "<div align='center'> PEDIDO COMERIAL </div>",
                        columns: [
                            {
                                field: "DCPOPCCTipPC",
                                title: "Tipo",
                                width: 60,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            },
                            {
                                field: "DCPOPCNAno",
                                title: "Año",
                                width: 60,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            },
                            {
                                field: "DCPOPCNNro",
                                title: "Nro.",
                                width: 60,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            },
                            {
                                field: "DCPOPCNItemDsp",
                                title: "Item",
                                width: 60,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }
                        ]
                    }, {
                        title: "<div align='center'> ORDEN MANUFACTURA </div>",
                            columns: [
                                {
                                    field: "DCPOPCCTipPC",
                                    title: "Tipo",
                                    width: 60,
                                    attributes: {
                                        style: "color: black; background-color: #= COLOR_ESTADO #"
                                    }
                                },{
                                    field: "OrdenManuAno",
                                    title: "aÑO",
                                    width: 60,
                                    attributes: {
                                        style: "color: black; background-color: #= COLOR_ESTADO #"
                                    }
                                }, {
                                    field: "OrdenManuNro",
                                    title: "Nro.",
                                    width: 80,
                                    attributes: {
                                        style: "color: black; background-color: #= COLOR_ESTADO #"
                                  }
                        }]
                    }, {
                        title: "<div align='center'> SD COTIZACION </div>",
                        columns: [{
                            field: "ReqCotAno",
                            title: "Año",
                            width: 60,
                            attributes: {
                                style: "color: black; background-color: #= COLOR_ESTADO #"
                            }
                        }, {
                                field: "ReqCotNro",
                            title: "Nro.",
                                width: 50,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "ReqCotVer",
                                title: "Ver",
                                width: 50,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }]
                    }, {
                        title: "<div align='center'> DCPOs </div>",
                        columns: [{
                            field: "OPCNItemD",
                            title: "Item",
                            width: 60,
                            attributes: {
                                style: "color: black; background-color: #= COLOR_ESTADO #"
                            }
                        }, {
                                field: "DCPOPCNAno",
                            title: "Año",
                                width: 100,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "DCPNPOCli",
                                title: "PO Cliente",
                                width: 100,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }
                            , {
                                field: "DOCDDes",
                                title: "Destino",
                                width: 100,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "TipoPedido",
                                title: "T. Pedido",
                                width: 100,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "wDCPOPCNEMQNCOD",
                                title: "Empaque",
                                width: 100,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "DCPOPCNPorDspI",
                                title: "% Desp (-)",
                                width: 70,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "DCPOPCNPorDspF",
                                title: "% Desp (+)",
                                width: 70,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "DCPOPCFReqAPT",
                                title: "F.APT",
                                format: "{0: dd/MM/yyyy}",
                                width: 120,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "DCPOPCFReqExFty",
                                title: "F.Exp.Factory",
                                format: "{0: dd/MM/yyyy}",
                                width: 120,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }
                            , {
                                field: "Estilo",
                                title: "Estilo Camtex",
                                width: 120,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "Cliente",
                                title: "cliente",
                                width: 120,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }, {
                                field: "Marca",
                                title: "Marca",
                                width: 120,
                                attributes: {
                                    style: "color: black; background-color: #= COLOR_ESTADO #"
                                }
                            }]
                    }]
                }

            ]
        }).data("kendoGrid");
    };
    function CargarSwitch() {
        $("#chkEstadoAnulado").kendoSwitch({
            checked: false,
            messages: {
                checked: "Si",
                unchecked: "No"
            },
            change: function (e) {
                if (e.checked) {
                    $("#apc_Estado").val("I");
                } else {
                    $("#apc_Estado").val("A");
                }
                ActualizarTablaAsociacionPedido();
            }
        });

        $("#chkEstadoTipoMercado").kendoSwitch({
            checked: true,
            messages: {
                checked: "EX",
                unchecked: "LO"
            },
            change: function (e) {
                if (e.checked) {
                    $("#TipoMercado").val("E");
                } else {
                    $("#TipoMercado").val("L");
                }
                ActualizarTablaAsociacionPedido();
            }
        });

    }

    function ActualizarTablaAsociacionPedido() {
        var grid = $('#gridPedidoComercial').data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    }
})

