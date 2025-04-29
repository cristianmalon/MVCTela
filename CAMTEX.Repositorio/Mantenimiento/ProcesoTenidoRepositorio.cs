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
    public class ProcesoTenidoRepositorio : DDataAccess, IGeneralRepositorio<ProcesoTenido>
    {
        public IDictionary<string, object> Actualizar(ProcesoTenido entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(ProcesoTenido entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ProcesoTenido entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(ProcesoTenido entidad)
        {
            oConn.AddParameter("@Query", 1);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[USP_ProcesoTinto]");
            return dt;
        }

        public DataTable ListarPaginado(ProcesoTenido entidad)
        {
            throw new NotImplementedException();
        }
    }
}
