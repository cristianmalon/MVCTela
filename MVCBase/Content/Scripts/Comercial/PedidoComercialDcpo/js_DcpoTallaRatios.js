$(document).ready((e) => {

    var gridTallasRatiiosMasivos = $("#gridTallasRatiiosMasivos");
    gridTallasRatiiosMasivos.html('');
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/PedidoComercialTalla/ListarPaginadoTallasbyKeyMasivo',
        type: 'POST',
        data: JSON.stringify({ SerialKey: $("#frmModelDcpoTallasyCombinaciones").find("input[id='serialKeytalla']").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (result) {
            desbloqObject();

            if (result.data != null && result.columns != null) {
                debugger;
                var model = generateModel(result);
                var columns = generateColumnsWithFooterTemplate2(result);
                console.log(model);
                console.log(columns);
                var dataSource = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            options.success(result.data);
                        }
                    },
                    change: function (e) {
                        if (e.action == "itemchange") {
                            var grid = $(gridTallasRatiiosMasivos).data("kendoGrid");
                            var headerCells = grid.element.find("th");
                            var cellIndex = headerCells.index(grid.element.find("th[data-field = '" + "_TOTAL" + "']"));
                            var rowCells = grid.element.find("tr[data-uid=" + e.items[0].uid + "] td");
                            var cell = $(rowCells[cellIndex - 1]);
                            var dataarray = e.items.length > 0 ? e.items[0] : null;

                            var total = 0;
                            $.each(dataarray._CODCOLDESC.split("#"), function (index, row) {
                                total += e.items[0]["_" + row];
                                e.items[0]["_TOTAL"] = total;
                                cell.text(total);
                            });

                        }
                    },
                    pageSize: 1000,
                    batch: true,
                    schema: {
                        model: model
                    }
                });

                gridTallasRatiiosMasivos.kendoGrid({
                    dataSource: dataSource,
                    scrollable: true,
                    height: 80,
                    selectable: true,
                    noRecords: {
                        template: '<br/> ' +
                            ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                            ' <div class="alert alert-warning alert-dismissable" align="center"> ' +
                            ' NO SE ENCONTRARON TALLAS REGISTRADAS EN LA DCPO SELECCIONADA ' +
                            ' </div> ' +
                            ' </div>'
                    },
                    columns: [{
                        title: "<div align='center'><b><i>Carga masiva para todos los combos de la DCPO</i></b></div>",
                        columns: columns,
                    }],

                    scrollable: true,
                    pageable: false,
                    editable: true,
                    navigatable: true,
                    dataBound: function (e) {
                        
                        var grid = e.sender;
                        var items = grid.items();

                        items.each(function (idx, row) {
                            debugger;
                            var gridx = $("#gridTallasRatiiosMasivos").data("kendoGrid");
                            var dataItem = gridx.dataItem(row);

                            var headerCells = gridx.element.find("th");
                            var cellIndex = headerCells.index(gridx.element.find("th[data-field = '" + "_TOTAL" + "']"));
                            var rowCells = gridx.element.find("tr[data-uid=" + dataItem.uid + "] td");
                            var cell = $(rowCells[cellIndex - 1]);
                            var dataarray = dataItem;

                            var total = 0;
                            $.each(dataarray._CODCOLDESC.split("#"), function (index, row) {
                                debugger;
                                total += dataItem["_" + row];
                                dataItem["_TOTAL"] = total;
                                cell.text(total);
                            });

                        });

                    }
                }).data("kendoGrid");

                var t = $("#gridTallasRatiiosMasivos .k-group-footer"); //get all grouping rows
                $.each(t, function (key, elem) {
                    $(elem).addClass("grouping-ms-row-" + (key + 1));
                });


                //HIDE COLUMNS AFTER LOAD
                var grid = $(gridTallasRatiiosMasivos).data("kendoGrid");
                grid.hideColumn("_EmpCCod");
                grid.hideColumn("_OPCCTipPC");
                grid.hideColumn("_OPCNAno");
                grid.hideColumn("_OPCNNro");
                grid.hideColumn("_OPCNItemDsp");
                grid.hideColumn("_OPCNItemRC");
                grid.hideColumn("_OPCNItemD");
                grid.hideColumn("_OPCNCmb");
                grid.hideColumn("_CODCOL");
                grid.hideColumn("_CODCOLDESC");
                grid.hideColumn("_ROW");
                grid.hideColumn("_COD_COMBINACION");
                grid.hideColumn("_IdTipoEmpaque");
                grid.hideColumn("_IdRatioCliente");
                grid.hideColumn("_OPCCliCCod");
                grid.hideColumn("_ESTILO_ARTE");
                grid.hideColumn("_PREC_COMBINACION");

                //CUSTOM TITTLE COLUMNS
                $(gridTallasRatiiosMasivos.find("th[data-field=_COD_COMBINACION]")).html("<div> Código de <br/> Combinacion </div>");
                $(gridTallasRatiiosMasivos.find("th[data-field=_NOM_COMBINACION]")).html("<div> Nombre de <br/> Combinacion </div>");
                $(gridTallasRatiiosMasivos.find("th[data-field=_DCPOPCNEMQNCOD]")).html("<div> Empaque </div>");
                $(gridTallasRatiiosMasivos.find("th[data-field=_Conceptos]")).html("<div> Concepto </div>");
                $(gridTallasRatiiosMasivos.find("th[data-field=_TOTAL]")).html("<div> Total </div>");
                $(gridTallasRatiiosMasivos.find("th[data-field=_TOT_PRENDA]")).html("<div> N° Prendas<br\> Totales </div>");
            }

            else {

                gridTallasRatiiosMasivos.kendoGrid({
                    dataSource: null,
                    pageable: false,
                    scrollable: true,
                    noRecords: {
                        template: '<br/> ' +
                            ' <div> ' +
                            ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' + ' <div class="alert alert-warning alert-dismissable" align="center"> ' +
                            ' NO SE ENCONTRARON TALLAS REGISTRADAS EN LA DCPO SELECCIONADA ' +
                            ' </div> ' +
                            ' </div> ' +
                            ' </div>'
                    },
                    //toolbar: function () {
                    //    return kendo.template($("#templateTallasDcpo").html())(e.data);
                    //},
                    columns: [{
                        title: "<div> Código de Combinacion <br/> de Prenda del Cliente </div>"
                    }, {
                        title: "<div> Nombre de Combinacion <br/> de Prenda del Cliente </div>   "
                    }, {
                        title: "<div> Precio ($) </div>"
                    }]
                }).data("kendoGrid");

            }
        }
    });



    var gridTallasRatiosCliente = $("#gridTallasRatiosCliente");
    gridTallasRatiosCliente.html('');
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/PedidoComercialTalla/ListarPaginadoTallasbyKey',
        type: 'POST',
        data: JSON.stringify({ SerialKey: $("#frmModelDcpoTallasyCombinaciones").find("input[id='serialKeytalla']").val() }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (result) {
            desbloqObject();

            if (result.data != null && result.columns != null) {
                var model = generateModel(result);
                var columns = generateColumnsWithFooterTemplate(result);

                var dataSource = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            options.success(result.data);
                        }
                    },
                    change: function (e) {
                        console.log('entro al cambio');
                        //&& e.action == "itemchange"
                        if (e.action == "itemchange") {
                            var grid = $(gridTallasRatiosCliente).data("kendoGrid");
                            var headerCells = grid.element.find("th");
                            var cellIndex = headerCells.index(grid.element.find("th[data-field = '" + "_TOTAL" + "']"));
                            var rowCells = grid.element.find("tr[data-uid=" + e.items[0].uid + "] td");
                            var cell = $(rowCells[cellIndex - 2]);
                            var dataarray = e.items.length > 0 ? e.items[0] : null;


                            var total = 0;
                            $.each(dataarray._CODCOLDESC.split("#"), function (index, row) {
                                total += e.items[0]["_" + row];
                                e.items[0]["_TOTAL"] = total;
                                cell.text(total);
                            });

                            dataarray._IdRatioCliente = 0;
                            var acumulador = 0;
                            var rowTalla = "";
                            var lastValue = 0;
                            var lastRow = 0;
                            var totalPrenda = e.items[0]._TOT_PRENDA;
                            $.each(dataarray._CODCOLDESC.split("#"), function (index, row) {
                                total = e.items[0]["_TOTAL"];
                                if (e.items[0]["_" + row] > 0) {
                                    var valor = (e.items[0]._TOT_PRENDA * e.items[0]["_" + row]) / total
                                    $(".grouping-row-" + e.items[0]._ROW).find("span[id='" + row + "']").html(Math.round(valor));
                                    acumulador += Math.round(valor);
                                    lastValue = Math.round(valor);

                                    lastRow = e.items[0]._ROW;
                                    rowTalla = row;
                                }else {
                                    $(".grouping-row-" + e.items[0]._ROW).find("span[id='" + row + "']").html(0);
                                }

                            });
                            if (acumulador > totalPrenda) {
                                acumulador = acumulador - totalPrenda;
                                lastValue = lastValue - acumulador;
                                $(".grouping-row-" + lastRow).find("span[id='" + rowTalla + "']").html(Math.round(lastValue));
                            } else if (acumulador < totalPrenda) {
                                acumulador = totalPrenda - acumulador;
                                lastValue = lastValue + acumulador;
                                $(".grouping-row-" + lastRow).find("span[id='" + rowTalla + "']").html(Math.round(lastValue));
                            }
                            $(".grouping-row-" + lastRow).find("span[id='TOTAL']").html(Math.round(e.items[0]._TOT_PRENDA));
                        }
                    },

                    group: [{ field: "_ROW", }],
                    pageSize: 1000,
                    batch: true,
                    schema: {
                        model: model
                    }
                });

                gridTallasRatiosCliente.kendoGrid({
                    dataSource: dataSource,

                    scrollable: true,
                    height: 400,
                    selectable: true,
                    noRecords: {
                        template: '<br/> ' +
                            ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                            ' <div class="alert alert-warning alert-dismissable" align="center"> ' +
                            ' NO SE ENCONTRARON TALLAS REGISTRADAS EN LA DCPO SELECCIONADA ' +
                            ' </div> ' +
                            ' </div>'
                    },
                    //toolbar: function () {
                    //    return kendo.template($("#templateTallasDcpo").html())(e.data);
                    //},
                    columns: [{
                        title: "<div align='center'><b> RATIO x TALLAS </b></div>",
                        columns: columns,
                    }],

                    scrollable: true,
                    pageable: false,
                    editable: true,
                    navigatable: true,
                    dataBound: function (e) {
                        console.log('ingreso al dataBound');
                        var grid = e.sender;
                        var items = grid.items();

                        var t = $("#gridTallasRatiosCliente .k-group-footer");
                        $.each(t, function (key, elem) {
                            $(elem).addClass("grouping-row-" + (key + 1));
                        });

                        items.each(function (idx, row) {
                            var gridx = $(gridTallasRatiosCliente).data("kendoGrid");
                            var dataItem = gridx.dataItem(row);

                            var grid = $(gridTallasRatiosCliente).data("kendoGrid");
                            var headerCells = gridx.element.find("th");
                            var cellIndex = headerCells.index(gridx.element.find("th[data-field = '" + "_TOTAL" + "']"));
                            var rowCells = gridx.element.find("tr[data-uid=" + dataItem.uid + "] td");
                            var cell = $(rowCells[cellIndex - 2]);
                            var dataarray = dataItem;

                            var total = 0;
                            $.each(dataarray._CODCOLDESC.split("#"), function (index, row) {
                                total += dataItem["_" + row];
                                dataItem["_TOTAL"] = total;
                                cell.text(total);
                            });
                            var acumulador = 0;
                            var rowTalla = "";
                            var lastValue = 0;
                            var lastRow = 0;
                            var totalPrenda = dataItem._TOT_PRENDA;
                            $.each(dataarray._CODCOLDESC.split("#"), function (index, row) {
                                total = dataItem["_TOTAL"];
                                if (dataItem["_" + row] > 0) {
                                    var valor = (dataItem._TOT_PRENDA * dataItem["_" + row]) / total
                                    $(".grouping-row-" + dataItem._ROW).find("span[id='" + row + "']").html(Math.round(valor));
                                    acumulador += Math.round(valor);
                                    lastValue = Math.round(valor);

                                    lastRow = dataItem._ROW;
                                    rowTalla = row;
                                }

                            });
                            if (acumulador > totalPrenda) {
                                acumulador = acumulador - totalPrenda;
                                lastValue = lastValue - acumulador;
                                $(".grouping-row-" + lastRow).find("span[id='" + rowTalla + "']").html(Math.round(lastValue));
                            } else if (acumulador < totalPrenda) {
                                acumulador = totalPrenda - acumulador;
                                lastValue = lastValue + acumulador;
                                $(".grouping-row-" + lastRow).find("span[id='" + rowTalla + "']").html(Math.round(lastValue));
                            }
                            $(".grouping-row-" + lastRow).find("span[id='TOTAL']").html(Math.round(dataItem._TOT_PRENDA));
                        });

                    }
                }).data("kendoGrid");

                var t = $("#gridTallasRatiosCliente .k-group-footer"); //get all grouping rows
                $.each(t, function (key, elem) {
                    $(elem).addClass("grouping-row-" + (key + 1));
                });


                //HIDE COLUMNS AFTER LOAD
                var grid = $(gridTallasRatiosCliente).data("kendoGrid");
                grid.hideColumn("_EmpCCod");
                grid.hideColumn("_OPCCTipPC");
                grid.hideColumn("_OPCNAno");
                grid.hideColumn("_OPCNNro");
                grid.hideColumn("_OPCNItemDsp");
                grid.hideColumn("_OPCNItemRC");
                grid.hideColumn("_OPCNItemD");
                grid.hideColumn("_OPCNCmb");
                grid.hideColumn("_CODCOL");
                grid.hideColumn("_CODCOLDESC");
                grid.hideColumn("_ROW");
                grid.hideColumn("_COD_COMBINACION");
                grid.hideColumn("_IdTipoEmpaque");
                grid.hideColumn("_IdRatioCliente");
                grid.hideColumn("_OPCCliCCod");
                grid.hideColumn("_ESTILO_ARTE");
                grid.hideColumn("_PREC_COMBINACION");

                //CUSTOM TITTLE COLUMNS
                $(gridTallasRatiosCliente.find("th[data-field=_COD_COMBINACION]")).html("<div> Código de <br/> Combinacion </div>");
                $(gridTallasRatiosCliente.find("th[data-field=_NOM_COMBINACION]")).html("<div> Nombre de <br/> Combinacion </div>");
                $(gridTallasRatiosCliente.find("th[data-field=_DCPOPCNEMQNCOD]")).html("<div> Empaque </div>");
                $(gridTallasRatiosCliente.find("th[data-field=_Conceptos]")).html("<div> Concepto </div>");
                $(gridTallasRatiosCliente.find("th[data-field=_TOTAL]")).html("<div> Total </div>");
                $(gridTallasRatiosCliente.find("th[data-field=_TOT_PRENDA]")).html("<div> N° Prendas<br\> Totales </div>");
            }

            else {

                gridTallasRatiosCliente.kendoGrid({
                    dataSource: null,
                    pageable: false,
                    scrollable: true,
                    noRecords: {
                        template: '<br/> ' +
                            ' <div> ' +
                            ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' + ' <div class="alert alert-warning alert-dismissable" align="center"> ' +
                            ' NO SE ENCONTRARON TALLAS REGISTRADAS EN LA DCPO SELECCIONADA ' +
                            ' </div> ' +
                            ' </div> ' +
                            ' </div>'
                    },
                    //toolbar: function () {
                    //    return kendo.template($("#templateTallasDcpo").html())(e.data);
                    //},
                    columns: [{
                        title: "<div> Código de Combinacion <br/> de Prenda del Cliente </div>"
                    }, {
                        title: "<div> Nombre de Combinacion <br/> de Prenda del Cliente </div>   "
                    }, {
                        title: "<div> Precio ($) </div>"
                    }]
                }).data("kendoGrid");

            }
        }
    });

    function generateColumnsWithFooterTemplate(response) {
        var columnNames = response["columns"];
        var cols = columnNames.map(function (name) {
            var _name = name.split('-').length > 1 ? name.split('-')[0] : name;
            var footer = name.split('-').length > 1 ? name.split('-')[1] : "";
            return {
                field: "_" + _name,
                title: _name.replace("___", "-"),
                format: (isDateField[_name] ? "{0:D}" : ""),
                groupHeaderTemplate: _name == "ROW" ? "<span>Color: #= value  #</span>" : "",
                groupFooterTemplate: (footer == "footer") ? "Prendas" : (footer == "footerNumber" || _name == "TOTAL") ? "<span id='" + _name + "'>0</span>" : "",
                width: (footer == "footer" || _name == "TOTAL") ? "15%" : (footer == "footerNumber") ? "9%" : 130,
            };
        });
        cols.push({ command: { text: "asignar", click: showDetails }, title: " ", width: "80px" });

        return cols;
    }

    function generateColumnsWithFooterTemplate2(response) {
       // debugger;
        var columnNames = response["columns"];
        var cols = columnNames.map(function (name) {
            var _name = name.split('-').length > 1 ? name.split('-')[0] : name;
            var footer = name.split('-').length > 1 ? name.split('-')[1] : "";
            return {
                field: "_" + _name,
                title: _name.replace("___", "-"),
                format: (isDateField[_name] ? "{0:D}" : ""),
                groupHeaderTemplate: _name == "ROW" ? "<span>Color: #= value  #</span>" : "",
                groupFooterTemplate: (footer == "footer") ? "Prendas" : (footer == "footerNumber" || _name == "TOTAL") ? "<span id='" + _name + "'>0</span>" : "",
                width: (footer == "footer" || _name == "TOTAL") ? "15%" : (footer == "footerNumber") ? "9%" : 130,
                editable: _name == "TOTAL" ? true : false
            };
        });
        cols.push({ command: { text: "Carga Masiva", click: showDetails2 }, title: " ", width: "120px" });
        cols.push({ command: { text: "Asignar", click: showDetails3 }, title: " ", width: "80px" });
        return cols;
    }

    function showDetails(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        debugger;
        var codigocliente = $.trim(dataItem._OPCCliCCod);
        var idtipoempaque = dataItem._IdTipoEmpaque;
        BootstrapDialog.show({
            title: 'Ratios configurados Cliente',
            cssClass: 'size-wide-dialog-1200',
            type: BootstrapDialog.TYPE_SUCCESS,
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento('../../ratio/SearchRatioMant', "codcliente=" + codigocliente + "&idEmpaque=" + idtipoempaque)),
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
                        var data = $("#gridRatioCliente").data("kendoGrid");
                        var item = data.dataItem(data.select());

                        if (item != undefined) {

                            var dataDetail = $("#gridTallas").data("kendoGrid");
                            var listData = dataDetail.dataSource._data;
                            if (listData == undefined || listData == null || listData.length == 0) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'SISTEMA',
                                    text: 'La configuración de Ratio Seleccionada no cuenta con tallas asginadas',
                                });
                                return;
                            }
                            var cantidadTalla1 = listData.length;
                            var cantidadTalla2 = dataItem._CODCOL.split('#').length;

                            if (cantidadTalla1 != cantidadTalla2) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'SISTEMA',
                                    text: 'Las tallas del Ratio Seleccionado no es igual a las tallas de la combinación del DCPO',
                                });
                                return;
                            }

                            $.each(listData, function (index, row) {
                                if (dataItem._CODCOL.indexOf(row.CodTalla) < 0) {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'SISTEMA',
                                        text: 'Las tallas del Ratio Seleccionado no es igual a las tallas de la combinación del DCPO',
                                    });
                                    return;
                                }
                            });

                            $.each(listData, function (index, row) {

                                var splitData = dataItem._CODCOLDESC.split('#');
                                $.each(splitData, function (index, row2) {
                                    if (row.Alternativo == row2) {
                                        dataItem["_" + row2] = row.Ratio;
                                    }
                                });
                                dataItem._IdRatioCliente = row.IdRatioCliente;
                            });

                            var datagrid = $("#gridTallasRatiosCliente").data("kendoGrid")
                            datagrid.dataSource.fetch();
                            dialog.close();

                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'SISTEMA',
                                text: 'Debe de Seleccionar un Registro.',
                            });
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos Cliente : [ " + e + " ]")
                    }
                }
            ]
        });
    }

    function showDetails3(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        debugger;
        var codigocliente = $.trim(dataItem._OPCCliCCod);
        var idtipoempaque = dataItem._IdTipoEmpaque;
        BootstrapDialog.show({
            title: 'Ratios configurados Cliente',
            cssClass: 'size-wide-dialog-1200',
            type: BootstrapDialog.TYPE_SUCCESS,
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento('../../ratio/SearchRatioMant', "codcliente=" + codigocliente + "&idEmpaque=" + idtipoempaque)),
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
                        var data = $("#gridRatioCliente").data("kendoGrid");
                        var item = data.dataItem(data.select());

                        if (item != undefined) {

                            var dataDetail = $("#gridTallas").data("kendoGrid");
                            var listData = dataDetail.dataSource._data;
                            if (listData == undefined || listData == null || listData.length == 0) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'SISTEMA',
                                    text: 'La configuración de Ratio Seleccionada no cuenta con tallas asginadas',
                                });
                                return;
                            }
                            var cantidadTalla1 = listData.length;
                            var cantidadTalla2 = dataItem._CODCOL.split('#').length;

                            if (cantidadTalla1 != cantidadTalla2) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'SISTEMA',
                                    text: 'Las tallas del Ratio Seleccionado no es igual a las tallas de la combinación del DCPO',
                                });
                                return;
                            }

                            $.each(listData, function (index, row) {
                                if (dataItem._CODCOL.indexOf(row.CodTalla) < 0) {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'SISTEMA',
                                        text: 'Las tallas del Ratio Seleccionado no es igual a las tallas de la combinación del DCPO',
                                    });
                                    return;
                                }
                            });

                            $.each(listData, function (index, row) {

                                var splitData = dataItem._CODCOLDESC.split('#');
                                $.each(splitData, function (index, row2) {
                                    if (row.Alternativo == row2) {
                                        dataItem["_" + row2] = row.Ratio;
                                    }
                                });
                                dataItem._IdRatioCliente = row.IdRatioCliente;
                            });

                            var datagrid = $("#gridTallasRatiiosMasivos").data("kendoGrid")
                            datagrid.dataSource.fetch();
                            dialog.close();

                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'SISTEMA',
                                text: 'Debe de Seleccionar un Registro.',
                            });
                        }
                    },
                    error: function (e) {
                        console.log("Error obtener Datos Cliente : [ " + e + " ]")
                    }
                }
            ]
        });
    }

    function showDetails2(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        debugger;
        var data = $("#gridTallasRatiosCliente").data("kendoGrid");
        var item = data.dataSource._data;

        if (item != undefined && item.length > 0) {
            $.each(item, function (Rowindex, Rowitem) {

                $.each(dataItem._CODCOL.split('#'), function (index, row) {
                    if (Rowitem._CODCOL.indexOf(row) < 0) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'SISTEMA',
                            text: 'Las tallas del Ratio Seleccionado no es igual a las tallas de la combinación del DCPO',
                        });
                        return;
                    }
                });

                var splitData = Rowitem._CODCOLDESC.split('#');
                $.each(splitData, function (index, row) {
                    Rowitem["_" + row] = dataItem["_" + row];
                });

                console.log('xasasfafsafasfasfafasfasfasfasfa', dataItem);

                Rowitem._IdRatioCliente = dataItem._IdRatioCliente;

            });
            var gridViewTalla = $(gridTallasRatiosCliente).data("kendoGrid");
            gridViewTalla.dataSource.fetch();
        }
    }


});