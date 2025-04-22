using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class TipoDefectoRepositorio : DDataAccess, IGeneralRepositorio<ENTipoDefecto>
    {
        public IDictionary<string, object> Actualizar(ENTipoDefecto entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdTipoDefecto", entidad.IdTipoDefecto);
            oConn.AddParameter("@TipoDefecto", entidad.TipoDefecto);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_TipoDefecto]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENTipoDefecto entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdTipoDefecto", entidad.IdTipoDefecto);
            oConn.AddParameter("@TipoDefecto", entidad.TipoDefecto);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_TipoDefecto]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENTipoDefecto entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdTipoDefecto", entidad.IdTipoDefecto);
            oConn.AddParameter("@TipoDefecto", entidad.TipoDefecto);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@Codigo", entidad.Codigo);
            
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_TipoDefecto]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENTipoDefecto entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_TipoDefectoListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENTipoDefecto entidad)
        {
            throw new NotImplementedException();
        }
    }
}
