using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class MotivoRepositorio : DDataAccess, IGeneralRepositorio<ENMotivo>
    {
        public IDictionary<string, object> Actualizar(ENMotivo entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdMotivo", entidad.IdMotivo);
            oConn.AddParameter("@Motivo", entidad.Motivo);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@AreaResponsableCod", entidad.AreaResponsableCod);
            oConn.AddParameter("@IdTipoMotivo", entidad.IdTipoMotivo);
            DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_Motivo]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            //retorno.Add("IdTrabajador", dt.Rows[0]["IdTrabajador"].ToString());
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENMotivo entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdMotivo", entidad.IdMotivo);
            oConn.AddParameter("@Motivo", entidad.Motivo);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@AreaResponsableCod", entidad.AreaResponsableCod);
            oConn.AddParameter("@IdTipoMotivo", entidad.IdTipoMotivo);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Motivo]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENMotivo entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdMotivo", entidad.IdMotivo);
            oConn.AddParameter("@Motivo", entidad.Motivo);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@AreaResponsableCod", entidad.AreaResponsableCod);
            oConn.AddParameter("@IdTipoMotivo", entidad.IdTipoMotivo);
            oConn.AddParameter("@Mecanico", entidad.Mecanico);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Motivo]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENMotivo entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@Mecanico", entidad.Mecanico);
            oConn.AddParameter("@IdTipoMotivo", entidad.IdTipoMotivo);
            oConn.AddParameter("@Estado", entidad.ESTADO);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_MotivoListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENMotivo entidad)
        {
            throw new NotImplementedException();
        }


        public IDictionary<string, object> InsertarParadaNoMecanica(ENMotivo entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdMotivo", entidad.IdMotivo);
            oConn.AddParameter("@Motivo", entidad.Motivo);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            oConn.AddParameter("@AreaResponsableCod", entidad.AreaResponsableCod);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_Motivo]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable ListarParada(ENMotivo entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_MotivoListar]");
            return dt;
        }

        public DataTable ListarParadaMecanica(ENMotivo entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_MotivoListar]");
            return dt;
        }

        

        public DataTable ListarAreaResponsable(ENAreaResponsable entidad)
        {
            oConn.AddParameter("@opcion", 1);            
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[USP_AreaResponsableListar]");
            return dt;
        }
    }
}
