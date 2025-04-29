$(document).ready(function () {
    $(window).load(function () {

        cargarGridLicencia();

         $("#addNewLicencia").click(function () {

            var url = $(this).attr('data-url') + '?Id_Personal_Aeronautico=' + $('#XID_PERSONAL_AERONAUTICO').val();
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


        $("#gridLicencias").on("click", ".k-grid-EditarLicencia", function (e) {
            e.preventDefault();
            var grid = $("#gridLicencias").data("kendoGrid");
            var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            console.log(dataItem);

            var url = '/LicenciaHabilitacion/EditarLicencia?Index=' + dataItem.XID_LICENCIA + '&Id_Personal_Aeronautico=' + dataItem.XID_PERSONAL_AERONAUTICO;
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

                    if (data.rpta == "1") {
                        bootbox.alert("No se han registrado todos los datos");
                        desbloqObject();
                    } else {
                        desbloqObject();
                        $(seccionModal).html(data);
                        $(seccionContenedor).modal('show');
                    }
                }
            });
        });

        
        $("#gridLicencias").on("click", ".k-grid-RegistroHabilitacion", function (e) {
            e.preventDefault();
            var grid = $("#gridLicencias").data("kendoGrid");
            var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            console.log(dataItem);

            var url = '/LicenciaHabilitacion/EditarHabilitacion?Id_Tipo_Licencia=' + dataItem.XID_TIPO_LICENCIA + '&Id_Licencia=' + dataItem.XID_LICENCIA;
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

                    if (data.rpta == "1") {
                        bootbox.alert("No se han registrado todos los datos");
                        desbloqObject();
                    } else {
                        desbloqObject();
                        $(seccionModal).html(data);
                        $(seccionContenedor).modal('show');
                    }
                }
            });
        });

        $("#gridLicencias").on("click", ".k-grid-EditarHabilitacion", function (e) {
            e.preventDefault();
            //kendo.template($("#template").html()),

            //var grid = $("#gridLicencias").find("div.gridDetAsociadas").data("kendoGrid")
            var grid = $("#gridLicencias").data("kendoGrid");
            var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            console.log("dataItem");
            console.log(dataItem);

            var url = '/LicenciaHabilitacion/EditarHabilitacion?Id_Tipo_Licencia=' + dataItem.XID_TIPO_LICENCIA + '&Index=' + dataItem.TIPO_HABILITACION  + '&Id_Licencia=' + dataItem.XID_LICENCIA;
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

                    if (data.rpta == "1") {
                        bootbox.alert("No se han registrado todos los datos");
                        desbloqObject();
                    } else {
                        desbloqObject();
                        $(seccionModal).html(data);
                        $(seccionContenedor).modal('show');
                    }
                }
            });
        });

        $("#gridLicencias").on("click", ".k-grid-RegistroEvaluacion", function (e) {
            e.preventDefault();
            var grid = $("#gridLicencias").data("kendoGrid");
            var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            console.log(dataItem);

            var url = '/LicenciaHabilitacion/EditarEvaluacion?Id_Tipo_Licencia=' + dataItem.XID_TIPO_LICENCIA + '&Id_Licencia=' + dataItem.XID_LICENCIA;
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

                    if (data.rpta == "1") {
                        bootbox.alert("No se han registrado todos los datos");
                        desbloqObject();
                    } else {
                        desbloqObject();
                        $(seccionModal).html(data);
                        $(seccionContenedor).modal('show');
                    }
                }
            });
        });

        $("#gridLicencias").on("click", ".k-grid-EvaluacionMedica", function (e) {
            e.preventDefault();
            var grid = $("#gridLicencias").data("kendoGrid");
            var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            console.log(dataItem.XID_LICENCIA);



            var url = '/AsociarEvalMedica/AsociarEvalMedica?Id_Licencia=' + dataItem.XID_LICENCIA + '&Id_Personal_Aeronautico=' + dataItem.XID_PERSONAL_AERONAUTICO + '&Id_Tipo_Licencia=' + dataItem.XID_TIPO_LICENCIA;
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


    });
});



