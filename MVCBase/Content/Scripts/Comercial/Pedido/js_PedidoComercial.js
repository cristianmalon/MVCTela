$(document).ready(function () {
    sessionStorage.setItem("lastPedidoComercialFlag", 0);
    console.log('lastPageIni')
    console.log(sessionStorage.getItem("lastPedidoComercialFlag"))
    CargarCombosIndex();
    CargarSpinners();
    CargarSwitch();

    $('#OPCNAno').on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaPedidoComercial();
            $(this).removeAttr("disabled");
            $(this).data("kendoNumericTextBox").focus();
        }
    });

    $('#OPCNNro').on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaPedidoComercial();
            $(this).removeAttr("disabled");
            $(this).focus();
        }
    });

    $('#OPC_EJECUTIVO').on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaPedidoComercial();
            $(this).removeAttr("disabled");
            $(this).focus();
        }
    });

    $('#OPC_CLIENTE').on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaPedidoComercial();
            $(this).removeAttr("disabled");
            $(this).focus();
        }
    });

    $('#OPC_MARCAS').on('keypress', function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            ActualizarTablaPedidoComercial();
            $(this).removeAttr("disabled");
            $(this).focus();
        }
    });

    //CARGAR GRID PADRE
    $("#gridPedidoComercial").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    type: "POST",
                    url: "/PedidoComercial/ListarPaginado",
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
                        EmpCCod: $('#frmIndexPedidoComercial').find('input[id="EmpCCod"]').val(),
                        OPCCTipPC: $('#frmIndexPedidoComercial').find('input[id="OPCCTipPC"]').val(),
                        //OPCSAnu: $("#frmIndexPedidoComercial").find("input:checkbox[id='chkEstadoAnulado']").is(':checked') ? 'S' : 'N',
                        TipoMercado: $('#frmIndexPedidoComercial').find('input[id="TipoMercado"]').val(),
                        OPCSAnu: $('#frmIndexPedidoComercial').find('input[id="OPCSAnu"]').val(),
                        OPCNAno: $('#frmIndexPedidoComercial').find('input[id="OPCNAno"]').val(),
                        OPCSEst: $('#frmIndexPedidoComercial').find('select[id="OPCSEst"]').val(),
                        OPCNNro: $('#frmIndexPedidoComercial').find('input[id="OPCNNro"]').val(),
                        OPC_EJECUTIVO: $('#frmIndexPedidoComercial').find('input[id="OPC_EJECUTIVO"]').val(),
                        OPC_CLIENTE: $('#frmIndexPedidoComercial').find('input[id="OPC_CLIENTE"]').val(),
                        OPC_MARCAS: $('#frmIndexPedidoComercial').find('input[id="OPC_MARCAS"]').val()
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
                        OPCCTipPC: { type: "string" },
                        OPCNAno: { type: "number" },
                        OPCNNro: { type: "String" },
                        OPC_CODIGO_COLOR: { type: "boolean" },
                        OPC_EJECUTIVO: { type: "string" },
                        OPC_FECHA_EMISION: { type: "date" },
                        OPCFecPed: { type: "date" },
                        OPCCliCCod: { type: "string" },
                        OPC_FECHA_APT: { type: "date" },
                        OPC_EXP_FACTORY: { type: "date" },
                        OPC_PO_CLIENTE: { type: "string" },
                        OPCCPOCli: { type: "string" },
                        OPC_CLIENTE: { type: "string" },
                        OPCMPdCCod: { type: "string" },
                        OPC_MARCAS: { type: "string" },
                        OPCMPdDDes: { type: "string" },
                        OPC_ESTILOS_CLIENTE: { type: "string" },
                        OPC_ACTUALIZA_COLOR: { type: "boolean" },
                        OPCSEst: { type: "string" },
                        OPCFecReqC: { type: "date" },
                        OPCEplCCod: { type: "number" },
                        OPCDOCCCodP: { type: "string" },
                        OPCULogC: { type: "string" },
                        OPC_DEFINIDO: { type: "number" },
                        OPC_HABIL: { type: "number" },
                        OPCSAnu: { type: "string" },
                        OPCFEnvPcpC: { type: "date" },
                        COLOR_ESTADO: { type: "string" },
                        COLOR_DEFINIDO: { type: "string" },
                        COLOR_HABIL: { type: "string" },
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
        toolbar: kendo.template($("#templatePedidoComercial").html()),
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
        /*change: function (e) {
            var row = this.select();
            if (row != null) {
                if (row.next(".k-detail-row").is(":visible")) {
                    e.sender.collapseRow(row);
                } else {
                    //cierra todos los detalles
                    var grid = $("#gridPedidoComercial").data("kendoGrid");
                    $(".k-master-row").each(function (index) {
                        grid.collapseRow(this);
                    });
                    //expande el seleccionado
                    e.sender.expandRow(row);
                }
            }
        },*/
        columns: [
            {
                field: "OPCNAno",
                title: "Año",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 50
            }, {
                field: "OPCNNro",
                title: "Nro",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 70
            }, {
                field: "OPC_CODIGO_COLOR",
                title: "C.Color",
                //template: '#if (HasNotes) {# <a href="javascript:void(0)" onclick="openNotes(${CustomerKey}, ${ReservationKey})">View Notes</a> #} else {# N/A #}#',
                template: '<div align="center"> #if (OPC_CODIGO_COLOR) {# <span class="glyphicon glyphicon-ok"></span> #} else {# <span class="glyphicon glyphicon-remove"></span> #}# </div>',
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 60
            },
            {
                field: "TipoMercado",
                title: "Tipo de Mercado",
                template: '<div align="center"> #if (TipoMercado == "L") {# <label>Local</label> #} else {# <label>Exportación</label> #}# </div>',
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            },
            {
                field: "OPC_EJECUTIVO",
                title: "Ejecutivo",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            }, {
                field: "OPC_FECHA_EMISION",
                title: "F.Emision",
                format: "{0: dd/MM/yyyy}",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 70
            }, {
                field: "OPC_FECHA_APT",
                title: "F. En APT",
                format: "{0: dd/MM/yyyy}",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 70
            }, {
                field: "OPC_EXP_FACTORY",
                title: "Exp.Factory",
                format: "{0: dd/MM/yyyy}",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 70
            }, {
                field: "OPC_PO_CLIENTE",
                title: "PO Cliente",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            }, {
                field: "OPC_CLIENTE",
                title: "Cliente",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 150
            }, {
                field: "OPC_MARCAS",
                title: "Marcas",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            }, {
                field: "OPC_ESTILOS_CLIENTE",
                title: "Estilos Cliente",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            }, {
                field: "OPC_ACTUALIZA_COLOR",
                title: "Actual",
                template: '<div align="center"> #if (OPC_ACTUALIZA_COLOR) {# <span class="glyphicon glyphicon-ok"></span> #} else {# <span class="glyphicon glyphicon-remove"></span> #}# </div>',
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 50
            }, {
                field: "OPC_DEFINIDO",
                title: "Definido",
                attributes: {
                    style: "color: black; background-color: #= COLOR_DEFINIDO #"
                },
                width: 50
            }, {
                field: "OPC_HABIL",
                title: "Habil",
                attributes: {
                    style: "color: black; background-color: #= COLOR_HABIL #"
                },
                width: 50
            }],
        change: function (e) {
            debugger;
            var grd = $("#gridPedidoComercial").data("kendoGrid");
            var item = grd.dataItem(grd.select());
            if (item != null) {
                if (item.EnviosPcp == 0) {
                    $("#btnEditarPedidoComercial").attr("disabled", "disabled");
                }
                else {
                    $("#btnEditarPedidoComercial").removeAttr("disabled");
                }
            }

        },
        dataBound: GoToPage,
        page: onPaging
    }).data("kendoGrid");

    //CARGAR GRID HIJO
    function CargarTablaPedidoComercialDetalle(e) {
        $("<div id='gridComercialDetalle'><div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
                transport: {
                    read: {
                        type: "POST",
                        url: "/PedidoComercialDetalle/ListarPaginado",
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
                            EmpCCod: e.data.EmpCCod,
                            OPCCTipPCw: e.data.OPCCTipPC,
                            OPCNAnow: e.data.OPCNAno,
                            OPCNNrow: e.data.OPCNNro,
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
                            OPC_MARCA: { type: "string" },
                            AnoNroPC: { type: "string" },
                            ItemDcpo: { type: "string" },
                            TipoPedido: { type: "string" },
                            TipoEmpaque: { type: "string" },
                            OPC_FECHA_CREACION: { type: "date" },
                            DESPACHO_APT: { type: "date" },
                            OPCSEstRCw: { type: "string" },
                            FECHA_ENVIO: { type: "date" },
                            HORA_ENVIO: { type: "string" },
                            OPC_DIAS_DEFINIDO: { type: "number" },
                            OPC_DIAS_HABIL: { type: "number" },
                            OPC_COMBO: { type: "string" },
                            INICIO_ATENCION_DDP_PCP: { type: "date" },
                            FIN_ATENCION_DDP_PCP: { type: "date" },
                            OPCNAOPw: { type: "number" },

                            AnoNroPC: { type: "string" },
                            OPC_NRO: { type: "string" },
                            OPESSit: { type: "string" },
                            OPE_FECHA_CREACION: { type: "date" },
                            OP_TEXTIL: { type: "string" },

                            COLOR_DIAS_DEFINIDO: { type: "string" },
                            COLOR_DIAS_HABIL: { type: "string" }
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
                    title: "<div align='center'><b> SEGUIMIENTO DE PEDIDO COMERCIAL </b></div>",
                    columns: [{
                        title: "<div align='center'> PEDIDO COMERIAL </div>",
                        columns: [
                            {
                                field: "AnoNroPC",
                                title: "Año-Número </br> PC",
                                width: 100
                            },
                            {
                                field: "ItemDcpo",
                                title: "Item OP/Dcpo",
                                width: 110
                            },
                            {
                                field: "TipoPedido",
                                title: "Tipo Pedido",
                                width: 100
                            },
                            {
                                field: "TipoEmpaque",
                                title: "Tipo Empaque",
                                width: 120
                            },
                            {
                                field: "OPC_MARCA",
                                title: "Marca",
                                width: 150
                            }, {
                                field: "OPC_FECHA_CREACION",
                                title: "Fecha de </br> Creacion",
                                format: "{0:dd/MM/yyyy}",
                                width: 90
                            }, {
                                field: "DESPACHO_APT",
                                title: "Despacho </br> APT",
                                format: "{0:dd/MM/yyyy}",
                                width: 90
                            }, {
                                field: "OPCSEstRCw",
                                title: "Situacion",
                                width: 100
                            }
                        ]
                    }, {
                        title: "<div align='center'> ENVIO A PCP Y DDP </div>",
                        columns: [{
                            field: "FECHA_ENVIO",
                            title: "F.Envio",
                            format: "{0:dd/MM/yyyy}",
                            width: 90
                        }, {
                            field: "HORA_ENVIO",
                            title: "Hora Envio",
                            width: 70
                        }]
                    }, {
                        title: "<div align='center'> DURACION DIAS </div>",
                        columns: [{
                            field: "OPC_DIAS_DEFINIDO",
                            title: "Definido",
                            attributes: {
                                style: "color: black; background-color: #= COLOR_DIAS_DEFINIDO #"
                            },
                            width: 60
                        }, {
                            field: "OPC_DIAS_HABIL",
                            title: "Habil",
                            attributes: {
                                style: "color: black; background-color: #= COLOR_DIAS_HABIL #"
                            },
                            width: 50
                        }]
                    }, {
                        field: "OPC_COMBO",
                        title: "Combo",
                        width: 150
                    }, {
                        title: "<div align='center'> DDP - INICIO Y FIN DE ATENCIONES </div>",
                        columns: [{
                            field: "INICIO_ATENCION_DDP_PCP",
                            format: "{0:dd/MM/yyyy}",
                            title: "F.Inicio Atencion </br> DPP A PCP",
                            width: 100
                        }, {
                            field: "FIN_ATENCION_DDP_PCP",
                            format: "{0:dd/MM/yyyy}",
                            title: "F.Fin Atencion </br> DPP A PCP",
                            width: 100
                        }]
                    }, {
                        title: "<div align='center'> ORDEN DE CONFECCIONES </div>",
                        columns: [{
                            field: "OPCNAOPw",
                            title: "Año",
                            width: 50
                        }, {
                            field: "OPC_NRO",
                            title: "Nro",
                            width: 50
                        }, {
                            field: "OPESSit",
                            title: "Situacion",
                            width: 100
                        }, {
                            field: "OPE_FECHA_CREACION",
                            title: "Fecha </br> Creacion",
                            format: "{0:dd/MM/yyyy}",
                            width: 80
                        }]
                    }, {
                        title: "<div align='center'> ORDEN TEXTIL </div>",
                        columns: [{
                            field: "OPENAnoOc",
                            title: "PO Textil",
                            width: 80
                        }]
                    }]
                }

            ]
        }).data("kendoGrid");
    };

    $("#btnFiltrarPedidoComercial").click(function () {
        $('#gridPedidoComercial').data('kendoGrid').dataSource.read();
        $('#gridPedidoComercial').data('kendoGrid').refresh();
    });

    $("#btnActualizarPedidoComercial").click(function () {
        var grid = $('#gridPedidoComercial').data("kendoGrid");
        grid.dataSource.read();
        grid.refresh();
    });

    $("#btnRegistrarPedidoComercial").click(function () {
        bloquoteObject();
        var url = $(this).attr('data-url');
        window.location.href = url;
    });

    $("#btnEditarPedidoComercial").click(function () {
        
        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            if (item.EnviosPcp == 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `El pedido ya fue enviado a PCP, no puede ser editado`,
                });
                return;
            }
            bloquoteObject();
            var url_ = Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey);


            /**********22-06-2020*************/
            /*$.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/PedidoComercial/ValidarPcp',
                type: 'POST',
                data: JSON.stringify({ entidad: item }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    if (data.rpta == false || data.rpta == undefined) {

                        AlertMessage(data.result);
                        
                    }
                    else {*/
                        /**/
                        
                        window.location.href = url_;

                     /**/
                   /* } 
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log("Request Failed: " + err);
                //desbloqObject();
            });*/

            /**********22-06-2020*************/

 
        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL DE MUESTRA QUE DESEA EDITAR");
        } 


    });

    $("#btnViewPedido").click(function () {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
           
            bloquoteObject();
            var url_ = Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey);


            window.location.href = url_;


        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: `Debe de Seleccionar un registro`,
            });
            return;
        }


    });

    $("#btnEditCustom").click(function () {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {

            bloquoteObject();
            var url_ = Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey);


            window.location.href = url_;


        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: `Debe de Seleccionar un registro`,
            });
            return;
        }


    });

    $("#btnReporteCombo").click(function () {
        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());
        console.log(item);
        if (item != undefined) {
            var mCotizacion = {
                EmpCCod: item.EmpCCod,
                OPCCTipPC: item.OPCCTipPC,
                OPCNAno: item.OPCNAno,
                OPCNNro: item.OPCNNro,
            };


            window.open(Enrutamiento($(this).attr('data-url'), 'strData=' + encodeURIComponent(JSON.stringify(mCotizacion))), '_blank');
        }
        else {
            AlertMessage("Debe seleccionar un Pedido");
        }
    });

    $("#btnReporteRatios").click(function () {
        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());       
        if (item != undefined) {
            var mCotizacion = {
                EmpCCod: item.EmpCCod,
                OPCCTipPC: item.OPCCTipPC,
                OPCNAno: item.OPCNAno,
                OPCNNro: item.OPCNNro,
            };


            window.open(Enrutamiento($(this).attr('data-url'), 'strData=' + encodeURIComponent(JSON.stringify(mCotizacion))), '_blank');
        }
        else {
            AlertMessage("Debe seleccionar un Pedido");
        }
    });

    $("#btnReporteWithPrecios").click(function () {
        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            var mCotizacion = {
                EmpCCod: item.EmpCCod,
                OPCCTipPC: item.OPCCTipPC,
                OPCNAno: item.OPCNAno,
                OPCNNro: item.OPCNNro,
            };


            window.open(Enrutamiento($(this).attr('data-url'), 'strData=' + encodeURIComponent(JSON.stringify(mCotizacion))), '_blank');
        }
        else {
            AlertMessage("Debe seleccionar un Pedido");
        }
    });

    $("#btnReporteCartaColores").click(function () {
        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            var mCotizacion = {
                EmpCCod: item.EmpCCod,
                OPCCTipPC: item.OPCCTipPC,
                OPCNAno: item.OPCNAno,
                OPCNNro: item.OPCNNro,
            };


            window.open(Enrutamiento($(this).attr('data-url'), 'strData=' + encodeURIComponent(JSON.stringify(mCotizacion))), '_blank');
        }
        else {
            AlertMessage("Debe seleccionar un Pedido");
        }
    });

    $("#btnEnvioPcp").on("click", function (e) {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            window.ConfirmMessage("Desea Enviar el Pedido Comercial a PCP?").then(function () {

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/PedidoComercial/EnviarPcp',
                    type: 'POST',
                    data: JSON.stringify({ entidad: item }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {

                        if (data.rpta == false || data.rpta == undefined) {
                            AlertMessage(data.result);

                        }
                        else {
                            var vrParametros = data.parametros;
                            console.log(vrParametros);
                            var mCotizacion = {
                                StrSubject: data.parametros[3],
                                StrBody: data.parametros[4]
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
                                            AlertMessage('Se ha realizado el envió de DDP de la Solicitud');
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
                                                url: '/EmailPCP/EnviarEmail',
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
                                                    ActualizarTablaPedidoComercial();
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
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL QUE DESEA ENVIAR");
        }

    });
    
    $("#btnGenerarCopiapcp").on("click", function (e) {
        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            var TipoPedidoCopia = '';
            Swal.fire({
                title: 'SISTEMA',
                text: "¿De que tipo desea generar la copia del pedido?",
                icon: 'question',
                showCancelButton: true,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#FFB233',
                cancelButtonColor: '#8E8E87',
                confirmButtonText: `Producción`,
                denyButtonText: `Muestra`,
            }).then((result) => {
                if (result.isConfirmed) {
                    item.OPCCTipPCNew = 'P'
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/PedidoComercial/GenerarCopiaPcp',
                        type: 'POST',
                        data: JSON.stringify({ entidad: item }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            debugger;
                            if (data.rpta) {
                                AlertMessage(data.result);
                                $("#btnActualizarPedidoComercial").click();
                            } else {
                                AlertMessage(data.result);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                }
                if (result.isDenied) {
                    item.OPCCTipPCNew = 'M';
                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/PedidoComercial/GenerarCopiaPcp',
                        type: 'POST',
                        data: JSON.stringify({ entidad: item }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            if (data.rpta) {
                                AlertMessage(data.result);
                                $("#btnActualizarPedidoComercial").click();
                                ActualizarTablaPedidoComercial();
                            } else {
                                AlertMessage(data.result);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                }

            });
            //window.ConfirmMessage("DESEA GENERAR COPIA DEL PEDIDO?").then(function () {
               
            //});
        } else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL QUE DESEA EDITAR");
        }

    });

    $("#btnReporteSeguimiento").on("click", function (e) {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'Selección de Reportes',
                type: BootstrapDialog.TYPE_SUCCESS,
                message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load("../../PedidoComercialReporte/loadReportes"),
                closable: false,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: 'Aceptar',
                    action: function (dialog) {
                        if ($('input[name="RbtReporte"]:checked').length == 0) {
                            AlertMessage("Debe seleccionar un Reporte");
                        }
                        else {
                            var RbtReporte = $('input[name="RbtReporte"]:checked').val();
                            console.log(RbtReporte);
                        }
                    }
                }]
            });
        }
        else {
            AlertMessage("Debe seleccionar un Pedido");
        }

    });

    $("#btnActualizacionPC").click(function () {

        var data = $("#gridPedidoComercial").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            bloquoteObject();
            var url_ = Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey);

            window.location.href = url_;

        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL DE MUESTRA QUE DESEA EDITAR");
        }


    });
});

