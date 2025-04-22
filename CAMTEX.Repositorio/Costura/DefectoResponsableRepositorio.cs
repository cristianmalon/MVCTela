using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class DefectoResponsableRepositorio : DDataAccess, IGeneralRepositorio<ENDefectoResponsable>
    {
        public IDictionary<string, object> Actualizar(ENDefectoResponsable entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdDefectoResponsable", entidad.IdDefectoResponsable);

            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_DefectoResponsable]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENDefectoResponsable entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdDefectoResponsable", entidad.IdDefectoResponsable);

            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_DefectoResponsable]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENDefectoResponsable entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdResponsableDefecto", entidad.IdResponsableDefecto);
            oConn.AddParameter("@IdDefecto", entidad.IdDefecto);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@IdEstado", entidad.IdEstado);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_DefectoResponsable]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENDefectoResponsable entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_DefectoResponsableListar]");
            return dt;
        }
        public DataTable ListarTodos(ENDefectoResponsable entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_DefectoResponsableListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENDefectoResponsable entidad)
        {
            throw new NotImplementedException();
        }
    }
}
