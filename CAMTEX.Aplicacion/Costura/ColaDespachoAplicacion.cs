using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class ColaDespachoAplicacion: IGeneralAplicacion<ENColaDespacho>
    {
        private ColaDespachoRepositorio ColaDespachoRepositorio;
        public ColaDespachoAplicacion(ColaDespachoRepositorio ColaDespachoRepositorio)
        {
            this.ColaDespachoRepositorio = ColaDespachoRepositorio;
        }

        public Response Actualizar(Request<ENColaDespacho> entidad)
        {
            throw new NotImplementedException();
        }
        public Response ActualizarPrioridad(Request<ENColaDespacho> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ColaDespachoRepositorio.ActualizarPrioridad(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response ActualizarPosicionCombo(Request<ENColaDespacho> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ColaDespachoRepositorio.ActualizarPosicionCombo(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response ConvertirOFToBloque(Request<ENColaDespacho> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ColaDespachoRepositorio.ConvertirOFToBloque(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response ColaDespachoUpdOFSituacion(Request<ENColaDespacho> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ColaDespachoRepositorio.ColaDespachoUpdOFSituacion(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response DespachoOFComboCamtex(Request<ENColaDespacho> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ColaDespachoRepositorio.DespachoOFComboCamtex(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response CambioLinea(Request<ENColaDespacho> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ColaDespachoRepositorio.CambioLinea(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response AutorizarPCPM(Request<ENColaDespacho> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ColaDespachoRepositorio.AutorizarPCPM(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        
        public Response Eliminar(Request<ENColaDespacho> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ENColaDespacho> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENColaDespacho>> Listar(Request<ENColaDespacho> entidad)
        {
            Response<List<ENColaDespacho>> retorno = new Response<List<ENColaDespacho>>();

            try
            {
                DataTable dt = ColaDespachoRepositorio.Listar(entidad.entidad);
                List<ENColaDespacho> lista = new List<ENColaDespacho>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENColaDespacho()
                    {
                        PrioridadCabera = Util.CapturaInt0(row, "PrioridadCabera"),
                        PrioridadDetalle = Util.CapturaInt0(row, "PrioridadDetalle"),
                        PrioridadFinal = Util.CapturaInt0(row, "PrioridadFinal"),
                        PrioridadFinalVisible = Util.CapturaIntNull(row, "PrioridadFinalVisible"),
                        EstadoComboCerrado = Util.CapturaInt0(row, "EstadoComboCerrado"),
                        EstadoCola = Util.CapturaInt0(row, "EstadoCola"),
                        OP = Util.CapturaString(row, "OP"),
                        ComboCamtexCodigo = Util.CapturaString(row, "ComboCamtexCodigo"),
                        ComboCamtex = Util.CapturaString(row, "ComboCamtex"),
                        ComboPlanta = Util.CapturaString(row, "ComboPlanta"),
                        OFCorte = Util.CapturaString(row, "OFCorte"),
                        CantidadHabilitada = Util.CapturaInt0(row, "CantidadHabilitada"),
                        CantidadPendienteDespacho = Util.CapturaInt0(row, "CantidadPendienteDespacho"),
                        DiasStockCosturaLinea = Util.CapturaDecimal(row, "DiasStockCosturaLinea"),
                        AcumuladoDiasStockCostura = Util.CapturaDecimal(row, "AcumuladoDiasStockCostura"),

                        AuditoriaCalificacion = Util.CapturaInt0(row, "AuditoriaCalificacion"),
                        AuditoriaCalificacionDescripcion = Util.CapturaString(row, "AuditoriaCalificacionDescripcion"),
                        AuditoriaRestriccion = Util.CapturaInt0(row, "AuditoriaRestriccion"),
                        AuditoriaRestriccionDescripcion = Util.CapturaString(row, "AuditoriaRestriccionDescripcion"),
                        HabilitadoAvios = Util.CapturaInt0(row, "HabilitadoAvios"),
                        HabilitadoDescripcion = Util.CapturaString(row, "HabilitadoDescripcion"),
                        StockAptoDespachoCostura = Util.CapturaInt0(row, "StockAptoDespachoCostura"),
                        StockAptoDespachoCosturaDescripcion = Util.CapturaString(row, "StockAptoDespachoCosturaDescripcion"),
                        CierreComboStatus = Util.CapturaInt0(row, "CierreComboStatus"),
                        CierreComboStatusDescripcion = Util.CapturaString(row, "CierreComboStatusDescripcion"),
                        IdColaDespachoCabecera = Util.CapturaInt0(row, "IdColaDespachoCabecera"),
                        IdColaDespachosDetalle = Util.CapturaInt0(row, "IdColaDespachosDetalle"),

                        FechaAPT = Util.CapturaDatetime(row, "FechaAPT"),
                        Tipo = Util.CapturaInt0(row, "Tipo"),
                        EstadoAutorizadoPCPM = Util.CapturaInt0(row, "EstadoAutorizadoPCPM"),
                    });
                }

                retorno.error = false;
                retorno.response = lista;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<ENColaDespacho>> ListarOFsByPrioridad(Request<ENColaDespacho> entidad)
        {
            Response<List<ENColaDespacho>> retorno = new Response<List<ENColaDespacho>>();

            try
            {
                DataTable dt = ColaDespachoRepositorio.ListarOFsByPrioridad(entidad.entidad);
                List<ENColaDespacho> lista = new List<ENColaDespacho>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENColaDespacho()
                    {
                        PrioridadCabera = Util.CapturaInt0(row, "PrioridadCabera"),
                        PrioridadDetalle = Util.CapturaInt0(row, "PrioridadDetalle"),
                        PrioridadFinal = Util.CapturaInt0(row, "PrioridadFinal"),
                        PrioridadFinalVisible = Util.CapturaIntNull(row, "PrioridadFinalVisible"),
                        EstadoComboCerrado = Util.CapturaInt0(row, "EstadoComboCerrado"),
                        EstadoCola = Util.CapturaInt0(row, "EstadoCola"),
                        OP = Util.CapturaString(row, "OP"),
                        ComboCamtexCodigo = Util.CapturaString(row, "ComboCamtexCodigo"),
                        ComboCamtex = Util.CapturaString(row, "ComboCamtex"),
                        ComboPlanta = Util.CapturaString(row, "ComboPlanta"),
                        OFCorte = Util.CapturaString(row, "OFCorte"),
                        CantidadHabilitada = Util.CapturaInt0(row, "CantidadHabilitada"),
                        CantidadPendienteDespacho = Util.CapturaInt0(row, "CantidadPendienteDespacho"),
                        DiasStockCosturaLinea = Util.CapturaDecimal(row, "DiasStockCosturaLinea"),
                        AcumuladoDiasStockCostura = Util.CapturaDecimal(row, "AcumuladoDiasStockCostura"),

                        AuditoriaCalificacion = Util.CapturaInt0(row, "AuditoriaCalificacion"),
                        AuditoriaCalificacionDescripcion = Util.CapturaString(row, "AuditoriaCalificacionDescripcion"),
                        AuditoriaRestriccion = Util.CapturaInt0(row, "AuditoriaRestriccion"),
                        AuditoriaRestriccionDescripcion = Util.CapturaString(row, "AuditoriaRestriccionDescripcion"),
                        HabilitadoAvios = Util.CapturaInt0(row, "HabilitadoAvios"),
                        HabilitadoDescripcion = Util.CapturaString(row, "HabilitadoDescripcion"),
                        StockAptoDespachoCostura = Util.CapturaInt0(row, "StockAptoDespachoCostura"),
                        StockAptoDespachoCosturaDescripcion = Util.CapturaString(row, "StockAptoDespachoCosturaDescripcion"),
                        CierreComboStatus = Util.CapturaInt0(row, "CierreComboStatus"),
                        CierreComboStatusDescripcion = Util.CapturaString(row, "CierreComboStatusDescripcion"),
                        IdColaDespachoCabecera = Util.CapturaInt0(row, "IdColaDespachoCabecera"),
                        IdColaDespachosDetalle = Util.CapturaInt0(row, "IdColaDespachosDetalle"),

                        FechaAPT = Util.CapturaDatetime(row, "FechaAPT"),
                        Tipo = Util.CapturaInt0(row, "Tipo"),

                        
                    });
                }

                retorno.error = false;
                retorno.response = lista;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response<List<ENColaDespacho>> ListarCombosPosicion(Request<ENColaDespacho> entidad)
        {
            Response<List<ENColaDespacho>> retorno = new Response<List<ENColaDespacho>>();

            try
            {
                DataTable dt = ColaDespachoRepositorio.ListarCombosPosicion(entidad.entidad);
                List<ENColaDespacho> lista = new List<ENColaDespacho>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENColaDespacho()
                    {
                        PrioridadCabera = Util.CapturaInt0(row, "PrioridadCabera"),
                        IdColaDespachoCabecera = Util.CapturaInt0(row, "IdColaDespachoCabecera"),
                        PrioridadFinal = Util.CapturaInt0(row, "PrioridadFinal"),
                        OP = Util.CapturaString(row, "OP"),
                        ComboCamtexCodigo = Util.CapturaString(row, "ComboCamtexCodigo"),
                        ComboCamtex = Util.CapturaString(row, "ComboCamtex"),
                        ComboPlanta = Util.CapturaString(row, "ComboPlanta"),
                        OFCorte = Util.CapturaString(row, "OFCorte"),
                        


                    });
                }

                retorno.error = false;
                retorno.response = lista;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response<List<ENColaDespacho>> VerDCPO(Request<ENColaDespacho> entidad)
        {
            Response<List<ENColaDespacho>> retorno = new Response<List<ENColaDespacho>>();

            try
            {
                DataTable dt = ColaDespachoRepositorio.VerDCPO(entidad.entidad);
                List<ENColaDespacho> lista = new List<ENColaDespacho>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENColaDespacho()
                    {
                        DCPO = Util.CapturaInt0(row, "DCPO"),
                        CmbOP= Util.CapturaInt0(row, "CmbOP"),
                        ComboCliente = Util.CapturaString(row, "ComboCliente"),
                        ArteCliente = Util.CapturaString(row, "ArteCliente"),
                        POCliente = Util.CapturaString(row, "POCliente"),
                        FechaDespacho = Util.CapturaDatetime(row, "FechaDespacho")

                    });
                }

                retorno.error = false;
                retorno.response = lista;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<ENColaDespacho>> ListarPaginado(Request<ENColaDespacho> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
