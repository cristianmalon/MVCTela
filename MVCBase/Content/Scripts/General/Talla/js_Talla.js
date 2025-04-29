function toggleAll(fieldName) {
    e = window.event;
    var checked = $(e.target).context.checked;
    var grid = $(e.target).closest('.k-grid').data("kendoGrid");
    grid.dataSource.data().forEach(function (d) {
        d.set(fieldName, checked);
    });
    var sel = $("input:checked", grid.tbody).closest("tr");
    checked ? sel.addClass("k-state-selected") : sel.removeClass("k-state-selected");

}

$(document).ready(function () {
    var TotalIsChecked = 0;
    $("#gridData").html(''); 
    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/Talla/ListarPaginado",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    eTalla: {
                        PageNumber: ($('#frmIndexTalla :input[id="idBuscarTalla"]').val() != '') ? 0 : ((options.page == 0) ? 0 : (options.page - 1)),
                        pageSize: options.pageSize,
                        ESTADO: 'A',
                        TalDDes: ($('#frmIndexTalla :input[id="idBuscarTalla"]').val() == '') ? '%' : $('#frmIndexTalla :input[id="idBuscarTalla"]').val(),
                    }
                });
            }
        },
        schema: {
            data: function (response) {
                if (response.response == false) {
                    console.log("Error BackEnd : " + response.message);
                }
                else {
                    TotalIsChecked = response.TotalIsChecked;
                    $("#lblSelccionados").text(TotalIsChecked);
                    return response.result;
                }
            },
            total: "TotalRow",
            type: 'json',
            model: {
                fields: {
                    TalNOrdEdit: { type: "number" },
                    TalDDes: { type: "string" },
                    TalDCod: { type: "string" },
                    blCheck: { type: "boolean" },
                    IntProporcion: { type: "number" },
                    BlIsTallaBase: { type: "boolean" },
                }
            }
        },
        serverFiltering: true,
        serverSorting: true,
        error: function (err) {
            console.log("Error FrontEnd :  :" + JSON.stringify(err));
        }
    });

    var grid = $("#gridData").kendoGrid({
        dataSource: dataSource,
        scrollable: {
            virtual: true
        },
        height: 430,
        persistSelection: true,
        dataBound: function (e) {
            var grid = this;
            var rows = grid.items();

            $(rows).each(function (e) {
                var row = this;
                var dataItem = grid.dataItem(row);
                if (dataItem.blCheck) {
                    grid.select(row);
                }
            });
        },
        noRecords: {
            template: '<br/> ' +
                ' <div class="row"> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS DE SOLICITANTES ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },
        columns: [
            {

                template: '<input #=blCheck? \'checked\' : \'\' # type=checkbox class ="checkbox" id="chkblCheck" />',
                width: "20px",
            },
            {
                field: "TalNOrdEdit",
                title: "Ord",
                width: "40px",
            },
            {
                field: "TalDDesEdit",
                title: "Talla Camtex",
                editable: function (e) {
                    return false;
                },
                width: "100px",
            },
            {
                field: "TalDCodEdit",
                title: "Talla Cliente",
                width: "100px",
            },
            {
                field: "IntProporcion",
                title: "Proporcion",
                width: "70px",
            },
            {
                template: '<input #=BlIsTallaBase? \'checked\' : \'\' # type=checkbox class ="checkbox" id="chkBlIsTallaBase" />',
                width: "20px",
            }

        ],
        editable: true
    }).data("kendoGrid");
    
    grid.table.on("click", "#chkblCheck", function (e) {
        var checked = this.checked;
        var row = $(this).closest("tr");
        var grid = $("#gridData").data("kendoGrid");
        var dataItem = grid.dataItem(row);

        dataItem.blCheck = checked;
        if (dataItem.blCheck) {
            row.addClass("k-state-selected");
            TotalIsChecked++;
        } else {
            row.removeClass("k-state-selected")
            TotalIsChecked--;
        }
        if (TotalIsChecked > 14) {

            row.removeClass("k-state-selected")
            this.checked = false;
            dataItem.blCheck = false;
            AlertMessage("Solo se pueden Seleccionar 14 registros!");
            TotalIsChecked--;
            return;
        }
        $("#lblSelccionados").text(TotalIsChecked);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Talla/AddTalla',
            type: 'POST',
            data: JSON.stringify(dataItem),
            beforeSend: function () { },
            success: function (data) {
                console.log("msk :" + data.msg);
            }
        }).fail(function (jqxhr, textStatus, error) {
            console.log("Request Failed: " + error);
        });
    });

    grid.table.on("click", "#chkBlIsTallaBase", function (e) {
        var checked = this.checked;
        var row = $(this).closest("tr");
        var grid = $("#gridData").data("kendoGrid");
        var dataItem = grid.dataItem(row);

        dataItem.BlIsTallaBase = checked;
    });

    $("#idBuscarTalla").keypress(function (e) {
        if (e.which === 13) {
            $(this).attr("disabled", "disabled");
            $('#gridData').data('kendoGrid').dataSource.read();
            $('#gridData').data('kendoGrid').refresh();
            $(this).removeAttr("disabled");
            $("#idBuscarTalla").focus();
        }

    });
});





