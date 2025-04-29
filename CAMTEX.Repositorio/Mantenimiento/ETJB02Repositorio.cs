using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ETJB02Repositorio : DDataAccess, IGeneralRepositorio<ETJB02>
    {
        public IDictionary<string, object> Actualizar(ETJB02 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@ETjDDes", entidad.ETjDDis);
            oConn.AddParameter("@ETjDMne", entidad.ETjDMne);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@EtjID", entidad.ETjCDis);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB02]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ETJB02 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@EtjID", entidad.ETjCDis);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB02]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ETJB02 entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@ETjDDis", entidad.ETjDDis);
            oConn.AddParameter("@ETjDMne", entidad.ETjDMne);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB02]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ETJB02 entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ETJB02 entidad)
        {
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ETJB02Listar]");
            return dt;
        }
    }
}
