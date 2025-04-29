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
    public class ProgramacionMecanicoAplicacion : IGeneralAplicacion<ENProgramacionMecanico>
    {
        private ProgramacionMecanicoRepositorio ProgramacionMecanicoRepositorio;
        public ProgramacionMecanicoAplicacion(ProgramacionMecanicoRepositorio ProgramacionMecanicoRepositorio)
        {
            this.ProgramacionMecanicoRepositorio = ProgramacionMecanicoRepositorio;
        }

        public Response Actualizar(Request<ENProgramacionMecanico> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ProgramacionMecanicoRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENProgramacionMecanico> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ProgramacionMecanicoRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENProgramacionMecanico> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ProgramacionMecanicoRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENProgramacionMecanico>> Listar(Request<ENProgramacionMecanico> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENProgramacionMecanico>> ListarPaginado(Request<ENProgramacionMecanico> entidad)
        {
            Response<List<ENProgramacionMecanico>> retorno = new Response<List<ENProgramacionMecanico>>();

            try
            {
                DataTable dt = ProgramacionMecanicoRepositorio.ListarPaginado(entidad.entidad);
                List<ENProgramacionMecanico> lista = new List<ENProgramacionMecanico>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProgramacionMecanico()
                    {
                        IdProgramacionMecanico = Util.CapturaInt0(row, "IdProgramacionMecanico"),
                        EPLCCOD = Util.CapturaString(row, "EPLCCOD"),
                        EPLDNOM = Util.CapturaString(row, "EPLDNOM"),
                        IdEstado = Util.CapturaInt0(row, "Estado"),
                        IdLinea = Util.CapturaInt0(row, "IdLinea"),
                        Linea = Util.CapturaString(row, "Linea"),
                        //USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        FechaProgramacion = Util.CapturaDatetime(row, "FechaProgramacion"),
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

        public Response<List<ENProgramacionMecanico>> ListarDetalleAlerta(Request<ENProgramacionMecanico> entidad)
        {
            Response<List<ENProgramacionMecanico>> retorno = new Response<List<ENProgramacionMecanico>>();

            try
            {
                DataTable dt = ProgramacionMecanicoRepositorio.ListarDetalleAlerta(entidad.entidad);
                List<ENProgramacionMecanico> lista = new List<ENProgramacionMecanico>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProgramacionMecanico()
                    {
                        IdLinea = Util.CapturaInt0(row, "IdLinea"),
                        Linea = Util.CapturaString(row, "Linea"),
                        EPLCCOD = Util.CapturaString(row, "EPLCCOD"),
                        EPLDNOM = Util.CapturaString(row, "EPLDNOM"),
                        //FechaProgramacion = Util.CapturaDatetime(row, "FechaProgramacion"),
                        cantidadAlerta = Util.CapturaString(row, "cantidadAlerta"),
                        MinParadaMayor = Util.CapturaString(row, "MinParada"),
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

        public Response<List<ENProgramacionMecanico>> ListarReporteAlerta(Request<ENProgramacionMecanico> entidad)
        {
            Response<List<ENProgramacionMecanico>> retorno = new Response<List<ENProgramacionMecanico>>();

            try
            {
                DataTable dt = ProgramacionMecanicoRepositorio.ListarReporteAlerta(entidad.entidad);
                List<ENProgramacionMecanico> lista = new List<ENProgramacionMecanico>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProgramacionMecanico()
                    {
                        
                        EPLCCOD = Util.CapturaString(row, "COCEplCCod"),
                        EPLDNOM = Util.CapturaString(row, "EPLDNOM"),
                        Linea = Util.CapturaString(row, "Linea"),
                        IdRpmD01 = Util.CapturaInt0(row, "IdRpmD01"),
                        Maquina = Util.CapturaString(row, "Maquina"),
                        InicioAlerta = Util.CapturaString(row, "InicioAlerta"),
                        InicioAtencion = Util.CapturaString(row, "InicioAtencion"),
                        TiempoEspera = Util.CapturaString(row, "TiempoEspera"),
                        TiempoAtencion = Util.CapturaString(row, "TiempoAtencion"),
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

        public Response<List<ENProgramacionMecanico>> ListarMecanicosConfigurados(Request<ENProgramacionMecanico> entidad)
        {
            Response<List<ENProgramacionMecanico>> retorno = new Response<List<ENProgramacionMecanico>>();

            try
            {
                DataTable dt = ProgramacionMecanicoRepositorio.ListarMecanicosConfigurados(entidad.entidad);
                List<ENProgramacionMecanico> lista = new List<ENProgramacionMecanico>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProgramacionMecanico()
                    {

                        EPLCCOD = Util.CapturaString(row, "EPLCCOD"),
                        EPLDNOM = Util.CapturaString(row, "EPLDNOM"),
                        
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

        public Response<List<ENProgramacionMecanico>> ListarPersonalMantenimiento(Request<ENProgramacionMecanico> entidad)
        {
            Response<List<ENProgramacionMecanico>> retorno = new Response<List<ENProgramacionMecanico>>();

            try
            {
                DataTable dt = ProgramacionMecanicoRepositorio.ListarPersonalMantenimiento(entidad.entidad);
                List<ENProgramacionMecanico> lista = new List<ENProgramacionMecanico>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProgramacionMecanico()
                    {

                        EPLCCOD = Util.CapturaString(row, "EPLCCOD"),
                        EPLDNOM = Util.CapturaString(row, "EPLDNOM"),

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
