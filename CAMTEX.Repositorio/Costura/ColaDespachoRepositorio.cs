using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class ColaDespachoRepositorio : DDataAccess, IGeneralRepositorio<ENColaDespacho>
    {
        public IDictionary<string, object> ActualizarPrioridad(ENColaDespacho entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {
                oConn.AddParameter("@opcion", 1);
                oConn.AddParameter("@idxFrom", entidad.IdxFrom);
                oConn.AddParameter("@idxTo", entidad.IdxTo);
                oConn.AddParameter("@IdColaDespachoCabecera", entidad.IdColaDespachoCabecera);
                oConn.AddParameter("@idLinea", entidad.IdLinea);

                DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_ColaDespachoUpdPrioridad]");
                retorno.Add("resultado", true);
                retorno.Add("mensaje", "OK");

                return retorno;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IDictionary<string, object> ActualizarPosicionCombo(ENColaDespacho entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {
                oConn.AddParameter("@opcion", 2);
                oConn.AddParameter("@idxFrom", entidad.IdxFrom);
                oConn.AddParameter("@idxTo", entidad.IdxTo);
                oConn.AddParameter("@idLinea", entidad.IdLinea);

                DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_ColaDespachoUpdPrioridad]");
                retorno.Add("resultado", true);
                retorno.Add("mensaje", "OK");

                return retorno;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IDictionary<string, object> ConvertirOFToBloque(ENColaDespacho entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {
                oConn.AddParameter("@opcion", 1);
                oConn.AddParameter("@IdColaDespachosDetalle", entidad.IdColaDespachosDetalle);
                oConn.AddParameter("@IdColaDespachos", entidad.IdColaDespachoCabecera);
                oConn.AddParameter("@IdLinea", entidad.IdLinea);
                oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
                oConn.AddParameter("@Maquina", entidad.HOST_REG);

                DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_ColaDespachoUpdOFBloque]");
                retorno.Add("resultado", true);
                retorno.Add("mensaje", "OK");

                return retorno;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IDictionary<string, object> ColaDespachoUpdOFSituacion(ENColaDespacho entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {
                oConn.AddParameter("@opcion", entidad.Opcion);
                oConn.AddParameter("@IdColaDespachosDetalle", entidad.IdColaDespachosDetalle);
                //oConn.AddParameter("@IdColaDespachos", entidad.IdColaDespachoCabecera);
                //oConn.AddParameter("@IdLinea", entidad.IdLinea);
                oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
                oConn.AddParameter("@Maquina", entidad.HOST_REG);

                oConn.AddParameter("@Estado", entidad.ESTADO);

                DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_ColaDespachoUpdOFSituacion]");
                retorno.Add("resultado", true);
                retorno.Add("mensaje", "OK");

                return retorno;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IDictionary<string, object> DespachoOFComboCamtex(ENColaDespacho entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {
                oConn.AddParameter("@opcion", entidad.Opcion);
                oConn.AddParameter("@IdColaDespachosDetalle", entidad.IdColaDespachosDetalle);
                //oConn.AddParameter("@IdColaDespachos", entidad.IdColaDespachoCabecera);
                //oConn.AddParameter("@IdLinea", entidad.IdLinea);
                oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
                oConn.AddParameter("@Maquina", entidad.HOST_REG);

                DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_ColaDespachUpdSituacionCola]");
                retorno.Add("resultado", true);
                retorno.Add("mensaje", "OK");

                return retorno;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IDictionary<string, object> CambioLinea(ENColaDespacho entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {
                oConn.AddParameter("@opcion", 1);
                oConn.AddParameter("@ConcatIdDetalles", entidad.ConcatIdDetalles);
                oConn.AddParameter("@IdColaDespacho", entidad.IdColaDespachoCabecera);
                oConn.AddParameter("@IdLineaNueva", entidad.IdLinea);
                oConn.AddParameter("@IdMotivo", entidad.IdMotivo);
                oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
                oConn.AddParameter("@Maquina", entidad.HOST_REG);

                DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_ColaDespachoUpdCambioLinea]");
                retorno.Add("resultado", true);
                retorno.Add("mensaje", "OK");

                return retorno;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IDictionary<string, object> AutorizarPCPM(ENColaDespacho entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();
            try
            {
                oConn.AddParameter("@opcion", 1);
                oConn.AddParameter("@IdColaDespachosDetalle", entidad.IdColaDespachosDetalle);
                oConn.AddParameter("@IdMotivo", entidad.IdMotivo);
                oConn.AddParameter("@IdTrabajador", entidad.IdTrabajador);
                oConn.AddParameter("@Clave", entidad.Clave);
                oConn.AddParameter("@Observaciones", entidad.Observaciones);

                oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
                oConn.AddParameter("@Maquina", entidad.HOST_REG);

                DataTable dt = oConn.ExecuteDataTable("BDCostura.[DBO].[Usp_ColaDespachoUpdOFAutorizadoPCPM]");
                retorno.Add("resultado", true);
                retorno.Add("mensaje", "OK");

                return retorno;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IDictionary<string, object> Actualizar(ENColaDespacho entidad)
        {
            throw new NotImplementedException();
        }
        public IDictionary<string, object> Eliminar(ENColaDespacho entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ENColaDespacho entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(ENColaDespacho entidad)
        {
            oConn.AddParameter("@opcion", 1);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_ColaDespachoListar]");
            return dt;
        }
        public DataTable ListarOFsByPrioridad(ENColaDespacho entidad)
        {
            oConn.AddParameter("@opcion", 3);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            oConn.AddParameter("@IdColaDespacho", entidad.IdColaDespachoCabecera);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_ColaDespachoListar]");
            return dt;
        }

        public DataTable ListarCombosPosicion(ENColaDespacho entidad)
        {
            oConn.AddParameter("@opcion", 2);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            oConn.AddParameter("@IdColaDespacho", entidad.IdColaDespachoCabecera);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_ColaDespachoListar]");
            return dt;
        }

        public DataTable VerDCPO(ENColaDespacho entidad)
        {
            oConn.AddParameter("@opcion", 4);
            oConn.AddParameter("@IdLinea", entidad.IdLinea);
            oConn.AddParameter("@IdColaDespachoDetalle", entidad.IdColaDespachosDetalle);
            DataTable dt = oConn.ExecuteDataTable("[BDCostura].[DBO].[Usp_ColaDespachoListar]");
            return dt;
        }

        public DataTable ListarPaginado(ENColaDespacho entidad)
        {
            throw new NotImplementedException();
        }
    }
}
