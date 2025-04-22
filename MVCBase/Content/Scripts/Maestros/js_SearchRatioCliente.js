$(document).ready((e) => {

    var gridRatioClienteSearch = $("#gridRatioClienteSearch");
    gridRatioClienteSearch.html('');
    var param = {
        CodCliente: $("#frmSearchRatioCliente").find("input[id='codcliente']").val(),
        IdTipoEmpaque: $("#frmSearchRatioCliente").find("input[id='idtipoempaque']").val(),
    };
    MethodPost("/Ratio/ListSearchRatio", JSON.stringify(param), "application/json")
        .done(function (response) {
            if (!response.Success) {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: `${response.mensaje}`,
                });
            } else {
                var model = generateModel(response);
                var columns = generateColumns(response);

                var dataSource = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            options.success(response.data);
                        }
                    },
                    pageSize: 15,
                    //batch: true,
                    schema: {
                        model: model
                    }
                });

                gridRatioClienteSearch.kendoGrid({
                    dataSource: dataSource,
                    pageable: true,
                    selectable: true,
                    resizable: true,
                    noRecords: {
                        template: '<br/> ' +
                            ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                            ' <div class="alert alert-warning alert-dismissable" align="center"> ' +
                            ' NO SE ENCONTRARON TALLAS REGISTRADAS EN LA DCPO SELECCIONADA ' +
                            ' </div> ' +
                            ' </div>'
                    },
                    
                    columns: columns,
                    dataBound: function () {
                        //var grid = $("#gridRatioClienteSearch").data("kendoGrid");
                        
                        //for (var i = 0; i < grid.columns.length; i++) {
                        //    grid.autoFitColumn(i);
                        //}
                    },
                  
                    
                }).data("kendoGrid");

                
                var grid = $(gridRatioClienteSearch).data("kendoGrid");
                grid.hideColumn("_IdEmpresa");
                grid.hideColumn("_IDRatioCliente");
                grid.hideColumn("_CodCliente");
                grid.hideColumn("_CodCol");
                grid.hideColumn("_CodColDes");
                //grid.hideColumn("_CliDDes");
                //CUSTOM TITTLE COLUMNS
                $(gridRatioClienteSearch.find("th[data-field=_CliDDes]")).html("<div> Cliente </div>");
                $(gridRatioClienteSearch.find("th[data-field=_Row]")).html("<div> # </div>");
                $(gridRatioClienteSearch.find("th[data-field=_Descripcion]")).html("<div> Tipo de Empaque </div>");

            }
            desbloqObject();
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            if (jqxhr.status != 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'SISTEMA',
                    text: `${err}`,
                });
            }

            desbloqObject();
            return false;
        });
    /*
    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/PedidoComercialTalla/ListarPaginadoTallasbyKey',
        type: 'POST',
        data: JSON.stringify({ SerialKey: $("#frmSearchRatioCliente").find("input[id='serialKeytalla']").val() }),
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
                        console.log(e);
                        if (e.field && e.action == "itemchange") {
                            var grid = $(gridRatioClienteSearch).data("kendoGrid");
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
                                }
                                lastRow = e.items[0]._ROW;
                                rowTalla = row;
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

                gridRatioClienteSearch.kendoGrid({
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
                    navigate: function (e) {
                        console.log(e);
                        if (e.element[0].cellIndex == 22) {
                            var grd = $(gridRatioClienteSearch).data("kendoGrid");
                            var item = grd.dataItem(grd.select());
                            e.element.text(item._TOTAL);
                        } // displays the newly highlighted cell
                    }
                }).data("kendoGrid");

                var t = $("#gridRatioClienteSearch .k-group-footer"); //get all grouping rows
                $.each(t, function (key, elem) {
                    $(elem).addClass("grouping-row-" + (key + 1));
                });


                //HIDE COLUMNS AFTER LOAD
                var grid = $(gridRatioClienteSearch).data("kendoGrid");
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

                //CUSTOM TITTLE COLUMNS
                $(gridRatioClienteSearch.find("th[data-field=_COD_COMBINACION]")).html("<div> Código de <br/> Combinacion </div>");
                $(gridRatioClienteSearch.find("th[data-field=_NOM_COMBINACION]")).html("<div> Nombre de <br/> Combinacion </div>");
                $(gridRatioClienteSearch.find("th[data-field=_DCPOPCNEMQNCOD]")).html("<div> Empaque </div>");
                $(gridRatioClienteSearch.find("th[data-field=_Conceptos]")).html("<div> Concepto </div>");
                $(gridRatioClienteSearch.find("th[data-field=_TOTAL]")).html("<div> Total </div>");
                $(gridRatioClienteSearch.find("th[data-field=_TOT_PRENDA]")).html("<div> N° Prendas<br\> Totales </div>");
            }

            else {

                gridRatioClienteSearch.kendoGrid({
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
    });*/

    function generateColumnsWithFooterTemplate(response) {
        var columnNames = response["columns"];
        var cols = columnNames.map(function (name) {
            var _name = name.split('-').length > 1 ? name.split('-')[0] : name;
            var footer = name.split('-').length > 1 ? name.split('-')[1] : "";
            return {
                field: "_" + _name,
                title: _name,
                format: (isDateField[_name] ? "{0:D}" : ""),
                groupHeaderTemplate: _name == "ROW" ? "<span>Color: #= value  #</span>" : "",
                groupFooterTemplate: (footer == "footer") ? "Prendas" : (footer == "footerNumber" || _name == "TOTAL") ? "<span id='" + _name + "'>0</span>" : "",
                width: (footer == "footer" || _name == "TOTAL") ? "15%" : (footer == "footerNumber") ? "9%" : 130,
            };
        });
        cols.push({ command: { text: "asignar", click: showDetails }, title: " ", width: "80px" });
        return cols;
    }


    function showDetails(e) {
        e.preventDefault();

    }
});