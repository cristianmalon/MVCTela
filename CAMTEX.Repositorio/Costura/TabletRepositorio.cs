using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class TabletRepositorio : DDataAccess, IGeneralRepositorio<ENTablet>
    {
        public IDictionary<string, object> Actualizar(ENTablet entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdTablet", entidad.IdTablet);
            oConn.AddParameter("@Descripcion", entidad.Descripcion);
            oConn.AddParameter("@CodigoSap", entidad.CodigoSap);
            oConn.AddParameter("@Marca", entidad.Marca);
            oConn.AddParameter("@Modelo", entidad.Modelo);
            oConn.AddParameter("@Serie", entidad.Serie);
            oConn.AddParameter("@Estado", entidad.IdEstado);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            oConn.AddParameter("@IPTablet", entidad.IPTablet);
            oConn.AddParameter("@IdPmqB01", entidad.IdMaquina);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_Tablet]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENTablet entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdTablet", entidad.IdTablet);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_Tablet]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENTablet entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdTablet", entidad.IdTablet);
            oConn.AddParameter("@Descripcion", entidad.Descripcion);
            oConn.AddParameter("@CodigoSap", entidad.CodigoSap);
            oConn.AddParameter("@Marca", entidad.Marca);
            oConn.AddParameter("@Modelo", entidad.Modelo);
            oConn.AddParameter("@Serie", entidad.Serie);
            oConn.AddParameter("@Estado", entidad.IdEstado);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            oConn.AddParameter("@IPTablet", entidad.IPTablet);
            oConn.AddParameter("@IdPmqB01", entidad.IdMaquina);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_Tablet]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENTablet entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IPTablet", entidad.IPTablet);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TabletListar]");
            return dt;
        }

        public DataTable ListarPaginado(ENTablet entidad)
        {
            oConn.AddParameter("@opcion", 1);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TabletListar]");
            return dt;
        }
    }
}
