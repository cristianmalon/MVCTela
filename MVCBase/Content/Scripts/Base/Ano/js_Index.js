
    $(document).ready(function () {
        ConsultaAno();

        $("#btnBuscarAno").click(function () {
            ConsultaAno();
        });

        $("#btnActAno").click(function () {


            var dataDetalleAno = $("#gridAno").data("kendoGrid");
            var itemDataAno = dataDetalleAno.dataItem(dataDetalleAno.select());
            if (itemDataAno != undefined) {
                var url = $(this).attr('data-url') + '?Ano=' + itemDataAno.XANO;
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

    function ConsultaAno() {

        var filtro = $("#txtFiltroAno").val();
        if (filtro == null)
            filtro = '';
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Ano/ListaAno',
            type: 'POST',
            data: JSON.stringify({ FiltroAno: filtro }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                console.log(data);
                gridListaAno(data.l_Ano);
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });

    }


    function gridListaAno(data) {

        $("#gridAno").kendoGrid({
            sortable: true,
            resizable: true,
            dataSource: {
                data: data,
                pageSize: 5
            },
            selectable: "multiple",
            sortable: true,
            pageable: true,
            columns: [
                {
                    field: "XANO",
                    width: 90,
                    title: "ID_ANO",
                    hidden: true
                }, {
                    field: "DESCRIPCION",
                    width: 150,
                    title: "AÑO",
                    hidden: false
                }, {
                    field: "FLG_ESTADO",
                    title: "ESTADO",
                    width: 120
                }]
        });

    }