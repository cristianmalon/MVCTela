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
    public class TipoTenidoRepositorio : DDataAccess, IGeneralRepositorio<TipoTenido>
    {
        public IDictionary<string, object> Actualizar(TipoTenido entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(TipoTenido entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(TipoTenido entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(TipoTenido entidad)
        {
            oConn.AddParameter("@Query", 1);
            DataTable dt = oConn.ExecuteDataTable("dbseg02.[tinto].[TipoTenido]");
            return dt;
        }

        public DataTable ListarPaginado(TipoTenido entidad)
        {
            throw new NotImplementedException();
        }
    }
}