function ActualizarTablaPedidoComercial() {
    var grid = $('#gridPedidoComercial').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function ActualizarTablaDetallePedidoComercial() {
    var grid = $("#gridPedidoComercial").data("kendoGrid");
    var expanded = $.map(grid.tbody.children(":has(> .k-hierarchy-cell .k-i-collapse)"), function (row) {
        return $(row).data("uid");
    });

    grid.one("dataBound", function () {
        grid.expandRow(grid.tbody.children().filter(function (idx, row) {
            return $.inArray($(row).data("uid"), expanded) >= 0;
        }));
    });
    grid.refresh();
}

function CargarCombosIndex() {
    $('#frmIndexPedidoComercial :input[id="OPCSEst"]').kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: ActualizarTablaPedidoComercial
    });
}

function CargarSpinners() {
    $("#OPCNAno").kendoNumericTextBox({
        decimals: 0,
        min: 0,
        max: 3000,
        format: "#####",
        step: 1
    });
}

function CargarSwitch() {
    $("#chkEstadoAnulado").kendoSwitch({
        checked: false,
        messages: {
            checked: "Si",
            unchecked: "No"
        },
        change: function (e) {
            if (e.checked) {
                $("#OPCSAnu").val("S");
            } else {
                $("#OPCSAnu").val("N");
            }
            ActualizarTablaPedidoComercial();
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
            ActualizarTablaPedidoComercial();
        }
    });
       
}

function GoToPage(arg) {
    var lastPage = sessionStorage.getItem("lastPedidoComercialPage");
    var lastFlag = sessionStorage.getItem("lastPedidoComercialFlag");
    lastPage = (lastPage == '' || lastPage == null || lastPage == undefined) ? 0 : lastPage;
    lastFlag = (lastFlag == '' || lastFlag == null || lastFlag == undefined) ? 0 : lastFlag;

    console.log('lastPage')
    console.log(lastPage)
    if (parseInt(lastPage) > 0 && parseInt(lastFlag) < 1) {
        console.log('setLastPage')
        console.log(lastPage)
        $("#gridPedidoComercial").data("kendoGrid").dataSource.page(lastPage);
        //sessionStorage.setItem("lastPedidoComercialPage", '0');
        //$("#gridPedidoComercial").data("kendoGrid").dataSource.page();
    }
    sessionStorage.setItem("lastPedidoComercialFlag", 1);
    //console.log(arg)
}


function onPaging(arg) {
    console.log('onPaging')
    //kendoConsole.log("Paging to page index:" + arg.page);
    sessionStorage.setItem("lastPedidoComercialPage", arg.page);
    sessionStorage.setItem("lastPedidoComercialFlag", 0);
    console.log(arg.page)
}
