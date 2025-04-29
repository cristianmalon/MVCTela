$(document).ready(function () {
    
    $("#txtDocumentoDiscrepancia").kendoComboBox({
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

    cargarVerDocumentoDiscrepancia();

    $("#btnBuscarVerDocumentosDiscrepancia").click(function () {
        cargarVerDocumentoDiscrepancia();

    });
    $("#btnLimpiarVerDocumentosDiscrepancia").click(function () {
        $("#txtNroOficio").val('');
        $("#txtDocumentoDiscrepancia").data("kendoComboBox").value('');

        cargarVerDocumentoDiscrepancia();
    });

});

function cargarVerDocumentoDiscrepancia() {
   
    $("#gridVerDocumentoDiscrepancia").html('');

    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/DocumentoDiscrepancia/ListarVerDocumentoDiscrepancia",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objInspeccion: $("#XINSPECCION").val().trim(), objNroOficio: $("#txtNroOficio").val().trim(), objTipoDocuDiscrep: $('#txtDocumentoDiscrepancia').val().trim(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_T_GENM_VER_DOCUMENTO_DISCREPANCIA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_DOCUMENTO_DISCREPANCIA: { type: "string" },
                    XID_DISCREPANCIA: { type: "string" },
                    XID_INSPECCION: { type: "string" },                   
                    XORDEN: { type: "string" },
                    XNUMERO_OFICIO: { type: "string" },
                    XFECHA_OFICIO: { type: "string" },
                    DES_TIP_DOC_DISCREP: { type: "string" },
                    DES_TIP_DOCU_DS: { type: "string" },                                   
                    XNRO_DOC: { type: "string" },
                    XFEC_EXTENSION: { type: "string" },
                    XFEC_DOCUMENTO: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });
    
    var grid = $("#gridVerDocumentoDiscrepancia").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XID_DOCUMENTO_DISCREPANCIA",
                title: "ID_DOCUMENTO_DISCREPANCIA",
                hidden: true
            }, {
                field: "XID_DISCREPANCIA",
                title: "ID_DISCREPANCIA",
                hidden: true
            }, {
                field: "XID_INSPECCION",
                title: "ID_INSPECCION",
                hidden: true
            }, {
                field: "XORDEN",
                title: "DISCREPANCIA",
                width: 120
            }, {
                field: "XNUMERO_OFICIO",
                title: "Nº OFICIO",
                width: 100                
            }, {
                field: "XFECHA_OFICIO",
                title: "FECHA OFICIO",
                width: 120
            }, {
                field: "DES_TIP_DOC_DISCREP",
                title: "DOC. DISCREPANCIA",                
                width: 140
            },{
                field: "DES_TIP_DOCU_DS",
                title: "TIP DOC.",
                width: 100
            }, {
                field: "XNRO_DOC",
                title: "Nº DOC.",
                width: 80
            }, {
                field: "XFEC_DOCUMENTO",
                title: "FEC. DOCUMENTO",
                width: 120
            }, {
                field: "XFEC_EXTENSION",
                title: "FEC. EXTENSIÓN",
                width: 120
            }]
    }).data("kendoGrid");

}