function cargarGridLicencia() {
    $("#gridLicencias").html('');

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/LicenciaHabilitacion/ListarLicencia",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objId_Personal_Aeronautico: $('#XID_PERSONAL_AERONAUTICO').val()});
            }
        },
        schema: {
            data: "l_GENM_LICENCIA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_LICENCIA: { type: "string" },
                    XID_PERSONAL_AERONAUTICO: { type: "string" },
                    NRO_LICENCIA: { type: "string" },
                    XID_TIPO_LICENCIA: { type: "string" },
                    TIPO_LICENCIA: { type: "string" },
                    XFECHA_EXPEDICION: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridLicencias").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        //height: 400,
        columns: [
            {
                field: "XID_LICENCIA",
                title: "XID_LICENCIA",
                hidden: true
            }, {
                field: "XID_PERSONAL_AERONAUTICO",
                title: "XID_PERSONAL_AERONAUTICO",
                hidden: true
            }, {
                field: "XID_TIPO_LICENCIA",
                title: "XID_TIPO_LICENCIA",
                hidden: true
            }, {
                field: "NRO_LICENCIA",
                title: "NRO. LICENCIA",
                width: 100
            }, {
                field: "TIPO_LICENCIA",
                title: "TIPO LICENCIA",
                width: 160
            }, {
                field: "XFECHA_EXPEDICION",
                title: "FECHA EXPEDICION",
                width: 100
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 60
            }, {
                title: "<div align=center>ACCIONES</div>",
                template: "<div align=center> " +
                          "<a class='btn btn-primary btn-xs k-grid-EditarLicencia' data-toggle='tooltip' data-placement='bottom' title='Editar Licencia'><span class='glyphicon glyphicon-edit'></span></a> " +
                          "<a class='btn btn-primary btn-xs k-grid-RegistroEvaluacion' data-toggle='tooltip' data-placement='bottom' title='Registro de Evaluación'><span class='glyphicon glyphicon-hourglass'></span></a> " +
                          "<a class='btn btn-primary btn-xs k-grid-RegistroHabilitacion' data-toggle='tooltip' data-placement=bottom title='Registro de Habilitacion'><span class='glyphicon glyphicon-star'></span></a> " +
                          "<a class='btn btn-primary btn-xs k-grid-RegistroHorasVuelo' data-toggle='tooltip' data-placement=bottom title=Registro de horas de vuelo><span class='glyphicon glyphicon-time'></span></a> " + 
                          "<a class='btn btn-primary btn-xs k-grid-EvaluacionMedica' data-toggle='tooltip' data-placement='bottom' title='Asociar Evaluacion Medica'><i class='fa fa-paperclip'></i></a> " +
                          "</div>",
                width: 100
            }]
    }).data("kendoGrid");

}






