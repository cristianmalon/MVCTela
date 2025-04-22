using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public interface IGeneralRepositorio<T>
    {
        IDictionary<string, object> Insertar(T entidad);
        IDictionary<string, object> Actualizar(T entidad);
        IDictionary<string, object> Eliminar(T entidad);
        DataTable Listar(T entidad);
        DataTable ListarPaginado(T entidad);
    }
}
