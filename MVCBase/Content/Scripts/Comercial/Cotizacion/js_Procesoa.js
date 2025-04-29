$(document).ready(function () {
    $("#chkSCECFlgImgRC").is(':checked') ? $('#btnBuscarJpg').removeClass('disabled') : $('#btnBuscarJpg').addClass('disabled');
    $("#chkSCECFlgArcRC").is(':checked') ? $('#btnBuscarPdf').removeClass('disabled') : $('#btnBuscarPdf').addClass('disabled');
    $("#chkSCECFlgArcZIP").is(':checked') ? $('#btnBuscarZip').removeClass('disabled') : $('#btnBuscarZip').addClass('disabled');

    $("#gridTela").html('');
    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/Cotizacion/ListaTeasSDC",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    ECotizacion: {
                        PageNumber: options.page - 1,
                        pageSize: options.pageSize,
                    }
                });
            }
        },
        schema: {
            data: function (response) {
                if (response.response == false) {
                    console.log("Error BackEnd : " + response.message);
                }
                else {
                    return response.result;
                }
            },
            total: "TotalRow",
            type: 'json',
            model: {
                fields: {
                    SCENTel: { type: "number" },
                    SCECObsTel: { type: "string" },
                }
            }
        },
        pageSize: 4,
        serverPaging: false,
        serverFiltering: true,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + (err));
        }
    });
    var grid = $("#gridTela").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        sortable: true,
        pageable: true,
        selectable: true,
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE TELAS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [

            {
                field: "ECotizacionTelas.SCENTel",
                title: "Item",
                width: 60,
                attributes: {
                    'style': "#='background-color:' + StrColor + '; color : black; font-weight : bold;' #"
                },
            },
            {
                field: "ECotizacionTelas.SCECObsTel",
                title: "Observación"
            }

        ],
    }).data("kendoGrid");
    // Switch Prototipo
    $("#chkSCECFlgProto").kendoSwitch({
        messages: {
            checked: "SI",
            unchecked: "NO"
        }
    });
    // Buscar Cliente
    $("#idbtnBuscarCliente").on("click", function (e) {
        BootstrapDialog.show({
            title: 'Ayuda de Clientes Comercial',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var data = $("#gridCliente").data("kendoGrid");
                        var item = data.dataItem(data.select());
                        if (item != undefined) {
                            $("#idfrmCotizacion").find("input[id='txtCliDDes']").val(item.CliDDes);
                            $("#idfrmCotizacion").find("input[id='hdCliCCod']").val(item.SerialKey);
                            dialog.close();
                            $("#idfrmCotizacion").find("input[id='idtxtEstiloCliente']").focus();
                        }
                        else {
                            AlertMessage("Debe de Seleccionar un Registro!");
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos Cliente : [ " + e + " ]")
                    }
                }
            ]
        });
    })
    // Buscar Tipo de Prenda
    $("#btnBuscarTPrenda").on("click", function (e) {
        BootstrapDialog.show({
            title: 'Selección de Tipo de Prenda',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var data = $("#gridTipoPrenda").data("kendoGrid");
                        var item = data.dataItem(data.select());
                        if (item != undefined) {
                            $("#idfrmCotizacion").find("input[id='txtDescTipoPrenda']").val(item.TPGDDesG);
                            $("#idfrmCotizacion").find("input[id='idTipoPrenda']").val(item.SerialKey);
                            dialog.close();
                            $("#idfrmCotizacion").find("input[id='txtDescripcionPrenda']").focus();
                        }
                        else {
                            AlertMessage("Debe de Seleccionar un Registro!");
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos Tipo de Prenda : [ " + e + " ]")
                    }
                }
            ]
        });
    })
    // Buscar Destino de la Orden del Cliente
    $("#btnBuscarDestinoOrden").on("click", function (e) {
        BootstrapDialog.show({
            title: 'Selección de Destino de la Orden del Cliente',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var data = $("#gridDestinoCliente").data("kendoGrid");
                        var item = data.dataItem(data.select());

                        if (item != undefined) {
                            $("#idfrmCotizacion").find("input[id='txtDOCDDes']").val(item.DOCDDes);
                            $("#idfrmCotizacion").find("input[id='idDOCCCod']").val(item.SerialKey);
                            dialog.close();
                        }
                        else {
                            AlertMessage("Debe de Seleccionar un Registro!");
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos Tipo de Prenda : [ " + e + " ]")
                    }
                }
            ]
        });
    })
    // Buscar Marca por Cliente
    $("#btnBuscarMarca").on("click", function (e) {
        var SerialKey = $("#idfrmCotizacion").find("input[id='hdCliCCod']").val();
        if (SerialKey == '' || SerialKey == undefined || SerialKey == null) {
            AlertMessage("Debe de Seleccionar un Cliente para continuar!");
            return;
        }

        BootstrapDialog.show({
            title: 'Selección Marcas de Prendas por Cliente',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'Index=' + SerialKey)),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var data = $("#gridMarcaCliente").data("kendoGrid");
                        var item = data.dataItem(data.select());
                        if (item != undefined) {
                            $("#idfrmCotizacion").find("input[id='idMPdCCod']").val(item.eMarcaCliente.SerialKey);
                            $("#idfrmCotizacion").find("input[id='txtMPdDDes']").val(item.eMarcaCliente.MPdDDes);
                            dialog.close();
                            $("#idfrmCotizacion").find("select[id='IdcboListTemporada']").focus();
                        }
                        else {
                            AlertMessage("Debe de Seleccionar un Registro!");
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos Marcas del Cliente : [ " + e + " ]")
                    }
                }
            ]
        });
    })
    // Buscar Solicitante
    $("#btnBuscarSolicitante").on("click", function (e) {

        BootstrapDialog.show({
            title: 'Selección ayuda Personal',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var data = $("#gridData").data("kendoGrid");
                        var item = data.dataItem(data.select());
                        if (item != undefined) {
                            $("#idfrmCotizacion").find("input[id='hdEplCCod']").val(item.SerialKey);
                            $("#idfrmCotizacion").find("input[id='txtEplDNom']").val(item.EplDNom);
                            dialog.close();
                        }
                        else {
                            AlertMessage("Debe de Seleccionar un Registro!");
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos de los Solicitantes : [ " + e + " ]")
                    }
                }
            ]
        });
    })
    // Buscar Ejecutivo Comercial
    $("#btnBuscarEjecutivoC").on("click", function (e) {

        BootstrapDialog.show({
            title: 'Selección personal por Funcion',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var data = $("#gridData").data("kendoGrid");
                        var item = data.dataItem(data.select());
                        if (item != undefined) {
                            $("#idfrmCotizacion").find("input[id='hdEjeEplCCod']").val(item.eSolicitante.SerialKey);
                            $("#idfrmCotizacion").find("input[id='txtEjeEplDNom']").val(item.eSolicitante.EplDNom);
                            dialog.close();
                        }
                        else {
                            AlertMessage("Debe de Seleccionar un Registro!");
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos de los Ejecutivos Comeriales : [ " + e + " ]")
                    }
                }
            ]
        });
    })
    // Buscar  Tallas
    $("#btnBuscarTalla").on("click", function (e) {

        BootstrapDialog.show({
            title: 'Selección de Tallas',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'))),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var data = $("#gridData").data("kendoGrid");
                        var Tallas = [];

                        if (data.select().length > 0) {
                            data.dataSource.data().forEach(function (d) {
                                if (d.blCheck) {
                                    Tallas.push(d);
                                }
                            });
                            $.ajax({
                                datatype: 'json',
                                contentType: "application/json",
                                url: '/Talla/AddListaTallas',
                                type: 'POST',
                                data: JSON.stringify(Tallas),
                                beforeSend: function () { },
                                success: function (data) {
                                    if (!data.result) {
                                        AlertMessage(data.msg);
                                        return;
                                    }
                                    $("#idfrmCotizacion").find("#idTallastb input").val('');
                                    $("#idfrmCotizacion").find("#idProporcionestb input").val('');
                                    $("#idfrmCotizacion").find("#idtallab input:checkbox").prop("checked", false);

                                    for (var i = 0; i < data.data.length; i++) {
                                        var idtext = "idtxtTalla" + (i + 1);
                                        var idprop = "SCENProp" + i + "";
                                        var idtallabase = "SCECFlgTBCli" + i + "";

                                        $("#idfrmCotizacion").find("input[id='" + idtext + "']").val(data.data[i].TalDCodEdit);
                                        $("#idfrmCotizacion").find("input:text[id='" + idprop + "']").val(data.data[i].IntProporcion);
                                        $("#idfrmCotizacion").find("#idtallab input:checkbox[id='" + idtallabase + "']").prop("checked", data.data[i].BlIsTallaBase);
                                    }
                                    console.log("msg :" + data.msg);
                                    dialog.close();
                                }
                            }).fail(function (jqxhr, textStatus, error) {
                                console.log("Request Failed: " + error);
                                dialog.close();
                            });
                        }
                        else {
                            AlertMessage("Debe de Seleccionar un Registro!");
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos de Tallas : [ " + e + " ]")
                    }
                }
            ]
        })
    });
    // Boton  Aceptar
    $("#btnGrabar").on("click", function (e) {

        if ($("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgImgRC']").is(':checked')) {
            if ($("#idfrmCotizacion :input[id='txtSCECImgRC']").val() == undefined || $("#idfrmCotizacion :input[id='txtSCECImgRC']").val() == "") {
                AlertMessage("Debe de Seleccionar un Archivo de Imagen JPG");
                return;
            }
        }

        if ($("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgArcRC']").is(':checked')) {
            if ($("#idfrmCotizacion :input[id='txtSCECArcRC']").val() == undefined || $("#idfrmCotizacion :input[id='txtSCECArcRC']").val() == "") {
                AlertMessage("Debe de Seleccionar un Archivo PDF");
                return;
            }
        }

        if ($("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgArcZIP']").is(':checked')) {
            if ($("#idfrmCotizacion :input[id='txtSCECUbiArcZip']").val() == undefined || $("#idfrmCotizacion :input[id='txtSCECUbiArcZip']").val() == "") {
                AlertMessage("Debe de Seleccionar un Archivo .ZIP o .RAR");
                return;
            }
        }

        if ($("#idTipoPrenda").val() == undefined || $("#idTipoPrenda").val() == "") {
            AlertMessage("Debe de Seleccionar el Tipo de Prenda");
            return;
        }

        if ($("#hdCliCCod").val() == undefined || $("#hdCliCCod").val() == "") {
            AlertMessage("Debe de Seleccionar el Cliente");
            return;
        }

        if ($("#idDOCCCod").val() == undefined || $("#idDOCCCod").val() == "") {
            AlertMessage("Debe de Seleccionar el Destino");
            return;
        }

        if ($("#idMPdCCod").val() == undefined || $("#idMPdCCod").val() == "") {
            AlertMessage("Debe de Seleccionar la Marca del Cliente");
            return;
        }

        if ($("#IdcboListTemporada").val() == undefined || $("#IdcboListTemporada").val() == "") {
            AlertMessage("Debe de Seleccionar la Temporada");
            return;
        }

        if ($("#IdcboListDivision").val() == undefined || $("#IdcboListDivision").val() == "") {
            AlertMessage("Debe de Seleccionar la División");
            return;
        }

        if ($("#IdcboListGenero").val() == undefined || $("#IdcboListGenero").val() == "") {
            AlertMessage("Debe de Seleccionar el Género");
            return;
        }


        if ($("#idcboMercado").val() == undefined || $("#idcboMercado").val() == "") {
            AlertMessage("Debe de Seleccionar el Mercado");
            return;
        }

        if ($("#hdEplCCod").val() == undefined || $("#hdEplCCod").val() == "") {
            AlertMessage("Debe de Seleccionar un Solicitante");
            return;
        }


        var myfileImg = $("#idFileImg")[0].files[0];
        var myfilePDF = $("#idFilePdf")[0].files[0];
        var myfileZip = $("#idFileZip")[0].files[0];

        var formData = new FormData();

        if (myfileImg != undefined) formData.append('Imagen', myfileImg);

        if (myfilePDF != undefined) formData.append('Pdf', myfilePDF);

        if (myfileZip != undefined) formData.append('Zip', myfileZip);

        var mCotizacion = {

            ECotizacion: {
                SerialKey: $("#idfrmCotizacion :input[id='hdSerialKey']").val(),
                ESTADO: 'A',
                SCENAno: $("#idfrmCotizacion :input[id='idAnio']").val(),
                SCENNro: $("#idfrmCotizacion :input[id='Numero']").val(),
                SCENVer: $("#idfrmCotizacion :input[id='Version']").val(),
                SCEDPdaCli: $("#idfrmCotizacion :input[id='txtDescripcionPrenda']").val(),
                E_CLIENTE: {
                    SerialKey: $("#idfrmCotizacion :input[id='hdCliCCod']").val(),
                    eMarcaCliente: {
                        SerialKey: $("#idfrmCotizacion :input[id='idMPdCCod']").val(),
                        ESTADO: 'A',
                    },
                    ESTADO: 'A',
                },
                SCECMer: $("#idfrmCotizacion").find("#idcboMercado").val(),
                SCECEstCli: $("#idfrmCotizacion :input[id='idtxtEstiloCliente']").val(),
                SCECEstCliA: $("#idfrmCotizacion :input[id='idtxtEstiloCliente']").val(),
                E_TIPOPRENDA: {
                    SerialKey: $("#idfrmCotizacion :input[id='idTipoPrenda']").val(),
                    ESTADO: 'A',
                },
                SCECFlgProto: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgProto']").is(':checked') ? 'S' : 'N',
                E_TEMPORADA: {
                    SerialKey: $("#idfrmCotizacion").find("#IdcboListTemporada").val(),
                    ESTADO: 'A',
                },
                SCENAnoTem: $("#idfrmCotizacion :input[id='txtSCENAnoTem']").val(),
                E_SOLICITANTE: {
                    SerialKey: $("#idfrmCotizacion :input[id='hdEplCCod']").val(),
                    ESTADO: 'A',
                },
                E_DIVISION: {
                    SerialKey: $("#idfrmCotizacion").find("#IdcboListDivision").val(),
                    ESTADO: 'A',
                },
                SCECIndPdaFC: $("#idfrmCotizacion").find("input:checkbox[id='ckhSCECIndPdaFC']").is(':checked') ? 'S' : 'N',
                SCECIndPdaFCT: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECIndPdaFCT']").is(':checked') ? 'S' : 'N',
                SCECIndSpeC: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECIndSpeC']").is(':checked') ? 'S' : 'N',
                SCECIndSpeA: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECIndSpeA']").is(':checked') ? 'S' : 'N',
                SCECIndSpeTB: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECIndSpeTB']").is(':checked') ? 'S' : 'N',
                SCECIndSpeTT: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECIndSpeTT']").is(':checked') ? 'S' : 'N',
                SCECIndSpeAvi: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECIndSpeAvi']").is(':checked') ? 'S' : 'N',
                SCEDCns: $("#idfrmCotizacion").find("textarea[id='txtSCEDCns']").val(),
                SCEDMed: $("#idfrmCotizacion").find("textarea[id='txtSCEDMed']").val(),
                SCEDGra: $("#idfrmCotizacion").find("textarea[id='txtSCEDGra']").val(),
                SCEDAvi: $("#idfrmCotizacion").find("textarea[id='txtSCEDAvi']").val(),
                SCECFlgArt: $("#idfrmCotizacion").find("#idcboArte").val(),
                SCEDArtOt: $("#idfrmCotizacion :input[id='txtSCEDArtOt']").val(),
                SCEDUbiOt: $("#idfrmCotizacion :input[id='txtSCEDUbiOt']").val(),
                SCECAplCot: 'N',
                SCECCobTel: 'N',
                SCECCobPza: 'N',
                SCECCobBlq: 'N',
                SCEDAplServ: $("#idfrmCotizacion :input[id='txtSCEDAplServ']").val(),
                SCEDUbiApl: $("#idfrmCotizacion :input[id='txtSCEDUbiApl']").val(),
                SCEDEstmp: $("#idfrmCotizacion :input[id='txtSCEDEstmp']").val(),
                SCEDUbiEstm: $("#idfrmCotizacion :input[id='txtSCEDUbiEstm']").val(),
                SCEDBorda: $("#idfrmCotizacion :input[id='txtSCEDBorda']").val(),
                SCEDUbiBord: $("#idfrmCotizacion :input[id='txtSCEDUbiBord']").val(),
                SCECFlgLavPda: $("#idfrmCotizacion").find("#idcboLavado").val(),
                SCEDLavCli: $("#idfrmCotizacion").find("textarea[id='txtSCEDLavCli']").val(),
                SCEDLav: '',
                SCEDObs: '',
                SCENEncAn: $("#idfrmCotizacion :input[id='txtSCENEncAn']").val(),
                SCENEncLa: $("#idfrmCotizacion :input[id='txtSCENEncLa']").val(),
                SCECFlgEncTel: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgEncTel']").is(':checked') ? 'S' : 'N',
                SCECFlgEncPrd: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgEncPrd']").is(':checked') ? 'S' : 'N',
                SCENEncRev: $("#idfrmCotizacion :input[id='txtSCENEncRev']").val(),
                SCECFlgFulCob: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgFulCob']").is(':checked') ? 'S' : 'N',
                SCECRangPrd: '',
                SCECFlgCot: 'N',
                SCECCodAPrenda: 0,
                SCECCodAMolde: 0,
                SCECCodACons: 0,
                SCECObsAsig: '',
                SCECFlgING: 'N',
                SCECFlgSDP: 'N',
                SCECFlgRef: 'N',
                SCESPyh: 'P',
                SCESEstDes: 'N',
                SCESTipDsp: 'N',
                SCEQPdaPr: $("#idfrmCotizacion :input[id='txtSCEQPdaPr']").val(),
                SCESApaPda: $("#idfrmCotizacion").find("#idcboApariencia").val(),
                SCESArtSen: $("#idfrmCotizacion").find("#idcboSentido").val(),
                SCEQCstBord: $("#idfrmCotizacion :input[id='txtSCEQCstBord']").val(),
                SCEQCstEstm: $("#idfrmCotizacion :input[id='txtSCEQCstEstm']").val(),
                SCEQCstApl: $("#idfrmCotizacion :input[id='txtSCEQCstApl']").val(),
                SCEQCstOt: $("#idfrmCotizacion :input[id='txtSCEQCstOt']").val(),
                SCECFlgAvGM: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgAvGM']").is(':checked') ? 'S' : 'N',
                SCECFlgImgRC: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgImgRC']").is(':checked') ? 'S' : 'N',
                SCECImgRC: $("#idfrmCotizacion :input[id='txtSCECImgRC']").val(),
                SCECFlgArcRC: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgArcRC']").is(':checked') ? 'S' : 'N',
                SCECArcRC: $("#idfrmCotizacion :input[id='txtSCECArcRC']").val(),
                SCECFlgArcZIP: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgArcZIP']").is(':checked') ? 'S' : 'N',
                SCECUbiArcZip: $("#idfrmCotizacion :input[id='txtSCECUbiArcZip']").val(),
                SCECFlgAvEsp: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgAvEsp']").is(':checked') ? 'S' : 'N',
                SCEDObsGen: $("#idfrmCotizacion").find("textarea[id='txtSCEDObsGen']").val(),
                SCEDPdaxCli: $("#idfrmCotizacion :input[id='txtDesPrendaCliente']").val(),
                SCECFlgAvEsAc: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgAvEsAc']").is(':checked') ? 'S' : 'N',
                SCECFlgAvGAc: $("#idfrmCotizacion").find("input:checkbox[id='chkSCECFlgAvGAc']").is(':checked') ? 'S' : 'N',
                E_EJECUTIVOCOMERCIAL: {
                    eSolicitante: {
                        SerialKey: $("#idfrmCotizacion :input[id='hdEjeEplCCod']").val(),
                        ESTADO: 'A',
                    },
                    ESTADO: 'A',
                },
                E_DESTINOORDEN: {
                    SerialKey: $("#idfrmCotizacion :input[id='idDOCCCod']").val(),
                    ESTADO: 'A',
                },
                E_GENERO: {
                    SerialKey: $("#idfrmCotizacion").find("#IdcboListGenero").val(),
                    ESTADO: 'A',
                },
            }
        };

        formData.append('mCotizacion', JSON.stringify(mCotizacion));
        $.ajax({
            datatype: 'json',
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
            url: '/Cotizacion/Procesar',
            type: 'POST',
            data: formData,
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                if (data.rpta) {
                    DialogMessage(data.result, data.url);
                } else {
                    AlertMessage(data.result);
                }
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            console.log("Request Failed: " + error);
            desbloqObject();
        });
    });
    //Boton Agregar Telas
    $("#btnAddTela").on("click", function (e) {

        var vrRuta = '';
        var mCotizacion = {
            ECotizacionTelas: {
                SCESFlgAvTe: 'N'
            },

        };

        vrRuta = Enrutamiento($(this).attr('data-url'), 'strTelas=' + encodeURIComponent(JSON.stringify(mCotizacion)));
        BootstrapDialog.show({
            title: 'Ingreso de Telas - Comercial',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var comAlgodon = 0;
                        var comPolyester = 0;
                        var comViscosa = 0;
                        var comSpandex = 0;
                        var comOtros = 0;
                        var DesArt = $("#frmIndexTelaComercial :input[id='txtSCECDesArt']").val();

                        if (DesArt == "" || DesArt == undefined) {
                            AlertMessage('Debe Ingresar la Descripción de la Tela');
                            return;
                        }
                        comAlgodon = ($("#frmIndexTelaComercial :input[id='txtSCEQComAl']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComAl']").val() : 0;
                        comPolyester = ($("#frmIndexTelaComercial :input[id='txtSCEQComPo']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComPo']").val() : 0;
                        comViscosa = ($("#frmIndexTelaComercial :input[id='txtSCEQComVi']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComVi']").val() : 0;
                        comSpandex = ($("#frmIndexTelaComercial :input[id='txtSCEQComSp']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComSp']").val() : 0;
                        comOtros = ($("#frmIndexTelaComercial :input[id='txtSCEQComOt']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComOt']").val() : 0;
                        sumaComposicion = (parseInt(comAlgodon, 10) + parseInt(comPolyester, 10) + parseInt(comViscosa, 10) + parseInt(comSpandex, 10) + parseInt(comOtros, 10));
                        if (sumaComposicion > 100) {
                            AlertMessage('La Composición debe de sumar solo el 100%');
                            return;
                        }

                        var mCotizacion = {
                            ECotizacionTelas: {
                                SCENTel: $("#frmIndexTelaComercial :input[id='hdSCENTel']").val(),
                                SCESFlgAvTe: $("#frmIndexTelaComercial :input[id='hdSCESFlgAvTe']").val(),
                                SCECDesArt: $("#frmIndexTelaComercial :input[id='txtSCECDesArt']").val(),
                                SCECTit: $("#frmIndexTelaComercial :input[id='txtSCECTit']").val(),
                                SCENDens: $("#frmIndexTelaComercial :input[id='txtSCENDens']").val(),
                                SCECTipLav: $("#frmIndexTelaComercial").find("#cboSCECTipLav").val(),
                                SCEQComAl: comAlgodon,
                                SCEQComPo: comPolyester,
                                SCEQComVi: comViscosa,
                                SCEQComSp: comSpandex,
                                SCEQComOt: comOtros,
                                SCECDesOt: $("#frmIndexTelaComercial :input[id='txtSCECDesOt']").val(),
                                SCECObsAdi: $("#frmIndexTelaComercial :input[id='txtSCECObsAdi']").val(),
                                SCECObsTel: $("#frmIndexTelaComercial :input[id='txtSCECObsTel']").val(),
                                SCECFlgPesTe: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgPesTe']").is(':checked') ? 'S' : 'N',
                                SCECFlgLisI: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgLisI']").is(':checked') ? 'S' : 'N',
                                SCECFlgLisF: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgLisF']").is(':checked') ? 'S' : 'N',
                                SCECFlgSol: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgSol']").is(':checked') ? 'S' : 'N',
                                SCECFlgFulC: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgFulC']").is(':checked') ? 'S' : 'N',
                                SCECFlgHeath: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgHeath']").is(':checked') ? 'S' : 'N',
                                SCECFlgMelan: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgMelan']").is(':checked') ? 'S' : 'N',
                                SCECFlgTip: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgTip']").is(':checked') ? 'S' : 'N',
                                SCECFlgAcEs: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgAcEs']").is(':checked') ? 'S' : 'N',
                            },
                            StrCodsProcesos: $("#frmIndexTelaComercial :input[id='hdStrCodsProcesos']").val(),
                        };
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/CotizacionTelas/AddTelasSDCVirtual',
                            type: 'POST',
                            data: JSON.stringify(mCotizacion),
                            beforeSend: function () { },
                            success: function (data) {
                                if (!data.result) {
                                    AlertMessage(data.msg);
                                    console.log("msg :" + data.msg);
                                    return;
                                }
                                AlertMessage("Se ha Registrado la Tela");
                                ActualizarDataGrid();
                                console.log("msg :" + data.msg);
                                dialog.close();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            console.log("Request Failed: " + error);
                            dialog.close();
                        });

                        dialog.close();
                    },
                    error: function (e) {
                        console.log("Error obtener Datos de Tallas : [ " + e + " ]")
                    }
                }
            ]
        }).setSize(BootstrapDialog.SIZE_WIDE);
    });
    //Boton Avío Textil
    $("#btnAddAvioTextil").on("click", function (e) {

        var vrRuta = '';
        var mCotizacion = {
            ECotizacionTelas: {
                SCESFlgAvTe: 'S'
            },

        };

        vrRuta = Enrutamiento($(this).attr('data-url'), 'strTelas=' + encodeURIComponent(JSON.stringify(mCotizacion)));
        BootstrapDialog.show({
            title: 'Ingreso de Telas - Comercial',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var comAlgodon = 0;
                        var comPolyester = 0;
                        var comViscosa = 0;
                        var comSpandex = 0;
                        var comOtros = 0;
                        var DesArt = $("#frmIndexTelaComercial :input[id='txtSCECDesArt']").val();

                        if (DesArt == "" || DesArt == undefined) {
                            AlertMessage('Debe Ingresar la Descripción de la Tela');
                            return;
                        }
                        comAlgodon = ($("#frmIndexTelaComercial :input[id='txtSCEQComAl']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComAl']").val() : 0;
                        comPolyester = ($("#frmIndexTelaComercial :input[id='txtSCEQComPo']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComPo']").val() : 0;
                        comViscosa = ($("#frmIndexTelaComercial :input[id='txtSCEQComVi']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComVi']").val() : 0;
                        comSpandex = ($("#frmIndexTelaComercial :input[id='txtSCEQComSp']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComSp']").val() : 0;
                        comOtros = ($("#frmIndexTelaComercial :input[id='txtSCEQComOt']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComOt']").val() : 0;
                        sumaComposicion = (parseInt(comAlgodon, 10) + parseInt(comPolyester, 10) + parseInt(comViscosa, 10) + parseInt(comSpandex, 10) + parseInt(comOtros, 10));

                        if (sumaComposicion > 100) {
                            AlertMessage('La Composición debe de sumar solo el 100%');
                            return;
                        }

                        var mCotizacion = {
                            ECotizacionTelas: {
                                SCENTel: $("#frmIndexTelaComercial :input[id='hdSCENTel']").val(),
                                SCESFlgAvTe: $("#frmIndexTelaComercial :input[id='hdSCESFlgAvTe']").val(),
                                SCECFlgMDDP: $("#frmIndexTelaComercial :input[id='hdSCECFlgMDDP']").val(),
                                SCECFlgDDP: $("#frmIndexTelaComercial :input[id='hdSCECFlgDDP']").val(),
                                SCECDesArt: $("#frmIndexTelaComercial :input[id='txtSCECDesArt']").val(),
                                SCECTit: $("#frmIndexTelaComercial :input[id='txtSCECTit']").val(),
                                SCENDens: $("#frmIndexTelaComercial :input[id='txtSCENDens']").val(),
                                SCECTipLav: $("#frmIndexTelaComercial").find("#cboSCECTipLav").val(),
                                SCEQComAl: comAlgodon,
                                SCEQComPo: comPolyester,
                                SCEQComVi: comViscosa,
                                SCEQComSp: comSpandex,
                                SCEQComOt: comOtros,
                                SCECDesOt: $("#frmIndexTelaComercial :input[id='txtSCECDesOt']").val(),
                                SCECObsAdi: $("#frmIndexTelaComercial :input[id='txtSCECObsAdi']").val(),
                                SCECObsTel: $("#frmIndexTelaComercial :input[id='txtSCECObsTel']").val(),
                                SCECFlgPesTe: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgPesTe']").is(':checked') ? 'S' : 'N',
                                SCECFlgLisI: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgLisI']").is(':checked') ? 'S' : 'N',
                                SCECFlgLisF: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgLisF']").is(':checked') ? 'S' : 'N',
                                SCECFlgSol: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgSol']").is(':checked') ? 'S' : 'N',
                                SCECFlgFulC: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgFulC']").is(':checked') ? 'S' : 'N',
                                SCECFlgHeath: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgHeath']").is(':checked') ? 'S' : 'N',
                                SCECFlgMelan: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgMelan']").is(':checked') ? 'S' : 'N',
                                SCECFlgTip: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgTip']").is(':checked') ? 'S' : 'N',
                                SCECFlgAcEs: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgAcEs']").is(':checked') ? 'S' : 'N',
                            },
                            StrCodsProcesos: $("#frmIndexTelaComercial :input[id='hdStrCodsProcesos']").val(),
                        };
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/CotizacionTelas/AddTelasSDCVirtual',
                            type: 'POST',
                            data: JSON.stringify(mCotizacion),
                            beforeSend: function () { },
                            success: function (data) {
                                if (!data.result) {
                                    AlertMessage(data.msg);
                                    console.log("msg :" + data.msg);
                                    return;
                                }
                                AlertMessage("Se ha Registrado la Tela");
                                ActualizarDataGrid();
                                console.log("msg :" + data.msg);
                                dialog.close();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            console.log("Request Failed: " + error);
                            dialog.close();
                        });

                        dialog.close();
                    },
                    error: function (e) {
                        console.log("Error obtener Datos de Tallas : [ " + e + " ]")
                    }
                }
            ]
        }).setSize(BootstrapDialog.SIZE_WIDE);
    });
    // Editar Telas de la Cotizacion
    $("#btnEditTela").on("click", function (e) {
        //'strData=' + encodeURIComponent(JSON.stringify(mCotizacion))
        var vrRuta = '';
        var data = $("#gridTela").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            if ((item.ECotizacionTelas.SCECFlgDDP != "N" && item.ECotizacionTelas.SCECFlgMDDP != "N") ||
                (item.ECotizacionTelas.SCECFlgDDP != "N" && item.ECotizacionTelas.SCECFlgMDDP != "S" && item.ECotizacionTelas.SCECObsTel != item.ECotizacionTelas.SCECObsOri)) {
                AlertMessage("No se puede Modificar. Telas Modificadas por DDP.");
                return;
            }
            var mCotizacion = {
                ECotizacionTelas: {
                    SCECDesArt: item.ECotizacionTelas.SCECDesArt,
                    SCESFlgAvTe: item.ECotizacionTelas.SCESFlgAvTe,
                    SCECTit: item.ECotizacionTelas.SCECTit,
                    SCENDens: item.ECotizacionTelas.SCENDens,
                    SCECFlgMDDP: item.ECotizacionTelas.SCECFlgMDDP,
                    SCECFlgDDP: item.ECotizacionTelas.SCECFlgDDP,
                    SCECTipLav: item.ECotizacionTelas.SCECTipLav,
                    SCEQComAl: item.ECotizacionTelas.SCEQComAl,
                    SCEQComPo: item.ECotizacionTelas.SCEQComPo,
                    SCEQComVi: item.ECotizacionTelas.SCEQComVi,
                    SCEQComSp: item.ECotizacionTelas.SCEQComSp,
                    SCEQComOt: item.ECotizacionTelas.SCEQComOt,
                    SCECDesOt: item.ECotizacionTelas.SCECDesOt,
                    SCECObsAdi: item.ECotizacionTelas.SCECObsAdi,
                    SCECObsTel: item.ECotizacionTelas.SCECObsTel,
                    SCECObsOri: item.ECotizacionTelas.SCECObsOri,
                    SCECFlgPesTe: item.ECotizacionTelas.SCECFlgPesTe,
                    SCECFlgLisI: item.ECotizacionTelas.SCECFlgLisI,
                    SCECFlgLisF: item.ECotizacionTelas.SCECFlgLisF,
                    SCECFlgSol: item.ECotizacionTelas.SCECFlgSol,
                    SCECFlgFulC: item.ECotizacionTelas.SCECFlgFulC,
                    SCECFlgHeath: item.ECotizacionTelas.SCECFlgHeath,
                    SCECFlgMelan: item.ECotizacionTelas.SCECFlgMelan,
                    SCECFlgTip: item.ECotizacionTelas.SCECFlgTip,
                    SCECFlgAcEs: item.ECotizacionTelas.SCECFlgAcEs,
                    SCENTel: item.ECotizacionTelas.SCENTel,
                },

            };

            vrRuta = Enrutamiento($(this).attr('data-url'), 'strTelas=' + encodeURIComponent(JSON.stringify(mCotizacion)));
        }
        else {
            AlertMessage("Debe de seleccionar un registro");
            return;
        }
        BootstrapDialog.show({
            title: 'Ingreso de Telas - Comercial',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: 'Aceptar',
                    action: function (dialog) {
                        var comAlgodon = 0;
                        var comPolyester = 0;
                        var comViscosa = 0;
                        var comSpandex = 0;
                        var comOtros = 0;

                        comAlgodon = ($("#frmIndexTelaComercial :input[id='txtSCEQComAl']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComAl']").val() : 0;
                        comPolyester = ($("#frmIndexTelaComercial :input[id='txtSCEQComPo']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComPo']").val() : 0;
                        comViscosa = ($("#frmIndexTelaComercial :input[id='txtSCEQComVi']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComVi']").val() : 0;
                        comSpandex = ($("#frmIndexTelaComercial :input[id='txtSCEQComSp']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComSp']").val() : 0;
                        comOtros = ($("#frmIndexTelaComercial :input[id='txtSCEQComOt']").val() != '') ? $("#frmIndexTelaComercial :input[id='txtSCEQComOt']").val() : 0;
                        sumaComposicion = (parseInt(comAlgodon, 10) + parseInt(comPolyester, 10) + parseInt(comViscosa, 10) + parseInt(comSpandex, 10) + parseInt(comOtros, 10));

                        if (sumaComposicion > 100) {
                            AlertMessage('La Composición debe de sumar solo el 100%');
                            return;
                        }
                        console.log($("#frmIndexTelaComercial :input[id='hdStrCodsProcesos']").val());

                        var mCotizacion = {
                            ECotizacionTelas: {
                                SCESFlgAvTe: $("#frmIndexTelaComercial :input[id='hdSCESFlgAvTe']").val(),
                                SCENTel: $("#frmIndexTelaComercial :input[id='hdSCENTel']").val(),
                                SCECDesArt: $("#frmIndexTelaComercial :input[id='txtSCECDesArt']").val(),
                                SCECTit: $("#frmIndexTelaComercial :input[id='txtSCECTit']").val(),
                                SCENDens: $("#frmIndexTelaComercial :input[id='txtSCENDens']").val(),
                                SCECTipLav: $("#frmIndexTelaComercial").find("#cboSCECTipLav").val(),
                                SCECFlgMDDP: $("#frmIndexTelaComercial :input[id='hdSCECFlgMDDP']").val(),
                                SCECFlgDDP: $("#frmIndexTelaComercial :input[id='hdSCECFlgDDP']").val(),
                                SCEQComAl: comAlgodon,
                                SCEQComPo: comPolyester,
                                SCEQComVi: comViscosa,
                                SCEQComSp: comSpandex,
                                SCEQComOt: comOtros,
                                SCECDesOt: $("#frmIndexTelaComercial :input[id='txtSCECDesOt']").val(),
                                SCECObsAdi: $("#frmIndexTelaComercial :input[id='txtSCECObsAdi']").val(),
                                SCECObsTel: $("#frmIndexTelaComercial :input[id='txtSCECObsTel']").val(),
                                SCECFlgPesTe: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgPesTe']").is(':checked') ? 'S' : 'N',
                                SCECFlgLisI: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgLisI']").is(':checked') ? 'S' : 'N',
                                SCECFlgLisF: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgLisF']").is(':checked') ? 'S' : 'N',
                                SCECFlgSol: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgSol']").is(':checked') ? 'S' : 'N',
                                SCECFlgFulC: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgFulC']").is(':checked') ? 'S' : 'N',
                                SCECFlgHeath: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgHeath']").is(':checked') ? 'S' : 'N',
                                SCECFlgMelan: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgMelan']").is(':checked') ? 'S' : 'N',
                                SCECFlgTip: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgTip']").is(':checked') ? 'S' : 'N',
                                SCECFlgAcEs: $("#frmIndexTelaComercial").find("input:checkbox[id='chkSCECFlgAcEs']").is(':checked') ? 'S' : 'N',
                            },
                            StrCodsProcesos: $("#frmIndexTelaComercial :input[id='hdStrCodsProcesos']").val(),
                        };
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/CotizacionTelas/AddTelasSDCVirtual',
                            type: 'POST',
                            data: JSON.stringify(mCotizacion),
                            beforeSend: function () { },
                            success: function (data) {
                                if (!data.result) {
                                    AlertMessage(data.msg);
                                    console.log("msg :" + data.msg);
                                    return;
                                }
                                AlertMessage("Se ha Actualizado la Tela");
                                ActualizarDataGrid();
                                console.log("msg :" + data.msg);
                                dialog.close();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            console.log("Request Failed: " + error);
                            dialog.close();
                        });

                        dialog.close();
                    },
                    error: function (e) {
                        console.log("Error obtener Datos de Telas : [ " + e + " ]")
                    }
                }
            ]
        }).setSize(BootstrapDialog.SIZE_WIDE);
    });
    //Eliminar las telas de la cotizacion
    $("#btnDeleteTela").on("click", function (e) {
        //'strData=' + encodeURIComponent(JSON.stringify(mCotizacion))
        var vrRuta = '';
        var data = $("#gridTela").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            if ((item.ECotizacionTelas.SCECFlgDDP != "N" && item.ECotizacionTelas.SCECFlgMDDP != "N")) {
                AlertMessage("No se puede Modificar. Telas Modificadas por DDP.");
                return;
            }

            /*var mCotizacion = {
                ECotizacionTelas: {
                    SCECDesArt: item.ECotizacionTelas.SCECDesArt,
                    SCESFlgAvTe: item.ECotizacionTelas.SCESFlgAvTe,
                    SCECTit: item.ECotizacionTelas.SCECTit,
                    SCENDens: item.ECotizacionTelas.SCENDens,
                    SCECFlgMDDP: item.ECotizacionTelas.SCECFlgMDDP,
                    SCECFlgDDP: item.ECotizacionTelas.SCECFlgDDP,
                    SCECTipLav: item.ECotizacionTelas.SCECTipLav,
                    SCEQComAl: item.ECotizacionTelas.SCEQComAl,
                    SCEQComPo: item.ECotizacionTelas.SCEQComPo,
                    SCEQComVi: item.ECotizacionTelas.SCEQComVi,
                    SCEQComSp: item.ECotizacionTelas.SCEQComSp,
                    SCEQComOt: item.ECotizacionTelas.SCEQComOt,
                    SCECDesOt: item.ECotizacionTelas.SCECDesOt,
                    SCECObsAdi: item.ECotizacionTelas.SCECObsAdi,
                    SCECObsTel: item.ECotizacionTelas.SCECObsTel,
                    SCECFlgPesTe: item.ECotizacionTelas.SCECFlgPesTe,
                    SCECFlgLisI: item.ECotizacionTelas.SCECFlgLisI,
                    SCECFlgLisF: item.ECotizacionTelas.SCECFlgLisF,
                    SCECFlgSol: item.ECotizacionTelas.SCECFlgSol,
                    SCECFlgFulC: item.ECotizacionTelas.SCECFlgFulC,
                    SCECFlgHeath: item.ECotizacionTelas.SCECFlgHeath,
                    SCECFlgMelan: item.ECotizacionTelas.SCECFlgMelan,
                    SCECFlgTip: item.ECotizacionTelas.SCECFlgTip,
                    SCECFlgAcEs: item.ECotizacionTelas.SCECFlgAcEs,
                    SCENTel: item.ECotizacionTelas.SCENTel,
                },

            };*/
            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/CotizacionTelas/RemoveTelasSDCVirtual',
                type: 'POST',
                data: JSON.stringify(item),
                beforeSend: function () { },
                success: function (data) {
                    if (!data.result) {
                        AlertMessage(data.msg);
                        console.log("msg :" + data.msg);
                        return;
                    }
                    AlertMessage("Se ha Eliminado la Tela seleccionada");
                    ActualizarDataGrid();
                    console.log("msg :" + data.msg);
                    dialog.close();
                }
            }).fail(function (jqxhr, textStatus, error) {
                console.log("Request Failed: " + error);
                dialog.close();
            });
        }
        else {
            AlertMessage("Debe de seleccionar un registro");
            return;
        }
    });
    // Cambiar Tela Normal
    $("#btnReloadTelaNormal").on("click", function (e) {
        var vrRuta = '';
        var data = $("#gridTela").data("kendoGrid");
        var item = data.dataItem(data.select());
        var vrprocesos = "";
        if (item != undefined) {
            if ((item.ECotizacionTelas.SCECFlgDDP != "N" && item.ECotizacionTelas.SCECFlgMDDP != "N") ||
                (item.ECotizacionTelas.SCECFlgDDP != "N" && item.ECotizacionTelas.SCECFlgMDDP != "S" && item.ECotizacionTelas.SCECObsTel != item.ECotizacionTelas.SCECObsOri)) {

                AlertMessage("No se puede Modificar. Telas Modificadas por DDP.");
                return;
            }
            $.each(item.ListMProcesoTela, function (i, val) {
                vrprocesos += (vrprocesos == "" || vrprocesos == undefined) ? val.EProcesoTela.SCEPrcCCOD : "," + val.EProcesoTela.SCEPrcCCOD;
            });


            var mCotizacion = {
                ECotizacionTelas: {
                    SCECDesArt: item.ECotizacionTelas.SCECDesArt,
                    SCESFlgAvTe: 'N',
                    SCECTit: item.ECotizacionTelas.SCECTit,
                    SCENDens: item.ECotizacionTelas.SCENDens,
                    SCECFlgMDDP: item.ECotizacionTelas.SCECFlgMDDP,
                    SCECFlgDDP: item.ECotizacionTelas.SCECFlgDDP,
                    SCECTipLav: item.ECotizacionTelas.SCECTipLav,
                    SCEQComAl: item.ECotizacionTelas.SCEQComAl,
                    SCEQComPo: item.ECotizacionTelas.SCEQComPo,
                    SCEQComVi: item.ECotizacionTelas.SCEQComVi,
                    SCEQComSp: item.ECotizacionTelas.SCEQComSp,
                    SCEQComOt: item.ECotizacionTelas.SCEQComOt,
                    SCECDesOt: item.ECotizacionTelas.SCECDesOt,
                    SCECObsAdi: item.ECotizacionTelas.SCECObsAdi,
                    SCECObsTel: item.ECotizacionTelas.SCECObsTel,
                    SCECObsOri: item.ECotizacionTelas.SCECObsOri,
                    SCECFlgPesTe: item.ECotizacionTelas.SCECFlgPesTe,
                    SCECFlgLisI: item.ECotizacionTelas.SCECFlgLisI,
                    SCECFlgLisF: item.ECotizacionTelas.SCECFlgLisF,
                    SCECFlgSol: item.ECotizacionTelas.SCECFlgSol,
                    SCECFlgFulC: item.ECotizacionTelas.SCECFlgFulC,
                    SCECFlgHeath: item.ECotizacionTelas.SCECFlgHeath,
                    SCECFlgMelan: item.ECotizacionTelas.SCECFlgMelan,
                    SCECFlgTip: item.ECotizacionTelas.SCECFlgTip,
                    SCECFlgAcEs: item.ECotizacionTelas.SCECFlgAcEs,
                    SCENTel: item.ECotizacionTelas.SCENTel,
                },
                StrCodsProcesos: vrprocesos
            };
            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/CotizacionTelas/AddTelasSDCVirtual',
                type: 'POST',
                data: JSON.stringify(mCotizacion),
                beforeSend: function () { },
                success: function (data) {
                    if (!data.result) {
                        AlertMessage(data.msg);
                        console.log("msg :" + data.msg);
                        return;
                    }
                    AlertMessage("Se ha Actualizado a Tela Normal");
                    ActualizarDataGrid();
                    console.log("msg :" + data.msg);
                }
            }).fail(function (jqxhr, textStatus, error) {
                console.log("Request Failed: " + error);
            });

        }
        else {
            AlertMessage("Debe de seleccionar un registro");
            return;
        }

    });
    // Cambiar Avío Textil
    $("#btnReloadAvioTextil").on("click", function (e) {
        var vrRuta = '';
        var data = $("#gridTela").data("kendoGrid");
        var item = data.dataItem(data.select());
        var vrprocesos = "";
        if (item != undefined) {
            if ((item.ECotizacionTelas.SCECFlgDDP != "N" && item.ECotizacionTelas.SCECFlgMDDP != "N") ||
                (item.ECotizacionTelas.SCECFlgDDP != "N" && item.ECotizacionTelas.SCECFlgMDDP != "S" && item.ECotizacionTelas.SCECObsTel != item.ECotizacionTelas.SCECObsOri)) {
                AlertMessage("No se puede Modificar. Telas Modificadas por DDP.");
                return;
            }

            $.each(item.ListMProcesoTela, function (i, val) {
                vrprocesos += (vrprocesos == "" || vrprocesos == undefined) ? val.EProcesoTela.SCEPrcCCOD : "," + val.EProcesoTela.SCEPrcCCOD;
            });


            var mCotizacion = {
                ECotizacionTelas: {
                    SCECDesArt: item.ECotizacionTelas.SCECDesArt,
                    SCESFlgAvTe: 'S',
                    SCECTit: item.ECotizacionTelas.SCECTit,
                    SCENDens: item.ECotizacionTelas.SCENDens,
                    SCECFlgMDDP: item.ECotizacionTelas.SCECFlgMDDP,
                    SCECFlgDDP: item.ECotizacionTelas.SCECFlgDDP,
                    SCECTipLav: item.ECotizacionTelas.SCECTipLav,
                    SCEQComAl: item.ECotizacionTelas.SCEQComAl,
                    SCEQComPo: item.ECotizacionTelas.SCEQComPo,
                    SCEQComVi: item.ECotizacionTelas.SCEQComVi,
                    SCEQComSp: item.ECotizacionTelas.SCEQComSp,
                    SCEQComOt: item.ECotizacionTelas.SCEQComOt,
                    SCECDesOt: item.ECotizacionTelas.SCECDesOt,
                    SCECObsAdi: item.ECotizacionTelas.SCECObsAdi,
                    SCECObsTel: item.ECotizacionTelas.SCECObsTel,
                    SCECObsOri: item.ECotizacionTelas.SCECObsOri,
                    SCECFlgPesTe: item.ECotizacionTelas.SCECFlgPesTe,
                    SCECFlgLisI: item.ECotizacionTelas.SCECFlgLisI,
                    SCECFlgLisF: item.ECotizacionTelas.SCECFlgLisF,
                    SCECFlgSol: item.ECotizacionTelas.SCECFlgSol,
                    SCECFlgFulC: item.ECotizacionTelas.SCECFlgFulC,
                    SCECFlgHeath: item.ECotizacionTelas.SCECFlgHeath,
                    SCECFlgMelan: item.ECotizacionTelas.SCECFlgMelan,
                    SCECFlgTip: item.ECotizacionTelas.SCECFlgTip,
                    SCECFlgAcEs: item.ECotizacionTelas.SCECFlgAcEs,
                    SCENTel: item.ECotizacionTelas.SCENTel,
                },
                StrCodsProcesos: vrprocesos
            };
            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/CotizacionTelas/AddTelasSDCVirtual',
                type: 'POST',
                data: JSON.stringify(mCotizacion),
                beforeSend: function () { },
                success: function (data) {
                    if (!data.result) {
                        AlertMessage(data.msg);
                        console.log("msg :" + data.msg);
                        return;
                    }
                    AlertMessage("Se ha Actualizado a Avío Textil");
                    ActualizarDataGrid();
                    console.log("msg :" + data.msg);
                }
            }).fail(function (jqxhr, textStatus, error) {
                console.log("Request Failed: " + error);
            });

        }
        else {
            AlertMessage("Debe de seleccionar un registro");
            return;
        }

    });
    // Previsualizar Imagen
    $("#btnViewJpg").on("click", function () {

        var vrImagen = $("#txtSCECImgRC").val();
        var vrRuta = '';
        if (vrImagen.length == 0) {
            AlertMessage("No ha seleccionado ninguna imagen para mostrar");
            return;
        }
        if (vrImagen.split('\\').length > 1) {
            vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaImg=" + vrImagen);
            BootstrapDialog.show({
                title: 'Imagen JPG',
                message: $('<img src="' + vrRuta + '" class="img-responsive" alt="Responsive image">'),
            });
        }
        else {

            let reader = new FileReader();
            reader.readAsDataURL($("#idFileImg")[0].files[0]);
            reader.onload = function () {
                let image = document.createElement('img');
                image.src = reader.result;
                image.classList.add("img-responsive");
                BootstrapDialog.show({
                    title: 'Imagen JPG',
                    message: $('<div></div>').append(image),
                });
            };
        }

    });
    // Previsualizar Imagen
    $("#btnViewPDF").on("click", function () {

        var vrPDF = $("#txtSCECArcRC").val();
        var vrRuta = '';
        if (vrPDF.length == 0) {
            AlertMessage("No ha seleccionado ningún Archivo PDF para mostrar");
            return;
        }
        if (vrPDF.split('\\').length > 1) {
            vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaPDF=" + vrPDF);
            $(this).attr("href", vrRuta)
        }
        else {
            pdffile_url = URL.createObjectURL($("#idFilePdf")[0].files[0]);
            $(this).attr("href", pdffile_url);

        }

    });

    // Previsualizar Imagen
    $("#btnDonwloadZIP").on("click", function () {

        var vrZip = $("#txtSCECUbiArcZip").val();
        var vrRuta = '';
        if (vrZip.length == 0) {
            AlertMessage("No ha seleccionado ningún Archivo ZIP o RAR para Descargar");
            return;
        }
        if (vrZip.split('\\').length > 1) {
            vrRuta = Enrutamiento($(this).attr('data-url'), "StrRutaZip=" + vrZip);
            $(this).attr("href", vrRuta)
        }
        else {
            pdffile_url = URL.createObjectURL($("#idFileZip")[0].files[0]);
            $(this).attr("href", pdffile_url);

        }

    });
    $("#idFileImg").change(function () {
        var files = $(this).prop("files");
        if (this.value.length > 0) {
            var ext = this.value.match(/\.(.+)$/)[1];
            switch (ext) {
                case 'jpg':
                case 'jpeg':
                    var names = $.map(files, function (val) { return val.name; });
                    if (names[0] != null || names[0] != undefined) {
                        $("#txtSCECImgRC").val(names[0]);
                    }
                    break;
                default:
                    AlertMessage('El archivo seleccionado no es un JPG');
                    this.value = '';
            }
        }
    });

    $("#idFilePdf").change(function () {
        var files = $(this).prop("files");
        if (this.value.length > 0) {
            var ext = this.value.match(/\.(.+)$/)[1];
            switch (ext) {
                case 'pdf':
                    var names = $.map(files, function (val) { return val.name; });
                    if (names[0] != null || names[0] != undefined) {
                        $("#txtSCECArcRC").val(names[0]);
                    }
                    break;
                default:
                    AlertMessage('El archivo seleccionado no es un PDF');
                    this.value = '';
            }
        }
    });

    $("#idFileZip").change(function () {
        var files = $(this).prop("files");
        if (this.value.length > 0) {
            var ext = this.value.match(/\.(.+)$/)[1];
            switch (ext) {
                case 'zip':
                case 'rar':
                    var names = $.map(files, function (val) { return val.name; });
                    if (names[0] != null || names[0] != undefined) {
                        $("#txtSCECUbiArcZip").val(names[0]);
                    }
                    break;
                default:
                    AlertMessage('El archivo seleccionado no es un ZIP o RAR');
                    this.value = '';
            }
        }
    });

    $("#chkSCECFlgArcZIP").change(function () {
        this.checked ? $('#btnBuscarZip').removeClass('disabled') : $('#btnBuscarZip').addClass('disabled');
        if (!this.checked) $('#txtSCECUbiArcZip').val('');
    });

    $("#chkSCECFlgArcRC").change(function () {
        this.checked ? $('#btnBuscarPdf').removeClass('disabled') : $('#btnBuscarPdf').addClass('disabled');
        if (!this.checked) $('#txtSCECArcRC').val('');
    });

    $("#chkSCECFlgImgRC").change(function () {
        this.checked ? $('#btnBuscarJpg').removeClass('disabled') : $('#btnBuscarJpg').addClass('disabled');
        if (!this.checked) $('#txtSCECImgRC').val('');
    });
    // Cambio de Valor de CBO Artes
    $("#idcboArte").change(function () {
        if (this.value == 'S') {
            $("#lblSCECFlgFulCob").css("display", "block");
            $("#lblSCECIndSpeA").css("display", "block");
            $("#idcboSentido").attr('disabled', false);
            $("#idcboSentido").attr('disabled', false);
            $("#txtSCEDEstmp").attr('disabled', false);
            $("#txtSCEDBorda").attr('disabled', false);
            $("#txtSCEDAplServ").attr('disabled', false);
            $("#txtSCEDArtOt").attr('disabled', false);
            $("#txtSCEDUbiEstm").attr('disabled', false);
            $("#txtSCEDUbiBord").attr('disabled', false);
            $("#txtSCEDUbiApl").attr('disabled', false);
            $("#txtSCEDUbiOt").attr('disabled', false);
            $("#txtSCEQCstEstm").attr('disabled', false);
            $("#txtSCEQCstBord").attr('disabled', false);
            $("#txtSCEQCstApl").attr('disabled', false);
            $("#txtSCEQCstOt").attr('disabled', false);
        } else {
            $("#lblSCECFlgFulCob").css("display", "none");
            $("#lblSCECIndSpeA").css("display", "none");
            $("#idcboSentido").val('');
            $("#txtSCEDEstmp").val('');
            $("#txtSCEDBorda").val('');
            $("#txtSCEDAplServ").val('');
            $("#txtSCEDArtOt").val('');
            $("#txtSCEDUbiEstm").val('');
            $("#txtSCEDUbiBord").val('');
            $("#txtSCEDUbiApl").val('');
            $("#txtSCEDUbiOt").val('');
            $("#txtSCEQCstEstm").val('0');
            $("#txtSCEQCstBord").val('0');
            $("#txtSCEQCstApl").val('0');
            $("#txtSCEQCstOt").val('0');


            $("#idcboSentido").attr('disabled', true);
            $("#txtSCEDEstmp").attr('disabled', true);
            $("#txtSCEDBorda").attr('disabled', true);
            $("#txtSCEDAplServ").attr('disabled', true);
            $("#txtSCEDArtOt").attr('disabled', true);
            $("#txtSCEDUbiEstm").attr('disabled', true);
            $("#txtSCEDUbiBord").attr('disabled', true);
            $("#txtSCEDUbiApl").attr('disabled', true);
            $("#txtSCEDUbiOt").attr('disabled', true);
            $("#txtSCEQCstEstm").attr('disabled', true);
            $("#txtSCEQCstBord").attr('disabled', true);
            $("#txtSCEQCstApl").attr('disabled', true);
            $("#txtSCEQCstOt").attr('disabled', true);

        }
    });// Cambio de Valor de CBO Artes
    $("#idcboLavado").change(function () {
        if (this.value == 'S') {
            $("#txtSCEDLavCli").attr('disabled', false);
        } else {
            $("#txtSCEDLavCli").val('');

            $("#txtSCEDLavCli").attr('disabled', true);

        }
    });
});

function ActualizarDataGrid() {
    var grid = $('#gridTela').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}