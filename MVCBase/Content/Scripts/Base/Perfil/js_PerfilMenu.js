$(document).ready(function () {
    CargarTreeView();
    $("#btnAceptarAccesosPerfil").click(function () {
        bootbox.confirm("¿Estas seguro de guardar los cambios a los accesos?", function (result) {
            if (result) {
                var oMenuPerfil = onGetTreeData();
                console.log(oMenuPerfil);

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/Perfil/SaveMenuPerfil',
                    type: 'POST',
                    data: JSON.stringify({ oMenuPerfil: oMenuPerfil }),
                    beforeSend: function () {

                    },
                    success: function (data) {
                        console.log(data);
                        if (!data.rpta) {
                            errorAddModelo("divError", "ulListaError", data.errores);
                        } else {
                            window.location = data.url;
                        }
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                });
            }
        });
    });
});

function checkedNodeIds(nodes, checkedNodes) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
            checkedNodes.push({ id: nodes[i].id, activo: true });
        }
        else {
            checkedNodes.push({ id: nodes[i].id, activo: false });
        }

        if (nodes[i].hasChildren) {
            checkedNodeIds(nodes[i].children.view(), checkedNodes);
        }
    }
}
function checkedNodeoMenuPerfil(nodes, MenuPerfil) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
            var oMenuPerfil = {
                ID_MENU_PERFIL: 0, ID_PERFIL: 0, ID_MENU: 0, FLG_ESTADO: true, ID_USUARIO_REG: 0, FEC_REG: $("#FEC_REG").val(), ID_USUARIO_ACT: 0, FEC_ACT: $("#FEC_ACT").val(), XMENU: nodes[i].id, XPERFIL: $("#XPERFIL").val(), XMENU_PERFIL: ""
            };
            MenuPerfil.push(oMenuPerfil);
        }
        else {
            var oMenuPerfil = {
                ID_MENU_PERFIL: 0, ID_PERFIL: 0, ID_MENU: 0, FLG_ESTADO: false, ID_USUARIO_REG: 0, FEC_REG: $("#FEC_REG").val(), ID_USUARIO_ACT: 0, FEC_ACT: $("#FEC_ACT").val(), XMENU: nodes[i].id, XPERFIL: $("#XPERFIL").val(), XMENU_PERFIL: ""
            };
            MenuPerfil.push(oMenuPerfil);
        }

        if (nodes[i].hasChildren) {
            checkedNodeoMenuPerfil(nodes[i].children.view(), MenuPerfil);
        }
    }
}

// show checked node IDs on datasource change
function onCheck() {
    var checkedNodes = [],
        treeView = $("#treeview").data("kendoTreeView"),
        message;

    checkedNodeIds(treeView.dataSource.view(), checkedNodes);
}

function onGetTreeData() {
    var oMenuPerfil = [],
        treeView = $("#treeview").data("kendoTreeView"),
        message;

    checkedNodeoMenuPerfil(treeView.dataSource.view(), oMenuPerfil);

    return oMenuPerfil;
}

function CargarTreeView() {
    var data = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "/Perfil/ListarTree",
                data: { 'Perfil': $("#XPERFIL").val() },
                dataType: 'json'
            }
        },
        schema: {
            model: {
                id: 'id',
                hasChildren: 'hasChildren',
                children: 'items',
                fields: {
                    text: 'text'
                }
            }
        }
    });

    var treeview = $("#treeview").kendoTreeView({
        dataSource: data,
        checkboxes: {
            checkChildren: true
        },
        check: onCheck,
        messages: {
            loading: "Cargando..."
        }
    });
}