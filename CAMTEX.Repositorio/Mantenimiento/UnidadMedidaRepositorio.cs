using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Repositorio
{
    public class UnidadMedidaRepositorio : DDataAccess, IGeneralRepositorio<UnidadMedida>
    {
        public IDictionary<string, object> Actualizar(UnidadMedida entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(UnidadMedida entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(UnidadMedida entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(UnidadMedida entidad)
        {
            oConn.AddParameter("@Query", 1);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[USP_UnidadMedida]");
            return dt;
        }

        public DataTable ListarPaginado(UnidadMedida entidad)
        {
            throw new NotImplementedException();
        }
    }
}
