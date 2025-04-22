$(document).ready(function (e) {
    var gridVariabelCrud = $("#gridRatioMant");
    gridVariabelCrud.html('');

    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/Ratio/ListDetalleByRatio",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    SerialKey: $("#frmModelCrudRatioCliente").find("input[id='serialKey']").val()
                });
            }
        },
        schema: {
            data: function (data) {
                if (data.Success == false) 
                    console.log("Error BackEnd : ", data ?.mensaje);
                else 
                    return data.response;
            },
            type: 'json',
            model: {
                fields: {
                    Orden: { type: "number" },
                    Alternativo: { type: "string" },
                    CodTalla: { type: "CodTalla" },
                    Ratio: { type: "number" }
                }
            }
        },
        change: function (e) {
            if (e.field && e.action == "itemchange") {
                var grid = $(gridVariabelCrud).data("kendoGrid");
                grid.footer.find(".k-footer-template").replaceWith(grid.footerTemplate(this.aggregates()));
            }
        },
        serverPaging: false,
        serverFiltering: true,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + (err));
        }
    });


    dataSource.aggregate([
        { field: "Ratio", aggregate: "sum" },
    ]);
    

    gridVariabelCrud.kendoGrid({
        dataSource: dataSource,
        
        scrollable: true,
        height: 250,
        selectable: true,
       
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "Orden", title: "Orden", width: "10%",
                editable: function (e) {
                    return false;
                },
            },
            {
                field: "Alternativo", title: "Talla Cliente", width: "20%",
                editable: function (e) {
                    return false;
                },
            },
            {
                field: "Ratio",
                width: "10%", 
                footerTemplate: "Total: #: sum #"
            },
        ],
        editable: true
    }).data("kendoGrid");

    $("#btnAddRow").on('click', function (e) {

        var grd = $(gridVariabelCrud).data("kendoGrid");
        var data = grd.dataSource ?._data;
        var idJoins = data.map(item => item.CodTalla);
        BootstrapDialog.show({
            title: 'Lista de Tallas',
            message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'keys='+ idJoins.join(","))),
            buttons: [
                {
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                },
                {
                    label: '&nbsp;Seleccionar',
                    icon: 'fa fa-hand-o-left',
                    cssClass: 'btn btn-primary',
                    action: function (dialog) {
                        var gridoRp = $("#gridTallasRatio").data("kendoGrid");
                        var gridoMant = $("#gridRatioMant").data("kendoGrid");


                        // obteniendo los procesos seleccionados
                        var ItemsSelecionados = gridoRp.select();

                        if (ItemsSelecionados.length == 0 || ItemsSelecionados == undefined) {
                            
                            Swal.fire({
                                icon: 'warning',
                                title: 'SISTEMA',
                                text: 'Favor de  Seleccionar  al menos un Registro.',
                            });
                            return false;
                        }

                        ItemsSelecionados.each(function (index, row) {
                           
                            var rowItem = gridoRp.dataItem(row);
                            if (rowItem?.Atributo == "") {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'SISTEMA',
                                    text: 'Favor de  Seleccionar  un tipo de Atributo.',
                                });
                                return true;
                            }
                            
                            gridoMant.dataSource.add({
                                Orden: rowItem.TalNOrdEdit,
                                Alternativo: rowItem.TalDCodEdit,
                                CodTalla: rowItem.TalNNroEdit,
                                Ratio: rowItem.IntProporcion
                            });

                            dialog.close();
                        });
                       
                    },
                    error: function (e) {
                        console.log("Error: :", e)
                    }
                }
            ]
        });
    });

    $("#btnRemoveRow").on('click', function (e) {
        var grd = $(gridVariabelCrud).data("kendoGrid");
        var selectedItem = grd.dataItem(grd.select());

        if (selectedItem == undefined || selectedItem == null) {
            Swal.fire({
                icon: 'warning',
                title: 'SISTEMA',
                text: 'Debe de seleccionar un registro a Actualizar.',
            });
            return;
        }

        Swal.fire({
            title: 'SISTEMA',
            text: "¿Desea Quitar el Registro?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                grd.dataSource.remove(selectedItem);
            }
        });
    });
    
    $("#frmModelCrudRatioCliente").find("button[id='idbtnBuscarCliente']").on("click", function (e) {
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
                            $("#frmModelCrudRatioCliente").find("input[id='desccliente']").val(item.CliDDes);
                            $("#frmModelCrudRatioCliente").find("input[id='codcliente']").val(item.CliCCod);
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
    })
});