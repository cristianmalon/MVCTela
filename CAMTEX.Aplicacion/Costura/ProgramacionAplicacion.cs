using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class ProgramacionAplicacion : IGeneralAplicacion<ENProgramacion>
    {
        private ProgramacionRepositorio ProgramacionRepositorio;
        public ProgramacionAplicacion(ProgramacionRepositorio ProgramacionRepositorio)
        {
            this.ProgramacionRepositorio = ProgramacionRepositorio;
        }
        public Response Actualizar(Request<ENProgramacion> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<ENProgramacion> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ENProgramacion> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENProgramacion>> Listar(Request<ENProgramacion> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENProgramacion>> ListarPaginado(Request<ENProgramacion> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENProgramacion>> ListarPlanCuotas(Request<ENProgramacion> entidad)
        {
            Response<List<ENProgramacion>> retorno = new Response<List<ENProgramacion>>();

            try
            {
                DataTable dt = ProgramacionRepositorio.ListarPlanCuotas(entidad.entidad);
                List<ENProgramacion> lista = new List<ENProgramacion>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProgramacion()
                    {
                        

                        dcpctoc = Util.CapturaString(row, "dcpctoc"),
                        dcpnaop = Util.CapturaString(row, "dcpnaop"),
                        dcpnnop = Util.CapturaString(row, "dcpnnop"),
                        dcpncmbop = Util.CapturaInt0(row, "dcpncmbop"),
                        CodigoyDescripciondeComboCamtex = Util.CapturaString(row, "CodigoyDescripciondeComboCamtex"),
                        ModulodeCortedeltendido = Util.CapturaString(row, "ModulodeCortedeltendido"),
                        OFCorte = Util.CapturaString(row, "OFCorte"),
                        LineaProgramada = Util.CapturaString(row, "LineaProgramada"),
                        //Tallas = Util.CapturaString(row, "Tallas"),
                        //TallasDesc = Util.CapturaString(row, "TallasDesc"),
                        //QtyporTalla = Util.CapturaInt0(row, "QtyporTalla"),
                        //Total = Util.CapturaInt0(row, "Total"),
                        //AreaResponsableCod = Util.CapturaString(row, "CodAreaResponsable"),

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

        public Response ListarPlanCuotasDT(Request<ENProgramacion> entidad)
        {
            Response retorno = new Response();

            try
            {
                DataTable dt = ProgramacionRepositorio.ListarPlanCuotas(entidad.entidad);
                

                retorno.error = false;
                retorno.tabla = dt;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response<List<ENProgramacion>> ListarProgamacionxCombo(Request<ENProgramacion> entidad)
        {
            Response<List<ENProgramacion>> retorno = new Response<List<ENProgramacion>>();

            try
            {
                DataTable dt = ProgramacionRepositorio.ListarProgamacionxCombo(entidad.entidad);
                List<ENProgramacion> lista = new List<ENProgramacion>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProgramacion()
                    {
                        Id = Util.CapturaInt0(row, "Id"),
                        EmpCCod = Util.CapturaString(row, "EmpCCod"),

                        dcpctoc = Util.CapturaString(row, "dcpctoc"),
                        dcpnaop = Util.CapturaString(row, "dcpnaop"),
                        dcpnnop = Util.CapturaString(row, "dcpnnop"),
                        dcpncmbop = Util.CapturaInt0(row, "dcpncmbop"),

                        ComboCamtexCodigo = Util.CapturaString(row, "ComboCamtexCodigo"),
                        ComboCamtex = Util.CapturaString(row, "ComboCamtex"),
                        ComboPlanta = Util.CapturaString(row, "ComboPlanta"),

                        IdProgramacionAsignacionLinea = Util.CapturaInt0(row, "IdProgramacionAsignacionLinea"),
                        IdProveedor = Util.CapturaIntNull(row, "IdProveedor"),
                        IdLinea = Util.CapturaIntNull(row, "IdLinea"),


                        PlantaServicio = Util.CapturaInt0(row, "PlantaServicio"),
                        Orden = Util.CapturaInt0(row, "Orden"),
                        Orden2 = Util.CapturaIntNull(row, "Orden2"),
                        TipoComboDcpo = Util.CapturaInt0(row, "TipoComboDcpo"),
                        TipoComboDcpoDescripcion = Util.CapturaString(row, "TipoComboDcpoDescripcion"),
                        QtyPedido = Util.CapturaInt0(row, "QtyPedido"),
                        QtyHabilitado = Util.CapturaInt0(row, "QtyHabilitado"),
                        IdOPED02 = Util.CapturaInt0(row, "IdOPED02"),
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

        public Response<List<ENOrdenProduccion>> ListarOrdenProduccion(Request<ENOrdenProduccion> entidad)
        {
            Response<List<ENOrdenProduccion>> retorno = new Response<List<ENOrdenProduccion>>();

            try
            {
                DataTable dt = ProgramacionRepositorio.ListarOrdenProduccion(entidad.entidad);
                List<ENOrdenProduccion> lista = new List<ENOrdenProduccion>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENOrdenProduccion()
                    {
                        AnioOP = Util.CapturaInt0(row, "OPENAno"),
                        TipoOP = Util.CapturaString(row, "TOCCCod"),
                        NroOP = Util.CapturaString(row, "OPENNro"),
                        TipoOPDescripcion = Util.CapturaString(row, "TOCDDes"),

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

        public Response<List<ENOrdenProduccion>> GetOrdenProduccionById(Request<ENOrdenProduccion> entidad)
        {
            Response<List<ENOrdenProduccion>> retorno = new Response<List<ENOrdenProduccion>>();

            try
            {
                DataTable dt = ProgramacionRepositorio.GetOrdenProduccionById(entidad.entidad);
                List<ENOrdenProduccion> lista = new List<ENOrdenProduccion>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENOrdenProduccion()
                    {
                        AnioOP = Util.CapturaInt0(row, "OPENAno"),
                        TipoOP = Util.CapturaString(row, "TOCCCod"),
                        NroOP = Util.CapturaString(row, "OPENNro"),

                        Cliente = Util.CapturaString(row, "Cliente"),
                        Marca = Util.CapturaString(row, "Marca"),
                        EstiloCamtex = Util.CapturaString(row, "EstiloCamtex"),
                        SD = Util.CapturaString(row, "SD"),
                        DescripcionPrenda = Util.CapturaString(row, "DescripcionPrenda"),
                        Ruta = Util.CapturaString(row, "Ruta"),
                        RutaReal = Util.CapturaString(row, "RutaReal"),
                        //TipoOPDescripcion = Util.CapturaString(row, "TOCDDes"),

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

        public Response AsignaLineaxCombo(Request<ENProgramacion> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ProgramacionRepositorio.AsignaLineaxCombo(entidad.entidad);
                retorno.error = false;
                retorno.mensaje = "Resultado OK";
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response AsignaLineaxComboProcesa(Request<ENProgramacion> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ProgramacionRepositorio.AsignaLineaxComboProcesa(entidad.entidad);
                retorno.error = false;
                retorno.mensaje = "Resultado OK";
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
