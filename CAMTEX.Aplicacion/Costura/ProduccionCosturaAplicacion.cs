using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion
{
    public class ProduccionCosturaAplicacion : IGeneralAplicacion<ENProduccionCostura>
    {
        private ProduccionCosturaRepositorio ProduccionCosturaRepositorio;
        public ProduccionCosturaAplicacion(ProduccionCosturaRepositorio ProduccionCosturaRepositorio)
        {
            this.ProduccionCosturaRepositorio = ProduccionCosturaRepositorio;
        }

        public Response Actualizar(Request<ENProduccionCostura> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<ENProduccionCostura> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ENProduccionCostura> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENProduccionCostura>> Listar(Request<ENProduccionCostura> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENProduccionCostura>> ListarPaginado(Request<ENProduccionCostura> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENProduccionCostura>> ListarComboCorte(Request<ENProduccionCostura> entidad)
        {
            Response<List<ENProduccionCostura>> retorno = new Response<List<ENProduccionCostura>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarComboCorte(entidad.entidad);
                List<ENProduccionCostura> lista = new List<ENProduccionCostura>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProduccionCostura()
                    {
                        OPNro = Util.CapturaString(row, "OPENNRO"),
                        ComboCliente = Util.CapturaString(row, "COMBOCLIENTE"),
                        ComboCamtex = Util.CapturaString(row, "COMBOPLANTA"),
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
        public Response<List<ENOperacion>> ListarOperacionesCorte(Request<ENProduccionCostura> entidad)
        {
            Response<List<ENOperacion>> retorno = new Response<List<ENOperacion>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarOperacionesCorte(entidad.entidad);
                List<ENOperacion> lista = new List<ENOperacion>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENOperacion()
                    {
                        CodOperacion = Util.CapturaString(row, "HJOOPECOD"),
                        Descripcion = Util.CapturaString(row, "HJOOPEDESOC"),
                        TIEMPOESTANDAR = Util.CapturaString(row, "TIEMPOESTANDAR"),
                        TIEMPOTEORICO = Util.CapturaString(row, "TIEMPOTEORICO"),
                        PRENDASHORA = Util.CapturaString(row, "PRENDASHORA"),

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
        public Response<List<ENPaquetes>> ListarPaquetesCorte(Request<ENProduccionCostura> entidad)
        {
            Response<List<ENPaquetes>> retorno = new Response<List<ENPaquetes>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarPaquetesCorte(entidad.entidad);
                List<ENPaquetes> lista = new List<ENPaquetes>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENPaquetes()
                    {
                        Paquete = Util.CapturaInt0(row, "COCNITMPAQ"),
                        Talla = Util.CapturaString(row, "TALLA"),
                        CantidadPrendas = Util.CapturaInt0(row, "PRENDAS"),
                        Estado= Util.CapturaInt0(row, "CodEstProcLec"),
                        HJONOCMB = Util.CapturaInt0(row, "HJONOCMB"),
                        HJONITM = Util.CapturaInt0(row, "HJONITM"),
                        COCCCODTAL = Util.CapturaString(row, "CODTALLA"),
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
        public Response RegistroParadaNoMecanica(Request<ENParada> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ProduccionCosturaRepositorio.RegistroParadaNoMecanica(entidad.entidad);
                retorno.Success = true;
                retorno.error = false;
                retorno.output = resultado["IdParada"].ToString();
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response RegistroPaqueteCorte(Request<ENPaquetes> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ProduccionCosturaRepositorio.RegistroPaqueteCorte(entidad.entidad);
                retorno.Success = true;
                retorno.error = false;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response<List<ENParada>> ListarParada(Request<ENProduccionCostura> entidad)
        {
            Response<List<ENParada>> retorno = new Response<List<ENParada>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarParada(entidad.entidad);
                List<ENParada> lista = new List<ENParada>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENParada()
                    {
                        RpmFIni = Util.CapturaDatetime(row, "RpmFIni"),
                        IdMotivoParada = Util.CapturaInt0(row, "IdMotivoParada"),
                        RpmFFin = Util.CapturaDatetime(row, "RpmFFin"),
                        RpmEstado = Util.CapturaInt0(row, "RpmEstado"),
                        IdParada = Util.CapturaInt0(row, "IdRpmD01"),
                        RpmFIniMecanico = Util.CapturaDatetime(row, "RpmFIniMecanico"),
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

        public Response<List<Supervisor>> ListarPersonalMantenimiento(Request<Supervisor> entidad)
        {
            Response<List<Supervisor>> retorno = new Response<List<Supervisor>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarPersonalMantenimiento(entidad.entidad);
                List<Supervisor> lista = new List<Supervisor>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Supervisor()
                    {
                        Codigo = row["EPLCCOD"] != DBNull.Value ? row["EPLCCOD"].ToString() : string.Empty,
                        Descripcion = row["EPLDNOM"] != DBNull.Value ? row["EPLCCOD"].ToString()+" - "+row["EPLDNOM"].ToString().Trim() : string.Empty,
                        Cargo = row["Cargo"] != DBNull.Value ? row["Cargo"].ToString() : string.Empty,
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

        public Response<List<ENEficiencia>> ListarEficiencia(Request<ENEficiencia> entidad)
        {
            Response<List<ENEficiencia>> retorno = new Response<List<ENEficiencia>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarEficiencia(entidad.entidad);
                List<ENEficiencia> lista = new List<ENEficiencia>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENEficiencia()
                    {
                        ANIOSEMANA = row["ANIOSEMANA"] != DBNull.Value ? row["ANIOSEMANA"].ToString() : string.Empty,
                        SEMANA = row["SEMANA"] != DBNull.Value ? row["SEMANA"].ToString() : string.Empty,
                        CODIGO = row["CODIGO"] != DBNull.Value ? row["CODIGO"].ToString() : string.Empty,
                        NOMBRE = row["NOMBRE"] != DBNull.Value ? row["NOMBRE"].ToString() : string.Empty,
                        EFICIENCIA = row["EFICIENCIA"] != DBNull.Value ? row["EFICIENCIA"].ToString() : string.Empty,
                        EFICIENCIAPROMEDIO = row["EFICIENCIAPROMEDIO"] != DBNull.Value ? row["EFICIENCIAPROMEDIO"].ToString() : string.Empty,
                        CATEGORIA = row["CATEGORIA"] != DBNull.Value ? row["CATEGORIA"].ToString() : string.Empty,
                        PUESTO = row["PUESTO"] != DBNull.Value ? row["PUESTO"].ToString() : string.Empty,
                        MINUTOSPRODUCIDOS = row["MINUTOSPRODUCIDOS"] != DBNull.Value ? row["MINUTOSPRODUCIDOS"].ToString() : string.Empty,
                        MINUTOSDISPONIBLES = row["MINUTOSDISPONIBLES"] != DBNull.Value ? row["MINUTOSDISPONIBLES"].ToString() : string.Empty,
                        LINEA = row["LINEA"] != DBNull.Value ? row["LINEA"].ToString() : string.Empty,
                        MINUTOSREAL = row["MINUTOSREAL"] != DBNull.Value ? row["MINUTOSREAL"].ToString() : string.Empty,
                        MINUTOSMETA = row["MINUTOSMETA"] != DBNull.Value ? row["MINUTOSMETA"].ToString() : string.Empty,

                        EFICIENCIAINDIVIDUAL = row["EFICIENCIAINDIVIDUAL"] != DBNull.Value ? row["EFICIENCIAINDIVIDUAL"].ToString() : string.Empty,
                        EFICIENCIASALIDA = row["EFICIENCIASALIDA"] != DBNull.Value ? row["EFICIENCIASALIDA"].ToString() : string.Empty,

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

        public Response<List<ENEficiencia_Ticket>> ListarTicketsLeidos(Request<ENEficiencia> entidad)
        {
            Response<List<ENEficiencia_Ticket>> retorno = new Response<List<ENEficiencia_Ticket>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarTicketsLeidos(entidad.entidad);
                List<ENEficiencia_Ticket> lista = new List<ENEficiencia_Ticket>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENEficiencia_Ticket()
                    {
                        DESOPERACION = row["DESOPERACION"] != DBNull.Value ? row["DESOPERACION"].ToString() : string.Empty,
                        CODOPERACION = row["CODOPERACION"] != DBNull.Value ? row["CODOPERACION"].ToString() : string.Empty,
                        TICKESTLEIDOS = row["TICKESTLEIDOS"] != DBNull.Value ? row["TICKESTLEIDOS"].ToString() : string.Empty,
                        PRENDAS = row["PRENDAS"] != DBNull.Value ? row["PRENDAS"].ToString() : string.Empty,
                        TIEMPOSTANDAR = row["TIEMPOSTANDAR"] != DBNull.Value ? row["TIEMPOSTANDAR"].ToString() : string.Empty,
                        MINPRODUCIDOS = row["MINPRODUCIDOS"] != DBNull.Value ? row["MINPRODUCIDOS"].ToString() : string.Empty,
                        
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
        public Response<List<ENProduccionCostura>> ListarColaDespacho(Request<ENProduccionCostura> entidad)
        {
            Response<List<ENProduccionCostura>> retorno = new Response<List<ENProduccionCostura>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarColaDespacho(entidad.entidad);
                List<ENProduccionCostura> lista = new List<ENProduccionCostura>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProduccionCostura()
                    {
                        anio = Util.CapturaInt0(row, "OFCorteAnio"),
                        Corte = Util.CapturaInt0(row, "OFCorteNro"),

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

        public Response<List<ENProduccionCostura>> ListarColaDespachoPaginado(Request<ENProduccionCostura> entidad)
        {
            Response<List<ENProduccionCostura>> retorno = new Response<List<ENProduccionCostura>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarColaDespachoPaginado(entidad.entidad);
                List<ENProduccionCostura> lista = new List<ENProduccionCostura>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProduccionCostura()
                    {
                        OPNro = Util.CapturaString(row, "OP"),
                        Corte_string = Util.CapturaString(row, "OFCorteAnio")+"-"+ Util.CapturaString(row, "OFCorteNro"),
                        CantPrendas = Util.CapturaString(row, "CantPrendas"),
                        ComboCliente = Util.CapturaString(row, "ComboCliente"),
                        ComboCamtex = Util.CapturaString(row, "ComboCamtex"),
                        FechaHora = Util.CapturaDatetime(row, "FechaHora"),
                        HI = Util.CapturaString(row, "HI"),
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

        public Response<List<ENCorte>> ListarColaDespachoLinea(Request<ENProduccionCostura> entidad)
        {
            Response<List<ENCorte>> retorno = new Response<List<ENCorte>>();

            try
            {
                DataTable dt = ProduccionCosturaRepositorio.ListarColaDespachoPaginado(entidad.entidad);
                List<ENCorte> lista = new List<ENCorte>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENCorte()
                    {
                        Prioridad = Util.CapturaInt0(row, "PrioridadFinal"),
                        Corte_string = Util.CapturaString(row, "OFCorteAnio") + " - " + Util.CapturaString(row, "OFCorteNro"),
                        anio = Util.CapturaInt0(row, "OFCorteAnio"),
                        Corte = Util.CapturaInt0(row, "OFCorteNro"),

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
    }
}
