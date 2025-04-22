$(document).ready(function (e) {
    var gridVariabelCrud = $("#gridVariableMant");
    gridVariabelCrud.html('');

    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/ConfiguracionCaja/ListVariabByCaja",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    SerialKey: $("#frmModelCrudConfiguracionCaja").find("input[id='serialKey']").val()
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
                    Descripcion: { type: "string" },
                    Atributo: { type: "string" }
                }
            }
        },
       
        serverPaging: false,
        serverFiltering: true,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + (err));
        }
    });


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
            { field: "Descripcion", title: "Variable", width: "50%" },
            { field: "Atributo", title: "Atributo", width: "50%" },
        ]
    }).data("kendoGrid");

    $("#btnAddRow").on('click', function (e) {

        var grd = $(gridVariabelCrud).data("kendoGrid");
        var data = grd.dataSource ?._data;
        var idJoins = data.map(item => item.SerialKey);
        BootstrapDialog.show({
            title: 'Lista de Variables',
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
                        var gridoRp = $("#gridVariables").data("kendoGrid");
                        var gridoMant = $("#gridVariableMant").data("kendoGrid");


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
                            gridoMant.dataSource.add(rowItem);
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
   
    $("#frmModelCrudConfiguracionCaja").find("select[id='idCboTipoPedido']").on("change", function (e) {
        var cboTipoPedido = this;

        var cboTipoEmpaque = $("#frmModelCrudConfiguracionCaja").find("select[id='idCboTipoEmpaque']");
        var serialKeyEmpaque = $("#frmModelCrudConfiguracionCaja").find("input[id='serialKeyEmpaque']").val();

        cboTipoEmpaque.empty();

        var param = JSON.stringify({
            SerialKey: $(cboTipoPedido).val()
        });
        bloquoteObject();
        MethodPost("/TipoPedido/ListTiposEmpaquesByPedido", param, "application/json")
            .done(function (response) {
                $(cboTipoEmpaque).append('<option value = "">-- SELECCIONAR --</option>');
                if (response.Success) {

                    $.each(response.response, function (i, item) {
                        if (serialKeyEmpaque == item.SerialKey) {
                            $(cboTipoEmpaque).append('<option value="'+ item.SerialKey + '" selected>'+ item.Descripcion + '</option>');
                        } else {
                            $(cboTipoEmpaque).append('<option value="' + item.SerialKey + '">' + item.Descripcion + '</option>');
                        }
                    });
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
            });;
    }).change();
});