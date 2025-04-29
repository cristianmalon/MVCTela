$(document).ready(function () {
    $(window).load(function () {

        var txtPerus = $("#txtPerus").val()

        if ($("#txtPais").val() == txtPerus) {
            $("#txtDepartamento").toggleEnable();
            $("#txtProvincia").toggleEnable();
            $("#txtDistrito").toggleEnable();
        }

        $("#txtPais").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                var cmb = this;
                // selectedIndex of -1 indicates custom value
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                } else {

                    if ($.trim($("#txtPais").data("kendoComboBox").value()) == txtPerus) {

                        $("#txtDepartamento").data("kendoComboBox").enable(true);
                        $("#txtProvincia").data("kendoComboBox").enable(true);
                        $("#txtDistrito").data("kendoComboBox").enable(true);
                    }
                    else {
                        $("#txtDepartamento").data("kendoComboBox").value('');
                        $("#txtProvincia").data("kendoComboBox").value('');
                        $("#txtDistrito").data("kendoComboBox").value('');

                        $("#txtDepartamento").data("kendoComboBox").enable(false);
                        $("#txtProvincia").data("kendoComboBox").enable(false);
                        $("#txtDistrito").data("kendoComboBox").enable(false);
                    }

                }
            },
        });

        $("#txtDepartamento").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            select: onSelectProvincia,
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {

                    if ($.trim($("#txtDepartamento").data("kendoComboBox").value()) != "" && $("#txtDepartamento").data("kendoComboBox").value() != null) {
                        $.ajax({
                            datatype: 'json',
                            url: '/Aerodromo/datoProvincia',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                XDEPARTAMENTO: $.trim($("#txtDepartamento").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorAerodromos", "ulListaErrorAerodromos", data.errores);
                                } else {
                                    var l_GENM_PROVINCIA = data.l_GENM_PROVINCIA;


                                    var lProvincia = [];
                                    $.each(l_GENM_PROVINCIA, function (index, value) {
                                        var oProvincia = {
                                            value: value.XPROVINCIA,
                                            text: value.DESCRIPCION
                                        }
                                        lProvincia.push(oProvincia);
                                    });
                                    $("#txtProvincia").data("kendoComboBox").value('');
                                    $("#txtDistrito").data("kendoComboBox").value('');


                                    var multiselect = $("#txtProvincia").data("kendoComboBox");
                                    console.log(lProvincia);
                                    multiselect.setDataSource(lProvincia);
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            desbloqObject();
                        });

                    }

                }
            },
        });

        $("#txtProvincia").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            select: onSelectDistrito,
            change: function () {
                var cmb = this;
                // selectedIndex of -1 indicates custom value
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($.trim($("#txtProvincia").data("kendoComboBox").value()) != "" && $("#txtProvincia").data("kendoComboBox").value() != null) {
                        $.ajax({
                            datatype: 'json',
                            url: '/Aerodromo/datoDistrito',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                XPROVINCIA: $.trim($("#txtProvincia").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorAerodromos", "ulListaErrorAerodromos", data.errores);
                                } else {
                                    var l_GENM_DISTRITO = data.l_GENM_DISTRITO;

                                    var lDistrito = [];
                                    $.each(l_GENM_DISTRITO, function (index, value) {
                                        var oDistrito = {
                                            value: value.XDISTRITO,
                                            text: value.DESCRIPCION
                                        }
                                        lDistrito.push(oDistrito);
                                    });
                                    $("#txtDistrito").data("kendoComboBox").value('');
                                    var multiselect = $("#txtDistrito").data("kendoComboBox");
                                    console.log(lDistrito);
                                    multiselect.setDataSource(lDistrito);
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            desbloqObject();
                        });

                    }

                }
            },
        });

        $("#txtDistrito").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                var cmb = this;
                // selectedIndex of -1 indicates custom value
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            },
        });

        cargarGridAerodromo();

        $("#btnBuscarAerodromo").click(function () {
            cargarGridAerodromo();

        });

        $("#btnLimpiarAerodromo").click(function () {
            $("#descripcion").val('');
            $("#txtOaci").val('');
            $("#txtIata").val('');
            $("#txtPais").data("kendoComboBox").value('');
            $("#txtDepartamento").data("kendoComboBox").value('');
            $("#txtProvincia").data("kendoComboBox").value('');
            $("#txtDistrito").data("kendoComboBox").value('');
           
            cargarGridAerodromo();
        });

        

        $("#addNewAerodromo").click(function () {

            var url = $(this).attr('data-url');
            var divModal = $(this).attr('data-div');
            var divContenedor = $(this).attr('data-contenedor');

            var seccionModal = ".seccionModal";
            var seccionContenedor = ".contenedor";

            if (divModal) {
                seccionModal = "#" + divModal;
            }

            if (divContenedor) {
                seccionContenedor = "#" + divContenedor;
            }

            $.ajax({
                url: url,
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {
                    desbloqObject();
                    $(seccionModal).html(data);
                    $(seccionContenedor).modal('show');
                }
            });

        });
        
        $("#addModifyAerodromo").click(function () {


            var dataDetalleAerodromo = $("#gridAerodromo").data("kendoGrid");
            var itemDataAerodromo = dataDetalleAerodromo.dataItem(dataDetalleAerodromo.select());
            if (itemDataAerodromo != undefined) {

                var url = $(this).attr('data-url') + '?Index=' + itemDataAerodromo.XAERODROMO;
                var divModal = $(this).attr('data-div');
                var divContenedor = $(this).attr('data-contenedor');

                var seccionModal = ".seccionModal";
                var seccionContenedor = ".contenedor";

                if (divModal) {
                    seccionModal = "#" + divModal;
                }

                if (divContenedor) {
                    seccionContenedor = "#" + divContenedor;
                }

                $.ajax({
                    url: url,
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        desbloqObject();
                        $(seccionModal).html(data);
                        $(seccionContenedor).modal('show');
                    }
                });

            }
            else {
                bootbox.alert("Seleccione un registro de la tabla");
            }


        });
        

    });
});


