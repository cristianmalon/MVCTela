$(document).ready(function () {

    CargarGridUsuario();
    CargarComboEstadosIndex();

    $("#btnBuscarUsuario").click(function () {
        $('#gridUsuario').data('kendoGrid').dataSource.read();
        $('#gridUsuario').data('kendoGrid').refresh();
    });

    $("#btnRegistrarRoles").click(function () {
        var data = $("#gridUsuario").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            BootstrapDialog.show({
                title: 'GESTIONAR ROLES',
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'Index=' + item.SerialKey)),
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: ' Guardar cambios',
                    icon: 'glyphicon glyphicon-save',
                        action: function (dialog) {
                            var cantRoles = $('.chkbx_user').length;
                            var USUARIO_ROLES = [];
                            var contUser = 0;
                            for (var x = 0; x < cantRoles; x++) {
                                if ($('.chkbx_user')[x].checked) {
                                    USUARIO_ROLES[contUser] = {
                                        ROLESKey: $('.chkbx_user')[x].parentNode.parentNode.children[0].innerHTML ,
                                        USUARIOKey: $('#frmRoles').find('input[id="USUARIOKey"]').val(),
                                        ESTADO: "A",
                                        SISTEMAKey: $('#frmRoles').find('input[id="ListaSistemas"]').val()
                                    }
                                    contUser = contUser + 1;
                                }
                            }
                            console.log(USUARIO_ROLES);
                            if (USUARIO_ROLES.length > 0) {
                           

                            $.ajax({
                                datatype: 'json',
                                contentType: "application/json",
                                url: '/Usuario_Roles/Actualizar',
                                type: 'POST',
                                data: JSON.stringify({ _entidad: USUARIO_ROLES, entidad: null }),
                                beforeSend: function () {
                                    bloquoteObject();
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (!data.rpta) {
                                        errorAddModelo("divErrorRoles", "ulListaErrorRoles", data.errores);
                                        AlertMessage(data.result);
                                    } else {
                                        AlertMessage(data.result);
                                        dialog.close();
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
                            AlertMessage("DEBE ASIGNAR AL MENOS UN ROL PARA EL USUARIO");
                        }
                    }
                }]
            });
        }
        else {
            AlertMessage("Debe seleccionar el Usuario que desea gestionar.");
        }
    });
});

function CargarGridUsuario() {
    $("#gridUsuario").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Usuario/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    PageNumber: (options.page == 0) ? 0 : (options.page - 1),
                    pageSize: options.pageSize,
                    CRITERIOFILTRO: $('#frmIndexUsuario :input[id="CRITERIOFILTRO"]').val(),
                    SUsrSEst: $('#frmIndexUsuario :input[id="ListaEstado"]').val()
                });
            }
        },
        schema: {
            data: "lista",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    SUsrId: { type: "string" },
                    SUsrDsc: { type: "string" },
                    SUsrPsw: { type: "string" },
                    SUsrFLgCr1: { type: "date" },
                    SUsrSEst: { type: "string" },
                    SerialKey: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    console.log(dataSource);

    var grid = $("#gridUsuario").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateUsuarios").html()),
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE USUARIOS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {
                field: "SUsrId",
                title: "Usuario",
                width: 150
            }, {
                field: "SUsrDsc",
                template: "#= SUsrDsc #",
                title: "Nombres completos",
                width: 250
            }, {
                field: "SUsrDEma",
                title: "E-Mail",
                width: 180
            }, {
                field: "SUsrSEst",
                title: "Estado",
                width: 100
            }]
    }).data("kendoGrid");

}

function ActualizarTablaUsuario() {
    var grid = $('#gridUsuario').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarComboEstadosIndex() {
    $('#frmIndexUsuario :input[id="ListaEstado"]').kendoDropDownList({
        placeholder: "[TODOS]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });
}