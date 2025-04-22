using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class SedeRepositorio : DDataAccess, IGeneralRepositorio<ENSede>
    {
        public IDictionary<string, object> Actualizar(ENSede entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@Sede", entidad.Sede);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_Sede]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENSede entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@Sede", entidad.Sede);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Sede]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENSede entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@Sede", entidad.Sede);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Sede]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENSede entidad)
        {
            oConn.AddParameter("@opcion", 1);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_SedeListar]");
            return dt;
        }
        public DataTable ListarForLogin()
        {
            oConn.AddParameter("@opcion", 2);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_SedeListar]");
            return dt;
        }
        
        public DataTable ListarPaginado(ENSede entidad)
        {
            throw new NotImplementedException();
        }
    }
}
