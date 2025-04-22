using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class TipoMaquinaRepositorio : DDataAccess, IGeneralRepositorio<ENTipoMaquina>
    {
        public IDictionary<string, object> Actualizar(ENTipoMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdTipoMaquina", entidad.IdTipoMaquina);
            oConn.AddParameter("@TipoMaquina", entidad.TipoMaquina);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TipoMaquina]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENTipoMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdTipoMaquina", entidad.IdTipoMaquina);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TipoMaquina]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENTipoMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@TipoMaquina", entidad.TipoMaquina);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@Maquina", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TipoMaquina]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENTipoMaquina entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TipoMaquinaListar]");
            return dt;
        }

        public DataTable ListarActivo(ENTipoMaquina entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_TipoMaquinaListar]");
            return dt;
        }

        public DataTable Listar_subtipo(ENTipoMaquina entidad)
        { 
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_SubTipoMaquinaListar]");
            return dt;
        }
        public DataTable ListarPaginado(ENTipoMaquina entidad)
        {
            throw new NotImplementedException();
        }
    }
}
