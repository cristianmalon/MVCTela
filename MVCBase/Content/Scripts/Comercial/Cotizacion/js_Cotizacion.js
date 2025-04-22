$(document).ready(function () {
    $("#gridData").html(''); 
    var dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "/Cotizacion/ListaSDC",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({
                    ECotizacion: {
                        PageNumber: options.page - 1,
                        pageSize: options.pageSize,
                        ESTADO: 'A',
                        SCESEst: '%',
                        SCENAno: '2019',
                        USUARIO_REG:'%'
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
                    return response.result;
                }
            },
            total: "TotalRow",
            type: 'json',
            model: {
                fields: {
                    SCENAno: { type: "number" },
                    SCENNro: { type: "number" },
                    SCENVer: { type: "number" },
                    SCEFecEmi: { type: "date" },
                    SCEDPdaxCli: { type: "string" },
                    CliDDes: { type: "string" },
                    MPdDDes: { type: "string" },
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: false,
        error: function (err) {
            console.log("Error FrontEnd :  :" + JSON.stringify(err));
        }
    });

    var grid = $("#gridData").kendoGrid({
        dataSource: dataSource,
        scrollable: false,
        sortable: true,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#template").html()),
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
            //{

            //    template: '<input #=blCheck? \'checked\' : \'\' # type=checkbox class ="checkbox" id="chkblCheck" />',
            //    width: "20px",
            //},
            {
                field: "SCENAno",
                title: "Año",
                width: "10px",
            },
            {
                field: "SCENNro",
                title: "Nro",
                width: "10px",
            },
            {
                field: "SCENVer",
                title: "Ver.",
                width: "10px",
            },
            {
                field: "SCEFecEmi",
                format: "{0:dd/MM/yyyy}",
                title: "Fec. Emis.",
                width: "15px",
            },
            {
                field: "SCEDPdaxCli",
                title: "Estilo Cliente",
                width: "70px",
            },
            {
                field: "E_CLIENTE.CliDDes",
                title: "Nombre del Cliente",
                width: "250px",
            },
            {
                field: "E_CLIENTE.eMarcaCliente.MPdDDes",
                title: "Marca",
                width: "200px",
            },

        ],
    }).data("kendoGrid");

    // Boton Nuevo
    $("#btnNuevo").click(function () {
        window.location.href = Enrutamiento($(this).attr('data-url'))
    });

    // Boton Nuevo
    $("#btnEditar").click(function () {
        var data = $("#gridData").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            var mCotizacion = {
                ECotizacion: {
                    SCENAno: item.SCENAno,
                    SCENNro: item.SCENNro,
                    SCENVer: item.SCENVer,
                }
            };

            console.log(JSON.stringify(item));
            console.log(encodeURIComponent(JSON.stringify(mCotizacion)));
            window.location.href = Enrutamiento($(this).attr('data-url'), 'strData=' + encodeURIComponent(JSON.stringify(mCotizacion)))
        }
        else {
            AlertMessage("DEBE SELECCIONAR UNA PARTIDA");
        }
    });
});