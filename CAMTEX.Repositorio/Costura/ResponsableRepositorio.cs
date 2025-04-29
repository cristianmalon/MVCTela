using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ResponsableRepositorio : DDataAccess, IGeneralRepositorio<ENResponsable>
    {
        public IDictionary<string, object> Actualizar(ENResponsable entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdResponsable", entidad.IdResponsable);
            oConn.AddParameter("@Responsable", entidad.Responsable);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_Responsable]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENResponsable entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdResponsable", entidad.IdResponsable);
            oConn.AddParameter("@Responsable", entidad.Responsable);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Responsable]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENResponsable entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdResponsable", entidad.IdResponsable);
            oConn.AddParameter("@Responsable", entidad.Responsable);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@Codigo", entidad.Codigo);

            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Responsable]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENResponsable entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_ResponsableListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENResponsable entidad)
        {
            throw new NotImplementedException();
        }
    }
}
