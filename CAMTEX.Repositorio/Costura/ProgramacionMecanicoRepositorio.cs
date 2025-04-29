using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ProgramacionMecanicoRepositorio : DDataAccess, IGeneralRepositorio<ENProgramacionMecanico>
    {
        public IDictionary<string, object> Actualizar(ENProgramacionMecanico entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdProgramacionMecanico", entidad.IdProgramacionMecanico);
            oConn.AddParameter("@EPLCCOD", entidad.EPLCCOD);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ProgramacionMecanico]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENProgramacionMecanico entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdProgramacionMecanico", entidad.IdProgramacionMecanico);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ProgramacionMecanico]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENProgramacionMecanico entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@EPLCCOD", entidad.EPLCCOD);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_ProgramacionMecanico]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENProgramacionMecanico entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ENProgramacionMecanico entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@FechaProgramacion", entidad.FechaProgramacion);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_ProgramacionMecanicoListar]");
            return dt;
        }
        public DataTable ListarDetalleAlerta(ENProgramacionMecanico entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@FechaProgramacion", entidad.FechaProgramacion);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_ProgramacionMecanicoListar]");
            return dt;
        }
        public DataTable ListarReporteAlerta(ENProgramacionMecanico entidad)
        {
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@FechaProgramacion", entidad.FechaProgramacion);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_ProgramacionMecanicoListar]");
            return dt;
        }

        public DataTable ListarMecanicosConfigurados(ENProgramacionMecanico entidad)
        {
            oConn.AddParameter("@opcion", 4);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_ProgramacionMecanicoListar]");
            return dt;
        }

        public DataTable ListarPersonalMantenimiento(ENProgramacionMecanico entidad)
        {
            oConn.AddOutParameter("@Query", 4);
            oConn.AddOutParameter("@Codigo", "");
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_Supervisor]");
            return dt;
        }
    }
}
