using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class MaquinaRepositorio : DDataAccess, IGeneralRepositorio<ENMaquina>
    {
        public IDictionary<string, object> Actualizar(ENMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdMaquina", entidad.IdMaquina);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@IdTipoMaquina", entidad.IdTipoMaquina);
            oConn.AddParameter("@Item", entidad.Item);
            oConn.AddParameter("@CodigoSap", entidad.CodigoSap);
            oConn.AddParameter("@CentroCostos", entidad.CentroCostos);
            oConn.AddParameter("@Marca", entidad.Marca);
            oConn.AddParameter("@Modelo", entidad.Modelo);
            oConn.AddParameter("@Serie", entidad.Serie);
            oConn.AddParameter("@Familia", entidad.Familia);
            oConn.AddParameter("@SubFamilia", entidad.SubFamilia);
            oConn.AddParameter("@CentroCostosArea", entidad.CentroCostosArea);
            oConn.AddParameter("@CentroCostosAreaDesc", entidad.CentroCostosAreaDesc);
            oConn.AddParameter("@EstadoMaquina", entidad.EstadoMaquina);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_Maquina]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdMaquina", entidad.IdMaquina);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_Maquina]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Insertar(ENMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdMaquina", entidad.IdMaquina);
            oConn.AddParameter("@Maquina", entidad.Maquina);
            oConn.AddParameter("@IdTipoMaquina", entidad.IdTipoMaquina);
            oConn.AddParameter("@Item", entidad.Item);
            oConn.AddParameter("@CodigoSap", entidad.CodigoSap);
            oConn.AddParameter("@CentroCostos", entidad.CentroCostos);
            oConn.AddParameter("@Marca", entidad.Marca);
            oConn.AddParameter("@Modelo", entidad.Modelo);
            oConn.AddParameter("@Serie", entidad.Serie);
            oConn.AddParameter("@Familia", entidad.Familia);
            oConn.AddParameter("@SubFamilia", entidad.SubFamilia);
            oConn.AddParameter("@CentroCostosArea", entidad.CentroCostosArea);
            oConn.AddParameter("@CentroCostosAreaDesc", entidad.CentroCostosAreaDesc);
            oConn.AddParameter("@EstadoMaquina", entidad.EstadoMaquina);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_Maquina]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> ActualizaUbicacion(ENMaquina entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@opcion", 4);
            oConn.AddParameter("@IdMaquina", entidad.IdMaquina);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            oConn.AddParameter("@IdUbicacion", entidad.IdUbicacion);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_Maquina]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public DataTable Listar(ENMaquina entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdSede", entidad.IdSede);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_MaquinaListar]");
            return dt;
        }

        public DataTable ListarMaquinasActivas(ENMaquina entidad)
        {
            oConn.AddParameter("@opcion", 2);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_MaquinaListar]");
            return dt;
        }

        public DataTable ListarItemSAP()
        {
            oConn.AddParameter("@opcion", 1);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[USP_ITEM_SAP]");
            return dt;
        }

        public DataTable ListarPaginado(ENMaquina entidad)
        {
            throw new NotImplementedException();
        }
    }
}
