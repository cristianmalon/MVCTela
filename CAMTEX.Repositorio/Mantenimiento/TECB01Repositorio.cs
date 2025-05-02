using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class TECB01Repositorio : DDataAccess, IGeneralRepositorio<TECB01>
    {
        public IDictionary<string, object> Actualizar(TECB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@TecDdes", entidad.TecDdes);
            oConn.AddParameter("@TecDMne", entidad.TecDMne);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@TecID", entidad.TecID);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TECB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(TECB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@TecID", entidad.TecID);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TECB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(TECB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@TecDdes", entidad.TecDdes);
            oConn.AddParameter("@TecDMne", entidad.TecDMne);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TECB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(TECB01 entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(TECB01 entidad)
        {
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TECB01Listar]");
            return dt;
        }
    }
}
