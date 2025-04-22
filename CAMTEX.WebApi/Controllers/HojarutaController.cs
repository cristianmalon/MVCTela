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
    [RoutePrefix( "api/Hojaruta" )]
    public class HojarutaController : ApiController
    {
        [HttpPost]
        [Route( "Insertar" )]
        public Response Insertar( Request<E_HojaRutacontrol> entidad ) {
            return new HojaRutaAplicacion( new HojaRutaControlRepositorio() ).Insertar( entidad );
        }
        // GET: Hojaruta
        [HttpPost]
        [Route( "Listar_Hojaruta" )]
        public Response<List<E_HojaRutacontrol>> Listar_Hojaruta( Request<E_HojaRutacontrol> entidad ) {
            return new HojaRutaAplicacion( new HojaRutaControlRepositorio() ).Listar( entidad );
        }

        [HttpPost]
        [Route( "ListarTransportista" )]
        public Response<List<E_Transportista>> ListarTransportista( Request<E_HojaRutacontrol> entidad ) {
            return new HojaRutaAplicacion( new HojaRutaControlRepositorio() ).ListarTransportista( entidad );
        }

        [HttpPost]
        [Route( "Listar_HojaRutaControlDetalle" )]
        public Response<List<E_HojaRutaControlDetalle>> Listar_HojaRutaControlDetalle( Request<E_HojaRutacontrol> entidad ) {
            return new HojaRutaAplicacion( new HojaRutaControlRepositorio() ).Listar_HojaRutaControlDetalle( entidad );
        }

    }
}