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
    public class TCrudaEspecificaAplicacion: IGeneralAplicacion<TCrudaEspecifica>
    {
        private TCrudaEspecificaRepositorio TcrudaEspecifica;

        public TCrudaEspecificaAplicacion(TCrudaEspecificaRepositorio tcrudaEspecifica)
        {
            TcrudaEspecifica = tcrudaEspecifica;
        }

        public Response Actualizar(Request<TCrudaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<TCrudaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<TCrudaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TCrudaEspecifica>> Listar(Request<TCrudaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TCrudaEspecifica>> ListarPaginado(Request<TCrudaEspecifica> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