function cargarGridAerodromo() {

    $("#gridAerodromo").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Aerodromo/ListarAerodromo",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objDescripcion: $('#descripcion').val(), objOaci: $('#txtOaci').val(), objIata: $('#txtIata').val(), objDepartamento: $('#txtDepartamento').val(), objProvincia: $('#txtProvincia').val(), objDistrito: $('#txtDistrito').val(), objPais: $('#txtPais').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_MAE_AERODROMO",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XAERODROMO: { type: "string" },
                    DESCRIPCION: { type: "string" },
                    IATA: { type: "string" },
                    OACI: { type: "string" },
                    DESPAIS: { type: "string" },
                    DESDEPARTAMENTO: { type: "string" },
                    DESPROVINCIA: { type: "string" },
                    DESDISTRITO: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridAerodromo").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: true,
        //height: 400,
        columns: [
            {
                field: "XAERODROMO",
                title: "ID_TIPO_LUGAR_DS",
                hidden: true
            }, {
                field: "DESCRIPCION",
                title: "DESCRIPCIÓN",
                flex: 1
            }, {
                field: "OACI",
                title: "OACI",
                flex: 1
            }, {
                field: "IATA",
                title: "IATA",
                flex: 1
            }, {
                field: "DESPAIS",
                title: "PAÍS",
                flex: 1
            }, {
                field: "DESDEPARTAMENTO",
                title: "DEPARTAMENTO",
                flex: 1
            }, {
                field: "DESPROVINCIA",
                title: "PROVINCIA",
                flex: 1
            }, {
                field: "DESDISTRITO",
                title: "DISTRITO",
                flex: 1
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 150
            }]
    }).data("kendoGrid");

}

function onSelectProvincia(e) {
    var dataItem = this.dataItem(e.item);
    //console.log(dataItem);

    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Aerodromo/datoProvincia',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XDEPARTAMENTO: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorAerodromos", "ulListaErrorAerodromos", data.errores);
                } else {
                    var l_GENM_PROVINCIA = data.l_GENM_PROVINCIA;

                    var lProvincia = [];
                    $.each(l_GENM_PROVINCIA, function (index, value) {
                        var oProvincia = {
                            value: value.XPROVINCIA,
                            text: value.DESCRIPCION
                        }
                        lProvincia.push(oProvincia);
                    });
                    $("#txtProvincia").data("kendoComboBox").value('');
                    $("#txtDistrito").data("kendoComboBox").value('');

                    var multiselect = $("#txtProvincia").data("kendoComboBox");
                    console.log(lProvincia);
                    multiselect.setDataSource(lProvincia);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });


    }

}


function onSelectDistrito(e) {
    var dataItem = this.dataItem(e.item);
    //console.log(dataItem);

    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Aerodromo/datoDistrito',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XPROVINCIA: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorAerodromos", "ulListaErrorAerodromos", data.errores);
                } else {
                    var l_GENM_DISTRITO = data.l_GENM_DISTRITO;

                    var lDistrito = [];
                    $.each(l_GENM_DISTRITO, function (index, value) {
                        var oDistrito = {
                            value: value.XDISTRITO,
                            text: value.DESCRIPCION
                        }
                        lDistrito.push(oDistrito);
                    });
                    $("#txtDistrito").data("kendoComboBox").value('');

                    var multiselect = $("#txtDistrito").data("kendoComboBox");
                    console.log(lDistrito);
                    multiselect.setDataSource(lDistrito);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });


    }

}