using CAMTEX.Aplicacion;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CAMTEX.WebApi.Controllers
{
    [RoutePrefix( "api/ControlDespachoOS" )]
    public class ControlDespachoOSController : ApiController
    {
        [HttpPost]
        [Route( "Insertar" )]
        public Response Insertar( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).Insertar( entidad );
        }

        [HttpPost]
        [Route( "Generar_Despacho_Placa" )]
        public Response Generar_Despacho_Placa( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).Generar_Despacho_Placa( entidad );
        }

        [HttpPost]
        [Route( "InsertarDestino" )]
        public Response InsertarDestino( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).InsertarDestino( entidad );
        }

        [HttpPost]
        [Route( "ListarPaginado" )]
        public Response<List<E_CDSD01>> ListarPaginado( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).ListarPaginado( entidad );
        }

        [HttpPost]
        [Route( "BuscarGuiaCab" )]
        public Response<List<E_CDSD01>> Listar( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).Listar( entidad );
        }

        [HttpPost]
        [Route( "BuscarGuiasPlaca" )]
        public Response<List<E_CDSD01>> ListarAyuda( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).ListarAyuda( entidad );
        }

        [HttpPost]
        [Route( "BuscarGuiaCabDestino" )]
        public Response<List<E_CDSD01>> ListarDestino( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).ListarDestino( entidad );
        }

        [HttpPost]
        [Route( "BuscarGuiasPlacaDestino" )]
        public Response<List<E_CDSD01>> ListarAyudadestino( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).ListarAyudadestino( entidad );
        }

        [HttpPost]
        [Route( "BuscarGuiaDet" )]
        public Response<List<E_CDSD02>> ListarDetalle( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).ListarDetalle( entidad );
        }

        [HttpPost]
        [Route( "ListarDetalleDestino" )]
        public Response<List<E_CDSD02>> ListarDetalleDestino( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).ListarDetalleDestino( entidad );
        }

        [HttpPost]
        [Route( "ListarPlaca" )]
        public Response ListarPlaca( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).ListarPlaca( entidad );
        }

        [HttpPost]
        [Route( "Listar_Reporte_Despacho" )]
        public Response<List<E_CDSD01>> Listar_Reporte_Despacho( Request<E_CDSD01> entidad ) {
            return new CDSD01Aplicacion( new CDSD01Repositorio() ).Listar_Reporte_Despacho( entidad );
        }
    }
}
