using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Repositorio
{
    public class USUARIO_ACCESORepositorio : DDataAccess, IGeneralRepositorio<USUARIO_ACCESO>
    {
        public IDictionary<string, object> Actualizar(USUARIO_ACCESO entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(USUARIO_ACCESO entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(USUARIO_ACCESO entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(USUARIO_ACCESO entidad)
        {
            oConn.AddParameter("@Query", 2);
            oConn.AddParameter("@SUsrId", entidad.SUsrId);
            DataTable dt = oConn.ExecuteDataTable("[dbo].[USP_IMP_SEL_USUARIO]");
            return dt;
        }

        public DataTable ListarPaginado(USUARIO_ACCESO entidad)
        {
            throw new NotImplementedException();
        }
    }
}
