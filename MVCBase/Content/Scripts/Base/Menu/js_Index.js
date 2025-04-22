$(document).ready(function () {
    $(window).load(function () {
        CargarTreeView();
        $("#btnNuevoOpcionMenu").click(function () {
            
        });
    });
});
function CargarTreeView() {
    var datasource = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "/Menu/ListarTree",
                dataType: 'json',
                cache: false
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
        dataSource: datasource,
        dragAndDrop: true,
        drop: onDrop,
        dataBound: ondata,
        select: function (e) {
            var id = $("#treeview").getKendoTreeView().dataItem(e.node).id;
            $("#XMENU").val(id);
            $("#btnEditarOpcionMenu").attr("data-url", "/Menu/Menu?Menu=" + id);
        },
        messages: {
            loading: "Cargando..."
        }
    });

}
function CambiarUrl(EsNuevo) {
    var id = $("#IdOpcion").val();

    if (!EsNuevo) {
        atributoEditar = globalRutaServidor + "Opcion/Editar?IdOpcion=" + id + "&IdGrupoOpcion=0&IdAplicacion=" + $("#Id_Aplicacion").val();
    }
    else {
        atributoEditar = globalRutaServidor + "Opcion/Editar?IdOpcion=0&IdGrupoOpcion=" + id + "&IdAplicacion=" + $("#Id_Aplicacion").val();
    }

    $("#btnEditarOpcion").attr("data-url", atributoEditar);
};

function CambiarUrlPermiso() {

    var IdOpcion = $("#IdOpcion").val();
    var atributo = $("#btnPermisos").attr("data-urlorigen");
    var atributonuevo = atributo + "?Id_Opcion=" + IdOpcion;
    $("#btnPermisos").attr("data-url", atributonuevo);
}

function EditarOpcion() {

    CambiarUrl(false);
    $("#btnEditarOpcion").click();
};

function NuevaOpcion() {

    CambiarUrl(true);
    $("#btnEditarOpcion").click();
};

function EliminarOpcion() { };

function VerPermisos() { };

function MoverOpcion(IdSource, IdTarget, Psc) {

    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Menu/MoverOpcionGrupo',
        type: 'POST',
        data: JSON.stringify({
            Id_Opcion_Source: IdSource,
            Id_Opcion_Target: IdTarget,
            Posicion: Psc
        }),
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            if (!data.rpta) {
                errorAddModelo("divError", "ulListaError", data.errores);
            } else {
                var data = $("#treeview").data('kendoTreeView');
                data.dataSource.read();
            }
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
    });

}

function ondata() {

    var tree = $("#treeview").data("kendoTreeView");
    window.setTimeout(function () {
        $("#treeview").find(".k-item").each(
            function () {
                var e = tree.dataItem(this);
            });

        $('#context-menu').kendoContextMenu({
            target: ".k-item",
            select: function (e) {
                var sel = $(e.item).attr('id');

                if (sel == "modalNuevaOpcion") {
                    NuevaOpcion();
                }
                else if (sel == "modalEditarOpcion") {
                    EditarOpcion();
                }
                else if (sel == "modalEliminarOpcion") {
                    EliminarOpcion();
                }
                else {
                    VerPermisos();
                }
            },
            alignToAnchor: true,
        });
    }, 0);
}

function onDrop(e) {

    var IdSource = $("#treeview").getKendoTreeView().dataItem(e.sourceNode).id;

    if ($("#treeview").getKendoTreeView().dataItem(e.dropTarget) == null) {
        return;
    }

    var IdTarget = $("#treeview").getKendoTreeView().dataItem(e.dropTarget).id;

    if (IdSource == IdTarget) {
        return;
    }

    var r = confirm("¿Está seguro de mover la opcion?");
    if (!r) {
        e.setValid();
        return;
    }

    MoverOpcion(IdSource, IdTarget, e.dropPosition)

}
