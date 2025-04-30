using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ACQB01Repositorio : DDataAccess, IGeneralRepositorio<ACQB01>
    {
        public IDictionary<string, object> Actualizar(ACQB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@AcqDdes", entidad.AcqDdes);
            oConn.AddParameter("@AcqDMne", entidad.AcqDMne);
            oConn.AddParameter("@AcqSclase", entidad.AcqSclase);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@AcqID", entidad.AcqID);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ACQB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ACQB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@AcqID", entidad.AcqID);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ACQB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ACQB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@AcqDdes", entidad.AcqDdes);
            oConn.AddParameter("@AcqDMne", entidad.AcqDMne);
            oConn.AddParameter("@AcqSclase", entidad.AcqSclase);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ACQB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ACQB01 entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ACQB01 entidad)
        {
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ACQB01Listar]");
            return dt;
        }
    }
}
