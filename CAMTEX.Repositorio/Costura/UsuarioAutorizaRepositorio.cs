using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class UsuarioAutorizaRepositorio : DDataAccess, IGeneralRepositorio<ENUsuario>
    {
        public IDictionary<string, object> Actualizar(ENUsuario entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(ENUsuario entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ENUsuario entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(ENUsuario entidad)
        {
            throw new NotImplementedException();
        }
        public DataTable ListarAutPCPM(ENUsuario entidad)
        {
            oConn.AddParameter("@opcion", 1);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_UsuarioListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENUsuario entidad)
        {
            throw new NotImplementedException();
        }
    }
}
