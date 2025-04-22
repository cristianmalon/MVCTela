using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class DefectoRepositorio : DDataAccess, IGeneralRepositorio<ENDefecto>
    {
        public IDictionary<string, object> Actualizar(ENDefecto entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdDefecto", entidad.IdDefecto);
            oConn.AddParameter("@IdTipoDefecto", entidad.IdTipoDefecto);
            oConn.AddParameter("@Defecto", entidad.Defecto);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_Defecto]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENDefecto entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdDefecto", entidad.IdDefecto);
            oConn.AddParameter("@IdTipoDefecto", entidad.IdTipoDefecto);
            oConn.AddParameter("@Defecto", entidad.Defecto);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Defecto]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENDefecto entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdDefecto", entidad.IdDefecto);
            oConn.AddParameter("@IdTipoDefecto", entidad.IdTipoDefecto);
            oConn.AddParameter("@Defecto", entidad.Defecto);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Defecto]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENDefecto entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_DefectoListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENDefecto entidad)
        {
            throw new NotImplementedException();
        }
    }
}
