using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ETJB04Repositorio : DDataAccess, IGeneralRepositorio<ETJB04>
    {
        public IDictionary<string, object> Actualizar(ETJB04 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@ETjDTDi", entidad.ETjDTDi);
            oConn.AddParameter("@ETjDMne", entidad.ETjDMne);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@EtjID", entidad.ETjCTDi);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB04]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ETJB04 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@EtjID", entidad.ETjCTDi);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB04]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ETJB04 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@ETjDTDi", entidad.ETjDTDi);
            oConn.AddParameter("@ETjDMne", entidad.ETjDMne);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB04]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ETJB04 entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ETJB04 entidad)
        {
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB04Listar]");
            return dt;
        }
    }
}
