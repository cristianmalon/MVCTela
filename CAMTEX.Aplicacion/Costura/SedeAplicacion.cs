using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class SedeAplicacion : IGeneralAplicacion<ENSede>
    {
        private SedeRepositorio SedeRepositorio;
        public SedeAplicacion(SedeRepositorio SedeRepositorio)
        {
            this.SedeRepositorio = SedeRepositorio;
        }
        public Response Actualizar(Request<ENSede> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = SedeRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENSede> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = SedeRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENSede> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = SedeRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENSede>> Listar(Request<ENSede> entidad)
        {
            Response<List<ENSede>> retorno = new Response<List<ENSede>>();

            try
            {
                DataTable dt = SedeRepositorio.Listar(entidad.entidad);
                List<ENSede> lista = new List<ENSede>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENSede()
                    {
                        IdSede = Util.CapturaInt0(row, "IdSede"),
                        Sede = Util.CapturaString(row, "Sede"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),

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
        public Response<List<ENSede>> ListarForLogin()
        {
            Response<List<ENSede>> retorno = new Response<List<ENSede>>();

            try
            {
                DataTable dt = SedeRepositorio.ListarForLogin();
                List<ENSede> lista = new List<ENSede>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENSede()
                    {
                        IdSede = Util.CapturaInt0(row, "IdSede"),
                        Sede = Util.CapturaString(row, "Sede"),
                        ESTADO = Util.CapturaString(row, "Estado"),


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
        public Response<List<ENSede>> ListarPaginado(Request<ENSede> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