function detailInit(e) {

    var dataSourceHabilitacion = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/LicenciaHabilitacion/ListarHabilitacion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objId_Licencia: e.data.XID_LICENCIA });
            }
        },
        schema: {
            data: "l_GENM_HABILITACION_LIC",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_HABILITACION_LIC: { type: "string" },
                    XID_LICENCIA: { type: "string" },
                    XID_TIPO_HABILITACION_LIC: { type: "string" },
                    XID_TIPO_LICENCIA: { type: "string" },
                    TIPO_HABILITACION: { type: "string" },
                    XFECHA_EXPEDICION: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        serverFiltering: true,
        serverSorting: true
    });



    var dataSourceEvaluacion = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/LicenciaHabilitacion/ListarEvaluacion",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objId_Licencia: e.data.XID_LICENCIA });
            }
        },
        schema: {
            data: "l_GENM_EVALUACION_LIC",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_EVALUACION_LIC: { type: "string" },
                    XID_LICENCIA: { type: "string" },
                    XID_TIPO_EVALUACION_LIC: { type: "string" },
                    XID_TIPO_LICENCIA: { type: "string" },
                    TIPO_EVALUACION: { type: "string" },
                    XFECHA_EXPEDICION: { type: "string" },
                    XFECHA_VENCIMIENTO: { type: "string" },
                    XFECHA_PRORROGA: { type: "string" },
                    FLG_ESTADO: { type: "boolean" }


                }
            }
        },
        serverFiltering: true,
        serverSorting: true
    });




    //var dataSourceEvaluacion = new kendo.data.DataSource({
    //    transport: {
    //        read: {
    //            type: "POST",
    //            url: "/TipoLicencia/ListarTipoLicenciaEvaluacion",
    //            contentType: "application/json",
    //            dataType: 'json'
    //        },
    //        parameterMap: function (options, operation) {
    //            return JSON.stringify({ Id_Licencia: e.data.XID_TIPO_LICENCIA, page: options.page, pageSize: options.pageSize });
    //        }
    //    },
    //    schema: {
    //        data: "l_MAE_TIPO_EVALUACION_LIC",
    //        total: "pageSize",
    //        type: 'json',
    //        model: {
    //            fields: {
    //                XID_TIPO_HABILITACION_LIC: { type: "string" },
    //                DESCRIPCION: { type: "string" }
    //            }
    //        }
    //    },
    //    pageSize: 5,
    //    serverPaging: true,
    //    serverFiltering: true,
    //    serverSorting: true
    //});



    


    //var dataSourceRestriccion = new kendo.data.DataSource({
    //    transport: {
    //        read: {
    //            type: "POST",
    //            url: "/TipoLicencia/ListarTipoLicenciaRestriccion",
    //            contentType: "application/json",
    //            dataType: 'json'
    //        },
    //        parameterMap: function (options, operation) {
    //            return JSON.stringify({ Id_Licencia: e.data.XID_TIPO_LICENCIA, page: options.page, pageSize: options.pageSize });
    //        }
    //    },
    //    schema: {
    //        data: "l_MAE_TIPO_RESTRICCION",
    //        total: "pageSize",
    //        type: 'json',
    //        model: {
    //            fields: {
    //                XID_TIPO_RESTRICCION: { type: "string" },
    //                DESCRIPCION_ESPANOL: { type: "string" },
    //                DESCRIPCION_INGLES: { type: "string" }


    //            }
    //        }
    //    },
    //    pageSize: 5,
    //    serverPaging: true,
    //    serverFiltering: true,
    //    serverSorting: true
    //});




    var detailRow = e.detailRow;
    detailRow.find(".tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        }
    });

    detailRow.find(".Habilitacion").kendoGrid({

        dataSource: dataSourceHabilitacion,
        scrollable: false,
        sortable: true,
        columns: [
            {
                field: "XID_HABILITACION_LIC",
                title: "XID_HABILITACION_LIC",
                hidden: true
            }, {
                field: "XID_LICENCIA",
                title: "XID_LICENCIA",
                hidden: true
            }, {
                field: "XID_TIPO_HABILITACION_LIC",
                title: "XID_TIPO_HABILITACION_LIC",
                hidden: true
            }, {
                field: "XID_TIPO_LICENCIA",
                title: "XID_TIPO_LICENCIA",
                hidden: true
            }, {
                field: "TIPO_HABILITACION",
                title: "TIPO HABILITACION",
                width: 150
            },{
                field: "XFECHA_EXPEDICION",
                title: "FECHA EXPEDICION",
                width: 100
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 60
            },{
                command: [{
                        name: "edit",
                        text: " ",
                        template: "<a class='btn btn-primary btn-xs k-grid-edit k-grid-update'><span class='glyphicon glyphicon-edit'></span></a>",
                        click: EditarHabilitacion
                    }, {
                        name: "destroy",
                        text: " ",
                        template: "<a style='margin-left:3px;' class='btn btn-primary btn-xs k-grid-edit k-grid-update'><span class='glyphicon glyphicon-hourglass'></span></a>",
                        click: EditarHabilitacion
                    }],
                title: "<div align=center>ACCIONES</div>",
                width: "60px"
           }]
    });


    detailRow.find(".Evaluacion").kendoGrid({

        dataSource: dataSourceEvaluacion,
        scrollable: false,
        sortable: true,
        columns: [
            {
                field: "XID_EVALUACION_LIC",
                title: "XID_EVALUACION_LIC",
                hidden: true
            }, {
                field: "XID_LICENCIA",
                title: "XID_LICENCIA",
                hidden: true
            }, {
                field: "XID_TIPO_EVALUACION_LIC",
                title: "XID_TIPO_EVALUACION_LIC",
                hidden: true
            }, {
                field: "XID_TIPO_LICENCIA",
                title: "XID_TIPO_LICENCIA",
                hidden: true
            }, {
                field: "TIPO_EVALUACION",
                title: "TIPO EVALUACION",
                width: 150
            }, {
                field: "XFECHA_EXPEDICION",
                title: "FECHA EXPEDICION",
                width: 100
            }, {
                field: "XFECHA_VENCIMIENTO",
                title: "FECHA VENCIMIENTO",
                width: 100
            }, {
                field: "XFECHA_PRORROGA",
                title: "FECHA PRORROGA",
                width: 100
            }, {
                field: "FLG_ESTADO",
                title: "ACTIVO",
                template: "# if (FLG_ESTADO == true) {# <input type='checkbox' checked='checked' disabled='disabled'/> # } else {# <input type='checkbox' disabled='disabled'/> #} #",
                width: 60
            }, {
                command: [{
                    name: "edit",
                    text: " ",
                    template: "<a class='btn btn-primary btn-xs k-grid-edit k-grid-update'><span class='glyphicon glyphicon-edit'></span></a>",
                    click: EditarEvaluacion
                }],
                title: "<div align=center>ACCIONES</div>",
                width: "60px"
            }]
    });


    //detailRow.find(".Evaluacion").kendoGrid({

    //    dataSource: dataSourceEvaluacion,
    //    scrollable: false,
    //    sortable: true,
    //    pageable: true,
    //    columns: [
    //        {
    //            field: "XID_TIPO_EVALUACION_LIC",
    //            title: "XID_TIPO_EVALUACION_LIC",
    //            hidden: true
    //        }, {
    //            field: "DESCRIPCION",
    //            title: "DESCRIPCIÓN",
    //            flex: 1
    //        }]
    //});

    //detailRow.find(".Restriccion").kendoGrid({

    //    dataSource: dataSourceRestriccion,
    //    scrollable: false,
    //    sortable: true,
    //    pageable: true,
    //    columns: [
    //        {
    //            field: "XID_TIPO_RESTRICCION",
    //            title: "XID_TIPO_RESTRICCION",
    //            hidden: true
    //        }, {
    //            field: "DESCRIPCION_ESPANOL",
    //            title: "DESCRIPCIÓN ESPAÑOL",
    //            flex: 1
    //        }, {
    //            field: "DESCRIPCION_INGLES",
    //            title: "DESCRIPCIÓN INGLES",
    //            flex: 1
    //        }]
    //});
}


