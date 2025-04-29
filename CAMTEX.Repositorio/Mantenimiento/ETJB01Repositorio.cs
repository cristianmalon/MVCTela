using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ETJB01Repositorio : DDataAccess, IGeneralRepositorio<ETJB01>
    {
        public IDictionary<string, object> Actualizar(ETJB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@ETjDDes", entidad.ETjDDes);
            oConn.AddParameter("@ETjDMne", entidad.ETjDMne);
            oConn.AddParameter("@ETjSTip", entidad.ETjSTip);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@EtjID", entidad.EtjID);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ETJB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@EtjID", entidad.EtjID);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ETJB01 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@ETjDDes", entidad.ETjDDes);
            oConn.AddParameter("@ETjDMne", entidad.ETjDMne);
            oConn.AddParameter("@ETjSTip", entidad.ETjSTip);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB01]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ETJB01 entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ETJB01 entidad)
        {
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB01Listar]");
            return dt;
        }
    }
}
