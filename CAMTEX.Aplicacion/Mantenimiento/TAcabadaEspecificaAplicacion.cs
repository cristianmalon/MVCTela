using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion
{
    public class TAcabadaEspecificaAplicacion: IGeneralAplicacion<TAcabadaEspecifica>
    {
        private TAcabadaEspecificaRepositorio TacabadaEspecifica;

        public TAcabadaEspecificaAplicacion(TAcabadaEspecificaRepositorio tacabadaEspecifica)
        {
            TacabadaEspecifica = tacabadaEspecifica;
        }

        public Response Actualizar(Request<TAcabadaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<TAcabadaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<TAcabadaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TAcabadaEspecifica>> Listar(Request<TAcabadaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TAcabadaEspecifica>> ListarPaginado(Request<TAcabadaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