function EditarHabilitacion(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    console.log(dataItem);
    //alert(dataItem.XID_INSPECCION_BASE);


        var url = '/LicenciaHabilitacion/EditarHabilitacion?Id_Tipo_Licencia=' + dataItem.XID_TIPO_LICENCIA + '&Index=' + dataItem.XID_HABILITACION_LIC + '&Id_Licencia=' + dataItem.XID_LICENCIA;
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

                if (data.rpta == "1") {
                    bootbox.alert("No se han registrado todos los datos");
                    desbloqObject();
                } else {
                    desbloqObject();
                    $(seccionModal).html(data);
                    $(seccionContenedor).modal('show');
                }
            }
        });    
}

function EditarEvaluacion(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    console.log(dataItem);
    //alert(dataItem.XID_INSPECCION_BASE);


    var url = '/LicenciaHabilitacion/EditarEvaluacion?Id_Tipo_Licencia=' + dataItem.XID_TIPO_LICENCIA + '&Index=' + dataItem.XID_EVALUACION_LIC + '&Id_Licencia=' + dataItem.XID_LICENCIA;
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

            if (data.rpta == "1") {
                bootbox.alert("No se han registrado todos los datos");
                desbloqObject();
            } else {
                desbloqObject();
                $(seccionModal).html(data);
                $(seccionContenedor).modal('show');
            }
        }
    });

}