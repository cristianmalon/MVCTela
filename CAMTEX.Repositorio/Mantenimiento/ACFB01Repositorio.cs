using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ACFB01Repositorio : DDataAccess, IGeneralRepositorio<ACFB01>
    {
        public IDictionary<string, object> Actualizar(ACFB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@AcfDdes", entidad.AcfDdes);
            oConn.AddParameter("@AcfDMne", entidad.AcfDMne);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@AcfID", entidad.AcfID);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ACFB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ACFB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@AcfID", entidad.AcfID);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ACFB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ACFB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@AcfDdes", entidad.AcfDdes);
            oConn.AddParameter("@AcfDMne", entidad.AcfDMne);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ACFB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ACFB01 entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ACFB01 entidad)
        {
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ACFB01Listar]");
            return dt;
        }
    }
}
