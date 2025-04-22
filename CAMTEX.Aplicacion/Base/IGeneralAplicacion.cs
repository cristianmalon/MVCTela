using CAMTEX.Aplicacion.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion.Base
{
    public interface IGeneralAplicacion <T>
    {
        Response Insertar(Request<T> entidad);
        Response Actualizar(Request<T> entidad);
        Response Eliminar(Request<T> entidad);
        Response<List<T>> Listar(Request<T> entidad);
        Response<List<T>> ListarPaginado(Request<T> entidad);
    }
}
