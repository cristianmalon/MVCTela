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
    public class TCrudaMadreAplicacion: IGeneralAplicacion<TCrudaMadre>
    {
        private TCrudaMadreRepositorio TcrudaMadreRepositorio;

        public TCrudaMadreAplicacion(TCrudaMadreRepositorio tcrudaMadreRepositorio)
        {
            TcrudaMadreRepositorio = tcrudaMadreRepositorio;
        }

        public Response Actualizar(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TCrudaMadre>> Listar(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TCrudaMadre>> ListarPaginado(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
